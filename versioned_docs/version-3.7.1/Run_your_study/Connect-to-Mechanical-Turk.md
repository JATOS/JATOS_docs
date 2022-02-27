---
title: Use MTurk
slug: /Connect-to-Mechanical-Turk.html
sidebar_position: 5
---
import Hl from '@site/src/components/Highlight';

Use your JATOS study with <Hl>Mturk</Hl> is easy, although a fair amount of clicking is required.

A good idea is always to try it yourself first in [<Hl>MTurk Sandbox</Hl>](https://requester.mturk.com/developer/sandbox) before you let real workers do it.

### You will need

* A requester Mturk account
* Your study running on a [JATOS server](Bring-your-JATOS-online.html)
* A description of the study (this can be the same as the one you included in the study description within JATOS)


### On JATOS' side

In JATOS, go to your study's page and click on the <Hl>Study Links</Hl> button and open the batch you want to run.

![JATOS GUI screenshot](/img/study_links_mturk.png)

1. Don't forget to enable the <Hl>MTurk type</Hl>

1. Click on <Hl>Source Code</Hl>. You'll see a box with HTML code, similar to the one shown here. You will have to copy and paste the code from here to the MTurk interface.

![JATOS GUI screenshot](/img/study_links_mturk_source_code.png)


### On MTurk's page

You first have to create a project in the <Hl>MTurk</Hl> interface:

1. Sign into your [MTurk requester account](https://requester.mturk.com/signin_options) (or [requester sandbox account](https://requestersandbox.mturk.com/signin_options))

1. <Hl>Create</Hl> ⟶ <Hl>New Project</Hl> ⟶ <Hl>Survey Link</Hl> ⟶ <Hl>Create Project</Hl> - or just click this [link for requester](https://requester.mturk.com/create/projects/new) (or this [link for requester sandbox](https://requestersandbox.mturk.com/create/projects/new))

1. Complete the <Hl>Enter Properties</Hl> tab

1. Click on the <Hl>Design layout</Hl> button in the bottom of the page. 

1. Click on the <Hl>Source</Hl> button. You'll see some text in an editable window, corresponding to an HTML file. Delete the entire text in this field.

   ![MTurk Schreenshot](/img/MTurk-source-editor.png)   

1. Now paste the source code that you got from JATOS into this text field. This HTML code works out-of-the-box and you don't have to change anything (but you can if you want).
 
1. To exit the editing mode, click on the <Hl>Source</Hl> button again and continue setting up your study in <Hl>MTurk</Hl>.
 
   ![MTurk Schreenshot](/img/MTurk-source-editor-done.png)


### What should happen

When an <Hl>MTurk worker</Hl> finishes a study they'll see a confirmation code like this one.

![Confirmation code](/img/MTurk-confirmation-code_371.png)

### How to check the confirmation codes

To assign payment to individual workers, just compare the confirmation codes stored in JATOS' results page to those stored in MTurk. To see the confirmation codes in your results page you might have to add the column to your table: Like in the image, go to <Hl>Customize</Hl> and choose <Hl>MTurk Confirmation Code</Hl>. 

![Results of Mturk workers](/img/mturk-results.png)

