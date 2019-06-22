function AddGoods() {
	this.container = $('.main_container');
}

AddGoods.template = `
    <div class="goods">
        <form id="addGoods">
            <div class="form-group">
                <label for="goodsName">商品名称</label>
                <input type="text" class="form-control" id="goodsName" placeholder="请输入商品名称">
            </div>
            <div class="form-group">
                <label for="goodsPrice">商品价格</label>
                <input type="text" class="form-control" id="goodsPrice" placeholder="请输入商品价格">
            </div>
            <div class="form-group">
                <label for="goodsDes">商品详情</label>
                <input type="text" class="form-control" id="goodsDes" placeholder="请输入商品详情">
            </div>
            <div class="form-group">
                <label for="tel">联系电话</label>
                <input type="text" class="form-control" id="tel" placeholder="请输入联系方式">
             </div>
            <div class="form-group">
                <label for="goodsPic">上传图片</label>
                <input type="file"  id="goodsPic" >
            </div>
            <button type="submit" class="btn btn-primary">提交</button>
        </form>
    </div>


`;
AddGoods.prototype = {
	init: function() {
		this.createPage();
		this.submitGoods();
	},
	createPage: function() {
		this.container.html('');
		this.container.append(AddGoods.template);
	},
	submitGoods: function() {
		this.container.find('#addGoods').on('submit', this.handleSubmitCb.bind(this));
	},
	handleSubmitCb(e) {
		e.preventDefault();

		let goodsName = this.container.find('#goodsName');
		let goodsPrice = this.container.find('#goodsPrice');
		let goodsDes = this.container.find('#goodsDes');
		let tel = this.container.find('#tel');
		let goodsPic = this.container.find('#goodsPic')[0];

		//创建一个formDate用来模拟form表单提交

		let formData = new FormData();

		formData.append('goodsName', goodsName.val());
		formData.append('goodsPrice', goodsPrice.val());
		formData.append('goodsDes', goodsDes.val());
		formData.append('tel', tel.val());
		formData.append('goodsPic', goodsPic.files[0]);

		$.ajax({
			type: 'post',
			url: '/goods/add',
			cache: false, //不读取缓存中的结果 true的话会读缓存  其实post本身就不会读取缓存中的结构
			processData: false, //默认情况下，通过data选项传递进来的数据，如果是一个对象(技术上讲只要不是字符串)，都会处理转化成一个查询字符串，以配合默认内容类型 "application/x-www-form-urlencoded"。如果要发送 DOM 树信息或其它不希望转换的信息，请设置为 false。
			contentType: false, //数据编码格式不使用jquery的方式 为了避免 JQuery 对其操作，从而失去分界符，而使服务器不能正常解析文件。
			data: formData,
			success: this.handleSubmitSuccess.bind(this)
		});
	},

	handleSubmitSuccess(data) {
		console.log(data);
		if (data.data.status) {
			alert('添加成功');
			new GoodsList().init();
			new SliderNav().handleSliderToggleCb(1);
		} else {
			alert('添加失败');
		}
	}
};
