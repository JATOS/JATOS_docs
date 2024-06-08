---
title: Worker and study link types
slug: /Worker-Types.html
sidebar_position: 3
---

### Overview

Following Amazon Mechanical Turk’s terminology, a worker in JATOS is a person who runs a study (also called participant). JATOS has different worker types and different worker types access a study in different ways. For example, some worker types can run the same study multiple times, whereas others can do it only once.

A study link is basically the URL that you hand out to a worker. A worker is always assoziated to a study link and share the same type naming. Also read [Run your study with study links](Run-your-Study-with-Study-Links.html) to get more information about study links.

| | Jatos             | Personal Single   | Personal Multiple | General Single    | General Multiple   | MTurk (Sandbox)            |
|-|-------------------|-------------------|-------------------|-------------------|-------------------|------------------|
| **Typical use** | During study development | Small targeted group - each one of them gets their own study link | Small targeted group of workers who pilot the study or need to do it multiple times - each one of them gets their own study link | Bigger groups but with less control - link is shared e.g. via social media | Bigger groups and where the workers need to do the study multiple times - link is shared e.g. via social media | For Amazon Mechanical Turk |
| **Repeat the same study with the same study link** | (has no links) | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span>(keeps the same worker) | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span>(creates a new worker each time)| <span className="glyphicon glyphicon-ok-sign"></span> |
| **Run different studies with the same worker** | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> |
| **Supports [preview of studies](Worker-Types.html#preview-links)** | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> |
| **Possible bulk creation** | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> |
| **Run [group studies](Example-Group-Studies)** | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> |


### Jatos worker and study link 

**Jatos workers can run any study as many times as they want.**

Jatos workers run a study (or any of its components individually) by clicking on the _Run_ buttons in the GUI. Jatos workers are usually the **researchers trying out their own studies**. Each JATOS user (i.e., anybody with a JATOS login) has their own Jatos worker. They are not meant to be used by participants.


### Personal Single worker and study link

With a Personal Single study link **a study can be run only once** ([*But see Allow Preview](Restricting-study-flow.html#allow-preview)). You can think of them as _personalized links with single access_. Each Personal Single study link corresponds to a Personal Single worker.

Usually you would send a Personal Single study link to workers that you contact individually. Personal Single study links are useful in small studies, where it's feasible to contact each worker individually, or (e.g.) you want to be able to pair up several results (either from the same or different studies) in a longitudinal design.

[More about how to generate Personal type study links](Run-your-Study-with-Study-Links.html#personal-type-links)


### Personal Multiple worker and study link

With a Personal Multiple study link the worker can **run a study as many times as they want**. Each Personal Multiple study link corresponds to a Personal Multiple worker.

You could send Personal Multiple study links to your pilot workers.

[More about how to generate Personal type study links](Run-your-Study-with-Study-Links.html#personal-type-links)


### General Single worker and study link

This study link type can be used **many times by different participants to run a study but only once per browser** (*But see: [Allow Preview](Restricting-study-flow.html#allow-preview)). Each time the link is used a new General Single worker is created on-the-fly.

You could distribute a General Single study link through social media, like X/Twitter, a mailing list or posting it on a public website. It is essentially useful for cases where you want to collect data from a large number of workers.

Keep in mind, however, that JATOS uses the browser's cookies to decide whether a study link was already used. If someone uses a different computer, a new browser, or simply deletes their browser's cookies, then JATOS will assume that it's an unused study link. So the same person could (with some effort) use a General Single link several times.


### General Multiple worker and study link

A General Multiple study link is the least restrictive type and can be used **many times by different participants to run a study**. The difference to a General Single is that the General Multiple study link can be used repeatedly **even in the same browser**. Each time a General Multiple study link is used a new General Multiple worker is created on-the-fly.


### MTurk and MTurk Sandbox

MTurk and MTurk Sandbox workers access a JATOS study through a study link in Amazon's Mechanical Turk (MTurk).

[More about MTurk study links](Connect-to-Mechanical-Turk.html)

**DATA PRIVACY NOTE:** If the same worker from MTurk does two of your studies, the two results will be paired with the same MTurk worker in JATOS. This means that you could gather data from different studies, without your workers ever consenting to it. For this reason, we recommend that you delete your data from JATOS as soon as you finish a study. This way, if the same worker from MTurk takes part in a different study, they will get a new MTurk worker, and you will not be able to automatically link their data between different studies. See our [Data Privacy and Ethics](Data-Privacy-and-Ethics) page for more details on this.
