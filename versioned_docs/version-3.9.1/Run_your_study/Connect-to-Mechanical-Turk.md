---
title: Use MTurk
slug: /Connect-to-Mechanical-Turk.html
sidebar_position: 5
---

Integrating your JATOS study with MTurk is straightforward, though it requires a bit of clicking.

It's always a good practice to test your setup in the [MTurk Sandbox](https://requester.mturk.com/developer/sandbox) before launching your study to real workers.

-----

### What You'll Need

  * A requester MTurk account.
  * Your study running on a [JATOS server](Bring-your-JATOS-online.html).
  * A description of the study (this can be the same as the one you used within JATOS).

-----

### On JATOS' Side

In JATOS, navigate to your study's page and click on the **Study Links** button. Then, open the batch you intend to run.

![JATOS GUI screenshot](/img/v39x/study_links_mturk.png)

1.  Remember to **enable the MTurk type**.
2.  Click on **Source Code**. A box will appear displaying HTML code, similar to the one shown here. You will need to copy and paste this code into the MTurk interface.

![JATOS GUI screenshot](/img/v39x/study_links_mturk_source_code.png)

-----

### On MTurk's Page

You'll first need to create a project within the MTurk interface:

1.  Sign into your [MTurk requester account](https://requester.mturk.com/signin_options) (or [requester sandbox account](https://requestersandbox.mturk.com/signin_options)).

2.  Navigate to **Create** ⟶ **New Project** ⟶ **Survey Link** ⟶ **Create Project**. Alternatively, you can directly click this [link for requester](https://requester.mturk.com/create/projects/new) (or this [link for requester sandbox](https://requestersandbox.mturk.com/create/projects/new)).

3.  Complete the **Enter Properties** tab.

4.  Click on the **Design layout** button at the bottom of the page.

5.  Click on the **Source** button. You'll see some text in an editable window, which corresponds to an HTML file. **Delete the entire text** in this field.

    ![MTurk Schreenshot](/img/MTurk-source-editor.png)
6.  Now, **paste the source code you obtained from JATOS** into this text field. This HTML code is ready to use out-of-the-box, so no changes are necessary (though you can modify it if you wish).

7.  To exit the editing mode, click the **Source** button again and continue setting up your study in MTurk.

    ![MTurk Schreenshot](/img/MTurk-source-editor-done.png)

-----

### What Should Happen

When an MTurk worker finishs a study, they will see a **confirmation code** like the one shown here.

![Confirmation code](/img/MTurk-confirmation-code_371.png)

-----

### How to Check Confirmation Codes

To assign payment to individual workers, simply compare the confirmation codes stored in JATOS' results page with those recorded in MTurk. To view the confirmation codes in your JATOS results page, you might need to add the column to your table: as shown in the image, go to **Customize** and select **MTurk Confirmation Code**.

![Results of Mturk workers](/img/v39x/mturk-results.png)
