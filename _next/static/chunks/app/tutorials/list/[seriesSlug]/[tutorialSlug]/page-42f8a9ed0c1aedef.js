(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[992],{6498:function(e,t,r){Promise.resolve().then(r.t.bind(r,231,23)),Promise.resolve().then(r.bind(r,7157))},6463:function(e,t,r){"use strict";var n=r(1169);r.o(n,"usePathname")&&r.d(t,{usePathname:function(){return n.usePathname}}),r.o(n,"useRouter")&&r.d(t,{useRouter:function(){return n.useRouter}})},7157:function(e,t,r){"use strict";var n=r(7437),o=r(9472),i=r(1942),a=r(6463);t.default=e=>{let{title:t,description:r,content:s,seriesSlug:c}=e,l=(0,a.useRouter)(),u={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.5}}};return(0,n.jsxs)(o.E.div,{initial:"hidden",animate:"visible",exit:"hidden",style:{color:"var(--text)"},children:[(0,n.jsxs)("button",{onClick:()=>l.push("/tutorials/list#".concat(c)),className:"mb-6 px-4 py-2 text-sm font-semibold text-white",style:{backgroundColor:"var(--accent)",border:"none"},children:[(0,n.jsx)(i.x_l,{className:"inline mr-2"}),"Back to List of Tutorials"]}),(0,n.jsx)(o.E.h1,{className:"text-3xl font-bold mb-4",style:{color:"var(--primary)"},variants:u,children:t}),(0,n.jsx)("div",{className:"space-y-6",children:s.map((e,t)=>(0,n.jsx)(o.E.p,{className:"text-base leading-relaxed",style:{color:"var(--text)"},variants:u,children:e},t))})]})}},1810:function(e,t,r){"use strict";r.d(t,{w_:function(){return u}});var n=r(2265),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},i=n.createContext&&n.createContext(o),a=["attr","size","title"];function s(){return(s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach(function(t){var n,o;n=t,o=r[t],(n=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(n))in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function u(e){return t=>n.createElement(f,s({attr:l({},e.attr)},t),function e(t){return t&&t.map((t,r)=>n.createElement(t.tag,l({key:r},t.attr),e(t.child)))}(e.child))}function f(e){var t=t=>{var r,{attr:o,size:i,title:c}=e,u=function(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}(e,a),f=i||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",s({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,o,u,{className:r,style:l(l({color:e.color||t.color},t.style),e.style),height:f,width:f,xmlns:"http://www.w3.org/2000/svg"}),c&&n.createElement("title",null,c),e.children)};return void 0!==i?n.createElement(i.Consumer,null,e=>t(e)):t(o)}}},function(e){e.O(0,[699,231,472,971,23,744],function(){return e(e.s=6498)}),_N_E=e.O()}]);