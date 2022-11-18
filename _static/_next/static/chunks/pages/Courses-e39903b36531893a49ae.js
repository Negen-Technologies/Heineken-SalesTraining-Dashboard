_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[19],{"/MfK":function(e,t,n){"use strict";var a=n("q1tI"),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"},r=n("6VBw"),i=function(e,t){return a.createElement(r.a,Object.assign({},e,{ref:t,icon:c}))};i.displayName="DeleteOutlined";t.a=a.forwardRef(i)},"5GXF":function(e,t,n){"use strict";var a=n("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n("eKCK")).default;t.default=c},"7LYo":function(e,t,n){"use strict";n("VEUW"),n("n3pV")},E1MH:function(e,t,n){"use strict";n.r(t),n.d(t,"Panel",(function(){return w}));var a=n("rePB"),c=n("KQm4"),r=n("1OyB"),i=n("vuIU"),l=n("Ji7U"),o=n("LK+K"),s=n("q1tI"),d=n("TSYQ"),u=n.n(d),p=n("Gytx"),f=n.n(p),v=n("Zm9Q"),h=n("8XRh"),b=n("ODXe"),x=s.forwardRef((function(e,t){var n,c=e.prefixCls,r=e.forceRender,i=e.className,l=e.style,o=e.children,d=e.isActive,p=e.role,f=s.useState(d||r),v=Object(b.a)(f,2),h=v[0],x=v[1];return s.useEffect((function(){(r||d)&&x(!0)}),[r,d]),h?s.createElement("div",{ref:t,className:u()("".concat(c,"-content"),(n={},Object(a.a)(n,"".concat(c,"-content-active"),d),Object(a.a)(n,"".concat(c,"-content-inactive"),!d),n),i),style:l,role:p},s.createElement("div",{className:"".concat(c,"-content-box")},o)):null}));x.displayName="PanelContent";var j=x,m=function(e){Object(l.a)(n,e);var t=Object(o.a)(n);function n(){var e;return Object(r.a)(this,n),(e=t.apply(this,arguments)).handleItemClick=function(){var t=e.props,n=t.onItemClick,a=t.panelKey;"function"===typeof n&&n(a)},e.handleKeyPress=function(t){"Enter"!==t.key&&13!==t.keyCode&&13!==t.which||e.handleItemClick()},e}return Object(i.a)(n,[{key:"shouldComponentUpdate",value:function(e){return!f()(this.props,e)}},{key:"render",value:function(){var e,t,n=this,c=this.props,r=c.className,i=c.id,l=c.style,o=c.prefixCls,d=c.header,p=c.headerClass,f=c.children,v=c.isActive,b=c.showArrow,x=c.destroyInactivePanel,m=c.accordion,y=c.forceRender,O=c.openMotion,g=c.expandIcon,C=c.extra,w=c.collapsible,k="disabled"===w,I=u()("".concat(o,"-header"),(e={},Object(a.a)(e,p,p),Object(a.a)(e,"".concat(o,"-header-collapsible-only"),"header"===w),e)),E=u()((t={},Object(a.a)(t,"".concat(o,"-item"),!0),Object(a.a)(t,"".concat(o,"-item-active"),v),Object(a.a)(t,"".concat(o,"-item-disabled"),k),t),r),N=s.createElement("i",{className:"arrow"});return b&&"function"===typeof g&&(N=g(this.props)),s.createElement("div",{className:E,style:l,id:i},s.createElement("div",{className:I,onClick:function(){return"header"!==w&&n.handleItemClick()},role:m?"tab":"button",tabIndex:k?-1:0,"aria-expanded":v,onKeyPress:this.handleKeyPress},b&&N,"header"===w?s.createElement("span",{onClick:this.handleItemClick,className:"".concat(o,"-header-text")},d):d,C&&s.createElement("div",{className:"".concat(o,"-extra")},C)),s.createElement(h.default,Object.assign({visible:v,leavedClassName:"".concat(o,"-content-hidden")},O,{forceRender:y,removeOnLeave:x}),(function(e,t){var n=e.className,a=e.style;return s.createElement(j,{ref:t,prefixCls:o,className:n,style:a,isActive:v,forceRender:y,role:m?"tabpanel":null},f)})))}}]),n}(s.Component);m.defaultProps={showArrow:!0,isActive:!1,onItemClick:function(){},headerClass:"",forceRender:!1};var y=m;function O(e){var t=e;return Array.isArray(t)||(t=t?[t]:[]),t.map((function(e){return String(e)}))}var g=function(e){Object(l.a)(n,e);var t=Object(o.a)(n);function n(e){var a;Object(r.a)(this,n),(a=t.call(this,e)).onClickItem=function(e){var t=a.state.activeKey;if(a.props.accordion)t=t[0]===e?[]:[e];else{var n=(t=Object(c.a)(t)).indexOf(e);n>-1?t.splice(n,1):t.push(e)}a.setActiveKey(t)},a.getNewChild=function(e,t){if(!e)return null;var n=a.state.activeKey,c=a.props,r=c.prefixCls,i=c.openMotion,l=c.accordion,o=c.destroyInactivePanel,d=c.expandIcon,u=c.collapsible,p=e.key||String(t),f=e.props,v=f.header,h=f.headerClass,b=f.destroyInactivePanel,x=f.collapsible,j=null!==x&&void 0!==x?x:u,m={key:p,panelKey:p,header:v,headerClass:h,isActive:l?n[0]===p:n.indexOf(p)>-1,prefixCls:r,destroyInactivePanel:null!==b&&void 0!==b?b:o,openMotion:i,accordion:l,children:e.props.children,onItemClick:"disabled"===j?null:a.onClickItem,expandIcon:d,collapsible:j};return"string"===typeof e.type?e:s.cloneElement(e,m)},a.getItems=function(){var e=a.props.children;return Object(v.a)(e).map(a.getNewChild)},a.setActiveKey=function(e){"activeKey"in a.props||a.setState({activeKey:e}),a.props.onChange(a.props.accordion?e[0]:e)};var i=e.activeKey,l=e.defaultActiveKey;return"activeKey"in e&&(l=i),a.state={activeKey:O(l)},a}return Object(i.a)(n,[{key:"shouldComponentUpdate",value:function(e,t){return!f()(this.props,e)||!f()(this.state,t)}},{key:"render",value:function(){var e,t=this.props,n=t.prefixCls,c=t.className,r=t.style,i=t.accordion,l=u()((e={},Object(a.a)(e,n,!0),Object(a.a)(e,c,!!c),e));return s.createElement("div",{className:l,style:r,role:i?"tablist":null},this.getItems())}}],[{key:"getDerivedStateFromProps",value:function(e){var t={};return"activeKey"in e&&(t.activeKey=O(e.activeKey)),t}}]),n}(s.Component);g.defaultProps={prefixCls:"rc-collapse",onChange:function(){},accordion:!1,destroyInactivePanel:!1},g.Panel=y;var C=g,w=(t.default=C,C.Panel)},G3dp:function(e,t,n){"use strict";var a=n("q1tI"),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"},r=n("6VBw"),i=function(e,t){return a.createElement(r.a,Object.assign({},e,{ref:t,icon:c}))};i.displayName="EditOutlined";t.a=a.forwardRef(i)},Y2s6:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n("nKUr"),c=(n("q1tI"),n("wyBh")),r=function(e){var t=e.num,n=e.text;return Object(a.jsx)("div",{style:{width:"auto",margin:"20px 0px",height:"120px",backgroundColor:c.b,borderRadius:"12px",maxWidth:"250px",display:"flex",alignItems:"center"},children:Object(a.jsxs)("div",{style:{margin:"22px"},children:[Object(a.jsx)("div",{style:{color:"white",fontSize:30,fontWeight:700},children:t}),Object(a.jsx)("p",{style:{color:"white",fontSize:16,fontWeight:300},children:n})]})})}},Y41c:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Courses",function(){return n("zYVD")}])},eKCK:function(e,t,n){"use strict";var a=n("284h"),c=n("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=c(n("pVnL")),i=c(n("lSNA")),l=a(n("q1tI")),o=c(n("E1MH")),s=c(n("TSYQ")),d=c(n("fEPi")),u=c(n("0r0h")),p=c(n("+04X")),f=c(n("kPwQ")),v=n("vgIT"),h=c(n("StrI")),b=n("vCXI"),x=function(e){var t,n=l.useContext(v.ConfigContext),a=n.getPrefixCls,c=n.direction,f=e.prefixCls,x=e.className,j=void 0===x?"":x,m=e.bordered,y=void 0===m||m,O=e.ghost,g=a("collapse",f),C=function(){var t=e.expandIconPosition;return void 0!==t?t:"rtl"===c?"right":"left"}(),w=(0,s.default)((t={},(0,i.default)(t,"".concat(g,"-borderless"),!y),(0,i.default)(t,"".concat(g,"-icon-position-").concat(C),!0),(0,i.default)(t,"".concat(g,"-rtl"),"rtl"===c),(0,i.default)(t,"".concat(g,"-ghost"),!!O),t),j),k=(0,r.default)((0,r.default)({},h.default),{motionAppear:!1,leavedClassName:"".concat(g,"-content-hidden")});return l.createElement(o.default,(0,r.default)({openMotion:k},e,{bordered:y,expandIcon:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.expandIcon,a=n?n(t):l.createElement(d.default,{rotate:t.isActive?90:void 0});return(0,b.cloneElement)(a,(function(){return{className:(0,s.default)(a.props.className,"".concat(g,"-arrow"))}}))},prefixCls:g,className:w}),function(){var t=e.children;return(0,u.default)(t).map((function(e,t){var n;if(null===(n=e.props)||void 0===n?void 0:n.disabled){var a=e.key||String(t),c=e.props,i=c.disabled,l=c.collapsible,o=(0,r.default)((0,r.default)({},(0,p.default)(e.props,["disabled"])),{key:a,collapsible:null!==l&&void 0!==l?l:i?"disabled":void 0});return(0,b.cloneElement)(e,o)}return e}))}())};x.Panel=f.default;var j=x;t.default=j},kPwQ:function(e,t,n){"use strict";var a=n("284h"),c=n("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=c(n("pVnL")),i=c(n("lSNA")),l=a(n("q1tI")),o=c(n("E1MH")),s=c(n("TSYQ")),d=n("vgIT"),u=c(n("m4nH")),p=function(e){(0,u.default)(!("disabled"in e),"Collapse.Panel",'`disabled` is deprecated. Please use `collapsible="disabled"` instead.');var t=l.useContext(d.ConfigContext).getPrefixCls,n=e.prefixCls,a=e.className,c=void 0===a?"":a,p=e.showArrow,f=void 0===p||p,v=t("collapse",n),h=(0,s.default)((0,i.default)({},"".concat(v,"-no-arrow"),!f),c);return l.createElement(o.default.Panel,(0,r.default)({},e,{prefixCls:v,className:h}))};t.default=p},zYVD:function(e,t,n){"use strict";n.r(t);n("MaXC");var a=n("4IMT"),c=n.n(a),r=(n("7LYo"),n("5GXF")),i=n.n(r),l=(n("lSEL"),n("UIqZ")),o=n.n(l),s=(n("W93S"),n("pWf2")),d=n.n(s),u=(n("hr7U"),n("9xET")),p=n.n(u),f=n("nKUr"),v=(n("fv9D"),n("ZPTe")),h=n.n(v),b=n("q1tI"),x=n("G3dp"),j={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"}}]},name:"eye",theme:"outlined"},m=n("6VBw"),y=function(e,t){return b.createElement(m.a,Object.assign({},e,{ref:t,icon:j}))};y.displayName="EyeOutlined";var O=b.forwardRef(y),g=n("/MfK"),C=n("TsMp"),w=n("wyBh"),k=n("Y2s6");t.default=Object(C.a)((function(){return Object(f.jsx)("div",{children:Object(f.jsxs)(p.a,{children:[Object(f.jsxs)(h.a,{span:16,style:{padding:"0px 50px"},children:[Object(f.jsx)("h1",{style:{fontSize:20,fontWeight:600,color:w.b},children:"Overview"}),Object(f.jsx)("div",{style:{width:"auto",backgroundColor:w.b,height:"2px"}}),Object(f.jsxs)(p.a,{gutter:{xs:8,sm:16,md:24,lg:32},children:[Object(f.jsx)(h.a,{span:8,children:Object(f.jsx)(k.a,{num:1,text:"Courses"})}),Object(f.jsx)(h.a,{span:8,children:Object(f.jsx)(k.a,{num:14,text:"Modules"})}),Object(f.jsx)(h.a,{span:8,children:Object(f.jsx)(k.a,{num:214,text:"Lessons"})})]}),Object(f.jsx)(i.a,{collapsible:"header",accordion:!0,defaultActiveKey:["1"],children:Object(f.jsx)(i.a.Panel,{style:{fontSize:18,fontWeight:600},header:"Essential Sales Training",extra:Object(f.jsxs)(p.a,{children:[Object(f.jsx)(d.a,{size:"small",style:{backgroundColor:w.b,margin:"0px 2px"},icon:Object(f.jsx)(x.a,{onClick:function(){console.log("hjhj")}})}),Object(f.jsx)(d.a,{size:"small",style:{backgroundColor:w.b,margin:"0px 2px"},icon:Object(f.jsx)(O,{onClick:function(){console.log("hjhj")}})}),Object(f.jsx)(d.a,{size:"small",style:{backgroundColor:"red",margin:"0px 2px"},icon:Object(f.jsx)(g.a,{onClick:function(){console.log("jkkjk")}})})]}),children:Object(f.jsxs)("div",{style:{fontSize:14,fontWeight:400,color:w.b},children:[Object(f.jsx)("div",{children:"Module 1: Introduction to Heiniken products"}),Object(f.jsx)(o.a,{style:{margin:"7px 0px"}}),Object(f.jsx)("div",{children:"Module 2: Grooming and business etiquette"}),Object(f.jsx)(o.a,{style:{margin:"7px 0px"}}),Object(f.jsx)("div",{children:"Module 3: Customer handling"}),Object(f.jsx)(o.a,{style:{margin:"7px 0px"}}),Object(f.jsx)("div",{children:"Module 4: Outlet relations"}),Object(f.jsx)(o.a,{style:{margin:"7px 0px"}})]})},"1")})]}),Object(f.jsxs)(h.a,{span:6,children:[Object(f.jsx)("h1",{style:{fontSize:20,fontWeight:600,color:w.b},children:"Actions"}),Object(f.jsx)("div",{style:{width:"auto",backgroundColor:w.b,height:"2px"}}),Object(f.jsx)("div",{style:{marginBottom:12}}),Object(f.jsx)(c.a,{style:{width:"202px",margin:"8px 0px",borderRadius:6},type:"primary",children:"Course Builder"}),Object(f.jsx)(c.a,{style:{width:"202px",margin:"8px 0px",borderRadius:6},type:"primary",children:"View Courses"}),Object(f.jsx)(c.a,{style:{width:"202px",margin:"8px 0px",borderRadius:6},type:"primary",children:"View Trainees"})]})]})})}))}},[["Y41c",0,2,1,3,4,5,6,7,8,10]]]);