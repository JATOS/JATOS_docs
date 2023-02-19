"use strict";(self.webpackChunkjatos_docs=self.webpackChunkjatos_docs||[]).push([[3601],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=o.createContext({}),m=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=m(e.components);return o.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},c=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=m(n),d=r,h=c["".concat(s,".").concat(d)]||c[d]||u[d]||a;return n?o.createElement(h,i(i({ref:t},p),{},{components:n})):o.createElement(h,i({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var m=2;m<a;m++)i[m]=n[m];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}c.displayName="MDXCreateElement"},1395:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return i},default:function(){return u},frontMatter:function(){return a},metadata:function(){return l},toc:function(){return m}});var o=n(3117),r=(n(7294),n(3905));const a={title:"Customize JATOS' Home Page",slug:"/Customize-JATOS-Home-Page.html",sidebar_position:11},i=void 0,l={unversionedId:"Serving_the_Internet/Customize-JATOS-Home-Page",id:"version-3.6.1/Serving_the_Internet/Customize-JATOS-Home-Page",title:"Customize JATOS' Home Page",description:"Link to Terms of Use (since JATOS v3.5.9)",source:"@site/versioned_docs/version-3.6.1/Serving_the_Internet/Customize-JATOS-Home-Page.md",sourceDirName:"Serving_the_Internet",slug:"/Customize-JATOS-Home-Page.html",permalink:"/3.6.1/Customize-JATOS-Home-Page.html",draft:!1,editUrl:"https://github.com/JATOS/JATOS_docs/tree/master/versioned_docs/version-3.6.1/Serving_the_Internet/Customize-JATOS-Home-Page.md",tags:[],version:"3.6.1",lastUpdatedBy:"Kristian Lange",lastUpdatedAt:1676838524,formattedLastUpdatedAt:"Feb 19, 2023",sidebarPosition:11,frontMatter:{title:"Customize JATOS' Home Page",slug:"/Customize-JATOS-Home-Page.html",sidebar_position:11},sidebar:"version-3.6.1/tutorialSidebar",previous:{title:"Updating a JATOS server installation",permalink:"/3.6.1/Updating-a-JATOS-server-installation.html"},next:{title:"Install JATOS via Docker",permalink:"/3.6.1/Install-JATOS-via-Docker.html"}},s={},m=[{value:"Link to Terms of Use (since JATOS v3.5.9)",id:"link-to-terms-of-use-since-jatos-v359",level:2},{value:"Welcome Block (since JATOS v3.5.9)",id:"welcome-block-since-jatos-v359",level:2},{value:"With GitHub",id:"with-github",level:3}],p={toc:m};function u(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,o.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"link-to-terms-of-use-since-jatos-v359"},"Link to Terms of Use (since JATOS v3.5.9)"),(0,r.kt)("p",null,"You can configure JATOS to show a link to your 'Terms of Use' that will be shown in a info box on the home page. "),(0,r.kt)("p",null,"In your JATOS installation folder edit ",(0,r.kt)("inlineCode",{parentName:"p"},"conf/production.conf")," and add the URL under ",(0,r.kt)("inlineCode",{parentName:"p"},"jatos.termsOfUseUrl"),". If left empty the info box is not shown."),(0,r.kt)("h2",{id:"welcome-block-since-jatos-v359"},"Welcome Block (since JATOS v3.5.9)"),(0,r.kt)("p",null,"You can customize JATOS' home page to e.g."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"show your university's logo,"),(0,r.kt)("li",{parentName:"ul"},"add some introduction text, or"),(0,r.kt)("li",{parentName:"ul"},"announce an upcoming event. ")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"template customized home page",src:n(7818).Z,width:"1919",height:"719"})),(0,r.kt)("p",null,"This is done by configuring JATOS with an URL that points to some static HTML that describes your individual welcome block. This HTML block will then be loaded and displayed in every home page."),(0,r.kt)("p",null,"Have a look at this ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/JATOS/customized-home-page-template/blob/main/foobar-university-welcome.html"},"example welcome block"),"."),(0,r.kt)("p",null,"You can update your welcome block at any time to add new information (e.g. anouncement of JATOS maintance work). But since the HMTL is cached it can take ",(0,r.kt)("strong",{parentName:"p"},"up to an hour to be visible to your users"),". If you want to see it right away for testing you can disable caching in your browser."),(0,r.kt)("p",null,"This welcome block can be fetched from ",(0,r.kt)("strong",{parentName:"p"},"any HTTP server")," that is able to serve HTML. One way is to do it via GitHub."),(0,r.kt)("h3",{id:"with-github"},"With GitHub"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Go to ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/JATOS/customized-home-page-template"},"https://github.com/JATOS/customized-home-page-template"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Click 'Use this template' button to create a copy of this repository")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Change the content of ",(0,r.kt)("inlineCode",{parentName:"p"},"foobar-university-welcome.html")," to your needs")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Add necessary files (e.g. logo images) to your repository")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Configure JATOS: In your JATOS installation folder edit ",(0,r.kt)("inlineCode",{parentName:"p"},"conf/production.conf")," - add ",(0,r.kt)("inlineCode",{parentName:"p"},"jatos.brandingUrl"),":"),(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Easy but with rate limit"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},'jatos.brandingUrl = "https://raw.githubusercontent.com/my-user/my-repo/main/foobar-university-welcome.html"\n')),(0,r.kt)("p",{parentName:"li"},"Remember to change ",(0,r.kt)("inlineCode",{parentName:"p"},"my-user"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"my-repo"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"foobar-university-welcome.html"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Better use ",(0,r.kt)("a",{parentName:"p",href:"https://docs.github.com/en/github/working-with-github-pages/creating-a-github-pages-site"},"GitHub pages")),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},'jatos.brandingUrl = "https://my-user.github.io/my-repo/foobar-university-welcome.html"\n')),(0,r.kt)("p",{parentName:"li"},"Remember to change ",(0,r.kt)("inlineCode",{parentName:"p"},"my-user"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"my-repo"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"foobar-university-welcome.html"))))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Restart JATOS"))))}u.isMDXComponent=!0},7818:function(e,t,n){t.Z=n.p+"assets/images/screenshot-branding-6b6e021db43da7b742fbbb7d4775ea52.png"}}]);