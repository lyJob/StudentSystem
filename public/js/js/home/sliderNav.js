function SliderNav(){
    this.slider = $(".nav-stacked>li");
}
SliderNav.prototype = {
    init:function(){
        this.sliderToggle()
        this.handleSliderToggleCb(0);
    },
    sliderToggle:function(){
       $.each(this.slider,this.handleSliderEach.bind(this))
    },
    handleSliderEach(index){
        this.slider.eq(index).on("click",index,this.handleSliderToggleCb.bind(this))
    },
    handleSliderToggleCb(pageIndex){
        if(typeof(pageIndex) == "number"){
            pageIndex = Number(pageIndex);
            console.log(pageIndex)
            this.slider.eq(pageIndex).addClass("active").siblings().removeClass("active");
            this.togglePage(pageIndex);
        }else{
            this.slider.eq(pageIndex.data).addClass("active").siblings().removeClass("active");
            this.togglePage(pageIndex.data);
        }
    },
    togglePage(index){
        switch(index){
            case 0:
                new Home().init();
                break;
            case 1:
                new GoodsList().init();
                break;
            case 2:
                new AddGoods().init();
                break;
            case 3:
                new Users().init();
                break;
            default:
                return;

        }
    }
}

new SliderNav().init()
