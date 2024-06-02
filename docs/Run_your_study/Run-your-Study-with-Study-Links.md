---
title: Run your Study with Study Links
slug: /Run-your-Study-with-Study-Links.html
sidebar_position: 2
---

Study Links in JATOS is the name of a page where one can generate study links for your participants (also called workers in JATOS) to run your study. You can also organize your participants into batches and handle their results there.

To get to the Study Links page press on the button **Study Links** in your study's page:

![Study Links Button screenshot](/img/v39x/study_links_1.png)

In the beginning every study has only one batch, the 'Default' one, but more can be added. A batch can have study links of different type, e.g. Personal Single, Personal Multiple etc:

![Study Links page screenshot](/img/v39x/study_links_2.png)


## Study links - How to let participants run your study

During development of your study you would usually run it with the "Run" button in the study page. But then, when you are done developing you want to let others run your study - you want participants (or workers as they are called in JATOS) do it. For this JATOS lets you create study links that you can hand out to your workers (e.g. via email or social media).

**Generate study links and hand them to your workers**

JATOS has different study link types and each type corresponds to a worker type with different properties, that are well explained on a dedicated page: [Worker Types](Worker-Types.html).

![Study Links page screenshot](/img/v39x/study_links_3.png)

Click on the "**▼**" button in the left of the batch row (red box) to expand the study link types (if it's not already expanded).

![Study Links page screenshot](/img/v39x/study_links_7.png)

You can de-/activate a study link type by clicking on the switch in the left of each row (red box). Deactivated types cannot be used to run a study. Always check before you send out study links that the corresponding types are activated.


### Personal type links: Personal Single or Personal Multiple

![Study Links page screenshot](/img/v39x/study_links_4.png)

Personal type links can be either "Single" or "Multiple". You can find more details about them in the [Worker Types](Worker-Types.html) page, but the gist is that the links are meant to be handed to individual workers (hence _Personal_). Personal Single links can be used once, whereas Personal Multiple can be used many times.

After clicking the **Study Links** button you get a new window where you can create and manage the study links of this type.

![Study Links page screenshot](/img/v39x/study_links_11.png)

1. This button creates one study link without a comment. This button is a shortcut to the "New Study Links" button.
1. Lets you create several study links and lets you add a comment to them. The comment is only a hint for you that you can use to distinguish your study links. You can create Personal type study links in bulk by changing the Amount value.
1. This is the study code. [You can hand this to your workers](Run-your-Study-with-Study-Links.html#study-code--study-entry-page).
1. This is your actual study link. Hand this to your workers. There are two links that can be toggled by a button: 1) [The 'Open Directly' link starts the study right away](Run-your-Study-with-Study-Links.html#start-directly-with-a-study-link). 2) [The 'Confirm First' lets your worker confirm first with a button press](Run-your-Study-with-Study-Links.html#study-link--study-entry-page-for-confirmation). Use the <span class="glyphicon glyphicon-duplicate"></span> button to copy the link to the clipboard or <span class="glyphicon glyphicon-qrcode"></span> to get the QR code.
1. Use this checkbox to de-/activate a single study link. A deactivated study link can not be used to start a study run (but an already started study run can continue to run).
1. Use these buttons to filter the study links. You can show _All_, only the _Active_ or _Deactivated_ ones, or show only the links that were already _Used_.

![Study Links page screenshot](/img/v39x/study_links_14.png)

Use QR codes to make your study easier accessible with mobile phones. E.g. copy+paste the QR code image into an email or print it out and post it on a bulletin board.


### General type links: General Single or General Multiple

![Study Links page screenshot](/img/v39x/study_links_5.png)

General type links can be either Single or Multiple. You can find more details about them in the [Worker Types](Worker-Types.html) page, but the gist is that all workers (or at least many) get the same link (hence _General_). The General Single link can be used once whereas General Multiple can be used many times.

Due to the nature of these types there is only one study link per type. Click on the button Study Link to get it. 

![Study Links page screenshot](/img/v39x/study_links_15.png)

There are two links that can be toggled by a button: 1) [The 'Open Directly' link starts the study right away](Run-your-Study-with-Study-Links.html#start-directly-with-a-study-link). 2) [The 'Confirm First' lets your worker confirm first with a button press](Run-your-Study-with-Study-Links.html#study-link--study-entry-page-for-confirmation). Use the <span class="glyphicon glyphicon-duplicate"></span> button to copy the link to the clipboard or <span class="glyphicon glyphicon-qrcode"></span> to get the QR code. Use QR code to make your study easier accessible with mobile phones. E.g. copy+paste the QR code image into an email or print it out and post it on a bulletin board.


### MTurk type links

![Study Links page screenshot](/img/v39x/study_links_6.png)

How to connect to MTurk and create study links is described in its own page: [Connect to Mechanical Turk](Connect-to-Mechanical-Turk.html).


## Study Entry Page

A study run can be started in JATOS in slightly different ways:

1. [Start directly with a study link](Run-your-Study-with-Study-Links.html#start-directly-with-a-study-link)
1. [Study link + Study Entry page for confirmation](Run-your-Study-with-Study-Links.html#study-link--study-entry-page-for-confirmation)
1. [Study code + Study Entry page](Run-your-Study-with-Study-Links.html#study-code--study-entry-page)

**QR codes** can be used instead of study links but they are essentially just another representation of the links (using little black and white rectangles instead of characters).

### Start directly with a study link

If you toogle the Study Link(s) button to 'Open Directly' the generated link will start the study run directly without any intermediate steps like the Study Entry page. The study link has the format `https://my.jatos.server/publix/study-code`, e.g. `https://cortex.jatos.org/publix/GwtCkuCY4bM`. This is fast for the participant but has the disadvantage that if they click the study link accidentally, at least if it is a single-use link (Personal Single or General Single), it will be invalidated and the participant is not allowed to run the study again (not without handing them a new study link).


### Study link + Study Entry page for confirmation

If you toggle the Study Link(s) button to 'Confirm First' the generated link will first show the Study Entry page and only when clicked the '<span class="glyphicon glyphicon-play"></span>' button start the actual study run.

This is how the Study Entry page might look like (you can customize the message):

![Study Entry page screenshot](/img/study_entry_page_1.png)

The study link has the format `https://my.jatos.server/publix/run?code=study-code`, e.g. `https://cortex.jatos.org/publix/run?code=GwtCkuCY4bM`. As you can see it uses the URL query parameter 'code' to pass on the study code.

The advantage of using the Study Entry page is, that participants accidentally clicking on a study link (e.g. in in an email or on Twitter) without the intention of actually running the study (just out of curiousity) will now **not** automatically start the study run but be shown the Study Entry page where they have to press the '<span class="glyphicon glyphicon-play"></span>' button for confirmation. At least single-use links (Personal Single or General Single) can be used only once. Here the study entry page acts as a kind of barrier preventing the invalidation of the link.

#### Customization of the message

By default the message on the Study Entry page is something like 'Press <span class="glyphicon glyphicon-play"></span> to start the experiment'. You might want to change the language or add some more introductory text. You can do this in the study's Study Properties


### Study code + Study Entry page

You can also just hand out the Study Code and let your participants enter it themselves in the Study Entry page. The URL to the Study Run page is `https://my.jatos.server/publix/run`. 

It will show a field where the study code can be entered. And after pressing the '<span class="glyphicon glyphicon-play"></span>' button the study starts:

![Study Entry page screenshot](/img/study_entry_page_3.png)

The advantage of using the Study Entry page with the study codes is similar to a [Study link + Study Entry page for confirmation](Run-your-Study-with-Study-Links.html#study-link--study-entry-page-for-confirmation): the participant cannot accidentally start a study run. Additionally a study code is easier to deliver orally than a study link, e.g. per phone (it's just 11 digits).


## Batches - How to organize your study links and workers

A batch is a collection of study links and their assoziated workers. Using different batches is useful to organize your study runs, separate their results and vary their setup. E.g. you could separate a pilot run from the "proper" experiment, or you could use different batches for different worker types.

Batches are organized in the Study Links page. Here you can create and delete batches, access each batch's properties and edit its **Batch Session Data** or look through their results.

Each study comes with a "Default" batch (although it can be renamed in its batch properties).

![Study Links page screenshot](/img/v39x/study_links_12.png)

You can **deactivate** or **activate** a batch by clicking on the checkbox button in each batch row. A deactivated batch doesn't allow any study runs.


### Batch Properties

Each batch has properties that can be changed: click on the Batch Properties button in each batch's row.

![Study Links page screenshot](/img/v39x/study_links_13.png)

* For each batch, you can limit the maximum number of workers that will ever be able to run a study in this batch by setting the **Maximum total workers**.

* Additionally you can switch on or off study link types in the **Allowed types**. Unchecked types are not allowed to run a study. This has the same effect as de-/activating the type in the batch. Always check before you send out study links that the corresponding types are activated.

* A batch can have a **JSON input** [similar to the one in the study or component properties](Write-your-own-Study-Basics-and-Beyond.html#study-json-input-and-component-json-input). The difference is that this one is only accessible from every study run in this batch.

* The **Group Properties** relate to [group studies](Write-Group-Studies-I-Setup.html#group-settings-in-each-batchs-properties).


### Groups

A batch is also the place where [JATOS groups](Write-Group-Studies-I-Setup.html) are handled. Here you can an get an overview of the Groups that belong to this batch: see what their member workers are or edit the **Group Session Data**.

![Groups table](/img/v39x/groups_view.png)

* **Fixed** this button allows you to _fix_ a group. A fixed group doesn't allow new members to join. It keeps the group as it currently is. It has the same effect as the _jatos.js_' function [`jatos.setGroupFixed`](jatos.js-Reference.html#jatossetgroupfixed) ([more info](Write-Group-Studies-II-JavaScript-and-Messaging.html#fixing-a-group)).
* **Active Workers** are the workers that are currently members in the group
* **Past Workers** the ones that were members at one point in the past
* **Results** shows only the study results that belong to this group
* **Group State** can be START, FINISHED, or FIXED
