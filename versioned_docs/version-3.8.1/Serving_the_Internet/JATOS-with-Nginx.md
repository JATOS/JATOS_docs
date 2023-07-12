---
title: JATOS with Nginx
slug: /JATOS-with-Nginx.html
sidebar_position: 11
---

Here is an example for a configuration of [Nginx](https://www.nginx.com/) as a reverse proxy in front of JATOS. It is not necessary to run JATOS with a proxy but it's common.

A JATOS server that handles sensitive or private data should always use encryption (HTTPS). A nice free certificate issuer is [certbot.eff.org](https://certbot.eff.org/) from the Electronic Frontier Foundation.

The following config is the content of `/etc/nginx/nginx.conf`. Change it to your needs. You probably want to change your servers address (`www.example.com` in the example) and the path to the SSL certificate and its key.

For JATOS versions 3.8.1 and older it is necessary to set the `X-Forwarded-*` headers with `proxy_set_header` to tell JATOS the original requester's IP address. This is not necessary from 3.8.2 and newer.

As an additional security measurement you can uncomment the `location /jatos` and config your local network. This will restrict the access to JATOS' GUI (every URL starting with `/jatos`) to the local network.

~~~ shell
user                    www-data;
pid                     /run/nginx.pid;
worker_processes        auto;
worker_rlimit_nofile    65535;

# Load modules
include                 /etc/nginx/modules-enabled/*.conf;

events {
    multi_accept       on;
    worker_connections 65535;
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

    # Needed for websockets
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }

    # Load configs
    include /etc/nginx/conf.d/*.conf;

    upstream jatos-backend {
        server 127.0.0.1:9000;
    }

    # Redirect http to https
    server {
        listen              80;
        server_name         www.example.com;
        rewrite             ^ https://www.example.com$request_uri? permanent;
    }

    server {
        listen               443 ssl http2;
        server_name          www.example.com;
        keepalive_timeout    70;

        # Encryption
        ssl_certificate      /etc/ssl/certs/localhost.crt;
        ssl_certificate_key  /etc/ssl/private/localhost.key;
        ssl_protocols        TLSv1.2 TLSv1.3;

        # WebSocket location (JATOS' group and batch channel and the test page)
        location ~ "/(jatos/testWebSocket|publix/[a-z0-9-]+/(group/join|batch/open))" {
            proxy_pass              http://jatos-backend;
            proxy_http_version      1.1;
            proxy_set_header        Upgrade $http_upgrade;
            proxy_set_header        Connection $connection_upgrade;
            proxy_connect_timeout   7d; # Keep open for 7 days even without any transmission
            proxy_send_timeout      7d;
            proxy_read_timeout      7d;
        }

        # Restrict access to JATOS' GUI to local network 192.168.1.*
        # location /jatos {
        #     allow                   192.168.1.0/24;
        #     deny                    all;
        #     proxy_pass              http://jatos-backend;
        #     proxy_connect_timeout   300;
        #     proxy_send_timeout      300;
        #     proxy_read_timeout      300;
        #     send_timeout            300;
        # }

        # All other traffic
        location / {
            proxy_pass              http://jatos-backend;
            proxy_connect_timeout   300;
            proxy_send_timeout      300;
            proxy_read_timeout      300;
            send_timeout            300;
        }
    }
}
~~~