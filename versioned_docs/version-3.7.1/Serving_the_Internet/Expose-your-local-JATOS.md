---
title: Expose your local JATOS
slug: /Expose-your-local-JATOS.html
sidebar_position: 2
---

## Introduction

This page is about how to expose your locally installed JATOS to the Internet. That means using your personal computer as a server. If you want to know a bit more about the background, I recommend reading [Tunnelling services for exposing localhost to the web](https://www.chenhuijing.com/blog/tunnelling-services-for-exposing-localhost-to-the-web). There are several tunneling services and some of those are free or have at least a free offer. Here we concentrate on _ngrok_ and _localhost.run_. Both are working fine. Just pick one. If you have **Windows** and don't know SSH, _ngrok_ will suit you best since it has an installer.

But first some general advice:
* This way to bring JATOS online is the easiest to use - but also the **least reliable** one. Your local computer is prone to accidents (e.g. unplugged power cable, interrupted Internet). If you need a more dependable JATOS look at [Bring your JATOS online](Bring-your-JATOS-online.html).
* You have to **leave your computer running** you want your participants to access your JATOS with your study. Potentially you can use your computer in the mean time, but be aware that everything might interfere with JATOS, e.g. a crashed OS stops JATOS too. Better let your computer run in peace for the duration of your study.
* Find more reliable [ways to bring your JATOS online](Bring-your-JATOS-online.html)


## ngrok

1. Download & setup ngrok: [https://ngrok.com/download](https://ngrok.com/download)

1. I recommend creating an account with ngrok. It's free and ngrok gives you better connection compared to without.

1. Start your local JATOS

1. In your terminal move to the directory where you installed ngrok and start it with:

   ```shell
   ./ngrok http 9000
   ```
   
   The output should look similar to this:

   ![ngrok screenshot](/img/screenshot_ngrok.png)
   
1. Copy & Paste the URL with _https_ to your browser and check that JATOS is running properly with JATOS' build-in [tests](/Troubleshooting.html#jatos-test-page).

1. That's all. Now you can [create worker links](Run-your-Study-with-Study-Links.html) and send them to your participents. Remember to use JATOS under the _ngrog.io_ address when you create worker links (and not your localhost one).

More information on [https://ngrok.com](https://ngrok.com/).


## localhost.run

1. Start your local JATOS

1. Execute in your terminal

   ```shell
   ssh -R 80:localhost:9000 ssh.localhost.run
   ```

   E.g. the output could look like:
   
   ```shell
   $ ssh -R 80:localhost:9000 ssh.localhost.run
   Connect to http://kristian-44bs.localhost.run or https://kristian-44bs.localhost.run
   ```

1. Copy & Paste the URL with _https_ to your browser and check that JATOS is running properly with JATOS' build-in [tests](/Troubleshooting.html#jatos-test-page).

1. That's all. Now you can [create worker links](Run-your-Study-with-Study-Links.html) and send them to your participents. Remember to use JATOS under the _localhost.run_ address when you create worker links (and not your localhost one).

More information on [http://localhost.run/](http://localhost.run/).
