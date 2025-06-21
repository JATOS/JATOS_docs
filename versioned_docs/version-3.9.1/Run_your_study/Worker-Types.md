---
title: Worker and study link types
slug: /Worker-Types.html
sidebar_position: 3
---

### Overview

In JATOS, a **worker** (also known as a participant) is a person who runs a study, following Amazon MTurk's terminology. JATOS offers various worker types, each dictating how a participant can access and interact with a study. For instance, some worker types can run the same study multiple times, whereas others can do it only once.

A **study link** is essentially the URL you provide to a worker. Each worker is associated with a specific study link, and their type naming align. For more information on study links, please also read [Run your study with study links](Run-your-Study-with-Study-Links.html).

| | **Jatos Worker** | **Personal Single** | **Personal Multiple** | **General Single** | **General Multiple** | **MTurk (Sandbox)** |
|---|---|---|---|---|---|---|
| **Typical Use** | During study development | Small, targeted group, each receives a unique link | Small, targeted group (e.g., pilot workers, or those needing multiple attempts), each receives a unique link | Larger groups where links are shared (e.g., social media); single use per browser | Larger groups where links are shared (e.g., social media); multiple uses per browser | For Amazon MTurk |
| **Repeat Same Study with Same Link** | (has no links) | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span>(keeps the same worker) | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span>(creates a new worker each time)| <span className="glyphicon glyphicon-ok-sign"></span> |
| **Run Different Studies with Same Worker** | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> |
| **Supports [Preview of Studies](Restricting-study-flow.html#allow-preview)** | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> |
| **Possible Bulk Creation** | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> | <span className="glyphicon glyphicon-remove-sign"></span> |
| **Run Group Studies** | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> | <span className="glyphicon glyphicon-ok-sign"></span> |

-----

### Jatos Worker and Study Link

**Jatos workers can run any study as many times as they want.**

JATOS workers typically run a study (or individual components) by clicking the **Run** buttons within the JATOS GUI. JATOS workers are generally the **researchers themselves, testing their own studies**. Each JATOS user (anyone with a JATOS login) has their own associated Jatos worker. These workers are not intended for use by participants.

### Personal Single Worker and Study Link

With a Personal Single study link, **a study can be run only once** (but see [Allow Preview](Restricting-study-flow.html#allow-preview) for an exception). You can think of these as *personalized links with single access*. Each Personal Single study link corresponds to a unique Personal Single worker.

You would typically send a Personal Single study link to workers you contact individually. These links are useful for small studies where individual contact is feasible, or when you need to pair up results (from the same or different studies) in a longitudinal design.

[Learn more about how to generate Personal type study links](Run-your-Study-with-Study-Links.html#personal-type-links-personal-single-or-personal-multiple).

### Personal Multiple Worker and Study Link

With a Personal Multiple study link, the worker can **run a study as many times as they want**. Each Personal Multiple study link corresponds to a unique Personal Multiple worker.

You might send Personal Multiple study links to your pilot workers, for instance.

[Learn more about how to generate Personal type study links](Run-your-Study-with-Study-Links.html#personal-type-links-personal-single-or-personal-multiple).

### General Single Worker and Study Link

This study link type can be used **many times by different participants to run a study, but only once per browser** (but see: [Allow Preview](Restricting-study-flow.html#allow-preview)). Each time the link is used, a new General Single worker is created on-the-fly.

You could distribute a General Single study link via social media (like X/Twitter), mailing lists, or by posting it on a public website. This type is especially useful for collecting data from a large number of workers.

Keep in mind, however, that JATOS uses browser cookies to determine if the study link has already been used. If someone uses a different computer, a new browser, or simply deletes their browser's cookies, JATOS will assume the link is unused. Thus, the same person could (with some effort) use a General Single link multiple times.

### General Multiple Worker and Study Link

A General Multiple study link is the least restrictive type and can be used **many times by different participants to run a study**. The key difference from a General Single link is that a General Multiple study link can be used repeatedly **even in the same browser**. Each time a General Multiple study link is used, a new General Multiple worker is created on-the-fly.

### MTurk and MTurk Sandbox Workers

MTurk and MTurk Sandbox workers access a JATOS study through a study link provided via Amazon's Mechanical Turk (MTurk).

[Learn more about MTurk study links](Connect-to-Mechanical-Turk.html).

**DATA PRIVACY NOTE:** If the same worker from MTurk participates in two of your studies, their two results will be linked to the same MTurk worker ID in JATOS. This means you could inadvertently gather data from different studies, potentially without the workers' explicit consent for such linking. For this reason, we recommend that you delete your data from JATOS as soon as you finish a study. This practice ensures that if the same MTurk worker takes part in a different study, they will receive a new MTurk worker ID, preventing automatic data linkage between different studies. See our [Data Privacy and Ethics](Data-Privacy-and-Ethics.html) page for more detailed information.
