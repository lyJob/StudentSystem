function EditGoods() {
	this.container = $('.main_container');
}
EditGoods.template = `
    <div class="mask"></div>
    <div class="editGoods">
        <form id="editGoods" class="ModifyGoods" >
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
            <button type="submit" class="btn btn-primary put" id="put">提交</button>
            <button type="submit" class="btn btn-primary" id="cancel">取消</button>
        </form>
    </div>


`;

EditGoods.prototype = {
	init: function() {
		this.createPage();
		this.submitGoods();
	},
	createPage: function() {
		this.container.append(EditGoods.template);
	},
	submitGoods: function() {
		//点击编辑事件
		$('.main_container ').on('click', '#cmp', this.redactGoods);
		//点击下架
		// $('.main_container').on('click', '#xj', this.removeGoods);
		//点击编辑后的取消事件
		$('#cancel').click(this.countermandGoods.bind(this));
	},
	//编辑弹出页面，显示对应内容
	redactGoods() {
		$('.mask').css('display', 'block');
		$('.editGoods').css('display', 'block');
		//设置当前点击编辑的下标
		var goods = $(this)
			.parent()
			.parent()
			.parent()
			.parent()
			.index();
		$.ajax({
			type: 'get',
			url: '/goods/list',
			success: function(data) {
				console.log(data);
				var list = data.data.list;
				$('#goodsName').val(list[goods].goodsName);
				$('#goodsPrice').val(list[goods].goodsPrice);
				$('#goodsDes').val(list[goods].goodsDes);
				$('#tel').val(list[goods].tel);
			}
		});
	},
	//编辑后提交

	//编辑后取消
	countermandGoods() {
		$('.mask').css('display', 'none');
		$('.editGoods').css('display', 'none');
	}
};
