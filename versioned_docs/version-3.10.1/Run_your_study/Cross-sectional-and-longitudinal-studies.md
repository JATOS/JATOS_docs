---
title: Write cross-sectional and longitudinal studies
slug: /Cross-sectional-and-longitudinal-studies.html
sidebar_position: 7
---

There are several situations where you might need to store parts of your study's result data in a way that remains accessible across multiple study runs. This is typically the case if you aim to:

1.  **Counterbalance** your conditions across participants to account for order effects.
2.  Run a **between-participants** study.
3.  Conduct a **longitudinal** study.

When a participant clicks on a study link, JATOS initiates a study run. Once data from the last component is submitted, the study run concludes, and that data is no longer available to the client side. Therefore, to conduct cross-sectional or longitudinal studies, you need a method to store data that persists beyond a single study run and is accessible to future runs. The [Batch Session data](Session-Data-Three-Types.html) is designed specifically for this purpose.

-----

## 1. Counterbalance Conditions Between Participants

The core idea here is straightforward: every time a new participant clicks on a study link, you randomly assign them to one of your possible conditions. You then keep track of how many participants have completed each condition using the **Batch Session data**.

For a full example that you can easily integrate as a first component in your study, refer to the ["Randomize tasks between workers"](/Example-Studies) study in our examples.

-----

## 2. Run Cross-Sectional Designs

From a coding perspective, the logic for cross-sectional designs is identical to that for counterbalancing (point 1). However, please remember that different participants may run your study on various computers with differing processing speeds, operating systems, and browsers. All these factors can influence response timings. Therefore, exercise caution when comparing different populations (especially if they vary demographically), as they might exhibit systematic differences in the computers they use to run your study. For a more thorough discussion, see [this paper](https://link.springer.com/article/10.3758/s13428-015-0567-2).

-----

## 3. Write Longitudinal Studies

In longitudinal studies, you aim to collect data from the same participant multiple times and, crucially, link these multiple data points to a single participant. The first step is to ensure that each *person* is assigned a unique, consistent ID across sessions. Your specific solution for this will likely depend on your participant recruitment method.

### Using Personal Multiple Study Links

If your sample size is relatively small and logistically feasible, you could send individualized [Personal Multiple study links](Run-your-Study-with-Study-Links.html) to each participant. When a participant runs a study using such a link, JATOS assigns them a unique ID. You can access this worker ID in your JavaScript via [`jatos.workerId`](jatos.js-Reference.html#jatosworkerid) from the _jatos.js_ library.

### Using MTurk

If you are recruiting participants through MTurk, it's straightforward: You can access the MTurk worker ID in your JavaScript through `jatos.urlQueryParameters.workerId`. Alternatively, you can also use JATOS' [`jatos.workerId`](jatos.js-Reference.html#jatosworkerid).

### Using Prolific

If you are using Prolific for recruitment, the process is slightly more involved. To access the worker ID, you first need to configure Prolific to include it in their query parameters. In Prolific, go to Study Settings and enable the option to include special query parameters in the URL.

If you select these options in Prolific, you'll be able to collect the Prolific ID from your JavaScript using `jatos.urlQueryParameters`. For example:

```javascript
var prolificPid = jatos.urlQueryParameters.PROLIFIC_PID;
```

### Using a General Multiple Link with IDs Assigned to Individual Workers

For large samples recruited outside of a marketplace (i.e., using a [General Multiple link](Worker-Types.html#general-multiple-worker-and-study-link)), you could generate a unique ID for each new participant and instruct them to manually store and provide this ID in subsequent sessions. Note that when a participant runs a study with a General Single link, JATOS stores minimal cookies in their browser to prevent them from taking part twice in the same study. However, these cookies are not intended for identifying participants or linking a browser to specific result data.

-----

## Store Bits of Result Data Necessary for Future Sessions

Once you have a participant ID, you should associate with it the information relevant for subsequent sessions in your longitudinal study. For instance, if you need to store the number of correct responses for a given session, you could do so with the command:

```javascript
var performanceInfo = {"percentageCorrect" : nCorrect/nTrials, "nTrials" : nTrials}
jatos.batchSession.add("/subjects/" + ID, performanceInfo);
```

This will append the information (e.g., `ID` and `percentageCorrect`) to the existing Batch Session data, resulting in a structure that looks something like this in the Batch Session:

```javascript
{
  "subjects": {
    "MyemLF": {
      "percentCorrect": 62,
      "nTrials" : 250
    },
    "74b61m": {
      "percentCorrect": 78,
      "nTrials" : 250
    },
    "pFyxRT": {
      "percentCorrect": 67,
      "nTrials" : 247
    }
  }
}
```

**Note that the information stored in the Batch Session is visible to the client side. Therefore, it should contain only the strictly necessary, pseudonymized data.** In other words, only store summary data like the assigned condition, number of trials completed, or correct responses, and nothing else.

-----

## Recover the Corresponding Bit of Result Data from the Batch Session

You can retrieve the relevant data using a command like this:

```javascript
var subjsPreviousPerformance = jatos.batchSession.getAll().subjects[ID];
```

That's it. Once you have your worker's ID and the corresponding longitudinally-relevant data, you can use it as a starting point for your next session.
