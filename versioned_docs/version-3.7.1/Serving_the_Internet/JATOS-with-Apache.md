---
title: JATOS with Apache
slug: /JATOS-with-Apache.html
sidebar_position: 9
---

This is an example of a configuration of [Apache](https://httpd.apache.org/) as a proxy in front of JATOS. While it's not necessary to run JATOS with a proxy, it's common to do so in order to allow encryption.

Here I used Apache 2.4.18 on a Ubuntu system. I recommend to use at least **version 2.4** since JATOS relies on WebSockets that aren't supported by earlier Apache versions. 

I had to add some modules to Apache to get it working:

~~~ shell
sudo a2enmod rewrite
sudo a2enmod proxy_wstunnel
sudo a2enmod proxy
sudo a2enmod headers
sudo a2enmod ssl
sudo a2enmod lbmethod_byrequests
sudo a2enmod proxy_balancer
sudo a2enmod proxy_http
sudo a2enmod remoteip
~~~

The following is an example of a proxy config with Apache. I stored it in `/etc/apache2/sites-available/example.com.conf` and added it to Apache with the command `sudo a2ensite example.com.conf`.

* It enforces access via HTTPS by redirecting all HTTP traffic.
* As an additional security measurement you can uncomment the `<Location "/jatos">` and config your local network. This will restrict the access to JATOS' GUI (every URL starting with `/jatos`) to the local network.

~~~ shell
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

  # Needed for JATOS to get the correct host and protocol
  ProxyPreserveHost On
  RequestHeader set X-Forwarded-Proto "https"
  RequestHeader set X-Forwarded-Ssl "on"
  
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
