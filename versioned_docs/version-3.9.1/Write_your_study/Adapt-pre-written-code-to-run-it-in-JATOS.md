---
title: Adapt pre written code to run it in JATOS
slug: /Adapt-pre-written-code-to-run-it-in-JATOS.html
sidebar_position: 3
---

**Make your existing code run in JATOS**: Do you have a task, experiment, survey, or study already running in a browser, complete with its HTML, JavaScripts, and image files? If you now want to run it with JATOS, this page will guide you through the process.

**Developing a JATOS study typically happens on your local JATOS installation. For an overview, see: [Run an experiment with JATOS - Workflow](Run-an-experiment-with-JATOS-Workflow.html)**

-----

### Add the Study in Your Local JATOS

1.  **Add a New Study:** In the JATOS GUI, click **Studies** in the header, then click "**+**", followed by **New Study**. Choose a title for your study and click **Add**. JATOS will create a new folder within your assets root folder. By default, this folder will be named with the study's UUID and located in `/path_to_your_JATOS/study_assets_root/`.

2.  **Copy Your Files:** Copy all your study files (HTML, JavaScripts, images, audio, etc.) into this new study folder.

3.  **Add a New Component:** Back in the JATOS GUI, within the study you just added, click **New Component**. Choose a title and set the HTML file name to the name of the HTML file you copied into the study folder.

4.  **Specify File Paths:** In your HTML, CSS, and JavaScript files, you can use either relative or absolute paths for your assets. **Relative paths are recommended** because they are shorter and remain valid after exporting and importing a study.

    1.  **Relative paths:** Simply use the relative path within your study's folder.

          * *Example:* If a file named `survey.js` is in the root of the study assets folder:
            ```html
            <script src="survey.js"></script>
            ```
          * *Example:* If the file is in a subfolder named `lib`:
            ```html
            <script src="lib/survey.js"></script>
            ```

    2.  **Absolute paths (deprecated):** Always use the prefix `/study_assets/` followed by the study assets name you specified in your study's properties when you created it.

          * *Example:* If you want to load the file `survey.js` and the study assets folder is `my-exp`:

            ```html
            <script src="/study_assets/my-exp/survey.js"></script>
            ```

          * Note: For absolute paths, ensure you understand the difference between the `study_assets_root` folder and the placeholder `study_assets` in your path names. `study_assets_root` is the folder on your system (or server) where the assets (HTML, JS, CSS, images, etc.) of **all** your JATOS studies will be stored. You can [configure](JATOS_Configuration.html#study-assets-root-path) the location of this folder. `study_assets`, on the other hand, is just a placeholder that will go in your HTML files. JATOS will interpret this and replace the placeholder with the path (specific to the study) that you entered in the field 'Study assets directory name' in your Study's Properties. The advantage of this is that you can change the location or name of the assets for any study, or export-import a study into a different computer, and the study will still run without having to make any changes in the HTML code.

5.  **First Glimpse:** Click the "**Run**" button in either the study's or the component's toolbar. Your experiment should run just as it did before JATOS. Use your browser's developer tools to check for any missing files or other errors.

-----

### Edit Your HTML and JavaScript

Up to this point, JATOS has simply served your files. Now, we'll use a key JATOS feature: storing your result data in JATOS' database.

1.  **Include _jatos.js_:** Add the `_jatos.js_` library to your HTML file. Place the following line within your `<head>` section:

    ```html
    <script src="jatos.js"></script>
    ```

2.  **Add `jatos.onLoad`:** Most JATOS studies begin with this call. Whatever you want your study to do should start within this function.

    ```javascript
    jatos.onLoad(function() {
      // start your code here
    });
    ```

3.  **Send Your Result Data:** To send your result data to JATOS, use the `_jatos.js_` function [`jatos.submitResultData`](jatos.js-Reference.html#jatossubmitresultdata). You can pass this function any data in text format, including JSON, CSV, or XML. If you pass a JavaScript object, it will be automatically converted to JSON (stringified).

      * *Example:* If you want to send a JavaScript object as JSON:

        ```javascript
        jatos.submitResultData(myResultDataObject);
        ```
      * `jatos.submitResultData` saves the data into the JATOS database, overwriting any data previously submitted for that component. If you prefer not to overwrite data, use [`jatos.appendResultData`](jatos.js-Reference.html#jatosappendresultdata) instead.

4.  **Upload Files:** Instead of submitting text, you can also upload files using [`jatos.uploadResultFile`](jatos.js-Reference.html#jatosuploadresultfile).

5.  **Navigate or End Study:** At the end of your component, you'll typically want to either move to the next component or end the study.

      * To jump to the next component:
        ```javascript
        jatos.startNextComponent();
        ```
      * To finish the study:
        ```javascript
        jatos.endStudy();
        ```
      * You can combine these calls with sending result data:
        ```javascript
        jatos.startNextComponent(myResultDataObject);
        ```
        or
        ```javascript
        jatos.endStudy(myResultDataObject);
        ```

That covers the basics. You can find more information about other `_jatos.js_` functions and variables in the [reference](jatos.js-Reference.html).

-----

### Beyond the Basics

  * **Divide into Components:** Consider dividing your study into **several components**. For instance, you could have separate components for introduction, training, experiment, and feedback. You might even split the experiment itself into multiple parts. An advantage of this approach is that if a participant stops midway through your study, you still retain the result data from the completed initial components. Additionally, components can be reused in different studies.
  * **Use Input Parameters:** Utilize the **study input**, **component input**, or **batch input** fields, which are defined in the study, component, or batch properties, respectively. These allow you to change variables in your code directly through JATOS' GUI, which can be more comfortable than editing JavaScript.
  * **Add a Quit Button:** You can add a **quit button** with [jatos.addAbortButton](jatos.js-Reference.html#jatosaddabortbutton)    to your study, allowing the participant to [abort at any time](Data-Privacy-and-Ethics.html#things-you-should-consider-in-your-studies).