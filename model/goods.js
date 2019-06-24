const mongoose = require('../utils/database').mongoose;

let Goods = mongoose.model('goods', {
	goodsName: String,
	goodsPrice: Number,
	goodsDes: String,
	tel: String,
	goodsPic: String
});

let goodsSave = (goodsInfo, cb) => {
	let goods = new Goods(goodsInfo);

	goods.save().then(result => {
		cb(result);
	});
};

let goodsFind = (goodsInfo, cb) => {
	console.log(goodsInfo);
	Goods.find()
		.skip(goodsInfo.page)
		.limit(goodsInfo.limit)
		.then(result => {
			cb(result);
		});
};

let goodsUpdate = (goodsInfo, cb) => {};

let goodsRemove = (goodsInfo, cb) => {
	Goods.remove().then(result => {
		cb(result);
	});
};
let goodsModify = (goodsId, goodsInfo, cb) => {
	Goods.update(goodsId, { $set: goodsInfo }).then(result => {
		cb(result);
	});
};

module.exports = {
	goodsSave,
	goodsFind,
	goodsRemove,
	goodsModify
};
