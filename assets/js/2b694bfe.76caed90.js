"use strict";(self.webpackChunkjatos_docs=self.webpackChunkjatos_docs||[]).push([[8560],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var o=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=o.createContext({}),p=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return o.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=r,h=d["".concat(s,".").concat(m)]||d[m]||u[m]||a;return n?o.createElement(h,i(i({ref:t},c),{},{components:n})):o.createElement(h,i({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<a;p++)i[p]=n[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},46744:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var o=n(83117),r=(n(67294),n(3905));const a={title:"JATOS on AWS",slug:"/JATOS-in-Amazons-Cloud-without-Docker.html",sidebar_position:4},i=void 0,l={unversionedId:"Serving_the_Internet/JATOS-in-Amazons-Cloud-without-Docker",id:"version-3.6.1/Serving_the_Internet/JATOS-in-Amazons-Cloud-without-Docker",title:"JATOS on AWS",description:"On this page is additional information in how to install JATOS on a server on AWS. All general installation advice is in JATOS on a server and applies here too. If you are looking for an easier way to install JATOS in the cloud, the tutorial JATOS on DigitalOcean might be what you are looking for.",source:"@site/versioned_docs/version-3.6.1/Serving_the_Internet/JATOS-in-Amazons-Cloud-without-Docker.md",sourceDirName:"Serving_the_Internet",slug:"/JATOS-in-Amazons-Cloud-without-Docker.html",permalink:"/3.6.x/JATOS-in-Amazons-Cloud-without-Docker.html",draft:!1,editUrl:"https://github.com/JATOS/JATOS_docs/tree/main/versioned_docs/version-3.6.1/Serving_the_Internet/JATOS-in-Amazons-Cloud-without-Docker.md",tags:[],version:"3.6.1",lastUpdatedBy:"elisafilevich",lastUpdatedAt:1694895776,formattedLastUpdatedAt:"Sep 16, 2023",sidebarPosition:4,frontMatter:{title:"JATOS on AWS",slug:"/JATOS-in-Amazons-Cloud-without-Docker.html",sidebar_position:4},sidebar:"version-3.6.1/tutorialSidebar",previous:{title:"JATOS on DigitalOcean",permalink:"/3.6.x/JATOS-on-DigitalOcean.html"},next:{title:"Install JATOS on a server",permalink:"/3.6.x/JATOS-on-a-server.html"}},s={},p=[],c={toc:p};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"On this page is additional information in how to install JATOS on a server on AWS. All general installation advice is in ",(0,r.kt)("a",{parentName:"p",href:"JATOS-on-a-server.html"},"JATOS on a server")," and applies here too. If you are looking for an easier way to install JATOS in the cloud, the tutorial ",(0,r.kt)("a",{parentName:"p",href:"JATOS-on-DigitalOcean.html"},"JATOS on DigitalOcean")," might be what you are looking for."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"First you need to register at ",(0,r.kt)("a",{parentName:"li",href:"https://aws.amazon.com/"},"AWS")," (they'll want your credit card)."),(0,r.kt)("li",{parentName:"ol"},"In AWS webpage move to EC2 and launch a new instance with Ubuntu (you can use other Linux too - I tested it with Ubuntu 14.04 and 16.04)"),(0,r.kt)("li",{parentName:"ol"},"During the creation of the new EC2 instance you will be ask whether you want to create a key pair. Do so. Download the file with the key (a *.pem file). Store it in a safe place - with this key you will access your server."),(0,r.kt)("li",{parentName:"ol"},"Login via SSH: ",(0,r.kt)("inlineCode",{parentName:"li"},"ssh -i /path/to/your/pem_key_file ubuntu@xx.xx.xx.xx")," (Use your instance's IP address: In AWS / EC2 / Instances / Description are two IPs 'Private IP' and 'Public IP'. Use the ",(0,r.kt)("strong",{parentName:"li"},"public")," one.)"),(0,r.kt)("li",{parentName:"ol"},"Get the latest JATOS bundled with Java (exchange x.x.x with the version you want) ",(0,r.kt)("inlineCode",{parentName:"li"},"wget https://github.com/JATOS/JATOS/releases/download/vx.x.x/jatos-x.x.x-linux_java.zip")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"unzip jatos-x.x.x-linux_java.zip")," (You probably have to install 'unzip' first with ",(0,r.kt)("inlineCode",{parentName:"li"},"sudo apt-get install unzip"),".)"),(0,r.kt)("li",{parentName:"ol"},"Configure IP and port in ",(0,r.kt)("inlineCode",{parentName:"li"},"conf/production.conf"),": Use the '",(0,r.kt)("strong",{parentName:"li"},"Private IP"),"' from your instance description (the one that starts with 172.x.x.x) and port 80"),(0,r.kt)("li",{parentName:"ol"},"Allow inbound HTTP/HTTPS traffic: ",(0,r.kt)("a",{parentName:"li",href:"https://aws.amazon.com/premiumsupport/knowledge-center/connect-http-https-ec2/"},"This is done in AWS GUI"),"."),(0,r.kt)("li",{parentName:"ol"},"(Optional) ",(0,r.kt)("a",{parentName:"li",href:"JATOS-on-a-server.html#7-optional-auto-start-jatos"},"auto-start JATOS")),(0,r.kt)("li",{parentName:"ol"},"Change JATOS' admin password")))}u.isMDXComponent=!0}}]);