---
title: jatos.js Reference
slug: /jatos.js-Reference.html
---

## Introduction

_jatos.js_ is a JavaScript library that helps you to communicate from your component's JavaScript with your JATOS server. Below we list and describe its variables and functions.

Always load _jatos.js_ in the `<head>` section with the following line:

```
<script src="jatos.js"></script>
```

All _jatos.js_ variables or functions start with `jatos.`. For example, if you want to get the study's ID you use `jatos.studyId`. 

Most _jatos.js_ variables or functions only work after _jatos.js_ is initialized (`jatos.onLoad()` is used).

And, please, if you find a mistake or have a question don't hesitate to [contact us](Contact-us.html).


## ID variables

All those IDs are generated and stored by JATOS. _jatos.js_ automatically sets these variables with the corresponding values if you included the `jatos.onLoad()` callback function at the beginning of your JavaScript.

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

This ID is individual for every component in a study run. A component result contains data of the run belonging to the specific component (e.g. result data).

### `jatos.groupMemberId`

see [Group Variables](#group-variables)

### `jatos.groupResultId`

see [Group Variables](#group-variables)


## Study variables

### `jatos.studyProperties`

All the properties (except the JSON input data) you entered for this study

* `jatos.studyProperties.title` - Study's title
* `jatos.studyProperties.uuid` - Study's UUID
* `jatos.studyProperties.description` - Study's description
* `jatos.studyProperties.descriptionHash` - Hash of study's description
* `jatos.studyProperties.locked` - Whether the study is locked or not
* `jatos.studyProperties.dirName` - Study's dir name in the file system of your JATOS installation
* `jatos.studyProperties.groupStudy` - Whether this is a group study or not

### `jatos.studyJsonInput`

The JSON input you entered in the study's properties.

### `jatos.studyLength`

Number of component this study has


## Component variables

### `jatos.componentProperties`

All the properties (except the JSON input data) you entered for this component

* `jatos.componentProperties.title` - Component's title
* `jatos.componentProperties.uuid` - Component's UUID
* `jatos.componentProperties.htmlFilePath` - Path to Component's HTML file in your JATOS installation
* `jatos.componentProperties.reloadable` - Whether it's reloadable

### `jatos.componentJsonInput`

The JSON input you entered in the component's properties.

### `jatos.componentList`

An array of all components of this study with basic information about each component. For each component it has the `title`, `id`, whether it is `active`, and whether it is `reloadable`.

### `jatos.componentPos`

Position of this component within the study starting with 1 (like shown in the GUI)


## Other variables

### `jatos.version`

Current version of the _jatos.js_ library

### `jatos.urlQueryParameters`

Original query string parameters of the URL that starts the study. It is provided as a JavaScript object. This might be useful to pass on information from outside of JATOS into a study run, e.g. if you want to pass on information like gender and age. However if you know the information beforehand it's easier to put them in the Study's or Component's JSON input. Another example is MTurk which passes on it's worker's ID via a URL query parameter.

**Examples**

1. One has this link to start a Personal Single Run:

   `http://localhost:9000/publix/50/start?batchId=47&personalSingleWorkerId=506`

   Now one could add parameters to the URL's query string to pass on external information into the study run. E.g. the following URL would add the parameters 'foo' with the value 'bar' and 'a' with the value '123':

   `http://localhost:9000/publix/50/start?batchId=47&personalSingleWorkerId=506&foo=bar&a=123`

   Then those parameter will be accessible during the study run as `jatos.urlQueryParameters.a` and `jatos.urlQueryParameters.foo`.

1. MTurk uses for its worker ID the URL query parameter 'workerId' and this is accessible via `jatos.urlQueryParameters.workerId`.


### `jatos.studySessionData`

The session data variable can be accessed and modified by every component of a study. It's a very convenient way to share data between different components. Whatever is written in this variable will be available in the subsequent components. However, remember that the session data will be deleted after the study is finished (see also [Session Data - Three Types](Session-Data-Three-Types.html)).

### `jatos.channelSendingTimeoutTime`

Time in ms to wait for an answer after sending a message via a channel (batch or group). Set this variable if you want to change the default value (default is 10 s).

**Example**

```javascript
jatos.channelSendingTimeoutTime = 20000; // Sets channel timeout to 20 seconds
```
  
### `jatos.channelHeartbeatInterval`

Waiting time in ms between channel (group or batch) heartbeats (default is 25 s)

**Example**

```javascript
jatos.channelHeartbeatInterval = 10000; // Sets interval to 10 seconds
```
  
### `jatos.channelHeartbeatTimeoutTime`

Waiting time in ms for JATOS server's answer to a channel heartbeat (default is 10 s)

**Example**

```javascript
jatos.channelHeartbeatTimeoutTime = 20000; // Sets interval to 20 seconds
```
  
### `jatos.channelClosedCheckInterval`

Waiting time in ms between checking if channels (group or batch) are closed unexpectedly (default is 2 s)

**Example**

```javascript
jatos.channelClosedCheckInterval = 4000; // Sets interval to 4 seconds
```
  
### `jatos.channelOpeningBackoffTimeMin` 

Min waiting time (in ms) between channel reopening attempts (default is 1s for min and 2 min for max). _jatos.js_ uses an _exponential back-off_ retry pattern for the channels.

**Example**

```javascript
jatos.channelOpeningBackoffTimeMin = 2000; // Sets interval to 2 seconds
```

### `jatos.channelOpeningBackoffTimeMax`

Max waiting time (in ms) between channel reopening attempts (default is 1s for min and 2 min for max). _jatos.js_ uses an _exponential back-off_ retry pattern for the channels.

**Example**

```javascript
jatos.channelOpeningBackoffTimeMax = 60000; // Sets interval to 1 minute
```

### `jatos.httpTimeout`

Time in ms to wait for an answer of an HTTP request by _jatos.js_. Set this variable if you want to change the default value (default is 1 min).

**Example**

```javascript
jatos.httpTimeout = 30000; // Sets HTTP timeout to 30 seconds
```
  
### `jatos.httpRetry`

Some jatos functions (e.g. `jatos.sendResultData`) send an Ajax request to the JATOS server. If this request was not successful (e.g. network problems) _jatos.js_ retries it. With this variable one can change the number of retries. The default is 5. 

**Example**

```javascript
jatos.httpRetry = 2; // Attempts 2 retries of failed Ajax requests
```
  
### `jatos.httpRetryWait`

Same as `jatos.httpRetry` but this variable defines the waiting time between the retries. The default is 1000 ms.

**Example**

```javascript
jatos.httpRetryWait = 5000; // Sets Ajax retry waiting time to 5 seconds
```

### `jatos.waitSendDataOverlayConfig`

Config of the overlay that is shown when the component ended but there are still data to be sent. See function jatos.showOverlay for config options. By default the text is "Sending data. Please wait." with an image of a spinning wheel.

**Example**

```javascript
jatos.waitSendDataOverlayConfig = { text: "Enviando datos. Espere." };
```



## General _jatos.js_ functions

### `jatos.onLoad`

Defines callback function that _jatos.js_ will call when it's finished initialising.

* _@param {function} callback_ - function to be called after _jatos.js_' initialization is done

**Example**

```javascript
jatos.onLoad(function() {
  // Start here with your code that uses jatos.js' variables and functions
});
```


### `jatos.addAbortButton`

Adds a button to the document that if pressed calls _jatos.abortStudy_ (which cancels the study run and deletes all result data and files). By default this button is in the bottom-right corner but this and other properties can be configured.

* _@param {object optional} config_ - Config object
  * _@param {string optional} text_ - Button text (Default: 'Cancel')
  * _@param {boolean optional} confirm_ - Should the worker be asked for confirmation? (Default: true)
  * _@param {string optional} confirmText_ - Confirmation text (Default: 'Do you really want to cancel this study?')
  * _@param {string optional} tooltip_ - Tooltip text (Default: 'Cancels this study and deletes all already submitted data')
  * _@param {string optional} msg_ - Message to be send back to JATOS to be logged (Default: 'Worker decided to abort')
  * _@param {string optional} style_ - Additional CSS styles
  * _@param {function optional} action_ - Which function should be called in the end. Default is jatos.abortStudy.

**Examples**

1. Adds the default cancel button

   ```javascript
   jatos.addAbortButton()
   ```

1. Adds a cancel button and changes some properties

   ```javascript
   jatos.addAbortButton({
     text: "Quit",
     confirmText: "You really wanne quit?",
     tooltip: "Don't you dare clicking here!",
     msg: "This worker aborted the mission.",
     style: "color:green"
   });
   ```

1. Adds a cancel button and changes the position to the bottom-left

   ```javascript
   jatos.addAbortButton({
     style: "left:1em"
   });
   ```

1. Adds a cancel button and calls 'myFunction' if pressed

   ```javascript
   jatos.addAbortButton({
     action: myFunction
   });
   ```


### `jatos.showBeforeUnloadWarning`

Convenience function that adds or cancels a warning popup that will be shown by the browser to the worker who attempts to reload the page or close the browser (tab). By default this is turned on for components that are not 'reloadable'. Modern browsers do not allow to change the message of this popup. This works only if at least one user action happend in the window, e.g. mouse click (https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event).

* _@param {boolean} show_ - If true the warning will be shown - if false a	previously added warning will be canceled

**Example**

Adds a warning popup:

```javascript
jatos.showBeforeUnloadWarning(true);
```


### `jatos.showOverlay`

Convenience function that shows a text and an image in the center of the screen. By default the text is 'Please wait.' and the image is an spinning wheel.

* _@param {object optional} config_ - Config object
  * _@param {string optional} text_ - Text to be shown. Default is "Please wait".
  * _@param {string optional} imgUrl_ - URL of the image. Default is a spinning wheel.
  * _@param {string optional} showImg_ - If true the image is shown - otherwise not. Default is true.
  * _@param {string optional} style_ - Additional CSS styles

**Examples**

1. Shows the default overlay with 'Please wait.' and an spinning wheel.

   ```javascript
   jatos.showOverlay()
   ```

1. Shows text only

   ```javascript
   jatos.showOverlay({
     text: "Please have a coffee break for 5 minutes",
     showImg: false
   });
   ```

1. Shows text only

   ```javascript
   jatos.showOverlay({
     text: "Please have a coffee break for 5 minutes",
     imgUrl: "http://url-to-my-coffee-picture",
     style: "color:brown"
   });
   ```   

### `jatos.removeOverlay` 

Removes an overlay that was added by jatos.showOverlay.
 
**Example**

```javascript
jatos.removeOverlay()
```


### `jatos.onError` 

DEPRECATED - use the specific function's error callback or Promise function instead

Defines a callback function that is to be called in case _jatos.js_ produces an error. 

* _@param {function} callback_ - Function to be called in case of an error

**Example**

Show the error message in an alert box:

```javascript
jatos.onError(alert);
```


### `jatos.log`

Sends a message to be logged back to the JATOS server where it will be logged in JATOS' log file.

* _@param {string} logMsg_ - The messages to be logged  

**Example**

```javascript
jatos.log("Log this message in JATOS' log file");
```


### `jatos.catchAndLogErrors`

Convenience function that sends all 'error' and 'unhandledrejection' events and 'console.error' and 'console.warn' calls to [JATOS' server log](Troubleshooting.html#read-log-file-in-the-browser). This is useful in debugging. 
	 
**Example**

```javascript
jatos.catchAndLogErrors();
```


### `jatos.addJatosIds`

Convenience function that adds some [IDs](jatos.js-Reference.html#ids) (study code, study ID, study title, batch ID, batch title, component ID, component position, component title, worker ID, study result ID, component result ID, group result ID, group member ID) to the given object.

* _@param {object} obj_ - Object to which the IDs will be added

**Example**

```javascript
var resultData = {};
jatos.addJatosIds(resultData);
```


### `jatos.setHeartbeatPeriod`

Every running component sends regularly a HTTP request (the heartbeat) back to the JATOS server. This signals that it is still running. As soon as the browser tab running the component is closed the heartbeat ceases. The time of the last heartbeat is visible in the GUI, in the study results page in the 'Last Seen' row. This way you can easily see if a worker is still running your study or if (and when) he abandonend it. By default the heartbeat period is 2 minutes. By careful not to set the period too low (few seconds or even milliseconds) since it might overload your network or your JATOS server.

* _@param {number} heartbeatPeriod_ - Time period between two heartbeats in milliseconds

**Example**

```javascript
jatos.setHeartbeatPeriod(60000); // Sets to a heartbeat every minute
```


### `jatos.setStudySessionData`

**If you want to just write into the study session, this function is not what you need.** If you want to write something into the study session, just write into the [`jatos.studySessionData`](jatos.js-Reference.html#studys-session-data) object.

Posts Study Session data to the JATOS server. This function sets the study session data and **sends it to the JATOS server for safe storage**. This is done automatically whenever a component finishes. But sometimes it is necessary to trigger this manually, e.g. in a very long-running component one might want to store the session intermediately. It offers callbacks, either as parameters or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the transfer.

* _@param {object} sessionData_ - object to be submitted
* _@param {optional function} onSuccess_ - Function to be called after this function is finished
* _@param {optional function} onFail_ - Function to be called after if this this functions fails
* _@return {Promise}_

**Example**

```javascript
var studySessionData = { "a": 123, "b": 789, "c": 100};
jatos.setStudySessionData(studySessionData);
```


## Functions to control study flow

### `jatos.startComponent`

Finishes the currently running component and starts the component with the given ID or UUID. Though often it's better to use `jatos.startComponentByPos` instead because it keeps working even after an export/import of the study into another JATOS. One can additionally send result data back to the JATOS server.

There are two versions: with or without message

1. Without message:
	* _@param {number} componentIdOrUuid_ - ID or UUID of the component to start
   * _@param {optional object} resultData_ - String or object that will be sent as result data. An object will be serialized to JSON (stringify). 
   * _@param {optional function} onError_ - Callback function if fail

1. With message:
	 * _@param {number} componentIdOrUuid_ - ID or UUID of the component to start
	 * _@param {optional object} resultData_ - String or object that will be sent as result data. An object will be serialized to JSON (stringify). 
	 * _@param {optional string} message_ - Message that should be logged (max 255 chars)
	 * _@param {optional function} onError_ - Callback function if fail

**Examples**

1. Jump to component with ID 23

   ```javascript
   jatos.startComponent(23);
   ```

1. Jump to component by using its UUID

   ```javascript
   jatos.startComponent("3d277289-754b-4fd6-aa76-c8404deda02e");
   ```

1. Send result data and jump to another component

   ```javascript
   var resultData = "my important result data";
   jatos.startComponent(23, resultData);
   ```

1. Send result data, jump to another component and send a message back that will be visible in JATOS result pages and log 

   ```javascript
   var resultData = "my important result data";
   jatos.startComponent(23, resultData, "everything okay");
   ```


### `jatos.startComponentByPos`

Finishes the currently running component and starts the component with the given position. The component position is the count of the component within the study like shown in the study overview page (1st component has position 1, 2nd component position 2, ...). One can additionally send result data back to the JATOS server.

There are two versions: with or without message

1. Without message

   * _@param {number} componentPos_ - Position of the component to start
   * _@param {optional object} resultData_ - String or object that will be sent as result data. An object will be serialized to JSON (stringify). 
   * _@param {optional function} onError_ - Callback function if fail

1. With message

   * _@param {number} componentPos_ - Position of the component to start
	 * _@param {optional object or string} resultData_ - String or object that will be sent as result data. An object will be serialized to JSON (stringify). 
	 * _@param {optional string} message_ - Message that should be logged (max 255 chars)
	 * _@param {optional function} onError_ - Callback function if fail

**Examples**

1. Jump to component in position 3

   ```javascript
   jatos.startComponentByPos(3);
   ```

1. Send result data and jump to component with position 3

   ```javascript
   var resultData = "my important result data";
   jatos.startComponentByPos(3, resultData);
   ```

1. Send result data, jump to component in position 3 and send a message back that will be visible in JATOS result pages and log 

   ```javascript
   var resultData = "my important result data";
   jatos.startComponentByPos(3, resultData, "everything okay");
   ```


### `jatos.startNextComponent`

Finishes the currently running component and starts the next component of this study. The next component is the one with position + 1. The component position is the count of the component within the study like shown in the study overview page (1st component has position 1, 2nd component position 2, ...). One can additionally send result data back to the JATOS server.

There are two versions: with or without message

1. Without message

   * _@param {optional object} resultData_ - String or object that will be sent as result data. An object will be serialized to JSON (stringify). 
   * _@param {optional function} onError_ - Callback function if fail

1. With message

	 * _@param {optional object or string} resultData_ - String or object that will be sent as result data. An object will be serialized to JSON (stringify). 
	 * _@param {optional string} message_ - Message that should be logged (max 255 chars)
	 * _@param {optional function} onError_ - Callback function if fail

**Examples**

1. Jump to the next component

   ```javascript
   jatos.startNextComponent();
   ```

1. Send result data and jump to the next component

   ```javascript
   var resultData = "my important result data";
   jatos.startNextComponent(resultData);
   ```

1. Send result data, jump to the next component and send a message back that will be visible in JATOS result pages and log 

   ```javascript
   var resultData = "my important result data";
   jatos.startNextComponent(resultData, "everything okay");
   ```


### `jatos.startLastComponent`

Finishes the current component and starts the last component of this study. If the last component is inactive it starts the component with the highest position that is active. The component position is the count of the component within the study like shown in the study overview page (1st component has position 1, 2nd component position 2, ...). One can additionally send result data back to the JATOS server.

There are two versions: with or without message

1. Without message

	 * _@param {optional object} resultData_ - String or object that will be sent as result data. An object will be serialized to JSON (stringify). 
   * _@param {optional function} onError_ - Callback function if fail

1. With message

	 * _@param {optional object or string} resultData_ - String or object that will be sent as result data. An object will be serialized to JSON (stringify). 
	 * _@param {optional string} message_ - Message that should be logged (max 255 chars)
	 * _@param {optional function} onError_ - Callback function if fail

**Examples**

1. Jump to the last component

   ```javascript
   jatos.startLastComponent();
   ```

1. Send result data and jump to the last component

   ```javascript
   var resultData = "my important result data";
   jatos.startLastComponent(resultData);
   ```

1. Send result data, jump to the last component and send a message back that will be visible in JATOS result pages and log

   ```javascript
   var resultData = "my important result data";
   jatos.startLastComponent(resultData, "everything okay");
   ```


### `jatos.abortStudy`

**Hint**: There is a convenience function `jatos.addAbortButton` that already adds a button to your document including showing an confirmation box and options to change it to your needs.

Aborts study. All previously submitted result data will be deleted. Afterwards the worker is redirected to the study end page. Data stored in the Batch Session or Group Session are uneffected by this.

* _@param {optional string} message_ - Message that will be stored together with the study results and is accessible via JATOS' GUI result pages. The message can be max 255 characters long.
* _@param {optional boolean} showEndPage_ - If 'true' an end page is shown - if 'false' it	behaves like `jatos.endStudyAjax`, which means no showing of JATOS' end page

**Examples**

1. Just abort study

   ```javascript
   jatos.abortStudy();
   ```

1. Additionally send a message

   ```javascript
   jatos.abortStudy("participant aborted by pressing abort button");
   ```


### `jatos.abortStudyAjax`

**Hint**: There is a convenience function `jatos.addAbortButton` that already adds a button to your document including showing an confirmation box and options to change it to your needs.

Aborts study with an Ajax call. All previously submitted result data will be deleted. Data stored in the Batch Session or Group Session are uneffected by this. It offers callbacks, either as parameter or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the ending.

* _@param {optional string} message_ - Message that should be logged
* _@param {optional function} onSuccess_ - Function to be called in case of successful submit
* _@param {optional function} onError_ - Function to be called in case of error
* _@return {Promise}_

**Examples**

1. Just abort study

   ```javascript
   jatos.abortStudyAjax();
   ```

1. Abort study with a message that will be sent back to JATOS and shown in the result page and put in the log

   ```javascript
   jatos.abortStudyAjax("Worker clicked Abort button");
   ```


### `jatos.endStudy`

Ends study. Redirects the worker to study's end page afterwards.

There are two versions: with and without result data

1. With result data
	  * _@param {optional string or object} resultData_ - Result data to be sent back to the JATOS server
	  * _@param {optional boolean} successful_ - 'true' if study should finish successfully, 'false' otherwise. Default is true
	  * _@param {optional string} message_ - Message that will be stored together with the study results and is accessible via JATOS' GUI result pages. The message can be max 255 characters long
	  * _@param {optional boolean} showEndPage_ - If 'true' an end page is shown - if 'false' it	behaves like `jatos.endStudyAjax`, which means no showing of JATOS' end page

1. Without result data
	  * _@param {optional boolean} successful_ - 'true' if study should finish successfully, 'false' otherwise. Default is true
	  * _@param {optional string} message_ - Message that will be stored together with the study results and is accessible via JATOS' GUI result pages. The message can be max 255 characters long
	  * _@param {optional boolean} showEndPage_ - If 'true' an end page is shown - if 'false' it	behaves like `jatos.endStudyAjax`, which means no showing of JATOS' end page

**Examples**

1. Just end study

   ```javascript
   jatos.endStudy();
   ```

1. End study and send a message back that will be visible in JATOS result pages and log 

   ```javascript
   jatos.endStudy(true, "everything worked fine");
   ```

1. Indicate a failure - leads to study result state FAIL

   ```javascript
   jatos.endStudy(false, "internal JS error");
   ```

1. Send result data and end study

   ```javascript
   var resultData = {id: 123, data: "my important result data"};
   jatos.endStudy(resultData);
   ```

1. Send result data, end study and send a message back that will be visible in JATOS result pages and log

   ```javascript
   var resultData = {id: 123, data: "my important result data"};
   jatos.endStudy(resultData, true, "everything worked fine");
   ```


### `jatos.endStudyAndRedirect`

Ends study and redirects the given URL. This is useful if you want to let the worker return to a recruitment platform (e.g. Prolific) or have your own end page. The same effect can be achieved with the Study Properties' _End Redirect URL_ field. It offers callbacks, either as parameter or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the ending.

**Hint**: There is a '**End Redirect URL**'  field in the Study Properties that also specifies the redirect URL. It's easier to use, but not as flexible.

* _@param {string} url_ - URL of the page to be redirected to after the study run was successfully finished
* _@param {optional boolean} successful_ - 'true' if study should finish successful - 'false' otherwise.
* _@param {optional string} message_ - Message that will be stored together with the study results and is accessible via JATOS' GUI result pages. The message can be max 255 characters long.
* _@param {optional function} onSuccess_ - Function to be called in case of successful submit
* _@param {optional function} onError_ - Function to be called in case of error
* _@return {Promise}_

**Examples**

1. End study and redirect afterwards

   ```javascript
   jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD");
   ```

1. End study and redirect afterwards. Send result data.

   ```javascript
   var resultData = {id: 123, data: "my important result data"};
   jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD", resultData);
   ```    

1. End study and redirect afterwards. A message will be sent back to JATOS and shown in the result page and put in the log.

   ```javascript
   jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD", true, "everything worked fine");
   ```

1. End study and indicate a failure and send a message. Does not redirect.

   ```javascript
   jatos.endStudyAndRedirect("https://app.prolific.co/submissions/complete?cc=1234ABCD", false, "internal JS error");
   ```


### `jatos.endStudyAjax`

Ends study with an Ajax call - afterwards the study is not redirected to the JATOS' end page. If the study was run by an MTurk worker the confirmation code will be in the response. It offers callbacks, either as parameter or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the ending.

* _@param {optional boolean} successful_ - 'true' if study should finish successful - 'false' otherwise.
* _@param {optional string} message_ - Message that will be stored together with the study results and is accessible via JATOS' GUI result pages. The message can be max 255 characters long.
* _@param {optional function} onSuccess_ - Function to be called in case of successful submit
* _@param {optional function} onError_ - Function to be called in case of error
* _@return {Promise}_

**Examples**

1. Just end study

   ```javascript
   jatos.endStudyAjax();
   ```

1. End study with a message that will be sent back to JATOS and shown in the result page and put in the log

   ```javascript
   jatos.endStudyAjax(true, "everything worked fine");
   ```

1. Indicate a failure and send a message

   ```javascript
   jatos.endStudyAjax(false, "some error description");
   ```
   
1. End study and show the confirmation code to the MTurk worker

   ```javascript
   jatos.endStudyAjax().then((confirmationCode) => {
     // Show the confirmation code to the worker
   });
   ```   

1. Use Promise to submit result data and afterwards, end the study and move to another URL ([see also](jatos.js-Reference.html#jatosendstudyandredirect))

   ```javascript
   var resultData = {id: 123, data: "my important result data"};
   jatos.submitResultData(resultData)
     .then(jatos.endStudyAjax)
     .then(() => { window.location.href = 'http://example.com/index.html' })
     .catch(() => console.log("Something went wrong"));
   ``` 

1. Send result data and end study

   ```javascript
   var resultData = {id: 123, data: "my important result data"};
   jatos.endStudyAjax(resultData);
   ```


## Result data and result upload/download files

### `jatos.submitResultData`

Posts result data for the currently running component back to the JATOS server. Already stored result data for this component will be **overwritten**. If you want to append result data use `jatos.appendResultData` instead. Alternatively you can send result data with functions that jump to another component (e.g. `jatos.startComponent`) or end the study (`jatos.endStudy`). It offers callbacks, either as parameter or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the transfer.

* _@param {object} resultData_ - String or object that will be sent as result data. An object will be serialized to JSON.
* _@param {optional function} onSuccess_ - Function to be called in case of successful submit
* _@param {optional function} onError_ - Function to be called in case of error
* _@return {Promise}_

**Examples**

1. Send result data back to the JATOS server

   ```javascript
   var resultData = {"a": 123, "b": 789, "c": 100};
   jatos.submitResultData(resultData);
   ```

1. It's often used together with `jatos.startNextComponent` to first submit result data back to the JATOS server and afterwards jump to the next component

   ```javascript
   var resultData = {"a": 123, "b": 789, "c": 100};
   jatos.submitResultData(resultData, jatos.startNextComponent);
   ```


1. Or together with `jatos.startComponentByPos` to start a particular component (here at position 4)

   ```javascript
   var resultData = {"a": 123, "b": 789, "c": 100};
   jatos.submitResultData(resultData, () => { jatos.startComponentByPos(4) });
   ```

1. Or by using the returned Promise

   ```javascript
   var resultData = {"a": 123, "b": 789, "c": 100};
   jatos.submitResultData(resultData)
      .then(() => console.log('success'))
      .catch(() => console.log('error'));
   ```


### `jatos.appendResultData`

Appends result data to the already posted result data. Contrary to `jatos.submitResultData` it does not overwrite the result data. Alternatively you can send result data with functions that jump to another component (e.g. `jatos.startComponent`) or end the study (`jatos.endStudy`). It offers callbacks, either as parameter or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the transfer. This function can be used several times during an component run to incrementally save result data.

* _@param {string} resultData_ - String or object that will be sent as result data. An object will be serialized to JSON (stringify).
* _@param {optional function} onSuccess_ - Function to be called in case of successful submit
* _@param {optional function} onError_ - Function to be called in case of error
* _@return {Promise}_

**Examples**

1. Append result data to the already sent

   ```javascript
   var resultData = { "a": 123, "b": 789, "c": 100 };
   jatos.appendResultData(resultData);
   ```

1. Use mulitple `jatos.appendResultData` in a row

   ```javascript
   jatos.appendResultData({"a": 1})
      .then(() => jatos.appendResultData({"b": 2}))
      .then(() => jatos.appendResultData({"c": 3}))
      .catch(() => console.log('Something went wrong'));
   ```

1. You can use it together with `jatos.startNextComponent` to first append result data and afterwards jump to the next component

   ```javascript
   var resultData = { "a": 123, "b": 789, "c": 100};
   jatos.appendResultData(resultData, jatos.startNextComponent);
   ```

1. Or by using the returned Promise

   ```javascript
   var resultData = {"a": 123, "b": 789, "c": 100};
   jatos.appendResultData(resultData)
      .then(() => jatos.startNextComponent())
      .catch(() => console.log('Something went wrong'));
   ```

1. Or together with `jatos.startComponentByPos` to start a particular component (here at position 4)

   ```javascript
   var resultData = {"a": 123, "b": 789, "c": 100};
   jatos.appendResultData(resultData)
      .then(() => jatos.startComponentByPos(4))
      .catch(() => console.log('Something went wrong'));
   ```


### `jatos.uploadResultFile`

Uploads a file to the JATOS server where they are stored in the server's file system (but not in the database). Similar to result data it can be downloaded in the JATOS UI, in the result pages. The files are stored per component - that means you can use the same filename without overwriting the file if the upload happens from different components. It offers callbacks, either as parameter or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the transfer.

* _@param {Blob, string or object} obj_ - Data to be uploaded as a file. Can be [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob), a string, or a object. A Blob	will be uploaded right away. A string is turned into a Blob. An object is	first turned into a JSON string	and	then into a Blob.
* _@param {string} filename_ - Name of the uploaded file
* _@param {optional function} onSuccess_ - Function to be called in case of success
* _@param {optional function} onError_ - Function to be called in case of error
* _@return {Promise}_

**Examples**

1. Upload text

   ```javascript
   jatos.uploadResultFile("this is my data", "example.txt")
      .then(() => console.log("File was successfully uploaded"))
      .catch(() => console.log("File upload failed"));
   ```

1. Upload object as JSON

   ```javascript
   var resultData = { "a": 123, "b": 789, "c": 100};
   jatos.uploadResultFile(resultData, "example.json")
      .then(() => console.log("File was successfully uploaded"))
      .catch(() => console.log("File upload failed"));
   ```

1. Upload text as Blob

   ```javascript
   var blob = new Blob(["Hello, world!"], {type: 'text/plain'});
   jatos.uploadResultFile(blob, "example.txt")
      .then(() => console.log("File was successfully uploaded"))
      .catch(() => console.log("File upload failed"));
   ```

1. Turn canvas into Blob and upload as image file. It assumes you have an canvas element with ID 'canvas'.

   ```javascript
   var canvas = document.getElementById('canvas');
   canvas.toBlob((blob) => {
      jatos.uploadResultFile(blob, "canvas.png")
         .then(() => console.log("File was successfully uploaded"))
         .catch(() => console.log("File upload failed"));
   });
   ```

1. For more real-world examples have a look at the ['Drawing' and the 'Video Recording' examples](Example-Studies.html)


### `jatos.downloadResultFile`

Downloads a file from the JATOS server. One can only download a file that was previously uploaded with `jatos.uploadResultFile` in the same study run. If the file contains text it returns the content as a string. If the file contains JSON, it returns the JSON already parsed as an object. All other [MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) are returned as a Blob. It offers callbacks, either as parameter or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the transfer.

* _@param {string} filename_ - Name of the uploaded file
* _@param {optional function} onSuccess_ - Function to be called in case of success
* _@param {optional function} onError_ - Function to be called in case of error
* _@return {Promise}_

Additionally you can specify the component position from where the file was uploaded (in case different components uploaded files with the same filename)

* _@param {number} componentPos_ - Position of the component where the file was uploaded
* _@param {string} filename_ - Name of the uploaded file
* _@param {optional function} onSuccess_ - Function to be called in case of success
* _@param {optional function} onError_ - Function to be called in case of error
* _@return {Promise}_

**Examples**

1. Download text file

   ```javascript
   jatos.downloadResultFile("example.txt")
      .then((text) => console.log(text))
      .catch(() => console.log("File download failed"));
   ```

1. Download JSON file

   ```javascript
   jatos.downloadResultFile("example.json")
      .then((obj) => console.log(JSON.stringify(obj)))
      .catch(() => console.log("File download failed"));
   ```

1. Download image and display it in a canvas element

   ```javascript
   jatos.downloadResultFile("canvas.png")
      .then((blob) => { document.getElementById("canvas").src = URL.createObjectURL(blob) })
      .catch(() => console.log("File download failed"));
   ```

1. Download file and specify that the file was uploaded in the first component

   ```javascript
   jatos.downloadResultFile(1, "example.txt")
      .then((text) => console.log(text))
      .catch(() => console.log("File download failed"));
   ```

1. For more real-world examples have a look at the ['Drawing' and the 'Video Recording' examples](Example-Studies.html)



## Batch variables

### `jatos.batchProperties`

All the properties you entered for this batch.

  * `jatos.batchProperties.allowedWorkerTypes` - List of worker types that are currently allowed to run in this batch.
  * `jatos.batchProperties.maxActiveMembers` - How many members a group can have at the same time
  * `jatos.batchProperties.maxTotalMembers` - How many members a group is allowed to have at the same time
  * `jatos.batchProperties.maxTotalWorkers` - Total amount of workers a group is allowed to have altogether in this batch
  * `jatos.batchProperties.title` - Title of this batch

### `jatos.batchJsonInput`

The JSON input you entered in the batch's properties.



## Batch Session functions

The Batch Session is stored in JATOS' database on the server side (see also [Session Data - Three Types](Session-Data-Three-Types.html)). That means that all changes in the Batch Session have to be synchronized between the client and the server. This is done via the batch channel. Therefore all writing functions (`add`, `remove`, `clear`, `replace`, `copy`, `move`, `set`, `setAll`) can be paired with callback functions that will signal  success or failure in the client-server sync. These callback functions can be either passed as parameters to `jatos.batchSession.[function_name]` or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

On the other side for all reading functions (`get`, `find`, `getAll`, `test`) there is no need to sync data between client and server, because _jatos.js_ keeps a copy of the Batch Session locally. Therefore all reading functions do not offer callbacks, because there is no risk of failure of synchronization.

Additionally to the reading and writing functions the calback function `jatos.onBatchSession(callback)` offers a way to get notified whenever the Batch Session changes in the JATOS' database regardless of the origin of the change. This way, you can have the client of each worker react to changes in the batch that were done by another worker in the batch. 

Accessing the Batch Session is done via [JSON Patches (RFC 6902)](https://tools.ietf.org/html/rfc6902) and 
[JSON Pointer (RFC 6901)](https://tools.ietf.org/html/rfc6901). An introduction can be found under [jsonpatch.com](http://jsonpatch.com/). For JSON Patches _jatos.js_ uses the [JSON-Patch](https://github.com/Starcounter-Jack/JSON-Patch) library from Joachim Wester and for JSON Pointers the [jsonpointer.js](https://github.com/alexeykuzmin/jsonpointer.js) library from Alexey Kuzmin.


### `jatos.onBatchSession`

Defines a callback function that is called every time the Batch Session changes on the JATOS server side (that includes updates in the session originating from other workers that run the study in parallel).

The callback function has two parameter:
* _@param {string} path_ - JSON pointer to the changed field in the Batch Session
* _@param {string} op_ - JSON patch operation ('add', 'remove', 'clear', ...) that was applied

**Examples**

1. Log whenever something changes in the Batch session

   ```javascript
   jatos.onBatchSession(function(path, op){
     console.log("Batch Session was updated in path " + path + " with operation " + op);
   });
   ```

1. `onBatchSession` is often used together with `jatos.batchSession.find` to get the updated value:

   ```javascript
   jatos.onBatchSession(function(path){
     var changedObj = jatos.batchSession.find(path);
     console.log("The changed object is " + JSON.stringify(changedObj));
   });
   ```


### `jatos.batchSession.get`

Convenience function: like `jatos.batchSession.find` but works with a key instead of a JSON Pointer. Therefore it works only on the first level of the session's object tree. It takes a name of an field within the Batch Session and returns the matching value.  For all other levels of the object tree use jatos.batchSession.find. Gets the object from the locally stored copy of the session and does not call the server.

* _@param {string} name_ - name of the field 
* _@return {object}_ - the value that is stored under name

**Examples**

1. Get the value that belongs to a key in the Batch Session

   If the Batch Session is `{"a": 1000, "b": "watermelon"}`

   ```javascript
   // Since the parameter is the key's name and not a path it does not start with a "/"
   var b = jatos.batchSession.get("b"); // b is "watermelon"
   var c = jatos.batchSession.get("c"); // c is undefined
   ```

1. With `jatos.batchSession.get` you can only access the first level of the object tree - if you want another level use `jatos.batchSession.find`. If the Batch Session is `{"a": {"a1": 123, "a2": "watermelon"}}`

   ```javascript
   var a1 = jatos.batchSession.get("a1"); // a1 is undefined !!!
   var a = jatos.batchSession.get("a"); // a is { "a1": 123, "a2": "watermelon" }
   ```


### `jatos.batchSession.set`

A convenience function for `jatos.batchSession.add`. Instead of a JSON Pointer path it accepts a name of the field to be stored (without a slash in front). Therefore it works only on the first level of the Batch Session's object tree. If the name already exists in the Batch Session the value will be overwritten.

* _@param {string} name_ - name of the field 
* _@param {object} value_ - value to be stored
* _@param {optional callback} onSuccess_ - Function to be called if this patch was successfully applied on the server and the client side
* _@param {optional callback} onError_ - Function to be called if this patch failed
* _@return {Promise}_

**Examples**

1. Set a key and its value in the Batch Session

   If the Batch Session is `{"a": 1234}`

   ```javascript
   // Since the parameter is the key's name and not a path it does not start with a "/"
   var b = jatos.batchSession.set("b", "koala");
   ```

   then after the Batch Session is successfully updated the new object is `{"a": 1234, "b": "koala"}`.

   Since there is a slight chance that the session update was not successful it's a good idea to provide callback functions for both cases. To provide success or fail callback functions you can either specify the onSuccess/onError parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

1. Use returned Promise to handle success or failure

   ```javascript
   jatos.batchSession.set("b", "koala")
      .then(() => console.log("Batch Session was successfully updated"))
      .catch(() => console.log("Batch Session synchronization failed"));
   ```

1. Have a series of Batch Session changes

   ```javascript
   jatos.batchSession.set("a", 1)
      .then(() => jatos.batchSession.set("b", 2))
      .then(() => jatos.batchSession.set("c", 3))
      .catch(() => console.log("Batch Session synchronization failed"));
   ```


### `jatos.batchSession.getAll`

Returns the complete Batch Session data. Gets the object from the locally stored copy of the session and does not call the server.

* _@return {object}_ Returns the whole Batch Session object

**Example**

```javascript
var batchSession = jatos.batchSession.getAll();
```


### `jatos.batchSession.setAll`

Replaces the whole session data. If the replacing object is rather large it might be better performance-wise to replace only individual paths. Each session writting involves sending the changes in the session via a JSON Patch to the JATOS server. If the session is large this data transfer can take some time. In this case use other session functions, like 'set', 'add', or 'replace'.

* _@param {object} value_ - value to be stored in the session
* _@param {optional callback} onSuccess_ - Function to be called if this patch was successfully applied on the server and the client side
* _@param {optional callback} onError_ - Function to be called if this patch failed
* _@return {Promise}_

**Examples**

1. Set the whole Batch Session object

   ```javascript
   var o = {"a": 123, "b": "foo"};
   jatos.batchSession.setAll(o); // Overwrites the current Batch Session with the object o
   ```

   Since there is a slight chance that the session update was not successful it's a good idea to provide callback functions for both cases. To provide success or fail callback functions you can either specify the onSuccess/onError parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

1. Use returned Promise to handle success or failure

   ```javascript
   var o = {"a": 123, "b": "foo"};
   jatos.batchSession.setAll(o)
      .then(() => console.log("Batch Session was successfully updated"))
      .catch(() => console.log("Batch Session synchronization failed"));
   ```


### `jatos.batchSession.clear`

Clears the whole Batch Session data and sets it to an empty object `{}`.

* _@param {optional callback} onSuccess_ - Function to be called if this patch was successfully applied on the server and the client side
* _@param {optional callback} onError_ - Function to be called if this patch failed
* _@return {Promise}_

**Examples**

1. Clear the whole Batch Session

   ```javascript
   jatos.batchSession.clear();
   ```

   Since there is a slight chance that the session update was not successful it's a good idea to provide callback functions for both cases. To provide success or fail callback functions you can either specify the onSuccess/onError parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

1. Use returned Promise to handle success or failure

   ```javascript
   jatos.batchSession.clear()
      .then(() => console.log("Batch Session was successfully updated"))
      .catch(() => console.log("Batch Session synchronization failed"));
   ```


### `jatos.batchSession.find`

Gets a field in the Batch Session data. Takes a JSON Pointer and returns the matching value. Gets the object from the locally stored copy of the session and does not call the server. Contrary to `jatos.batchSession.get` it allows to get values from all levels of the Batch Session's object tree.

* _@param {string} path_ - JSON pointer path 
* _@return {object}_ - the value that is stored in path

**Example**

1. Find a field in the Batch Session

   If the Batch Session is `{"a": {"a1": "foo", "a2": "bar"}, "b": 999}`

   ```javascript
   jatos.batchSession.find("/a/a1"); // returns "foo"
   jatos.batchSession.find("/b"); // returns 999
   ```


### `jatos.batchSession.defined`

Checks in the Batch Session whether a field under the given path exists. Returns true if the field is defined and false otherwise. It's equivalent to `!jatos.batchSession.test(path, undefined)`.

* _@param {string} path_ - JSON pointer path to be checked
* _@return {boolean}_ - 'true' if the field is defined and 'false' otherwise

**Example**

```javascript
jatos.batchSession.defined("/a"); // returns true if the pointer '/a' exists
```


### `jatos.batchSession.test`

JSON Patch test operation: Tests that the specified value is set in the document (see [jsonpatch.com](http://jsonpatch.com/)).

* _@param {string} path_ - JSON pointer path to be tested
* _@param {object} value_ - value to be tested
* _@return {boolean}_

**Examples**

1. Test if a certain field in the Batch Session has a value

   If the Batch Session is `{"a": 123, "b": {"b1": "flowers", "b2": "animals"}}`

   ```javascript
   jatos.batchSession.test("/a", 123); // returns true
   jatos.batchSession.test("/a", 10); // returns false
   jatos.batchSession.test("/b/b1", "flowers"); // returns true
   ```

1. If you want to know the existence of a path in the Batch Session you can test against `undefined`:

   ```javascript
   if (!jatos.batchSession.test("/c", undefined)) {
     // Path "/c" exists
   } else {
     // Path "/c" doesn't exist
   }
   ```


### `jatos.batchSession.add`

JSON Patch add operation: Adds a value to an object or inserts it into an array. In the case of an array, the value is inserted before the given index. The `-` character can be used instead of an index to insert at the end of an array (see [jsonpatch.com](http://jsonpatch.com/)). If the path already exists in the Batch Session the value will be overwritten.

* _@param {string} path_ - JSON pointer path 
* _@param {object} value_ - value to be stored
* _@param {optional callback} onSuccess_ - Function to be called if this patch was successfully applied on the server and the client side
* _@param {optional callback} onError_ - Function to be called if this patch failed
* _@return {Promise}_

**Examples**

1. Add to an empty Batch Session

   ```javascript
   jatos.batchSession.add("/a", 100);
   ```

   After the Batch Session is successfully updated the new object is `{"a": 100}`.

1. Add to Batch Session

   If the Batch Session is `{"a": 100}` and one calls

   ```javascript
   jatos.batchSession.add("/b", 123);
   ```

   then after the Batch Session is successfully updated the new object is `{"a": 100, "b": 123}`.

   Since there is a slight chance that the session update was not successful it's a good idea to provide callback functions for both cases. To provide success or fail callback functions you can either specify the onSuccess/onError parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

1. Use returned Promise to handle success or fail

   ```javascript
   jatos.batchSession.add("/b", 123)
      .then(() => console.log("Batch Session was successfully updated"))
      .catch(() => console.log("Batch Session synchronization failed"));
   ```
   
1. Add an object:

   ```javascript
   jatos.batchSession.add("/obj", { foo: "bar" })
      .then(() => console.log("Batch Session was successfully updated"))
      .catch(() => console.log("Batch Session synchronization failed"));
   ```
   
   Afterwards the Batch Session contains `{"obj": {"foo": "bar"}}`.
   
1. Add an array:

   ```javascript
   jatos.batchSession.add("/array", [1, 2, 3])
      .then(() => console.log("Batch Session was successfully updated"))
      .catch(() => console.log("Batch Session synchronization failed"));
   ```
   Afterwards the Batch Session contains `{"array": [1, 2, 3]}`.

1. Add an element to an array:

   If the Batch Session is `{"array": [1, 2, 3]}` and one calls

   ```javascript
   jatos.batchSession.add("/array/2", "new")
      .then(() => console.log("Batch Session was successfully updated"))
      .catch(() => console.log("Batch Session synchronization failed"));
   ```
   
   then afterwards the Batch Session contains `{"array": [1, 2, "new", 3]}`.

1. Append to the end of an array using `/-`:

   If the Batch Session is `{"array": [1, 2, 3]}` and one calls

   ```javascript
   jatos.batchSession.add("/array/-", "new")
      .then(() => console.log("Batch Session was successfully updated"))
      .catch(() => console.log("Batch Session synchronization failed"));
   ```
   
   then afterwards the Batch Session contains `{"array": [1, 2, 3, "new"]}`.

1. Have a series of Batch Session updates

   ```javascript
   jatos.batchSession.add("/a", 1)
      .then(() => jatos.batchSession.add("/b", 2))
      .then(() => jatos.batchSession.add("/c", 3))
      .catch(() => console.log("Batch Session synchronization failed"));
   ```


### `jatos.batchSession.remove`

JSON Patch remove operation: Removes a value from an object or array (see [jsonpatch.com](http://jsonpatch.com/)).

* _@param {string} path_ - JSON pointer path to the field that should be removed
* _@param {optional callback} onSuccess_ - Function to be called if this patch was successfully applied on the server and the client side
* _@param {optional callback} onError_ - Function to be called if this patch failed
* _@return {Promise}_

**Examples**

1. Remove from the Batch Session

   If the Batch Session is `{"a": 100, "b": 123}` and one calls

   ```javascript
   jatos.batchSession.remove("/b");
   ```

   then after the Batch Session is successfully updated the new object is `{"a": 100}`.

   Since there is a slight chance that the session update was not successful it's a good idea to provide callback functions for both cases. To provide success or fail callback functions you can either specify the onSuccess/onError parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

1. Use returned Promise to handle success or failure

   ```javascript
   jatos.batchSession.remove("/b")
      .then(() => console.log("Batch Session was successfully updated"))
      .catch(() => console.log("Batch Session synchronization failed"));
   ```


### `jatos.batchSession.replace`

JSON Patch replace operation: Replaces a value. Equivalent to a 'remove' followed by an 'add' (see [jsonpatch.com](http://jsonpatch.com/)).

* _@param {string} path_ - JSON pointer path 
* _@param {object} value_ - value to be replaced with
* _@param {optional callback} onSuccess_ - Function to be called if this patch was successfully applied on the server and the client side
* _@param {optional callback} onError_ - Function to be called if this patch failed
* _@return {Promise}_

**Examples**

1. Replace in the Batch Session

   If the Batch Session is `{"a": 100, "b": 123}` and one calls

   ```javascript
   jatos.batchSession.replace("/b", 789);
   ```

   then after the Batch Session is successfully updated the new object is `{"a": 100, "b": 789}`.

   Since there is a slight chance that the session update was not successful it's a good idea to provide callback functions for both cases. To provide success or fail callback functions you can either specify the onSuccess/onError parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

1. Use returned Promise to handle success or failure

   ```javascript
   jatos.batchSession.replace("/b", 789)
      .then(() => console.log("Batch Session was successfully updated"))
      .catch(() => console.log("Batch Session synchronization failed"));
   ```


### `jatos.batchSession.copy`

JSON Patch copy operation: Copies a value from one location to another within the JSON document. Both from and path are JSON Pointers (see [jsonpatch.com](http://jsonpatch.com/)).

* _@param {string} from_ - JSON pointer path to the origin 
* _@param {string} path_ - JSON pointer path to the target
* _@param {optional callback} onSuccess_ - Function to be called if this patch was successfully applied on the server and the client side
* _@param {optional callback} onError_ - Function to be called if this patch failed
* _@return {Promise}_

**Examples**

1. Copy within the Batch Session from one location to another

   If the Batch Session is `{"a": "jatos"}` and one calls

   ```javascript
   jatos.batchSession.copy("/a", "/b");
   ```

   then after the Batch Session is successfully updated the new object is `{"a": "jatos", "b": "jatos"}`.

   Since there is a slight chance that the session update was not successful it's a good idea to provide callback functions for both cases. To provide success or fail callback functions you can either specify the onSuccess/onError parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

1. Use returned Promise to handle success or failure

   ```javascript
   jatos.batchSession.copy("/a", "/b")
      .then(() => console.log("Batch Session was successfully updated"))
      .catch(() => console.log("Batch Session synchronization failed"));
   ```


### `jatos.batchSession.move`

JSON Patch move operation: Moves a value from one location to the other. Both from and path are JSON Pointers. (see [jsonpatch.com](http://jsonpatch.com/)).

* _@param {string} from_ - JSON pointer path to the origin 
* _@param {string} path_ - JSON pointer path to the target
* _@param {optional callback} onSuccess_ - Function to be called if this patch was successfully applied on the server and the client side
* _@param {optional callback} onError_ - Function to be called if this patch failed
* _@return {Promise}_

**Examples**

1. Move within the Batch Session from one location to another

   If the Batch Session is `{"a": "jatos"}` and one calls

   ```javascript
   jatos.batchSession.move("/a", "/b");
   ```

   then after the Batch Session is successfully updated the new object is `{"b": "jatos"}`.

   Since there is a slight chance that the session update was not successful it's a good idea to provide callback functions for both cases. To provide success or fail callback functions you can either specify the onSuccess/onError parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

1. Use returned Promise to handle success or failure

   ```javascript
   jatos.batchSession.move("/a", "/b")
      .then(() => console.log("Batch Session was successfully updated"))
      .catch(() => console.log("Batch Session synchronization failed"));
   ```


### `jatos.batchSessionVersioning`

This flag can be used to turn off versioning of the batch session. This speeds up updates to the batch session (patches) in certain cases where all concurrent patches are conflict-free between each other. If versioning is turned on (set to true) all session data patches are accompanied by a version. On the JATOS server side only a patch with the current version (as stored in the database) is applied. If there are multiple concurrent patches only the first one is applied. If versioning is turned off all patches arriving at the JATOS server are applied right away without checking the version. This is faster but can lead to unintended session data changes. By default versioning is turned on.

**Example**

```javascript
jatos.batchSessionVersioning = false; // Turns off versioning
```


## Group variables

The group variables are only filled with values if the current study run is a group study.

### `jatos.groupMemberId`

Group member ID is unique for this member (it is actually identical with the study result ID)

### `jatos.groupResultId`

ID of this group result (It's called group result to be consistent with the study result and the component result - although often it's just called group)

### `jatos.groupMembers`

List of member IDs of the current members of the group

### `jatos.groupChannels`

List of member IDs of the currently open group channels


## Group functions

### `jatos.joinGroup`

Tries to join a group and if it succeeds opens the group channel (which is mostly a WebSocket). Only if the group channel is open one can exchange data with other group members. As the only parameter this function takes an object that consists of several optional callback functions that will be called by _jatos.js_ when certain group events occur. It returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in joining.

* _@param {object} callbacks_ - Defining callback functions for group events. All callbacks are optional. These callbacks functions are:
  * `onOpen`: Is called when the group channel is successfully opened
  * `onClose`: Is be called when the group channel is closed
  * `onError`: Is called if an error during opening of the group channel's WebSocket occurs or if an error is received via the group channel (e.g. the Group Session data couldn't be updated). If this function is not defined _jatos.js_ will try to call the global `onJatosError` function.
  * `onMessage(msg)`: Is called if a message from another group member is received. It gets the message as a parameter.
  * `onMemberJoin(memberId)`: Is called when another member (not the worker running this study) joined the group. It gets the group member ID as a parameter.
  * `onMemberOpen(memberId)`: Is called when another member (not the worker running this study) opened a group channel. It gets the group member ID as a parameter.
  * `onMemberLeave(memberId)`: Is called when another member (not the worker running his study) left the group. It gets the group member ID as a parameter.
  * `onMemberClose(memberId)`: Is called when another member (not the worker running this study) closed his group channel. It gets the group member ID as a parameter.
  * `onGroupSession(path, op)`: Is called every time the Group Session changes on the JATOS server side. It gets two parameters: 1) JSON pointer path to the changed field in the Group Session as a parameter, and 2) JSON patch operation.
  * `onUpdate()`: Combines several other callbacks. It's called if one of the following is called: `onMemberJoin`, `onMemberOpen`, `onMemberLeave`, `onMemberClose`, or `onGroupSession`.
* _@return {Promise}_

**Examples**

1. Minimal example that joins a group and receives updates via the Group Session

   ```javascript
   jatos.joinGroup({
     "onGroupSession": onGroupSession
   });

   function onGroupSession(path, op) {
     var changedObj = jatos.groupSession.find(path);
     console.log("Group Session was updated in path " + path + " with operation " + op + " to " + JSON.stringify(changedObj));
   }
   ```

1. Example that defines the `onOpen`, `onMemberOpen`, and `onMessage` callbacks

   ```javascript
   jatos.joinGroup({
     "onOpen": onOpen,
     "onMemberOpen": onMemberOpen,
     "onMessage": onMessage
   });

   function onOpen() {
     console.log("You joined a group and opened a group channel");
   }

   function onMemberOpen(memberId) {
     console.log("In our group another member (ID " + memberId + ") opened a group channel");
   }

   function onMessage(msg) {
     console.log("You received a message: " + msg);
   }
   ```


### `jatos.sendGroupMsg`

Sends a message to all group members with an open group channel. Use `jatos.sendGroupMsgTo` to send a message to a particular member.

Between group members data can be exchanged in fundamentally two different ways: sendGroupMsg/sendGroupMsgTo or the [Group Session](#functions-to-access-the-group-session). The main difference is that the Group Session is stored in JATOS database on the server side while with sendGroupMsg/sendGroupMsgTo the data are only relayed on the server side but is never stored. E.g. if the worker reloads the page all prior messages sent by sendGroupMsg/sendGroupMsgTo will be lost - on the other side, everything stored in the Group Session will be restored. But this storage of the Group Session in JATOS comes at the cost of being (slightly) slower. Which option to choose depends mostly on your study design. If you expect your workers to have an unreliable Internet connection or to reload the page then you should use the Group Session. If you just want to 'stream' current data to other members the use sendGroupMsg/sendGroupMsgTo.

* _@param {object} msg_ - Any JavaScript object

**Example**

   ```javascript
   var msg = "Message for every group member"; // Send a text message
   jatos.sendGroupMsg(msg)

   var objMsg = {"city": "Berlin", "population": 3500000}; // Send an object
   jatos.sendGroupMsg(objMsg)
   ```


### `jatos.sendGroupMsgTo`

Like `jatos.sendGroupMsg` but sends a message to a particular group member specified by the group member ID. You can find a list of all IDs of group members with an open channel `jatos.groupChannels`. Alternativally you get member IDs via the `onMemberOpen` callback function.

* _@param {string} recipient_ - Recipient's group member ID
* _@param {object} msg_ - Any JavaScript object

**Examples**

1. Send a message to a group member with ID 1063

   ```javascript
   var msg = "Message for group member 1063";
   jatos.sendGroupMsgTo("1063", msg)
   ```

1. Use the `onMemberOpen` callback to send a message right after a new member opened their group channel

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


### `jatos.leaveGroup`

Leaves the group it has previously joined. It offers callbacks, either as parameter or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the leaving.

* _@param {optional function} onSuccess_ - Function to be called after the group is left
* _@param {optional function} onError_ - Function to be called in case of error
* _@return {Promise}_

**Example**

```javascript
jatos.leaveGroup();
```


### `jatos.reassignGroup`

Asks the JATOS server to reassign this study run to a different group. JATOS can only reassign if there is another group availible. It offers callbacks, either as parameter or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the reassigning.

* _@param {optional function} onSuccess_ - Function to be called if the reassignment was successful
* _@param {optional function} onFail_ - Function to be called if the reassignment was unsuccessful
* _@return {Promise}_

**Example**

```javascript
jatos.reassignGroup()
   .then(() => console.log("Successful group reassignment: new group ID is " + jatos.groupResultId))
   .catch(() => console.log("Group reassignment failed"));
```


### `jatos.setGroupFixed`

Ask the JATOS server to fix this group. A fixed group is not allowed to take on more members although members are still allowed to leave. It offers callbacks, either as parameter or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), to signal success or failure in the fixing.

* _@param {optional function} onSuccess_ - Function to be called if the fixing was successful
* _@param {optional function} onFail_ - Function to be called if the fixing was unsuccessful
* _@return {Promise}_

**Example**

```javascript
jatos.setGroupFixed();
```


### `jatos.hasJoinedGroup`

Returns true if this study run joined a group and false otherwise. It doesn't necessarily mean that we have an open group channel. We might just have joined a group in a prior component but in this component never opened the channel. If you want to check for an open group channel use `jatos.hasOpenGroupChannel`.

**Example**

```javascript
if(jatos.hasJoinedGroup()) {
  // We are member in a group
} else {
  // We are not member in a group
};
```


### `jatos.hasOpenGroupChannel`

Returns true if we currently have an open group channel and false otherwise. Since you can't open a group channel without joining a group, it also means that we joined a group. On the other side although we have closed group channel we can still be a member in a group. Use `jatos.hasJoinedGroup` to check group membership.

**Example**

```javascript
if(jatos.hasOpenGroupChannel()) {
  // We are member in a group and have an open group channel
} else {
  // We do not have an open group channel (but could still be member in a group)
};
```


### `jatos.isMaxActiveMemberReached`

Returns true if the group has reached the maximum amount of active members like specified in the batch properties. It's not necessary that each member has an open group channel.

**Example**

```javascript
if(jatos.isMaxActiveMemberReached()) {
  // Maximum number of active members is reached
};
```


### `jatos.isMaxActiveMemberOpen`

Returns true if the group has reached the maximum amount of active members like specified in the batch properties and each member has an open group channel.

**Example**

```javascript
if(jatos.isMaxActiveMemberOpen()) {
  // Maximum number of active members is reached and each has an open channel
};
```


### `jatos.isGroupOpen`

Returns true if all active members of the group have an open group channel and can send and receive data. It's not necessary that the group has reached its minimum or maximum active member size.

**Example**

```javascript
if(jatos.isGroupOpen()) {
  // Each of the current members of the group have an open group channel
};
```


## Functions to access the Group Session

The Group Session is one of three way to communicate between members of a group. The others are direct messaging (with [jatos.sendGroupMsgTo](#jatossendgroupmsgtorecipient-msg)) and broadcast messaging ([jatos.sendGroupMsg](#jatossendgroupmsgmsg)) (or: [more general information about the different session types](/Session-Data-Three-Types.html)).

In difference to the [Batch Session](#functions-to-access-the-batch-session) the Group Session doesn't work from the start of a component. To use the Group Session you have to join a group ([with jatos.joinGroup](#jatosjoingroupcallbacks)). There you can also define a `onGroupSession` callback that gets called each time the Group Session changes regardless of the origin of the change.

The Group Session is stored in JATOS' database on the server side. That means that all changes in the Group Session have to be synchronized between the client and the server. This is done via the group channel. Therefore all writing functions (`add`, `remove`, `clear`, `replace`, `copy`, `move`, `set`, `setAll`) can be paired with callback functions that will signal  success or failure in the client-server sync. These callback functions can be either passed as parameters to `jatos.groupSession.[function_name]` or via a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

On the other side for all reading functions (`get`, `find`, `getAll`, `test`) there is no need to sync data between client and server, because _jatos.js_ keeps a copy of the Group Session locally. Therefore all reading functions do not offer callbacks, because there is no risk of failure of synchronization.

Accessing the Group Session is done via [JSON Patches (RFC 6902)](https://tools.ietf.org/html/rfc6902) and 
[JSON Pointer (RFC 6901)](https://tools.ietf.org/html/rfc6901). An introduction can be found under [jsonpatch.com](http://jsonpatch.com/). For JSON Patches _jatos.js_ uses the [JSON-Patch](https://github.com/Starcounter-Jack/JSON-Patch) library from Joachim Wester and for JSON Pointers the [jsonpointer.js](https://github.com/alexeykuzmin/jsonpointer.js) library from Alexey Kuzmin.


### `jatos.groupSession.get`

Convenience function: like `jatos.groupSession.find` but works with a key instead of a JSON Pointer (without the slash in front of the key name). Therefore it works only on the first level of the session's object tree. It takes a name of an field within the Group Session and returns the matching value.  For all other levels of the object tree use jatos.groupSession.find. Gets the object from the locally stored copy of the session and does not call the server.

* _@param {string} name_ - name of the field 
* _@return {object}_ - the value that is stored under name

**Examples**

1. Get a field from the Group Session

   Given the Group Session is `{"a": 1000, "b": "watermelon"}`

   ```javascript
   // Since the parameter is the key's name and not a path it does not start with a "/"
   var b = jatos.groupSession.get("b"); // b is "watermelon"
   var c = jatos.groupSession.get("c"); // c is undefined
   ```

   the first line returns "watermelon" and the second undefined.

1. With `jatos.groupSession.get` you can only access the first level of the object tree - if you want another level use `jatos.groupSession.find`.

   If the Group Session is `{"a": {"a1": 123, "a2": "watermelon"}}`

   ```javascript
   var a1 = jatos.groupSession.get("a1"); // a1 is undefined !!!
   var a = jatos.groupSession.get("a"); // a is { "a1": 123, "a2": "watermelon" }
   ```


### `jatos.groupSession.set`

A convenience function for `jatos.groupSession.add`. Instead of a JSON Pointer path it accepts a name of the field to be stored (without the slash in front). Therefore it works only on the first level of the Group Session's object tree. If the name already exists in the Group Session the value will be overwritten.

* _@param {string} name_ - name of the field 
* _@param {object} value_ - value to be stored
* _@param {optional callback} onSuccess_ - Function to be called if this patch was successfully applied on the server and the client side
* _@param {optional callback} onError_ - Function to be called if this patch failed
* _@return {Promise}_

**Examples**

1. Set a field in the Group Session

   If the Group Session is `{"a": 1234}`

   ```javascript
   // Since the parameter is the key's name and not a path it does not start with a "/"
   var b = jatos.groupSession.set("b", "koala");
   ```

   then after the Group Session is successfully updated the new object is `{"a": 1234, "b": "koala"}`.

   Since there is a slight chance that the session update was not successful it's a good idea to provide callback functions for both cases. To provide success or fail callback functions you can either specify the onSuccess/onError parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

1. Use returned Promise to handle success or failure

   ```javascript
   jatos.groupSession.set("b", "koala")
      .then(() => console.log("Group Session was successfully updated"))
      .catch(() => console.log("Group Session synchronization failed"));
   ```

1. Have a series of Group Session changes

   ```javascript
   jatos.groupSession.set("a", 1)
      .then(() => jatos.groupSession.set("b", 2))
      .then(() => jatos.groupSession.set("c", 3))
      .catch(() => console.log("Group Session synchronization failed"));


### `jatos.groupSession.getAll`

Returns the complete Group Session data (might be bad performance-wise). Gets the object from the locally stored copy of the session and does not call the server.

* _@return {object}_ Returns the whole Group Session object

**Example**

```javascript
var groupSession = jatos.groupSession.getAll();
```


### `jatos.groupSession.setAll`

Replaces the whole session data. If the replacing object is rather large it might be better performance-wise to replace only individual paths. Each session writting involves sending the changes in the session via a JSON Patch to the JATOS server. If the session is large this data transfer can take some time. In this case use other session functions, like 'set', 'add', or 'replace'.

* _@param {object} value_ - value to be stored in the session
* _@param {optional callback} onSuccess_ - Function to be called if this patch was successfully applied on the server and the client side
* _@param {optional callback} onError_ - Function to be called if this patch failed
* _@return {Promise}_

**Examples**

1. Set the whole Group Session at once

   ```javascript
   var o = {"a": 123, "b": "foo"};
   jatos.groupSession.setAll(o); // Overwrites the current Group Session with the object o
   ```

   Since there is a slight chance that the session update was not successful it's a good idea to provide callback functions for both cases. To provide success or fail callback functions you can either specify the onSuccess/onError parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

1. Use returned Promise to handle success or failure

   ```javascript
   var o = {"a": 123, "b": "foo"};
   jatos.groupSession.setAll(o)
      .then(() => console.log("Group Session was successfully updated"))
      .catch(() => console.log("Group Session synchronization failed"));
   ```


### `jatos.groupSession.clear`

Clears the whole Group Session data and sets it to an empty object `{}`.

* _@param {optional callback} onSuccess_ - Function to be called if this patch was successfully applied on the server and the client side
* _@param {optional callback} onError_ - Function to be called if this patch failed
* _@return {Promise}_

**Examples**

1. Clear the whole Group Session

   ```javascript
   jatos.groupSession.clear();
   ```

   Since there is a slight chance that the session update was not successful it's a good idea to provide callback functions for both cases. To provide success or fail callback functions you can either specify the onSuccess/onError parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

1. Use returned Promise to handle success or failure

   ```javascript
   jatos.groupSession.clear()
      .then(() => console.log("Group Session was successfully updated"))
      .catch(() => console.log("Group Session synchronization failed"));
   ```


### `jatos.groupSession.find`

Gets a field in the Group Session data. Takes a JSON Pointer and returns the matching value. Gets the object from the locally stored copy of the session and does not call the server. Contrary to `jatos.groupSession.get` it allows to get values from all levels of the Group Session's object tree.

* _@param {string} path_ - JSON pointer path 
* _@return {object}_ - the value that is stored in path

**Example**

Given the Group Session is `{"a": {"a1": "foo", "a2": "bar"}, "b": 999}`

```javascript
jatos.groupSession.find("/a/a1"); // returns "foo"
jatos.groupSession.find("/b"); // returns 999
```

the first line returns "foo" and the second 999.


### `jatos.groupSession.defined`

Checks in the Group Session whether a field under the given path exists. Returns true if the field is defined and false otherwise. It's equivalent to `!jatos.groupSession.test(path, undefined)`.

* _@param {string} path_ - JSON pointer path to be checked
* _@return {boolean}_

**Example**

```javascript
jatos.groupSession.defined("/a"); // returns true if the pointer '/a' exists
```


### `jatos.groupSession.test`

JSON Patch test operation: Tests that the specified value is set in the document (see [jsonpatch.com](http://jsonpatch.com/)).

* _@param {string} path_ - JSON pointer path to be tested
* _@param {object} value_ - value to be tested
* _@return {boolean}_

**Example**

Given the Group Session is `{"a": 123, "b": {"b1": "flowers", "b2": "animals"}}`

```javascript
jatos.groupSession.test("/a", 123); // returns true
jatos.groupSession.test("/a", 10); // returns false
jatos.groupSession.test("/b/b1", "flowers"); // returns true
```

the first line returns true, second false and third true.


### `jatos.groupSession.add`

JSON Patch add operation: Adds a value to an object or inserts it into an array. In the case of an array, the value is inserted before the given index. The `-` character can be used instead of an index to insert at the end of an array (see [jsonpatch.com](http://jsonpatch.com/)). If the path already exists in the Group Session the value will be overwritten.

* _@param {string} path_ - JSON pointer path 
* _@param {object} value_ - value to be stored
* _@param {optional callback} onSuccess_ - Function to be called if this patch was successfully applied on the server and the client side
* _@param {optional callback} onError_ - Function to be called if this patch failed
* _@return {Promise}_

**Examples**

1. Add an a field to the Group Session 

   If the Group Session is `{"a": 100}` and one calls

   ```javascript
   jatos.groupSession.add("/b", 123);
   ```

   then after the Group Session is successfully updated the new object is `{"a": 100, "b": 123}`.

   Since there is a slight chance that the session update was not successful it's a good idea to provide callback functions for both cases. To provide success or fail callback functions you can either specify the onSuccess/onError parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

1. Use returned Promise to handle success or failure

   ```javascript
   jatos.groupSession.add("/b", 123)
      .then(() => console.log("Group Session was successfully updated"))
      .catch(() => console.log("Group Session synchronization failed"));
   ```

1. Example with an array: Put the object `{id: 123, name: "Max"}` after the second position of the array with the path `/subjects`:

   ```javascript
   jatos.groupSession.add("/subjects/2", {id: 123, name: "Max"})
      .then(() => console.log("Group Session was successfully updated"))
      .catch(() => console.log("Group Session synchronization failed"));
   ```

1. Example of how to append to the end of an array: use `/-` after the arrays name:

   ```javascript
   jatos.groupSession.add("/subjects/-", {id: 124, name: "Adam"})
      .then(() => console.log("Group Session was successfully updated"))
      .catch(() => console.log("Group Session synchronization failed"));
   ```

1. Have a series of Group Session changes

   ```javascript
   jatos.groupSession.add("/a", 1)
      .then(() => jatos.groupSession.add("/b", 2))
      .then(() => jatos.groupSession.add("/c", 3))
      .catch(() => console.log("Group Session synchronization failed"));


### `jatos.groupSession.remove`

JSON Patch remove operation: Removes a value from an object or array (see [jsonpatch.com](http://jsonpatch.com/)).

* _@param {string} path_ - JSON pointer path to the field that should be removed
* _@param {optional callback} onSuccess_ - Function to be called if this patch was successfully applied on the server and the client side
* _@param {optional callback} onError_ - Function to be called if this patch failed
* _@return {Promise}_

**Examples**

1. Remove a field from the Group Session

   If the Group Session is `{"a": 100, "b": 123}` and one calls

   ```javascript
   jatos.groupSession.remove("/b");
   ```

   then after the Group Session is successfully updated the new object is `{"a": 100}`.

   Since there is a slight chance that the session update was not successful it's a good idea to provide callback functions for both cases. To provide success or fail callback functions you can either specify the onSuccess/onError parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

1. Use returned Promise to handle success or failure

   ```javascript
   jatos.groupSession.remove("/b")
      .then(() => console.log("Group Session was successfully updated"))
      .catch(() => console.log("Group Session synchronization failed"));
   ```


### `jatos.groupSession.replace`

JSON Patch replace operation: Replaces a value. Equivalent to a “remove” followed by an “add” (see [jsonpatch.com](http://jsonpatch.com/)).

* _@param {string} path_ - JSON pointer path 
* _@param {object} value_ - value to be replaced with
* _@param {optional callback} onSuccess_ - Function to be called if this patch was successfully applied on the server and the client side
* _@param {optional callback} onError_ - Function to be called if this patch failed
* _@return {Promise}_

**Examples**

1. Replace a field in the Group Session

   If the Group Session is `{"a": 100, "b": 123}` and one calls

   ```javascript
   jatos.groupSession.replace("/b", 789);
   ```

   then after the Group Session is successfully updated the new object is `{"a": 100, "b": 789}`.

   Since there is a slight chance that the session update was not successful it's a good idea to provide callback functions for both cases. To provide success or fail callback functions you can either specify the onSuccess/onError parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

1. Use returned Promise to handle success or failure

   ```javascript
   jatos.groupSession.replace("/b", 789)
      .then(() => console.log("Group Session was successfully updated"))
      .catch(() => console.log("Group Session synchronization failed"));
   ```


### `jatos.groupSession.copy`

JSON Patch copy operation: Copies a value from one location to another within the JSON document. Both from and path are JSON Pointers (see [jsonpatch.com](http://jsonpatch.com/)).

* _@param {string} from_ - JSON pointer path to the origin 
* _@param {string} path_ - JSON pointer path to the target
* _@param {optional callback} onSuccess_ - Function to be called if this patch was successfully applied on the server and the client side
* _@param {optional callback} onError_ - Function to be called if this patch failed
* _@return {Promise}_

**Examples**

1. Copy a field in the Group Session from one location to another

   If the Group Session is `{"a": "jatos"}` and one calls

   ```javascript
   jatos.groupSession.copy("/a", "/b");
   ```

   then after the Group Session is successfully updated the new object is `{"a": "jatos", "b": "jatos"}`.

   Since there is a slight chance that the session update was not successful it's a good idea to provide callback functions for both cases. To provide success or fail callback functions you can either specify the onSuccess/onError parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

1. Use returned Promise to handle success or failure

   ```javascript
   jatos.groupSession.copy("/a", "/b")
      .then(() => console.log("Group Session was successfully updated"))
      .catch(() => console.log("Group Session synchronization failed"));
   ```


### `jatos.groupSession.move`

JSON Patch move operation: Moves a value from one location to the other. Both from and path are JSON Pointers. (see [jsonpatch.com](http://jsonpatch.com/)).

* _@param {string} from_ - JSON pointer path to the origin 
* _@param {string} path_ - JSON pointer path to the target
* _@param {optional callback} onSuccess_ - Function to be called if this patch was successfully applied on the server and the client side
* _@param {optional callback} onError_ - Function to be called if this patch failed
* _@return {Promise}_

**Examples**

1. Move a field in the Group Session from one location to another

   If the Group Session is `{"a": "jatos"}` and one calls

   ```javascript
   jatos.groupSession.move("/a", "/b");
   ```

   then after the Group Session is successfully updated the new object is `{"b": "jatos"}`.

   Since there is a slight chance that the session update was not successful it's a good idea to provide callback functions for both cases. To provide success or fail callback functions you can either specify the onSuccess/onError parameters or use the returned [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

1. Use returned Promise to handle success or failure

   ```javascript
   jatos.groupSession.move("/a", "/b")
      .then(() => console.log("Group Session was successfully updated"))
      .catch(() => console.log("Group Session synchronization failed"));
   ```


### `jatos.groupSessionVersioning`

This flag can be used to turn off versioning of the group session. This speeds up updates to the group session (patches) in certain cases where all concurrent patches are conflict-free between each other. If versioning is turned on (set to true) all session data patches are accompanied by a version. On the JATOS server side only a patch with the current version (as stored in the database) is applied. If there are multiple concurrent patches only the first one is applied. If versioning is turned off all patches arriving at the JATOS server are applied right away without checking the version. This is faster but can lead to unintended session data changes. By default versioning is turned on.

**Example**

```javascript
jatos.groupSessionVersioning = false; // Turns off versioning
```
