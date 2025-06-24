---
title: JATOS on DigitalOcean
slug: /JATOS-on-DigitalOcean.html
sidebar_position: 5
---

This guide explains how to install JATOS in the cloud using [DigitalOcean](https://www.digitalocean.com). DigitalOcean is a cloud provider (like AWS, Google Cloud, Azure, etc.). We use DigitalOcean as an example because it is easy to use and has good documentation, but we have no affiliation with them.

**Note:** A cloud server costs money (typically $5–$50/month or more), and you’ll need a credit card to open a DigitalOcean account.

## Set up a Simple JATOS Server on DigitalOcean

First, we’ll set up a basic JATOS server without encryption (HTTPS) or a custom domain name.

DigitalOcean offers _Droplets_, which are virtual machines you can use as servers. If everything goes smoothly, you won’t need to use the terminal at all. You can watch the video below or follow the instructions further down.

import ReactPlayer from 'react-player'

<ReactPlayer controls width='100%' height='100%' url='/deploy_to_digitalocean_wo_domain_and_encryption.mp4' />

1. Set up an account with [DigitalOcean](https://www.digitalocean.com/) (billing information required).
2. Create a _Droplet_ (DigitalOcean's term for a virtual machine).
3. Choose the _Region_ nearest to your users.
4. Choose an image from _Marketplace_: select one with _Docker_ on _Ubuntu_ pre-installed.
5. Choose a _Size_: For most cases, _Basic_ with _Regular_ CPU and 1–4 GB memory is sufficient. If you're just trying it out, 1 GB is enough. You can resize later if needed.
6. Choose an _authentication method_.
7. Click on _Advanced Options_ and enable _Add Initialization scripts_. Then copy and paste the following script into the text field:

   ```shell
   #!/bin/bash
   docker run -d --restart=always -p 80:9000 jatos/jatos:latest
   ```

   You can change `latest` to a [specific version](https://hub.docker.com/r/jatos/jatos/tags) if needed.

8. Click the _Create Droplet_ button.

9. Wait a few minutes while your server is created. Copy the Droplet's IP address into your browser's address bar. If everything went well, you should see the JATOS login screen.

10. Log in with the default credentials 'admin' and 'admin'.

**Done!** You now have a basic JATOS server accessible from the Internet.

**Important:** Change your admin user's password immediately. Go to the admin user page (top-right corner) and click _My Password_.

DigitalOcean charges by the second. If you want to create a new JATOS server (e.g., if something went wrong), simply destroy the current one and start over.

---

## Destroy your JATOS server

To destroy your server, go to your Droplet's page in DigitalOcean and click _More_ → _Destroy_. This will completely remove your JATOS server and delete all collected data and uploaded studies.

---

## Set up JATOS with HTTPS and a Domain

This part is **optional** and only necessary if you want your own domain name and encrypted (HTTPS) access.

We will use [Traefik](https://github.com/traefik/traefik) as a proxy. Traefik provides encryption out-of-the-box (using [Let’s Encrypt](https://letsencrypt.org/)), is [open source](https://github.com/traefik/traefik), and free to use.

**Get your own domain name:**  
You need to obtain a domain name from a registrar or ask your IT department for a subdomain.

With a domain name, you can encrypt your server's communication with HTTPS.

### Summary of the workflow

1. Create Droplet
2. Set up your DNS
3. Restart Droplet
4. Wait until you can reach the webpage

### Create Droplet

Follow the instructions above to create a JATOS server, but in the _Add Initialization scripts_ field, use the following script:

```shell
#!/bin/bash

# Change to your email and domain (for Let's Encrypt)
email=myemail@example.org
domain=my.domain.org

cat >/root/compose.yaml <<EOL
version: "3.8"

services:

  traefik:
    image: "traefik:v2.10"
    container_name: "traefik"
    command:
      #- "--log.level=DEBUG"
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.web.http.redirections.entrypoint.to=websecure"
      - "--entrypoints.web.http.redirections.entrypoint.scheme=https"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.jatosresolver.acme.tlschallenge=true"
      #- "--certificatesresolvers.jatosresolver.acme.caserver=https://acme-staging-v02.api.letsencrypt.org/directory"
      - "--certificatesresolvers.jatosresolver.acme.email=${email}"
      - "--certificatesresolvers.jatosresolver.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - "./letsencrypt:/letsencrypt"
      - "/var/run/docker.sock:/var/run/docker.sock:ro"

  jatos:
    image: "jatos/jatos:latest"
    container_name: "jatos"
    ports:
      - "9000:9000"
    volumes:
      - "jatos-logs:/opt/jatos/logs"
      - "jatos-data:/opt/jatos_data"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.jatos.rule=Host(\`${domain}\`)"
      - "traefik.http.services.jatos.loadbalancer.server.port=9000"
      - "traefik.http.routers.jatos.entrypoints=websecure"
      - "traefik.http.routers.jatos.tls.certresolver=jatosresolver"

volumes:
  jatos-data:
  jatos-logs:
EOL

docker compose -f /root/compose.yaml up -d
```

This script uses [Docker Compose](/JATOS-with-Docker-Compose.html) to set up Traefik and JATOS. It creates a Docker Compose config file at `/root/compose.yaml` and runs it with `docker compose up`.

**Before clicking _Create Droplet_,** change `my.domain.org` and `myemail@example.org` at the top of the script.

### Set up your DNS

After you've created your Droplet, you need to **point your domain name to your server's IP address**. This is done via DNS (Domain Name Service) and involves setting up _DNS records_, especially _A records_ (for IPv4) or _AAAA records_ (for IPv6). You can [manage your DNS settings with DigitalOcean](https://www.digitalocean.com/docs/networking/dns/how-to/manage-records/) or through your domain registrar. The important part is to enter your server's IPv4 address in the _A record_ (or IPv6 in the _AAAA record_). DNS changes can take from a few minutes up to a day to propagate. You can use [nslookup](http://www.kloth.net/services/nslookup.php) to check if your DNS is set up correctly.

### Restart

Once your domain name points to your server's IP, **restart your server** (power off the Droplet and turn it back on). Traefik will then request a certificate for your domain and enable HTTPS. Sometimes a second restart is necessary.

**Done!** You now have a JATOS server with encryption and your own domain name.

### Misc

* Let's Encrypt has a [rate limit](https://letsencrypt.org/docs/rate-limits/) for the number of certificates. If you just want to try things out, uncomment the following line in the initialization script:

  ```shell
  - "--certificatesresolvers.jatosresolver.acme.caserver=https://acme-staging-v02.api.letsencrypt.org/directory"
  ```

  This uses the staging server, which has no rate limit, but you won't get a valid certificate.

* The Docker Compose config file created during Droplet initialization is at `/root/compose.yaml`, and the certificate is stored under `/root/letsencrypt/`.

* You can configure JATOS by editing `/root/compose.yaml`. You can add all [JATOS command-line arguments](/JATOS_Configuration.html) in the _command_ section of the _jatos_ service.

  For example, to add a [welcome message on the home page](/JATOS_Configuration.html#welcome-message), use `-Djatos.brandingUrl`:

  ```shell
    jatos:
      image: "jatos/jatos:latest"
      container_name: "jatos"
      command:
        - '-Djatos.brandingUrl=https://mydomain.com/foobar-university-welcome-page.html'
      ...
  ```

  Or, to let JATOS use an [external MySQL database](JATOS-with-MySQL.html), use `-Djatos.db.url`, `-Djatos.db.username`, `-Djatos.db.password`, and `-Djatos.db.driver` (change IP, port, username, and password to match your database):

  ```shell
    jatos:
      image: "jatos/jatos:latest"
      container_name: "jatos"
      command:
        - '-Djatos.db.url=jdbc:mysql://1.2.3.4:3306/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC'
        - '-Djatos.db.username=jatosuser'
        - '-Djatos.db.password=mypassword'
        - '-Djatos.db.driver=com.mysql.cj.jdbc.Driver'
      ...
  ```
