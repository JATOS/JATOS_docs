---
title: Install JATOS via Docker
slug: /Install-JATOS-via-Docker.html
sidebar_position: 12
---

JATOS has a Docker image: [hub.docker.com/r/jatos/jatos/](https://hub.docker.com/r/jatos/jatos/)

Docker is a great technology, but if you never heard of it you can safely ignore this page (it's not necessary to use it if you want to install JATOS, either locally or on a server). 


### Install JATOS locally with a Docker container

1. Install Docker locally on your computer (not covered here)

1. Go to your shell or command line interface

1. Pull JATOS image

   * either latest:

   ```
   docker pull jatos/jatos:latest
   ```
   
   * or a specific one (exchange _x.x.x_ with the version):

   ``` shell
   docker pull jatos/jatos:x.x.x
   ```

1. Run JATOS (use your image version)

   ``` shell
   docker run -d -p 9000:9000 jatos/jatos:latest
   ```
   
   The `-d` argument specifies to run this container in detached mode (in the backgroud) and the `-p` is responsible for the port mapping.

1. You can check that the new container is running: In your browser go to [localhost:9000](http://localhost:9000) - it should show the JATOS login screen. Or use `docker ps` - in the line with `jatos/jatos` the status should say `up`.

**Troubleshooting**: By removing the `-d` argument (e.g. `docker run -p 9000:9000 jatos/jatos:latest`) you get JATOS' logs printed in your shell - although you don't run it in detached mode in the background anymore.

**Troubleshooting 2nd**: Although usually not necessary maybe you want to have a look into the running container and start a Bash terminal:

``` shell
docker exec -it running-jatos-container-id /bin/bash
```


### Change port

With Docker you can easily change JATOS' port (actually we change the port mapping of JATOS' docker container). Just use Docker `-p` argument and specify your port. E.g. to run JATOS on standard HTTP port 80 use:

``` shell
docker run -d -p 80:9000 jatos/jatos:latest
```


### Configure with environment variables

All environment variables that can be used to [configure a normal JATOS server installation](Configure-JATOS-on-a-Server.html) can be used in a docker installation. Just use Docker's `-e` argument to set them.

E.g. to run JATOS with a MySQL database running on a host with the IP `172.17.0.2` and with the default port 3306 use the following command (change username and password of your MySQL account):

~~~ shell
docker run -e JATOS_DB_URL='jdbc:mysql://172.17.0.2/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC' -e JATOS_DB_USERNAME='root' -e JATOS_DB_PASSWORD='password' -e JATOS_DB_DRIVER=com.mysql.cj.jdbc.Driver -e JATOS_JPA=mysqlPersistenceUnit -p 9000:9000 jatos/jatos:latest
~~~


