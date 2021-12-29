---
title: Run an experiment with JATOS - Workflow
slug: /Run-an-experiment-with-JATOS-Workflow.html
sidebar_position: 6
---

## Workflow: What JATOS does

When you start working with studies online, it can be hard to see what exactly JATOS does. This page, explaining the general workflow, might help to clarify things. Follow the links on each section for more details.

![general workflow](/img/generalWorkflow.png)

## Step 1: Create/edit HTML, JS, and CSS files (Prepare your study) 

We recommend that you always start to work on a new study in a *local* installation of JATOS. That means, [download and run JATOS on your local computer](Installation.html#easy-installation-on-your-local-computer). 
The main advantage of this is that you have easy access to all your HTML files and assets and can move them around, delete, and replace without any fuss. 

Learn more about [creating and editing HTML/JS code](Create-a-new-study.html)

## Step 2: Deploy files to a server (Make your study available in the Internet)

Once your study scripts are complete and bug-free, you need to make them available through the Internet. For that you will need, of course, [a server](Bring-your-JATOS-online.html).

If you have a server already, you will need to take your ready-to-run study from your local installation and deploy it to the server. In order to do this:
1. On your *local* JATOS installation, where your study is, click on the study you want to export on the left sidebar. 
1. On the Study bar, click Export. A pop-up window will appear. Save the .jzip file wherever you like on your computer.  
1. On your *server* installation, simply click Import. 

Done. 

There are a few important details in [deploying your study to a server](Deploy-to-a-server-installation.html)

## Step 3: Collect data
Read about [Study Links](Run-your-Study-with-Study-Links.html) to create links that you can distribute to your participants. You can do this in many different ways, decide which kind of [worker types](Worker-Types.html) you need. You can (but don't have to) use [MTurk](Connect-to-Mechanical-Turk.html) or [Prolific](Use-Prolific.html) to get participants.

## Step 4: Download and analyze data
One of JATOS' features is that you can manage the results stored in the database without having to type SQL commands in a terminal. Instead, just do this [using the GUI](Manage-Results.html).

You'll download a .csv or JSON-formatted text file (depending on how you wrote your JavaScript). We always recommend JSON format because it's more flexible and robust, and use [JSONlab](https://de.mathworks.com/matlabcentral/fileexchange/33381-jsonlab-a-toolbox-to-encode-decode-json-files) to read the data into Matlab and the [rjson](https://cran.r-project.org/web/packages/rjson/index.html) package for R.

With this, you can import your JSON data into Matlab or R; or a .csv into Excel, JAGS or SPSS. From here on, you know the drill. 

