---
title: JATOS with Docker Compose
slug: /JATOS-with-Docker-Compose.html
sidebar_position: 9
---

[_Docker Compose_](https://docs.docker.com/compose/) offers an easy way to set up a JATOS installation with a MySQL database and Nginx as an reverse proxy for, among other things, HTTPS encryption. 


## Get started

### Example repository

We assembled all necessary files in a [git repository](https://github.com/JATOS/JATOS_with_docker_compose) that you can clone and then change them to your needs to get a JATOS installation running with _docker compose_. 

```shell
git clone https://github.com/JATOS/JATOS_with_docker_compose.git
```

The important files in the repo are _compose.yaml_ to set up _docker compose_, nginx.conf for Nginx, and jatos.conf for JATOS.

```
JATOS_with_docker_compose
├── compose.yaml
├── nginx.conf
├── jatos.conf
└── ...
```

The _docker compose_ file [_compose.yaml_](https://github.com/JATOS/JATOS_with_docker_compose/blob/main/compose.yaml) starts three services:

1. Nginx as a reverse proxy that does encryption (HTTPS)
1. JATOS
1. A MySQL database

Additionally it creates three shared _volumes_:

1. _jatos-data_ - stores JATOS' data folders: _study assets_, _result uploads_, _study logs_ and JATOS' _tmp_ folder
1. _jatos-logs_ - for JATOS logs (not necessary if you log to _stdout_)
1. _jatos-db_ - where MySQL stores its data


### Up

Go into the cloned folder and start the services with:

```shell
docker compose -f compose.yaml up
```

If everything went smoothly, you will now see the JATOS login page under: [https://localhost/](https://localhost/)

With `Ctrl+C` you can stop the services. Removing the stopped containers can be achieved with `docker compose -f compose.yaml down` and additionally removing all the _volumes_ by adding the `-v` flag: `docker compose -f compose.yaml down -v`.


### Check that it runs

First visit the JATOS admin page: [https://localhost/jatos/admin](https://localhost/jatos/admin). There, check that all _Tests_ are OK. Also check that the _System Info_ contains the configuration you intended.

Next, you can import a study (e.g. one from the [Example Studies](/Example-Studies)) and check if it runs well. Check, for example, that the result data appear in the results page.

Last but not least: Check that all data are persisted: First, stop and remove the containers (but not the _volumes_!) with `docker compose -f compose.yaml down`. Then, restart the services with `docker compose -f compose.yaml up`. Now check that all studies and their result data are still there.


## Nginx configuration

Have a look at [_JATOS with Nginx_](/JATOS-with-Nginx.html) and configure Nginx to your needs. The file _nginx.conf_ in our repo is mounted in Nginx' container and will be used by Nginx.


### Use your own certificate (for HTTPS)

**The certificate used here in this example setup is self-signed and utterly insecure**. The certificate files are mounted as _volumes_ in the _proxy_ service. You might have to change the file names (and paths) in _nginx.conf_ too. 

```yaml
volumes:
    - ./nginx-selfsigned.crt:/etc/ssl/certs/nginx-selfsigned.crt:ro
    - ./nginx-selfsigned.key:/etc/ssl/private/nginx-selfsigned.key:ro
```


## MySQL configuration

The following changes should be done in the _compose.yaml_:

Search and set `JATOS_DB_PASSWORD` and `MYSQL_PASSWORD` to the **same** password of your choice.

Search and set `MYSQL_ROOT_PASSWORD`, MySQL's root password to one chosen by you.

Consider to [turn off MySQL's binary log](/JATOS-with-MySQL.html#optional---deactivate-the-binary-log-of-your-mysqlmariadb) with `--skip-log-bin` in _db_'s _command_ section.

Check [_JATOS with MySQL_](/JATOS-with-MySQL.html) for more information.


## JATOS configuration

Have a look at [_JATOS Configuration_](/JATOS_Configuration.html).

Change the image version in the _compose.yaml_ to the one you need (e.g. the latest one).

Always change the admin's password after first installation: Go to [https://localhost/jatos/user/admin](https://localhost/jatos/user/admin) and and press button _Change Password_.


### Debugging and logging

You can redirect JATOS logs to _stdout_ with `-Djatos.logs.appender=ASYNCSTDOUT` in the _command_ section of the _jatos_ service - or write the logs to a file with `-Djatos.logs.appender=ASYNCFILE` (which is actually the default and you can just leave it out). Logging to _stdout_ is useful for debugging and is also used in advanced logging solutions. If you log to _stdout_ you don't need an extra log _volume_ and you can remove _jatos-logs_.

### Using _jatos.conf_

JATOS can be configured either by _command_ parameters (the ones with the `-D` prefix) in the _compose.yaml_ or with the [_jatos.conf_](https://github.com/JATOS/JATOS_with_docker_compose/blob/main/jatos.conf) configuration file. You can also set up some environment variables (like the `JATOS_DB_PASSWORD`). In the end it's up to you which way you prefer.

The _jatos.conf_ file is mounted as a _volume_ in the JATOS container. This way you can comfortably edit your _jatos.conf_ outside of the container.


### Updating JATOS with Docker Compose

The easiest way to update a JATOS instance running with this setup with external volumes is to **just change the JATOS' Docker image tag to a higher version and restart the services**. No need to use JATOS auto-updater. JATOS is only allowed to update to higher version numbers - downgrading will likely break your installation. And please do backups before updating.
