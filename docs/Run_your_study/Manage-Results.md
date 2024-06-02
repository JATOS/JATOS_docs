---
title: Manage Results
slug: /Manage-Results.html
sidebar_position: 8
---

## Results Pages

Once you collected data for a study, you can see and manage the results by clicking on one of the *Results* buttons.

![Results Link](/img/v39x/results_link.png)

The image below is an example of a study results page, but there are result pages for components, batches or groups as well. There's quite a lot of information here, so we'll go through each piece.

![Results View screenshot](/img/v39x/results_view_12.png)


## Interacting With The Results Table

### View Result Data

Each study result has an arrow on the left. If you click on it, the result data for this study run will be displayed underneath the row. Since a study can have several components and each component produces its own result data there can be several result data each in its own row (like in the screenshot below). By clicking on _show all_ one can see the whole data if it doesn't fit all in the box.

![Results View screenshot](/img/v39x/results_view_11.png)


### Selecting Results

There is a checkbox on the left side of each row to select/deselect a specific result. You can also use the buttons on the bar above to select/deselect all results in the table. Additionally you can select only the filtered ones or only the visible ones.

![Results View screenshot](/img/v39x/results_view_13.png)


### Filter Results & Filter Builder

The filter lets you search all all fields in the results table (the metadata). 

![Results View screenshot](/img/v39x/results_view_14.png)

If you type, for example, "Personal Single" in the *Filter* field, only the results ran by a Personal Single worker will appear on the table. You can then click on *Filtered* to select them and export only those results that you're interested in. 

For more eloborate filtering you can use Regular Expressions. Click on *RegEx* to activate this.

By default filtering in case insensitive but you can turn on case sensitive filtering by clicking on *Aa*.

Sometimes the simple filter is not precise enough or you want to combine multiple filters: For those cases the _Filter Builder_ offers complex criteria with logical conjunctions ('and', 'or'). It's also possible to filter for certain dates.

![Results View screenshot](/img/v39x/results_view_15.png)


## Export Results

![Results View screenshot](/img/v39x/results_view_16.png)

Once you selected the results you're interested in, click *Export Results*. You can choose what you want to export: everything in a JATOS Results Archive, only the result metadata, only the result data, or only the files. If in doubt which one to choose, get the JATOS Result Archive - it contains everything.


### Export a JATOS Results Archive (JRZIP)

![Results View screenshot](/img/v39x/results_view_17.png)

Since version 3.8.1 this is the standard export format. It **aggregates result data, result files and result metadata** in one ZIP archive file with a _.jrzip_ file extension ([more information about JRZIP](JATOS-Results-Archive-JRZIP.html)).


### Export Result Data

![Results View screenshot](/img/v39x/results_view_18.png)

The result data are the genuine data that got submitted during study runs without any metadata or result files. You can choose between ***ZIP*** or ***Plain Text*** format. In the _ZIP_ format the result data are stored in a file system structure with folders for study results and component results, similar to the _JRZIP_ format. The _Plain Text_ format is familiar from previous JATOS version: all result data are put together in one text file with one result per line.


### Export Result Files

![Results View screenshot](/img/v39x/results_view_19.png)

The result files are the files that were uploaded during study runs. They are exported as an ZIP archive with a file system structure that represents the study results and their component results. 


### Export Result Metadata

![Results View screenshot](/img/v39x/results_view_20.png)

The metadata are mostly the data that you see in the result table but that do not belong to the actual result data or files, e.g. worker ID or start time. You can choose between ***JSON*** and ***CSV*** format. 


## Delete Results

![Results View screenshot](/img/v39x/results_view_21.png)

You can click *Delete* to remove the selected results. That includes result data, result files and metadata. Keep in mind **there's no undo function for this**. 


## Table Columns and Customization

You can show and hide the columns displayed in the table with the drop-down menu under the *Customize* button.

![Results View screenshot](/img/v39x/results_view_22.png)

* **Result ID** - An identifier assigned by JATOS to each study result. A study result is actually a set of component results, each of them with their own (different) *Component Result ID*. 
* **UUID** - universally unique identifier - similar to Result ID but this ID is unique over different JATOS installations
* **Study Code** - The study code that was used to start this study run
* **Start Time** - Time at which the first component of the study was started. 
* **End Time** - Time at which the last component of the study was finished. 
* **Last Seen** - Each component running in a worker's browser sends a "heartbeat" regularly back to JATOS. Last Seen is the time of the last heartbeat received. The heartbeat stops either when the study is finished or when the browser tab is closed. The default period of the heartbeat is 2 minutes but you can change it through a [_jatos.js_ function](jatos.js-Reference.html#jatossetheartbeatperiod).
* **Duration** - Simply the time difference between the start and end time.
* **Batch** - Name of the batch the worker belongs to.
* **Worker ID** - Assigned by JATOS. Each worker has its own Worker ID. JATOS' admin user will always have Worker ID 1. You can click on a Worker ID to see all the worker's results. 
* **Worker Type** - Displays the [Worker type](Worker-Types.html) that ran the study. 
* **MTurk Worker ID** - Only applies to studies run by MTurk workers. An identifier given by Amazon Mechanical Turk's, not by JATOS.
* **MTurk Confirmation Code** - Only applies to studies run by MTurk workers. The Confirmation Code is generated by JATOS and given to the worker as proof of his work.
* **Group ID** - Only available for group studies. It identifies the group.
* **Files** - Indicates result file upload
* **Data Size** - (Component Results only) - Size of the result data as it is stored in the database
* **Files (Size)** - (Component Results only) - List of the uploaded result files with their size in brackets
* **State**
    
  Possible states for _study results_ are: 
  * PRE - [Preview of study](Restricting-study-flow.html#preview-links) (exists only in PersonalSingleWorker and GeneralSingleWorker)
  * STARTED - Study started
  * DATA_RETRIEVED - The very beginning of the study. It means the first component of the study was loaded in the worker's browser and started running. (It literally means the browser asked for the initialization data.)
  * FINISHED - Study finished. All result data and files that were sent by the study in the browser were safely stored in JATOS.
  * ABORTED - Study aborted by worker and all result data and files were deleted.
  * FAIL - Something went wrong, study stopped and cannot continue

  Possible states for _component results_ are:
  * STARTED - Component started
  * DATA_RETRIEVED -  The very beginning of the component. It means the component was loaded in the worker's browser and started running. (It literally means the browser asked for the initialization data.)
  * FINISHED - Component finished. All result data and files that were sent by the study in the browser were safely stored in JATOS.
  * RELOADED - Component was reloaded (usually by clicking the browser's reload button)
  * ABORTED - This component's study was aborted by worker and all result data and files were deleted.
  * FAIL - Something went wrong, the study stopped and cannot continue

* **Messages** - A message that can be set together with [`jatos.endStudy`](jatos.js-Reference.html#jatosendstudy) or [`jatos.abortStudy`](jatos.js-Reference.html#jatosabortstudy).
