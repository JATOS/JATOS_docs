---
title: Create a new study
slug: /Create-a-new-study.html
sidebar_position: 1
---

There are different ways to create a new study for JATOS: use a builder, with jsPsych, from scratch or by modifying an existing study. Then afterwards continue with [Write your own Study - Basics and Beyond](Write-your-own-Study-Basics-and-Beyond.html) or [Adapt Pre written Code to run it in JATOS](Adapt-pre-written-code-to-run-it-in-JATOS.html).

**Developement of a JATOS study usually happens on your local JATOS: [Run an experiment with JATOS - Workflow](Run-an-experiment-with-JATOS-Workflow.html)**


### Use a builder - OpenSesame/OSWeb and lab.js

Experiment builders like [OpenSesame/OSWeb](OSWeb-and-JATOS.html) and [lab.js](labjs-and-JATOS.html) have a point-and-click UI. They are easy to use and you don't have to care for the programming part. But they come with the limitation that they only allow you to do what is possible in the UI. If you want more freedom consider jsPsych or write your own study.


### Use jsPsych

[jsPsych](http://www.jspsych.org/) is a popular library for running behavioral experiments in a web browser. We have an own web page describing using [jsPsych with JATOS](jsPsych-and-JATOS.html).


### Write your own study from scratch

Writing your own study gives your the most freedom since it allows you to do whatever is possible in a modern browser. But you will have to program your own code in JavaScript, HTML and CSS.

Press the **New Study** button in the header of your local JATOS. Then edit the study properties and add new components manually. All source code for your study has to got into the study assets folder you defined in the the study properties. The study assets folder is usually located in your JATOS installation folder.


### Modify an existing study

Take an existing study (e.g. from [Example Studies](/Example-Studies)) as a prototype and modify it bit by bit. Press on the **Import** button in the header and select the file of the study. Then see the source code in your study assets folder, which is usually in your JATOS installation folder.


