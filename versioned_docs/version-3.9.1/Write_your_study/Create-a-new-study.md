---
title: Create a new study
slug: /Create-a-new-study.html
sidebar_position: 1
---

There are different ways to add a new study in JATOS: you can use a builder, integrate with jsPsych, write one from scratch, or modify an existing study. Afterward, you can either continue with [Write your own Study - Basics and Beyond](Write-your-own-Study-Basics-and-Beyond.html) or [Adapt Pre-written Code to run it in JATOS](Adapt-pre-written-code-to-run-it-in-JATOS.html).

**JATOS study development usually happens on your local JATOS installation. For a detailed workflow, see: [Run an experiment with JATOS - Workflow](Run-an-experiment-with-JATOS-Workflow.html).**

-----

### Use a Builder like OpenSesame/OSWeb, lab.js and PsychoPy

Experiment builders like [OpenSesame/OSWeb](OSWeb-and-JATOS.html), [lab.js](labjs-and-JATOS.html), or [PsychoPy](PsychoPy-and-JATOS.html) offer a point-and-click user interface. They are easy to use and don't require programming knowledge. However, they are limited to what's possible within their UI. If you need more flexibility, consider using jsPsych or writing your own study.

### Use jsPsych

[jsPsych](http://www.jspsych.org/) is a popular library for running behavioral experiments in a web browser. We have a dedicated page describing how to use [jsPsych with JATOS](jsPsych-and-JATOS.html).

### Write Your Own Study from Scratch

Writing your own study provides the most freedom, as it allows you to leverage everything possible in a modern browser. However, this approach requires you to program your own code in JavaScript, HTML, and CSS.

To start, go to the study sidebar by clicking on **Studies** in the top-left header. Then click on "**+**" and select **New Study**. A dialog will open where you can enter a title for your study before clicking **Add**. The study's page will then open, allowing you to edit its properties or add new components. All source code for your study must be placed in the **study assets** folder. You can change this folder's name in the study properties, though it's usually not necessary. By default, the study assets folder is located within your JATOS installation directory.

### Modify an Existing Study

You can take an existing study (for example, from [Example Studies](/Example-Studies)) as a prototype and modify it incrementally. To do this, go to the study sidebar by clicking on **Studies** in the top-left header, then click on "**+**" and select **Import Study**. After importing, you can modify the source code directly in your **study assets** folder, which is typically found within your JATOS installation directory.