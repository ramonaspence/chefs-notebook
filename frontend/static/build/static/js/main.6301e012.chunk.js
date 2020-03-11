(this.webpackJsonpstatic=this.webpackJsonpstatic||[]).push([[0],{14:function(e,t,a){},37:function(e,t,a){e.exports=a(66)},44:function(e,t,a){},66:function(e,t,a){"use strict";a.r(t);a(38),a(22),a(39);var n=a(0),l=a.n(n),o=a(34),r=a.n(o),c=(a(44),a(4)),s=a(5),i=a(7),u=a(6),m=a(8),h=(a(14),a(15)),d=a(13),p=a(17),f=a(3),g=a(1),b=a.n(g);b.a.defaults.xsrfCookieName="csrftoken",b.a.defaults.xsrfHeaderName="X-CSRFToken";var E=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).state={recipe:{}},e.handleChange=e.handleChange.bind(Object(f.a)(e)),e.handleSubmit=e.handleSubmit.bind(Object(f.a)(e)),e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"handleChange",value:function(e){e.preventDefault(),this.setState(Object(p.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e,t){e.preventDefault();var a=new FormData;a.append("title",t.title),a.append("description",t.description),a.append("image",t.image),a.append("ingredients",t.ingredients),a.append("instructions",t.instructions),b.a.post("".concat("http://localhost:3000","/api/v1/recipes/"),a,{headers:{"content-type":"multipart/form-data"}}).then((function(e){return console.log(e,e.data)})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"row no-gutters"},l.a.createElement("div",{className:"col-10 offset-1"},l.a.createElement("form",{type:"submit",onSubmit:function(t){return e.handleSubmit(t,e.state)}},l.a.createElement("label",{htmlFor:"title"},"Recipe Title:"),l.a.createElement("input",{type:"text",name:"title",onChange:this.handleChange,defaultValue:""}),l.a.createElement("label",{htmlFor:"description"},"Description:"),l.a.createElement("input",{type:"text",name:"description",onChange:this.handleChange,defaultValue:""}),l.a.createElement("label",{htmlFor:"image"},"Add an Image for this Recipe"),l.a.createElement("input",{type:"file",accept:"image/jpg, image/jpeg, image/png",alt:"",name:"image",onChange:this.handleChange}),l.a.createElement("label",{htmlFor:"ingredients"},"Keep your list of ingredients here"),l.a.createElement("input",{type:"text",name:"ingredients",onChange:this.handleChange,defaultValue:""}),l.a.createElement("label",{htmlFor:"instructions"},"Tell us how to make it!"),l.a.createElement("input",{type:"text",name:"instructions",onChange:this.handleChange,defaultValue:""}),l.a.createElement("button",null,"Save Recipe"))))}}]),t}(n.Component);b.a.defaults.xsrfCookieName="csrftoken",b.a.defaults.xsrfHeaderName="X-CSRFToken";var v=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).state={recipes:[]},e.componentDidMount=e.componentDidMount.bind(Object(f.a)(e)),e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;b.a.get("".concat("http://localhost:3000","/api/v1/recipes/")).then((function(t){return e.setState({recipes:t.data})})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){var e=this.state.recipes.map((function(e){return l.a.createElement("div",{className:"row no-gutters"},l.a.createElement("ul",{className:"col-8 offset-2 mr-auto"},l.a.createElement("h2",null,e.title),l.a.createElement("p",null,e.description),l.a.createElement("p",null,e.date_published)),l.a.createElement("div",{className:"col-4 ml-auto"},l.a.createElement("img",{src:e.image,alt:"Whoops! Sorry! No can do."})),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("p",null,e.instructions))),l.a.createElement("p",null,e.date_updated))}));return l.a.createElement("ul",null,l.a.createElement("li",null,e))}}]),t}(n.Component);b.a.defaults.xsrfCookieName="csrftoken",b.a.defaults.xsrfHeaderName="X-CSRFToken";var C=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).state={username:"",email:"",password1:"",password2:""},e.signUp=e.signUp.bind(Object(f.a)(e)),e.handleChange=e.handleChange.bind(Object(f.a)(e)),e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"handleChange",value:function(e){e.preventDefault(),this.setState(Object(p.a)({},e.target.name,e.target.value))}},{key:"signUp",value:function(e){e.preventDefault(),console.log(this.state),b.a.post("".concat("http://localhost:3000","/rest-auth/registration/"),this.state).then((function(e){console.log(e),console.log(e.data)})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return l.a.createElement("div",{className:"card-body"},l.a.createElement("form",{method:"post",type:"submit",onSubmit:this.signUp},l.a.createElement("label",{htmlFor:"username"},"Username:"),l.a.createElement("input",{type:"text",name:"username",placeholder:"Username",value:this.state.username,onChange:this.handleChange}),l.a.createElement("label",{htmlFor:"email"},"Email:"),l.a.createElement("input",{type:"email",name:"email",value:this.state.email,onChange:this.handleChange}),l.a.createElement("label",{htmlFor:"password"},"Password:"),l.a.createElement("input",{type:"password",name:"password1",value:this.state.password1,onChange:this.handleChange}),l.a.createElement("label",{htmlFor:"password_2"},"Password Confirm:"),l.a.createElement("input",{type:"password",name:"password2",value:this.state.password2,onChange:this.handleChange}),l.a.createElement("button",{className:"btn btn-outline-success"},"Register")))}}]),t}(n.Component);b.a.defaults.xsrfCookieName="csrftoken",b.a.defaults.xsrfHeaderName="X-CSRFToken";var j=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).state={username:"",password:""},e.handleLogin=e.handleLogin.bind(Object(f.a)(e)),e.handleChange=e.handleChange.bind(Object(f.a)(e)),e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"handleChange",value:function(e){e.preventDefault(),this.setState(Object(p.a)({},e.target.name,e.target.value))}},{key:"handleLogin",value:function(e){e.preventDefault(),console.log("hello"),b.a.post("".concat("http://localhost:3000","/rest-auth/login/"),this.state).then((function(e){console.log(e),console.log(e.data)})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return l.a.createElement("div",{className:"card-body"},l.a.createElement("form",{method:"post",type:"submit",onSubmit:this.handleLogin},l.a.createElement("label",{htmlFor:"username"},"Username:"),l.a.createElement("input",{type:"text",value:this.state.username,autoComplete:"username",name:"username",onChange:this.handleChange}),l.a.createElement("label",{htmlFor:"password"},"Password:"),l.a.createElement("input",{type:"password",value:this.state.password,autoComplete:"current-password",name:"password",onChange:this.handleChange}),l.a.createElement("button",null,"Log In")))}}]),t}(n.Component);b.a.defaults.xsrfCookieName="csrftoken",b.a.defaults.xsrfHeaderName="X-CSRFToken";var O=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).handleLogout=e.handleLogout.bind(Object(f.a)(e)),e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"handleLogout",value:function(e){e.preventDefault(),b.a.post("".concat("http://localhost:3000","/rest-auth/logout/")).then((function(e){console.log(e,e.data),alert(e.data.detail)})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return l.a.createElement("div",{className:"row no-gutters"},l.a.createElement("ul",null,l.a.createElement(h.b,{to:"/"},l.a.createElement("li",null,"Home")),l.a.createElement(h.b,{to:"/login"},l.a.createElement("li",null,"Login")),l.a.createElement(h.b,{to:"/logout",onClick:this.handleLogout},l.a.createElement("li",null,"Logout")),l.a.createElement(h.b,{to:"/signup"},l.a.createElement("li",null,"Sign Up"))))}}]),t}(n.Component);b.a.defaults.xsrfCookieName="csrftoken",b.a.defaults.xsrfHeaderName="X-CSRFToken";var k=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"row no-gutters"},l.a.createElement("h1",null,"This is the Home Page"))}}]),t}(n.Component);b.a.defaults.xsrfCookieName="csrftoken",b.a.defaults.xsrfHeaderName="X-CSRFToken";var y=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement(h.a,null,l.a.createElement("div",{className:"container-fluid"},l.a.createElement(O,null),l.a.createElement(d.c,null,l.a.createElement(d.a,{path:"/",exact:!0,component:k}),l.a.createElement(d.a,{path:"/add/recipe",component:E}),l.a.createElement(d.a,{path:"/recipe",component:v}),l.a.createElement(d.a,{path:"/login",component:j}),l.a.createElement(d.a,{path:"/signup",component:C}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));b.a.defaults.xsrfCookieName="csrftoken",b.a.defaults.xsrfHeaderName="X-CSRFToken",r.a.render(l.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[37,1,2]]]);
//# sourceMappingURL=main.6301e012.chunk.js.map