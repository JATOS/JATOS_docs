---
title: Use Prolific
slug: /Use-Prolific.html
sidebar_position: 6
---
import Hl from '@site/src/components/Highlight';

It is very easy to use JATOS together with [Prolific](https://www.prolific.co/) to recruit participants. 

This is what the <Hl>New Study</Hl> page in <Hl>Prolific</Hl> looks like:

![Prolific screenshot](/img/Screenshot_Prolific_create_study.png)


### 1. Enter your JATOS study link

In the field under <Hl>What is the URL of your study?</Hl> (first red box in the screenshot), enter a link to your JATOS study.You probably want a study link of either <Hl>General Single</Hl> or a <Hl>General Multiple</Hl> type (see [Run your Study with Study Links](Run-your-Study-with-Study-Links.html)).


### 2. (Optional) Consider passing Prolific URL parameters to your study

Prolific allows you to pass the parameters <Hl>PROLIFIC PID</Hl>, <Hl>STUDY ID</Hl>, and <Hl>SESSION ID</Hl> as URL parameters. Click on <Hl>Show advanced</Hl> and then <Hl>Add parameters</Hl> like in the screenshot.

![Prolific screenshot](/img/Screenshot_Prolific_query_parameter.png)

Then you can access those URL parameters in your study's JavaScript via [`jatos.urlQueryParameters`](jatos.js-Reference.html#jatosurlqueryparameters).


### 3. Redirect to Prolific's end page after the study is done

The second red box contains a link that will (re)direct the participant to a Prolific page, with information on how to claim their payment.

**Choose one of the two ways**

1. With JATOS' UI (easiest and recommended): Put the Prolific link in the <Hl>End Redirect URL</Hl> field of your <Hl>Study Properties</Hl>

   ![screenshot](/img/Screenshot_end-redirect-url.png)

1. With _jatos.js_: Include [`jatos.endStudyAndRedirect`](jatos.js-Reference.html#jatosendstudyandredirect) in the JavaScript of your **last** component

   E.g. but change this URL to the one you see in Prolific

   ```javascript
   jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD");
   ```

   You can combine it with sending result data

   ```javascript
   var resultData = {id: 123, data: "my important result data"};
   jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD", resultData);
   ```