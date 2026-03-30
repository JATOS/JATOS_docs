---
title: Run your study with study links
slug: /Run-your-Study-with-Study-Links.html
sidebar_position: 2
---

## Study Links

The **Study Links** page in JATOS is where you generate and manage study links for your participants (also called workers in JATOS). Here, you can also organize participants into batches and handle their results.

To access the Study Links page, click the **Study Links** button on your study's main page:

![Study Links Button screenshot](/img/v39x/study_links_1.png)

Initially, every study has a single default batch, which can be renamed and more batches can be added. Each batch can contain study links of different types, such as Personal Single, Personal Multiple, etc.

![Study Links page screenshot](/img/v39x/study_links_2.png)

-----

## Study Links – How to Let Participants Run Your Study

While you typically run your study with the "Run" button during development, you'll use Study Links to distribute your study to participants (or "workers", as they're called in JATOS).

JATOS offers various **study link types**, each corresponding to a worker type with distinct properties. You can find detailed explanations on the [Worker Types](Worker-Types.html) page.

![Study Links page screenshot](/img/v39x/study_links_3.png)

Click the arrow icon (`▼`) to the left of the batch row to expand the study link types if they're not already visible.

![Study Links page screenshot](/img/v39x/study_links_7.png)

You can activate or deactivate a study link type using the switch on the left of each row (highlighted in red). Deactivated types cannot be used to start a study. Always ensure the corresponding types are activated before distributing study links.

### Personal Type Links: Personal Single or Personal Multiple

![Study Links page screenshot](/img/v39x/study_links_4.png)

Personal type links are either "Single" (can be used once) or "Multiple" (can be used many times). While more details are available on the [Worker Types](Worker-Types.html) page, the main idea is that these links are intended for individual workers (hence, *Personal*).

After clicking the **Study Links** button, a new window will appear where you can add and manage study links of this type.

![Study Links page screenshot](/img/v39x/study_links_11.png)

