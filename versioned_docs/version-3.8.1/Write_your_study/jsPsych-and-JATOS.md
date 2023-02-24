---
title: jsPsych and JATOS
slug: /jsPsych-and-JATOS.html
hide_table_of_contents: true
sidebar_position: 4
---

<div style={{'float':'right', 'width':'300px'}}>

![](/img/jspsych-logo.png)

</div>

JATOS basically cares for the server side: it stores result data, does worker management etc. JATOS doesn't care so much for what happens in the browser itself - your HTML, JavaScript and CSS. Of course you can write this all yourself, but you could also use a framework for this. A very good one is [jsPsych](http://www.jspsych.org/).

In [our example studies](/Example-Studies) are a couple of jsPsych ones.

Here are the necessary changes if you want to adapt your jsPsych experiment so that it runs within (and sends the result data to) JATOS. Additionally you can have a look at [Adapt Pre written Code to run it in JATOS](Adapt-pre-written-code-to-run-it-in-JATOS.html).

Every jsPsych version works slightly different. Here we explain the steps for jsPsych 7 (for older versions have a look [here](/3.6.1/jsPsych-and-JATOS.html)).

### How to turn your jsPsych 7 experiment into a JATOS study

1. Include the _jatos.js_ library in the `<head>` of your HTML

   ~~~ html
   <script src="jatos.js"></script>
   ~~~ 

1. Tell jsPsych to send your result data to JATOS

   ~~~ javascript
   var jsPsych = initJsPsych({
     on_finish: () => jatos.endStudy(jsPsych.data.get().json())
   });
   ~~~

1. Wrap jsPsych's run in `jatos.onLoad` and if you want add a 'Cancel' button with `jatos.addAbortButton`.

   ~~~ javascript
   jatos.onLoad(() => {
     jatos.addAbortButton();
     jsPsych.run(timeline);
   });
   ~~~

That's all. Have a look at the 'Simple Reaction Time Task' in our [example studies](/Example-Studies) to see a full example with jsPsych 7.