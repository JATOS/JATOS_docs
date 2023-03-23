---
title: Combine two pre-written studies into one
slug: /Combine-two-pre-written-studies-into-one.html
sidebar_position: 3
---


**Take two separate studies and combine them into a single one** 

You might have created two parts of a study using different tools. For example, you coded a survey with [labjs](/labjs-and-JATOS.html) and a perceptual experiment with [OSWeb](OSWeb-and-JATOS.html). You have two .jzip files from each of these tools, but now you want to combine them into one. Here's how. 

Note that this description works for any two halves of a study, coded in whatever way. (But of course, if you were the one writing the scripts instead of using an experiment builder, you'll likely not need this explanation).

### Ingredients

To combine two studies into one you'll need:
1. A [**local instance**](Installation.html#easy-installation-on-your-local-computer) of JATOS. Make sure this is not the one on the server, but the one you run on your own computer. This will give you easy access to move and rename your files. 
2. Information about where your study assets are. Go to http://localhost:9000/jatos. On the homepage, find the section "Where are my files". (It's big, you can't miss it). Find that folder on your computer. 
3. The .jzip for the first half of your study. 
4. The .jzip for the second half of your study.

Note for 3. and 4.: You should not try to generate a .jzip file by hand. jzips are not (quite) zips. They contain information that JATOS needs to understand something as a study.  

### Strategy

The idea will be to, first, import one of these halves of a study into your local JATOS instance. Then, add the files from the second half as an additional component to the first half. 

### Steps

Imagine you have half-study-1.jzip (a survey) and half-study-2.jzip (a perceptual task).  

1. Import the half-study-1.jzip into JATOS. You should get one study with a single component. 
2. Identify the folder in your local computer where these study assets are.
3. Import the half-study-2.jzip into JATOS. You should get one study with a single component.
4. Look into the folder you found in Step 2. Navigate to the subfolder that corresponds to half-study-2. You should find a single .html file (this is what actually displays your study) and probably a lot of other assets, including libraries and css stylesheets. 
5. In your local JATOS: Go the component properties of each of your study halves. Find the field with the path to the html file that runs your study. If the name of the html files is the same for both halves (it often is index.html), change the names. Now they are called index-half-1.html and index-half-2.html. You can change the names in the component properties. JATOS will change the actual file name on your filesystem for you. (Confirm that you want this)   
6. Copy all of the contents of this subfolder into the subfolder that corresponds to half-study-1. Basically, you combined 
7. Figure out 
8. Import the  into JATOS. Again, you should get one study with a single component.
9. Now you have to merge these two into 
10. In your local JATOS: On the component bar of half-study-2, click on More > Export Properties. Save the exported component properties file on your (e.g.) Desktop.
11. In your local JATOS: In the first study, go to Components > Import Properties. This will create a new component in your half-study-1, with the correct properties, including the path to the HTML/JS file that actually runs your study.
12. Go to the folder you found on Step 2. Find the HTML file that corresponds to half-study-2 (it has the name , created in OSWeb. Move this file to the study assets of the labjs one. If you have css files and other assets, move that too-.

5-Now you have one study with two components. Note that you will likely need to modify the JavaScript code itself in the first component. It will probably have a line that reads jatos.endStudy. You'll have to replace it with jatos.startNextComponent (see here for more details http://www.jatos.org/jatos.js-Reference.html#jatosstartnextcomponentresultdata-onerror)

6-Export your study (with two components) as a single .zip file by clicking on Export on the study bar

This sounds complicated but is actually rather simple. If you have problems, let us know





* Think about dividing your study into **several components**. You could have separate components e.g. for introduction, training, experiment and feedback. You could even consider splitting the experiment into several parts. One advantage is that if your participant stops in the middle of your study you still have the result data of the first components. Also, you can re-use components in different studies.
* Use the study's and component's '**JSON input data**'. With them you can change variables of your code directly through JATOS' GUI, which might come handy if someone isn't good in JavaScript.
* You can add a **quit button** to your study to allow the participant to [abort at any time](Data-Privacy-and-Ethics.html#things-you-should-consider-in-your-studies). 




   ~~~javascript
   jatos.endStudy(myResultDataObject);
   ~~~
