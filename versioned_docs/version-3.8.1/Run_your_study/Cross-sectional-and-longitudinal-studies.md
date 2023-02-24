---
title: Write cross-sectional and longitudinal studies
slug: /Cross-sectional-and-longitudinal-studies.html
sidebar_position: 7
---

There are several situation in which you might want to store (some parts) of the result data in a way that is accessible from more than just a single study run. This might be the case if you want to:
1. counterbalance your conditions across participants to acount for order effects. 
1. run a between-participants study.
1. run a longitudinal study.

Whenever a participant clicks on a study link, JATOS internally starts a study run. Once the data from the last component are sumitted, the study run is finished and the data are no longer avalable to the client side. So, to run a cross-sectional or a longitudinal study, you need store data in a way that outlives the particular study run and is avalable to future runs. The [Batch Session data](Session-Data-Three-Types.html) does just this.  


## 1. Counterbalance conditions between participants

The basic idea here is simple. Every time a new participant clicks on a study link, you assign them randomly to one of the possible conditions. And you keep track of how many participants did each condition in the Batch Session data. 

Have a look at the ["Randomize tasks between workers"](/Example-Studies) study in our examples for a full example that you can easily add as a first component in your study. 

## 2. Run cross-sectional designs

From the coding perspective, the exact same logic applies as for point 1. But please remember: different participants may run a study using different computers with different processing speed, operating systems and browser. All these factors can influence the timing of your response. So be careful when comparing different populations (epecially if they differ in demographics) as they might present systematic differences in the computers they run your study from. See [this paper](https://link.springer.com/article/10.3758/s13428-015-0567-2) for a more thorough discussion.


## 3. Write longitudinal studies

You might want to collect data from the same participant multiple times and, crucially, be able to link the multiple result data from a single participant. The first thing you need to do is make sure that the same *person* is assigned a single, unique ID. There are several options for this, and your exact solution may depend on how you are recruiting participants. 

### Using Personal Multiple study links

If your sample size is relatively small and it is logistically doable, you could send individualized [Personal Multiple study links](Run-your-Study-with-Study-Links.html) to each participant. If a participant runs a study with this study link, JATOS will assign them a unique number. You can access the worker ID in your JavaScript through [`jatos.workerId`](jatos.js-Reference.html#jatosworkerid) from the _jatos.js_ library.

### Using MTurk 

If you are recruiting participants through a MTurk, it's straightforward: You can access MTurk's worker ID in your JavaScript through `jatos.urlQueryParameters.workerId`. Alternatively you can also use JATOS' [`jatos.workerId`](jatos.js-Reference.html#jatosworkerid).

### Using Prolific

If you are usning Prolific to recruit participants, it's a bit more complicated. To access the worker ID, you first need to tell Prolific to include it in their query parameters. In Prolific, go to Study Settings and enable the option to include special query parameters in the URL. 

![Prolific Screenshot](/img/Screenshot_ExtendURL_Prolific.png)   

If you select these options in Prolific, you'll be able to collect the Prolific ID from your JavaScript by using `jatos.urlQueryParameters`, e.g.

```javascript
var prolificPid = jatos.urlQueryParameters.PROLIFIC_PID;
```

### Using a General Multiple link with IDs assigned to individual workers

If you want a large sample of participants recruited outside of a marketplace (i.e. if you are using a [General Multiple link](Worker-Types.html#-general-multiple-worker), you could provide each new participant with a unique ID that they then have to store and provide (manually) in the following session. Note that, when a participant runs a study with a General Single JATOS stores cookies on their browser to prevent them from taking part twice in the same study. But these cookies are minimal and not intended to be used to identify participants or to link a browser to any given result data. 


## Store bits of result data that are necessary for future sessions

Once you have an ID, you should assign to it the information relevant for the following sessions in your longitudinal study. Say you need to store the number of correct responses for a given session. You could do it with the command:

```javascript
var performanceInfo = {"percentageCorrect" : nCorrect/nTrials, "nTrials" : nTrials}
jatos.batchSession.add("/subjects/" + ID, performanceInfo); 
```

Which will append the information from `ID` and `percentageCorrect` to the already existing Batch session data and give you something that looks (e.g.) like this in the Batch session: 

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
```


**Note that the information stored in the Batch Session is visible to the client side, so it should contain only the strictly necessary, pseudonymized data.** In other words, store only summary data like the condition assigned, number of trials completed or correct, etc. But nothing else.


## Recover the corresponding bit of the result data from the Batch Session

You could do that with the following command: 

```javascript
var subjsPreviousPerformance = jatos.batchSession.getAll().subjects[ID]
```

That's it. Once you have your worker's ID and the corresponding longitudinally-relevant data, you can use it as a starting point for your next session. 


