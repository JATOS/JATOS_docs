---
title: jatos.js Reference
slug: /jatos.js-Reference.html
sidebar_position: 1
---

## Introduction

***jatos.js*** is a JavaScript library that helps you to communicate from your component's JavaScript with your JATOS server. Below, we list and describe its variables and functions.

Always load ***jatos.js*** in the `<head>` section with the following line:

```html
<script src="jatos.js"></script>
```

All ***jatos.js*** variables and functions start with `jatos.`. For example, to get the study's ID, you use `jatos.studyId`.

Most ***jatos.js*** variables and functions only work after ***jatos.js*** is initialized (i.e., after `jatos.onLoad()` is used).

And, please, if you find a mistake or have a question, don't hesitate to [contact us](Contact-us.html).

-----

## ID variables

All those IDs are generated and stored by JATOS. ***jatos.js*** automatically sets these variables with the corresponding values if you included the `jatos.onLoad()` callback function at the beginning of your JavaScript.

There's a convenient function that adds most of these IDs to a given object. See function `jatos.addJatosIds(obj)` below.

### `jatos.studyId`

ID of the study which is currently running. All the study properties are associated with this ID.

### `jatos.componentId`

ID of the component which is currently running. All the component properties are associated with this ID.

### `jatos.batchId`

ID of the batch this study run belongs to. All batch properties are associated with this ID.

### `jatos.workerId`

Each worker who is running a study has an ID.

### `jatos.studyCode`

The study code that was used to start this study run.

### `jatos.studyResultId`

This ID is individual for every study run. A study result contains data belonging to the run in general (e.g. Study Session).

### `jatos.componentResultId`

This ID is individual for every component in a study run. A component result contains data of the run belonging to the specific component (e.g., result data).

### `jatos.groupMemberId`

