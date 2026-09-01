---
title: Installation
slug: /Installation
sidebar_position: 3
---

**Easy installation on your local computer - JATOS runs on MacOS, Windows and Linux**

Usually you first develop your study with JATOS on a local computer. Then in a second step you bring it to a server installation of JATOS.

With a local installation only you have access to JATOS - with a [server installation](JATOS-on-a-server.html) others can run your study via the internet too. This is especially true if you want to publish your study on Mechanical Turk.

**For convenience JATOS is available in a variant bundled with Java.**

To run JATOS, you need Java installed on your computer (to be precise, you need a Java Runtime Environment, aka JRE). Chances are, you already have Java installed. To check whether Java is installed on your system, type `java -version` in your terminal (MacOS X / Linux) or command window (MS Windows). 
If you don't have Java installed, you can either [download and install it directly](http://www.oracle.com/technetwork/java/javase/downloads/index.html) or download and install JATOS bundled with Java, according to your operating system. 


## Installation MS Windows 

1. Download the [latest JATOS release](https://github.com/JATOS/JATOS/releases/latest) (exchange 'xxx' with the current version)
 * Without Java: *jatos-xxx.zip*
 * Bundled with Java: *jatos-xxx_win_java.zip*
1. Unzip the downloaded file. You can place the unzipped folder pretty much anywhere, **except** in a folder that synchs across devices, like Dropbox or Google Drive. [Find out](Troubleshooting.html#database-is-corrupted.html) more about why not.
1. In the File Explorer move to the unzipped JATOS folder and double-click on `loader.bat`. (Or `loader` alone, if your filename extensions are hidden). A command window will open and run your local JATOS installation. Simply close this window if you want to stop JATOS.
1. All set! Now go to the browser of your choice and open [http://localhost:9000/jatos/login](http://localhost:9000/jatos/login). You should see the login screen (wait a moment and reload the page if you don't). Login with username 'admin' and password 'admin'.

## Installation MacOS X and Linux

1. Download the [latest JATOS release](https://github.com/JATOS/JATOS/releases/latest) (exchange 'xxx' with the current version)
   * Without Java: *jatos-xxx.zip*
   * For MacOS bundled with Java: *jatos-xxx_mac_java.zip*
   * For Linux bundled with Java: *jatos-xxx_linux_java.zip*
1. Unzip the downloaded file. You can place the unzipped folder pretty much anywhere, **except** in a folder that synchs across devices, like Dropbox or Google Drive. [Find out](Troubleshooting.html#database-is-corrupted.html) more about why not.
1. In your terminal window, cd into the unzipped JATOS folder
1. Run the loader shell script with the command `./loader.sh start` (You might have to change the file's permissions with the command `chmod u+x loader.sh` to make it executable). Ignore pop-ups like 'To use the java command-line tool you need to install a JDK' - just press 'OK'.
1. All set! Now go to the browser of your choice and open [http://localhost:9000/jatos/login](http://localhost:9000/jatos/login). You should see the login screen (wait a moment and reload the page if you don't). Login with username 'admin' and password 'admin'.

Your local JATOS installation will run in the background. If you want to stop it, just type `./loader.sh stop` in your terminal window.

## How to go on from here

The easiest way to start with JATOS is to download and import one of the [example studies](Example-Studies.html) and [play around with it](Get-started.html).
