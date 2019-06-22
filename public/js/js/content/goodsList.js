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
				limit: 10
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
                <p><a href="#" class="btn btn-primary" role="button">编辑</a> <a href="#" class="btn btn-default" role="button">下架</a></p>
              </div>
            </div>
          </div>
            `;
		}
		console.log(str);

		this.container.find('.goods_content').html(str);
	}
};