see [Group Variables](#group-variables)

### `jatos.groupResultId`

see [Group Variables](#group-variables)

-----

## Study variables

### `jatos.studyProperties`

All the properties (except the study input data) you entered for this study

  * `jatos.studyProperties.title` - Study's title
  * `jatos.studyProperties.uuid` - Study's UUID
  * `jatos.studyProperties.description` - Study's description
  * `jatos.studyProperties.descriptionHash` - Hash of study's description
  * `jatos.studyProperties.locked` - Whether the study is locked or not
  * `jatos.studyProperties.dirName` - Study's dir name in the file system of your JATOS installation
  * `jatos.studyProperties.groupStudy` - Whether this is a group study or not

### `jatos.studyInput` and `jatos.studyJsonInput`

Since version 3.9.7, `jatos.studyInput` is the prefered way to get the study input and `jatos.studyJsonInput` is deprecated. Apart from that both contain the study input data you entered in the study properties. They are `{}` if the field was left empty.

### `jatos.studyLength`

Number of component this study has

-----

## Component variables

### `jatos.componentProperties`

All the properties (except the component input data) you entered for this component

  * `jatos.componentProperties.title` - Component's title
  * `jatos.componentProperties.uuid` - Component's UUID
  * `jatos.componentProperties.htmlFilePath` - Path to Component's HTML file in your JATOS installation
  * `jatos.componentProperties.reloadable` - Whether it's reloadable

### `jatos.componentInput` and `jatos.componentJsonInput`

Since version 3.9.7, `jatos.componentInput` is the prefered way to get the component input and `jatos.componentJsonInput` is deprecated. Apart from that both contain the component input data you entered in the component properties. They are `{}` if the field was left empty.

The component input data you entered in the component properties. This is `{}` if the field was left empty.

### `jatos.componentList`

An array of all components of this study with basic information about each component. For each component it has the `title`, `id`, whether it is `active`, and whether it is `reloadable`.

### `jatos.componentPos`

Position of this component within the study starting with 1 (like shown in the GUI)

-----

## Other variables

### `jatos.version`

Current version of the ***jatos.js*** library

-----

### `jatos.urlQueryParameters`

Original query string parameters of the URL that starts the study. It is provided as a JavaScript object; the value is `{}` if no query string parameters are present. This might be useful to pass on information from outside of JATOS into a study run, e.g., if you want to pass on information like gender and age. However, if you know the information beforehand, it's easier to put them in the study/component input (in the study/component properties). Another example is MTurk, which passes on its worker's ID via a URL query parameter.

**Examples**

1.  One has this study link:

    ```
    http://localhost:9000/publix/uXU9eYJpWdg
    ```

    Now one could add parameters to the URL's query string to pass on external information into the study run. E.g., the following URL would add the parameters 'foo' with the value 'bar' and 'a' with the value '123':

    ```
    http://localhost:9000/publix/uXU9eYJpWdg?foo=bar&a=123
    ```

    Then those parameter will be accessible during the study run as `jatos.urlQueryParameters.a` and `jatos.urlQueryParameters.foo`.

2.  MTurk uses for its worker ID the URL query parameter 'workerId' and this is accessible via `jatos.urlQueryParameters.workerId`.

-----

### `jatos.studySessionData`

The session data variable can be accessed and modified by every component of a study. It's a very convenient way to share data between different components. Whatever is written in this variable will be available in the subsequent components. However, remember that the session data will be deleted after the study is finished (see also [Session Data - Three Types](Session-Data-Three-Types.html)).

-----

### `jatos.channelSendingTimeoutTime`

Time in ms to wait for an answer after sending a message via a channel (batch or group). Set this variable if you want to change the default value (default is 10 s).

**Example**

```javascript
jatos.channelSendingTimeoutTime = 20000; // Sets channel timeout to 20 seconds
```

-----

### `jatos.channelHeartbeatInterval`

Waiting time in ms between channel (group or batch) heartbeats (default is 25 s)

**Example**

```javascript
jatos.channelHeartbeatInterval = 10000; // Sets interval to 10 seconds
```

-----

### `jatos.channelHeartbeatTimeoutTime`

Waiting time in ms for JATOS server's answer to a channel heartbeat (default is 10 s)

**Example**

```javascript
jatos.channelHeartbeatTimeoutTime = 20000; // Sets interval to 20 seconds
```

-----

### `jatos.channelClosedCheckInterval`

Waiting time in ms between checking if channels (group or batch) are closed unexpectedly (default is 2 s)

**Example**

```javascript
jatos.channelClosedCheckInterval = 4000; // Sets interval to 4 seconds
```

-----

### `jatos.channelOpeningBackoffTimeMin`

Min waiting time (in ms) between channel reopening attempts (default is 1s for min and 2 min for max). ***jatos.js*** uses an _exponential back-off_ retry pattern for the channels.

**Example**

```javascript
jatos.channelOpeningBackoffTimeMin = 2000; // Sets interval to 2 seconds
```

-----

### `jatos.channelOpeningBackoffTimeMax`

Max waiting time (in ms) between channel reopening attempts (default is 1s for min and 2 min for max). ***jatos.js*** uses an _exponential back-off_ retry pattern for the channels.

**Example**

```javascript
jatos.channelOpeningBackoffTimeMax = 60000; // Sets interval to 1 minute
```

-----

### `jatos.httpTimeout`

Time in ms to wait for an answer of an HTTP request by ***jatos.js***. Set this variable if you want to change the default value (default is 1 min).

**Example**

```javascript
jatos.httpTimeout = 30000; // Sets HTTP timeout to 30 seconds
```

-----

### `jatos.httpRetry`

Some jatos functions (e.g., `jatos.sendResultData`) send a request to the JATOS server. If this request was not successful (e.g., network problems) ***jatos.js*** retries it. With this variable one can change the number of retries. The default is 5.

**Example**

```javascript
jatos.httpRetry = 2; // Attempts 2 retries of failed requests
```

-----

### `jatos.httpRetryWait`

Same as `jatos.httpRetry` but this variable defines the waiting time between the retries. The default is 1000 ms.

**Example**

```javascript
jatos.httpRetryWait = 5000; // Sets retry waiting time to 5 seconds
```

-----

### `jatos.waitSendDataOverlayConfig`

Config of the overlay that is shown when the component ended but there are still data to be sent. See function jatos.showOverlay for config options. By default the text is "Sending data. Please wait." with an image of a spinning wheel.

**Example**

```javascript
jatos.waitSendDataOverlayConfig = { text: "Enviando datos. Espere." };
```

-----

## General ***jatos.js*** Functions

### `jatos.onLoad`

Defines a callback function that ***jatos.js*** will call when it's finished initializing.

* `@param {function} callback` - Function to be called after ***jatos.js***' initialization is done.

**Example**

```javascript
jatos.onLoad(function() {
  // Start your code here that uses jatos.js' variables and functions
});
```

-----

### `jatos.addAbortButton`

Adds a button to the document that, when pressed, calls `jatos.abortStudy` (which cancels the study run and deletes all result data and files). By default, this button is in the bottom-right corner, but this and other properties can be configured.

  * `@param {object} [config]` - Configuration object.
      * `@param {string} [text]` - Button text (Default: 'Cancel').
      * `@param {boolean} [confirm]` - Should the worker be asked for confirmation? (Default: `true`).
      * `@param {string} [confirmText]` - Confirmation text (Default: 'Do you really want to cancel this study?').
      * `@param {string} [tooltip]` - Tooltip text (Default: 'Cancels this study and deletes all already submitted data').
      * `@param {string} [msg]` - Message to be sent back to JATOS to be logged (Default: 'Worker decided to abort').
      * `@param {string} [style]` - Additional CSS styles.
      * `@param {function} [action]` - Which function should be called in the end. Default is `jatos.abortStudy`.

**Examples**

1.  Adds the default cancel button.

    ```javascript
    jatos.addAbortButton();
    ```

2.  Adds a cancel button and changes some properties.

    ```javascript
    jatos.addAbortButton({
      text: "Quit",
      confirmText: "Do you really want to quit?",
      tooltip: "Don't you dare clicking here!",
      msg: "This worker aborted the mission.",
      style: "color:green"
    });
    ```

3.  Adds a cancel button and changes the position to the bottom-left.

    ```javascript
    jatos.addAbortButton({
      style: "left:1em; right:unset"
    });
    ```

4.  Adds a cancel button and changes the position to the top-right.

    ```javascript
    jatos.addAbortButton({
      style: "top:1em; bottom:unset"
    });
    ```

5.  Adds a cancel button and calls 'myFunction' if pressed.

    ```javascript
    jatos.addAbortButton({
      action: myFunction
    });
    ```

-----

### `jatos.showBeforeUnloadWarning`

Convenience function that adds or cancels a warning popup that will be shown by the browser to the worker who attempts to reload the page or close the browser tab. By default, this is turned on for components that are not 'reloadable'. Modern browsers do not allow changing the message of this popup. This works only if at least one user action happened in the window, e.g., a mouse click (https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload\_event).

  * `@param {boolean} show` - If `true`, the warning will be shown; if `false`, a previously added warning will be canceled.

**Example**

Adds a warning popup:

```javascript
jatos.showBeforeUnloadWarning(true);
```

-----

### `jatos.showOverlay`

Convenience function that shows text and an image in the center of the screen. By default, the text is 'Please wait.' and the image is a spinning wheel.

  * `@param {object} [config]` - Configuration object.
      * `@param {string} [text]` - Text to be shown. Default is "Please wait".
      * `@param {string} [imgUrl]` - URL of the image. Default is a spinning wheel.
      * `@param {boolean} [showImg]` - If `true`, the image is shown; otherwise not. Default is `true`.
      * `@param {string} [style]` - Additional CSS styles.

**Examples**

1.  Shows the default overlay with 'Please wait.' and a spinning wheel.

    ```javascript
    jatos.showOverlay();
    ```

2.  Shows text only.

    ```javascript
    jatos.showOverlay({
      text: "Please have a coffee break for 5 minutes",
      showImg: false
    });
    ```

3.  Shows text and a custom image.

    ```javascript
    jatos.showOverlay({
      text: "Please have a coffee break for 5 minutes",
      imgUrl: "http://url-to-my-coffee-picture",
      style: "color:brown"
    });
    ```

-----

### `jatos.removeOverlay`

Removes an overlay that was added by `jatos.showOverlay`.

**Example**

```javascript
jatos.removeOverlay();
```

-----

### `jatos.onError`

**DEPRECATED** - Use the specific function's error callback or Promise function instead.

Defines a callback function that is to be called in case ***jatos.js*** produces an error.

  * `@param {function} callback` - Function to be called in case of an error.

**Example**

Show the error message in an alert box:

```javascript
jatos.onError(alert);
```

-----

### `jatos.log`

Sends a message to be logged back to the JATOS server, where it will be recorded in JATOS' log file.

  * `@param {string} logMsg` - The message to be logged.

**Example**

```javascript
jatos.log("Log this message in JATOS' log file");
```

-----

### `jatos.catchAndLogErrors`

Convenience function that sends all 'error' and 'unhandledrejection' events and `console.error` and `console.warn` calls to [JATOS' server log](Troubleshooting.html#read-log-file-in-the-browser). This is useful for debugging.

**Example**

```javascript
jatos.catchAndLogErrors();
```

-----

### `jatos.addJatosIds`

Convenience function that adds some [IDs](jatos.js-Reference.html#ids) (study code, study ID, study title, batch ID, batch title, component ID, component position, component title, worker ID, study result ID, component result ID, group result ID, group member ID) to the given object.

  * `@param {object} obj` - Object to which the IDs will be added.

**Example**

```javascript
var resultData = {};
jatos.addJatosIds(resultData);
```

-----

### `jatos.setHeartbeatPeriod`

Every running component regularly sends an HTTP request (the heartbeat) back to the JATOS server. This signals that it is still running. As soon as the browser tab running the component is closed, the heartbeat ceases. The time of the last heartbeat is visible in the GUI, on the study results page in the 'Last Seen' row. This way, you can easily see if a worker is still running your study or if (and when) they abandoned it. By default, the heartbeat period is 2 minutes. Be careful not to set the period too low (a few seconds or even milliseconds) since it might overload your network or your JATOS server.

  * `@param {number} heartbeatPeriod` - Time period between two heartbeats in milliseconds.

**Example**

```javascript
jatos.setHeartbeatPeriod(60000); // Sets to a heartbeat every minute
```

-----

### `jatos.setStudySessionData`

**If you want to just write into the study session, this function is not what you need.** If you want to write something into the study session, just write into the [`jatos.studySessionData`](jatos.js-Reference.html#studys-session-data) object.

Posts Study Session data to the JATOS server. This function sets the study session data and **sends it to the JATOS server for safe storage**. This is done automatically whenever a component finishes. But sometimes it is necessary to trigger this manually, e.g., in a very long-running component, one might want to store the session data intermediately. It offers callbacks, either as parameters or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the transfer.

  * `@param {object} sessionData` - Object to be submitted.
  * `@param {function} [onSuccess]` - Function to be called after this function finishes successfully.
  * `@param {function} [onFail]` - Function to be called if this function fails.
  * `@return {Promise}`

**Example**

```javascript
var studySessionData = { "a": 123, "b": 789, "c": 100};
jatos.setStudySessionData(studySessionData);
```

-----

### `jatos.onConnected`

Defines a callback function that ***jatos.js*** will call when it establishes a connection to the JATOS server.

  * `@param {function} callback` - Function to be called after ***jatos.js*** establishes a connection to the JATOS server.

**Example**

```javascript
jatos.onConnected(function() {
  // Your code
});
```

-----

### `jatos.onDisconnected`

Defines a callback function that ***jatos.js*** will call when it loses connection to the JATOS server.

  * `@param {function} callback` - Function to be called after ***jatos.js*** loses connection to the JATOS server.

**Example**

```javascript
jatos.onDisconnected(function() {
  // Your code
});
```

-----

### `jatos.isConnected`

Returns `true` if ***jatos.js*** currently has a connection to the JATOS server; `false` otherwise.

```javascript
jatos.isConnected();
```

-----

## Functions to Control Study Flow

### `jatos.startComponent`

Finishes the currently running component and starts the component with the given ID or UUID. Though often it's better to use `jatos.startComponentByPos` instead, because it keeps working even after an export/import of the study into another JATOS. You can additionally send result data back to the JATOS server.

There are two versions: with or without a message.

1.  Without message:

      * `@param {number|string} componentIdOrUuid` - ID or UUID of the component to start.
      * `@param {object|string} [resultData]` - String or object that will be sent as result data. An object will be serialized to JSON (stringify).
      * `@param {function} [onError]` - Callback function if failed.

2.  With message:

      * `@param {number|string} componentIdOrUuid` - ID or UUID of the component to start.
      * `@param {object|string} [resultData]` - String or object that will be sent as result data. An object will be serialized to JSON (stringify).
      * `@param {string} [message]` - Message that should be logged (max 255 chars).
      * `@param {function} [onError]` - Callback function if failed.

**Examples**

1.  Jump to component with ID 23.

    ```javascript
    jatos.startComponent(23);
    ```

2.  Jump to component by using its UUID.

    ```javascript
    jatos.startComponent("3d277289-754b-4fd6-aa76-c8404deda02e");
    ```

3.  Send result data and jump to another component.

    ```javascript
    var resultData = "my important result data";
    jatos.startComponent(23, resultData);
    ```

4.  Send result data, jump to another component, and send a message back that will be visible in JATOS result pages and log.

    ```javascript
    var resultData = "my important result data";
    jatos.startComponent(23, resultData, "everything okay");
    ```

-----

### `jatos.startComponentByPos`

Finishes the currently running component and starts the component with the given position. The component position is the count of the component within the study as shown in the study overview page (1st component has position 1, 2nd component position 2, ...). You can additionally send result data back to the JATOS server.

There are two versions: with or without a message.

1.  Without message:

      * `@param {number} componentPos` - Position of the component to start.
      * `@param {object|string} [resultData]` - String or object that will be sent as result data. An object will be serialized to JSON (stringify).
      * `@param {function} [onError]` - Callback function if failed.

2.  With message:

      * `@param {number} componentPos` - Position of the component to start.
      * `@param {object|string} [resultData]` - String or object that will be sent as result data. An object will be serialized to JSON (stringify).
      * `@param {string} [message]` - Message that should be logged (max 255 chars).
      * `@param {function} [onError]` - Callback function if failed.

**Examples**

1.  Jump to component in position 3.

    ```javascript
    jatos.startComponentByPos(3);
    ```

2.  Send result data and jump to component with position 3.

    ```javascript
    var resultData = "my important result data";
    jatos.startComponentByPos(3, resultData);
    ```

3.  Send result data, jump to component in position 3, and send a message back that will be visible in JATOS result pages and log.

    ```javascript
    var resultData = "my important result data";
    jatos.startComponentByPos(3, resultData, "everything okay");
    ```

-----

### `jatos.startComponentByTitle`

(Needs JATOS version \>= 3.7.5) - Finishes the currently running component and starts the component with the given title. If there is more than one component with this title, it starts the first one. You can additionally send result data back to the JATOS server.

There are two versions: with or without a message.

1.  Without message:

      * `@param {string} title` - Title of the component to start.
      * `@param {object|string} [resultData]` - String or object that will be sent as result data. An object will be serialized to JSON (stringify).
      * `@param {function} [onError]` - Callback function if failed.

2.  With message:

      * `@param {string} title` - Title of the component to start.
      * `@param {object|string} [resultData]` - String or object that will be sent as result data. An object will be serialized to JSON (stringify).
      * `@param {string} [message]` - Message that should be logged (max 255 chars).
      * `@param {function} [onError]` - Callback function if failed.

**Examples**

1.  Jump to component with title "Some title".

    ```javascript
    jatos.startComponentByTitle("Some title");
    ```

2.  Send result data and jump to component with title "Some title".

    ```javascript
    var resultData = "my important result data";
    jatos.startComponentByTitle("Some title", resultData);
    ```

3.  Send result data, jump to component with title "Some title", and send a message back that will be visible in JATOS result pages and log.

    ```javascript
    var resultData = "my important result data";
    jatos.startComponentByTitle("Some title", resultData, "everything okay");
    ```

-----

### `jatos.startNextComponent`

Finishes the currently running component and starts the next component in this study. The next component is the one with position + 1. The component position is the count of the component within the study, as shown on the study overview page (1st component has position 1, 2nd component position 2, and so on). You can additionally send result data back to the JATOS server.

There are two versions: with or without a message.

1.  Without message:

    * `@param {object|string} [resultData]` - String or object that will be sent as result data. An object will be serialized to JSON (stringify).
    * `@param {function} [onError]` - Callback function if it fails.

2.  With message:

    * `@param {object|string} [resultData]` - String or object that will be sent as result data. An object will be serialized to JSON (stringify).
    * `@param {string} [message]` - Message that should be logged (max 255 chars).
    * `@param {function} [onError]` - Callback function if it fails.

**Examples**

1.  Jump to the next component.

    ```javascript
    jatos.startNextComponent();
    ```

2.  Send result data and jump to the next component.

    ```javascript
    var resultData = "my important result data";
    jatos.startNextComponent(resultData);
    ```

3.  Send result data, jump to the next component, and send a message back that will be visible in JATOS result pages and log.

    ```javascript
    var resultData = "my important result data";
    jatos.startNextComponent(resultData, "everything okay");
    ```

-----

### `jatos.startLastComponent`

Finishes the current component and starts the last component of this study. If the last component is inactive, it starts the component with the highest active position. The component position is the count of the component within the study, as shown on the study overview page (1st component has position 1, 2nd component position 2, and so on). You can additionally send result data back to the JATOS server.

There are two versions: with or without a message.

1.  Without message:

    * `@param {object|string} [resultData]` - String or object that will be sent as result data. An object will be serialized to JSON (stringify).
    * `@param {function} [onError]` - Callback function if it fails.

2.  With message:

    * `@param {object|string} [resultData]` - String or object that will be sent as result data. An object will be serialized to JSON (stringify).
    * `@param {string} [message]` - Message that should be logged (max 255 chars).
    * `@param {function} [onError]` - Callback function if it fails.

**Examples**

1.  Jump to the last component.

    ```javascript
    jatos.startLastComponent();
    ```

2.  Send result data and jump to the last component.

    ```javascript
    var resultData = "my important result data";
    jatos.startLastComponent(resultData);
    ```

3.  Send result data, jump to the last component, and send a message back that will be visible in JATOS result pages and log.

    ```javascript
    var resultData = "my important result data";
    jatos.startLastComponent(resultData, "everything okay");
    ```

-----

### `jatos.abortStudy`

**Hint**: There is a convenience function `jatos.addAbortButton` that already adds a button to your document, including showing a confirmation box and options to change it to your needs.

Aborts the study. All previously submitted result data will be deleted. Optionally, it redirects afterwards to the end page. Data stored in the Batch Session or Group Session are unaffected by this.

* `@param {string} [message]` - Message that will be stored together with the study results and is accessible via JATOS' GUI result pages. The message can be a maximum of 255 characters long.
* `@param {boolean} [showEndPage]` - If `true`, it will redirect to an end page after the study is finished. If `false`, it stays on the current page. Alternatively, `jatos.abortStudyAndRedirect` can be used to redirect to another page. Default is `true`.

**Examples**

1.  Just abort the study.

    ```javascript
    jatos.abortStudy();
    ```

2.  Additionally send a message.

    ```javascript
    jatos.abortStudy("participant aborted by pressing abort button");
    ```

-----

### `jatos.abortStudyAjax`

Since 3.9.7, it was renamed to `jatos.abortStudyWithoutRedirect`, but the old one is kept for backward compatibility. Use `jatos.abortStudyWithoutRedirect` instead.

-----

### `jatos.abortStudyWithoutRedirect`

**Hint**: There is a convenience function `jatos.addAbortButton` that already adds a button to your document, including showing a confirmation box and options to change it to your needs.

Aborts the study and all previously submitted result data will be deleted. Data stored in the Batch Session or Group Session are unaffected by this. It offers callbacks, either as parameters or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the ending.

* `@param {string} [message]` - Message that should be logged.
* `@param {function} [onSuccess]` - Function to be called after this function finishes successfully.
* `@param {function} [onError]` - Function to be called in case of error.
* `@return {Promise}`

**Examples**

1.  Just abort the study.

    ```javascript
    jatos.abortStudyWithoutRedirect();
    ```

2.  Abort study with a message that will be sent back to JATOS and shown on the result page and put in the log.

    ```javascript
    jatos.abortStudyWithoutRedirect("Worker clicked Cancel button");
    ```

-----

### `jatos.abortStudyAndRedirect`

Since version 3.9.7 - Aborts the study and redirects to the given URL. This is useful if you have your own abort page. All previously submitted data will be deleted. Data stored in the Batch Session or Group Session are unaffected by this. It offers callbacks to signal success or failure in the ending.

* `@param {string} url` - URL of the page to be redirected to after the study run was aborted.
* `@param {string} [message]` - Message that should be logged.
* `@param {function} [onSuccess]` - Function to be called after this function finishes successfully.
* `@param {function} [onError]` - Function to be called in case of error.
* `@return {Promise}`

**Examples**

1.  Abort study and redirect afterwards.

    ```javascript
    jatos.abortStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD");
    ```

2.  Abort study, send a message back that will be visible in JATOS result pages and log, and redirect afterwards.

    ```javascript
    jatos.abortStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD", "Participant decided to cancel");
    ```

-----

### `jatos.endStudy`

Ends the study and optionally redirects the participant to the study's end page afterwards.

There are two versions: with and without result data.

1.  With result data:
    * `@param {string|object} [resultData]` - Result data to be sent back to the JATOS server.
    * `@param {boolean} [successful]` - `true` if the study should finish successfully, `false` otherwise. Default is `true`.
    * `@param {string} [message]` - Message that will be stored together with the study results and is accessible via JATOS' GUI result pages. The message can be a maximum of 255 characters long.
    * `@param {boolean} [showEndPage]` - If `true`, it will redirect to an end page (either the JATOS default one or the one that is configured in the study properties) after the study is finished. If `false`, it stays on the current page. Alternatively, `jatos.endStudyAndRedirect` can be used. Default is `true`.

2.  Without result data:
    * `@param {boolean} [successful]` - `true` if the study should finish successfully, `false` otherwise. Default is `true`.
    * `@param {string} [message]` - Message that will be stored together with the study results and is accessible via JATOS' GUI result pages. The message can be a maximum of 255 characters long.
    * `@param {boolean} [showEndPage]` - If `true`, it will redirect to an end page (either the JATOS default one or the one that is configured in the study properties) after the study is finished. If `false`, it stays on the current page. Alternatively, `jatos.endStudyAndRedirect` can be used. Default is `true`.

**Examples**

1.  Just end the study.

    ```javascript
    jatos.endStudy();
    ```

2.  End study and send a message back that will be visible in JATOS result pages and log.

    ```javascript
    jatos.endStudy(true, "everything worked fine");
    ```

3.  Indicate a failure - leads to study result state FAIL.

    ```javascript
    jatos.endStudy(false, "internal JS error");
    ```

4.  Send result data and end study.

    ```javascript
    var resultData = {id: 123, data: "my important result data"};
    jatos.endStudy(resultData);
    ```

5.  Send result data, end study, and send a message back that will be visible in JATOS result pages and log.

    ```javascript
    var resultData = {id: 123, data: "my important result data"};
    jatos.endStudy(resultData, true, "everything worked fine");
    ```

-----

### `jatos.endStudyAndRedirect`

Ends the study and redirects to the given URL. This is useful if you want to let the worker return to a recruitment platform (e.g., Prolific) or have your own end page. The same effect can be achieved with the Study Properties' *End Redirect URL* field. It offers callbacks to signal success or failure in the ending.

**Hint**: There is an '**End Redirect URL**' field in the Study Properties that also specifies the redirect URL. It's easier to use, but not as flexible.

* `@param {string} url` - URL of the page to be redirected to after the study run was successfully finished.
* `@param {boolean} [successful]` - `true` if the study should finish successfully; `false` otherwise. Default is `true`.
* `@param {string} [message]` - Message that will be stored together with the study results and is accessible via JATOS' GUI result pages. The message can be a maximum of 255 characters long.
* `@param {function} [onSuccess]` - Function to be called after this function finishes successfully.
* `@param {function} [onError]` - Function to be called in case of error.
* `@return {Promise}`

**Examples**

1.  End study and redirect afterwards.

    ```javascript
    jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD");
    ```

2.  End study and redirect afterwards. Send result data.

    ```javascript
    var resultData = {id: 123, data: "my important result data"};
    jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD", resultData);
    ```

3.  End study and redirect afterwards. A message will be sent back to JATOS and shown on the result page and put in the log.

    ```javascript
    jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD", true, "everything worked fine");
    ```

4.  End study and indicate a failure and send a message. Does not redirect.

    ```javascript
    jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD", false, "internal JS error");
    ```

-----

### `jatos.endStudyAjax`

Since version 3.9.7, it was renamed to `jatos.endStudyWithoutRedirect`, but the old one is kept for backward compatibility. Use `jatos.endStudyWithoutRedirect` instead.

-----

### `jatos.endStudyWithoutRedirect`

Ends the study and afterwards, the study is not redirected to the JATOS' end page. If the study was run by an MTurk worker, the confirmation code will be in the response. It offers callbacks, either as parameters or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the ending.

* `@param {boolean} [successful]` - `true` if the study should finish successfully; `false` otherwise.
* `@param {string} [message]` - Message that will be stored together with the study results and is accessible via JATOS' GUI result pages. The message can be a maximum of 255 characters long.
* `@param {function} [onSuccess]` - Function to be called after this function finishes successfully.
* `@param {function} [onError]` - Function to be called in case of error.
* `@return {Promise}`

**Examples**

1.  Just end the study.

    ```javascript
    jatos.endStudyWithoutRedirect();
    ```

2.  End study with a message that will be sent back to JATOS and shown on the result page and put in the log.

    ```javascript
    jatos.endStudyWithoutRedirect(true, "everything worked fine");
    ```

3.  Indicate a failure and send a message.

    ```javascript
    jatos.endStudyWithoutRedirect(false, "some error description");
    ```

4.  End study and show the confirmation code to the MTurk worker.

    ```javascript
    jatos.endStudyWithoutRedirect().then((confirmationCode) => {
      // Show the confirmation code to the worker
    });
    ```

5.  Use Promise to submit result data and afterwards, end the study and move to another URL ([see also](jatos.js-Reference.html#jatosendstudyandredirect)).

    ```javascript
    var resultData = {id: 123, data: "my important result data"};
    jatos.submitResultData(resultData)
      .then(jatos.endStudyWithoutRedirect)
      .then(() => { window.location.href = 'http://example.com/index.html' })
      .catch(() => console.log("Something went wrong"));
    ```

6.  Send result data and end study.

    ```javascript
    var resultData = {id: 123, data: "my important result data"};
    jatos.endStudyWithoutRedirect(resultData);
    ```

-----

## Result Data and Result Upload/Download Files

### `jatos.submitResultData`

Posts result data for the currently running component back to the JATOS server. Already stored result data for this component will be **overwritten**. If you want to append result data, use `jatos.appendResultData` instead. Alternatively, you can send result data with functions that jump to another component (e.g., `jatos.startComponent`) or end the study (`jatos.endStudy`). It offers callbacks, either as parameters or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the transfer.

* `@param {object|string} resultData` - String or object that will be sent as result data. An object will be serialized to JSON.
* `@param {function} [onSuccess]` - Function to be called after this function finishes successfully.
* `@param {function} [onError]` - Function to be called in case of error.
* `@return {Promise}`

**Examples**

1.  Send result data back to the JATOS server.

    ```javascript
    var resultData = {"a": 123, "b": 789, "c": 100};
    jatos.submitResultData(resultData);
    ```

2.  It's often used together with `jatos.startNextComponent` to first submit result data back to the JATOS server and afterwards jump to the next component.

    ```javascript
    var resultData = {"a": 123, "b": 789, "c": 100};
    jatos.submitResultData(resultData, jatos.startNextComponent);
    ```

3.  Or together with `jatos.startComponentByPos` to start a particular component (here at position 4).

    ```javascript
    var resultData = {"a": 123, "b": 789, "c": 100};
    jatos.submitResultData(resultData, () => { jatos.startComponentByPos(4) });
    ```

4.  Or by using the returned Promise.

    ```javascript
    var resultData = {"a": 123, "b": 789, "c": 100};
    jatos.submitResultData(resultData)
       .then(() => console.log('success'))
       .catch(() => console.log('error'));
    ```

-----

### `jatos.appendResultData`

Appends result data to the already posted result data. Contrary to `jatos.submitResultData`, it does not overwrite the result data. Alternatively, you can send result data with functions that jump to another component (e.g., `jatos.startComponent`) or end the study (`jatos.endStudy`). It offers callbacks, either as parameters or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the transfer. This function can be used several times during a component run to incrementally save result data.

* `@param {string|object} resultData` - String or object that will be sent as result data. An object will be serialized to JSON (stringify).
* `@param {function} [onSuccess]` - Function to be called after this function finishes successfully.
* `@param {function} [onError]` - Function to be called in case of error.
* `@return {Promise}`

**Examples**

1.  Append result data to the already sent.

    ```javascript
    var resultData = { "a": 123, "b": 789, "c": 100 };
    jatos.appendResultData(resultData);
    ```

2.  Use multiple `jatos.appendResultData` in a row.

    ```javascript
    jatos.appendResultData({"a": 1})
       .then(() => jatos.appendResultData({"b": 2}))
       .then(() => jatos.appendResultData({"c": 3}))
       .catch(() => console.log('Something went wrong'));
    ```

3.  You can use it together with `jatos.startNextComponent` to first append result data and afterwards jump to the next component.

    ```javascript
    var resultData = { "a": 123, "b": 789, "c": 100};
    jatos.appendResultData(resultData, jatos.startNextComponent);
    ```

4.  Or by using the returned Promise.

    ```javascript
    var resultData = {"a": 123, "b": 789, "c": 100};
    jatos.appendResultData(resultData)
       .then(() => jatos.startNextComponent())
       .catch(() => console.log('Something went wrong'));
    ```

5.  Or together with `jatos.startComponentByPos` to start a particular component (here at position 4).

    ```javascript
    var resultData = {"a": 123, "b": 789, "c": 100};
    jatos.appendResultData(resultData)
       .then(() => jatos.startComponentByPos(4))
       .catch(() => console.log('Something went wrong'));
    ```

-----

### `jatos.uploadResultFile`

Uploads a file to the JATOS server, where it is stored in the server's file system (but not in the database). Similar to result data, it can be downloaded in the JATOS UI, in the result pages. Files are stored per component, meaning you can use the same filename without overwriting the file if the upload happens from different components. It offers callbacks, either as a parameter or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the transfer.

* `@param {Blob|string|object} obj` - Data to be uploaded as a file. Can be a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob), a string, or an object. A `Blob` will be uploaded directly. A string is turned into a `Blob`. An object is first turned into a JSON string and then into a `Blob`.
* `@param {string} filename` - Name of the uploaded file.
* `@param {function} [onSuccess]` - Function to be called after this function finishes successfully.
* `@param {function} [onError]` - Function to be called in case of error.
* `@return {Promise}`

**Examples**

1.  Upload text.

    ```javascript
    jatos.uploadResultFile("this is my data", "example.txt")
       .then(() => console.log("File was successfully uploaded"))
       .catch(() => console.log("File upload failed"));
    ```

2.  Upload object as JSON.

    ```javascript
    var resultData = { "a": 123, "b": 789, "c": 100};
    jatos.uploadResultFile(resultData, "example.json")
       .then(() => console.log("File was successfully uploaded"))
       .catch(() => console.log("File upload failed"));
    ```

3.  Upload text as a `Blob`.

    ```javascript
    var blob = new Blob(["Hello, world!"], {type: 'text/plain'});
    jatos.uploadResultFile(blob, "example.txt")
       .then(() => console.log("File was successfully uploaded"))
       .catch(() => console.log("File upload failed"));
    ```

4.  Turn canvas into a `Blob` and upload as an image file. This example assumes you have a canvas element with ID 'canvas'.

    ```javascript
    var canvas = document.getElementById('canvas');
    canvas.toBlob((blob) => {
       jatos.uploadResultFile(blob, "canvas.png")
          .then(() => console.log("File was successfully uploaded"))
          .catch(() => console.log("File upload failed"));
    });
    ```

5.  For more real-world examples, have a look at the ['Drawing' and the 'Video Recording' examples](/Example-Studies).

-----

### `jatos.downloadResultFile`

Downloads a file from the JATOS server. You can only download a file that was previously uploaded with `jatos.uploadResultFile` in the same study run. If the file contains text, it returns the content as a string. If the file contains JSON, it returns the JSON already parsed as an object. All other [MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) are returned as a `Blob`. It offers callbacks, either as a parameter or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the transfer.

* `@param {string} filename` - Name of the uploaded file.
* `@param {function} [onSuccess]` - Function to be called after this function finishes successfully.
* `@param {function} [onError]` - Function to be called in case of error.
* `@return {Promise}`

Additionally, you can specify the component position from where the file was uploaded (in case different components uploaded files with the same filename).

* `@param {number} componentPos` - Position of the component where the file was uploaded.
* `@param {string} filename` - Name of the uploaded file.
* `@param {function} [onSuccess]` - Function to be called after this function finishes successfully.
* `@param {function} [onError]` - Function to be called in case of error.
* `@return {Promise}`

**Examples**

1.  Download text file.

    ```javascript
    jatos.downloadResultFile("example.txt")
       .then((text) => console.log(text))
       .catch(() => console.log("File download failed"));
    ```

2.  Download JSON file.

    ```javascript
    jatos.downloadResultFile("example.json")
       .then((obj) => console.log(JSON.stringify(obj)))
       .catch(() => console.log("File download failed"));
    ```

3.  Download image and display it in a canvas element.

    ```javascript
    jatos.downloadResultFile("canvas.png")
       .then((blob) => { document.getElementById("canvas").src = URL.createObjectURL(blob) })
       .catch(() => console.log("File download failed"));
    ```

4.  Download file and specify that the file was uploaded in the first component.

    ```javascript
    jatos.downloadResultFile(1, "example.txt")
       .then((text) => console.log(text))
       .catch(() => console.log("File download failed"));
    ```

5.  For more real-world examples, have a look at the ['Drawing' and the 'Video Recording' examples](/Example-Studies).

-----

## Batch Variables

### `jatos.batchProperties`

All the properties you entered for this batch.

* `jatos.batchProperties.allowedWorkerTypes` - List of worker types that are currently allowed to run in this batch.
* `jatos.batchProperties.maxActiveMembers` - How many members a group can have at the same time.
* `jatos.batchProperties.maxTotalMembers` - How many members a group is allowed to have at the same time.
* `jatos.batchProperties.maxTotalWorkers` - Total amount of workers a group is allowed to have altogether in this batch.
* `jatos.batchProperties.title` - Title of this batch.

### `jatos.batchInput` and `jatos.batchJsonInput`

Since version 3.9.7, `jatos.batchInput` is the prefered way to get the batch input and `jatos.batchJsonInput` is deprecated. Apart from that both contain the batch input data you entered in the batch properties. They are `{}` if the field was left empty.

-----

## Batch Session Functions

The Batch Session is stored in JATOS' database on the server side (see also [Session Data - Three Types](Session-Data-Three-Types.html)). This means that all changes in the Batch Session have to be synchronized between the client and the server. This is done via the batch channel. Therefore, all writing functions (`add`, `remove`, `clear`, `replace`, `copy`, `move`, `set`, `setAll`) can be paired with callback functions that will signal success or failure in the client-server sync. These callback functions can either be passed as parameters to `jatos.batchSession.[function_name]` or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

On the other hand, for all reading functions (`get`, `find`, `getAll`, `test`), there is no need to sync data between the client and server, because ***jatos.js*** keeps a copy of the Batch Session locally. Therefore, all reading functions do not offer callbacks, as there is no risk of synchronization failure.

Additionally to the reading and writing functions, the callback function `jatos.onBatchSession(callback)` offers a way to get notified whenever the Batch Session changes in the JATOS' database, regardless of the origin of the change. This way, you can have the client of each worker react to changes in the batch that were done by another worker in the batch.

Accessing the Batch Session is done via [JSON Patches (RFC 6902)](https://tools.ietf.org/html/rfc6902) and [JSON Pointer (RFC 6901)](https://tools.ietf.org/html/rfc6901). An introduction can be found under [jsonpatch.com](http://jsonpatch.com/). For JSON Patches, ***jatos.js*** uses the [JSON-Patch](https://github.com/Starcounter-Jack/JSON-Patch) library from Joachim Wester, and for JSON Pointers, the [jsonpointer.js](https://github.com/alexeykuzmin/jsonpointer.js) library from Alexey Kuzmin.

-----

### `jatos.onBatchSession`

Defines a callback function that is called every time the Batch Session changes on the JATOS server side (this includes updates in the session originating from other workers that run the study in parallel).

The callback function has two parameters:
* `@param {string} path` - JSON pointer to the changed field in the Batch Session.
* `@param {string} op` - JSON patch operation ('add', 'remove', 'clear', etc.) that was applied.

**Examples**

1.  Log whenever something changes in the Batch session.

    ```javascript
    jatos.onBatchSession(function(path, op){
      console.log("Batch Session was updated in path " + path + " with operation " + op);
    });
    ```

2.  `onBatchSession` is often used together with `jatos.batchSession.find` to get the updated value.

    ```javascript
    jatos.onBatchSession(function(path){
      var changedObj = jatos.batchSession.find(path);
      console.log("The changed object is " + JSON.stringify(changedObj));
    });
    ```

-----

### `jatos.batchSession.get`

Convenience function: like `jatos.batchSession.find`, but works with a key instead of a JSON Pointer. Therefore, it works only on the first level of the session's object tree. It takes the name of a field within the Batch Session and returns the matching value, or `undefined` if the key does not exist. For all other levels of the object tree, use `jatos.batchSession.find`. It gets the object from the locally stored copy of the session and does not call the server.

* `@param {string} name` - Name of the field.
* `@return {object}` - The value that is stored under the name.

**Examples**

1.  Get the value that belongs to a key in the Batch Session.

    If the Batch Session is `{"a": 1000, "b": "watermelon"}`:

    ```javascript
    // Since the parameter is the key's name and not a path, it does not start with a "/"
    var b = jatos.batchSession.get("b"); // b is "watermelon"
    var c = jatos.batchSession.get("c"); // c is undefined
    ```

2.  With `jatos.batchSession.get`, you can only access the first level of the object tree. If you want another level, use `jatos.batchSession.find`. If the Batch Session is `{"a": {"a1": 123, "a2": "watermelon"}}`:

    ```javascript
    var a1 = jatos.batchSession.get("a1"); // a1 is undefined !!!
    var a = jatos.batchSession.get("a"); // a is { "a1": 123, "a2": "watermelon" }
    ```

-----

### `jatos.batchSession.set`

A convenience function for `jatos.batchSession.add`. Instead of a JSON Pointer path, it accepts a name of the field to be stored (without a slash in front). Therefore, it works only on the first level of the Batch Session's object tree. If the name already exists in the Batch Session, the value will be overwritten.

* `@param {string} name` - Name of the field.
* `@param {object} value` - Value to be stored.
* `@param {function} [onSuccess]` - Function to be called if this patch was successfully applied on the server and the client side.
* `@param {function} [onError]` - Function to be called if this patch failed.
* `@return {Promise}`

**Examples**

1.  Set a key and its value in the Batch Session.

    If the Batch Session is `{"a": 1234}`:

    ```javascript
    // Since the parameter is the key's name and not a path, it does not start with a "/"
    var b = jatos.batchSession.set("b", "koala");
    ```

    Then, after the Batch Session is successfully updated, the new object is `{"a": 1234, "b": "koala"}`.

    Since there is a slight chance that the session update was not successful, it's a good idea to provide callback functions for both cases. To provide success or fail callback functions, you can either specify the `onSuccess`/`onError` parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

2.  Use returned Promise to handle success or failure.

    ```javascript
    jatos.batchSession.set("b", "koala")
       .then(() => console.log("Batch Session was successfully updated"))
       .catch(() => console.log("Batch Session synchronization failed"));
    ```

3.  Have a series of Batch Session changes.

    ```javascript
    jatos.batchSession.set("a", 1)
       .then(() => jatos.batchSession.set("b", 2))
       .then(() => jatos.batchSession.set("c", 3))
       .catch(() => console.log("Batch Session synchronization failed"));
    ```

-----

### `jatos.batchSession.getAll`

Returns the complete Batch Session data. It gets the object from the locally stored copy of the session and does not call the server.

* `@return {object}` - Returns the whole Batch Session object.

**Example**

```javascript
var batchSession = jatos.batchSession.getAll();
```

-----

### `jatos.batchSession.setAll`

Replaces the whole session data. If the replacing object is rather large, it might be better, performance-wise, to replace only individual paths. Each session writing involves sending the changes in the session via a JSON Patch to the JATOS server. If the session is large, this data transfer can take some time. In this case, use other session functions, like `set`, `add`, or `replace`.

  * `@param {object} value` - Value to be stored in the session.
  * `@param {function} [onSuccess]` - Function to be called if this patch was successfully applied on the server and the client side.
  * `@param {function} [onError]` - Function to be called if this patch failed.
  * `@return {Promise}`

**Examples**

1.  Set the whole Batch Session object.

    ```javascript
    var o = {"a": 123, "b": "foo"};
    jatos.batchSession.setAll(o); // Overwrites the current Batch Session with the object o
    ```

    Since there is a slight chance that the session update was not successful, it's a good idea to provide callback functions for both cases. To provide success or fail callback functions, you can either specify the `onSuccess`/`onError` parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

2.  Use returned Promise to handle success or failure.

    ```javascript
    var o = {"a": 123, "b": "foo"};
    jatos.batchSession.setAll(o)
       .then(() => console.log("Batch Session was successfully updated"))
       .catch(() => console.log("Batch Session synchronization failed"));
    ```

-----

### `jatos.batchSession.clear`

Clears the whole Batch Session data and sets it to an empty object `{}`.

  * `@param {function} [onSuccess]` - Function to be called if this patch was successfully applied on the server and the client side.
  * `@param {function} [onError]` - Function to be called if this patch failed.
  * `@return {Promise}`

**Examples**

1.  Clear the whole Batch Session.

    ```javascript
    jatos.batchSession.clear();
    ```

    Since there is a slight chance that the session update was not successful, it's a good idea to provide callback functions for both cases. To provide success or fail callback functions, you can either specify the `onSuccess`/`onError` parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

2.  Use returned Promise to handle success or failure.

    ```javascript
    jatos.batchSession.clear()
       .then(() => console.log("Batch Session was successfully updated"))
       .catch(() => console.log("Batch Session synchronization failed"));
    ```

-----

### `jatos.batchSession.find`

Gets a field in the Batch Session data. It takes a JSON Pointer and returns the matching value, or `undefined` if the pointer does not correspond to an existing field. It gets the object from the locally stored copy of the session and does not call the server. Contrary to `jatos.batchSession.get`, it allows you to get values from all levels of the Batch Session's object tree.

  * `@param {string} path` - JSON pointer path.
  * `@return {object}` - The value that is stored in the path.

**Example**

1.  Find a field in the Batch Session.

    If the Batch Session is `{"a": {"a1": "foo", "a2": "bar"}, "b": 999}`:

    ```javascript
    jatos.batchSession.find("/a/a1"); // returns "foo"
    jatos.batchSession.find("/b");    // returns 999
    jatos.batchSession.find("/c/d");  // returns undefined
    ```

-----

### `jatos.batchSession.defined`

Checks in the Batch Session whether a field under the given path exists. Returns `true` if the field is defined and `false` otherwise. It's equivalent to `!jatos.batchSession.test(path, undefined)`.

  * `@param {string} path` - JSON pointer path to be checked.
  * `@return {boolean}` - `true` if the field is defined, and `false` otherwise.

**Example**

```javascript
jatos.batchSession.defined("/a"); // returns true if the pointer '/a' exists
```

-----

### `jatos.batchSession.test`

JSON Patch test operation: Tests that the specified value is set in the document (see [jsonpatch.com](http://jsonpatch.com/)).

  * `@param {string} path` - JSON pointer path to be tested.
  * `@param {object} value` - Value to be tested.
  * `@return {boolean}`

**Examples**

1.  Test if a certain field in the Batch Session has a value.

    If the Batch Session is `{"a": 123, "b": {"b1": "flowers", "b2": "animals"}}`:

    ```javascript
    jatos.batchSession.test("/a", 123);       // returns true
    jatos.batchSession.test("/a", 10);        // returns false
    jatos.batchSession.test("/b/b1", "flowers"); // returns true
    ```

2.  If you want to know the existence of a path in the Batch Session, you can test against `undefined`. The function `jatos.batchSession.defined` provides a shortcut for this use case.

    ```javascript
    if (!jatos.batchSession.test("/c", undefined)) {
      // Path "/c" exists
    } else {
      // Path "/c" doesn't exist
    }
    ```

-----

### `jatos.batchSession.add`

JSON Patch add operation: Adds a value to an object or inserts it into an array. In the case of an array, the value is inserted before the given index. The `-` character can be used instead of an index to insert at the end of an array (see [jsonpatch.com](http://jsonpatch.com/)). If the path already exists in the Batch Session, the value will be overwritten. The patch will fail if a key other than the last path element is missing, e.g., when the path is `"/a/b/c"`, if `"a"` and `"b"` do not already exist as keys, the patch will fail.

  * `@param {string} path` - JSON pointer path.
  * `@param {object} value` - Value to be stored.
  * `@param {function} [onSuccess]` - Function to be called if this patch was successfully applied on the server and the client side.
  * `@param {function} [onError]` - Function to be called if this patch failed.
  * `@return {Promise}`

**Examples**

1.  Add to an empty Batch Session.

    ```javascript
    jatos.batchSession.add("/a", 100);
    ```

    After the Batch Session is successfully updated, the new object is `{"a": 100}`.

2.  Add to Batch Session.

    If the Batch Session is `{"a": 100}` and one calls:

    ```javascript
    jatos.batchSession.add("/b", 123);
    ```

    Then, after the Batch Session is successfully updated, the new object is `{"a": 100, "b": 123}`.

    Since there is a slight chance that the session update was not successful, it's a good idea to provide callback functions for both cases. To provide success or fail callback functions, you can either specify the `onSuccess`/`onError` parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

3.  Use returned Promise to handle success or fail.

    ```javascript
    jatos.batchSession.add("/b", 123)
       .then(() => console.log("Batch Session was successfully updated"))
       .catch(() => console.log("Batch Session synchronization failed"));
    ```

4.  Add an object:

    ```javascript
    jatos.batchSession.add("/obj", { foo: "bar" })
       .then(() => console.log("Batch Session was successfully updated"))
       .catch(() => console.log("Batch Session synchronization failed"));
    ```

    Afterwards, the Batch Session contains `{"obj": {"foo": "bar"}}`.
    Note that `jatos.batchSession.add("/obj/foo", "bar")` will fail if `"/obj"` does not already point to an object.

5.  Add an array:

    ```javascript
    jatos.batchSession.add("/array", [1, 2, 3])
       .then(() => console.log("Batch Session was successfully updated"))
       .catch(() => console.log("Batch Session synchronization failed"));
    ```

    Afterwards, the Batch Session contains `{"array": [1, 2, 3]}`.

6.  Add an element to an array:

    If the Batch Session is `{"array": [1, 2, 3]}` and one calls:

    ```javascript
    jatos.batchSession.add("/array/2", "new")
       .then(() => console.log("Batch Session was successfully updated"))
       .catch(() => console.log("Batch Session synchronization failed"));
    ```

    Then afterwards, the Batch Session contains `{"array": [1, 2, "new", 3]}`.

7.  Append to the end of an array using `/-`:

    If the Batch Session is `{"array": [1, 2, 3]}` and one calls:

    ```javascript
    jatos.batchSession.add("/array/-", "new")
       .then(() => console.log("Batch Session was successfully updated"))
       .catch(() => console.log("Batch Session synchronization failed"));
    ```

    Then afterwards, the Batch Session contains `{"array": [1, 2, 3, "new"]}`.

8.  Have a series of Batch Session updates.

    ```javascript
    jatos.batchSession.add("/a", 1)
       .then(() => jatos.batchSession.add("/b", 2))
       .then(() => jatos.batchSession.add("/c", 3))
       .catch(() => console.log("Batch Session synchronization failed"));
    ```

-----

### `jatos.batchSession.remove`

JSON Patch remove operation: Removes a value from an object or array (see [jsonpatch.com](http://jsonpatch.com/)).

  * `@param {string} path` - JSON pointer path to the field that should be removed.
  * `@param {function} [onSuccess]` - Function to be called if this patch was successfully applied on the server and the client side.
  * `@param {function} [onError]` - Function to be called if this patch failed.
  * `@return {Promise}`

**Examples**

1.  Remove from the Batch Session.

    If the Batch Session is `{"a": 100, "b": 123}` and one calls:

    ```javascript
    jatos.batchSession.remove("/b");
    ```

    Then, after the Batch Session is successfully updated, the new object is `{"a": 100}`.

    Since there is a slight chance that the session update was not successful, it's a good idea to provide callback functions for both cases. To provide success or fail callback functions, you can either specify the `onSuccess`/`onError` parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

2.  Use returned Promise to handle success or failure.

    ```javascript
    jatos.batchSession.remove("/b")
       .then(() => console.log("Batch Session was successfully updated"))
       .catch(() => console.log("Batch Session synchronization failed"));
    ```

-----

### `jatos.batchSession.replace`

JSON Patch replace operation: Replaces a value. This is equivalent to a 'remove' operation followed by an 'add' operation (see [jsonpatch.com](http://jsonpatch.com/)).

* `@param {string} path` - JSON pointer path.
* `@param {object} value` - Value to replace with.
* `@param {function} [onSuccess]` - Function to be called if this patch is successfully applied on the server and client sides.
* `@param {function} [onError]` - Function to be called if this patch fails.
* `@return {Promise}`

**Examples**

1.  Replace in the Batch Session.

    If the Batch Session is `{"a": 100, "b": 123}` and you call:

    ```javascript
    jatos.batchSession.replace("/b", 789);
    ```

    Then, after the Batch Session is successfully updated, the new object is `{"a": 100, "b": 789}`.

    Since there's a slight chance that the session update won't be successful, it's a good idea to provide callback functions for both cases. To provide success or fail callback functions, you can either specify the `onSuccess`/`onError` parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

2.  Use the returned Promise to handle success or failure.

    ```javascript
    jatos.batchSession.replace("/b", 789)
       .then(() => console.log("Batch Session was successfully updated"))
       .catch(() => console.log("Batch Session synchronization failed"));
    ```

-----

### `jatos.batchSession.copy`

JSON Patch copy operation: Copies a value from one location to another within the JSON document. Both `from` and `path` are JSON Pointers (see [jsonpatch.com](http://jsonpatch.com/)).

* `@param {string} from` - JSON pointer path to the origin.
* `@param {string} path` - JSON pointer path to the target.
* `@param {function} [onSuccess]` - Function to be called if this patch is successfully applied on the server and client sides.
* `@param {function} [onError]` - Function to be called if this patch fails.
* `@return {Promise}`

**Examples**

1.  Copy within the Batch Session from one location to another.

    If the Batch Session is `{"a": "jatos"}` and you call:

    ```javascript
    jatos.batchSession.copy("/a", "/b");
    ```

    Then, after the Batch Session is successfully updated, the new object is `{"a": "jatos", "b": "jatos"}`.

    Since there's a slight chance that the session update won't be successful, it's a good idea to provide callback functions for both cases. To provide success or fail callback functions, you can either specify the `onSuccess`/`onError` parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

2.  Use the returned Promise to handle success or failure.

    ```javascript
    jatos.batchSession.copy("/a", "/b")
       .then(() => console.log("Batch Session was successfully updated"))
       .catch(() => console.log("Batch Session synchronization failed"));
    ```

-----

### `jatos.batchSession.move`

JSON Patch move operation: Moves a value from one location to another. Both `from` and `path` are JSON Pointers (see [jsonpatch.com](http://jsonpatch.com/)).

* `@param {string} from` - JSON pointer path to the origin.
* `@param {string} path` - JSON pointer path to the target.
* `@param {function} [onSuccess]` - Function to be called if this patch is successfully applied on the server and client sides.
* `@param {function} [onError]` - Function to be called if this patch fails.
* `@return {Promise}`

**Examples**

1.  Move within the Batch Session from one location to another.

    If the Batch Session is `{"a": "jatos"}` and you call:

    ```javascript
    jatos.batchSession.move("/a", "/b");
    ```

    Then, after the Batch Session is successfully updated, the new object is `{"b": "jatos"}`.

    Since there's a slight chance that the session update won't be successful, it's a good idea to provide callback functions for both cases. To provide success or fail callback functions, you can either specify the `onSuccess`/`onError` parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

2.  Use the returned Promise to handle success or failure.

    ```javascript
    jatos.batchSession.move("/a", "/b")
       .then(() => console.log("Batch Session was successfully updated"))
       .catch(() => console.log("Batch Session synchronization failed"));
    ```

-----

### `jatos.batchSessionVersioning`

This flag can be used to turn off versioning of the batch session. This speeds up updates to the batch session (patches) in certain cases where all concurrent patches are conflict-free. If versioning is turned on (set to `true`), all session data patches are accompanied by a version. On the JATOS server side, only a patch with the current version (as stored in the database) is applied. If there are multiple concurrent patches, only the first one is applied. If versioning is turned off, all patches arriving at the JATOS server are applied immediately without checking the version. This is faster but can lead to unintended session data changes. By default, versioning is turned on.

**Example**

```javascript
jatos.batchSessionVersioning = false; // Turns off versioning
```

-----

## Group Variables

The group variables are only filled with values if the current study run is a group study.

### `jatos.groupMemberId`

The group member ID is unique for this member (it is actually identical to the study result ID).

### `jatos.groupResultId`

ID of this group result (it's called group result to be consistent with the study result and the component result, though it's often just called "group").

### `jatos.groupMembers`

List of member IDs of the current members of the group.

### `jatos.groupChannels`

List of member IDs of the currently open group channels.

-----

## Group Functions

### `jatos.joinGroup`

Tries to join a group and, if successful, opens the group channel (which is mostly a WebSocket). Only if the group channel is open can you exchange data with other group members. As the only parameter, this function takes an object that consists of several optional callback functions that will be called by ***jatos.js*** when certain group events occur. It returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to signal success or failure in joining.

  * `@param {object} callbacks` - Defines callback functions for group events. All callbacks are optional. These callback functions are:
      * `onOpen`: Is called when the group channel is successfully opened.
      * `onClose`: Is called when the group channel is closed.
      * `onError`: Is called if an error occurs during the opening of the group channel's WebSocket or if an error is received via the group channel (e.g., the Group Session data couldn't be updated). If this function isn't defined, ***jatos.js*** will try to call the global `onJatosError` function.
      * `onMessage(msg)`: Is called if a message from another group member is received. It gets the message as a parameter.
      * `onMemberJoin(memberId)`: Is called when another member (not the worker running this study) joins the group. It gets the group member ID as a parameter.
      * `onMemberOpen(memberId)`: Is called when another member (not the worker running this study) opens a group channel. It gets the group member ID as a parameter.
      * `onMemberLeave(memberId)`: Is called when another member (not the worker running this study) leaves the group. It gets the group member ID as a parameter.
      * `onMemberClose(memberId)`: Is called when another member (not the worker running this study) closes their group channel. It gets the group member ID as a parameter.
      * `onGroupSession(path, op)`: Is called every time the Group Session changes on the JATOS server side. It gets two parameters: 1) JSON pointer `path` to the changed field in the Group Session, and 2) JSON patch operation `op`.
      * `onUpdate()`: Combines several other callbacks. It's called if one of the following is called: `onMemberJoin`, `onMemberOpen`, `onMemberLeave`, `onMemberClose`, or `onGroupSession`.
  * `@return {Promise}`

**Examples**

1.  Minimal example that joins a group and receives updates via the Group Session.

    ```javascript
    jatos.joinGroup({
      "onGroupSession": onGroupSession
    });

    function onGroupSession(path, op) {
      var changedObj = jatos.groupSession.find(path);
      console.log("Group Session was updated in path " + path + " with operation " + op + " to " + JSON.stringify(changedObj));
    }
    ```

2.  Example that defines the `onOpen`, `onMemberOpen`, and `onMessage` callbacks.

    ```javascript
    jatos.joinGroup({
      "onOpen": onOpen,
      "onMemberOpen": onMemberOpen,
      "onMessage": onMessage
    });

    function onOpen() {
      console.log("You joined a group and opened a group channel.");
    }

    function onMemberOpen(memberId) {
      console.log("In our group, another member (ID " + memberId + ") opened a group channel.");
    }

    function onMessage(msg) {
      console.log("You received a message: " + msg);
    }
    ```

-----

### `jatos.sendGroupMsg`

Sends a message to all group members with an open group channel. Use `jatos.sendGroupMsgTo` to send a message to a particular member.

Between group members, data can be exchanged in two fundamentally different ways: `sendGroupMsg`/`sendGroupMsgTo` or the [Group Session](#functions-to-access-the-group-session). The main difference is that the Group Session is stored in the JATOS database on the server side, while with `sendGroupMsg`/`sendGroupMsgTo`, the data are only relayed on the server side but are never stored. For example, if a worker reloads the page, all prior messages sent by `sendGroupMsg`/`sendGroupMsgTo` will be lost. On the other hand, everything stored in the Group Session will be restored. However, this storage of the Group Session in JATOS comes at the cost of being (slightly) slower. Which option to choose depends mostly on your study design. If you expect your workers to have an unreliable Internet connection or to reload the page, you should use the Group Session. If you just want to 'stream' current data to other members, use `sendGroupMsg`/`sendGroupMsgTo`.

  * `@param {object} msg` - Any JavaScript object.

**Examples**

```javascript
var msg = "Message for every group member"; // Send a text message
jatos.sendGroupMsg(msg);

var objMsg = {"city": "Berlin", "population": 3500000}; // Send an object
jatos.sendGroupMsg(objMsg);
```

-----

### `jatos.sendGroupMsgTo`

Like `jatos.sendGroupMsg`, but sends a message to a particular group member specified by their group member ID. You can find a list of all IDs of group members with an open channel in `jatos.groupChannels`. Alternatively, you can get member IDs via the `onMemberOpen` callback function.

  * `@param {string} recipient` - Recipient's group member ID.
  * `@param {object} msg` - Any JavaScript object.

**Examples**

1.  Send a message to a group member with ID 1063.

    ```javascript
    var msg = "Message for group member 1063";
    jatos.sendGroupMsgTo("1063", msg);
    ```

2.  Use the `onMemberOpen` callback to send a message right after a new member opens their group channel.

    ```javascript
    jatos.joinGroup({
      "onMemberOpen": onMemberOpen,
      "onMessage": onMessage
    });

    function onMemberOpen(memberId) {
      var msg = "Welcome to the group!";
      jatos.sendGroupMsgTo(memberId, msg);
    }

    function onMessage(msg) {
       console.log("You received a message: " + msg);
    }
    ```

-----

### `jatos.leaveGroup`

Leaves the group it has previously joined. It offers callbacks, either as a parameter or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in leaving.

  * `@param {function} [onSuccess]` - Function to be called after the group is left.
  * `@param {function} [onError]` - Function to be called in case of error.
  * `@return {Promise}`

**Example**

```javascript
jatos.leaveGroup();
```

-----

### `jatos.reassignGroup`

Asks the JATOS server to reassign this study run to a different group. JATOS can only reassign if another group is available. It offers callbacks, either as a parameter or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the reassignment.

  * `@param {function} [onSuccess]` - Function to be called if the reassignment is successful.
  * `@param {function} [onFail]` - Function to be called if the reassignment is unsuccessful.
  * `@return {Promise}`

**Example**

```javascript
jatos.reassignGroup()
   .then(() => console.log("Successful group reassignment: new group ID is " + jatos.groupResultId))
   .catch(() => console.log("Group reassignment failed"));
```

-----

### `jatos.setGroupFixed`

Asks the JATOS server to fix this group. A fixed group is not allowed to take on more members, although members are still allowed to leave. It offers callbacks, either as a parameter or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the fixing.

  * `@param {function} [onSuccess]` - Function to be called if the fixing is successful.
  * `@param {function} [onFail]` - Function to be called if the fixing is unsuccessful.
  * `@return {Promise}`

**Example**

```javascript
jatos.setGroupFixed();
```

-----

### `jatos.hasJoinedGroup`

Returns `true` if this study run has joined a group and `false` otherwise. It doesn't necessarily mean that we have an open group channel. We might have just joined a group in a prior component but never opened the channel in this component. If you want to check for an open group channel, use `jatos.hasOpenGroupChannel`.

**Example**

```javascript
if(jatos.hasJoinedGroup()) {
  // We are a member in a group
} else {
  // We are not a member in a group
}
```

-----

### `jatos.hasOpenGroupChannel`

Returns `true` if we currently have an open group channel and `false` otherwise. Since you can't open a group channel without joining a group, this also means that we have joined a group. On the other hand, even if we have a closed group channel, we can still be a member of a group. Use `jatos.hasJoinedGroup` to check group membership.

**Example**

```javascript
if(jatos.hasOpenGroupChannel()) {
  // We are a member in a group and have an open group channel
} else {
  // We do not have an open group channel (but could still be a member in a group)
}
```

-----

### `jatos.isMaxActiveMemberReached`

Returns `true` if the group has reached the maximum number of active members as specified in the batch properties. It's not necessary that each member has an open group channel.

**Example**

```javascript
if(jatos.isMaxActiveMemberReached()) {
  // Maximum number of active members is reached
}
```

-----

### `jatos.isMaxActiveMemberOpen`

Returns `true` if the group has reached the maximum number of active members as specified in the batch properties AND each member has an open group channel.

**Example**

```javascript
if(jatos.isMaxActiveMemberOpen()) {
  // Maximum number of active members is reached and each has an open channel
}
```

-----

### `jatos.isGroupOpen`

Returns `true` if all active members of the group have an open group channel and can send and receive data. It's not necessary that the group has reached its minimum or maximum active member size.

**Example**

```javascript
if(jatos.isGroupOpen()) {
  // Each of the current members of the group has an open group channel
}
```

-----

## Group Session Functions

The Group Session is one of three ways to communicate between members of a group. The others are direct messaging (with [jatos.sendGroupMsgTo](#jatossendgroupmsgtorecipient-msg)) and broadcast messaging ([jatos.sendGroupMsg](#jatossendgroupmsgmsg)) (or: [more general information about the different session types](/Session-Data-Three-Types.html)).

In contrast to the [Batch Session](#functions-to-access-the-batch-session), the Group Session doesn't work from the start of a component. To use the Group Session, you have to join a group ([with jatos.joinGroup](#jatosjoingroupcallbacks)). There, you can also define an `onGroupSession` callback that gets called each time the Group Session changes, regardless of the origin of the change.

The Group Session is stored in JATOS' database on the server side. This means that all changes in the Group Session have to be synchronized between the client and the server. This is done via the group channel. Therefore, all writing functions (`add`, `remove`, `clear`, `replace`, `copy`, `move`, `set`, `setAll`) can be paired with callback functions that will signal success or failure in the client-server sync. These callback functions can either be passed as parameters to `jatos.groupSession.[function_name]` or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

On the other hand, for all reading functions (`get`, `find`, `getAll`, `test`), there is no need to sync data between the client and server, because ***jatos.js*** keeps a copy of the Group Session locally. Therefore, all reading functions do not offer callbacks, as there is no risk of synchronization failure.

Accessing the Group Session is done via [JSON Patches (RFC 6902)](https://tools.ietf.org/html/rfc6902) and [JSON Pointer (RFC 6901)](https://tools.ietf.org/html/rfc6901). An introduction can be found under [jsonpatch.com](http://jsonpatch.com/). For JSON Patches, ***jatos.js*** uses the [JSON-Patch](https://github.com/Starcounter-Jack/JSON-Patch) library from Joachim Wester, and for JSON Pointers, the [jsonpointer.js](https://github.com/alexeykuzmin/jsonpointer.js) library from Alexey Kuzmin.

-----

### `jatos.groupSession.get`

Convenience function: like `jatos.groupSession.find`, but works with a key instead of a JSON Pointer (without the slash in front of the key name). Therefore, it works only on the first level of the session's object tree. It takes the name of a field within the Group Session and returns the matching value, or `undefined` if the key does not exist. For all other levels of the object tree, use `jatos.groupSession.find`. It gets the object from the locally stored copy of the session and does not call the server.

  * `@param {string} name` - Name of the field.
  * `@return {object}` - The value that is stored under the name.

**Examples**

1.  Get a field from the Group Session.

    Given the Group Session is `{"a": 1000, "b": "watermelon"}`:

    ```javascript
    // Since the parameter is the key's name and not a path, it does not start with a "/"
    var b = jatos.groupSession.get("b"); // b is "watermelon"
    var c = jatos.groupSession.get("c"); // c is undefined
    ```

    The first line returns "watermelon" and the second `undefined`.

2.  With `jatos.groupSession.get`, you can only access the first level of the object tree. If you want another level, use `jatos.groupSession.find`.

    If the Group Session is `{"a": {"a1": 123, "a2": "watermelon"}}`:

    ```javascript
    var a1 = jatos.groupSession.get("a1"); // a1 is undefined !!!
    var a = jatos.groupSession.get("a"); // a is { "a1": 123, "a2": "watermelon" }
    ```

-----

### `jatos.groupSession.set`

A convenience function for `jatos.groupSession.add`. Instead of a JSON Pointer path, it accepts the name of the field to be stored (without the slash in front). Therefore, it works only on the first level of the Group Session's object tree. If the name already exists in the Group Session, the value will be overwritten.

  * `@param {string} name` - Name of the field.
  * `@param {object} value` - Value to be stored.
  * `@param {function} [onSuccess]` - Function to be called if this patch is successfully applied on the server and client sides.
  * `@param {function} [onError]` - Function to be called if this patch fails.
  * `@return {Promise}`

**Examples**

1.  Set a field in the Group Session.

    If the Group Session is `{"a": 1234}`:

    ```javascript
    // Since the parameter is the key's name and not a path, it does not start with a "/"
    var b = jatos.groupSession.set("b", "koala");
    ```

    Then, after the Group Session is successfully updated, the new object is `{"a": 1234, "b": "koala"}`.

    Since there's a slight chance that the session update won't be successful, it's a good idea to provide callback functions for both cases. To provide success or fail callback functions, you can either specify the `onSuccess`/`onError` parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

2.  Use the returned Promise to handle success or failure.

    ```javascript
    jatos.groupSession.set("b", "koala")
       .then(() => console.log("Group Session was successfully updated"))
       .catch(() => console.log("Group Session synchronization failed"));
    ```

3.  Have a series of Group Session changes.

    ```javascript
    jatos.groupSession.set("a", 1)
       .then(() => jatos.groupSession.set("b", 2))
       .then(() => jatos.groupSession.set("c", 3))
       .catch(() => console.log("Group Session synchronization failed"));
    ```

-----

### `jatos.groupSession.getAll`

Returns the complete Group Session data (might have performance implications if the data is very large). It gets the object from the locally stored copy of the session and does not call the server.

  * `@return {object}` - Returns the whole Group Session object.

**Example**

```javascript
var groupSession = jatos.groupSession.getAll();
```

-----

### `jatos.groupSession.setAll`

Replaces the whole session data. If the replacing object is rather large, it might be better, performance-wise, to replace only individual paths. Each session writing involves sending the changes in the session via a JSON Patch to the JATOS server. If the session is large, this data transfer can take some time. In this case, use other session functions, like `set`, `add`, or `replace`.

  * `@param {object} value` - Value to be stored in the session.
  * `@param {function} [onSuccess]` - Function to be called if this patch is successfully applied on the server and client sides.
  * `@param {function} [onError]` - Function to be called if this patch fails.
  * `@return {Promise}`

**Examples**

1.  Set the whole Group Session at once.

    ```javascript
    var o = {"a": 123, "b": "foo"};
    jatos.groupSession.setAll(o); // Overwrites the current Group Session with the object o
    ```

    Since there's a slight chance that the session update won't be successful, it's a good idea to provide callback functions for both cases. To provide success or fail callback functions, you can either specify the `onSuccess`/`onError` parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

2.  Use the returned Promise to handle success or failure.

    ```javascript
    var o = {"a": 123, "b": "foo"};
    jatos.groupSession.setAll(o)
       .then(() => console.log("Group Session was successfully updated"))
       .catch(() => console.log("Group Session synchronization failed"));
    ```

-----

### `jatos.groupSession.clear`

Clears the entire Group Session data and sets it to an empty object `{}`.

* `@param {function} [onSuccess]` - Function to be called if this patch is successfully applied on the server and client sides.
* `@param {function} [onError]` - Function to be called if this patch fails.
* `@return {Promise}`

**Examples**

1.  Clear the entire Group Session.

    ```javascript
    jatos.groupSession.clear();
    ```

    Since there's a slight chance that the session update won't be successful, it's a good idea to provide callback functions for both cases. To provide success or fail callback functions, you can either specify the `onSuccess`/`onError` parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

2.  Use the returned Promise to handle success or failure.

    ```javascript
    jatos.groupSession.clear()
       .then(() => console.log("Group Session was successfully updated"))
       .catch(() => console.log("Group Session synchronization failed"));
    ```

-----

### `jatos.groupSession.find`

Gets a field in the Group Session data. It takes a JSON Pointer and returns the matching value, or `undefined` if the pointer doesn't correspond to an existing field. It gets the object from the locally stored copy of the session and doesn't call the server. Contrary to `jatos.groupSession.get`, it allows you to get values from all levels of the Group Session's object tree.

* `@param {string} path` - JSON pointer path.
* `@return {object}` - The value that is stored in the path.

**Example**

Given the Group Session is `{"a": {"a1": "foo", "a2": "bar"}, "b": 999}`:

```javascript
jatos.groupSession.find("/a/a1"); // returns "foo"
jatos.groupSession.find("/b");    // returns 999
jatos.groupSession.find("/c/d");  // returns undefined
```

The first line returns "foo", and the second returns 999.

-----

### `jatos.groupSession.defined`

Checks in the Group Session whether a field under the given path exists. Returns `true` if the field is defined and `false` otherwise. It's equivalent to `!jatos.groupSession.test(path, undefined)`.

  * `@param {string} path` - JSON pointer path to be checked.
  * `@return {boolean}`

**Example**

```javascript
jatos.groupSession.defined("/a"); // returns true if the pointer '/a' exists
```

-----

### `jatos.groupSession.test`

JSON Patch test operation: Tests that the specified value is set in the document (see [jsonpatch.com](http://jsonpatch.com/)).

  * `@param {string} path` - JSON pointer path to be tested.
  * `@param {object} value` - Value to be tested.
  * `@return {boolean}`

**Examples**

1.  Test if a certain field in the Group Session has a value.

    Given the Group Session is `{"a": 123, "b": {"b1": "flowers", "b2": "animals"}}`:

    ```javascript
    jatos.groupSession.test("/a", 123);       // returns true
    jatos.groupSession.test("/a", 10);        // returns false
    jatos.groupSession.test("/b/b1", "flowers"); // returns true
    ```

    The first line returns `true`, the second `false`, and the third `true`.

2.  If you want to know if a path exists in the Group Session, you can test against `undefined`. The function `jatos.groupSession.defined` provides a shortcut for this use case.

    ```javascript
    if (!jatos.groupSession.test("/c", undefined)) {
      // Path "/c" exists
    } else {
      // Path "/c" doesn't exist
    }
    ```

-----

### `jatos.groupSession.add`

JSON Patch add operation: Adds a value to an object or inserts it into an array. In the case of an array, the value is inserted before the given index. The `-` character can be used instead of an index to insert at the end of an array (see [jsonpatch.com](http://jsonpatch.com/)). If the path already exists in the Group Session, the value will be overwritten. The patch will fail if a key other than the last path element is missing, e.g., when the path is `"/a/b/c"`, if `"a"` and `"b"` don't already exist as keys, the patch will fail.

  * `@param {string} path` - JSON pointer path.
  * `@param {object} value` - Value to be stored.
  * `@param {function} [onSuccess]` - Function to be called if this patch is successfully applied on the server and client sides.
  * `@param {function} [onError]` - Function to be called if this patch fails.
  * `@return {Promise}`

**Examples**

1.  Add a field to an empty Group Session.

    ```javascript
    jatos.groupSession.add("/a", 100);
    ```

    After the Group Session is successfully updated, the new object is `{"a": 100}`.

2.  Add a field to the Group Session.

    If the Group Session is `{"a": 100}` and you call:

    ```javascript
    jatos.groupSession.add("/b", 123);
    ```

    Then, after the Group Session is successfully updated, the new object is `{"a": 100, "b": 123}`.

    Since there's a slight chance that the session update won't be successful, it's a good idea to provide callback functions for both cases. To provide success or fail callback functions, you can either specify the `onSuccess`/`onError` parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

3.  Use the returned Promise to handle success or failure.

    ```javascript
    jatos.groupSession.add("/b", 123)
       .then(() => console.log("Group Session was successfully updated"))
       .catch(() => console.log("Group Session synchronization failed"));
    ```

4.  Add an object:

    ```javascript
    jatos.groupSession.add("/obj", { foo: "bar" })
       .then(() => console.log("Group Session was successfully updated"))
       .catch(() => console.log("Group Session synchronization failed"));
    ```

    Afterwards, the Group Session contains `{"obj": {"foo": "bar"}}`.

5.  Add to a nested object:

    If the Group Session is `{"a": {"b": {}}}` and you call:

    ```javascript
    jatos.groupSession.add("/a/b/c", 123)
       .then(() => console.log("Group Session was successfully updated"))
       .catch(() => console.log("Group Session synchronization failed"));
    ```

    Then afterwards, the Group Session contains `{"a": {"b": {"c": 123}}}`.

    Note that `jatos.groupSession.add("/a/b/c", 123)` will fail if `"a"` and `"b"` don't exist, or if `"b"` is not an object.

6.  Add an array:

    ```javascript
    jatos.groupSession.add("/array", [1, 2, 3])
       .then(() => console.log("Group Session was successfully updated"))
       .catch(() => console.log("Group Session synchronization failed"));
    ```

    Afterwards, the Group Session contains `{"array": [1, 2, 3]}`.

7.  Add an element to an array:

    If the Group Session is `{"array": [1, 2, 3]}` and you call:

    ```javascript
    jatos.groupSession.add("/array/2", "new")
       .then(() => console.log("Group Session was successfully updated"))
       .catch(() => console.log("Group Session synchronization failed"));
    ```

    Then afterwards, the Group Session contains `{"array": [1, 2, "new", 3]}`.

8.  Append to the end of an array using `/-`:

    If the Group Session is `{"array": [1, 2, 3]}` and you call:

    ```javascript
    jatos.groupSession.add("/array/-", "new")
       .then(() => console.log("Group Session was successfully updated"))
       .catch(() => console.log("Group Session synchronization failed"));
    ```

    Then afterwards, the Group Session contains `{"array": [1, 2, 3, "new"]}`.

9.  Have a series of Group Session updates.

    ```javascript
    jatos.groupSession.add("/a", 1)
       .then(() => jatos.groupSession.add("/b", 2))
       .then(() => jatos.groupSession.add("/c", 3))
       .catch(() => console.log("Group Session synchronization failed"));
    ```

-----

### `jatos.groupSession.remove`

JSON Patch remove operation: Removes a value from an object or array (see [jsonpatch.com](http://jsonpatch.com/)).

  * `@param {string} path` - JSON pointer path to the field that should be removed.
  * `@param {function} [onSuccess]` - Function to be called if this patch is successfully applied on the server and client sides.
  * `@param {function} [onError]` - Function to be called if this patch fails.
  * `@return {Promise}`

**Examples**

1.  Remove a field from the Group Session.

    If the Group Session is `{"a": 100, "b": 123}` and you call:

    ```javascript
    jatos.groupSession.remove("/b");
    ```

    Then, after the Group Session is successfully updated, the new object is `{"a": 100}`.

    Since there's a slight chance that the session update won't be successful, it's a good idea to provide callback functions for both cases. To provide success or fail callback functions, you can either specify the `onSuccess`/`onError` parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

2.  Use the returned Promise to handle success or failure.

    ```javascript
    jatos.groupSession.remove("/b")
       .then(() => console.log("Group Session was successfully updated"))
       .catch(() => console.log("Group Session synchronization failed"));
    ```

-----

### `jatos.groupSession.replace`

JSON Patch replace operation: Replaces a value. This is equivalent to a "remove" operation followed by an "add" operation (see [jsonpatch.com](http://jsonpatch.com/)).

  * `@param {string} path` - JSON pointer path.
  * `@param {object} value` - Value to be replaced with.
  * `@param {function} [onSuccess]` - Function to be called if this patch is successfully applied on the server and client sides.
  * `@param {function} [onError]` - Function to be called if this patch fails.
  * `@return {Promise}`

**Examples**

1.  Replace a field in the Group Session.

    If the Group Session is `{"a": 100, "b": 123}` and you call:

    ```javascript
    jatos.groupSession.replace("/b", 789);
    ```

    Then, after the Group Session is successfully updated, the new object is `{"a": 100, "b": 789}`.

    Since there's a slight chance that the session update won't be successful, it's a good idea to provide callback functions for both cases. To provide success or fail callback functions, you can either specify the `onSuccess`/`onError` parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

2.  Use the returned Promise to handle success or failure.

    ```javascript
    jatos.groupSession.replace("/b", 789)
       .then(() => console.log("Group Session was successfully updated"))
       .catch(() => console.log("Group Session synchronization failed"));
    ```

-----

### `jatos.groupSession.copy`

JSON Patch copy operation: Copies a value from one location to another within the JSON document. Both `from` and `path` are JSON Pointers (see [jsonpatch.com](http://jsonpatch.com/)).

  * `@param {string} from` - JSON pointer path to the origin.
  * `@param {string} path` - JSON pointer path to the target.
  * `@param {function} [onSuccess]` - Function to be called if this patch is successfully applied on the server and client sides.
  * `@param {function} [onError]` - Function to be called if this patch fails.
  * `@return {Promise}`

**Examples**

1.  Copy a field in the Group Session from one location to another.

    If the Group Session is `{"a": "jatos"}` and you call:

    ```javascript
    jatos.groupSession.copy("/a", "/b");
    ```

    Then, after the Group Session is successfully updated, the new object is `{"a": "jatos", "b": "jatos"}`.

    Since there's a slight chance that the session update won't be successful, it's a good idea to provide callback functions for both cases. To provide success or fail callback functions, you can either specify the `onSuccess`/`onError` parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

2.  Use the returned Promise to handle success or failure.

    ```javascript
    jatos.groupSession.copy("/a", "/b")
       .then(() => console.log("Group Session was successfully updated"))
       .catch(() => console.log("Group Session synchronization failed"));
    ```

-----

### `jatos.groupSession.move`

JSON Patch move operation: Moves a value from one location to another. Both `from` and `path` are JSON Pointers (see [jsonpatch.com](http://jsonpatch.com/)).

  * `@param {string} from` - JSON pointer path to the origin.
  * `@param {string} path` - JSON pointer path to the target.
  * `@param {function} [onSuccess]` - Function to be called if this patch is successfully applied on the server and client sides.
  * `@param {function} [onError]` - Function to be called if this patch fails.
  * `@return {Promise}`

**Examples**

1.  Move a field in the Group Session from one location to another.

    If the Group Session is `{"a": "jatos"}` and you call:

    ```javascript
    jatos.groupSession.move("/a", "/b");
    ```

    Then, after the Group Session is successfully updated, the new object is `{"b": "jatos"}`.

    Since there's a slight chance that the session update won't be successful, it's a good idea to provide callback functions for both cases. To provide success or fail callback functions, you can either specify the `onSuccess`/`onError` parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

2.  Use the returned Promise to handle success or failure.

    ```javascript
    jatos.groupSession.move("/a", "/b")
       .then(() => console.log("Group Session was successfully updated"))
       .catch(() => console.log("Group Session synchronization failed"));
    ```

-----

### `jatos.groupSessionVersioning`

This flag can be used to turn off versioning of the group session. This speeds up updates to the group session (patches) in certain cases where all concurrent patches are conflict-free. If versioning is turned on (set to `true`), all session data patches are accompanied by a version. On the JATOS server side, only a patch with the current version (as stored in the database) is applied. If there are multiple concurrent patches, only the first one is applied. If versioning is turned off, all patches arriving at the JATOS server are applied immediately without checking the version. This is faster but can lead to unintended session data changes. By default, versioning is turned on.

**Example**

```javascript
jatos.groupSessionVersioning = false; // Turns off versioning
```
