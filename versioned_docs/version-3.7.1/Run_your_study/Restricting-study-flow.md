---
title: Restricting study flow - reloading, linear studies, single-use workers and previews
slug: /Restricting-study-flow.html
sidebar_position: 3
---

## Intro: Restricting study flow

Let's first say what we understand under the _study flow_:

**Study flow** - the intended order of a study's componenents as they are done by the participants running the study. This doesn't necessarily has to be the order of components like they are defined in the study page, meaning going forward one-by-one - instead the study flow can go backwards to a previous component, go in a loop over several components, or reload the current component. It is even possible to decide on-the-fly in your JavaScripts what the next component will be. In general and by default a component can go to any other component including itself. The _jatos.js_ functions to determine the study flow are `jatos.startNextComponent`, `jatos.startComponentByPos`, `jatos.startLastComponent` and `jatos.startComponent`.

**Common restrictions**
- You want to prevent a participant from reloading the same component (by using the browser's reload button).
- You want to ensure a linear study flow and prevent participants from going backwards (by using the browser's back button).
- You want to prevent a participant from running a study twice.
- You want to allow participants to first have a peek into a study and preview it without actually starting the study and fully committing to it.

... and how to do it:


## Allow reload or prevent a reload of the same component

A worker can press their browser's reload button and by default JATOS will respond with the same component again: by default, the worker can do a component multiple times. To prevent this each component properties has a checkbox _Allow reload_.

![GUI Screenshot](/img/component-properties-reload.png)

If you want to prevent this behaviour uncheck the box. If a participant reloads the page, they will see an error message. Then the study run will be finished and put to state FAIL. Since each component properties has their own _Allow reload_ checkbox it can be defined differently for each component, e.g. reloading is allowed in the introduction but is prohibited in the actual experiment.

**Hint**: You should tell your workers in your study description if you disable reloads, in order to prevent them from accidentally pressing the reload button and failing your study. Consider also adding a warning (e.g. a pop-up) informing participants that they will not be able to continue with the study.  

**Another hint**: The (unchecked) _Allow reload_ and the (checked) _Linear study flow_ properties can be combined to achieve a strictly increasing study flow.


## Ensure a linear study flow

A worker can press their browsers back button and by default JATOS will response with the previous component, the one that was done before by the worker. This might allow a worker to divert from the intended study flow. To prevent this each study properties has a checkbox _Linear study flow_.

![Study Properties Screenshot](/img/study-properties-linear-flow.png)

If you want to enforce a linear study flow check the box. Then, if a participant tries to go backwards in their browser, they will see an error message instead. The study run will be finished and put to state FAIL.

**Hint**: You should tell your participants in your study's description if you enforce a linear study flow to prevent them from accidentally pressing the back button and failing your study. Consider also adding a warning (e.g. a pop-up) informing participants that they will not be able to continue with the study.  

**Another hint**: If you want to loop over components, un-check this box. 

**Yet another hint**: The (unchecked) _Allow reload_ and the (checked) _Linear study flow_ properties can be combined to achieve a strictly increasing study flow.


## Single-use worker links - prevent workers running the study twice

Often you want to prevent a participant from running the same study twice. To achieve this use the _single-use_ workers:  _Personal Single worker_, _General Single worker_, and the _MTurk worker_.

Remember that _General Single_ links can be used to run a study only once from each browser and each computer, in principle. But if a participant clears their browser cookies, changes browser or sits in front of another computer, they will be able to run the study again.

[Read more on the different worker types available in JATOS](Worker-Types.html) 


### Preview Links

Perhaps you want to allow **General Single** or **Personal Single** workers to have a peek into the study, to preview it, despite restricting them to run the whole study only once. In JATOS you can let these two worker types preview the **first** component of your study (where you could describe what they will have to do, how long it will take, ask for consent, etc). Often, workers see this description and decide that they want to do the study later. 

To allow them to do this, activate the checkbox **Allow preview** (this will add a `&pre` to the end of the URL).

![GUI Screenshot](/img/preview_general_single_run.png)

Now your workers can use the link as many times as they want - as long **as they don't go further than the first component**. But once the second component is started, JATOS will restrict access to the study in the usual way as it is for General Single and Personal Single workers. This means that they will get an error if they try to use the link again to access the study.

If the Allow preview box is unchecked, JATOS will follow its default behaviour: once a worker clicked on the link - that's it, the study is started and JATOS will not allow a second click on this link. 
