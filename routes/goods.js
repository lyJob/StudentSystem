var express = require('express');
var router = express.Router();
//1、引入处理formData数据的模块
var multer = require('multer');
var goodsController = require('../controller/goods');

//2、处理图片的路径 以及设置将客户端传递到服务端的图片的位置
var storage = multer.diskStorage({
	//设置图片的位置
	destination: function(req, file, cb) {
		cb(null, './public/img');
		console.log(cb);
	},

	//处理图片的名称
	filename: function(req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});

//3、使用当前配置
var upload = multer({ storage: storage });

//4、设置传递图片的key值，以及这个key值可以传递多少张图片
var cpUpload = upload.fields([{ name: 'goodsPic', maxCount: 1 }]);

//添加商品
router.post('/add', cpUpload, goodsController.add);

//获取商品列表
router.get('/list', cpUpload, goodsController.list);

//修改商品信息
router.post('/modify', cpUpload, goodsController.modify);

//商品列表下架
router.get('/removeg', cpUpload, goodsController.removeg);

module.exports = router;
