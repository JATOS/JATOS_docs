---
title: Write your own Study - Basics and Beyond
slug: /Write-your-own-Study-Basics-and-Beyond.html
sidebar_position: 2
---
import Hl from '@site/src/components/Highlight';

After you [created a new study](Create-a-new-study.html) ... what comes next?

**Developement of a JATOS study usually happens on your local JATOS: [Run an experiment with JATOS - Workflow](Run-an-experiment-with-JATOS-Workflow.html)**


## Add a component

If you have an empty study you want to add a component. A component corresponds to a webpage defined by an HTML file. A study can have more than one component - this is actually a strength of JATOS: e.g. one can combine different experiments into one, or easily add an survey to an existing experiment.

To add a component go to your study and click on <Hl>Components</Hl> -> <Hl>New</Hl>.

![New Component](/img/Screenshot_new-component_371.png)

Then in the following form you define the component's properties: enter the component's title and most importantly its <Hl>HTML file path</Hl>. This is the path to the HTML file that starts this component.

![New Component](/img/Screenshot_new-component-properites.png)

Click on <Hl>Create</Hl> and you are done. If you add more than one component you can change the order in which they run by drag-and-drop on the position button.


## Mandatory lines in your components' HTML

A study can have one or multiple components and each component has an HTML file associated that is defined in the component's properties.

Here is the absolute minimum that any component HTML file must have to run with JATOS:

1. A link to the _jatos.js_ library in the head section

   ~~~ html
   <html>
     <head>
       <script src="jatos.js"></script>
     </head>
   </html>   
   ~~~

1. The second bit is not really necessary but without defining the `jatos.onLoad` callback function you won't be able to use most of _jatos.js_' features. Of course you could start right away with any JavaScript but if you want to use _jatos.js_' variables and functions you have to wait untill _jatos.js_ is finished initializing.

   ~~~ html
   <script>
     jatos.onLoad(function() {
       // Start here with your code that uses jatos.js' variables and functions
     });
   </script>   
   ~~~


## Save your result data

You probably want to save the data that is collected during your experiments. There are generally two ways to do this: 1) result data or 2) result files - and there is a [documentation page about it](Submit-and-upload-data-to-the-server.html).


## _jatos.js_ Reference

In your JavaScript you will use _jatos.js_ to handle everything JATOS related and in its [reference](jatos.js-Reference.html) every function and field is described in detail.


## Study JSON Input and Component JSON Input

Your experiment is defined by its source code, its HTML, JavaScript and CSS. There you specify all text or parameters. But sometimes you want to be able to quickly change your experiment without touching the source code.

E.g. you want to be able to quickly change
* an introductory text
* the number of trials
* some parameter needed in the experiment

This you can achieve with the <Hl>Study JSON Input</Hl> or <Hl>Component JSON Input</Hl> because both can be easily edited in the <Hl>Study Properties</Hl> or <Hl>Component Properties</Hl>.

![Study Properties / JSON input](/img/Screenshot_studyJsonInput_371.png)

Both input fields take [JSON](https://www.w3schools.com/whatis/whatis_json.asp) and the data you put in there is then available in your study's JavaScript via `jatos.studyJsonInput` and `jatos.componentJsonInput`.

The difference between the Study JSON Input and Component JSON Input is that the first one is available during the whole study run, in all components, and the latter one only in the component for which it is specified.

**Example:**

If you put the following in the Study JSON Input

```javascript
{
   "introduction": "this is a text",
   "order": [3, 1, 2]
}
```

you can access those fields in your JavaScript with `jatos.studyJsonInput.introduction` and `jatos.studyJsonInput.order`.


## Study / Batch / Group Session

The sessions are there to help you exchange data within a study, batch or group. The Study Session allows to pass on data within the same study run, from one component to the next. With the <Hl>Batch Session</Hl> one can transfer data between study runs that belong to the same batch. There is a whole page dedicated to those sessions: [Session Data - Three Types](/Session-Data-Three-Types.html).


## Group Studies

JATOS allows group studies in which several participants can work together on the same experiment and exchange data in real-time.
To get an idea it's best to start with [examples](Example-Group-Studies.html), then one can go on to write them: [Write Group Studies I - Setup](Write-Group-Studies-I-Setup.html) and [Write Group Studies II - JavaScript and Messaging](Write-Group-Studies-II-JavaScript-and-Messaging.html).
