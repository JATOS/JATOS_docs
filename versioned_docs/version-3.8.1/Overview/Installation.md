---
title: Installation
slug: /Installation.html
sidebar_position: 3
---

### Easy installation on your local computer

**JATOS runs on MacOS, Windows and Linux**

A local installation is straightforward.

Usually you first develop your study with JATOS on a local computer. Then in a second step you bring it to a server installation of JATOS.

With a local installation only you have access to JATOS - with a [server installation](Bring-your-JATOS-online.html) others can run your study via the internet too. This is especially true if you want to publish your study on Mechanical Turk.

**For convenience JATOS is available as a bundle with Java.**

To run JATOS, you need Java 11 installed on your computer (to be precise, you need a Java Runtime Environment, aka JRE). Chances are, you already have Java installed. To check whether Java is installed on your system, type `java -version` in your terminal (MacOS / Linux) or command window (Windows). 
If you don't have Java installed, you can either download and install it (e.g. from [adoptium.net](https://adoptium.net/)) or download and install JATOS bundled with Java for your operating system. 


### Installation Windows 

1. Download the [latest JATOS release](https://github.com/JATOS/JATOS/releases/latest)
   * Without Java: *jatos.zip*
   * Bundled with Java: *jatos_win_java.zip*
1. Unzip the downloaded file. You can place the unzipped folder pretty much anywhere, **except** in a folder that synchs across devices, like Dropbox or Google Drive. [Find out](Troubleshooting.html#database-is-corrupted.html) more about why not.
1. In the File Explorer move to the unzipped JATOS folder and double-click on `loader.bat`. (Or `loader` alone, if your filename extensions are hidden). A command window will open and run your local JATOS installation. Simply close this window if you want to stop JATOS.
1. All set! Now go to the browser of your choice and open [localhost:9000](http://localhost:9000). You should see the login screen (wait a moment and reload the page if you don't). Login with username 'admin' and password 'admin'.

### Installation MacOS and Linux

1. Download the [latest JATOS release](https://github.com/JATOS/JATOS/releases/latest)
   * Without Java: *jatos.zip*
   * For MacOS bundled with Java: *jatos_mac_java.zip*
   * For Linux bundled with Java: *jatos_linux_java.zip*
1. Unzip the downloaded file. You can place the unzipped folder pretty much anywhere, **except** in a folder that synchs across devices, like Dropbox or Google Drive. [Find out](Troubleshooting.html#database-is-corrupted.html) more about why not.
1. In your terminal window, `cd` into the unzipped JATOS folder
1. Run the loader shell script with the command `./loader.sh start` (You might have to change the file's permissions with the command `chmod u+x loader.sh` to make it executable). Ignore pop-ups like '_To use the java command-line tool you need to install a JDK_' - just press 'OK'.
1. All set! Now go to the browser of your choice and open [localhost:9000](http://localhost:9000). You should see the login screen (wait a moment and reload the page if you don't). Login with username 'admin' and password 'admin'.

Your local JATOS installation will run in the background. If you want to stop it, just type `./loader.sh stop` in your terminal window.

### How to go on from here

The easiest way to start with JATOS is to download and import one of the [example studies](/Example-Studies) and [play around with it](Get-started.html).
