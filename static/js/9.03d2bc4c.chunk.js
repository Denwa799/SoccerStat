(this["webpackJsonpsoccer-stat"]=this["webpackJsonpsoccer-stat"]||[]).push([[9],{247:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a=function(e,t,n,a,r){return 429===e?t({type:n,payload:"\u041f\u0440\u0435\u0432\u044b\u0448\u0435\u043d \u043b\u0438\u043c\u0438\u0442 \u043d\u0430 \u0437\u0430\u043f\u0440\u043e\u0441\u044b"}):403===e?t({type:n,payload:"".concat(a)}):void t({type:n,payload:"".concat(r)})}},248:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a=n(110).c},249:function(e,t,n){"use strict";n(0);var a=n(112),r=n.n(a),c=n(241),i=n(113),o=n(6),s=Object(o.jsx)(i.a,{className:r.a.Loader,spin:!0});t.a=function(e){var t=e.loading,n=e.error;return n?Object(o.jsx)("h1",{children:n}):t?Object(o.jsx)(c.a,{indicator:s}):null}},250:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return c})),n.d(t,"d",(function(){return i})),n.d(t,"e",(function(){return o})),n.d(t,"g",(function(){return s})),n.d(t,"f",(function(){return l}));var a=function(e){return e.competitionList},r=function(e){return e.competitionResource},c=function(e){return e.matchList},i=function(e){return e.matchResource},o=function(e){return e.teamList},s=function(e){return e.teamResource},l=function(e){return e.teamMatchesResource}},255:function(e,t,n){"use strict";n.d(t,"a",(function(){return j}));var a,r=n(10),c=n(12),i=n(39),o=n(15),s=n(14),l=n(0),u=n(67),d=n(31),f=n(264),p=n(42),m=n(20);function b(e){return!e||null===e.offsetParent||e.hidden}function h(e){var t=(e||"").match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);return!(t&&t[1]&&t[2]&&t[3])||!(t[1]===t[2]&&t[2]===t[3])}var j=function(e){Object(o.a)(n,e);var t=Object(s.a)(n);function n(){var e;return Object(r.a)(this,n),(e=t.apply(this,arguments)).containerRef=l.createRef(),e.animationStart=!1,e.destroyed=!1,e.onClick=function(t,n){var r,c,o=e.props,s=o.insertExtraNode;if(!(o.disabled||!t||b(t)||t.className.indexOf("-leave")>=0)){e.extraNode=document.createElement("div");var l=Object(i.a)(e).extraNode,d=e.context.getPrefixCls;l.className="".concat(d(""),"-click-animating-node");var f=e.getAttributeName();if(t.setAttribute(f,"true"),n&&"#ffffff"!==n&&"rgb(255, 255, 255)"!==n&&h(n)&&!/rgba\((?:\d*, ){3}0\)/.test(n)&&"transparent"!==n){l.style.borderColor=n;var p=(null===(r=t.getRootNode)||void 0===r?void 0:r.call(t))||t.ownerDocument,m=p instanceof Document?p.body:null!==(c=p.firstChild)&&void 0!==c?c:p;a=Object(u.a)("\n      [".concat(d(""),"-click-animating-without-extra-node='true']::after, .").concat(d(""),"-click-animating-node {\n        --antd-wave-shadow-color: ").concat(n,";\n      }"),"antd-wave",{csp:e.csp,attachTo:m})}s&&t.appendChild(l),["transition","animation"].forEach((function(n){t.addEventListener("".concat(n,"start"),e.onTransitionStart),t.addEventListener("".concat(n,"end"),e.onTransitionEnd)}))}},e.onTransitionStart=function(t){if(!e.destroyed){var n=e.containerRef.current;t&&t.target===n&&!e.animationStart&&e.resetEffect(n)}},e.onTransitionEnd=function(t){t&&"fadeEffect"===t.animationName&&e.resetEffect(t.target)},e.bindAnimationEvent=function(t){if(t&&t.getAttribute&&!t.getAttribute("disabled")&&!(t.className.indexOf("disabled")>=0)){var n=function(n){if("INPUT"!==n.target.tagName&&!b(n.target)){e.resetEffect(t);var a=getComputedStyle(t).getPropertyValue("border-top-color")||getComputedStyle(t).getPropertyValue("border-color")||getComputedStyle(t).getPropertyValue("background-color");e.clickWaveTimeoutId=window.setTimeout((function(){return e.onClick(t,a)}),0),f.a.cancel(e.animationStartId),e.animationStart=!0,e.animationStartId=Object(f.a)((function(){e.animationStart=!1}),10)}};return t.addEventListener("click",n,!0),{cancel:function(){t.removeEventListener("click",n,!0)}}}},e.renderWave=function(t){var n=t.csp,a=e.props.children;if(e.csp=n,!l.isValidElement(a))return a;var r=e.containerRef;return Object(d.c)(a)&&(r=Object(d.a)(a.ref,e.containerRef)),Object(m.a)(a,{ref:r})},e}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=this.containerRef.current;e&&1===e.nodeType&&(this.instance=this.bindAnimationEvent(e))}},{key:"componentWillUnmount",value:function(){this.instance&&this.instance.cancel(),this.clickWaveTimeoutId&&clearTimeout(this.clickWaveTimeoutId),this.destroyed=!0}},{key:"getAttributeName",value:function(){var e=this.context.getPrefixCls,t=this.props.insertExtraNode;return"".concat(e(""),t?"-click-animating":"-click-animating-without-extra-node")}},{key:"resetEffect",value:function(e){var t=this;if(e&&e!==this.extraNode&&e instanceof Element){var n=this.props.insertExtraNode,r=this.getAttributeName();e.setAttribute(r,"false"),a&&(a.innerHTML=""),n&&this.extraNode&&e.contains(this.extraNode)&&e.removeChild(this.extraNode),["transition","animation"].forEach((function(n){e.removeEventListener("".concat(n,"start"),t.onTransitionStart),e.removeEventListener("".concat(n,"end"),t.onTransitionEnd)}))}}},{key:"render",value:function(){return l.createElement(p.a,null,this.renderWave)}}]),n}(l.Component);j.contextType=p.b},258:function(e,t,n){"use strict";var a=n(2),r=n(3),c=n(4),i=n(19),o=n(0),s=n.n(o),l=n(5),u=n.n(l),d=n(22),f=n(42),p=n(10),m=function e(t){Object(p.a)(this,e),this.error=new Error("unreachable case: ".concat(JSON.stringify(t)))},b=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},h=function(e){return o.createElement(f.a,null,(function(t){var n,c=t.getPrefixCls,i=t.direction,s=e.prefixCls,l=e.size,d=e.className,f=b(e,["prefixCls","size","className"]),p=c("btn-group",s),h="";switch(l){case"large":h="lg";break;case"small":h="sm";break;case"middle":case void 0:break;default:console.warn(new m(l).error)}var j=u()(p,(n={},Object(r.a)(n,"".concat(p,"-").concat(h),h),Object(r.a)(n,"".concat(p,"-rtl"),"rtl"===i),n),d);return o.createElement("div",Object(a.a)({},f,{className:j}))}))},j=n(255),O=n(38),v=n(55),g=n(98),x=n(27),y=n(113),C=function(){return{width:0,opacity:0,transform:"scale(0)"}},E=function(e){return{width:e.scrollWidth,opacity:1,transform:"scale(1)"}},N=function(e){var t=e.prefixCls,n=!!e.loading;return e.existIcon?s.a.createElement("span",{className:"".concat(t,"-loading-icon")},s.a.createElement(y.a,null)):s.a.createElement(x.b,{visible:n,motionName:"".concat(t,"-loading-icon-motion"),removeOnLeave:!0,onAppearStart:C,onAppearActive:E,onEnterStart:C,onEnterActive:E,onLeaveStart:E,onLeaveActive:C},(function(e,n){var a=e.className,r=e.style;return s.a.createElement("span",{className:"".concat(t,"-loading-icon"),style:r,ref:n},s.a.createElement(y.a,{className:a}))}))},_=n(20),k=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},S=/^[\u4e00-\u9fa5]{2}$/,w=S.test.bind(S);function T(e){return"text"===e||"link"===e}function I(e,t){if(null!=e){var n,a=t?" ":"";return"string"!==typeof e&&"number"!==typeof e&&"string"===typeof e.type&&w(e.props.children)?Object(_.a)(e,{children:e.props.children.split("").join(a)}):"string"===typeof e?w(e)?o.createElement("span",null,e.split("").join(a)):o.createElement("span",null,e):(n=e,o.isValidElement(n)&&n.type===o.Fragment?o.createElement("span",null,e):e)}}Object(O.a)("default","primary","ghost","dashed","link","text"),Object(O.a)("default","circle","round"),Object(O.a)("submit","button","reset");var L=function(e,t){var n,s=e.loading,l=void 0!==s&&s,p=e.prefixCls,m=e.type,b=e.danger,h=e.shape,O=void 0===h?"default":h,x=e.size,y=e.className,C=e.children,E=e.icon,_=e.ghost,S=void 0!==_&&_,L=e.block,P=void 0!==L&&L,R=e.htmlType,A=void 0===R?"button":R,M=k(e,["loading","prefixCls","type","danger","shape","size","className","children","icon","ghost","block","htmlType"]),B=o.useContext(g.b),z=o.useState(!!l),W=Object(c.a)(z,2),D=W[0],F=W[1],U=o.useState(!1),V=Object(c.a)(U,2),H=V[0],J=V[1],q=o.useContext(f.b),G=q.getPrefixCls,K=q.autoInsertSpaceInButton,X=q.direction,Y=t||o.createRef(),Z=o.useRef(),$=function(){return 1===o.Children.count(C)&&!E&&!T(m)},Q="object"===Object(i.a)(l)&&l.delay?l.delay||!0:!!l;o.useEffect((function(){clearTimeout(Z.current),"number"===typeof Q?Z.current=window.setTimeout((function(){F(Q)}),Q):F(Q)}),[Q]),o.useEffect((function(){if(Y&&Y.current&&!1!==K){var e=Y.current.textContent;$()&&w(e)?H||J(!0):H&&J(!1)}}),[Y]);var ee=function(t){var n,a=e.onClick,r=e.disabled;D||r?t.preventDefault():null===(n=a)||void 0===n||n(t)};Object(v.a)(!("string"===typeof E&&E.length>2),"Button","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(E,"` at https://ant.design/components/icon")),Object(v.a)(!(S&&T(m)),"Button","`link` or `text` button can't be a `ghost` button.");var te=G("btn",p),ne=!1!==K,ae=x||B,re=ae&&{large:"lg",small:"sm",middle:void 0}[ae]||"",ce=D?"loading":E,ie=u()(te,(n={},Object(r.a)(n,"".concat(te,"-").concat(m),m),Object(r.a)(n,"".concat(te,"-").concat(O),"default"!==O&&O),Object(r.a)(n,"".concat(te,"-").concat(re),re),Object(r.a)(n,"".concat(te,"-icon-only"),!C&&0!==C&&!!ce),Object(r.a)(n,"".concat(te,"-background-ghost"),S&&!T(m)),Object(r.a)(n,"".concat(te,"-loading"),D),Object(r.a)(n,"".concat(te,"-two-chinese-chars"),H&&ne),Object(r.a)(n,"".concat(te,"-block"),P),Object(r.a)(n,"".concat(te,"-dangerous"),!!b),Object(r.a)(n,"".concat(te,"-rtl"),"rtl"===X),n),y),oe=E&&!D?E:o.createElement(N,{existIcon:!!E,prefixCls:te,loading:!!D}),se=C||0===C?function(e,t){var n=!1,a=[];return o.Children.forEach(e,(function(e){var t=Object(i.a)(e),r="string"===t||"number"===t;if(n&&r){var c=a.length-1,o=a[c];a[c]="".concat(o).concat(e)}else a.push(e);n=r})),o.Children.map(a,(function(e){return I(e,t)}))}(C,$()&&ne):null,le=Object(d.a)(M,["navigate"]);if(void 0!==le.href)return o.createElement("a",Object(a.a)({},le,{className:ie,onClick:ee,ref:Y}),oe,se);var ue=o.createElement("button",Object(a.a)({},M,{type:A,className:ie,onClick:ee,ref:Y}),oe,se);return T(m)?ue:o.createElement(j.a,{disabled:!!D},ue)},P=o.forwardRef(L);P.displayName="Button",P.Group=h,P.__ANT_BUTTON=!0;var R=P;t.a=R},270:function(e,t,n){"use strict";n(0);var a=n(271),r=n.n(a),c=n(114),i=n(278),o=n(258),s=n(6);t.a=function(e){var t=e.placeholder,n=e.value,a=e.inputOnChange,l=e.inputOnClick,u=e.array,d=e.isOpen,f=e.filteredArray,p=e.itemOnClick,m=e.valueClearOnClick;return Object(s.jsxs)("form",{className:r.a.SearchBar,children:[Object(s.jsx)("input",{type:"text",placeholder:t,className:r.a.searchInput,value:n,onChange:a,onClick:l}),Object(s.jsx)("ul",{className:r.a.autocomplete,children:function(){if(0!=u.length&&n&&d)return f.map((function(e){return Object(s.jsx)("li",{className:r.a.autocompleteItem,onClick:p,children:e.name},e.id)}))}()}),n?Object(s.jsx)(o.a,{type:"text",className:r.a.clearIcn,icon:Object(s.jsx)(c.a,{onClick:m})}):Object(s.jsx)(i.a,{className:r.a.searchIcn})]})}},271:function(e,t,n){e.exports={SearchBar:"SearchBar_SearchBar__RRzlj",searchInput:"SearchBar_searchInput__36zWT",autocomplete:"SearchBar_autocomplete__2U2iv",autocompleteItem:"SearchBar_autocompleteItem__1IqK4",clearIcn:"SearchBar_clearIcn__3eZu5",searchIcn:"SearchBar_searchIcn__3P2Sf"}},299:function(e,t,n){e.exports={CompetitionList:"CompetitionList_CompetitionList__1YMMy",Cards:"CompetitionList_Cards__2pegi",Card:"CompetitionList_Card__gipBw",Meta:"CompetitionList_Meta__2q_PF",PaginationRow:"CompetitionList_PaginationRow__1rodJ"}},318:function(e,t,n){e.exports={Main:"Main_Main__34-Gu",Title:"Main_Title__32woD"}},338:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(40),c=n(299),i=n.n(c),o=n(248),s=n(335),l=n(296),u=n(294),d=n(329),f=n(110),p=n(251),m=n.n(p),b=n(252),h=n(253),j=n.n(h),O=n(87),v=n(247),g=n(29),x=n(270),y=n(249),C=n(250),E=n(6),N=s.a.Meta,_=function(){var e=Object(o.a)(C.a),t=e.competitions,n=e.error,c=e.loading,p=Object(f.b)(),h=Object(a.useState)(!0),_=Object(r.a)(h,2),k=_[0],S=_[1],w=Object(g.d)(),T=Object(r.a)(w,2),I=T[0],L=T[1],P=I.get("name")||"",R=Object(a.useState)(P.replace(/-/g," ")),A=Object(r.a)(R,2),M=A[0],B=A[1],z=Object(a.useState)(1),W=Object(r.a)(z,2),D=W[0],F=W[1],U=Object(a.useState)(6),V=Object(r.a)(U,2),H=V[0],J=V[1],q=I.get("page")||"",G={name:"",page:"1"},K=t.filter((function(e){return e.name.toLowerCase().includes(M.toLocaleLowerCase())})),X=D*H,Y=X-H,Z=K.slice(Y,X),$=parseInt(q);Object(a.useEffect)((function(){p(function(){var e=Object(b.a)(m.a.mark((function e(t){var n,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t({type:O.a.FETCH_COMPETITIONS}),e.next=4,j.a.get("".concat("https://api.football-data.org/v2/competitions"),{headers:{"X-Auth-Token":"".concat("9c66b625857347689adf94d36fbaa083")}});case 4:n=e.sent,t({type:O.a.FETCH_COMPETITIONS_SUCCESS,payload:n.data.competitions}),e.next=14;break;case 8:e.prev=8,e.t0=e.catch(0),a=O.a.FETCH_COMPETITIONS_ERROR,Object(v.a)(e.t0.response.status,t,a,"\u0421\u043f\u0438\u0441\u043e\u043a \u0441\u043e\u0440\u0435\u0432\u043d\u043e\u0432\u0430\u043d\u0438\u0439 \u043d\u0435 \u0432\u0445\u043e\u0434\u0438\u0442 \u0432 \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0439 \u0442\u0430\u0440\u0438\u0444","\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0435 \u0441\u043f\u0438\u0441\u043a\u0430 \u0441\u043e\u0440\u0435\u0432\u043d\u043e\u0432\u0430\u043d\u0438\u0439");case 14:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()),G.name=P,G.page="1",L(G),F(1)}),[]),Object(a.useEffect)((function(){B(P.replace(/-/g," "))}),[P]),Object(a.useEffect)((function(){q||(G.name=P,G.page="1",F(1),L(G))}),[q]);return c||n?Object(E.jsx)(y.a,{loading:c,error:n}):Object(E.jsxs)("div",{className:i.a.CompetitionList,children:[Object(E.jsx)(u.a,{children:Object(E.jsx)(l.a,{span:24,children:Object(E.jsx)(x.a,{placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0441\u043e\u0440\u0435\u0432\u043d\u043e\u0432\u0430\u043d\u0438\u044f...",value:M,inputOnChange:function(e){B(e.target.value),G.name=e.target.value.replace(/ /g,"-"),G.page=q,L(G),G.name?F(1):F(parseInt(q))},inputOnClick:function(){S(!0)},array:t,isOpen:k,filteredArray:K,itemOnClick:function(e){var t=e.target;G.name=t.textContent.replace(/ /g,"-"),G.page=q,L(G),B(P.replace(/-/g," ")),S(!k)},valueClearOnClick:function(){G.name="",G.page=q,L(G),F(parseInt(q)),B("")}})})}),Object(E.jsx)(u.a,{className:i.a.Cards,gutter:[16,16],children:0!=t.length&&0!=K.length?Z.map((function(e){return Object(E.jsx)(l.a,{xl:8,lg:12,md:24,sm:24,xs:24,children:Object(E.jsx)(g.b,{to:"".concat(e.id),children:Object(E.jsx)(s.a,{className:i.a.Card,hoverable:!0,children:Object(E.jsx)(N,{className:i.a.Meta,title:e.name,description:e.area.name})})})},e.id)})):0!=t.length&&0===K.length?Object(E.jsx)("h1",{children:"\u0421\u043e\u0440\u0435\u0432\u043d\u043e\u0432\u0430\u043d\u0438\u0435 \u0441 \u0442\u0430\u043a\u0438\u043c \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435\u043c \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e"}):Object(E.jsx)("h1",{children:"\u0421\u043e\u0440\u0435\u0432\u043d\u043e\u0432\u0430\u043d\u0438\u044f \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u044b"})}),Object(E.jsx)(u.a,{className:i.a.PaginationRow,children:Object(E.jsx)(l.a,{span:24,children:Object(E.jsx)(d.a,{current:$,defaultCurrent:1,defaultPageSize:6,size:window.innerWidth<=420?"small":"default",responsive:!1,total:K.length,showSizeChanger:!0,onChange:function(e,t){F(e),J(t),G.name=P,G.page="".concat(e),L(G)},pageSizeOptions:["6","9","15","21"]})})})]})},k=n(318),S=n.n(k),w=n(64),T=n(336).a.Title;t.default=function(){return Object(E.jsx)("div",{className:S.a.Main,children:Object(E.jsxs)(w.a,{children:[Object(E.jsx)(T,{className:S.a.Title,children:"\u0421\u043f\u0438\u0441\u043e\u043a \u0441\u043e\u0440\u0435\u0432\u043d\u043e\u0432\u0430\u043d\u0438\u0439"}),Object(E.jsx)(_,{})]})})}}}]);
//# sourceMappingURL=9.03d2bc4c.chunk.js.map