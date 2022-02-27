---
title: Get started
slug: /Get-started.html
sidebar_position: 5
---
import Hl from '@site/src/components/Highlight';

### Get started in 4 steps

1. **Download JATOS and [install a local instance](Installation.html)**

1. **Open JATOS' GUI by going to [localhost:9000](http://localhost:9000) in your browser window**

1. **Download and import an example study**

   1. Download one of the [Example Studies](/Example-Studies), e.g. the **'Go- / No-Go Task'** with jsPsych. Do not unzip the downloaded file. 

   1. Import the study into JATOS: Go to JATOS' GUI in your browser and click on <Hl>Import Study</Hl> in the header. Choose the .jzip (or .zip) file you just downloaded. The imported study should appear in the sidebar on the left.

1. **Explore the GUI**

   In the sidebar click the study to get into the study's page. 

   To do a test run of the entire study, click on <Hl>Run</Hl> in the toolbar on top of the page.

   If you finished running through the study, you can check the results.
   
   * To see whole-study results, click on the <Hl>Results</Hl> button on the top of the page.
   * To see results from individual components, click on the <Hl>Results</Hl> buttons on each component's row.

   For example, you can see each result's details by clicking on the <Hl><span className="glyphicon glyphicon-chevron-right"></span></Hl> to the left of its row ([more information on how to mangage results](Manage-results.html)).

   _Here's a screenshot of a study's <Hl>results</Hl> view:_
   ![Results View screenshot](/img/ResultsView-Screenshot3.png)

### Explore

Now it's time to explore a little bit more.

* You can click on any <Hl>component's position</Hl> button and drag it to a new position within the study. 
* Each component has a <Hl>Properties</Hl> button. The component's HTML file may read the data in the field <Hl>JSON input</Hl>. This is a way to make changes in the details of the code (wording of instructions, stimuli, timing, number of trials, etc) without having to hard-code them into JavaScript. 
* Where are the actual HTML, JavaScript, and CSS files? They are the files that actually run your study, so make sure you can locate them. All these files, together with any images, sound files, etc. you might have, are called <Hl>Study assets</Hl>. They will be in `/path_to_my_JATOS/study_assets_root/name_of_my_study/`.

_Here's a screenshot of a component's properties view:_
![GUI screenshot](/img/Component_properties_screenshot_2.png)
