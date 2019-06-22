const mongoose = require("../utils/database").mongoose;

let User = mongoose.model("user",{
    username:String,
    password:String
})

//专门给逻辑层写数据查的方法
const userFind = (userInfo,cb)=>{
    User.findOne(userInfo).then((result)=>{
        cb(result)
    })
}
//专门给逻辑层写数据增的方法
const userSave = (userInfo,cb)=>{
    let user = new User(userInfo);
    user.save().then((result)=>{
        cb(result)
    })
}

module.exports = {
    userFind,
    userSave
}

/*登陆的流程
    当用户填写用户名密码进行登陆的时候，将用户名和密码发送到服务器。服务器进行校验验证.如果用户名和密码正确
    生成一个Token值，将这个token值发送到客户端。

    当客户端如果进行数据的请求的时候，必须要携带当前的token值。服务器在接收到接口请求的时候，将客户端传递
    过来的token值进行验证(将客户端传递过来的token和登陆时的token值进行验证，如果一样则返回数据，如果不一样
    则要求重新登陆
    
    )



*/