---
title: Troubleshooting
slug: /Troubleshooting.html
sidebar_position: 4
---
import Hl from '@site/src/components/Highlight';

### JATOS test page

JATOS comes with build in tests (e.g. WebSockets connections and database connection), but they are only accessible for users with admin rights: go to <Hl>Administration</Hl> ⇒ <Hl>Tests</Hl> and check that all tests are 'OK'.


### Downloading a study / exporting a study fails (e.g. in Safari browsers)

As a default, Safari (and some other browsers) automatically unzips every archive file after downloading it. When you export a study, JATOS zips your study together (study properties, all components, and all files like HTML, JavaScripts, images) and delivers it to your browser, who should save it in your local computer. Safari's default unzipping interferes with this. Follow [these instructions](https://discussions.apple.com/thread/1958374?start=0&tstart=0) to prevent Safari's automatic unzip.


### Read log files in the browser

In a perfect world, JATOS always works smoothly and, when it doesn't, it describes the problem in an error message. Unfortunately we aren't in a perfect world: every now and then something will go wrong and you might not get any clear error messages, or no message at all. In these (rare) cases, you can look into JATOS' log files (not to be confused with the [<Hl>study log</Hl>](Study-Log.html)) to try to find what the problem might be. You can see and download all log files in the <Hl>Administration</Hl> page => <Hl>Logs</Hl> (for security reasons, you must be logged in as a user with admin rights). 

* <Hl>application.log</Hl> - all JATOS logging
* <Hl>loader.log</Hl> - logging during startup with loader
* <Hl>update.log</Hl> - logging during updates

Alternatively you can read the log files directly on the server. You'll find your logs in `jatos_directory/logs/`.


### A file (library, image, ...) included in the HTML fails to load?

There is a common mistake Windows users make that might prevent files from loading: Any URL or file path in a HTML or JS file should only use <Hl>/</Hl> as a file path separator - even on Windows systems. So it should always be e.g. `<script src="subfolder/myscript.js"></script>` and **not** `<script src="subfolder\myscript.js"></script>`.


### Database is corrupted?

If you get an error that reads something like: `Error in custom provider, Configuration error: Configuration error[Cannot connect to database [default]]`, your database might be corrupted. By default JATOS comes with an H2 database and the H2 database doesn't handle [copying its files while running](http://stackoverflow.com/questions/2036117/how-to-back-up-the-embedded-h2-database-engine-while-it-is-running) too well. 

There are two reasons why this might be the case: you moved your JATOS folder while it was running or you installed JATOS in a synced folder. To prevent this, be sure to always be careful with the following:

1. **Don't copy or move while JATOS is running** - Always **stop JATOS** (type `./loader.sh stop` in your Linux / Mac OS terminal or close the window on Windows) before moving it.  
1. **Don't sync while JATOS is running** - As we mentioned in the [<Hl>Installation page</Hl>](Installation.html), you can run JATOS from pretty much anywhere **except** from a folder that syncs across devices, like Dropbox or Google Drive. Doing so might lead to database corruption, because while the files might be synced between computers, the running processes aren't. This will lead to havoc and destruction and, in extreme cases, to the implosion of the known Universe. You can find in our [<Hl>blog post</Hl>](http://blog.jatos.org/Database_Recovery/) a description of an attempt to recover a corrupted database. Didn't work.

**Of course, this brings us to an important point: back up your result data (i.e., simply download and save your text files) regularly if you're running a study!**


