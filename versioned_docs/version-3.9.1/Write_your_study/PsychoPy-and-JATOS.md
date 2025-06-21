---
title: PsychoPy and JATOS
slug: /PsychoPy-and-JATOS.html
sidebar_position: 6
---

**How to turn a PsychoPy experiment into a JATOS study - Either watch the video or follow the instructions.**

import ReactPlayer from 'react-player'

<ReactPlayer controls width='100%' height='100%' url='psychopy_to_jatos.webm' />

### Create a Study in JATOS

1.  Open JATOS in your browser. (Need to install JATOS locally? [Find out how here](https://www.jatos.org/Installation.html)).
2.  **Create a new study**: Click on **Studies** to open the sidebar, then select **+**, and finally **New Study**.
3.  JATOS will create a new study and display its study page. **Make a note of the study assets folder name**; you'll need it later. You can find it at the top of your study page. By default, it will look similar to `0413af8c-8512-4105-b89b-08a7f557cb57`.
4.  **Add a new component**: Click the **New Component** button. In the window that appears, enter a title (this is up to you) and type `index.html` into the 'HTML file path' field. Then, press **Add**.


### Adapt Your PsychoPy Experiment to JATOS

Now, let's configure PsychoPy/PsychoJS to save your experiment's result data directly to JATOS.

1.  **Obtain your PsychoPy experiment** (for example, you can download it from [https://pavlovia.org/explore](https://pavlovia.org/explore)).
2.  **Copy the contents of your PsychoPy experiment folder** into the study assets folder you created in JATOS. By default, this folder is located in your JATOS installation directory under `study_assets_root`.
3.  **Open the copied experiment** (the one now within the JATOS study asset folder) in the PsychoPy Builder.
4.  **Select the last routine of your experiment** and add a **custom code component** (found under **Components** -> **Custom** -> **Code**).
5.  In the new code properties window, **change the 'Code type' to 'JS'** since we'll be adding JavaScript.
6.  **Open 'Before experiment'** and add the following line:

    ```javascript
    jQuery.getScript("jatos.js");
    ```

    This line loads the _jatos.js_ library.

7.  **Open 'Begin experiment'** and add the following line:

    ```javascript
    psychoJS._saveResults = 0;
    ```

    This instructs PsychoJS not to save the result data locally.

8.  **Open 'Begin Routine'** and add the following lines:

    ```javascript
    const data = psychoJS._experiment._trialsData;
    
    jatos.submitResultData(data);
    ```

    This sends the result data in JSON format to JATOS at the end of the experiment.
    
    If you prefer CSV format:

    ```javascript
    const data = psychoJS._experiment._trialsData;

    const dataCsv = data.map(it => Object.values(it).join(',')).join('\n')
    jatos.submitResultData(dataCsv);
    ```

9.  Open **'End experiment'** and add the following line:

    ```javascript
    jatos.startNextComponent();
    ```

    This ends the current component in JATOS and either starts the next one (if you have multiple components) or finishes the study.

10. Close the code properties window by clicking **OK**.
11. **Save** your experiment in the PsychoPy Builder.
12. Switch to the PsychoPy Runner.
13. Generate the browser version of your experiment by selecting **Run** then **Run JS for local debug** from the top menu. This action will add your experiment's JavaScript file and a new 'lib' folder (containing PsychoJS JavaScript and CSS files) to your experiment folder. It will also open a browser tab, which you can close as you'll be running the experiment within JATOS.
14. Navigate to your study page in JATOS (the one you created earlier) and click **Run**.
15. If everything is set up correctly, your experiment should now be displayed.
16. Check that, after your study has finished, the result data are available in JATOS: go to your study page, then click **Results**, and finally expand the first result by clicking `▼` in the first column.
17. At this point, you can export or import your study to another JATOS instance.

**Note:** In some PsychoPy experiments, you need to add a keyboard response component with the **'Force end of routine'** checkbox activated at the end of the last routine of the experiment to ensure that JATOS properly finishes the study.