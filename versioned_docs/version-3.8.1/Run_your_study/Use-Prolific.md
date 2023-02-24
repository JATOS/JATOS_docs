---
title: Use Prolific
slug: /Use-Prolific.html
sidebar_position: 6
---

It is very easy to use JATOS together with [Prolific](https://www.prolific.co/) to recruit participants. 

This is what the _New Study_ page in Prolific looks like:

![Prolific screenshot](/img/Screenshot_Prolific_create_study.png)


### 1. Enter your JATOS study link

In the field under _What is the URL of your study?_ (first red box in the screenshot), enter a link to your JATOS study.You probably want a study link of either _General Single_ or a _General Multiple_ type (see [Run your Study with Study Links](Run-your-Study-with-Study-Links.html)).


### 2. (Optional) Consider passing Prolific URL parameters to your study

Prolific allows you to pass the parameters PROLIFIC PID, STUDY ID, and SESSION ID as URL parameters. Click on 'Show advanced' and then 'Add parameters' like in the screenshot.

![Prolific screenshot](/img/Screenshot_Prolific_query_parameter.png)

Then you can access those URL parameters in your study's JavaScript via [`jatos.urlQueryParameters`](jatos.js-Reference.html#jatosurlqueryparameters).


### 3. Redirect to Prolific's end page after the study is done

The second red box contains a link that will (re)direct the participant to a Prolific page, with information on how to claim their payment.

**Choose one of the two ways**

1. With JATOS' UI (easiest and recommended): Put the Prolific link in the **End Redirect URL** field of your Study Properties

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