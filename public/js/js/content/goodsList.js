function GoodsList() {
	this.container = $('.main_container');
}

GoodsList.template = `
<div class="row goods_content">
  
  
</div>


`;

GoodsList.prototype = {
	init: function() {
		this.createPage();
		this.getGoodsList();
		this.ModifyGoodsClick();
	},
	createPage: function() {
		this.container.html('');
		this.container.append(GoodsList.template);
	},
	getGoodsList: function() {
		$.ajax({
			type: 'get',
			url: '/goods/list',
			data: {
				page: 1,
				limit: 20
			},
			success: this.handleGetGoodsListSucc.bind(this)
		});
	},
	handleGetGoodsListSucc(data) {
		var list = data.data.list;
		var str = '';
		for (var i = 0; i < list.length; i++) {
			str += `
            <div class="col-sm-6 col-md-3">
            <div class="thumbnail">
              <img src="${list[i].goodsPic}">
              <div class="caption">
                <h3>${list[i].goodsName}</h3>
                <p>${list[i].goodsPrice}</p>
                <p>${list[i].goodsDes}</p> 
                <p><a href="javascript:" class="btn btn-primary cmp modelToggle" id="cmp" role="button" data-index=${i}>编辑</a> <a href="javascript:" class="btn btn-default" id="xj" role="button">下架</a></p>
              </div>
            </div>
          </div>
            `;
		}
		// console.log(str);

		this.container.find('.goods_content').html(str);
		this.modelToggleClick(data.data.list);
	},
	modelToggleClick(data) {
		var _this = this;
		this.container
			.find('.modelToggle')
			.on('click', { data, that: _this }, this.handleModelToggleCb);
	},
	handleModelToggleCb(e) {
		let index = $(this).attr('data-index');
		let modifyData = e.data.data[index];
		e.data.that.container.find('.ModifyGoods').attr('data-id', modifyData._id);
		// console.log(e.data.that.container.find('.ModifyGoods').attr('data-id'));
	},
	ModifyGoodsClick() {
		$('body').on('submit', '#editGoods', this.handleModifyGoodsCb.bind(this));
	},

	handleModifyGoodsCb(e) {
		var formData = new FormData();
		formData.append('goodsName', this.container.find('#goodsName').val());
		formData.append('id', this.container.find('.ModifyGoods').attr('data-id'));
		formData.append('goodsPrice', this.container.find('#goodsPrice').val());
		formData.append('goodsDes', this.container.find('#goodsDes').val());
		formData.append('tel', this.container.find('#tel').val());
		formData.append('goodsPic', this.container.find('#goodsPic')[0].files[0]);
		$.ajax({
			type: 'post',
			url: '/goods/modify',
			cache: false, //不读取缓存中的结果 true的话会读缓存  其实post本身就不会读取缓存中的结构
			processData: false, //默认情况下，通过data选项传递进来的数据，如果是一个对象(技术上讲只要不是字符串)，都会处理转化成一个查询字符串，以配合默认内容类型 "application/x-www-form-urlencoded"。如果要发送 DOM 树信息或其它不希望转换的信息，请设置为 false。
			contentType: false, //数据编码格式不使用jquery的方式 为了避免 JQuery 对其操作，从而失去分界符，而使服务器不能正常解析文件。
			data: formData,
			success: this.handleSubmitSuccess.bind(this)
		});
	},
	handleSubmitSuccess(data) {
		if (data.data.status) {
			alert('修改成功');
			this.getGoodsList();
			$('#goodsModifyModel').modal('hide');
			// new GoodsList().init();
			// new SliderNav().handleSliderToggleCb(1);
		} else {
			alert('修改失败失败');
		}
	}
};
