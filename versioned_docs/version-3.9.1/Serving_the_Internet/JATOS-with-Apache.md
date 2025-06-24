---
title: JATOS with Apache
slug: /JATOS-with-Apache.html
sidebar_position: 12
---

This page provides an example configuration for using [Apache](https://httpd.apache.org/) as a reverse proxy in front of JATOS. While it's not strictly necessary to run JATOS behind a proxy, it is common practice to add encryption (HTTPS).

**Note:** You must use at least Apache **version 2.4**, as JATOS relies on WebSockets, which are not supported in earlier versions.

A JATOS server that handles sensitive or private data should always use encryption (HTTPS). A good, free certificate provider is [certbot.eff.org](https://certbot.eff.org/) from the Electronic Frontier Foundation.

Enable the required Apache modules:

```shell
a2enmod proxy proxy_http proxy_wstunnel http2 rewrite headers ssl
```

## Example Config with HTTPS Encryption

Below is an example Apache proxy configuration. Save it as `/etc/apache2/sites-available/example.com.conf` and enable it with `sudo a2ensite example.com.conf`. Adjust the server address (`www.example.com`) and the paths to your SSL certificate and key as needed.

```
ServerName www.example.com

<VirtualHost *:80>
  # Redirect all unencrypted traffic to HTTPS
  Redirect "/" "https://www.example.com/"
</VirtualHost>

<VirtualHost *:443>
  # SSL certificate for encryption
  SSLEngine On
  SSLCertificateFile /etc/ssl/certs/localhost.crt
  SSLCertificateKeyFile /etc/ssl/private/localhost.key

  # JATOS uses WebSockets for batch and group channels
  RewriteEngine On
  RewriteCond %{HTTP:Upgrade} =websocket [NC]
  RewriteRule /(.*)           ws://localhost:9000/$1 [P,L]
  RewriteCond %{HTTP:Upgrade} !=websocket [NC]
  RewriteRule /(.*)           http://localhost:9000/$1 [P,L]
</VirtualHost>
```

## Restrict Access to the JATOS GUI to a Local Network (Optional)

All JATOS GUI pages start with `/jatos`. As an additional security measure, you can restrict access to the GUI to certain networks. For example:

```
ServerName www.example.com

<VirtualHost *:80>
  Redirect "/" "https://www.example.com/"
</VirtualHost>

<VirtualHost *:443>
  # Restrict access to JATOS' GUI to the local network
  <Location "/jatos">
    Order deny,allow
    Deny from all
    Allow from 127.0.0.1 ::1
    Allow from localhost
    Allow from 192.168
  </Location>

  SSLEngine On
  SSLCertificateFile /etc/ssl/certs/localhost.crt
  SSLCertificateKeyFile /etc/ssl/private/localhost.key

  RewriteEngine On
  RewriteCond %{HTTP:Upgrade} =websocket [NC]
  RewriteRule /(.*)           ws://localhost:9000/$1 [P,L]
  RewriteCond %{HTTP:Upgrade} !=websocket [NC]
  RewriteRule /(.*)           http://localhost:9000/$1 [P,L]
</VirtualHost>
```

## Serving Additional Static Files

The recommended way to store files needed in JATOS studies is the [study assets folder](Write-your-own-Study-Basics-and-Beyond.html#study-assets). This ensures that only participants with a valid study code can access those files.

However, there are scenarios where you may want to store files outside the study assets folder—for example, if you need to serve a large number of files, very large files, or want to enable caching. In such cases, it makes sense to serve them directly with Apache.

The following config assumes your static files are in `/var/www/html/static`:

```
ServerName www.example.com

<VirtualHost *:80>
  Redirect "/" "https://www.example.com/"
</VirtualHost>

<VirtualHost *:443>
  SSLEngine On
  SSLCertificateFile /etc/ssl/certs/localhost.crt
  SSLCertificateKeyFile /etc/ssl/private/localhost.key

  RewriteEngine On

  # WebSockets for JATOS batch and group channels
  RewriteCond %{HTTP:Upgrade} =websocket [NC]
  RewriteRule /(.*)           ws://localhost:9000/$1 [P,L]

  # Serve static files directly
  RewriteCond %{REQUEST_URI}  !^/static.*
  RewriteCond %{HTTP:Upgrade} !=websocket [NC]
  RewriteRule /(.*)           http://localhost:9000/$1 [P,L]
</VirtualHost>
```
