---
title: Deploy to a server installation
slug: /Deploy-to-a-server-installation.html
sidebar_position: 1
---

You'll typically develop your study on your local computer using a [local JATOS installation](Installation.html). Once it's ready, transferring the study to your [JATOS server](Bring-your-JATOS-online.html) is simple using the export and import features.

To deploy your ready-to-run study from your local installation to the server, follow these steps:

1.  On your **local** JATOS installation, open your study and click **Export** in the study toolbar. A pop-up window will appear. Save the [`.jzip` file](JATOS-Study-Archive-JZIP.html) to any location on your computer.
2.  On your **server** JATOS, go to the study sidebar (click **Studies** in the top-left), click "**+**", and then **Import study**. Select the `.jzip` file you exported earlier.

### Please note:

  * The local and server JATOS interfaces look almost identical; you'll primarily distinguish them by the URL in your browser. To help prevent confusion, a local JATOS installation features a **gray** JATOS logo in the top bar, while a server installation has a **colored** logo.
  * A **`.jzip` file** is a [JATOS Study Archive](JATOS-Study-Archive-JZIP.html), which uses the ZIP archive file format. It contains everything needed to describe a study, including its properties and assets. **Do not unzip it**; always import the `.jzip` file directly into JATOS.
  * The export/import process transfers all your study's assets (HTML/JS/CSS files, images, audio, etc.) contained in the local study folder. It **does not** transfer result data.
  * If you need to make changes to a study, we recommend doing so on your local JATOS. There, you have full access to the study assets and can easily modify them. Once done, simply **Export** from local and **Import** to your JATOS server again.
