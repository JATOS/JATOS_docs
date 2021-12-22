"use strict";(self.webpackChunkjatos_docs=self.webpackChunkjatos_docs||[]).push([[9616],{3905:function(t,e,n){n.d(e,{Zo:function(){return u},kt:function(){return h}});var a=n(7294);function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e){if(null==t)return{};var n,a,o=function(t,e){if(null==t)return{};var n,a,o={},r=Object.keys(t);for(a=0;a<r.length;a++)n=r[a],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(a=0;a<r.length;a++)n=r[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}var l=a.createContext({}),c=function(t){var e=a.useContext(l),n=e;return t&&(n="function"==typeof t?t(e):s(s({},e),t)),n},u=function(t){var e=c(t.components);return a.createElement(l.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},p=a.forwardRef((function(t,e){var n=t.components,o=t.mdxType,r=t.originalType,l=t.parentName,u=i(t,["components","mdxType","originalType","parentName"]),p=c(n),h=o,y=p["".concat(l,".").concat(h)]||p[h]||d[h]||r;return n?a.createElement(y,s(s({ref:e},u),{},{components:n})):a.createElement(y,s({ref:e},u))}));function h(t,e){var n=arguments,o=e&&e.mdxType;if("string"==typeof t||o){var r=n.length,s=new Array(r);s[0]=p;var i={};for(var l in e)hasOwnProperty.call(e,l)&&(i[l]=e[l]);i.originalType=t,i.mdxType="string"==typeof t?t:o,s[1]=i;for(var c=2;c<r;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},8198:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return i},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return u},default:function(){return p}});var a=n(3117),o=n(102),r=(n(7294),n(3905)),s=["components"],i={title:"jsPsych and JATOS",slug:"/jsPsych-and-JATOS.html",sidebar_position:4},l=void 0,c={unversionedId:"Write_your_study/jsPsych-and-JATOS",id:"version-3.6.1/Write_your_study/jsPsych-and-JATOS",title:"jsPsych and JATOS",description:"JATOS basically cares for the server side: it stores result data, does worker management etc. JATOS doesn't care so much for what happens in the browser itself - your HTML, JavaScript and CSS. Of course you can write this all yourself, but you could also use a framework for this. A very good one is jsPsych.",source:"@site/versioned_docs/version-3.6.1/Write_your_study/jsPsych-and-JATOS.md",sourceDirName:"Write_your_study",slug:"/jsPsych-and-JATOS.html",permalink:"/jsPsych-and-JATOS.html",editUrl:"https://github.com/JATOS/JATOS_docs/tree/master/versioned_docs/version-3.6.1/Write_your_study/jsPsych-and-JATOS.md",tags:[],version:"3.6.1",lastUpdatedBy:"Kristian Lange",lastUpdatedAt:1640173481,formattedLastUpdatedAt:"12/22/2021",sidebarPosition:4,frontMatter:{title:"jsPsych and JATOS",slug:"/jsPsych-and-JATOS.html",sidebar_position:4},sidebar:"version-3.6.1/tutorialSidebar",previous:{title:"Adapt Pre written Code to run it in JATOS (Jatosify)",permalink:"/Adapt-Pre-written-Code-to-run-it-in-JATOS.html"},next:{title:"lab.js and JATOS",permalink:"/labjs-and-JATOS.html"}},u=[{value:"How to turn your jsPsych experiment into a JATOS study",id:"how-to-turn-your-jspsych-experiment-into-a-jatos-study",children:[],level:2},{value:"Send jsPsych&#39;s result data back to JATOS",id:"send-jspsychs-result-data-back-to-jatos",children:[{value:"jsPsych 5",id:"jspsych-5",children:[],level:3},{value:"jsPsych 6",id:"jspsych-6",children:[],level:3}],level:2},{value:"Adding additional HTML snippets to a jPsych code (e.g. cancel button)",id:"adding-additional-html-snippets-to-a-jpsych-code-eg-cancel-button",children:[],level:2}],d={toc:u};function p(t){var e=t.components,i=(0,o.Z)(t,s);return(0,r.kt)("wrapper",(0,a.Z)({},d,i,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("div",{style:{float:"right",width:"300px"}},(0,r.kt)("p",null,(0,r.kt)("img",{src:n(3541).Z}))),(0,r.kt)("p",null,"JATOS basically cares for the server side: it stores result data, does worker management etc. JATOS doesn't care so much for what happens in the browser itself - your HTML, JavaScript and CSS. Of course you can write this all yourself, but you could also use a framework for this. A very good one is ",(0,r.kt)("a",{parentName:"p",href:"http://www.jspsych.org/"},"jsPsych"),"."),(0,r.kt)("p",null,"In ",(0,r.kt)("a",{parentName:"p",href:"Example-Studies.html"},"our example studies")," are a couple of jsPsych ones."),(0,r.kt)("p",null,"Here are the necessary changes if you want to adapt your jsPsych experiment so that it runs within (and sends the result data to) JATOS. Additionally you can have a look at ",(0,r.kt)("a",{parentName:"p",href:"Adapt-Pre-written-Code-to-run-it-in-JATOS.html"},"Adapt Pre written Code to run it in JATOS (Jatosify)"),"."),(0,r.kt)("h2",{id:"how-to-turn-your-jspsych-experiment-into-a-jatos-study"},"How to turn your jsPsych experiment into a JATOS study"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Include the ",(0,r.kt)("inlineCode",{parentName:"p"},"jatos.js")," library in the ",(0,r.kt)("inlineCode",{parentName:"p"},"<head>")),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<script src="/assets/javascripts/jatos.js"><\/script>\n')),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"Troubleshooting.html#a-file-library-image--included-in-the-html-fails-to-load"},"Remember"),": Any URL or file path in a HTML file should only use '/' as a file path separator - even on Windows systems. ")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Wrap jsPsych's init call ",(0,r.kt)("inlineCode",{parentName:"p"},"jsPsych.init")," in a ",(0,r.kt)("inlineCode",{parentName:"p"},"jatos.onLoad")," call"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"jatos.onLoad(function() {\n  jsPsych.init( {\n    // ...\n  });\n});\n")))),(0,r.kt)("p",null,"That's all. If you additionally want to send your result data to JATOS read on."),(0,r.kt)("h2",{id:"send-jspsychs-result-data-back-to-jatos"},"Send jsPsych's result data back to JATOS"),(0,r.kt)("p",null,"Here we use jsPsych's function ",(0,r.kt)("inlineCode",{parentName:"p"},"jsPsych.data.getData()")," (jsPsych 5) or ",(0,r.kt)("inlineCode",{parentName:"p"},"jsPsych.data.get().json()")," (jsPsych 6) to collect the data into a JSON-formatted string. Then we use JATOS' function ",(0,r.kt)("inlineCode",{parentName:"p"},"jatos.submitResultData")," to send your result to JATOS and ask JATOS to move to the next component, if there is one."),(0,r.kt)("h3",{id:"jspsych-5"},"jsPsych 5"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"jatos.onLoad(function() {\n  jsPsych.init( {\n    // ...\n    on_finish: function() {\n      var resultJson = JSON.stringify(jsPsych.data.getData());\n      jatos.submitResultData(resultJson, jatos.startNextComponent);\n    }\n  }\n});\n")),(0,r.kt)("h3",{id:"jspsych-6"},"jsPsych 6"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"jatos.onLoad(function() {\n  jsPsych.init( {\n    // ...\n    on_finish: function() {\n      var resultJson = jsPsych.data.get().json();\n      jatos.submitResultData(resultJson, jatos.startNextComponent);\n    }\n  });\n});\n")),(0,r.kt)("h2",{id:"adding-additional-html-snippets-to-a-jpsych-code-eg-cancel-button"},"Adding additional HTML snippets to a jPsych code (e.g. cancel button)"),(0,r.kt)("p",null,"jsPsych has the habit of cleaning the HTML's body and fill it with its own code. This means that whatever you write between the ",(0,r.kt)("inlineCode",{parentName:"p"},"<body>")," tags will be ignored. But you might want to add some additional HTML element like a cancel button to the page without changing the jsPsych plugin or writing a new one. How can this be done?"),(0,r.kt)("p",null,"Luckily jsPsych offers a ",(0,r.kt)("a",{parentName:"p",href:"https://www.jspsych.org/overview/callbacks/#on_load"},"callback function on_load"),". Whatever we write in there is called after jsPsych did its body clean-up. So you could add your extra HTML elements in there."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Hint"),": Since JATOS version 3.5.1 it's much easier to add a cancel button: use ",(0,r.kt)("a",{parentName:"p",href:"http://www.jatos.org/jatos.js-Reference.html#jatosaddabortbutton"},(0,r.kt)("inlineCode",{parentName:"a"},"jatos.addAbortButton")),"."),(0,r.kt)("p",null,"Here's an example (you need jQuery for this one to work):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"var my_trial = {\n  type: 'some-plugin',\n  on_load: function() {\n    $(\"body\").append('<button onclick=\"jatos.abortStudy()\">Cancel Study</button>');\n  },\n  ...\n")),(0,r.kt)("p",null,"And without jQuery it's more cumbersome:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'var my_trial = {\n  type: \'some-plugin\',\n  on_load: function() {\n    var button = document.createElement("button");\n    button.innerHTML = "Cancel Study";\n    document.body.appendChild(button);\n    button.addEventListener("click", function() {\n      jatos.abortStudy();\n    });\n  },\n  ...\n')),(0,r.kt)("p",null,"You probably want to add some styling but this is how it works in principle."))}p.isMDXComponent=!0},3541:function(t,e,n){e.Z=n.p+"assets/images/jspsych-logo-a9d6ad3909046e3e55943bf5141d30ed.png"}}]);