---
title: JATOS on DigitalOcean
slug: /JATOS-on-DigitalOcean.html
sidebar_position: 5
---

On this page we want to explain how to install JATOS in the cloud by using [DigitalOcean](https://www.digitalocean.com). DigitalOcean is a cloud provider (like _AWS_, _Google Cloud_, _Azure_ etc.) that is comparatively easy to use and has good documentation. And btw. we have no connections to DigitalOcean whatsoever.

**Keep in mind: A server in the cloud will cost money (depending on the size $5 to $50 / month (and more)) and to open an account with DigitalOcean you will need a credit card.**


## Deploy JATOS with DigitalOcean Apps

DigitalOcean offers something called _Apps_ ([more info](https://docs.digitalocean.com/products/app-platform/how-to/create-apps/)) that makes it pretty easy to install JATOS in the Internet: if everything runs smoothly you don't have to use the terminal at all. You can watch the video here or follow the instructions further down.

import ReactPlayer from 'react-player'

<ReactPlayer controls width='100%' height='100%' url='/deploy_as_app_on_digitalocean.webm' />

1. Sign in to [DigitalOcean](https://cloud.digitalocean.com)

1. Click _Deploy to DigitalOcean_ button. This will open DigitalOcean's App page and prefill some settings for you. By default the latest version of JATOS is set up to be installed.

   <a href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/JATOS/JATOS_docs/tree/main&refcode=4aacf16a23c6">
     <img src="https://www.deploytodo.com/do-btn-blue-ghost.svg" alt="Deploy to DO"></img>
   </a>

1. You can check the setup or go right to _Review_.

1. Under _Review_ click on _Edit Plan_ and select _Instance Size_. E.g. for a simple JATOS server for testing purpose you might want to select _1 GB RAM | 1 vCPU_. Leave _Container_ at _     1_. Then click _Back_.

1. Finally click _Create Resources_ and wait until JATOS is deployed (this will take a minute or two).

1. As soon as you see the button _Live App_ click on it. The JATOS login page will appear.

1. Log in with 'admin' and 'admin'.

Done. Now you have a JATOS server accessible from the Internet, including encryption and a free domain name (something like _jatos-abc.ondigitalocean.app_).

**Don't forget to change your admin user's password.** Go to admin's user page (top-right corner) and and press button _Change Password_.

DigitalOcean charges you by the second. So if you want to create a new JATOS server because something went wrong, just destroy the current one and start over again.


## Destroy your JATOS server

If you want to destroy your server again, go to your App's page in DigitalOcean and click on _Actions_ (top right) -> _Destroy App_. This will completely remove your JATOS server and delete all data that was collected with it.


## Next steps

* [Configure JATOS](http://localhost:3000/JATOS_Configuration.html)
* [Attach JATOS to a MySQL or MariaDB database](/JATOS-with-MySQL.html)
* [Change the domain name](https://docs.digitalocean.com/products/app-platform/how-to/manage-domains/)