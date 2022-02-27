---
title: Example Group Studies
slug: /Example-Group-Studies.html
sidebar_position: 1
---
import Hl from '@site/src/components/Highlight';

In group studies, the workers that are part of a group can communicate with each other. JATOS supports different kinds of groups. A group can e.g. have a fixed set of workers like this [<Hl>Prisoner's Dilemma</Hl>](/Example-Studies) where exactly two workers play with each other. On the other side of the spectrum is this [<Hl>Snake game</Hl>](/Example-Studies) with an on open, multi-worker approach.

**How can you try-out a group-study if you're alone but want to simulate multiple workers?**

JATOS allows [up to 10 study runs](Tips-and-Tricks.html#run-up-to-10-studies-in-the-same-browser-at-the-same-time) at the same time in the same browser (JATOS has no limit for different browsers). So you can just start the same (group) study multiple times in your browser and pretend you're multiple workers.

As an example of this, let's go through the <Hl>Snake Game</Hl> group study in detail:

1. Download and import the [<Hl>Snake game</Hl>](/Example-Studies)
1. Open the [<Hl>Study Links</Hl>](Run-your-Study-with-Study-Links.html) page
1. Now get a study link to start the first Snake game: Click on the <Hl>Study Links</Hl> button in line <Hl>Personal Multiple</Hl> (other study link types are fine too). In the opened pop-up window click on the top-left button <Hl><span className="glyphicon glyphicon-plus"></span><span className="glyphicon glyphicon-link"></span></Hl> to get a new link and then on <Hl><span className="glyphicon glyphicon-duplicate"></span></Hl> in the link's row to copy it to the clipboard.
1. Open a new tab in your browser and paste the study link into the address field. Press <Hl>Enter</Hl> and the study should start.
1. Repeat the last step to start a second Snake game.
1. Now, in both tabs: click through the introduction until you arrive in the waiting room. Click <Hl>Join</Hl> and then <Hl>Ready</Hl>.
1. Voilà! You'll see two snakes moving around: each tab is running the Snake Game - but they are in the same group.
1. Optional: Have a look at your [<Hl>Group in the Study Links page</Hl>](Run-your-Study-with-Study-Links.html#groups) add see who the member workers are.

![Snake example](/img/example-studies/Screenshot_snakeGame.png)

There's actually a lot going on behind the curtain of a group study. All members of a group are able to communicate in real-time with each other directly or broadcast messages to the whole group.

Next step: [Write Your Own Group Studies](Write-Group-Studies-I-Setup.html).
