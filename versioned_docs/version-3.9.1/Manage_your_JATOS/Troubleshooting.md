---
title: Troubleshooting
slug: /Troubleshooting.html
sidebar_position: 4
---

### JATOS Test Page

JATOS comes with built-in tests (e.g., WebSocket connections and database connection), but they are only accessible to users with admin rights. Go to _Administration_ ⇒ _Tests_ and check that all tests are 'OK'.

### Downloading or Exporting a Study Fails (e.g., in Safari Browsers)

By default, Safari (and some other browsers) automatically unzips every archive file after downloading it. When you export a study, JATOS zips your study together (study properties, all components, and all files like HTML, JavaScript, images) and delivers it to your browser, which should save it on your local computer. Safari's default unzipping interferes with this. Follow [these instructions](https://discussions.apple.com/thread/1958374?start=0&tstart=0) to prevent Safari's automatic unzip.

### Reading Log Files in the Browser

In a perfect world, JATOS always works smoothly and, when it doesn't, it describes the problem in an error message. Unfortunately, we aren't in a perfect world: every now and then something will go wrong and you might not get any clear error messages, or no message at all. In these (rare) cases, you can look into JATOS' log files (not to be confused with the [study log](Study-Log.html)) to try to find what the problem might be. You can view and download all log files in the _Administration_ page ⇒ _Logs_ (for security reasons, you must be logged in as a user with admin rights).

* _application.log_ – All JATOS logging
* _loader.log_ – Logging during startup with loader
* _update.log_ – Logging during updates

Alternatively, you can read the log files directly on the server. You'll find your logs in `jatos_directory/logs/`.

### A File (Library, Image, etc.) Included in the HTML Fails to Load?

A common mistake Windows users make is using the wrong file path separator. Any URL or file path in an HTML or JS file should only use `/` as a file path separator—even on Windows systems. So it should always be, for example, `<script src="subfolder/myscript.js"></script>` and **not** `<script src="subfolder\myscript.js"></script>`.

### Database Is Corrupted?

If you get an error that reads something like:  
`Error in custom provider, Configuration error: Configuration error[Cannot connect to database [default]]`,  
your database might be corrupted. By default, JATOS comes with an H2 database, and the H2 database doesn't handle [copying its files while running](http://stackoverflow.com/questions/2036117/how-to-back-up-the-embedded-h2-database-engine-while-it-is-running) very well.

There are two common reasons for this: you moved your JATOS folder while it was running, or you installed JATOS in a synced folder. To prevent this, always be careful with the following:

1. **Don't copy or move while JATOS is running** – Always **stop JATOS** before moving it.
2. **Don't sync while JATOS is running** – As mentioned in the [Installation page](Installation.html), you can run JATOS from pretty much anywhere **except** from a folder that syncs across devices, like Dropbox or Google Drive. Doing so might lead to database corruption, because while the files might be synced between computers, the running processes aren't. This can lead to havoc and destruction and, in extreme cases, to the implosion of the known Universe. You can find in our [blog post](http://blog.jatos.org/Database_Recovery/) a description of an attempt to recover a corrupted database. (It didn't work.)

**Of course, this brings us to an important point: back up your result data (i.e., simply download and save your text files) regularly if you're running a study!**
