var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function a(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){t.appendChild(e)}function s(t,e,n){t.insertBefore(e,n||null)}function r(t){t.parentNode&&t.parentNode.removeChild(t)}function i(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function u(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function h(){return f(" ")}function d(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function p(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function m(t,e){e=""+e,t.data!==e&&(t.data=e)}function g(t,e){t.value=null==e?"":e}let _;function y(t){_=t}function w(t){(function(){if(!_)throw new Error("Function called outside component initialization");return _})().$$.on_mount.push(t)}const k=[],b=[];let v=[];const $=[],x=Promise.resolve();let A=!1;function C(t){v.push(t)}const E=new Set;let R=0;function j(){if(0!==R)return;const t=_;do{try{for(;R<k.length;){const t=k[R];R++,y(t),O(t.$$)}}catch(t){throw k.length=0,R=0,t}for(y(null),k.length=0,R=0;b.length;)b.pop()();for(let t=0;t<v.length;t+=1){const e=v[t];E.has(e)||(E.add(e),e())}v.length=0}while(k.length);for(;$.length;)$.pop()();A=!1,E.clear(),y(t)}function O(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}const M=new Set;function P(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];v.forEach((o=>-1===t.indexOf(o)?e.push(o):n.push(o))),n.forEach((t=>t())),v=e}(n.after_update),o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function S(t,e){-1===t.$$.dirty[0]&&(k.push(t),A||(A=!0,x.then(j)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function D(l,c,s,i,u,f,h,d=[-1]){const p=_;y(l);const m=l.$$={fragment:null,ctx:[],props:f,update:t,not_equal:u,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(c.context||(p?p.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:c.target||p.$$.root};h&&h(m.root);let g=!1;if(m.ctx=s?s(l,c.props||{},((t,e,...n)=>{const o=n.length?n[0]:e;return m.ctx&&u(m.ctx[t],m.ctx[t]=o)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](o),g&&S(l,t)),e})):[],m.update(),g=!0,o(m.before_update),m.fragment=!!i&&i(m.ctx),c.target){if(c.hydrate){const t=function(t){return Array.from(t.childNodes)}(c.target);m.fragment&&m.fragment.l(t),t.forEach(r)}else m.fragment&&m.fragment.c();c.intro&&((w=l.$$.fragment)&&w.i&&(M.delete(w),w.i(k))),function(t,n,l,c){const{fragment:s,after_update:r}=t.$$;s&&s.m(n,l),c||C((()=>{const n=t.$$.on_mount.map(e).filter(a);t.$$.on_destroy?t.$$.on_destroy.push(...n):o(n),t.$$.on_mount=[]})),r.forEach(C)}(l,c.target,c.anchor,c.customElement),j()}var w,k;y(p)}class N{$destroy(){P(this,1),this.$destroy=t}$on(e,n){if(!a(n))return t;const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const t=o.indexOf(n);-1!==t&&o.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function B(t,e,n){const o=t.slice();return o[84]=e[n],o[86]=n,o}function T(t,e,n){const o=t.slice();return o[87]=e[n],o[89]=n,o}function L(t,e,n){const o=t.slice();return o[90]=e[n],o[89]=n,o}function Y(t,e,n){const o=t.slice();return o[84]=e[n],o[86]=n,o}function U(t,e,n){const o=t.slice();return o[84]=e[n],o[86]=n,o}function z(t,e,n){const o=t.slice();return o[94]=e[n],o[89]=n,o}function G(t,e,n){const o=t.slice();return o[84]=e[n],o[86]=n,o}function Q(t){let e,n,o,a,l,i,p=t[84].tag+"";function g(){return t[36](t[84])}return{c(){e=u("span"),n=f(p),o=h(),a=u("button"),a.textContent="fetch_delete_bookmark"},m(t,r){s(t,e,r),c(e,n),s(t,o,r),s(t,a,r),l||(i=d(a,"click",g),l=!0)},p(e,o){t=e,512&o[0]&&p!==(p=t[84].tag+"")&&m(n,p)},d(t){t&&r(e),t&&r(o),t&&r(a),l=!1,i()}}}function K(t){let e,n,a,l,i,p,g=t[94].tag+"";function _(){return t[43](t[94])}function y(){return t[44](t[94])}return{c(){e=u("button"),n=f(g),a=h(),l=u("button"),l.textContent="fetch_insert_bookmark"},m(t,o){s(t,e,o),c(e,n),s(t,a,o),s(t,l,o),i||(p=[d(e,"click",_),d(l,"click",y)],i=!0)},p(e,o){t=e,2050&o[0]&&g!==(g=t[94].tag+"")&&m(n,g)},d(t){t&&r(e),t&&r(a),t&&r(l),i=!1,o(p)}}}function q(t){let e,n;return{c(){e=u("option"),e.__value=n=t[84].tag,e.value=e.__value},m(t,n){s(t,e,n)},p(t,o){256&o[0]&&n!==(n=t[84].tag)&&(e.__value=n,e.value=e.__value)},d(t){t&&r(e)}}}function F(e){let n;return{c(){n=u("span"),n.textContent="😇"},m(t,e){s(t,n,e)},p:t,d(t){t&&r(n)}}}function H(t){let e,n,l,i,p,g,_,y,w,k,b=t[90].reply+"",v=t[90].username+"";function $(){return t[51](t[90])}return{c(){e=u("li"),n=f(b),l=h(),i=u("button"),p=f(v),g=h(),_=u("button"),_.textContent="fetch_delete_comment_reply",y=h()},m(o,r){s(o,e,r),c(e,n),c(e,l),c(e,i),c(i,p),c(e,g),c(e,_),s(o,y,r),w||(k=[d(i,"click",$),d(_,"click",(function(){a(t[25](t[90].id))&&t[25](t[90].id).apply(this,arguments)}))],w=!0)},p(e,o){t=e,2050&o[0]&&b!==(b=t[90].reply+"")&&m(n,b),2050&o[0]&&v!==(v=t[90].username+"")&&m(p,v)},d(t){t&&r(e),t&&r(y),w=!1,o(k)}}}function I(t){let e,n,l,_,y,w,k,b,v,$,x,A,C,E,R,j,O,M=t[87][t[89]].comment+"",P=t[87][t[89]].username+"";function S(){return t[49](t[87],t[89])}let D=t[87].comment_replies,N=[];for(let e=0;e<D.length;e+=1)N[e]=H(L(t,D,e));return{c(){e=u("li"),n=f(M),l=h(),_=u("button"),y=f(P),w=h(),k=u("button"),k.textContent="fetch_delete_comment",b=h(),v=u("input"),$=h(),x=u("button"),x.textContent="fetch_insert_comment_reply",A=h(),C=u("li"),E=u("ul");for(let t=0;t<N.length;t+=1)N[t].c();R=h(),p(v,"type","text"),p(v,"placeholder","comment_reply"),p(C,"class","reply_zone svelte-bsv75y")},m(o,r){s(o,e,r),c(e,n),c(e,l),c(e,_),c(_,y),c(e,w),c(e,k),s(o,b,r),s(o,v,r),g(v,t[6]),s(o,$,r),s(o,x,r),s(o,A,r),s(o,C,r),c(C,E);for(let t=0;t<N.length;t+=1)N[t]&&N[t].m(E,null);s(o,R,r),j||(O=[d(_,"click",S),d(k,"click",(function(){a(t[23](t[87][t[89]].id))&&t[23](t[87][t[89]].id).apply(this,arguments)})),d(v,"input",t[50]),d(x,"click",(function(){a(t[24](t[87][t[89]].id))&&t[24](t[87][t[89]].id).apply(this,arguments)}))],j=!0)},p(e,o){if(t=e,2050&o[0]&&M!==(M=t[87][t[89]].comment+"")&&m(n,M),2050&o[0]&&P!==(P=t[87][t[89]].username+"")&&m(y,P),64&o[0]&&v.value!==t[6]&&g(v,t[6]),33556482&o[0]|4&o[1]){let e;for(D=t[87].comment_replies,e=0;e<D.length;e+=1){const n=L(t,D,e);N[e]?N[e].p(n,o):(N[e]=H(n),N[e].c(),N[e].m(E,null))}for(;e<N.length;e+=1)N[e].d(1);N.length=D.length}},d(t){t&&r(e),t&&r(b),t&&r(v),t&&r($),t&&r(x),t&&r(A),t&&r(C),i(N,t),t&&r(R),j=!1,o(O)}}}function J(t){let e,n,l,_,y,w,k,b,v,$,x,A,C,E,R,j,O,M,P,S,D,N,B,L,G,Q,H,J,V,W,X,Z,tt,et,nt,ot,at,lt=t[84].link+"",ct=t[84].username+"",st=t[84].tags,rt=[];for(let e=0;e<st.length;e+=1)rt[e]=K(z(t,st,e));let it=t[8],ut=[];for(let e=0;e<it.length;e+=1)ut[e]=q(U(t,it,e));function ft(){return t[47](t[84])}let ht=t[84].likes,dt=[];for(let e=0;e<ht.length;e+=1)dt[e]=F(Y(t,ht,e));let pt=t[84].comments_and_replies,mt=[];for(let e=0;e<pt.length;e+=1)mt[e]=I(T(t,pt,e));return{c(){e=u("br"),n=h(),l=u("br"),_=h(),y=u("li"),w=u("div");for(let t=0;t<rt.length;t+=1)rt[t].c();k=h(),b=u("div"),v=u("input"),$=h(),x=u("datalist");for(let t=0;t<ut.length;t+=1)ut[t].c();A=h(),C=u("button"),C.textContent="fetch_insert_tag",E=h(),R=u("ul"),j=u("li"),O=u("a"),M=f(lt),S=h(),D=u("button"),D.textContent="fetch_delete_link",N=h(),B=u("button"),L=f(ct),G=h();for(let t=0;t<dt.length;t+=1)dt[t].c();Q=h(),H=u("button"),H.textContent="like_increment_or_decrement",J=h(),V=u("div"),W=u("input"),X=h(),Z=u("button"),Z.textContent="fetch_insert_comment",tt=h(),et=u("ul");for(let t=0;t<mt.length;t+=1)mt[t].c();nt=h(),p(w,"class","svelte-bsv75y"),p(v,"list","autocomplete_list"),p(v,"type","text"),p(v,"name",""),p(v,"placeholder","tag"),p(x,"id","autocomplete_list"),p(b,"class","svelte-bsv75y"),p(O,"href",P=t[84].link),p(O,"target","_blank"),p(O,"class","link_text svelte-bsv75y"),p(W,"type","text"),p(W,"name",""),p(W,"placeholder","comment"),p(V,"class","svelte-bsv75y"),p(et,"class","comment_zone svelte-bsv75y")},m(o,r){s(o,e,r),s(o,n,r),s(o,l,r),s(o,_,r),s(o,y,r),c(y,w);for(let t=0;t<rt.length;t+=1)rt[t]&&rt[t].m(w,null);c(y,k),c(y,b),c(b,v),t[45](v),g(v,t[7]),c(b,$),c(b,x);for(let t=0;t<ut.length;t+=1)ut[t]&&ut[t].m(x,null);c(b,A),c(b,C),c(y,E),c(y,R),c(R,j),c(j,O),c(O,M),c(j,S),c(j,D),c(y,N),c(y,B),c(B,L),c(y,G);for(let t=0;t<dt.length;t+=1)dt[t]&&dt[t].m(y,null);c(y,Q),c(y,H),c(y,J),c(y,V),c(V,W),g(W,t[5]),c(V,X),c(V,Z),c(y,tt),c(y,et);for(let t=0;t<mt.length;t+=1)mt[t]&&mt[t].m(et,null);c(y,nt),ot||(at=[d(v,"input",t[46]),d(v,"input",t[27]),d(C,"click",(function(){a(t[26](t[84].id))&&t[26](t[84].id).apply(this,arguments)})),d(D,"click",(function(){a(t[20](t[84].id))&&t[20](t[84].id).apply(this,arguments)})),d(B,"click",ft),d(H,"click",(function(){a(t[21](t[84].id))&&t[21](t[84].id).apply(this,arguments)})),d(W,"input",t[48]),d(Z,"click",(function(){a(t[22](t[84].id))&&t[22](t[84].id).apply(this,arguments)}))],ot=!0)},p(e,n){if(t=e,536872962&n[0]|2&n[1]){let e;for(st=t[84].tags,e=0;e<st.length;e+=1){const o=z(t,st,e);rt[e]?rt[e].p(o,n):(rt[e]=K(o),rt[e].c(),rt[e].m(w,null))}for(;e<rt.length;e+=1)rt[e].d(1);rt.length=st.length}if(128&n[0]&&v.value!==t[7]&&g(v,t[7]),256&n[0]){let e;for(it=t[8],e=0;e<it.length;e+=1){const o=U(t,it,e);ut[e]?ut[e].p(o,n):(ut[e]=q(o),ut[e].c(),ut[e].m(x,null))}for(;e<ut.length;e+=1)ut[e].d(1);ut.length=it.length}if(2050&n[0]&&lt!==(lt=t[84].link+"")&&m(M,lt),2050&n[0]&&P!==(P=t[84].link)&&p(O,"href",P),2050&n[0]&&ct!==(ct=t[84].username+"")&&m(L,ct),2050&n[0]){let e;for(ht=t[84].likes,e=0;e<ht.length;e+=1){const o=Y(t,ht,e);dt[e]?dt[e].p(o,n):(dt[e]=F(),dt[e].c(),dt[e].m(y,Q))}for(;e<dt.length;e+=1)dt[e].d(1);dt.length=ht.length}if(32&n[0]&&W.value!==t[5]&&g(W,t[5]),58722370&n[0]|4&n[1]){let e;for(pt=t[84].comments_and_replies,e=0;e<pt.length;e+=1){const o=T(t,pt,e);mt[e]?mt[e].p(o,n):(mt[e]=I(o),mt[e].c(),mt[e].m(et,null))}for(;e<mt.length;e+=1)mt[e].d(1);mt.length=pt.length}},d(a){a&&r(e),a&&r(n),a&&r(l),a&&r(_),a&&r(y),i(rt,a),t[45](null),i(ut,a),i(dt,a),i(mt,a),ot=!1,o(at)}}}function V(e){let n,a,l,_,y,w,k,b,v,$,x,A,C,E,R,j,O,M,P,S,D,N,T,L,Y,U,z,K,q,F,H,I,V,W,X,Z,tt,et,nt,ot,at,lt,ct,st,rt,it,ut,ft,ht,dt,pt,mt,gt,_t,yt,wt,kt,bt=e[9],vt=[];for(let t=0;t<bt.length;t+=1)vt[t]=Q(G(e,bt,t));let $t=e[11].length>0?e[11]:e[1],xt=[];for(let t=0;t<$t.length;t+=1)xt[t]=J(B(e,$t,t));return{c(){n=u("button"),n.textContent="clear_filtered_by_bookmarks",a=h(),l=u("button"),l.textContent="filter_by_bookmarks",_=h(),y=u("div"),w=f("BOOKMARKS filter\n"),k=u("br"),b=h();for(let t=0;t<vt.length;t+=1)vt[t].c();v=f("\n\n\nname: "),$=u("input"),x=f("\npassword: "),A=u("input"),C=h(),E=u("div"),R=f("link: "),j=u("input"),O=h(),M=u("button"),M.textContent="insert_link",P=h(),S=u("button"),S.textContent="CLEAR",D=h(),N=u("button"),T=f("ORDER_BY: "),L=f(e[12]),Y=h(),U=u("button"),z=f("ORDER_BY_COLUMN: "),K=f(e[13]),q=h(),F=u("div"),H=h(),I=u("ul");for(let t=0;t<xt.length;t+=1)xt[t].c();var t,o,c,s;V=h(),W=u("br"),X=h(),Z=u("button"),Z.textContent="toggle_footer",tt=h(),et=u("footer"),nt=u("p"),nt.textContent="Version 0.0.0.1",ot=h(),at=u("p"),at.textContent="client side hosting: ",lt=u("a"),lt.textContent="https://taroyanaka.github.io/svelte/",ct=h(),st=u("p"),st.textContent="server side hosting: ",rt=u("a"),rt.textContent="https://glitch.com/edit/#!/spectrum-whip-sulfur?path=server.js%3A3%3A0",it=h(),ut=u("p"),ut.textContent="client side source code: ",ft=u("p"),ft.innerHTML='<a href="https://github.com/taroyanaka/svelte/">https://github.com/taroyanaka/svelte/</a> \n  ',ht=u("p"),ht.textContent="server side source code: ",dt=u("p"),pt=u("a"),pt.textContent="https://github.com/taroyanaka/duct/",mt=h(),gt=u("button"),_t=f("list_only_safe: "),yt=f(e[0]),p(y,"class","svelte-bsv75y"),p($,"type","text"),p($,"placeholder","name"),p(A,"type","password"),p(A,"placeholder","password"),p(j,"type","text"),p(j,"placeholder","link_url"),p(j,"class","link"),p(M,"class","insert_link"),p(E,"class","svelte-bsv75y"),p(F,"class","svelte-bsv75y"),p(lt,"href","https://taroyanaka.github.io/svelte/"),p(rt,"href","https://glitch.com/edit/#!/spectrum-whip-sulfur?path=server.js%3A3%3A0"),p(pt,"href","https://github.com/taroyanaka/duct/"),p(gt,"class","light_color svelte-bsv75y"),p(et,"class","footer_open"),p(et,"id","footer"),t=et,o="display",null==(c="block")?t.style.removeProperty(o):t.style.setProperty(o,c,s?"important":"")},m(t,o){s(t,n,o),s(t,a,o),s(t,l,o),s(t,_,o),s(t,y,o),c(y,w),c(y,k),c(y,b);for(let t=0;t<vt.length;t+=1)vt[t]&&vt[t].m(y,null);s(t,v,o),s(t,$,o),g($,e[2]),s(t,x,o),s(t,A,o),g(A,e[3]),s(t,C,o),s(t,E,o),c(E,R),c(E,j),g(j,e[4]),c(E,O),c(E,M),c(E,P),c(E,S),c(E,D),c(E,N),c(N,T),c(N,L),c(E,Y),c(E,U),c(U,z),c(U,K),s(t,q,o),s(t,F,o),s(t,H,o),s(t,I,o);for(let t=0;t<xt.length;t+=1)xt[t]&&xt[t].m(I,null);s(t,V,o),s(t,W,o),s(t,X,o),s(t,Z,o),s(t,tt,o),s(t,et,o),c(et,nt),c(et,ot),c(et,at),c(et,lt),c(et,ct),c(et,st),c(et,rt),c(et,it),c(et,ut),c(et,ft),c(et,ht),c(et,dt),c(dt,pt),c(dt,mt),c(dt,gt),c(gt,_t),c(gt,yt),wt||(kt=[d(n,"click",e[34]),d(l,"click",e[35]),d($,"input",e[37]),d(A,"input",e[38]),d(j,"input",e[39]),d(M,"click",e[19]),d(S,"click",e[40]),d(N,"click",e[41]),d(U,"click",e[42]),d(Z,"click",e[17]),d(gt,"click",e[52])],wt=!0)},p(t,e){if(268435968&e[0]){let n;for(bt=t[9],n=0;n<bt.length;n+=1){const o=G(t,bt,n);vt[n]?vt[n].p(o,e):(vt[n]=Q(o),vt[n].c(),vt[n].m(y,null))}for(;n<vt.length;n+=1)vt[n].d(1);vt.length=bt.length}if(4&e[0]&&$.value!==t[2]&&g($,t[2]),8&e[0]&&A.value!==t[3]&&g(A,t[3]),16&e[0]&&j.value!==t[4]&&g(j,t[4]),4096&e[0]&&m(L,t[12]),8192&e[0]&&m(K,t[13]),804261346&e[0]|6&e[1]){let n;for($t=t[11].length>0?t[11]:t[1],n=0;n<$t.length;n+=1){const o=B(t,$t,n);xt[n]?xt[n].p(o,e):(xt[n]=J(o),xt[n].c(),xt[n].m(I,null))}for(;n<xt.length;n+=1)xt[n].d(1);xt.length=$t.length}1&e[0]&&m(yt,t[0])},i:t,o:t,d(t){t&&r(n),t&&r(a),t&&r(l),t&&r(_),t&&r(y),i(vt,t),t&&r(v),t&&r($),t&&r(x),t&&r(A),t&&r(C),t&&r(E),t&&r(q),t&&r(F),t&&r(H),t&&r(I),i(xt,t),t&&r(V),t&&r(W),t&&r(X),t&&r(Z),t&&r(tt),t&&r(et),wt=!1,o(kt)}}}let W="https://spectrum-whip-sulfur.glitch.me/";function X(t,e,n){const o=async()=>{0===g.length&&n(11,y=[]),n(11,y=r.filter((t=>g.some((e=>t.tags.some((t=>t.tag===e.tag)))))))},a=()=>{n(11,y=[])};let l=!0;const c=async()=>{console.log("change_list_safe"),n(0,l=!l),await C({})};let s,r=[],i="user2",u="user_pass2",f="https://yanaka.dev/",h="comment1",d="reply1",p="tag1",m=[],g=[],_="",y=[],k="ASC",v="id",$="",x="",A="";const C=async({ORDER_BY_PARAM:t="DESC",ORDER_BY_COLUMN_PARAM:e="id",REQ_TAG_PARAM:o,USER_PARAM:a})=>{console.log(e);try{n(12,k=t),n(13,v=e),$=o,x=a;const c=()=>{const t=[];k&&t.push(`order_by=${k}`),v&&t.push(`order_by_column=${v}`),$&&t.push(`tag=${$}`),x&&t.push(`user=${x}`);return`${W+"read_all"}?${t.join("&")}`},s=await(await fetch(c())).json();if("fail"===s.result)throw new Error(s.error);const i=await(await fetch(c())).json();if(0===i.length)throw new Error("条件に一致するデータがありませんでした");n(1,r=i.message),n(1,r=(t=>{const e=t.filter((t=>!(t.link.includes("tktube")||t.link.includes("7mmtv")||t.link.includes("musescore")||t.link.includes("youtube"))));return l?e:t})(r)),console.log("done")}catch(t){console.log(t),t.message}},E=t=>({method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),R=async t=>{try{200===t.status&&(A=t.result),"fail"===t.result||400===t.status?(()=>{throw new Error(t.message)})():await C({})}catch(t){(()=>{throw new Error(t.message)})()}},j=async()=>{console.log("fetch_get_tags_for_autocomplete");const t=await(await fetch(W+"get_tags_for_autocomplete",E({name:i,password:u}))).json(),e=await t;n(8,m=await e.message),console.log(m)},O=async()=>{try{const t=await(await fetch(W+"get_bookmarks",E({name:i,password:u}))).json(),e=await t;n(9,g=await e.message)}catch(t){console.log(t)}},M=async t=>{try{console.log(t);const e=await(await fetch(W+"delete_bookmark",E({name:i,password:u,tag_id:t}))).json(),n=await e;console.log(n),await O(),o()}catch(t){console.log(t)}},P=async t=>{try{const e=await(await fetch(W+"insert_bookmark",E({name:i,password:u,tag_id:t}))).json();await e;await O()}catch(t){console.log(t)}},S=async()=>{switch(!0){case"id"===v:n(13,v="created_at");break;case"created_at"===v:n(13,v="updated_at");break;default:n(13,v="id")}await C({ORDER_BY_PARAM:k,ORDER_BY_COLUMN_PARAM:v,REQ_TAG_PARAM:"TEST"})},D=async()=>{switch(!0){case"ASC"===k:n(12,k="DESC");break;case"DESC"===k:n(12,k="ASC");break;default:n(13,v="DESC")}await C({ORDER_BY_PARAM:k,ORDER_BY_COLUMN_PARAM:v})},N=async t=>{$=t,await C({REQ_TAG_PARAM:$})},B=async t=>{const e=t||"user1";await C({USER_PARAM:e})};w((async()=>{try{await C({}),await j(),await O()}catch(t){console.log(t)}}));return[l,r,i,u,f,h,d,p,m,g,_,y,k,v,o,a,c,()=>{const t=document.getElementById("footer");t.style=t.className.includes("footer_open")?"display: none;":"display: block;",t.className=t.className.includes("footer_open")?"footer_close":"footer_open"},C,async()=>{try{s=await(await fetch(W+"insert_link",E({name:i,password:u,link:f}))).json(),await R(s)}catch(t){t.message}},async t=>{try{s=await(await fetch(W+"delete_link",E({name:i,password:u,id:t}))).json(),await R(s)}catch(t){t.message}},async t=>{try{s=await(await fetch(W+"like_increment_or_decrement",E({name:i,password:u,link_id:t}))).json(),await R(s)}catch(t){t.message}},async t=>{try{s=await(await fetch(W+"insert_comment",E({name:i,password:u,link_id:t,comment:h}))).json(),await R(s)}catch(t){t.message}},async t=>{try{s=await(await fetch(W+"delete_comment",E({name:i,password:u,comment_id:t}))).json(),await R(s)}catch(t){t.message}},async t=>{try{s=await(await fetch(W+"insert_comment_reply",E({name:i,password:u,comment_id:t,comment_reply:d}))).json(),await R(s)}catch(t){t.message}},async t=>{try{s=await(await fetch(W+"delete_comment_reply",E({name:i,password:u,comment_reply_id:t}))).json(),await R(s)}catch(t){t.message}},async(t,e)=>{try{n(7,p=e||_.value),s=await(await fetch(W+"insert_tag",E({name:i,password:u,link_id:t,tag:p}))).json(),await R(s)}catch(t){t.message}},j,M,P,S,D,N,B,()=>a(),()=>o(),t=>M(t.tag_id),function(){i=this.value,n(2,i)},function(){u=this.value,n(3,u)},function(){f=this.value,n(4,f)},()=>C({}),()=>D(),()=>S(),t=>N(t.tag),t=>P(t.id),function(t){b[t?"unshift":"push"]((()=>{_=t,n(10,_)}))},function(){p=this.value,n(7,p)},t=>B(t.username),function(){h=this.value,n(5,h)},(t,e)=>B(t[e].username),function(){d=this.value,n(6,d)},t=>B(t.username),()=>c()]}return new class extends N{constructor(t){super(),D(this,t,X,V,l,{},null,[-1,-1,-1,-1])}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
