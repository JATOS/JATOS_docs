---
title: Combine two pre-written studies into one
slug: /Combine-two-pre-written-studies-into-one.html
sidebar_position: 3
---


**Take two separate studies and combine them into a single one** 

You might have created two parts of a study using different tools. For example, you coded a survey with [labjs](/labjs-and-JATOS.html) and a perceptual experiment with [OSWeb](OSWeb-and-JATOS.html). You have two _.jzip_ files from each of these tools, but now you want to combine them into one. Here's how. 

Note that this description works for any two halves of a study, coded in whatever way. (But of course, if you were the one writing the scripts instead of using an experiment builder, you'll likely not need this explanation).


### Ingredients

To combine two studies into one you'll need:
1. A [**local instance**](Installation.html#easy-installation-on-your-local-computer) of JATOS. Make sure this is not the one on the server, but the one you run on your own computer. This will give you easy access to move and rename your files. 
1. Information about where your study assets are: Go to [http://localhost:9000/jatos](http://localhost:9000/jatos). On the homepage, find the section "Where are my files". (It's big, you can't miss it). Find that folder on your computer. 
1. The _.jzip_ for the first half of your study. 
1. The _.jzip_ for the second half of your study.

Note for 3. and 4.: You should not try to generate a _.jzip_ file by hand at this point (although it is possible). A [JZIP study archive](JATOS-Study-Archive-JZIP.html) file is a ZIP archive with a standardized content. They contain information that JATOS needs to understand that something is a study.


### Strategy

The idea will be to, first, import one of these halves of a study into your local JATOS instance. Then, add the files from the second half as an additional component to the first half. 


### Steps

These steps sound complicated, but it's all really simple clicking around and copy-pasting. Basically a JATOS-study-collage. 

Imagine you have _half-study-1.jzip_ (a survey) and _half-study-2.jzip_ (a perceptual task).  

1. Import the _half-study-1.jzip_ into JATOS. You should get one study with a single component. 
2. Identify the folder in your local computer where these study assets are. (Ingredient 2, described above.)
3. Import the _half-study-2.jzip_ into JATOS. You should get one study with a single component.
4. Look into the folder you found in Step 2. Navigate to the subfolder that corresponds to _half-study-2_. You should find a single _.html_ file (this is what actually displays your study) and probably a lot of other assets, including libraries and CSS stylesheets. 
5. In your local JATOS: Go to the component properties of each of your study halves. Find the field with the path to the HTML file that runs your study. If the name of the HTML files is the same for both halves (it often is _index.html_), change the names. Now they are called _index-half-1.html_ and _index-half-2.html_. You can change the names in the component properties. JATOS will change the actual file name on your filesystem for you. (Confirm that you want this when prompted).   
6. In your local filesystem: Copy all of the contents of this subfolder for _half-study-2_ into the subfolder for _half-study-1_. You now combined the information from both studies into a single folder and made sure that the HTML files are uniquely named.  
7. In your local JATOS: Go to the your _half-study-1_. Click on "New component". In the properties of this new component, indicate the path to the HTML file from _half-study-2_. Copy any other properties that might exist (e.g. JSON input) from the single component in _half-study-2_ to this new component in _half-study-1_. 
8. Now you have a complete, combined study. 
9. Export this study from your local instance.
10. Import the _.jzip_ you created in step 9 into your online JATOS server.  


### Troubleshooting

Make sure that the study doesn't finish after the first component. In the javascript of the first component you should see something like:

   ~~~javascript
   jatos.startNextComponent(myResultDataObject);
   ~~~

and not 

   ~~~javascript
   jatos.endStudy(myResultDataObject);
   ~~~
