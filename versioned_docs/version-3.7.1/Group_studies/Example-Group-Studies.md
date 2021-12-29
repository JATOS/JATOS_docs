---
title: Example Group Studies
slug: /Example-Group-Studies.html
sidebar_position: 1
---

In group studies, the workers that are part of a group can communicate with each other. JATOS supports different kinds of groups. A group can e.g. have a fixed set of workers like this [Prisoner's Dilemma](Example-Studies.html#prisoners-dilemma) where exactly two workers play with each other. On the other side of the spectrum is this [Snake game](Example-Studies.html#snake) with an on open, multi-worker approach.

**How can you try-out a group-study if you're alone but want to simulate multiple workers?**

JATOS allows [up to 10 study runs](Tips-and-Tricks.html#run-up-to-10-studies-in-the-same-browser-at-the-same-time) at the same time in the same browser (JATOS has no limit for different browsers). So you can just start the same (group) study multiple times in your browser and pretend you're multiple workers.

As an example of this, let's go through the Snake Game group study in detail:

1. Download and import the [Snake game](Example-Studies.html#snake)
1. Open the [Study Links page](Run-your-Study-with-Study-Links.html)
1. Expand the "Default Batch" ("<span class="glyphicon glyphicon-chevron-right"></span>" button in the left) to see the worker setup
1. Now get your first worker: Expand (again with "<span class="glyphicon glyphicon-chevron-right"></span>") the Jatos Worker and click the **Run** button - and the study will start in a new browser tab
1. Repeat for the second worker
1. In both tabs: click through the introduction until you arrive in the waiting room. Click **Join** and then **Ready**.
1. Voilà! You'll see two snakes moving around: each tab represents one worker who is running the Snake Game - but they are in the same group
1. Optional: Add more snakes by adding more workers. You can try every worker type you want - it's of course not limited to Jatos Workers.
1. Optional: Have a look at your [Group in the Study Links page](Run-your-Study-with-Study-Links.html#groups-since-v331) add see who the member workers are.
   {% include image.html file="example-studies/Screenshot_snakeGame.png" alt="Snake Game" caption="" max-width="500" %}

There's actually a lot going on behind the curtain of a group study. All members of a group are able to communicate in real-time with each other directly or broadcast messages to the whole group.

Next step: [Write Your Own Group Studies](Write-Group-Studies-I-Setup.html).
