function Page(){
    this.container = $(".content");
}
Page.prototype = {
    init:function(){
        this.createPage(true)
    },
    createPage:function(flag){
        if(flag){
            this.register = new Register(this.container);
        }else{
            this.login = new Login(this.container);
        }
    }
}

new Page().init()
