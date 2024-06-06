---
title: Write your own study - Basics and beyond
slug: /Write-your-own-Study-Basics-and-Beyond.html
sidebar_position: 2
---

After you [added a new study](Create-a-new-study.html) ... what comes next?

**Developement of a JATOS study usually happens on your local JATOS: [Run an experiment with JATOS - Workflow](Run-an-experiment-with-JATOS-Workflow.html)**


## Add a component

If you have an empty study you want to add a component. A component corresponds to a webpage defined by an HTML file. A study can have more than one component - this is actually a strength of JATOS: e.g. one can combine different experiments into one, or easily add an survey to an existing experiment.

To add a component go to your study page and click on **New Component**.

![New Component](/img/v39x/new-component.png)

Then in the following form you define the component's 'Title' and most importantly its 'HTML file path' (This is the path to the HTML file that starts this component).

![New Component](/img/v39x/new-component-properites.png)

Click on **Add** and you are done. You can change the component's properties by clicking on 'Properties' in the component's row. If you add more than one component you can change the order in which they run by drag-and-drop on the position button.

![Position Component](/img/v39x/component-position-dragndrop.png)


## Study assets

All your files (e.g. HTML, CSS, JavaScript and media files) go into your study assets directory. That includes all component's HTML files. You can find the study assets directory in a directory called `study_assets_root` in your JATOS installation directory. You can change the study assets directory's name in the study properties, but it's usually not necessary.

![Position Component](/img/v39x/study-assets-name.png)


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

1. The second bit is not really necessary but without defining the `jatos.onLoad` callback function you won't be able to use most of _jatos.js_' features. Of course you could start right away with any JavaScript but if you want to use _jatos.js_' variables and functions you have to wait until _jatos.js_ is finished initializing.

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


## Study/component/batch input

Your experiment is defined by its source code, its HTML, JavaScript and CSS. There you specify all text or parameters. But sometimes you want to be able to quickly change your experiment without touching the source code.

E.g. you want to be able to quickly change
* an introductory text
* the number of trials
* some parameter needed in the experiment

This you can achieve with the "study input", "component input", or "batch input" (in older JATOS versions they are called "Study JSON Input", "Component JSON Input", or "Batch JSON Input") because both can be easily edited in the study/component/batch properties.

![Study properties / study input](/img/v39x/study-input.png)

The input fields take [JSON](https://www.w3schools.com/whatis/whatis_json.asp) and the data you put in there is then available in your study's JavaScript via `jatos.studyJsonInput`, `jatos.componentJsonInput`, and `jatos.batchJsonInput`.

The difference between study input, component input and batch input is where they are available in the code of your study. The study input data are available everywhere in your study code, the component input only in the code of this component, and the batch input in all study runs that belong to this batch. There is also a difference in what gets exported with the study: only the study and component input data get exported - not the batch input data.

|              | Study input | Component input | Batch input |
| ------------ | ----------- | --------------- | ----------- |
| Availability | in the whole study (all components, all batches) | only in the component where it was defined (but in all batches) | only in the batch that belongs to the study run (but there in all components) |
| Exported with the study   | yes | yes | no |


**Example:**

If you put the following in the study input of your study properties

```json
{
  "numberOfTrials": 12,
  "retries": 5,
  "order": [
    4,
    3,
    0,
    1
  ]
}
```

you can access those fields in your JavaScript with `jatos.studyJsonInput.numberOfTrials`, `jatos.studyJsonInput.retries` and `jatos.studyJsonInput.order`.


## Study / batch / group session

The sessions are there to help you exchange data within a study, batch or group. The study session allows to pass on data within the same study run, from one component to the next. With the batch session one can transfer data between study runs that belong to the same batch. There is a whole page dedicated to those sessions: [Session Data - Three Types](/Session-Data-Three-Types.html).


## Group studies

JATOS allows group studies in which several participants can work together on the same experiment and exchange data in real-time.
To get an idea it's best to start with [examples](Example-Group-Studies.html), then one can go on to write them: [Write Group Studies I - Setup](Write-Group-Studies-I-Setup.html) and [Write Group Studies II - JavaScript and Messaging](Write-Group-Studies-II-JavaScript-and-Messaging.html).
