"use strict";(self.webpackChunkjatos_docs=self.webpackChunkjatos_docs||[]).push([[5710],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return h}});var o=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,o,a=function(e,t){if(null==e)return{};var r,o,a={},n=Object.keys(e);for(o=0;o<n.length;o++)r=n[o],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)r=n[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=o.createContext({}),p=function(e){var t=o.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=p(e.components);return o.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},c=o.forwardRef((function(e,t){var r=e.components,a=e.mdxType,n=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(r),h=a,d=c["".concat(l,".").concat(h)]||c[h]||m[h]||n;return r?o.createElement(d,i(i({ref:t},u),{},{components:r})):o.createElement(d,i({ref:t},u))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var n=r.length,i=new Array(n);i[0]=c;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var p=2;p<n;p++)i[p]=r[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}c.displayName="MDXCreateElement"},5254:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return p},toc:function(){return u},default:function(){return c}});var o=r(3117),a=r(102),n=(r(7294),r(3905)),i=["components"],s={title:"Write Group Studies I - Setup",slug:"/Write-Group-Studies-I-Setup.html",sidebar_position:2},l=void 0,p={unversionedId:"Group_studies/Write-Group-Studies-I-Setup",id:"version-3.6.1/Group_studies/Write-Group-Studies-I-Setup",title:"Write Group Studies I - Setup",description:"(If you haven't already, we recommend that you try out some example group studies.)",source:"@site/versioned_docs/version-3.6.1/Group_studies/Write-Group-Studies-I-Setup.md",sourceDirName:"Group_studies",slug:"/Write-Group-Studies-I-Setup.html",permalink:"/Write-Group-Studies-I-Setup.html",editUrl:"https://github.com/JATOS/JATOS_docs/tree/master/versioned_docs/version-3.6.1/Group_studies/Write-Group-Studies-I-Setup.md",tags:[],version:"3.6.1",lastUpdatedBy:"elisafilevich",lastUpdatedAt:1640032138,formattedLastUpdatedAt:"12/20/2021",sidebarPosition:2,frontMatter:{title:"Write Group Studies I - Setup",slug:"/Write-Group-Studies-I-Setup.html",sidebar_position:2},sidebar:"version-3.6.1/tutorialSidebar",previous:{title:"Example Group Studies",permalink:"/Example-Group-Studies.html"},next:{title:"Write Group Studies II - JavaScript and Messaging",permalink:"/Write-Group-Studies-II-JavaScript-and-Messaging.html"}},u=[{value:"Set up group studies",id:"set-up-group-studies",children:[{value:"Group settings in each batch&#39;s properties",id:"group-settings-in-each-batchs-properties",children:[],level:3}],level:2},{value:"Group assignment",id:"group-assignment",children:[{value:"Scenario 1: One group, assign workers manually",id:"scenario-1-one-group-assign-workers-manually",children:[],level:3},{value:"Scenario 2: Several groups, let JATOS assign workers",id:"scenario-2-several-groups-let-jatos-assign-workers",children:[],level:3},{value:"Scenario 3: One open world",id:"scenario-3-one-open-world",children:[],level:3},{value:"Scenario 4: Multiple open worlds with limited active members",id:"scenario-4-multiple-open-worlds-with-limited-active-members",children:[],level:3}],level:2}],m={toc:u};function c(e){var t=e.components,s=(0,a.Z)(e,i);return(0,n.kt)("wrapper",(0,o.Z)({},m,s,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"(If you haven't already, we recommend that you try out some ",(0,n.kt)("a",{parentName:"p",href:"Example-Group-Studies.html"},"example group studies"),".)"),(0,n.kt)("h2",{id:"set-up-group-studies"},"Set up group studies"),(0,n.kt)("p",null,"First and common to all group setups is to check the Group study checkbox in the study properties.\n",(0,n.kt)("img",{alt:"Group&#39;s property",src:r(8747).Z})),(0,n.kt)("p",null,"If the Group property is checked, JATOS will assign workers into groups. We'll describe some group properties that you can use to tweak according to whether you want to keep control over worker assignment, or you give JATOS full control."),(0,n.kt)("h3",{id:"group-settings-in-each-batchs-properties"},"Group settings in each batch's properties"),(0,n.kt)("p",null,"You can have multiple batches in JATOS, each one with different group settings. There are three important bits of information for a group study:"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"Max total workers"),": This isn't just a properties of group studies but can be used in single-worker studies too. It simply limits the total amount of workers who are allowed to run in this batch"),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"Max total members"),":  This limits the number of members a single group can have. While there can be multiple groups in a batch, the ",(0,n.kt)("em",{parentName:"li"},"Max total members")," field applies to each separate group. "),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("strong",{parentName:"li"},"Max active members"),": This limits the number of active members a single group can have. An active member is in the group at this time - in opposite to a past member who already left the group. This number applies to each group separately. Example: In the Prisoner's Dilemma study, you would limit the active members to 2.")),(0,n.kt)("p",null,"By default, all properties have no upper limit."),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Worker &amp; Batch manager screenshot",src:r(7910).Z})),(0,n.kt)("h2",{id:"group-assignment"},"Group assignment"),(0,n.kt)("p",null,"You can either tell JATOS to assign workers to different groups, or you can keep full control and do it yourself (or something in between). We'll use some example scenarios to explain how this assignment works."),(0,n.kt)("h3",{id:"scenario-1-one-group-assign-workers-manually"},"Scenario 1: One group, assign workers manually"),(0,n.kt)("p",null,"If in a batch you set the ",(0,n.kt)("em",{parentName:"p"},"Max total worker")," to 2 and leave the other two Max parameters empty, JATOS has no other choice than to allow only 2 workers and sort them into the same group. If you then define two Personal Single workers and send the access links (displayed in the batch) to your two participants, you can be sure that they will interact with each other. If you need more groups, just create a second batch with two other workers."),(0,n.kt)("h3",{id:"scenario-2-several-groups-let-jatos-assign-workers"},"Scenario 2: Several groups, let JATOS assign workers"),(0,n.kt)("p",null,"Say you want to have 3 groups with 2 workers each. You want to leave it to JATOS which workers are paired together. Then, set ",(0,n.kt)("em",{parentName:"p"},"Max total workers")," to 6 and both ",(0,n.kt)("em",{parentName:"p"},"Max active members")," and ",(0,n.kt)("em",{parentName:"p"},"Max total members")," to 2 (remember that these numbers apply to each group separately). Create your 6 workers in the Worker Setup (or use a General Single link) and distribute your link(s) to your workers."),(0,n.kt)("p",null,"![Prisoners example]","(/img/prisoners example.png)"),(0,n.kt)("p",null,"The first two scenarios may apply to the ",(0,n.kt)("a",{parentName:"p",href:"Example-Studies.html#prisoners-dilemma"},"Prisoner's Dilemma Example Study"),"."),(0,n.kt)("h3",{id:"scenario-3-one-open-world"},"Scenario 3: One open world"),(0,n.kt)("p",null,"This scenario is basically the opposite of the first one. By limiting neither the ",(0,n.kt)("em",{parentName:"p"},"Max total worker")," nor the ",(0,n.kt)("em",{parentName:"p"},"Max total members"),", nor the ",(0,n.kt)("em",{parentName:"p"},"Max active members")," JATOS will sort all workers into one single group that is potentially of unlimited size. Now --to keep it completely open-- just create one General Single worker and publish its link (e.g. via a mailing list or on a website). But keep in mind: this way many workers might access your study at the same time and this might overload your JATOS server."),(0,n.kt)("h3",{id:"scenario-4-multiple-open-worlds-with-limited-active-members"},"Scenario 4: Multiple open worlds with limited active members"),(0,n.kt)("p",null,"Say you want to have groups with up to 3 members, interacting ",(0,n.kt)("em",{parentName:"p"},"at the same time"),". But you don't want to actually limit the total number of members per group: you want to allow new workers to join a group if one of its members left. This way each group can have a flow of workers joining and leaving - the only constraint is the maximum members per group at any given time. You also want to let JATOS set the number of groups depending on the available workers. To set up this just use one batch, set the ",(0,n.kt)("em",{parentName:"p"},"Max active members")," to 3, and leave ",(0,n.kt)("em",{parentName:"p"},"Max total worker")," and ",(0,n.kt)("em",{parentName:"p"},"Max total members")," unlimited.  "),(0,n.kt)("p",null,"![Snake example]","(/img/snake example.png)"),(0,n.kt)("p",null,"(Continue with ",(0,n.kt)("a",{parentName:"p",href:"Write-Group-Studies-II-JavaScript-and-Messaging.html"},"Write Group Studies II - JavaScript and Messaging"),")"))}c.isMDXComponent=!0},8747:function(e,t,r){t.Z=r.p+"assets/images/Study_properties_group-c6f6b7003ec2e865694aa9f39176418e.png"},7910:function(e,t,r){t.Z=r.p+"assets/images/batch_properties-2bf165e3876623c64a91738865eb46a5.png"}}]);