---
title: JATOS in a cluster
slug: /JATOS-in-a-cluster.html
sidebar_position: 10
---

JATOS can run on multiple nodes in a cluster to achieve high availability and scalability.

## Things to Know Before Running JATOS in a Multi-Node Setup

* In a multi-node setup, JATOS requires a **MySQL** or **MariaDB** database (the embedded H2 database cannot be used).
* All JATOS nodes must **share certain folders**: _study assets_, _study uploads_, _study logs_, and JATOS' _tmp_ folder.
* All JATOS nodes must use the **same secret**; otherwise, the session cookie used for authentication will not work.
* **Updating** is easiest by changing the tag of the JATOS Docker image to a higher version (the auto-updater cannot be used in a cluster).

All these points (and more) are addressed on this page.

---

## Multi-Node Installation with Docker Compose

Setting up JATOS with multiple nodes using [Docker Compose](https://docs.docker.com/compose/) might not make much sense for production, since all instances run on the same machine. However, it demonstrates the general concepts and caveats well.

Instructions for getting started with JATOS and Docker Compose are on [another page](/JATOS-with-Docker-Compose.html). You may want to follow those steps to set up JATOS with a MySQL database and Nginx.

To run JATOS in multiple containers in parallel, you need to additionally configure the [_compose.yaml_](https://github.com/JATOS/JATOS_with_docker_compose/blob/main/compose.yaml):

1. Set **`-Djatos.multiNode=true`** in the _command_ section of the _jatos_ service.
2. Set the **`JATOS_SECRET`** environment variable to a string with at least 15 characters (required for session cookies to work).

It's important to share some JATOS folders between all nodes. In our Docker Compose setup, this is already handled with the shared volumes: _jatos-data_, _jatos-logs_, and _jatos-db_.

To scale up and run multiple JATOS instances, use the `--scale` parameter. For example, to run two JATOS instances:

```shell
docker compose -f compose.yaml up --scale jatos=2
```

---

## JATOS with Kubernetes

[Kubernetes](https://kubernetes.io/) is a system for container orchestration and automatic deployments. It offers many possibilities, depending on your cloud provider. Here, we use [DigitalOcean](https://docs.digitalocean.com/products/kubernetes/) as an example, but with some adjustments, it should work on any Kubernetes cluster.

For the JATOS cluster, we use [Kustomize](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/) to define Kubernetes objects via _kustomization_ YAML files.

All necessary files are available in this [git repository](https://github.com/JATOS/JATOS_with_kubernetes):

```shell
git clone https://github.com/JATOS/JATOS_with_kubernetes.git
```

The file [_kustomization.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/kustomization.yaml) defines secrets and specifies the resource file [_jatos.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/jatos.yaml), which describes the JATOS cluster.

After setup, start the cluster with:

```shell
kubectl apply -k <my_JATOS_kustomize_directory>
```

---

### Load Balancing and Scaling

In [_jatos.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/jatos.yaml), for load balancing, we use the [DigitalOcean integrated load balancer](https://docs.digitalocean.com/products/kubernetes/how-to/add-load-balancers/), specified in the _Service_ object with the annotation `kubernetes.digitalocean.com/load-balancer-id: "jatos-load-balancer"`.

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

For automatic horizontal scaling, we use a `HorizontalPodAutoscaler`. Here, we set a minimum of 2 and a maximum of 10 JATOS pods, with an average CPU utilization of 100%.

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

---

### Shared Volumes

As mentioned [earlier](/JATOS-in-a-cluster.html#things-to-know-before-running-jatos-in-a-multi-node-setup), JATOS requires certain folders to be shared when running on multiple nodes. In Kubernetes, this means the _PersistentVolumeClaim_ must have `accessMode`: `ReadWriteMany`.

While many cloud providers have their own solutions for this, we will use a common _NFS_ storage in this example. For instance, there is an easy-to-use [helm chart](https://helm.sh/) for this purpose: [nfs-server-provisioner](https://artifacthub.io/packages/helm/kvaps/nfs-server-provisioner). If you are using _DigitalOcean_, set the parameter `persistence.storageClass` to `do-block-storage`.

```shell
helm install nfs-server stable/nfs-server-provisioner --set persistence.enabled=true,persistence.storageClass=do-block-storage,persistence.size=11Gi
```

In our [_jatos.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/jatos.yaml), the NFS storage is used in a `PersistentVolumeClaim`:

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

The _volume_ is then mounted in every JATOS _pod_:

```yaml
volumes:
  - name: jatos-data-storage
    persistentVolumeClaim:
      claimName: jatos-data-pv-claim
```

---

### Configure JATOS' Deployment

In [_jatos.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/jatos.yaml), to run JATOS on multiple nodes in a cluster, set the parameter `-Djatos.multiNode=true`. The parameter `-Djatos.logs.appender=ASYNCSTDOUT` redirects logging to _stdout_, which is generally desired in Kubernetes.

The parameter `-J-Xmx` defines the maximum memory allocated to the Java Virtual Machine (JVM) running JATOS. If not set, the JVM may consume excessive memory, affecting the operating system. Here we set it to 1500 MB, but this depends on your underlying hardware.

You may also want to change the Docker image version to a different one.

```yaml
containers:
  # Maybe use a newer image version
  - image: jatos/jatos:3.8.6
    name: jatos
    args:
      # Necessary to run JATOS on multiple nodes
      - -Djatos.multiNode=true
      # Logging to stdout
      - -Djatos.logs.appender=ASYNCSTDOUT
      # Set the JVM maximum memory usage. It has to fit your machine.
      - -J-Xmx=1500M
```

---

### Secrets

The password for the MySQL database and the secret for the JATOS session cookie are set in the [`kustomization.yaml`](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/kustomization.yaml) file and then referenced in [_jatos.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/jatos.yaml) in the JATOS _deployment_ object.

---

### MySQL Setup

We assume that you have your MySQL database set up and ready. Please refer to [JATOS with MySQL](/JATOS-with-MySQL.html) for initial setup instructions.

In [_jatos.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/jatos.yaml), change the environmental variable `JATOS_DB_URL` to match your MySQL IP and port.

---

### Liveness Probe and Startup Probe

Applications running on the JVM may require some initial warm-up time before they are fully functional. Therefore, in addition to the `livenessProbe` in [_jatos.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/jatos.yaml), we have a `startupProbe` to account for this. You may need to adjust `failureThreshold` and `periodSeconds` based on your system's performance.

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

---

### _SecurityContext_ and _Affinity_

The [_jatos.yaml_](https://github.com/JATOS/JATOS_with_kubernetes/blob/main/jatos.yaml) file also contains a _securityContext_ and an _affinity_ section. Generally, you should not need to change anything here. We explain them briefly below.

The _securityContext_ sets the _UID_ and _GID_ for the user defined in JATOS' Docker image.

```yaml
securityContext:
  runAsUser: 1000
  runAsGroup: 1000
  fsGroup: 1000
```

The _affinity_ section defines a `podAntiAffinity` rule to ensure that each Kubernetes _pod_ runs only one instance of JATOS.

```yaml
affinity:
  podAntiAffinity:                                 
    requiredDuringSchedulingIgnoredDuringExecution:
    - topologyKey: kubernetes.io/hostname    
      labelSelector:                               
        matchLabels:                               
          app: jatos
```

---

### Updating JATOS with Kubernetes

The easiest way to update a JATOS Kubernetes cluster is to **just change the JATOS' Docker image tag to a higher version**. [JATOS' auto-updater](/Update-JATOS.html#automatic-update) **cannot** be used here.

However, there are some **constraints**:

1. Kubernetes' _rolling updates_ are not possible with JATOS. You must turn off all JATOS pods, perform the update (change the Docker image tag), and then turn the pods back on.
2. JATOS can only be updated to higher version numbers; downgrading will likely break your installation.
3. Please ensure you have backups before performing an update.
