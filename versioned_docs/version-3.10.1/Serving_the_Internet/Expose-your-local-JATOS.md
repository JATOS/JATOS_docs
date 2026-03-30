---
title: Expose your local JATOS
slug: /Expose-your-local-JATOS.html
sidebar_position: 2
---

## Introduction

This page explains how to expose your locally installed JATOS to the Internet, meaning you use your personal computer as a server. For more background, see [Tunnelling services for exposing localhost to the web](https://www.chenhuijing.com/blog/tunnelling-services-for-exposing-localhost-to-the-web). There are several tunneling services, some of which are free or offer free tiers. Here, we focus on _ngrok_ and _localhost.run_. Both work well—just pick one. If you use **Windows** and are unfamiliar with SSH, _ngrok_ is recommended since it has an installer.

Some general advice:
* This is the easiest way to bring JATOS online, but also the **least reliable**. Your local computer is prone to accidents (e.g., unplugged power cable, interrupted Internet). If you need a more dependable JATOS, see [Bring your JATOS online](Bring-your-JATOS-online.html).
* You must **leave your computer running** for participants to access your JATOS and studies. You can use your computer in the meantime, but be aware that anything affecting your system (e.g., a crash) will also stop JATOS. It's best to let your computer run undisturbed for the duration of your study.
* For more reliable options, see [ways to bring your JATOS online](Bring-your-JATOS-online.html).

---

## ngrok

1. Download and set up ngrok: [https://ngrok.com/download](https://ngrok.com/download)
2. (Recommended) Create a free ngrok account for better connection quality.
3. Start your local JATOS.
4. In your terminal, navigate to the directory where you installed ngrok and start it with:

   ```shell
   ./ngrok http 9000
   ```

   The output should look similar to this:

   ![ngrok screenshot](/img/screenshot_ngrok.png)

5. Copy and paste the URL with _https_ into your browser and check that JATOS is running properly using JATOS' built-in [tests](/Troubleshooting.html#jatos-test-page).
6. That's it! Now you can [add study links](Run-your-Study-with-Study-Links.html) and send them to your participants. Remember to use the _ngrok.io_ address (not your localhost address) when sharing study links.

More information: [https://ngrok.com](https://ngrok.com/)

---

## localhost.run

1. Start your local JATOS.
2. In your terminal, execute:
   ```shell
   ssh -R 80:localhost:9000 ssh.localhost.run
   ```
   Example output:
   ```shell
   $ ssh -R 80:localhost:9000 ssh.localhost.run
   Connect to http://kristian-44bs.localhost.run or https://kristian-44bs.localhost.run
   ```
3. Copy and paste the URL with _https_ into your browser and check that JATOS is running properly using JATOS' built-in [tests](/Troubleshooting.html#jatos-test-page).
4. That's it! Now you can [add study links](Run-your-Study-with-Study-Links.html) and send them to your participants. Remember to use the _localhost.run_ address (not your localhost address) when sharing study links.

More information: [http://localhost.run/](http://localhost.run/)
