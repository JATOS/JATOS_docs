---
title: Installation
slug: /Installation.html
sidebar_position: 3
---

## Easy Installation on Your Local Computer

**JATOS runs on macOS, Windows, and Linux.**

A local installation of JATOS is straightforward. Typically, you'll develop your study with JATOS on a local computer first. In a second step, you can then move it to a server installation of JATOS.

A local installation grants only you access to JATOS. With a [server installation](Bring-your-JATOS-online.html), others can run your study via the internet.

### Java Requirement

To run JATOS, you need **Java 11** installed on your computer (specifically, a Java Runtime Environment, or JRE). You might already have Java installed. To check, open your terminal (macOS / Linux) or command window (Windows) and type `java -version`.

If Java isn't installed, you have two options:

1.  Download and install Java (e.g., from [adoptium.net](https://adoptium.net/)).
2.  Download and install a JATOS bundle that includes Java for your operating system.

### Installation Windows

1.  Download the [latest JATOS release](https://github.com/JATOS/JATOS/releases/latest).
      * **Without Java:** `jatos.zip`
      * **Bundled with Java:** `jatos_win_java.zip`
2.  Unzip the downloaded file. You can place the unzipped folder almost anywhere, **except** in a folder that syncs across devices, such as Dropbox or Google Drive. [Learn more](Troubleshooting.html#database-is-corrupted.html) about why this restriction exists.
3.  In File Explorer, navigate to the unzipped JATOS folder and double-click on `loader.bat` (or `loader` if file extensions are hidden). A command window will open and run your local JATOS installation. To stop JATOS, simply close this window.
4.  Once JATOS is running, open your preferred browser and go to [http://localhost:9000/](http://localhost:9000/). You should see the login screen. If not, wait a moment and then reload the page. Log in with the username `admin` and password `admin`.

### Installation macOS and Linux

1.  Download the [latest JATOS release](https://github.com/JATOS/JATOS/releases/latest).
      * **Without Java:** `jatos.zip`
      * **For macOS bundled with Java:** `jatos_mac_java.zip`
      * **For Linux bundled with Java:** `jatos_linux_java.zip`
2.  Unzip the downloaded file. You can place the unzipped folder almost anywhere, **except** in a folder that syncs across devices, such as Dropbox or Google Drive. [Learn more](Troubleshooting.html#database-is-corrupted.html) about why this restriction exists.
3.  Open your terminal and `cd` into the unzipped JATOS folder.
4.  Run the loader shell script with the command `./loader.sh start`. You might need to change the file's permissions to make it executable using `chmod u+x loader.sh`. You can ignore pop-ups such as "To use the java command-line tool you need to install a JDK" — simply press "OK."
5.  **On macOS, you might see a pop-up indicating that the application cannot be opened from an unknown developer. In this case, click *Open Anyway* within the *Privacy & Security* tab in your *System Settings*. More details on this are provided below.**
6.  Once JATOS is running, open your preferred browser and go to [http://localhost:9000/](http://localhost:9000/). You should see the login screen. If not, wait a moment and then reload the page. Log in with the username `admin` and password `admin`.

-----

### Handling macOS Security Prompts

Depending on your macOS version, you might encounter prompts asking for confirmation to run the downloaded Java. For example, on macOS Sequoia, there are three additional steps:

1.  Click "Done" on the initial pop-up stating that Java wasn't opened.

2.  Go to **System Settings** \> **Privacy & Security** \> then click **Allow Anyway**.

3.  Click "Open Anyway" when prompted again.

-----

### Next Steps

The easiest way to begin with JATOS is to download and import one of the [example studies](/Example-Studies) and [experiment with it](Get-started.html).