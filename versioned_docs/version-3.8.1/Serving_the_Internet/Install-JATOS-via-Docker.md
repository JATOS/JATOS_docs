---
title: Install JATOS via Docker
slug: /Install-JATOS-via-Docker.html
sidebar_position: 8
---

JATOS' Docker images are hosted at [hub.docker.com/r/jatos/jatos/](https://hub.docker.com/r/jatos/jatos/).

Docker is a great technology, but if you never heard of it you can safely ignore this page (it's not necessary to use it if you want to install JATOS, either locally or on a server). 

Also have a look at [JATOS with Docker Compose](/JATOS-with-Docker-Compose.html) for some advanced Docker setup.


## Installation with Docker

1. In your terminal:

   * Get the latest release:

   ```shell
   docker pull jatos/jatos:latest
   ```
   
   * or a specific [release](https://github.com/JATOS/JATOS/releases) (exchange _x.x.x_ with the version):

   ```shell
   docker pull jatos/jatos:x.x.x
   ```

1. Run JATOS (change _latest_ to your version)

   ```shell
   docker run -d -p 9000:9000 jatos/jatos:latest
   ```
   
   The `-d` argument specifies to run this container in detached mode (in the background) and the `-p` is responsible for the port mapping.

1. You can check that the new container is running correctly:
   
   * Use `docker ps` in the terminal: in the line with `jatos/jatos` the status should say `up`
   * Use curl: `curl http://localhost:9000/ping` should give you `pong` back
   * In a browser go to [localhost:9000](http://localhost:9000) - it should show the JATOS login screen
   * Check JATOS' admin page: [localhost:9000/jatos/admin](http://localhost:9000/jatos/admin)
     * Run the _Tests_: all should show an 'OK'
     * Check the _System Info_ that it is all like you configured it

1. Always change the admin's password after first installation: Go to [http://localhost:9000/jatos/user/admin](http://localhost:9000/jatos/user/admin) and and press button _Change Password_.


## Debugging and Troubleshooting

To get the logs add the argument `-Djatos.logs.appender=ASYNCSTDOUT` and run the container not detached:

```shell
docker run -p 9000:9000 jatos/jatos:latest -Djatos.logs.appender=ASYNCSTDOUT
```


## Change port

With Docker you can easily change JATOS' port (actually we change the port mapping of JATOS' Docker container). Just use _docker_'s `-p` argument and specify your port. E.g. to run JATOS on standard HTTP port 80 use:

``` shell
docker run -d -p 80:9000 jatos/jatos:latest
```


## Configuration with Docker

JATOS running in a Docker container can be configured the same way as running it the normal way: via a configuration file, via environment variables, or command line arguments. Have a look at [JATOS Configuration](/JATOS_Configuration.html) for the possibilities.


### Via arguments

Add as many arguments to the end of the _docker_ command as you wish.

E.g. to run JATOS with a MySQL database running on localhost (not in a container), with the default port 3306, use the following command (change username and password to your MySQL user):

```shell
docker run -d --network="host" jatos/jatos:latest \
    -Djatos.db.url='jdbc:mysql://localhost/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC' \
    -Djatos.db.username='jatosuser' \
    -Djatos.db.password='my-password' \
    -Djatos.db.driver='com.mysql.cj.jdbc.Driver'    
```


### Via environment variables

All environment variables that can be used to [configure a normal JATOS server installation](JATOS_Configuration.html) can be used in a Docker installation. Just use _docker_'s `-e` argument to set them.

E.g. to run JATOS with a MySQL database running on localhost (not in a container), with the default port 3306, use the following command (change username and password to your MySQL user):

~~~ shell
docker run -d --network="host" \
    -e JATOS_DB_URL='jdbc:mysql://localhost/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC' \
    -e JATOS_DB_USERNAME='jatosuser' \
    -e JATOS_DB_PASSWORD='my-password' \
    -e JATOS_DB_DRIVER='com.mysql.cj.jdbc.Driver' \
    jatos/jatos:latest
~~~


### Via configuration file

You can mount a configuration file (_jatos.conf_) as a Docker [_volume_](https://docs.docker.com/storage/volumes/) in the container. This way you can comfortably edit the _jatos.conf_ in your local file system.

E.g. with a _jatos.conf_ in the current working directory:

```shell
docker run -d -p 9000:9000 --volume ./jatos.conf:/opt/jatos/conf/jatos.conf:ro jatos/jatos:latest
```


## Persist data with _volumes_

[_Volumes_](https://docs.docker.com/storage/volumes/) are the preferred way to persist data with Docker containers. This can be necessary if one wants to update JATOS or do backups.

Before using a _volume_ one has to create it:


```shell
docker volume create --name jatos_data
```

In JATOS' Docker container all data are stored, by default, in the folder `/opt/jatos_data` (although this can be configured). Now you can mount the newly created _volume_ _jatos_data_ at this location:

```shell
docker run -d -p 9000:9000 --volume jatos_data:/opt/jatos_data jatos/jatos:latest
```


## Updating JATOS with Docker

**Be aware**: JATOS is only allowed to update to higher version numbers - downgrading will likely break your installation. Please do backups before updating.

There are two possibilities to update JATOS running in a Docker container:

1. Unless you run [JATOS on multiple nodes](/JATOS-in-a-cluster.html), you can simply use the [auto-update feature](/Update-JATOS.html#automatic-update) to update JATOS to newer versions.

1. Another way, arguably even simpler, is to just change the Docker image tag of JATOS to a newer version. Stop the current running JATOS container and run a new one with the new version tag. **But this only works if you [persist your data with volumes](/Install-JATOS-via-Docker.html#persist-data-with-volumes) - If you don't use volumes your data stored in JATOS will be lost**.