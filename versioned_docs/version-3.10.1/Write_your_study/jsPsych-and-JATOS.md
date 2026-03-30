---
title: jsPsych and JATOS
slug: /jsPsych-and-JATOS.html
hide_table_of_contents: true
sidebar_position: 4
---

<div style={{'float':'right', 'width':'300px'}}>

![](/img/jspsych-logo.png)

</div>

JATOS primarily handles the server-side aspects of your study, such as storing result data and managing workers. It doesn't dictate what happens within the browser itself—that's where your HTML, JavaScript, and CSS come in. While you can write all of this yourself, using a framework can be very helpful; [jsPsych](http://www.jspsych.org/) is an excellent option.

You'll find several jsPsych examples among [our example studies](/Example-Studies).

Below are the necessary modifications to adapt your jsPsych experiment to run within JATOS and send data to it. For more general guidance, you can also refer to [Adapt Pre-written Code to run it in JATOS](Adapt-pre-written-code-to-run-it-in-JATOS.html).

Please note that sometimes jsPsych versions have slight differences. These steps are for **jsPsych 7 or 8** (for older versions, please see [here](/3.6.x/jsPsych-and-JATOS.html)).

-----

### How to Turn Your jsPsych 7 or 8 Experiment into a JATOS Study

1.  **Include the _jatos.js_ library** in the `<head>` section of your HTML file:

    ```html
    <script src="jatos.js"></script>
    ```

2.  **Configure jsPsych to send results to JATOS.** If you wish to include an automatic "Cancel" button using `jatos.addAbortButton`, include that line as well (otherwise, omit it):

    ```javascript
    var jsPsych = initJsPsych({
      on_trial_start: jatos.addAbortButton,
      on_finish: () => jatos.startNextComponent(jsPsych.data.get().json())
    });
    ```

    The `jatos.startNextComponent` ends the current component in JATOS and either starts the next one (if you have multiple components) or finishes the study.

3.  **Wrap jsPsych's `run` command within `jatos.onLoad`**:

    ```javascript
    jatos.onLoad(() => {
      jsPsych.run(timeline);
    });
    ```

That's all there is to it! For a complete example using jsPsych, check out the '_Simple Reaction Time Task_' in our [example studies](Example-Studies). Additionally, the '_jsPsych 8 Examples_' study offers 79 different jsPsych demos and examples.
