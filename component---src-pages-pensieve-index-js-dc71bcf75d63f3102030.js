(self.webpackChunkadikris_portfolio=self.webpackChunkadikris_portfolio||[]).push([[156],{3174:function(e,t,n){"use strict";n.r(t);var r=n(7294),o=n(5444),i=n(1804),a=n.n(i),l=n(5414),u=n(3494),f=n(1096),s=n(8477);const c=u.default.main.withConfig({displayName:"pensieve__StyledMainContainer",componentId:"sc-6axzvb-0"})(["& > header{margin-bottom:100px;text-align:center;a{&:hover,&:focus{cursor:url(\"data:image/svg+xml;utf8,<svg xmlns='https://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>⚡</text></svg>\") 20 0,auto;}}}footer{",";width:100%;margin-top:20px;}"],(e=>{let{theme:t}=e;return t.mixins.flexBetween})),d=u.default.div.withConfig({displayName:"pensieve__StyledGrid",componentId:"sc-6axzvb-1"})(["margin-top:50px;.posts{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));grid-gap:15px;position:relative;@media (max-width:1080px){grid-template-columns:repeat(auto-fill,minmax(250px,1fr));}}"]),p=u.default.div.withConfig({displayName:"pensieve__StyledPostInner",componentId:"sc-6axzvb-2"})(["",";",";flex-direction:column;align-items:flex-start;position:relative;height:100%;padding:2rem 1.75rem;border-radius:var(--border-radius);transition:var(--transition);background-color:var(--light-navy);header,a{width:100%;}"],(e=>{let{theme:t}=e;return t.mixins.boxShadow}),(e=>{let{theme:t}=e;return t.mixins.flexBetween})),x=u.default.div.withConfig({displayName:"pensieve__StyledPost",componentId:"sc-6axzvb-3"})(["transition:var(--transition);cursor:default;&:hover,&:focus{outline:0;","{transform:translateY(-5px);}}"],p),m=u.default.div.withConfig({displayName:"pensieve__StyledPostHeader",componentId:"sc-6axzvb-4"})(["",";margin-bottom:30px;"],(e=>{let{theme:t}=e;return t.mixins.flexBetween})),v=u.default.div.withConfig({displayName:"pensieve__StyledFolder",componentId:"sc-6axzvb-5"})(["color:var(--red);svg{width:40px;height:40px;}"]),g=u.default.h5.withConfig({displayName:"pensieve__StyledPostName",componentId:"sc-6axzvb-6"})(["margin:0 0 10px;color:var(--lightest-slate);font-size:var(--fz-xxl);"]),h=u.default.div.withConfig({displayName:"pensieve__StyledPostDescription",componentId:"sc-6axzvb-7"})(["color:var(--light-slate);font-size:17px;"]),y=u.default.span.withConfig({displayName:"pensieve__StyledDate",componentId:"sc-6axzvb-8"})(["color:var(--light-slate);font-family:var(--font-mono);font-size:var(--fz-xxs);text-transform:uppercase;"]),b=u.default.ul.withConfig({displayName:"pensieve__StyledTags",componentId:"sc-6axzvb-9"})(["display:flex;align-items:flex-end;flex-wrap:wrap;padding:0;margin:0;list-style:none;li{color:var(--red);font-family:var(--font-mono);font-size:var(--fz-xxs);line-height:1.75;&:not(:last-of-type){margin-right:15px;}}"]);t.default=e=>{let{location:t,data:n}=e;const i=n.allMarkdownRemark.edges;return r.createElement(f.Ar,{location:t},r.createElement(l.q,{title:"Pensieve"}),r.createElement(c,null,r.createElement("header",null,r.createElement("h1",{className:"big-heading"},"Pensieve"),r.createElement("p",{className:"subtitle"},r.createElement("a",{href:"https://www.wizardingworld.com/writing-by-jk-rowling/pensieve"},"a collection of memories"))),r.createElement(d,null,r.createElement("div",{className:"posts"},i.length>0&&i.map(((e,t)=>{let{node:n}=e;const{frontmatter:i}=n,{title:l,description:u,slug:f,date:c,tags:d}=i,w=new Date(c);return r.createElement(x,{key:t,tabIndex:"0"},r.createElement(p,null,r.createElement("header",null,r.createElement(o.Link,{to:f},r.createElement(m,null,r.createElement(v,null,r.createElement(s.BX,null))),r.createElement(g,null,l),r.createElement(h,null,u))),r.createElement("footer",null,r.createElement(y,null,`${w.toLocaleDateString()}`),r.createElement(b,null,d.map(((e,t)=>r.createElement("li",{key:t},r.createElement(o.Link,{to:`/pensieve/tags/${a()(e)}/`,className:"inline-link"},"#",e))))))))}))))))}},2705:function(e,t,n){var r=n(5639).Symbol;e.exports=r},9932:function(e){e.exports=function(e,t){for(var n=-1,r=null==e?0:e.length,o=Array(r);++n<r;)o[n]=t(e[n],n,e);return o}},2663:function(e){e.exports=function(e,t,n,r){var o=-1,i=null==e?0:e.length;for(r&&i&&(n=e[++o]);++o<i;)n=t(n,e[o],o,e);return n}},9029:function(e){var t=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;e.exports=function(e){return e.match(t)||[]}},4239:function(e,t,n){var r=n(2705),o=n(9607),i=n(2333),a=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":a&&a in Object(e)?o(e):i(e)}},8674:function(e){e.exports=function(e){return function(t){return null==e?void 0:e[t]}}},531:function(e,t,n){var r=n(2705),o=n(9932),i=n(1469),a=n(3448),l=r?r.prototype:void 0,u=l?l.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(i(t))return o(t,e)+"";if(a(t))return u?u.call(t):"";var n=t+"";return"0"==n&&1/t==-Infinity?"-0":n}},5393:function(e,t,n){var r=n(2663),o=n(3816),i=n(8748),a=RegExp("['’]","g");e.exports=function(e){return function(t){return r(i(o(t).replace(a,"")),e,"")}}},9389:function(e,t,n){var r=n(8674)({"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"s"});e.exports=r},1957:function(e,t,n){var r="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;e.exports=r},9607:function(e,t,n){var r=n(2705),o=Object.prototype,i=o.hasOwnProperty,a=o.toString,l=r?r.toStringTag:void 0;e.exports=function(e){var t=i.call(e,l),n=e[l];try{e[l]=void 0;var r=!0}catch(u){}var o=a.call(e);return r&&(t?e[l]=n:delete e[l]),o}},3157:function(e){var t=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;e.exports=function(e){return t.test(e)}},2333:function(e){var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:function(e,t,n){var r=n(1957),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();e.exports=i},2757:function(e){var t="\\ud800-\\udfff",n="\\u2700-\\u27bf",r="a-z\\xdf-\\xf6\\xf8-\\xff",o="A-Z\\xc0-\\xd6\\xd8-\\xde",i="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",a="["+i+"]",l="\\d+",u="["+n+"]",f="["+r+"]",s="[^"+t+i+l+n+r+o+"]",c="(?:\\ud83c[\\udde6-\\uddff]){2}",d="[\\ud800-\\udbff][\\udc00-\\udfff]",p="["+o+"]",x="(?:"+f+"|"+s+")",m="(?:"+p+"|"+s+")",v="(?:['’](?:d|ll|m|re|s|t|ve))?",g="(?:['’](?:D|LL|M|RE|S|T|VE))?",h="(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?",y="[\\ufe0e\\ufe0f]?",b=y+h+("(?:\\u200d(?:"+["[^"+t+"]",c,d].join("|")+")"+y+h+")*"),w="(?:"+[u,c,d].join("|")+")"+b,E=RegExp([p+"?"+f+"+"+v+"(?="+[a,p,"$"].join("|")+")",m+"+"+g+"(?="+[a,p+x,"$"].join("|")+")",p+"?"+x+"+"+v,p+"+"+g,"\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])","\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",l,w].join("|"),"g");e.exports=function(e){return e.match(E)||[]}},3816:function(e,t,n){var r=n(9389),o=n(9833),i=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,a=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]","g");e.exports=function(e){return(e=o(e))&&e.replace(i,r).replace(a,"")}},1469:function(e){var t=Array.isArray;e.exports=t},7005:function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},3448:function(e,t,n){var r=n(4239),o=n(7005);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==r(e)}},1804:function(e,t,n){var r=n(5393)((function(e,t,n){return e+(n?"-":"")+t.toLowerCase()}));e.exports=r},9833:function(e,t,n){var r=n(531);e.exports=function(e){return null==e?"":r(e)}},8748:function(e,t,n){var r=n(9029),o=n(3157),i=n(9833),a=n(2757);e.exports=function(e,t,n){return e=i(e),void 0===(t=n?void 0:t)?o(e)?a(e):r(e):e.match(t)||[]}}}]);
//# sourceMappingURL=component---src-pages-pensieve-index-js-dc71bcf75d63f3102030.js.map