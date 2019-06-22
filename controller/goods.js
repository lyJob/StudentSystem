const path = require('path');
const goodsModel = require('../model/goods');

const add = (req, res, next) => {
	let { goodsName, goodsPrice, tel, goodsDes } = req.body;
	//path.parse 处理路径 将路径做一个解析 解析成一个对象
	let pathUrl = 'http://localhost:3000/img/' + path.parse(req.files.goodsPic[0].path).base;

	goodsModel.goodsSave({ goodsName, goodsPrice, tel, goodsDes, goodsPic: pathUrl }, data => {
		console.log(goodsName, goodsPrice, tel, goodsDes);
		if (data) {
			res.json({
				code: 200,
				errMsg: '',
				data: {
					status: 1,
					info: '添加成功'
				}
			});
		} else {
			res.json({
				code: 500,
				errMsg: '服务器错误',
				data: {
					status: 0,
					info: '添加失败'
				}
			});
		}
	});
};

const list = (req, res, next) => {
	let { page, limit } = req.query;
	limit = Number(limit);
	page = Number(page);

	//获取数据
	goodsModel.goodsFind({ page: (page - 1) * limit, limit }, data => {
		if (data.length > 0) {
			res.json({
				code: 200,
				errMsg: '',
				data: {
					status: 1,
					list: data
				}
			});
		} else {
			res.json({
				code: 200,
				errMsg: '暂无数据',
				data: {
					status: 0,
					list: []
				}
			});
		}
	});
};

module.exports = {
	add,
	list
};
