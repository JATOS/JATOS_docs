---
title: Run an experiment with JATOS - Workflow
slug: /Run-an-experiment-with-JATOS-Workflow.html
sidebar_position: 6
---

## Workflow: Understanding JATOS' Role in Your Experiment

Understanding JATOS' specific functions can be challenging when you first start running online studies. This page outlines the general workflow, aiming to clarify JATOS' role at each stage. For more detailed information, follow the links in each section.

![general workflow](/img/generalWorkflow.png)

-----

## Step 1: Prepare Your Study (Create/Edit HTML, JS, and CSS Files)

We recommend beginning new studies in a **local JATOS installation**. This involves [downloading and running JATOS on your local computer](Installation.html). The primary advantage of this approach is easy access to all your HTML files and assets, allowing for straightforward management, including moving, deleting, and replacing files.

Learn more about [creating and editing HTML/JS code](Create-a-new-study.html).

-----

## Step 2: Make Your Study Available Online (Deploy Files to a Server)

Once your study scripts are complete and bug-free, you'll need to make them accessible via the internet. This step requires [a server](Bring-your-JATOS-online.html).

If you already have a server, transfer your ready-to-run study from your local installation to the server. Here's how:

1.  On your **local JATOS installation**, navigate to the study you want to export. Click **Export** on the study page. The study will be saved as a [`.jzip` file](JATOS-Study-Archive-JZIP.html) on your computer.
2.  On your **JATOS server installation**, open the **Studies** sidebar, click the **+** button, and then select **Import Study**. Choose the `.jzip` file you saved in the previous step.

Your study is now deployed.

For more important details, refer to [deploying your study to a server installation](Deploy-to-a-server-installation.html).

-----

## Step 3: Collect Data

To gather data, you'll use [Study Links](Run-your-Study-with-Study-Links.html), which you can distribute to participants. JATOS supports various methods for this, allowing you to choose the appropriate [worker types](Worker-Types.html) for your needs. You have the option to use platforms like [MTurk](Connect-to-Mechanical-Turk.html) or [Prolific](Use-Prolific.html) for participant recruitment.

-----

## Step 4: Download and Analyze Data

JATOS allows you to manage results stored in its database directly through the **GUI**, which means no need for SQL commands. You can access these features [using the GUI](https://www.google.com/search?q=Manage-Results.html).

While JATOS' result data format isn't fixed, you'll typically use either **CSV** or **JSON** (or JSON Lines). We generally recommend the **JSON format** because it offers greater flexibility and robustness. For example, you can use the [rjson](https://cran.r-project.org/web/packages/rjson/index.html) package for R.

This flexibility allows you to import your JSON data into tools like R, or your CSV data into applications such as Excel, JAGS, or SPSS. From there, you can proceed with your standard data analysis procedures.
