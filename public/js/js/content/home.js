function Home(){
    this.container = $(".main_container")
}
Home.template = `
<div class="row home_row">
  <div class="col-md-3 content_1 box">今日访问量</div>
  <div class="col-md-3 content_2 box">今日注册量</div>
  <div class="col-md-3 content_3 box">今日阅读量</div>
</div>
<div class="row echarts_container">
  <div class="col-md-12" id="echarts_main" style="width:900px;height:500px"></div>
  
</div>
`
Home.prototype = {
    init:function(){
        this.createPage();
        this.createEcharts();
    },
    createPage:function(){
        this.container.html("");
        this.container.append(Home.template);
    },
    createEcharts:function(){
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('echarts_main'));

            

          // 指定图表的配置项和数据
          var option = {
            title : {
                text: 'React后台管理系统'
            },
            legend: {
                data:['访问量','注册量',"阅读量"]
            },
            toolbox: {
                show : true,
                feature : {
                    magicType : {show: true, type: ['line', 'bar']},
                }
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'访问量',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    
                   
                },
                {
                    name:'注册量',
                    type:'bar',
                    data:[5.6, 8.9, 4.0, 33.4, 65.7, 23.7, 190.6, 240.2, 88.7, 97.8, 10.0, 7.3],
                },
                {
                    name:'阅读量',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                }
            ]
        };
        
  
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
    }
}