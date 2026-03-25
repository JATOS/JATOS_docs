---
title: Use Prolific
slug: /Use-Prolific.html
sidebar_position: 6
---

It's very easy to use JATOS with [Prolific](https://www.prolific.co/) to recruit participants.

The connection is straightforward:

1.  You need to tell Prolific where to send participants to run your JATOS study.
2.  You need to tell JATOS where to send participants back to Prolific, so they get paid once they finish the study.

First, navigate to your **Project page** in Prolific.

### 1. In Prolific: Enter Your JATOS Study Link

Here's a screenshot of how this looks in Prolific:

-----

![Prolific screenshot](/img/prolific_1_studyurl.png)

-----

In the field labeled "*What is the URL of your study?*" (as shown in the screenshot above), enter the link to your JATOS study. You will most likely want a study link of either the **General Single** or **General Multiple** type (refer to [Run your Study with Study Links](Run-your-Study-with-Study-Links.html) for more details).

We also recommend that you click the option indicating you'll use **URL parameters**. This action will modify the JATOS study link you entered, which is expected and fine.

### 2. In JATOS: Redirect to Prolific's End Page After the Study is Done

First, get the redirect link from your **Project page** in Prolific:

-----

![Prolific screenshot](/img/prolific_2_redirectlink.png)

-----

Now there are **two ways how to tell JATOS the URL**:

1. The easy and recommended way is to copy this link into the **End Redirect URL** field within your Study Properties in JATOS:

    ![screenshot](/img/v39x/end-redirect-url.png)

2. In some cases, you might want to handle the redirection from within your JavaScript, **programmatically**, with the [`jatos.endStudyWithoutRedirect`](jatos.js-Reference.html#jatosendstudyandredirect) function. 

    For example (remember to change this URL to the one you see in Prolific):

    ```javascript
    jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD");
    ```

    You can also combine this with sending result data:

    ```javascript
    var resultData = {id: 123, data: "my important result data"};
    jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD", resultData);
    ```

-----

## Bonus (Optional) - Consider Passing Prolific URL Parameters to Your Study

You can also connect JATOS and Prolific programmatically through query parameters and JavaScript.

Prolific allows you to pass specific parameters, `PROLIFIC_PID`, `STUDY_ID`, and `SESSION_ID`, as URL parameters. To enable this, simply ensure you've selected the "I'll use URL parameters on Prolific" radio button (as shown in the screenshot from section 1).

You will then be able to access these URL parameters within your study's JavaScript via [`jatos.urlQueryParameters`](jatos.js-Reference.html#jatosurlqueryparameters).
