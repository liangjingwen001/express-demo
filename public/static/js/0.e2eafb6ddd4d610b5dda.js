webpackJsonp([0],{"9O00":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s={name:"HelloWorld",data:function(){return{userName:"",passWord:"",mailbox:""}},methods:{reg:function(){var e=this;this.$ajax.register({params:{userName:this.userName,passWord:this.passWord},success:function(a){200===a.data.code?e.$router.push({name:"login"}):alert(a.data.msg)}})},getCode:function(){this.$ajax.getCode({params:{mailbox:this.mailbox},success:function(e){200===e.data.code||alert(e.data.msg)}})},log:function(){this.$router.push({name:"login"})}}},o={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"container"},[t("h1",[e._v("注册页面")]),e._v(" "),t("div",{staticClass:"content"},[t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.userName,expression:"userName"}],attrs:{type:"text",placeholder:"Username"},domProps:{value:e.userName},on:{input:function(a){a.target.composing||(e.userName=a.target.value)}}})]),e._v(" "),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.passWord,expression:"passWord"}],attrs:{type:"text",placeholder:"Password"},domProps:{value:e.passWord},on:{input:function(a){a.target.composing||(e.passWord=a.target.value)}}})]),e._v(" "),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.mailbox,expression:"mailbox"}],attrs:{type:"text",placeholder:"mailbox"},domProps:{value:e.mailbox},on:{input:function(a){a.target.composing||(e.mailbox=a.target.value)}}}),t("span",{on:{click:e.getCode}},[e._v("获取验证码")])]),e._v(" "),t("div",{staticClass:"btn",on:{click:e.reg}},[e._v("注册")]),e._v(" "),t("div",{on:{click:e.log}},[e._v("立即登录")])])])},staticRenderFns:[]};var r=t("VU/8")(s,o,!1,function(e){t("CCRm")},"data-v-ffacd0e2",null);a.default=r.exports},CCRm:function(e,a){}});
//# sourceMappingURL=0.e2eafb6ddd4d610b5dda.js.map