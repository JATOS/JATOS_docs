---
title: Deploy to a server installation
slug: /Deploy-to-a-server-installation.html
sidebar_position: 1
---

Usually you conveniently develop your study on your local computer where you have a [local installation of JATOS](Installation.html). Then just use the export and import buttons in your installations to transfer the study to your [JATOS server](Bring-your-JATOS-online.html).

If you have a server already, you will need to take your ready-to-run study from your local installation and deploy it to the server. In order to do this:
1. On your *local* JATOS installation, where your study is, click on the study you want to export on the left sidebar. 
1. On the Study bar, click Export. A pop-up window will appear. Save the [_.jzip_](JATOS-Study-Archive-JZIP.html) file wherever you like on your computer.  
1. On your *server* installation, simply click Import. 

Here's a little sketch of the same three steps above
![jzip workflow](/img/jzipWorkflow.png)


**Please note that:**

* The two JATOS look almost identical, and you will (basically) only distinguish them on the basis of the URL in the browser. To prevent confusion, we've made it easier: A local JATOS installation has a **black bar** on top. A server installation has a **light-grey bar**. 
* A **_.jzip_** file is a [JATOS Study Archive](JATOS-Study-Archive-JZIP.html). It is using the ZIP archive file format. It contains everything to describe a study like study properties and study assets. Do not unzip it - Always import the *.jzip* to JATOS. 
* In the process of exporting/importing you'll transfer all assets of your study (HTML/JS/CSS files, images, audio, etc) contained in the local study folder. You will **not** transfer result data. 
* If you want to make changes to a study, we also recommend that you so in the local JATOS. There you have full access to the study assets and can change and edit them easily. Then again you can Export → Import to the JATOS server. 



