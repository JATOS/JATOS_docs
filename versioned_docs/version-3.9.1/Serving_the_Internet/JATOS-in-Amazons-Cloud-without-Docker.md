---
title: JATOS on AWS
slug: /JATOS-in-Amazons-Cloud-without-Docker.html
sidebar_position: 6
---

This page provides additional information on how to install JATOS on an AWS server. General installation advice can be found in [JATOS on a server](JATOS-on-a-server.html) and applies here as well. We recommend using JATOS together with a reverse proxy. See our instructions for [Apache](/JATOS-with-Apache.html) or [Nginx](/JATOS-with-Nginx.html). If you are looking for an easier way to install JATOS in the cloud, check out the tutorial [JATOS on DigitalOcean](JATOS-on-DigitalOcean.html).

1. Register at [AWS](https://aws.amazon.com/) (a credit card is required).
2. In the AWS web console, go to EC2 and launch a new instance with Ubuntu (other Linux distributions are also possible).
3. During the creation of the EC2 instance, you will be asked to create a key pair. Do so and download the key file (a `.pem` file). Store it in a safe place—this key is required to access your server.
4. Log in via SSH:  
   ```shell
   ssh -i /path/to/your/pem_key_file ubuntu@<your-public-ip>
   ```
   Use your instance's **public IP address** (found in AWS EC2 > Instances > Description).
5. Download the latest JATOS release:  
   - With bundled Java:  
     ```shell
     wget https://github.com/JATOS/JATOS/releases/latest/download/jatos_linux_java.zip
     ```
   - Without Java (you must install Java yourself):  
     ```shell
     wget https://github.com/JATOS/JATOS/releases/latest/download/jatos.zip
     ```
6. Unzip the downloaded file:  
   ```shell
   unzip jatos_linux_java.zip
   ```
   (If `unzip` is not installed, run `sudo apt-get install unzip`.)
7. If you **do not** use a reverse proxy like [Nginx](/JATOS-with-Nginx.html) or [Apache](/JATOS-with-Apache.html), configure the IP and port in `conf/jatos.conf` (or `conf/production.conf` for versions < 3.8.3):  
   - Use the **Private IP** (starts with 172.x.x.x) and port 80.
8. Allow inbound HTTP/HTTPS traffic: [See this AWS guide](https://aws.amazon.com/premiumsupport/knowledge-center/connect-http-https-ec2/).
9. (Optional) [Set up JATOS to auto-start](/JATOS-on-a-server.html#optional-auto-start-jatos-via-systemd).
10. Change the JATOS admin password.

