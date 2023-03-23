---
title: Combine two pre-written studies into one
slug: /Combine-two-pre-written-studies-into-one.html
sidebar_position: 3
---



   ~~~javascript
   jatos.endStudy(myResultDataObject);
   ~~~

That's about it. Infos about other _jatos.js_ functions and variables you can find in the [reference](jatos.js-Reference.html). 

### Beyond the basics

* Think about dividing your study into **several components**. You could have separate components e.g. for introduction, training, experiment and feedback. You could even consider splitting the experiment into several parts. One advantage is that if your participant stops in the middle of your study you still have the result data of the first components. Also, you can re-use components in different studies.
* Use the study's and component's '**JSON input data**'. With them you can change variables of your code directly through JATOS' GUI, which might come handy if someone isn't good in JavaScript.
* You can add a **quit button** to your study to allow the participant to [abort at any time](Data-Privacy-and-Ethics.html#things-you-should-consider-in-your-studies). 
