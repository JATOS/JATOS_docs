---
title: Restricting study flow - reloading, linear studies, single-use workers and previews
slug: /Restricting-study-flow.html
sidebar_position: 4
---

## Intro: Restricting Study Flow

Let's start by defining what we mean by **study flow**:

**Study flow** refers to the intended order of a study's components as experienced by participants running the study. This doesn't necessarily mean progressing through components in the sequential order they're defined on the study page. Instead, the study flow can move backward to a previous component, loop over several components, or even reload the current component. It's also possible to dynamically decide the next component in your JavaScript. Generally, and by default, a component can transition to any other component, including itself. The _jatos.js_ functions used to control study flow are `jatos.startNextComponent`, `jatos.startComponentByPos`, `jatos.startLastComponent`, and `jatos.startComponent`.

**Common restrictions** you might want to implement include:

  * Preventing a participant from reloading the same component (e.g., by using the browser's reload button).
  * Ensuring a linear study flow and preventing participants from going backward (e.g., by using the browser's back button).
  * Preventing a participant from running a study twice.
  * Allowing participants to preview a study without fully committing to it.

...and here's how to do it:

-----

## Allow or Prevent Reload of the Same Component

A worker can press their browser's reload button, and by default, JATOS will respond by loading the same component again. This means, by default, a worker can complete a component multiple times. To prevent this, each **component's properties** includes an **Allow reload** switch.

![GUI Screenshot](/img/v39x/component-properties-reload.png)

If you want to prevent this behavior, uncheck the box. If a participant then reloads the page, they will see an error message. The study run will subsequently finish and be marked with a FAIL state. Since each component's properties have their own **Allow reload** switch, this behavior can be defined differently for each component (e.g., reloading might be allowed in an introduction but prohibited in the actual experiment).

**Hint:** You should inform your workers in your study description if you disable reloads to prevent them from accidentally pressing the reload button and failing your study. Also consider adding an in-study warning (e.g., a pop-up) informing participants that they will not be able to continue if they reload.

**Another hint:** Unchecking **Allow reload** and checking **Linear study flow** (discussed next) can be combined to achieve a study flow where only moving forward is alowed.

-----

## Ensure a Linear Study Flow

A worker can press their browser's back button, and by default, JATOS will respond by loading the previous component (the one the worker just completed). This might allow a worker to deviate from the intended study flow. To prevent this, each **study's properties** includes a **Linear study flow** switch.

![Study Properties Screenshot](/img/v39x/study-properties-linear-flow.png)

If you want to enforce a linear study flow, check this box. Then, if a participant attempts to go backward in their browser, they will see an error message instead. The study run will finish and be put into a FAIL state.

**Hint:** You should inform your participants in your study's description if you enforce a linear study flow to prevent them from accidentally pressing the back button and failing your study. Also consider adding an in-study warning (e.g., a pop-up) informing participants that they will not be able to continue if they use the back button.

**Another hint:** If you intend to loop over components, you should uncheck this box.

**Yet another hint:** Unchecking **Allow reload** (in component properties) and checking **Linear study flow** (in study properties) can be combined to achieve a study flow where only moving forward is alowed.

-----

## Single-Use Study Links - Prevent Workers from Running the Study Twice

Often, you want to prevent a participant from completing the same study twice. To achieve this, use the **single-use** study link types: **Personal Single** and **General Single**.

Read more about the [different worker types available in JATOS](Worker-Types.html) and [about study links](Run-your-Study-with-Study-Links.html).

-----

## Allow Preview

Sometimes, when you hand out study links, participants might thoughtlessly click on the link immediately without realizing they've already started the study. If they don't intend to run the study right away, this becomes an issue with **single-use** study links (**General Single** or **Personal Single**).

![GUI Screenshot](/img/v39x/study-properties-allow-preview.png)

By enabling **Allow preview** in the **study properties**, you can let your workers peek into a study without invalidating the study link. They can run the **first component** of your study as often as they wish, and the study link only becomes "used" after they start the second component. This feature is most useful if your actual experiment isn't placed in the first component, but rather some form of description and/or consent form. This way, your workers can click the study link, review the description, and then decide to complete the study at a later time.
