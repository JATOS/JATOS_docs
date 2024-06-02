---
title: JATOS on DigitalOcean
slug: /JATOS-on-DigitalOcean.html
sidebar_position: 5
---

Here we explain how to install JATOS in the cloud by using [DigitalOcean](https://www.digitalocean.com). DigitalOcean is a cloud provider (like _AWS_, _Google Cloud_, _Azure_ etc.). We provide this example because DigitalOcean is comparatively easy to use and has good documentation - but we have no connection to DigitalOcean whatsoever.

**Keep in mind: A server in the cloud will cost money (depending on the size $5 to $50 / month (and more)) and to open an account with DigitalOcean you will need a credit card.**


## Set up a simple JATOS server on DigitalOcean

First we want to set up a simple JATOS server without encryption (HTTPS) or a domain name. 

DigitalOcean offers something called _Droplet_, that is basically a virtual machine, and we want to use it as a server for JATOS. If everything runs smoothly you don't have to use the terminal at all. You can watch the video here or follow the instructions further down.

import ReactPlayer from 'react-player'

<ReactPlayer controls width='100%' height='100%' url='/deploy_to_digitalocean_wo_domain_and_encryption.mp4' />

1. Set up an account with [DigitalOcean](https://www.digitalocean.com/) - you'll have to provide billing information.

1. Create a _Droplet_ (this is what DigitalOcean calls a virtual machine that we want to use as a server).

1. Choose the _Region_ that is nearest to your users. 

1. Choose an image from _Marketplace_: select one with _Docker_ on _Ubuntu_ pre-installed.

1. Choose a _Size_: For _Droplet type_ often _Basic_ is enough and for _CPU options_: _Regular_. Choose memory 1 to 4 GB according to your expected server load. Don't spend to much time on this, choose the smaller one - you can increase the size later on. If you just want to try it out: a _Regular_ with 1GB for will do it.

1. Choose an _authentication method_

1. Click on _Advanced Options_ and activate _Add Initialization scripts_. Then copy+paste the following script in the text field:

   ```shell
   #!/bin/bash
   docker run -d --restart=always -p 80:9000 jatos/jatos:latest
   ```

   You can change 'latest' to the [specific version](https://hub.docker.com/r/jatos/jatos/tags) you need.

1. Finally click the _Create Droplet_ button

1. Try out your JATOS: Now the server is being created which can take a couple minutes. Copy the server's (aka Droplet) IP address into your browser's address bar and if everything went well, you will see a JATOS login screen.

1. Log in with the default credentials 'admin' and 'admin'.

Done! Now you have a basic JATOS server accessible from the Internet.

**Don't forget to change your admin user's password.** Go to the admin user page (top-right corner) and and press button _Change Password_.

DigitalOcean charges you by the second. So if you want to create a new JATOS server because something went wrong, just destroy the current one and start over again.


## Destroy your JATOS server

If you want to destroy your server, go to your Droplet's page in DigitalOcean and click on _More_ -> _Destroy_. This will completely remove your JATOS server and delete all data that was collected with it. It will also delete any studies you uploaded. 


## Set up JATOS with HTTPS and a domain

This part is **optional** and is only necessary if you want to have your own domain name instead of an IP and use encryption (HTTPS).

We will use [Traefik](https://github.com/traefik/traefik) as a proxy. Traefik adds encryption out-of-the-box (by using [Let’s Encrypt](https://letsencrypt.org/)) and is [open source](https://github.com/traefik/traefik) and free to use. 

**Get your own domain name**: Sorry, we can't give you a domain name - you have to get your own. But there are plenty domain name registrars that help you with this business (just search for "domain registrars"). Another option is to talk to your IT department and convince them to give you a subdomain for free.

Now with a domain name you can encrypt your server's communication with HTTPS.

But first a **summary of the work flow**: 
1. Create droplet
1. Set up your DNS
1. Restart droplet
1. Wait until you can reach the webpage

### Create Droplet

To create a JATOS server with Traefik follow the instructions of the first section ([Set up a simple JATOS server on DigitalOcean](/JATOS-on-DigitalOcean.html#set-up-a-simple-jatos-server-on-digitalocean)) but in the field for the _Add Initialization scripts_ put the following script:

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

This script will use [Docker Compose](/JATOS-with-Docker-Compose.html) to set up Traefik and JATOS. It creates a Docker Compose config file under _/root/compose.yaml_ and then runs it with `docker compose up`. 

**Before you can click the _Create Droplet_ button**, change `my.domain.org` and `myemail@example.org` (in the top of the script) with your own domain name and email address. Your email is needed to get a certificate from [Let's Encrypt](https://letsencrypt.org/) for encryption. Also, you might want to set JATOS version to a [specific release](https://hub.docker.com/r/jatos/jatos/tags): change `latest` in the line `image: "jatos/jatos:latest"`.

### Set up your DNS

After you've created your Droplet, you still have to **point your domain name to your server's IP address**. This is what a DNS (Domain Name Service) does and it involves dealing with things like _DNS records_, especially _A records_ or _AAAA records_, and simply can be quite annoying. You can [manage your DNS settings with Digital Ocean](https://www.digitalocean.com/docs/networking/dns/how-to/manage-records/) or the registrar where you got your domain name (they will have some online help). The important thing is to put the _IPv4_ address of your server into the _A record_ of your DNS settings (or if you have an _IPv6_ address the _AAAA record_). And remember, DNS changes can take from some minutes to a day to propagate throughout the Internet - So your domain name might take some time to work (you can use [nslookup](http://www.kloth.net/services/nslookup.php) to check).

### Restart

Then as a last step, after your domain name points to your server's IP, you have to **restart your server** (switch off the Droplet and back on). Now Traefik requests a certificate for your domain and uses HTTPS from now on. Sometimes it's necessary to restart a second time.

**Done**. You have a JATOS server with encryption and your domain name.

### Misc

* Let's Encrypt has a [rate limit](https://letsencrypt.org/docs/rate-limits/) for the number of certificates. If you are not sure and just want to try it out, uncomment the following line in the _Initialization script_:

  ```shell
  - "--certificatesresolvers.jatosresolver.acme.caserver=https://acme-staging-v02.api.letsencrypt.org/directory"
  ```

  This will let you use their staging server that does not have such rate limit - but you won't get a proper certificate either. 

* The Docker Compose config file that is created during the Droplet initialization has the path `/root/compose.yaml` and the certificate is stored under `/root/letsencrypt/`.

* You can configure JATOS by changing the `/root/compose.yaml`. You can add all [command-line arguments of JATOS](/JATOS_Configuration.html) in the _command_ section of the _jatos_ service_.

  E.g. to add a [welcome message on the home page](/JATOS_Configuration.html#welcome-message) use `-Djatos.brandingUrl`:

  ```shell
    jatos:
      image: "jatos/jatos:latest"
      container_name: "jatos"
      command:
        - '-Djatos.brandingUrl=https://mydomain.com/foobar-university-welcome-page.html'
      ...
  ```

  E.g. to let JATOS use an [external MySQL database](/JATOS_Configuration.html#database) use `-Djatos.db.url`, `-Djatos.db.username`, `-Djatos.db.password`, and `-Djatos.db.driver` (change IP, port, username and password to the ones of your database)

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