1.  This button quickly adds a single study link without a comment, acting as a shortcut.
2.  This allows you to add multiple study links at once and include a comment for each. The comment is purely for your own reference to help distinguish your study links. Use the Amount value to add Personal type study links in bulk.
3.  This is the **study code**. You can [provide this to your workers](Run-your-Study-with-Study-Links.html#study-code--study-entry-page).
4.  This is your actual **study link**. A toggle button allows you to choose between two options:
    * '**Open Directly**': [Starts the study immediately](Run-your-Study-with-Study-Links.html#start-directly-with-a-study-link).
    * '**Confirm First**': [Requires the worker to confirm with a button press before starting](Run-your-Study-with-Study-Links.html#study-link--study-entry-page-for-confirmation).
    
    Use the <FAIcon icon="fa-regular fa-clipboard" /> button to copy the link to the clipboard, or the <span class="glyphicon glyphicon-qrcode"></span> button to get the QR code.
5.  Use this switch to activate or deactivate a single study link. A deactivated link cannot be used to start a new study run (but an already started study run can continue).
6.  Use these buttons to **filter** the study links. You can show **All**, only the **Active** or **Deactivated** ones, or only links that were already **Used**.

![Study Links page screenshot](/img/v39x/study_links_14.png)

Tip: Use QR codes to make your study easier to access with mobile phones. You can copy and paste the QR code image into an email, or print it out and post it on a bulletin board.

### General Type Links: General Single or General Multiple

![Study Links page screenshot](/img/v39x/study_links_5.png)

General type links can be either "Single" (used once) or "Multiple" (used many times). They are intended for situations where many workers receive the same link (hence, General). More details are available on the [Worker Types](Worker-Types.html) page, but the main concept is that all workers (or at least many) receive the same link (hence, *General*). A General Single link can be used once, while a General Multiple link can be used many times.

Due to the nature of these types, there is only one study link per type. Click the **Study Link** button to retrieve it.

![Study Links page screenshot](/img/v39x/study_links_15.png)

As with Personal links, you can toggle between two link types
* '**Open Directly**': [Starts the study immediately](Run-your-Study-with-Study-Links.html#start-directly-with-a-study-link).
* '**Confirm First**': [Requires the worker to confirm with a button press before starting](Run-your-Study-with-Study-Links.html#study-link--study-entry-page-for-confirmation).
    
Use the <FAIcon icon="fa-regular fa-clipboard" /> button to copy the link to the clipboard, or the <span class="glyphicon glyphicon-qrcode"></span> button to get the QR code.

### MTurk Type Links

![Study Links page screenshot](/img/v39x/study_links_6.png)

Information on how to connect to MTurk and add study links is described on its own page: [Connect to Mechanical Turk](Connect-to-Mechanical-Turk.html).

-----

## Study Entry Page

A study run in JATOS can be initiated in a few different ways:

1.  [Start directly with a study link](Run-your-Study-with-Study-Links.html#start-directly-with-a-study-link)
2.  [Study link + Study Entry page for confirmation](Run-your-Study-with-Study-Links.html#study-link--study-entry-page-for-confirmation)
3.  [Study code + Study Entry page](Run-your-Study-with-Study-Links.html#study-code--study-entry-page)

QR codes are just another visual representation of these links, using black and white patterns instead of characters.

### Start Directly with a Study Link

When you set the Study Link(s) button to 'Open Directly,' the generated link will start the study run immediately, bypassing any intermediate steps like the Study Entry page. The link format is https://my.jatos.server/publix/study-code (e.g., https://cortex.jatos.org/publix/GwtCkuCY4bM).

While this offers a quick start for participants, it has a drawback: if they accidentally click a single-use link (Personal Single or General Single), it will be invalidated, meaning the participant cannot run the study again without a new link.

### Study Link + Study Entry Page for Confirmation

If you toggle the Study Link(s) button to 'Confirm First,' the generated link will first display the Study Entry page. The actual study run only begins when the participant clicks the '<span class="glyphicon glyphicon-play"></span>' button.

This is how the Study Entry page might look (you can customize the message):

![Study Entry page screenshot](/img/study_entry_page_1.png)

The study link format is https://my.jatos.server/publix/run?code=study-code (e.g., https://cortex.jatos.org/publix/run?code=GwtCkuCY4bM). As you can see, it uses the URL query parameter 'code' to pass the study code.

The advantage of using the Study Entry page for confirmation is that participants who accidentally click a study link (e.g., in an email or on X/Twitter) won't automatically start the study. Instead, they'll see the Study Entry page, where they must confirm their intent by pressing the '<span class="glyphicon glyphicon-play"></span>' button. This acts as a barrier, preventing accidental invalidation of single-use links (Personal Single or General Single).

#### Customization of the Message

By default, the Study Entry page displays a message like 'Press <span class="glyphicon glyphicon-play"></span> to start the experiment.'. You can change the language or add more introductory text by customizing the message in your study's **Study Properties**. However, please note that this field is intended for a short message only (up to 1000 characters, depending on your language). If you want to display more elaborate introductory text, you can [add a introduction component](Write-your-own-Study-Basics-and-Beyond.html#add-a-component) before your actual experiment component.

### Study Code + Study Entry Page

You can also simply provide the Study Code and let your participants enter it themselves on the Study Entry page. The URL for the Study Run page is `https://my.jatos.server/publix/run`.

This will display a field where the study code can be entered. After pressing the '<span class="glyphicon glyphicon-play"></span>' button, the study begins:

![Study Entry page screenshot](/img/study_entry_page_3.png)

Using the Study Entry page with study codes offers similar benefits as a [Study link + Study Entry page for confirmation](Run-your-Study-with-Study-Links.html#study-link--study-entry-page-for-confirmation): the participant cannot accidentally start a study run. Additionally, a study code is easier to communicate orally than a full study link (e.g., over the phone, as it's just 11 characters).

-----

## Batches – How to Organize Your Study Links and Workers

A **batch** is a collection of study links and their associated workers. Using different batches helps organize your study runs, separate their results, and vary their setup. For example, you could use separate batches for a pilot run and the main experiment, or for different worker types.

Batches are managed on the Study Links page. Here, you can add and delete batches, access each batch's properties, edit its **Batch Session Data**, or review its results.

Each study comes with a "Default" batch (which can be renamed in its batch properties).

![Study Links page screenshot](/img/v39x/study_links_12.png)

You can **activate or deactivate** a batch by clicking the switch in each batch row. A deactivated batch will prevent any new study runs from starting.

### Batch Properties

Each batch has properties that can be modified. Click the **Batch Properties** button in each batch's row.

![Study Links page screenshot](/img/v39x/study_links_13.png)

  * For each batch, you can limit the maximum number of workers who will ever be able to run a study in this batch by setting the **Maximum total workers**.

  * Additionally, you can enable or disable study link types in the **Allowed types** section. Unchecked types are not permitted to start a study. This has the same effect as activating/deactivating the type within the batch. Always ensure your intended link types are active before sending out links.

  * A batch can have **batch input**, [similar to the input found in study or component properties](Write-your-own-Study-Basics-and-Beyond.html#studycomponentbatch-input). The key difference is that batch input is only accessible from study runs belonging to this specific batch.

  * The **Group Properties** relate to [group studies](Write-Group-Studies-I-Setup.html#group-settings-in-each-batchs-properties).

### Groups

A batch is also where [JATOS groups](Write-Group-Studies-I-Setup.html) are managed. Here, you can get an overview of the groups belonging to this batch: view their member workers or edit the **Group Session Data**.

![Groups table](/img/v39x/groups_view.png)

  * **Fixed**: This button allows you to "fix" a group, preventing new members from joining and preserving its current composition. This has the same effect as the jatos.js function [`jatos.setGroupFixed`](jatos.js-Reference.html#jatossetgroupfixed) ([more info](Write-Group-Studies-II-JavaScript-and-Messaging.html#fixing-a-group)).
  * **Active workers:** These are the workers that are currently members of the group.
  * **Past workers:** These are workers who were members at some point in the past.
  * **Results:** This shows only the study results that belong to this particular group.
  * **Group state:** Possible states can be START, FINISHED, or FIXED.