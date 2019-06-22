//引入加密的模块
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const userModel = require("../model/users")

const secret = "1905";



const register = (req,res,next)=>{
    //接收post提交的数据req.body  接收get传递的参数req.query
    let {username,password} = req.body;

    //判断当前用户名称是否存在
    userModel.userFind({username},(data)=>{
        //data存在用户名已存在
        if(data){
            res.json({
                code:200,
                errMsg:"",
                data:{
                    status:0,
                    info:"用户名已存在"
                }
            })
        }else{
            //1、创建sha256算法
            const hash = crypto.createHash('sha256');
            //2、添加需要加密的内容
            hash.update(password);
            //3、获取加密的内容
           // console.log(hash.digest('hex'));
        
            userModel.userSave({username,password:hash.digest('hex')},()=>{
                res.json({
                    code:200,
                    errMsg:"",
                    data:{
                        status:1,
                        info:"注册成功"
                    }
                })
            })
        }
    })
}


const login = (req,res,next)=>{
    //接收用户传递过来的数据
    let {username,password} = req.body;

    //查用户名是否存在
    userModel.userFind({username},(result)=>{
        if(result){
             //1、创建sha256算法
            const hash = crypto.createHash('sha256');
            //2、添加需要加密的内容
            hash.update(password);

            if(result.password == hash.digest('hex')){
                //用户名和密码验证成功后发送一个token到客户端

                //token 1 生成一个token
                let token = jwt.sign({username}, secret, { expiresIn: '1h' });
                //向客户端发送cookie
                res.cookie("token",token);


                res.json({
                    code:200,
                    errMsg:"",
                    data:{
                        status:1,
                        info:"登陆成功"
                    }
                })
            }else{
                res.json({
                    code:200,
                    errMsg:"",
                    data:{
                        status:2,
                        info:"密码错误"
                    }
                })
            }

        }else{
            res.json({
                code:200,
                errMsg:"",
                data:{
                    status:0,
                    info:"用户名不存在"
                }
            })
        }
    })
}



module.exports = {
    register,
    login
}



/*
    加密的方式：
        1、md5加密  可以进行解密
        2、sha256加密 只能加密不能解密


        1、你需要加密的内容
            +
        2、加盐
            +
        3、加随机字符串


    sha256(你需要加密的内容 + 加盐 +加随机字符串)
*/