---
title: End page - After your study finished
slug: /End-page-after-your-study-finished.html
sidebar_position: 9
---

By default, JATOS simply displays the text "**This study is finished. Thank you for your participation.**" in English, without any special formatting, once a study concludes. If you wish to use a different language, add a logo, or apply custom text or styling, please read on.

-----

### 1. `endPage.html`

If you include a file named `_endPage.html_` in your study assets folder alongside your other study files, JATOS will automatically redirect participants to this page after the study has finished.

**Hint 1:** Be aware that within `_endPage.html_`, you **cannot** load or use any other files from the study assets folder. Due to security reasons, once the study is finished, JATOS prevents access to other files from this folder, as well as from any of the JATOS sessions (study, batch, and group). However, this does not prevent you from loading images or libraries (or any other resources) directly from the internet.

**Hint 2:** If you run the study with an **MTurk Worker**, you will likely want to display the confirmation code to your worker. This code is passed to `_endPage.html_` in a cookie with the name `JATOS_CONFIRMATION_CODE`.

**Hint 3:** If you run your study using the **JATOS GUI (Run button)**, it will not display `_endPage.html_` but will instead redirect you back to JATOS' GUI.

**Hint 4:** The **End redirect URL** defined in the study properties has higher priority then `_endPage.html_` and will be used if both are set.

-----

### 2. Study Properties' End Redirect URL

You might want to redirect participants to a different external page, such as a Prolific end page or your department's webpage. You can achieve this by entering the URL of that page into the 'End Redirect URL' field within your study properties in the JATOS GUI.

![screenshot](/img/v39x/end-redirect-url.png)

**Hint:** If you run the study with an **MTurk Worker**, you will likely want to display the confirmation code to your worker. This code is passed as a URL query parameter named `confirmationCode`.

You can pass arguments from the original study link URL to the redirect URL. Squared brackets in the `End Redirect URL` indicate that the string within these brackets is a parameter from the original study run link URL. JATOS will then replace the entire `[string]` with the value of that parameter.

*Example:*

  * If your study link is:
    ```
    http://myjatosdomain/publix/v6UkpHR8Sfu?SONA_ID=123abc
    ```
  * And your `End Redirect URL` (in study properties) is:
    ```
    https://rug.sona-systems.com/webstudy_credit.aspx?experiment_id=123&credit_token=1234567&survey_code=[SONA_ID]
    ```
  * Then, after the study finishes, JATOS will automatically replace `[SONA_ID]` with `123abc` and redirect to:
    ```
    https://rug.sona-systems.com/webstudy_credit.aspx?experiment_id=123&credit_token=1234567&survey_code=123abc
    ```

-----

### 3. In JavaScript with `jatos.endStudyAndRedirect` or `jatos.endStudyWithoutRedirect`

If you need to dynamically determine (i.e., in JavaScript) the address of the webpage participants see after finishing a study, you can use one of two _jatos.js_ functions: [`jatos.endStudyAndRedirect`](jatos.js-Reference.html#jatosendstudyandredirect) or [`jatos.endStudyWithoutRedirect`](jatos.js-Reference.html#jatosendstudywithoutredirect). These functions should be called in the JavaScript of your study's **last component** and offer the most versatile control.