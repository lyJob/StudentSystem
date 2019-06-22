function Login(container){
    this.container = container;
    this.init();
}

Login.template = `
    <div class="logo">
        <img src="https://cas.1000phone.net/cas/images/login/logo.png">
    </div>
    <form id="login">
        <div class="form-group">
            <label for="login_username">用户名</label>
            <input type="text" class="form-control" id="login_username" placeholder="请输入用户名">
        </div>
        <div class="form-group">
            <label for="login_password">密码</label>
            <input type="password" class="form-control" id="login_password" placeholder="请输入密码">
        </div>
        <p class="text-primary register_info" id="js_pageToggle">立即注册</p>
        <button type="submit" class="btn btn-primary submit_btn">登陆</button>
    </form>
`

Login.prototype = {
    init:function(){
        this.createPage();
        this.paegToggle();
        this.login();
    },
    createPage:function(){
        this.container.html("")
        this.container.append(Login.template);
    },
    paegToggle:function(){
        this.container.find("#js_pageToggle").on("click",this.handleToggleCb.bind(this));
    },
    handleToggleCb(){
        new Page().createPage(true);
    },
    login:function(){
        this.container.find("#login").on("submit",this.handleLogonCb.bind(this))
    },
    handleLogonCb(e){
        e.preventDefault();
        var username = this.container.find("#login_username").val();
        var password = this.container.find("#login_password").val();
        $.ajax({
            type:"post",
            url:"/users/login",
            data:{
                username,
                password
            },
            success:this.handleLoginCbSucc.bind(this)
        })
    },
    handleLoginCbSucc(data){
       if(data.data.status == 1){
           window.location.href="http://localhost:3000/html/home.html"
       }
    }
}