---
title: Use Prolific
slug: /Use-Prolific.html
sidebar_position: 6
---

It is very easy to use JATOS together with [Prolific](https://www.prolific.co/) to recruit participants. 

It's pretty simple: To connect JATOS with Prolific, you have to (1) tell Prolific where to send participants to run the JATOS study and (2) tell JATOS  where to send people back to Prolific, so they get paid when they finish the study. 

First, find your _Project_ page in Prolific. 

### 1. In Prolific: Enter your JATOS study link

![Prolific screenshot](/img/prolific_1_studyurl.png)

In the field under _What is the URL of your study?_ (first red box in the screenshot), enter a link to your JATOS study. You probably want a study link of either _General Single_ or a _General Multiple_ type (see [Run your Study with Study Links](Run-your-Study-with-Study-Links.html)).

Also, we recommend you click the option that you'll use URL parameters. This will modify the JATOS study link you entered -- that'S fine. 

### 2. In JATOS: Redirect to Prolific's end page after the study is done

Get the redirect link from your _Project_ page in Prolific…: 

![Prolific screenshot](/img/prolific_2_redirectlink.png)

And copy it into the **End Redirect URL** field of your Study Properties in JATOS: 

![screenshot](/img/Screenshot_end-redirect-url.png)



## Bonus (Optional) 

You can connect JATOS and Prolific programmatically through query parameters and JS. 

### 1. Consider passing Prolific URL parameters to your study

Prolific allows you to pass the parameters PROLIFIC PID, STUDY ID, and SESSION ID as URL parameters. You just need to make sure you cliked the radio button "I'll use URL parameters on Prolific" (see thi screenshot from point 1). 

You will then be able to access those URL parameters in your study's JavaScript via [`jatos.urlQueryParameters`](jatos.js-Reference.html#jatosurlqueryparameters).

### 2. Consider redirecting participants from within JS

Step 2 above, where you use the JATOS GUI to tell JATOS about the redirect link to Prolific, is the easiest and recommended. In some cases you might want to do with within your JS. 

With _jatos.js_: Include [`jatos.endStudyAndRedirect`](jatos.js-Reference.html#jatosendstudyandredirect) in the JavaScript of your **last** component

   E.g. but change this URL to the one you see in Prolific

   ```javascript
   jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD");
   ```

   You can combine it with sending result data

   ```javascript
   var resultData = {id: 123, data: "my important result data"};
   jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD", resultData);
   ```
