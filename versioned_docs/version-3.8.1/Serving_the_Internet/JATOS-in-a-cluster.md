---
title: JATOS in a cluster
slug: /JATOS-in-a-cluster.html
sidebar_position: 10
---

JATOS can run on multiple nodes in a cluster to achieve high availability and scalability.

## Things to know before running JATOS in a multi-node setup

* JATOS, in a multi-node setup, needs a **MySQL** or **MariaDB** database (and cannot be used with the embedded H2 database).
* All JATOS nodes need to **share some folders**: _study assets_, _study uploads_, _study logs_, and JATOS' _tmp_ folder.
* All JATOS nodes need the **same secret**, otherwise the session cookie used for authentication won't work.
* **Updating** is arguably easier by just changing the tag of JATOS docker image to a higher version (but JATOS' auto-updater can't be used).

All these points (and more) are addressed in this page.


## Multi-node installation with Docker Compose

A setup of JATOS with multiple nodes through [Docker Compose](https://docs.docker.com/compose/) might not make much sense, because all JATOS instances still run on the same machine. But it highlights some general concepts and caveats pretty well, so we describe it here.

How to get started with JATOS and Docker Compose is explained in [another page](/JATOS-with-Docker-Compose.html). You might want to follow the instructions there to get a JATOS installation with a MySQL database and Nginx running. 

Now, if you want to run JATOS in multiple containers in parallel you need to configure the [_compose.yaml_](https://github.com/JATOS/JATOS_with_docker_compose/blob/main/compose.yaml) additionally (if you haven't already):

1. Set **`-Djatos.multiNode=true`** in the _command_ section of the _jatos_ service.
1. Set the **`JATOS_SECRET`** environment variable to a string with at least than 15 characters (otherwise the session cookie that JATOS uses for authentication won't work).

It's important to share some of JATOS folders between all JATOS nodes. In our Docker composed setup this is already achieved with the shared _volumes_ _jatos-data_, _jatos-logs_, and _jatos-db_. Nothing to do here.

Finally, to scale up and run multiple JATOS instances use the `--scale` parameter, e.g. to run two JATOS instances:

```shell
docker compose -f compose.yaml up --scale jatos=2
```


## JATOS with Kubernetes

[Kubernetes](https://kubernetes.io/) is a system for container orchestration and automatic deployments. It offers vast possibilities to do so in many different ways that might also depend on your cloud provider. Here we used it with [DigitalOcean](https://docs.digitalocean.com/products/kubernetes/) - but with some adjustments it should work on any Kubernetes cluster. 

For the JATOS cluster we use [Kustomize](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/) to define Kubernetes objects through _kustomization_ YAML files. 

We assembled all necessary files in a [git repository](https://github.com/JATOS/JATOS_with_kubernetes).

```shell
git clone https://github.com/JATOS/JATOS_with_kubernetes.git
```

The file [_kustomization.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/kustomization.yaml) defines our secrets and specifies the resource file, [_jatos.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/jatos.yaml), that describes the JATOS cluster.

Then, after you set up everything, you can start the cluster with:

```shell
kubectl apply -k <my_JATOS_kustomize_directory>
```


### Load-balancing and scaling

In our [_jatos.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/jatos.yaml), for _auto-balancing_ in our JATOS cluster, we use the one [integrated in DigitalOcean](https://docs.digitalocean.com/products/kubernetes/how-to/add-load-balancers/). This is specified in the _Service_ object, with the _annotation_ `kubernetes.digitalocean.com/load-balancer-id: "jatos-load-balancer"`.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: jatos
  labels:
    app: jatos
  annotations:
    kubernetes.digitalocean.com/load-balancer-id: "jatos-load-balancer"
spec:
  ports:
    - port: 80
      targetPort: 9000
  selector:
    app: jatos
  type: LoadBalancer
```

And our cluster does _automatic horizontal scaling_ with an `HorizontalPodAutoscaler`. Here we set up a minimum of 2 and maximum of 10 JATOS pods and as scaling metric a average CPU utilization of 100%. 

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: jatos
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: jatos
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 100
```


### Shared volumes

As said [before](/JATOS-in-a-cluster.html#things-to-know-before-running-jatos-in-a-multi-node-setup), JATOS, if running on multiple nodes, needs to share some folders. Translated to Kubernetes this means the _PersistentVolumeClaim_ needs the `accessMode`: `ReadWriteMany`.

Although many cloud provider have their own storage system to achieve this, we use a common _NFS_ storage. E.g. there is an easy-to-use [helm chart](https://helm.sh/) for this purpose: [nfs-server-provisioner](https://artifacthub.io/packages/helm/kvaps/nfs-server-provisioner). And since we want to run on _DigitalOcean_ we need the parameter `persistence.storageClass` set to `do-block-storage`.

```shell
helm install nfs-server stable/nfs-server-provisioner --set persistence.enabled=true,persistence.storageClass=do-block-storage,persistence.size=11Gi
```

Then in our [_jatos.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/jatos.yaml) the NFS storage is used in a `PersistentVolumeClaim`:


```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: jatos-data-pv-claim
  labels:
    app: jatos
spec:
  accessModes:
  - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
  storageClassName: nfs
```

And the _volume_ is mounted in every JATOS _pod_:

```yaml
volumes:
  - name: jatos-data-storage
    persistentVolumeClaim:
      claimName: jatos-data-pv-claim
```

### Configure JATOS' deployment

In [_jatos.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/jatos.yaml), to run JATOS in on multiple nodes in a cluster you have to set the parameter `-Djatos.multiNode=true`. Also the parameter `-Djatos.logs.appender=ASYNCSTDOUT` redirects the logging to _stdout_, which is what you probably want with Kubernetes.

The parameter `-J-Xmx` defines the maximum memory the Java Virtual Machine (JVM) that runs JATOS is allowed to use. If you don't set this, the JVM might take too much memory for itself and strangle the operating system. Here we set it to 1500 MB but it really depends on the kind of underlying machine you are using to run your nodes.

You might want to change the Docker image version to a different one.

```yaml
containers:
  # Maybe use a newer image version
  - image: jatos/jatos:3.8.4
    name: jatos
    args:
      # Necessary to run JATOS on multiple nodes
      - -Djatos.multiNode=true
      # Logging to stdout
      - -Djatos.logs.appender=ASYNCSTDOUT
      # Set the JVM maximum memory usage. It has to fit your machine.
      - -J-Xmx=1500M
```

### Secrets

The password for the MySQL database and the secret for JATOS session cookie are set in the [`kustomization.yaml`](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/kustomization.yaml) file and then just referenced in [_jatos.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/jatos.yaml) in JATOS _deployment_ object.


### MySQL setup

We assume here that you have your MySQL database set up and ready already. Have a look at [JATOS with MySQL](/JATOS-with-MySQL.html) to get started.

In [_jatos.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/jatos.yaml) you have to change the environmental variable `JATOS_DB_URL`. The IP and port need to be the ones from your MySQL IP and port.


### Liveness probe and startup probe

Applications running on the JVM can need some initial warm-up time before they are fully functional. Therefore we have, additionally to the `livenessProbe` in [_jatos.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/jatos.yaml), a `startupProbe` that accounts for this. You might have to tweak `failureThreshold` and `periodSeconds` on your system.

```yaml
livenessProbe:
  httpGet:
    path: /ping
    port: 9000
  failureThreshold: 1
  periodSeconds: 10
startupProbe:
  httpGet:
    path: /ping
    port: 9000
  failureThreshold: 30
  periodSeconds: 10
```


### _securityContext_ and _affinity_

The [_jatos.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/jatos.yaml) also has a _securityContext_ and a _affinity_ section. You probably don't have to change anything there. We just want to explain them here shortly.

The _securityContext_ sets the _UID_ and _GID_ of the user defined in JATOS' Docker image. 

```yaml
securityContext:
  runAsUser: 1000
  runAsGroup: 1000
  fsGroup: 1000
```

In the _affinity_ section we define a `podAntiAffinity` to ensure that each Kubernetes _pod_ runs only one JATOS.

```yaml
affinity:
  podAntiAffinity:                                 
    requiredDuringSchedulingIgnoredDuringExecution:
    - topologyKey: kubernetes.io/hostname    
      labelSelector:                               
        matchLabels:                               
          app: jatos
```


### Updating JATOS with Kubernetes

The easiest way to update a JATOS Kubernetes cluster is to **just change the JATOS' Docker image tag to a higher version**. JATOS' auto-updater cannot be used here.

But there are some **constraints**:

1. Kubernetes' _rolling updates_ are not possible with JATOS. You have to turn off all JATOS pods, do the update (change the Docker image tag) and turn them back on.
1. JATOS is only allowed to update to higher version numbers - downgrading will likely break your installation.
1. And please do backups before updating.
