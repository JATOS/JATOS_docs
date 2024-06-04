---
title: JATOS with Apache
slug: /JATOS-with-Apache.html
sidebar_position: 12
---

This is an example of a configuration of [Apache](https://httpd.apache.org/) as a reverse proxy in front of JATOS. While it's not necessary to run JATOS with a proxy, it's common to do so in order to add encryption.

It is necessary to use at least Apache **version 2.4** since JATOS relies on WebSockets that aren't supported by earlier versions. 

A JATOS server that handles sensitive or private data should always use encryption (HTTPS). A nice free certificate issuer is [certbot.eff.org](https://certbot.eff.org/) from the Electronic Frontier Foundation.

You have to add some modules to Apache to get it working:

~~~shell
a2enmod proxy proxy_http proxy_wstunnel http2 rewrite headers ssl
~~~

The following is an example of a proxy config with Apache. It is stored it in `/etc/apache2/sites-available/example.com.conf` and added it to Apache with the command `sudo a2ensite example.com.conf`. Change it to your needs. You probably want to change your servers address (`www.example.com` in the example) and the path to the SSL certificate and its key.

For JATOS versions 3.8.1 and older it is necessary to set the `X-Forwarded-*` headers with `RequestHeader set X-Forwarded-Proto "https"` and `RequestHeader set X-Forwarded-Ssl "on"` and `ProxyPreserveHost On` to tell JATOS the original requester's address. This is not necessary with version 3.8.2 and newer.

As an additional security measurement you can uncomment the `<Location "/jatos">` and config your local network. This will restrict the access to JATOS' GUI (every URL starting with `/jatos`) to the local network.

~~~shell
<VirtualHost *:80>
  ServerName www.example.com
  
  # Redirect all unencrypted traffic to the respective HTTPS page
  Redirect "/" "https://www.example.com/"
</VirtualHost>

<VirtualHost *:443>
  ServerName www.example.com

  # Restrict access to JATOS GUI to local network
  #<Location "/jatos">
  #  Order deny,allow
  #  Deny from all
  #  Allow from 127.0.0.1 ::1
  #  Allow from localhost
  #  Allow from 192.168
  #</Location>

  # Your certificate for encryption
  SSLEngine On
  SSLCertificateFile /etc/ssl/certs/localhost.crt
  SSLCertificateKeyFile /etc/ssl/private/localhost.key

  # JATOS uses WebSockets for its batch and group channels
  RewriteEngine On
  RewriteCond %{HTTP:Upgrade} =websocket [NC]
  RewriteRule /(.*)           ws://localhost:9000/$1 [P,L]
  RewriteCond %{HTTP:Upgrade} !=websocket [NC]
  RewriteRule /(.*)           http://localhost:9000/$1 [P,L]

  # Proxy everything to the JATOS running on localhost on port 9000
  ProxyPass / http://localhost:9000/
  ProxyPassReverse / http://localhost:9000/
</VirtualHost>
~~~
