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

These steps sound complicated, but it's all really simple clicking around and cutting-pasting. Basically a JATOS-study-collage. 

Imagine you have half-study-1.jzip (a survey) and half-study-2.jzip (a perceptual task).  

1. Import the half-study-1.jzip into JATOS. You should get one study with a single component. 
2. Identify the folder in your local computer where these study assets are. (Ingredient 2, described above.)
3. Import the half-study-2.jzip into JATOS. You should get one study with a single component.
4. Look into the folder you found in Step 2. Navigate to the subfolder that corresponds to half-study-2. You should find a single .html file (this is what actually displays your study) and probably a lot of other assets, including libraries and css stylesheets. 
5. In your local JATOS: Go the component properties of each of your study halves. Find the field with the path to the html file that runs your study. If the name of the html files is the same for both halves (it often is index.html), change the names. Now they are called index-half-1.html and index-half-2.html. You can change the names in the component properties. JATOS will change the actual file name on your filesystem for you. (Confirm that you want this when prompted).   
6. In your local filesystem: Copy all of the contents of this subfolder for half-study-2 into the subfolder for half-study-1. You now combined the information from both studies into a single folder and made sure that the html files are uniquely named.  
7. In your local JATOS: Go to the your half-study-1. Click on "New component". In the properties of this new component, indicate the path to the HTML file from half-study-2. Copy any other properties that might exist (e.g. json) from the single component in half-study-2 to this new component in half-study-1. 
8. Now you have a complete, combined study. 
9. Export this study from your local instance.
10. Import the .jzip you created in step 9 into your server.  


### Troubleshooting
Make sure that the study doesn't finish after the first component. In the javascript of the first component you should see something like:

   ~~~javascript
   jatos.startNextComponent(myResultDataObject);
   ~~~

and not 

   ~~~javascript
   jatos.endStudy(myResultDataObject);
   ~~~
