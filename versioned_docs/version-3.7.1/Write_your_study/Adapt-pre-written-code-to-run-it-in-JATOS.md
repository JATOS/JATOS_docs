---
title: Adapt pre written code to run it in JATOS
slug: /Adapt-pre-written-code-to-run-it-in-JATOS.html
sidebar_position: 3
---
import Hl from '@site/src/components/Highlight';

**Make Your Existing Code Run in JATOS - or How To Jatosify a Study** 

You might have a task, experiment, survey, or study running in a browser. You might have all its files like HTML, JavaScripts, images, etc. And now you want to run it with JATOS? Then follow this page.

**Developement of a JATOS study usually happens on your local JATOS: [Run an experiment with JATOS - Workflow](Run-an-experiment-with-JATOS-Workflow.html)**

### Create the study in your local JATOS

1. Create a new study with the <Hl>New Study</Hl> button in JATOS' header. Choose a study title and a folder name. Leave the other fields empty for now and click <Hl>Create</Hl>. JATOS will have created a new folder within your assets root folder (default is `/path_to_your_JATOS/study_assets_root/`).
1. Copy all your files (HTML, JavaScripts, images, audio, ...) into your new study folder. 
1. Back in the JATOS GUI, and within the newly created study, create a **new component** by clicking <Hl>Components</Hl> and then <Hl>New</Hl>. Choose a component title and set the HTML file name, to the name of the HTML file you just copied into the study folder.
1. In your HTML, CSS and JavaScripts, for your paths you can choose between 1) relative paths or 2) absolute paths. **Relative paths are recommended** since they are shorter and do not change after an export-import of a study.

   1. **Relative paths)** Just use the relative path within your study's folder.
      
      E.g. if a file named 'survey.js' is in the root of the study's assets folder
      
      ```html
      <script src="survey.js"></script>
      ```
      
      E.g. or if the file is in a subfolder 'lib'
      
      ```html
      <script src="lib/survey.js"></script>
      ```

   1. **Absolute paths (deprecated))** Always use the prefix `/study_assets/` and then the study assets name you specified in your study's properties when you created it.
      
      E.g. if you want to load the file 'survey.js' and the study's assets folder is 'my-exp'

        ```html
        <script src="/study_assets/my-exp/survey.js"></script>
        ```

      ✰  For absolute paths make sure you understand the difference between the `study_assets_root` folder and the placeholder `study_assets` in your path names. `study_assets_root` is the folder in your system (or in the server) where the assets (HTML, JS, CSS, images, etc) of **all** your JATOS studies will be stored. You can [configure](Configure-JATOS-on-a-Server.html#study-assets-root-path) the location of this folder. `study_assets`, on the other hand, is just a placeholder that will go in your HTML files. JATOS will interpret this and replace the placeholder with the path, (specific to the study) that you entered in the field <Hl>Study assets directory name</Hl> in your Study's Properties. The advantage of this is that you can change the location or name of the assets for any study, or export-import a study into a different computer, and the study will still run without having to make any changes in the HTML code.  


1. Now it's time for a first glimpse: Click the <Hl>Run</Hl> button in either the study's or the component's toolbar. Your experiment should run like it did before without JATOS. Use the browser's developer tools to check for eventually missing files and other occurring errors.

### Edit your HTML and JavaScript

Up to this point JATOS served as a mere provider of your files. Now we want to use a feature of JATOS: We want to store your result data in JATOS' safe database. 

1. Include the **_jatos.js_** library in your HTML. In your `<head>` add the line 

   ```html
   <script src="jatos.js"></script>`
   ```

1. Add **`jatos.onLoad`**

   Most studies with JATOS start with this call. So whatever you want to do in your study it should start there.
   
   ~~~javascript
   jatos.onLoad(function() {
     // start your code here 
   });
   ~~~
   
1. Now to actually **send your result data** to JATOS we use _jatos.js_' function `jatos.submitResultData`. We can pass this function any data in text format including JSON, CSV or XML. If you pass a JavaScript object it will be turned into JSON (stringified).

   E.g. if we want to send a JavaScript object as JSON
   
   ~~~javascript
   jatos.submitResultData(myResultDataObject);
   ~~~

   `jatos.submitResultData` puts the data into JATOS database - old data that were submitted before will be overwritten. If you don't want to overwrite data you should rather use `jatos.appendResultData`.

1. Instead of submitting text you can also upload files with [jatos.uploadResultFile](jatos.js-Reference.html#jatosuploadresultfile).

1. At the end of your component you will want to jump to another component or end the study.

   To jump to the next component:

   ~~~javascript
   jatos.startNextComponent();
   ~~~

   Or to just finish the study:

   ~~~javascript
   jatos.endStudy();
   ~~~

   You can combine this with sending result data:

   ~~~javascript
   jatos.startNextComponent(myResultDataObject);
   ~~~

   or

   ~~~javascript
   jatos.endStudy(myResultDataObject);
   ~~~

That's about it. Infos about other _jatos.js_ functions and variables you can find in the [reference](jatos.js-Reference.html). 

### Beyond the basics

* Think about dividing your study into **several components**. You could have separate components e.g. for introduction, training, experiment and feedback. You could even consider splitting the experiment into several parts. One advantage is that if your participant stops in the middle of your study you still have the result data of the first components. Also, you can re-use components in different studies.
* Use the study's and component's <Hl>JSON input data</Hl>. With them you can change variables of your code directly through JATOS' GUI, which might come handy if someone isn't good in JavaScript.
* You can add a **quit button** to your study to allow the participant to [abort at any time](Data-Privacy-and-Ethics.html#things-you-should-consider-in-your-studies). 
