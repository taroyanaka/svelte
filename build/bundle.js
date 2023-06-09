var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(t,n){t.appendChild(n)}function l(t,n,e){t.insertBefore(n,e||null)}function i(t){t.parentNode&&t.parentNode.removeChild(t)}function s(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function a(){return f(" ")}function d(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function p(t,n){n=""+n,t.data!==n&&(t.data=n)}function h(t,n){t.value=null==n?"":n}let m;function $(t){m=t}const g=[],y=[];let b=[];const _=[],x=Promise.resolve();let v=!1;function k(t){b.push(t)}const E=new Set;let C=0;function w(){if(0!==C)return;const t=m;do{try{for(;C<g.length;){const t=g[C];C++,$(t),j(t.$$)}}catch(t){throw g.length=0,C=0,t}for($(null),g.length=0,C=0;y.length;)y.pop()();for(let t=0;t<b.length;t+=1){const n=b[t];E.has(n)||(E.add(n),n())}b.length=0}while(g.length);for(;_.length;)_.pop()();v=!1,E.clear(),$(t)}function j(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(k)}}const A=new Set;function N(t,n){const e=t.$$;null!==e.fragment&&(!function(t){const n=[],e=[];b.forEach((o=>-1===t.indexOf(o)?n.push(o):e.push(o))),e.forEach((t=>t())),b=n}(e.after_update),o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function O(t,n){-1===t.$$.dirty[0]&&(g.push(t),v||(v=!0,x.then(w)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function S(c,u,l,s,f,a,d,p=[-1]){const h=m;$(c);const g=c.$$={fragment:null,ctx:[],props:a,update:t,not_equal:f,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(u.context||(h?h.$$.context:[])),callbacks:e(),dirty:p,skip_bound:!1,root:u.target||h.$$.root};d&&d(g.root);let y=!1;if(g.ctx=l?l(c,u.props||{},((t,n,...e)=>{const o=e.length?e[0]:n;return g.ctx&&f(g.ctx[t],g.ctx[t]=o)&&(!g.skip_bound&&g.bound[t]&&g.bound[t](o),y&&O(c,t)),n})):[],g.update(),y=!0,o(g.before_update),g.fragment=!!s&&s(g.ctx),u.target){if(u.hydrate){const t=function(t){return Array.from(t.childNodes)}(u.target);g.fragment&&g.fragment.l(t),t.forEach(i)}else g.fragment&&g.fragment.c();u.intro&&((b=c.$$.fragment)&&b.i&&(A.delete(b),b.i(_))),function(t,e,c,u){const{fragment:l,after_update:i}=t.$$;l&&l.m(e,c),u||k((()=>{const e=t.$$.on_mount.map(n).filter(r);t.$$.on_destroy?t.$$.on_destroy.push(...e):o(e),t.$$.on_mount=[]})),i.forEach(k)}(c,u.target,u.anchor,u.customElement),w()}var b,_;$(h)}class B{$destroy(){N(this,1),this.$destroy=t}$on(n,e){if(!r(e))return t;const o=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return o.push(e),()=>{const t=o.indexOf(e);-1!==t&&o.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function L(t,n,e){const o=t.slice();return o[11]=n[e],o[13]=e,o}function q(n){let e,o,r=n[11]+"";return{c(){var t,c,u;e=s("li"),o=f(r),t=e,c="key",null==(u=n[13])?t.removeAttribute(c):t.getAttribute(c)!==u&&t.setAttribute(c,u)},m(t,n){l(t,e,n),u(e,o)},p:t,d(t){t&&i(e)}}}function D(n){let e,r,c,m,$,g,y,b,_,x,v,k,E,C,w,j,A,N,O,S,B,D,H,M,P,R,T,z=n[4],G=[];for(let t=0;t<z.length;t+=1)G[t]=q(L(n,z,t));return{c(){e=s("p"),e.textContent=`ramda.js sample: ${n[3]}`,r=a(),c=s("div"),m=s("input"),$=a(),g=s("p"),y=f(n[0]),b=a(),_=s("ul");for(let t=0;t<G.length;t+=1)G[t].c();x=a(),v=s("button"),v.textContent="Click me",k=a(),E=s("div"),C=s("input"),w=a(),j=s("button"),j.textContent="Focus input",A=a(),N=s("div"),O=s("p"),O.textContent=`${F}`,S=a(),B=s("div"),D=s("button"),D.textContent="fetchData",H=a(),M=s("p"),P=f(n[2])},m(t,o){l(t,e,o),l(t,r,o),l(t,c,o),u(c,m),h(m,n[0]),u(c,$),u(c,g),u(g,y),l(t,b,o),l(t,_,o);for(let t=0;t<G.length;t+=1)G[t]&&G[t].m(_,null);l(t,x,o),l(t,v,o),l(t,k,o),l(t,E,o),u(E,C),n[10](C),u(E,w),u(E,j),l(t,A,o),l(t,N,o),u(N,O),l(t,S,o),l(t,B,o),u(B,D),u(B,H),u(B,M),u(M,P),R||(T=[d(m,"input",n[9]),d(v,"click",n[5]),d(j,"click",n[6]),d(N,"mount",n[7]),d(D,"click",n[8])],R=!0)},p(t,[n]){if(1&n&&m.value!==t[0]&&h(m,t[0]),1&n&&p(y,t[0]),16&n){let e;for(z=t[4],e=0;e<z.length;e+=1){const o=L(t,z,e);G[e]?G[e].p(o,n):(G[e]=q(o),G[e].c(),G[e].m(_,null))}for(;e<G.length;e+=1)G[e].d(1);G.length=z.length}4&n&&p(P,t[2])},i:t,o:t,d(t){t&&i(e),t&&i(r),t&&i(c),t&&i(b),t&&i(_),function(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}(G,t),t&&i(x),t&&i(v),t&&i(k),t&&i(E),n[10](null),t&&i(A),t&&i(N),t&&i(S),t&&i(B),R=!1,o(T)}}}let F="mounted_sample Svelte!";function H(t,n,e){let o=R.add(40,2),r="Hello Svelte!";let c;let u="";return[r,c,u,o,["item1","item2","item3"],()=>console.log("Button clicked"),()=>c.focus(),()=>console.log("Component mounted."),async()=>{const t=await fetch("https://jsonplaceholder.typicode.com/todos/1"),n=await t.json();e(2,u=n.title)},function(){r=this.value,e(0,r)},function(t){y[t?"unshift":"push"]((()=>{c=t,e(1,c)}))}]}return new class extends B{constructor(t){super(),S(this,t,H,D,c,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
