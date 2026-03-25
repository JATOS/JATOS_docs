---
title: JATOS with Docker Compose
slug: /JATOS-with-Docker-Compose.html
sidebar_position: 9
---

[_Docker Compose_](https://docs.docker.com/compose/) offers an easy way to set up a JATOS installation with a MySQL database and Nginx as a reverse proxy, for example to enable HTTPS encryption.

## Get Started

### Example Repository

We have assembled all necessary files in a [Git repository](https://github.com/JATOS/JATOS_with_docker_compose) that you can clone and adapt to your needs to get JATOS running with Docker Compose:

```shell
git clone https://github.com/JATOS/JATOS_with_docker_compose.git
```

The important files in the repo are:
- `compose.yaml` to set up Docker Compose
- `nginx.conf` for Nginx
- `jatos.conf` for JATOS

```
JATOS_with_docker_compose
├── compose.yaml
├── nginx.conf
├── jatos.conf
└── ...
```

The Docker Compose file [`compose.yaml`](https://github.com/JATOS/JATOS_with_docker_compose/blob/main/compose.yaml) starts three services:

1. Nginx as a reverse proxy (handles HTTPS)
2. JATOS
3. MySQL database

Additionally, it creates three shared volumes:

1. `jatos-data` - stores JATOS' data folders: study assets, result uploads, study logs, and JATOS' tmp folder
2. `jatos-logs` - for JATOS logs (not necessary if you log to stdout)
3. `jatos-db` - where MySQL stores its data

### Start the Services

Go into the cloned folder and start the services with:

```shell
docker compose -f compose.yaml up
```

If everything went smoothly, you will now see the JATOS login page at: [https://localhost/](https://localhost/)

To stop the services, use `Ctrl+C`. To remove the stopped containers, run:

```shell
docker compose -f compose.yaml down
```

To also remove all volumes, add the `-v` flag:

```shell
docker compose -f compose.yaml down -v
```

### Check That It Runs

- Visit the JATOS admin page: [https://localhost/jatos/admin](https://localhost/jatos/admin). Check that all _Tests_ are OK and that _System Info_ shows your intended configuration.
- Import a study (e.g., from the [Example Studies](/Example-Studies)) and check if it runs. Verify that result data appear on the results page.
- Check data persistence: Stop and remove the containers (but not the volumes!) with `docker compose -f compose.yaml down`, then restart with `docker compose -f compose.yaml up`. All studies and result data should still be there.

## Nginx Configuration

See [JATOS with Nginx](/JATOS-with-Nginx.html) for more details. The `nginx.conf` file in the repo is mounted into the Nginx container and will be used by Nginx.

### Use Your Own Certificate (for HTTPS)

**The certificate used in this example setup is self-signed and not secure for production.** The certificate files are mounted as volumes in the proxy service. You may need to change the file names and paths in `nginx.conf` as well.

```yaml
volumes:
    - ./nginx-selfsigned.crt:/etc/ssl/certs/nginx-selfsigned.crt:ro
    - ./nginx-selfsigned.key:/etc/ssl/private/nginx-selfsigned.key:ro
```

## MySQL Configuration

Make the following changes in `compose.yaml`:

- Set `JATOS_DB_PASSWORD` and `MYSQL_PASSWORD` to the **same** password of your choice.
- Set `MYSQL_ROOT_PASSWORD` to a password you choose for MySQL's root user.
- Consider [turning off MySQL's binary log](/JATOS-with-MySQL.html#optional---deactivate-the-binary-log-of-your-mysqlmariadb) with `--skip-log-bin` in the `db` service's `command` section.

See [JATOS with MySQL](/JATOS-with-MySQL.html) for more information.

## JATOS Configuration

See [JATOS Configuration](/JATOS_Configuration.html) for all options.

- Change the image version in `compose.yaml` to the one you need (e.g., the latest).
- **Always change the admin password after first installation:** In your browser, click on **Admin** in the top-right header, then select **My password** to change your password.

### Debugging and Logging

You can redirect JATOS logs to stdout with `-Djatos.logs.appender=ASYNCSTDOUT` in the `command` section of the `jatos` service. To write logs to a file, use `-Djatos.logs.appender=ASYNCFILE` (the default). Logging to stdout is useful for debugging and advanced logging solutions. If you log to stdout, you don't need the extra log volume and can remove `jatos-logs`.

### Using `jatos.conf`

JATOS can be configured either by command-line parameters (with the `-D` prefix) in `compose.yaml`, by the [`jatos.conf`](https://github.com/JATOS/JATOS_with_docker_compose/blob/main/jatos.conf) configuration file, or by environment variables (like `JATOS_DB_PASSWORD`). Choose the method you prefer.

The `jatos.conf` file is mounted as a volume in the JATOS container, so you can edit it outside the container.

See [JATOS Configuration](/JATOS_Configuration.html) for all possible parameters.

## Updating JATOS with Docker Compose

The easiest way to update a JATOS instance running with this setup (with external data volumes) is to **change the JATOS Docker image tag to a higher version and restart the services**. There is no need to use [JATOS' auto-updater](/Update-JATOS.html#automatic-update). JATOS only allows updates to higher version numbers—downgrading will likely break your installation. **Always back up your data before updating.**

## Running JATOS on Multiple Nodes

See [JATOS in a cluster](/JATOS-in-a-cluster.html) for more information.