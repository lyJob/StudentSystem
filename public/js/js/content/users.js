function Users(){
    this.container = $(".main_container")
}

Users.template = `
    <div class="user_content">
   <form>
    <div class="form-group">
        <label for="exampleInputEmail1">文章标题</label>
        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">作者</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">阅读量</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    </div>
  
    <div class="form-group" id="Article_content">
        
    </div>
   
    <button type="submit" class="btn btn-default">添加文章</button>
    </form>
    </div>
`

Users.prototype = {
    init:function(){
        this.createPage();
        this.createEditor();
    },
    createPage:function(){
        this.container.html("");
        this.container.append(Users.template);
    },
    createEditor:function(){
        var E = window.wangEditor
        var editor = new E('#Article_content')
        editor.create()
    }
   
}

