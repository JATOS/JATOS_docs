---
title: Install JATOS via Docker
slug: /Install-JATOS-via-Docker.html
sidebar_position: 8
---

**JATOS' Docker images are hosted at [hub.docker.com/r/jatos/jatos/](https://hub.docker.com/r/jatos/jatos/).**

Docker is a great technology, but if you’ve never heard of it, you can safely ignore this page (it’s not necessary for installing JATOS locally or on a server).

For advanced Docker setups, see [JATOS with Docker Compose](/JATOS-with-Docker-Compose.html).

---

## Installation with Docker

1. In your terminal:

   - **Get the latest release:**

     ```shell
     docker pull jatos/jatos:latest
     ```

   - **Or a specific [release](https://hub.docker.com/r/jatos/jatos/tags)** (replace _x.x.x_ with the version):

     ```shell
     docker pull jatos/jatos:x.x.x
     ```

2. **Run JATOS** (change _latest_ to your version if needed):

   ```shell
   docker run -d -p 9000:9000 jatos/jatos:latest
   ```

   **Notes**:
    * The `-d` flag runs the container in detached mode (in the background).
    * By default, JATOS runs on port `9000`. You can change the `-p` argument to map to a different port on the host, e.g. `docker run -d -p 80:9000 jatos/jatos:latest` maps to port `80`.

3. **Check that the container is running:**

   You might have to change `127.0.0.1` to your IP/domain.

   - Use `docker ps` in the terminal: the line with `jatos/jatos` should show `up` in the status.
   - Use curl: `curl http://127.0.0.1:9000/ping` should return `pong`.
   - In a browser, go to [http://127.0.0.1:9000](http://127.0.0.1:9000) — you should see the JATOS login screen.
   - Check JATOS' administration page: [http://127.0.0.1:9000/jatos/admin](http://127.0.0.1:9000/jatos/admin)
     - Run the _Tests_: all should show 'OK'.
     - Check _System Info_ to ensure everything is configured as expected.

4. **Change the admin password after installation:**  
   In your browser, click on **Admin** in the top-right header, then select **My password** to change your password.

---

## Debugging and Troubleshooting

To view the application logs in the terminal, add the argument `-Djatos.logs.appender=ASYNCSTDOUT` and run the container in the foreground (not detached):

```shell
docker run -p 9000:9000 jatos/jatos:latest -Djatos.logs.appender=ASYNCSTDOUT
```

---

## Configuration with Docker

JATOS in Docker can be configured just like a normal installation: via configuration file, environment variables, or command line arguments. See [JATOS Configuration](/JATOS_Configuration.html) for details.

### Via arguments

Add arguments to the end of the `docker run` command.  
Example: To run JATOS with a MySQL database on localhost (not in a container), use:

```shell
docker run -d -p 9000:9000 jatos/jatos:latest \
    -Djatos.db.url='jdbc:mysql://localhost/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC' \
    -Djatos.db.username='jatosuser' \
    -Djatos.db.password='my-password' \
    -Djatos.db.driver='com.mysql.cj.jdbc.Driver'
```

### Via environment variables

All environment variables for [configuring a normal JATOS installation](JATOS_Configuration.html) can be used in Docker. Use Docker’s `-e` argument to set them.

```shell
docker run -d -p 9000:9000 \
    -e JATOS_DB_URL='jdbc:mysql://localhost/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC' \
    -e JATOS_DB_USERNAME='jatosuser' \
    -e JATOS_DB_PASSWORD='my-password' \
    -e JATOS_DB_DRIVER='com.mysql.cj.jdbc.Driver' \
    jatos/jatos:latest
```

### Via configuration file

You can mount a configuration file (`jatos.conf`) as a Docker [volume](https://docs.docker.com/storage/volumes/). 

Example, with `jatos.conf` in your current directory:

```shell
docker run -d --volume ./jatos.conf:/opt/jatos/conf/jatos.conf:ro -p 9000:9000 jatos/jatos:latest
```

---

## Persist Data with Volumes

[Volumes](https://docs.docker.com/storage/volumes/) are the preferred way to persist data with Docker containers. This is necessary if one wants to update JATOS or do backups.

1. **Create a volume:**
   ```shell
   docker volume create --name jatos_data
   ```

2. **Mount the volume.**
   By default, all JATOS data is stored in `/opt/jatos_data` in the container. Mount the volume at this location:

   ```shell
   docker run -d --volume jatos_data:/opt/jatos_data -p 9000:9000 jatos/jatos:latest
   ```

---

## Updating JATOS with Docker

**Important:** JATOS only supports updates to higher version numbers. Downgrading may break your installation. Always back up your data before updating.

There are two ways to update JATOS in Docker:

1. If you are not running [JATOS on multiple nodes](/JATOS-in-a-cluster.html), you can use the [auto-update feature](/Update-JATOS.html#automatic-update).
2. Alternatively, simply change the Docker image tag to a newer version. Stop the current JATOS container and run a new one with the updated tag.  
   **Note:** This only works if you [persist your data with volumes](/Install-JATOS-via-Docker.html#persist-data-with-volumes). If you don't use volumes, your JATOS data will be lost.
