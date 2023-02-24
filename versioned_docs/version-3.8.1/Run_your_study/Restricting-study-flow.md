---
title: Restricting study flow - reloading, linear studies, single-use workers and previews
slug: /Restricting-study-flow.html
sidebar_position: 4
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

A worker can press their browser's reload button and by default JATOS will respond with the same component again: by default, the worker can do a component multiple times. To prevent this each **component properties** has a checkbox _Allow reload_.

![GUI Screenshot](/img/component-properties-reload.png)

If you want to prevent this behaviour uncheck the box. If a participant reloads the page, they will see an error message. Then the study run will be finished and put to state FAIL. Since each component properties has their own _Allow reload_ checkbox it can be defined differently for each component, e.g. reloading is allowed in the introduction but is prohibited in the actual experiment.

**Hint**: You should tell your workers in your study description if you disable reloads, in order to prevent them from accidentally pressing the reload button and failing your study. Consider also adding a warning (e.g. a pop-up) informing participants that they will not be able to continue with the study.  

**Another hint**: The (unchecked) _Allow reload_ and the (checked) _Linear study flow_ properties can be combined to achieve a strictly increasing study flow.


## Ensure a linear study flow

A worker can press their browsers back button and by default JATOS will response with the previous component, the one that was done before by the worker. This might allow a worker to divert from the intended study flow. To prevent this each **study properties** has a checkbox _Linear study flow_.

![Study Properties Screenshot](/img/study-properties-linear-flow_371.png)

If you want to enforce a linear study flow check the box. Then, if a participant tries to go backwards in their browser, they will see an error message instead. The study run will be finished and put to state FAIL.

**Hint**: You should tell your participants in your study's description if you enforce a linear study flow to prevent them from accidentally pressing the back button and failing your study. Consider also adding a warning (e.g. a pop-up) informing participants that they will not be able to continue with the study.  

**Another hint**: If you want to loop over components, un-check this box. 

**Yet another hint**: The (unchecked) _Allow reload_ and the (checked) _Linear study flow_ properties can be combined to achieve a strictly increasing study flow.


## Single-use study links - prevent workers running the study twice

Often you want to prevent a participant from running the same study twice. To achieve this use the _single-use_ study link types: _Personal Single_ and _General Single_.

Read more on the [different worker types available in JATOS](Worker-Types.html) and [about study links](Run-your-Study-with-Study-Links.html).


## Allow preview

Sometimes, when you hand out study links, your participants mindlessly click on the link right away and are not aware that they have already started the study. If they do not intend to run the study right away this is a problem with _single-use_ study links (**General Single** or **Personal Single**).

![GUI Screenshot](/img/study-properties-allow-preview-371.png)

With allowing previews in the **study properties** you can let your workers peek into a study without devaluing the study link. They can run the **first component** of your study as often as they wish and the study link gets devalued only after starting the second component. This only makes sense if you don't put your actual experiment in the first component, but some kind of description and/or consent form. Then your workers can click the study link, see the description and decide to do the study later.
