var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function l(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){t.appendChild(e)}function s(t,e,n){t.insertBefore(e,n||null)}function r(t){t.parentNode&&t.parentNode.removeChild(t)}function i(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function u(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function h(){return f(" ")}function p(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function m(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function d(t,e){e=""+e,t.data!==e&&(t.data=e)}function g(t,e){t.value=null==e?"":e}let _;function y(t){_=t}function w(t){(function(){if(!_)throw new Error("Function called outside component initialization");return _})().$$.on_mount.push(t)}const b=[],k=[];let v=[];const $=[],x=Promise.resolve();let A=!1;function C(t){v.push(t)}const E=new Set;let R=0;function j(){if(0!==R)return;const t=_;do{try{for(;R<b.length;){const t=b[R];R++,y(t),O(t.$$)}}catch(t){throw b.length=0,R=0,t}for(y(null),b.length=0,R=0;k.length;)k.pop()();for(let t=0;t<v.length;t+=1){const e=v[t];E.has(e)||(E.add(e),e())}v.length=0}while(b.length);for(;$.length;)$.pop()();A=!1,E.clear(),y(t)}function O(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}const M=new Set;function P(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];v.forEach((o=>-1===t.indexOf(o)?e.push(o):n.push(o))),n.forEach((t=>t())),v=e}(n.after_update),o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function S(t,e){-1===t.$$.dirty[0]&&(b.push(t),A||(A=!0,x.then(j)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function N(a,c,s,i,u,f,h,p=[-1]){const m=_;y(a);const d=a.$$={fragment:null,ctx:[],props:f,update:t,not_equal:u,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(c.context||(m?m.$$.context:[])),callbacks:n(),dirty:p,skip_bound:!1,root:c.target||m.$$.root};h&&h(d.root);let g=!1;if(d.ctx=s?s(a,c.props||{},((t,e,...n)=>{const o=n.length?n[0]:e;return d.ctx&&u(d.ctx[t],d.ctx[t]=o)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](o),g&&S(a,t)),e})):[],d.update(),g=!0,o(d.before_update),d.fragment=!!i&&i(d.ctx),c.target){if(c.hydrate){const t=function(t){return Array.from(t.childNodes)}(c.target);d.fragment&&d.fragment.l(t),t.forEach(r)}else d.fragment&&d.fragment.c();c.intro&&((w=a.$$.fragment)&&w.i&&(M.delete(w),w.i(b))),function(t,n,a,c){const{fragment:s,after_update:r}=t.$$;s&&s.m(n,a),c||C((()=>{const n=t.$$.on_mount.map(e).filter(l);t.$$.on_destroy?t.$$.on_destroy.push(...n):o(n),t.$$.on_mount=[]})),r.forEach(C)}(a,c.target,c.anchor,c.customElement),j()}var w,b;y(m)}class D{$destroy(){P(this,1),this.$destroy=t}$on(e,n){if(!l(n))return t;const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const t=o.indexOf(n);-1!==t&&o.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function B(t,e,n){const o=t.slice();return o[80]=e[n],o[82]=n,o}function T(t,e,n){const o=t.slice();return o[83]=e[n],o[85]=n,o}function L(t,e,n){const o=t.slice();return o[86]=e[n],o[85]=n,o}function Y(t,e,n){const o=t.slice();return o[80]=e[n],o[82]=n,o}function U(t,e,n){const o=t.slice();return o[80]=e[n],o[82]=n,o}function z(t,e,n){const o=t.slice();return o[90]=e[n],o[85]=n,o}function G(t,e,n){const o=t.slice();return o[80]=e[n],o[82]=n,o}function Q(e){let n,o,l=e[80]+"";return{c(){n=u("div"),o=f(l),m(n,"class","svelte-1mb8pst")},m(t,e){s(t,n,e),c(n,o)},p:t,d(t){t&&r(n)}}}function q(t){let e,n,o,l,a=t[90].tag+"";function i(){return t[37](t[90])}return{c(){e=u("button"),n=f(a)},m(t,a){s(t,e,a),c(e,n),o||(l=p(e,"click",i),o=!0)},p(e,o){t=e,2&o[0]&&a!==(a=t[90].tag+"")&&d(n,a)},d(t){t&&r(e),o=!1,l()}}}function F(t){let e,n;return{c(){e=u("option"),e.__value=n=t[80].tag,e.value=e.__value},m(t,n){s(t,e,n)},p(t,o){256&o[0]&&n!==(n=t[80].tag)&&(e.__value=n,e.value=e.__value)},d(t){t&&r(e)}}}function H(e){let n;return{c(){n=u("span"),n.textContent="😇"},m(t,e){s(t,n,e)},p:t,d(t){t&&r(n)}}}function I(t){let e,n,a,i,m,g,_,y,w,b,k=t[86].reply+"",v=t[86].username+"";function $(){return t[44](t[86])}return{c(){e=u("li"),n=f(k),a=h(),i=u("button"),m=f(v),g=h(),_=u("button"),_.textContent="fetch_delete_comment_reply",y=h()},m(o,r){s(o,e,r),c(e,n),c(e,a),c(e,i),c(i,m),c(e,g),c(e,_),s(o,y,r),w||(b=[p(i,"click",$),p(_,"click",(function(){l(t[23](t[86].id))&&t[23](t[86].id).apply(this,arguments)}))],w=!0)},p(e,o){t=e,2&o[0]&&k!==(k=t[86].reply+"")&&d(n,k),2&o[0]&&v!==(v=t[86].username+"")&&d(m,v)},d(t){t&&r(e),t&&r(y),w=!1,o(b)}}}function J(t){let e,n,a,_,y,w,b,k,v,$,x,A,C,E,R,j,O,M=t[83][t[85]].comment+"",P=t[83][t[85]].username+"";function S(){return t[42](t[83],t[85])}let N=t[83].comment_replies,D=[];for(let e=0;e<N.length;e+=1)D[e]=I(L(t,N,e));return{c(){e=u("li"),n=f(M),a=h(),_=u("button"),y=f(P),w=h(),b=u("button"),b.textContent="fetch_delete_comment",k=h(),v=u("input"),$=h(),x=u("button"),x.textContent="fetch_insert_comment_reply",A=h(),C=u("li"),E=u("ul");for(let t=0;t<D.length;t+=1)D[t].c();R=h(),m(v,"type","text"),m(v,"placeholder","comment_reply"),m(C,"class","reply_zone svelte-1mb8pst")},m(o,r){s(o,e,r),c(e,n),c(e,a),c(e,_),c(_,y),c(e,w),c(e,b),s(o,k,r),s(o,v,r),g(v,t[6]),s(o,$,r),s(o,x,r),s(o,A,r),s(o,C,r),c(C,E);for(let t=0;t<D.length;t+=1)D[t]&&D[t].m(E,null);s(o,R,r),j||(O=[p(_,"click",S),p(b,"click",(function(){l(t[21](t[83][t[85]].id))&&t[21](t[83][t[85]].id).apply(this,arguments)})),p(v,"input",t[43]),p(x,"click",(function(){l(t[22](t[83][t[85]].id))&&t[22](t[83][t[85]].id).apply(this,arguments)}))],j=!0)},p(e,o){if(t=e,2&o[0]&&M!==(M=t[83][t[85]].comment+"")&&d(n,M),2&o[0]&&P!==(P=t[83][t[85]].username+"")&&d(y,P),64&o[0]&&v.value!==t[6]&&g(v,t[6]),545259522&o[0]){let e;for(N=t[83].comment_replies,e=0;e<N.length;e+=1){const n=L(t,N,e);D[e]?D[e].p(n,o):(D[e]=I(n),D[e].c(),D[e].m(E,null))}for(;e<D.length;e+=1)D[e].d(1);D.length=N.length}},d(t){t&&r(e),t&&r(k),t&&r(v),t&&r($),t&&r(x),t&&r(A),t&&r(C),i(D,t),t&&r(R),j=!1,o(O)}}}function V(t){let e,n,a,_,y,w,b,k,v,$,x,A,C,E,R,j,O,M,P,S,N,D,B,L,G,Q,I,V,K,W,X,Z,tt,et,nt,ot,lt,at=t[80].link+"",ct=t[80].username+"",st=t[80].tags,rt=[];for(let e=0;e<st.length;e+=1)rt[e]=q(z(t,st,e));let it=t[8],ut=[];for(let e=0;e<it.length;e+=1)ut[e]=F(U(t,it,e));function ft(){return t[40](t[80])}let ht=t[80].likes,pt=[];for(let e=0;e<ht.length;e+=1)pt[e]=H(Y(t,ht,e));let mt=t[80].comments_and_replies,dt=[];for(let e=0;e<mt.length;e+=1)dt[e]=J(T(t,mt,e));return{c(){e=u("br"),n=h(),a=u("br"),_=h(),y=u("li"),w=u("div");for(let t=0;t<rt.length;t+=1)rt[t].c();b=h(),k=u("div"),v=u("input"),$=h(),x=u("datalist");for(let t=0;t<ut.length;t+=1)ut[t].c();A=h(),C=u("button"),C.textContent="fetch_insert_tag",E=h(),R=u("ul"),j=u("li"),O=u("a"),M=f(at),S=h(),N=u("button"),N.textContent="fetch_delete_link",D=h(),B=u("button"),L=f(ct),G=h();for(let t=0;t<pt.length;t+=1)pt[t].c();Q=h(),I=u("button"),I.textContent="like_increment_or_decrement",V=h(),K=u("div"),W=u("input"),X=h(),Z=u("button"),Z.textContent="fetch_insert_comment",tt=h(),et=u("ul");for(let t=0;t<dt.length;t+=1)dt[t].c();nt=h(),m(w,"class","svelte-1mb8pst"),m(v,"list","autocomplete_list"),m(v,"type","text"),m(v,"name",""),m(v,"placeholder","tag"),m(x,"id","autocomplete_list"),m(k,"class","svelte-1mb8pst"),m(O,"href",P=t[80].link),m(O,"target","_blank"),m(O,"class","link_text svelte-1mb8pst"),m(W,"type","text"),m(W,"name",""),m(W,"placeholder","comment"),m(K,"class","svelte-1mb8pst"),m(et,"class","comment_zone svelte-1mb8pst")},m(o,r){s(o,e,r),s(o,n,r),s(o,a,r),s(o,_,r),s(o,y,r),c(y,w);for(let t=0;t<rt.length;t+=1)rt[t]&&rt[t].m(w,null);c(y,b),c(y,k),c(k,v),t[38](v),g(v,t[7]),c(k,$),c(k,x);for(let t=0;t<ut.length;t+=1)ut[t]&&ut[t].m(x,null);c(k,A),c(k,C),c(y,E),c(y,R),c(R,j),c(j,O),c(O,M),c(j,S),c(j,N),c(y,D),c(y,B),c(B,L),c(y,G);for(let t=0;t<pt.length;t+=1)pt[t]&&pt[t].m(y,null);c(y,Q),c(y,I),c(y,V),c(y,K),c(K,W),g(W,t[5]),c(K,X),c(K,Z),c(y,tt),c(y,et);for(let t=0;t<dt.length;t+=1)dt[t]&&dt[t].m(et,null);c(y,nt),ot||(lt=[p(v,"input",t[39]),p(v,"input",t[25]),p(C,"click",(function(){l(t[24](t[80].id))&&t[24](t[80].id).apply(this,arguments)})),p(N,"click",(function(){l(t[18](t[80].id))&&t[18](t[80].id).apply(this,arguments)})),p(B,"click",ft),p(I,"click",(function(){l(t[19](t[80].id))&&t[19](t[80].id).apply(this,arguments)})),p(W,"input",t[41]),p(Z,"click",(function(){l(t[20](t[80].id))&&t[20](t[80].id).apply(this,arguments)}))],ot=!0)},p(e,n){if(t=e,268435458&n[0]){let e;for(st=t[80].tags,e=0;e<st.length;e+=1){const o=z(t,st,e);rt[e]?rt[e].p(o,n):(rt[e]=q(o),rt[e].c(),rt[e].m(w,null))}for(;e<rt.length;e+=1)rt[e].d(1);rt.length=st.length}if(128&n[0]&&v.value!==t[7]&&g(v,t[7]),256&n[0]){let e;for(it=t[8],e=0;e<it.length;e+=1){const o=U(t,it,e);ut[e]?ut[e].p(o,n):(ut[e]=F(o),ut[e].c(),ut[e].m(x,null))}for(;e<ut.length;e+=1)ut[e].d(1);ut.length=it.length}if(2&n[0]&&at!==(at=t[80].link+"")&&d(M,at),2&n[0]&&P!==(P=t[80].link)&&m(O,"href",P),2&n[0]&&ct!==(ct=t[80].username+"")&&d(L,ct),2&n[0]){let e;for(ht=t[80].likes,e=0;e<ht.length;e+=1){const o=Y(t,ht,e);pt[e]?pt[e].p(o,n):(pt[e]=H(),pt[e].c(),pt[e].m(y,Q))}for(;e<pt.length;e+=1)pt[e].d(1);pt.length=ht.length}if(32&n[0]&&W.value!==t[5]&&g(W,t[5]),551551042&n[0]){let e;for(mt=t[80].comments_and_replies,e=0;e<mt.length;e+=1){const o=T(t,mt,e);dt[e]?dt[e].p(o,n):(dt[e]=J(o),dt[e].c(),dt[e].m(et,null))}for(;e<dt.length;e+=1)dt[e].d(1);dt.length=mt.length}},d(l){l&&r(e),l&&r(n),l&&r(a),l&&r(_),l&&r(y),i(rt,l),t[38](null),i(ut,l),i(pt,l),i(dt,l),ot=!1,o(lt)}}}function K(e){let n,l,a,_,y,w,b,k,v,$,x,A,C,E,R,j,O,M,P,S,N,D,T,L,Y,U,z,q,F,H,I,J,K,W,X,Z,tt,et,nt,ot,lt,at,ct,st,rt,it,ut,ft,ht,pt,mt,dt=e[12],gt=[];for(let t=0;t<dt.length;t+=1)gt[t]=Q(G(e,dt,t));let _t=e[1],yt=[];for(let t=0;t<_t.length;t+=1)yt[t]=V(B(e,_t,t));return{c(){n=u("button"),n.textContent="filter_by_tag_list",l=f("\n\nfilter by ");for(let t=0;t<gt.length;t+=1)gt[t].c();a=f("\n\n\nname: "),_=u("input"),y=f("\npassword: "),w=u("input"),b=h(),k=u("div"),v=f("link: "),$=u("input"),x=h(),A=u("button"),A.textContent="insert_link",C=h(),E=u("button"),E.textContent="CLEAR",R=h(),j=u("button"),O=f("ORDER_BY: "),M=f(e[10]),P=h(),S=u("button"),N=f("ORDER_BY_COLUMN: "),D=f(e[11]),T=h(),L=u("div"),Y=h(),U=u("ul");for(let t=0;t<yt.length;t+=1)yt[t].c();var t,o,c,s;z=h(),q=u("br"),F=h(),H=u("button"),H.textContent="toggle_footer",I=h(),J=u("footer"),K=u("p"),K.textContent="Version 0.0.0.1",W=h(),X=u("p"),X.textContent="client side hosting: ",Z=u("a"),Z.textContent="https://taroyanaka.github.io/svelte/",tt=h(),et=u("p"),et.textContent="server side hosting: ",nt=u("a"),nt.textContent="https://glitch.com/edit/#!/spectrum-whip-sulfur?path=server.js%3A3%3A0",ot=h(),lt=u("p"),lt.textContent="client side source code: ",at=u("p"),at.innerHTML='<a href="https://github.com/taroyanaka/svelte/">https://github.com/taroyanaka/svelte/</a> \n  ',ct=u("p"),ct.textContent="server side source code: ",st=u("p"),rt=u("a"),rt.textContent="https://github.com/taroyanaka/duct/",it=h(),ut=u("button"),ft=f("list_only_safe: "),ht=f(e[0]),m(_,"type","text"),m(_,"placeholder","name"),m(w,"type","password"),m(w,"placeholder","password"),m($,"type","text"),m($,"placeholder","link_url"),m($,"class","link"),m(A,"class","insert_link"),m(k,"class","svelte-1mb8pst"),m(L,"class","svelte-1mb8pst"),m(Z,"href","https://taroyanaka.github.io/svelte/"),m(nt,"href","https://glitch.com/edit/#!/spectrum-whip-sulfur?path=server.js%3A3%3A0"),m(rt,"href","https://github.com/taroyanaka/duct/"),m(J,"class","footer_open"),m(J,"id","footer"),t=J,o="display",null==(c="block")?t.style.removeProperty(o):t.style.setProperty(o,c,s?"important":"")},m(t,o){s(t,n,o),s(t,l,o);for(let e=0;e<gt.length;e+=1)gt[e]&&gt[e].m(t,o);s(t,a,o),s(t,_,o),g(_,e[2]),s(t,y,o),s(t,w,o),g(w,e[3]),s(t,b,o),s(t,k,o),c(k,v),c(k,$),g($,e[4]),c(k,x),c(k,A),c(k,C),c(k,E),c(k,R),c(k,j),c(j,O),c(j,M),c(k,P),c(k,S),c(S,N),c(S,D),s(t,T,o),s(t,L,o),s(t,Y,o),s(t,U,o);for(let t=0;t<yt.length;t+=1)yt[t]&&yt[t].m(U,null);s(t,z,o),s(t,q,o),s(t,F,o),s(t,H,o),s(t,I,o),s(t,J,o),c(J,K),c(J,W),c(J,X),c(J,Z),c(J,tt),c(J,et),c(J,nt),c(J,ot),c(J,lt),c(J,at),c(J,ct),c(J,st),c(st,rt),c(st,it),c(st,ut),c(ut,ft),c(ut,ht),pt||(mt=[p(n,"click",e[30]),p(_,"input",e[31]),p(w,"input",e[32]),p($,"input",e[33]),p(A,"click",e[17]),p(E,"click",e[34]),p(j,"click",e[35]),p(S,"click",e[36]),p(H,"click",e[15]),p(ut,"click",e[45])],pt=!0)},p(t,e){if(4096&e[0]){let n;for(dt=t[12],n=0;n<dt.length;n+=1){const o=G(t,dt,n);gt[n]?gt[n].p(o,e):(gt[n]=Q(o),gt[n].c(),gt[n].m(a.parentNode,a))}for(;n<gt.length;n+=1)gt[n].d(1);gt.length=dt.length}if(4&e[0]&&_.value!==t[2]&&g(_,t[2]),8&e[0]&&w.value!==t[3]&&g(w,t[3]),16&e[0]&&$.value!==t[4]&&g($,t[4]),1024&e[0]&&d(M,t[10]),2048&e[0]&&d(D,t[11]),872154082&e[0]){let n;for(_t=t[1],n=0;n<_t.length;n+=1){const o=B(t,_t,n);yt[n]?yt[n].p(o,e):(yt[n]=V(o),yt[n].c(),yt[n].m(U,null))}for(;n<yt.length;n+=1)yt[n].d(1);yt.length=_t.length}1&e[0]&&d(ht,t[0])},i:t,o:t,d(t){t&&r(n),t&&r(l),i(gt,t),t&&r(a),t&&r(_),t&&r(y),t&&r(w),t&&r(b),t&&r(k),t&&r(T),t&&r(L),t&&r(Y),t&&r(U),i(yt,t),t&&r(z),t&&r(q),t&&r(F),t&&r(H),t&&r(I),t&&r(J),pt=!1,o(mt)}}}let W="https://spectrum-whip-sulfur.glitch.me/";function X(t,e,n){let o=["チェンソーマン","犬のかがやき"];const l=(t,e)=>0===e.length?t:t.filter((t=>e.some((e=>t.tags.some((t=>t.tag===e))))));let a=!0;const c=async()=>{console.log("change_list_safe"),n(0,a=!a),await x({})};let s,r=[],i="user1",u="user_pass1",f="https://yanaka.dev/",h="comment1",p="reply1",m="tag1",d=[],g="",_="ASC",y="id",b="",v="",$="";const x=async({ORDER_BY_PARAM:t="DESC",ORDER_BY_COLUMN_PARAM:e="id",REQ_TAG_PARAM:o,USER_PARAM:l})=>{console.log(e);try{n(10,_=t),n(11,y=e),b=o,v=l;const c=()=>{const t=[];_&&t.push(`order_by=${_}`),y&&t.push(`order_by_column=${y}`),b&&t.push(`tag=${b}`),v&&t.push(`user=${v}`);return`${W+"read_all"}?${t.join("&")}`},s=await(await fetch(c())).json();if("fail"===s.result)throw new Error(s.error);const i=await(await fetch(c())).json();if(0===i.length)throw new Error("条件に一致するデータがありませんでした");n(1,r=i.message),n(1,r=(t=>{const e=t.filter((t=>!(t.link.includes("tktube")||t.link.includes("7mmtv")||t.link.includes("musescore")||t.link.includes("youtube"))));return a?e:t})(r)),console.log("done")}catch(t){console.log(t),t.message}},A=t=>({method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),C=async t=>{try{200===t.status&&($=t.result),"fail"===t.result||400===t.status?(()=>{throw new Error(t.message)})():await x({})}catch(t){(()=>{throw new Error(t.message)})()}},E=async()=>{console.log("fetch_get_tags_for_autocomplete");const t=await(await fetch(W+"get_tags_for_autocomplete",A({name:i,password:u}))).json(),e=await t;n(8,d=await e.message),console.log(d)},R=async()=>{switch(!0){case"id"===y:n(11,y="created_at");break;case"created_at"===y:n(11,y="updated_at");break;default:n(11,y="id")}await x({ORDER_BY_PARAM:_,ORDER_BY_COLUMN_PARAM:y,REQ_TAG_PARAM:"TEST"})},j=async()=>{switch(!0){case"ASC"===_:n(10,_="DESC");break;case"DESC"===_:n(10,_="ASC");break;default:n(11,y="DESC")}await x({ORDER_BY_PARAM:_,ORDER_BY_COLUMN_PARAM:y})},O=async t=>{b=t,await x({REQ_TAG_PARAM:b})},M=async t=>{const e=t||"user1";await x({USER_PARAM:e})};w((async()=>{try{await x({}),await E()}catch(t){console.log(t)}}));return[a,r,i,u,f,h,p,m,d,g,_,y,o,l,c,()=>{const t=document.getElementById("footer");t.style=t.className.includes("footer_open")?"display: none;":"display: block;",t.className=t.className.includes("footer_open")?"footer_close":"footer_open"},x,async()=>{try{s=await(await fetch(W+"insert_link",A({name:i,password:u,link:f}))).json(),await C(s)}catch(t){t.message}},async t=>{try{s=await(await fetch(W+"delete_link",A({name:i,password:u,id:t}))).json(),await C(s)}catch(t){t.message}},async t=>{try{s=await(await fetch(W+"like_increment_or_decrement",A({name:i,password:u,link_id:t}))).json(),await C(s)}catch(t){t.message}},async t=>{try{s=await(await fetch(W+"insert_comment",A({name:i,password:u,link_id:t,comment:h}))).json(),await C(s)}catch(t){t.message}},async t=>{try{s=await(await fetch(W+"delete_comment",A({name:i,password:u,comment_id:t}))).json(),await C(s)}catch(t){t.message}},async t=>{try{s=await(await fetch(W+"insert_comment_reply",A({name:i,password:u,comment_id:t,comment_reply:p}))).json(),await C(s)}catch(t){t.message}},async t=>{try{s=await(await fetch(W+"delete_comment_reply",A({name:i,password:u,comment_reply_id:t}))).json(),await C(s)}catch(t){t.message}},async(t,e)=>{try{n(7,m=e||g.value),s=await(await fetch(W+"insert_tag",A({name:i,password:u,link_id:t,tag:m}))).json(),await C(s)}catch(t){t.message}},E,R,j,O,M,()=>n(1,r=l(r,o)),function(){i=this.value,n(2,i)},function(){u=this.value,n(3,u)},function(){f=this.value,n(4,f)},()=>x({}),()=>j(),()=>R(),t=>O(t.tag),function(t){k[t?"unshift":"push"]((()=>{g=t,n(9,g)}))},function(){m=this.value,n(7,m)},t=>M(t.username),function(){h=this.value,n(5,h)},(t,e)=>M(t[e].username),function(){p=this.value,n(6,p)},t=>M(t.username),()=>c()]}return new class extends D{constructor(t){super(),N(this,t,X,K,a,{},null,[-1,-1,-1])}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
