---
title: JATOS with Nginx
slug: /JATOS-with-Nginx.html
sidebar_position: 11
---

This page provides an example configuration for using [Nginx](https://www.nginx.com/) as a reverse proxy in front of JATOS. While it is not strictly necessary to run JATOS behind a proxy, it is common practice—especially for enabling HTTPS.

A JATOS server that handles sensitive or private data should always use encryption (HTTPS). A good, free certificate provider is [certbot.eff.org](https://certbot.eff.org/) from the Electronic Frontier Foundation.

The following configuration is for `/etc/nginx/nginx.conf`. Adjust it to your needs—especially your server address (`www.example.com` in the example) and the paths to your SSL certificate and key.

As an additional security measure, you can uncomment the `location /jatos` block and configure your local network. This will restrict access to JATOS' GUI (all URLs starting with `/jatos`) to the local network.

~~~shell
user                    www-data;
pid                     /run/nginx.pid;
worker_processes        auto;
worker_rlimit_nofile    65535;

# Load modules
include                 /etc/nginx/modules-enabled/*.conf;

events {
    multi_accept        on;
    worker_connections  65535;
}

http {
    sendfile                on;
    tcp_nopush              on;
    client_max_body_size    500M;

    # MIME
    include                 mime.types;
    default_type            application/octet-stream;

    # Logging
    access_log              off;
    error_log               /var/log/nginx/error.log warn;

    proxy_buffering         off;
    proxy_set_header        Host $http_host;
    proxy_http_version      1.1;

    # Needed for WebSockets
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }

    # Load configs
    include /etc/nginx/conf.d/*.conf;

    upstream jatos-backend {
        server 127.0.0.1:9000;
    }

    # Redirect HTTP to HTTPS
    server {
        listen              80;
        server_name         www.example.com; # <-- Change to your domain
        rewrite             ^ https://www.example.com$request_uri? permanent;
    }

    server {
        listen               443 ssl http2;
        server_name          www.example.com; # <-- Change to your domain
        keepalive_timeout    70;

        # Encryption
        ssl_certificate      /etc/ssl/certs/localhost.crt;   # <-- Change to your certificate
        ssl_certificate_key  /etc/ssl/private/localhost.key; # <-- Change to your key
        ssl_protocols        TLSv1.2 TLSv1.3;

        # WebSocket location (JATOS' group and batch channels and the test page)
        location ~ "/(jatos/testWebSocket|publix/[a-z0-9-]+/(group/join|batch/open))" {
            proxy_pass              http://jatos-backend;
            proxy_http_version      1.1;
            proxy_set_header        Upgrade $http_upgrade;
            proxy_set_header        Connection $connection_upgrade;
            proxy_connect_timeout   7d; # Keep open for 7 days even without any transmission
            proxy_send_timeout      7d;
            proxy_read_timeout      7d;
        }

        # Restrict access to JATOS' GUI to local network, e.g. 192.168.1.*
        # location /jatos {
        #     allow                   192.168.1.0/24;
        #     deny                    all;
        #     proxy_pass              http://jatos-backend;
        # }

        # All other traffic
        location / {
            proxy_pass              http://jatos-backend;
        }
    }
}
~~~
