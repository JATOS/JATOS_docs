---
title: Example Group Studies
slug: /Example-Group-Studies.html
sidebar_position: 1
---

In group studies, workers who are part of the same group can communicate with each other. JATOS supports various types of groups. For example, a group can have a fixed set of workers, as seen in the [Prisoner's Dilemma](Example-Studies) where exactly two workers play together. On the other end of the spectrum is the [Snake game](Example-Studies), which utilizes an open, multi-worker approach.

### How to Simulate Multiple Workers in a Group Study

**How can you try out a group study if you're alone but want to simulate multiple workers?**

JATOS allows for [multiple study runs](Tips-and-Tricks.html#run-studies-simultaneously-in-the-same-browser) simultaneously within the same browser (there is no limit for different browsers). This means you can easily simulate multiple workers by simply starting the same (group) study multiple times in your browser.

As an example, let's walk through the Snake Game group study in detail:

1.  Download and import the [Snake game](Example-Studies).
2.  Open the [Study Links](Run-your-Study-with-Study-Links.html) page for the Snake Game study.
3.  **Get a study link to start the first Snake game:**
      * Click on the **Study Links** button in the "Personal Multiple" row (other study link types can also work).
      * In the pop-up window, click the top-left button '<span class="glyphicon glyphicon-plus"></span><span class="glyphicon glyphicon-link"></span>' to generate a new link.
      * Then, click the <FAIcon icon="fa-regular fa-clipboard" /> button in the link's row to copy it to your clipboard.
4.  Open a new tab in your browser and paste the study link into the address bar. Press 'Enter' to start the study.
5.  Repeat the last step to start a second Snake game in another new tab.
6.  Now, in both tabs, navigate through the introduction until you reach the waiting room. Click **Join** and then **Ready**.
7.  Voilà\! You'll see two snakes moving around. Each tab is running the Snake Game, and both are communicating within the same group.
8.  **Optional:** Take a look at your [Group in the Study Links page](Run-your-Study-with-Study-Links.html#groups) to see the member workers.

![Snake example](/img/example-studies/Screenshot_snakeGame.png)

There's a lot happening behind the scenes of a group study. All members of a group can communicate in real-time with each other directly or broadcast messages to the entire group.

Next step: [Write Your Own Group Studies](Write-Group-Studies-I-Setup.html).