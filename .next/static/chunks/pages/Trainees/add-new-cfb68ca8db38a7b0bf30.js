_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[23],{"3SwL":function(e,t,n){"use strict";var a=n("284h"),r=n("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.className,n=e.direction,a=e.index,r=e.marginDirection,s=e.children,d=e.split,p=e.wrap,u=c.useContext(o.SpaceContext),m=u.horizontalSize,f=u.verticalSize,j=u.latestIndex,h={};"vertical"===n?a<j&&(h={marginBottom:m/(d?2:1)}):h=(0,l.default)((0,l.default)({},a<j&&(0,i.default)({},r,m/(d?2:1))),p&&{paddingBottom:f});if(null===s||void 0===s)return null;return c.createElement(c.Fragment,null,c.createElement("div",{className:t,style:h},s),a<j&&d&&c.createElement("span",{className:"".concat(t,"-split"),style:h},d))};var i=r(n("lSNA")),l=r(n("pVnL")),c=a(n("q1tI")),o=n("Cp9S")},Cp9S:function(e,t,n){"use strict";var a=n("284h"),r=n("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.SpaceContext=void 0;var i=r(n("pVnL")),l=r(n("lSNA")),c=r(n("J4zp")),o=a(n("q1tI")),s=r(n("TSYQ")),d=r(n("0r0h")),p=n("vgIT"),u=r(n("3SwL")),m=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},f=o.createContext({latestIndex:0,horizontalSize:0,verticalSize:0});t.SpaceContext=f;var j={small:8,middle:16,large:24};var h=function(e){var t,n=o.useContext(p.ConfigContext),a=n.getPrefixCls,r=n.space,h=n.direction,x=e.size,v=void 0===x?(null===r||void 0===r?void 0:r.size)||"small":x,b=e.align,O=e.className,g=e.children,y=e.direction,w=void 0===y?"horizontal":y,S=e.prefixCls,C=e.split,I=e.style,z=e.wrap,N=void 0!==z&&z,_=m(e,["size","align","className","children","direction","prefixCls","split","style","wrap"]),E=o.useMemo((function(){return(Array.isArray(v)?v:[v,v]).map((function(e){return function(e){return"string"===typeof e?j[e]:e||0}(e)}))}),[v]),T=(0,c.default)(E,2),P=T[0],L=T[1],k=(0,d.default)(g,{keepEmpty:!0});if(0===k.length)return null;var J=void 0===b&&"horizontal"===w?"center":b,M=a("space",S),q=(0,s.default)(M,"".concat(M,"-").concat(w),(t={},(0,l.default)(t,"".concat(M,"-rtl"),"rtl"===h),(0,l.default)(t,"".concat(M,"-align-").concat(J),J),t),O),B="".concat(M,"-item"),R="rtl"===h?"marginLeft":"marginRight",A=0,D=k.map((function(e,t){return null!==e&&void 0!==e&&(A=t),o.createElement(u.default,{className:B,key:"".concat(B,"-").concat(t),direction:w,index:t,marginDirection:R,split:C,wrap:N},e)}));return o.createElement("div",(0,i.default)({className:q,style:(0,i.default)((0,i.default)({},N&&{flexWrap:"wrap",marginBottom:-L}),I)},_),o.createElement(f.Provider,{value:{horizontalSize:P,verticalSize:L,latestIndex:A}},D))};t.default=h},IDaI:function(e,t,n){"use strict";n.r(t);n("MaXC");var a=n("4IMT"),r=n.n(a),i=(n("nTym"),n("qu0K")),l=n.n(i),c=(n("cUip"),n("iJl9")),o=n.n(c),s=n("KQm4"),d=(n("lfLe"),n("Cp9S")),p=n.n(d),u=n("nKUr"),m=n("o0o1"),f=n.n(m),j=n("HaE+"),h=n("q1tI"),x=n("TsMp"),v=n("wyBh"),b={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm104 316.9c0 10.2-4.9 19.9-13.2 25.9L457.4 512l145.4 105.2c8.3 6 13.2 15.6 13.2 25.9V690c0 6.5-7.4 10.3-12.7 6.5l-246-178a7.95 7.95 0 010-12.9l246-178a8 8 0 0112.7 6.5v46.8z"}}]},name:"left-circle",theme:"filled"},O=n("6VBw"),g=function(e,t){return h.createElement(O.a,Object.assign({},e,{ref:t,icon:b}))};g.displayName="LeftCircleFilled";var y=h.forwardRef(g),w=n("20a2");!function(){var e=Object(j.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))}();t.default=Object(x.a)((function(){var e=Object(w.useRouter)();return Object(u.jsxs)("div",{children:[Object(u.jsxs)(p.a,{style:{margin:"6px 0px"},children:[Object(u.jsx)(y,{style:{fontSize:"20px",color:v.primary_color},onClick:function(){e.replace("/Trainees")}}),Object(u.jsx)("div",{style:{fontSize:"20px",fontWeight:500},children:"Trainees"}),Object(u.jsx)("div",{style:{fontSize:"20px",fontWeight:600},children:"|"}),Object(u.jsx)("div",{style:{fontSize:"20px",fontWeight:500,color:v.primary_color},children:"New Trainees"})]}),Object(u.jsx)("div",{style:{width:"auto",backgroundColor:v.primary_color,height:"2px"}}),Object(u.jsx)("br",{}),Object(u.jsxs)(l.a,{labelCol:{span:8},wrapperCol:{span:8},onFinish:function(t){console.log(JSON.stringify(t));var n=localStorage.getItem("trainee_data"),a=JSON.parse(n);a=[].concat(Object(s.a)(a),[{name:t.name,username:t.username,department:t.department,phone:t.phone,email:t.email,age:0}]),localStorage.setItem("trainee_data",JSON.stringify(a)),console.log(a),e.replace("/Trainees")},children:[Object(u.jsx)("h3",{children:"Trainee Information"}),Object(u.jsx)(l.a.Item,{name:"name",children:Object(u.jsx)(o.a,{placeholder:"Full Name"})}),Object(u.jsx)(l.a.Item,{name:"username",children:Object(u.jsx)(o.a,{placeholder:"Username"})}),Object(u.jsx)(l.a.Item,{name:"department",children:Object(u.jsx)(o.a,{placeholder:"Department"})}),Object(u.jsx)("h3",{children:"Contact Information"}),Object(u.jsx)(l.a.Item,{name:"phone",children:Object(u.jsx)(o.a,{placeholder:"Phone Number"})}),Object(u.jsx)(l.a.Item,{name:"email",children:Object(u.jsx)(o.a,{placeholder:"Email(optional)"})}),Object(u.jsx)(l.a.Item,{children:Object(u.jsx)(r.a,{style:{borderRadius:5},type:"primary",htmlType:"submit",children:"Create Account"})})]})]})}))},lfLe:function(e,t,n){"use strict";n("VEUW"),n("v9cZ")},veiZ:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/Trainees/add-new",function(){return n("IDaI")}])}},[["veiZ",0,2,1,3,4,5,6,7,9,8,11,12,10]]]);