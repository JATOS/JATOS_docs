---
title: Worker Types
slug: /Worker-Types.html
sidebar_position: 4
---

### Overview
Following Amazon Mechanical Turk’s terminology, a worker in JATOS is a person who runs a study. Different worker types access a study in different ways. For example, some workers can run the same study multiple times, whereas others can do it only once.

| | Jatos             | Personal Single   | Personal Multiple | General Single    | General Multiple   | MTurk (Sandbox)            |
|-|-------------------|-------------------|-------------------|-------------------|-------------------|------------------|
| **Icon** | <span className="glyphicon glyphicon-jatos"></span> | <span className="glyphicon glyphicon-personal-single"></span> | <span className="glyphicon glyphicon-personal-multiple"></span> | <span className="glyphicon glyphicon-general-single"></span> | <span className="glyphicon glyphicon-general-multiple"></span> | <span className="glyphicon glyphicon-mturk"></span> |
| **Typical use** | During study development | Small targeted group, each one of them gets a link | Small targeted group of workers who pilot the study or need to do it multiple times | Bigger groups but with less control; link shared e.g. via social media | Bigger groups and where the workers need to do it multiple times | For Amazon Mechanical Turk |
| **Created when?** | Together with the JATOS user | When you create the link | When you create the link | On-the-fly whenever someone uses the link | On-the-fly whenever someone uses the link | On-the-fly after a MTurk worker clicked on the HIT link |
| **Repeat the same study with the same link** | (has no links) | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span>(keeps the same worker) | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span>(creates a new worker each time)| <span className="glyphicon glyphicon-ok-sign"></span> |
| **Run different studies with the same worker** | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> |
| **Supports [preview of studies](Worker-Types.html#preview-links)** | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> |
| **Possible bulk creation** | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> |
| **Run [group studies](Example-Group-Studies)** | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> |


### <span className="glyphicon glyphicon-jatos"></span> Jatos Worker 

**Jatos workers can run any study as many times as they want.**

Jatos workers run a study (or any of its components individually) by clicking on the _Run_ buttons in the GUI. Jatos workers are usually the **researchers trying out their own studies**. Each JATOS user (i.e., anybody with a JATOS login) has their own Jatos worker.  


### <span className="glyphicon glyphicon-personal-single"></span> Personal Single Worker 

With a Personal Single link **a study can be run only once** ([*But see Preview Links](#preview-links)). You can think of them as _personalized links with single access_. Each Personal Single link corresponds a Personal Single worker.

Usually you would send a Personal Single link to workers that you contact individually. Each link can be personalized with a **Comment** you provide while creating it (e.g. by providing a pseudonym).

Personal Single links are useful in small studies, where it's feasible to contact each worker individually, or (e.g.) you want to be able to pair up several results (either from the same or different studies) in a longitudinal design. You can create Personal Single links in bulk by changing the **Amount** value.

![GUI Screenshot](/img/create_personal_single_run.png)
![GUI Screenshot](/img/view_personal_single_run.png)


### <span className="glyphicon glyphicon-personal-multiple"></span> Personal Multiple Worker

With a Personal Multiple link the worker can **run a study as many times as they want**. Each Personal Multiple link corresponds to a Personal Multiple worker.

You could send _Personal Multiple_ links to your pilot workers. Each link can be personalized with a **Comment** you provide while creating it (e.g. by providing a pseudonym). You can create Personal Multiple links in bulk by changing the **Amount** value.


### <span className="glyphicon glyphicon-general-single"></span> General Single Worker

This link type can be used **many times by different participants to run a study but only once per browser** ([*But see Preview Links](#preview-links)). Each time the link is used a new General Single worker is created on-the-fly.

You could distribute a _General Single_ link through twitter, a mailing list or posting it on a public website. It is essentially useful for cases where you want to collect data from a large number of workers. 

Keep in mind, however, that JATOS uses the browser's cookies to decide whether a worker has already accessed a study. If someone uses a different computer, a new browser, or simply deletes their browser's cookies, then JATOS will assume that it's a new worker. So the same person could (with some effort) use a General Single link several times.


### <span className="glyphicon glyphicon-general-multiple"></span> General Multiple Worker 

A General Multiple link is the least restrictive type and can be used **many times by different participants to run a study**. The difference to a General Single is that the General Multiple link can be used repeatedly **even in the same browser**. Each time a General Multiple link is used a new General Multiple worker is created on-the-fly.


### <span className="glyphicon glyphicon-mturk"></span> MTurk (Sandbox) Worker

MTurk and MTurk Sandbox workers access a JATOS study through a link in Amazon's Mechanical Turk (AMT).

**DATA PRIVACY NOTE:** If the same worker from AMT does two of your studies, the two results will be paired with the same MTurk worker in JATOS. This means that you could gather data from different studies, without your workers ever consenting to it. For this reason, we recommend that you delete your data from JATOS as soon as you finish a study. This way, if the same worker from AMT takes part in a different study, they will get a new MTurk worker, and you will not be able to automatically link their data between different studies. See our [Data Privacy and Ethics](Data-Privacy-and-Ethics) page for more details on this.
