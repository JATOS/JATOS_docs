---
title: Manage Results
slug: /Manage-Results.html
sidebar_position: 8
---
import Hl from '@site/src/components/Highlight';

## Results Pages

Once you collected data for a study, you can see and manage the results by clicking on one of the <Hl>Results</Hl> buttons.

![Results Link](/img/ResultsLink_371.png)

The image below is an example of a study results page, but there are result pages for components, batches or groups as well. There's quite a lot of information here, so we'll go through each piece.

![Results View screenshot](/img/ResultsView-Screenshot1.png)


## Interacting With The Results Table

### View Result Data

Each study result has an arrow on the left. If you click on it, the result data for this study run will be displayed underneath the row. Since a study can have several components and each component produces its own result data there can be several result data each in its own row (like in the screenshot below). By clicking on <Hl>show all</Hl> one can see the whole data if it doesn't fit all in the box.

![Results View screenshot](/img/ResultsView-Screenshot3.png)


### Selecting Results

There is a **checkbox** on the left side of each row to select/deselect a specific result. You can also use the buttons on the bar above to select/deselect all results in the table. Additionally you can select only the filtered ones or only the visible ones.

![Results View screenshot](/img/ResultsView-Screenshot2.png)


### Filter Results & Filter Builder

The filter lets you search all all fields in the results table (the metadata). 

![Results View screenshot](/img/ResultsView-Screenshot4.png)

If you type, for example, <Hl>Personal Single</Hl> in the <Hl>Filter</Hl> field, only the results ran by a Personal Single worker will appear on the table. You can then click on <Hl>Filtered</Hl> to select them and export only those results that you're interested in. 

For more eloborate filtering you can use Regular Expressions. Click on <Hl>RegEx</Hl> to activate this.

By default filtering in case insensitive but you can turn on case sensitive filtering by clicking on <Hl>Aa</Hl>.

Sometimes the simple filter is not precise enough or you want to combine multiple filters: For those cases the <Hl>Filter Builder</Hl> offers complex criteria with logical conjunctions (**'and'**, **'or'**). It's also possible to filter for certain dates.

![Results View screenshot](/img/ResultsView-Screenshot10.png)


## Export

### Export Result Data

Once you selected the results you're interested in, click <Hl>Export Results</Hl> and *Selected* and you will download a text file that contains your results. Each line in this text file represents result data from one component. Alternatively you can also select <Hl>All</Hl> to get all result data.

![Results View screenshot](/img/ResultsView-Screenshot6.png)

### Export Result Files

Here you can download the result files that were uploaded during study runs. You can download single files by just clicking on them. Or similar to exporting result data select the lines you are interested in and download them with <Hl>Export Files</Hl> and <Hl>Selected</Hl>. Alternatively you can also select <Hl>All</Hl> to get all files.

![Results View screenshot](/img/ResultsView-Screenshot5.png)

### Export Metadata 

Sometimes one is also interested in the metadata, that is what's in the actual table fields (<Hl>Result ID</Hl>, <Hl>Start Time</Hl> , <Hl>Last Seen</Hl>, ...). For this click on <Hl>Export Metadata</Hl> and the metadata of the selected results will be downloaded in CSV format.

![Results View screenshot](/img/ResultsView-Screenshot7.png)


## Delete Results

You can click <Hl>Delete</Hl> to remove all or only some selected results (result data + result files + metadata). Keep in mind **there's no undo function for this**. 

![Results View screenshot](/img/ResultsView-Screenshot8.png)


## Table Columns

You can show and hide the columns displayed in the table with the drop-down menu under the <Hl>Customize</Hl> button.

![Results View screenshot](/img/ResultsView-Screenshot9.png)

* **<Hl>Result ID</Hl>** - An identifier assigned by JATOS to each study result. A study result is actually a set of component results, each of them with their own (different) <Hl>Component Result ID</Hl>. 
* **<Hl>UUID</Hl>** - universally unique identifier - similar to Result ID but this ID is unique over different JATOS installations
* **<Hl>Study Code</Hl>** - The study code that was used to start this study run
* **<Hl>Start Time</Hl>** - Time (set at the server's time zone) at which the first component of the study was started. 
* **<Hl>End Time</Hl>** - Time (set at the server's time zone) at which the last component of the study was finished. 
* **<Hl>Last Seen</Hl>** - Each component running in a worker's browser sends a "heartbeat" regularly back to JATOS. Last Seen is the time of the last heartbeat received. The heartbeat stops either when the study is finished or when the browser tab is closed. The default period of the heartbeat is 2 minutes but you can change it through a [_jatos.js_ function](jatos.js-Reference.html#jatossetheartbeatperiod).
* **<Hl>Duration</Hl>** - Simply the time difference between the start and end time.
* **<Hl>Batch</Hl>** - Name of the batch the worker belongs to.
* **<Hl>Worker ID</Hl>** - Assigned by JATOS. Each worker has its own Worker ID. JATOS' admin user will always have Worker ID 1. You can click on a Worker ID to see all the worker's results. 
* **<Hl>Worker Type</Hl>** - Displays the [Worker type](Worker-Types.html) that ran the study. 
* **<Hl>MTurk Worker ID</Hl>** - Only applies to studies run by MTurk workers. An identifier given by Amazon Mechanical Turk's, not by JATOS.
* **<Hl>MTurk Confirmation Code</Hl>** - Only applies to studies run by MTurk workers. The Confirmation Code is generated by JATOS and given to the worker as proof of his work.
* **<Hl>Group ID</Hl>** - Only available for group studies. It identifies the group.
* **<Hl>Files</Hl>** - Indicates result file upload
* **<Hl>Data Size</Hl>** - (Component Results only) - Size of the result data as it is stored in the database
* **<Hl>Files (Size)</Hl>** - (Component Results only) - List of the uploaded result files with their size in brackets
* **<Hl>State</Hl>**
    
  Possible states for <Hl>study results</Hl> are: 
  * **PRE** - [Preview of study](Restricting-study-flow.html#preview-links) (exists only in PersonalSingleWorker and GeneralSingleWorker)
  * **STARTED** - Study started
  * **DATA_RETRIEVED** - The very beginning of the study. It means the first component of the study was loaded in the worker's browser and started running. (It literally means the browser asked for the initialization data.)
  * **FINISHED** - Study finished. All result data and files that were sent by the study in the browser were safely stored in JATOS.
  * **ABORTED** - Study aborted by worker and all result data and files were deleted.
  * **FAIL** - Something went wrong, study stopped and cannot continue

  Possible states for <Hl>component results</Hl> are:
  * **STARTED** - Component started
  * **DATA_RETRIEVED** -  The very beginning of the component. It means the component was loaded in the worker's browser and started running. (It literally means the browser asked for the initialization data.)
  * **FINISHED** - Component finished. All result data and files that were sent by the study in the browser were safely stored in JATOS.
  * **RELOADED** - Component was reloaded (usually by clicking the browser's reload button)
  * **ABORTED** - This component's study was aborted by worker and all result data and files were deleted.
  * **FAIL** - Something went wrong, the study stopped and cannot continue

* **Messages** - A message that can be set together with [`jatos.endStudy`](jatos.js-Reference.html#jatosendstudy) or [`jatos.abortStudy`](jatos.js-Reference.html#jatosabortstudy).
