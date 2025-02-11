<style lang="less" scoped>
  .parkRight {
    height: 100%;
    width: 25%;
    position: absolute;
    top: 0;
    right: 0;
    color: #FFFFFF;
    font-size: 14px;
    padding-top: 4.1vh;

    .parkPart{
      height: 100%;
      background: rgba(40, 40, 55, 0.6);
      padding: 4%;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 0;
      }
      .myTable{
        width: 100%;
        text-align: center;
        table-layout: fixed;
        display: table;
        .myTHead{
          background: rgba(0,85,189,.5);
          width: 100%;
          display: table;
          table-layout: fixed;
          line-height: 30px;
          th{
            text-align: center;
          }
        }
        .myTBody{
          line-height: 30px;
          display: block;
          max-height: 200px;
          overflow-y: scroll;
          tr{
            display: table;
            width: 100%;
            table-layout: fixed;
            th{
              text-align: center;
              &:nth-child(2){
                color: orange;
              }
              &:nth-child(3) {
                color: lightgreen;
              }
            }
            &:nth-child(2n){
              background: rgba(255, 255, 255, .15);
            }
          }
          &::-webkit-scrollbar {
            width: 0;
          }
        }
      }

      .parkCircle{
        margin-top: 20px;
        padding-bottom: 10px;
        text-align: center;
        overflow: auto;
        background: -webkit-linear-gradient(bottom, rgba(47,131,191,0.46), rgba(47,131,191,0)); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(top, rgba(47,131,191,0.46), rgba(47,131,191,0)); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(top, rgba(47,131,191,0.46), rgba(47,131,191,0)); /* Firefox 3.6 - 15 */
        background: linear-gradient(to top, rgba(47,131,191,0.46), rgba(47,131,191,0)); /* 标准的语法（必须放在最后） */
        .circleFloat{
          margin-top: 10px;
          display: inline-block;
          float: left;
          width: 25%;
          .imgPosition{
            position:relative;
            img{
              width: 50%;
              height: 50%;
            }
            span{
              position: absolute;
              left: 40%;
              top: 30%;
            }
          }
        }
      }

      .parkArea{
        margin-top: 30px;
        overflow: auto;
        .areaCar{
          display: inline-block;
          float: left;
          width: 40%;
          border: 1px solid #0791ae;
          text-align: center;
          padding: 10px;
          background: rgba(78, 120, 177, .3);
          p:first-child{
            font-size: 26px;
            color: orange;
            span{
              font-size: 14px;
            }
          }
        }
        .frameCar{
          display: inline-block;
          float: left;
          width: 60%;
          padding-left: 4%;
          div{
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            padding: 0 10%;
            background: -webkit-linear-gradient(left, rgba(47,131,191,0.46), rgba(47,131,191,0)); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, rgba(47,131,191,0.46), rgba(47,131,191,0)); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, rgba(47,131,191,0.46), rgba(47,131,191,0)); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, rgba(47,131,191,0.46), rgba(47,131,191,0)); /* 标准的语法（必须放在最后） */
            margin-top: 5px;
            &:first-child{
              margin-top: 0;
            }
          }
        }
      }

      .parkTitle{
        border-left: 3px solid #FFFFFF;
        padding-left: 10px;
        font-size: 16px;
      }
    }
  }

</style>

<template>
  <div class="parkRight">
    <div class="parkPart">
      <div>
        <span class="parkTitle">停车区域</span>
        <table class="myTable">
          <thead class="myTHead">
          <tr>
            <th>停车场</th>
            <th>车位总数量</th>
            <th>剩余车位</th>
          </tr>
          </thead>
          <tbody class="myTBody">
          <tr>
            <th>蓝田停车场</th>
            <th>1000</th>
            <th>50</th>
          </tr>
          <tr>
            <th>正和停车场</th>
            <th>1000</th>
            <th>50</th>
          </tr>
          <tr>
            <th>泸师附小停车场</th>
            <th>1000</th>
            <th>50</th>
          </tr>
          <tr>
            <th>蓝湾停车场</th>
            <th>1000</th>
            <th>50</th>
          </tr>
          <tr>
            <th>沱江停车场</th>
            <th>1000</th>
            <th>50</th>
          </tr>
          <tr>
            <th>碧桂园停车场</th>
            <th>1000</th>
            <th>50</th>
          </tr>
          <tr>
            <th>桥南停车场</th>
            <th>1000</th>
            <th>50</th>
          </tr>
          </tbody>
        </table>
      </div>

      <div style="margin-top: 20px;">
        <span class="parkTitle">停车</span>
        <div ref="parkCar" style="width: 100%;height: 200px;"></div>
      </div>

      <div class="parkCircle">
        <p>停车</p>
        <div class="circleFloat">
          <div class="imgPosition">
            <img src="../../../assets/bigScreenImg/compass.png">
            <span>4.8</span>
          </div>
          <p>停车位数</p>
        </div>
        <div class="circleFloat">
          <div class="imgPosition">
            <img src="../../../assets/bigScreenImg/compass.png">
            <span>4.8</span>
          </div>
          <p>停车位数</p>
        </div>
        <div class="circleFloat">
          <div class="imgPosition">
            <img src="../../../assets/bigScreenImg/compass.png">
            <span>4.8</span>
          </div>
          <p>停车位数</p>
        </div>
        <div class="circleFloat">
          <div class="imgPosition">
            <img src="../../../assets/bigScreenImg/compass.png">
            <span>4.8</span>
          </div>
          <p>停车位数</p>
        </div>
      </div>

      <div class="parkArea">
        <div class="areaCar">
          <p>3433<span>个</span></p>
          <p>停车位点</p>
        </div>

        <div class="frameCar">
          <div>
            <span>停车面积</span>
            <span>23个</span>
          </div>

          <div>
            <span>停车面积</span>
            <span>23个</span>
          </div>

          <div>
            <span>停车面积</span>
            <span>23个</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from "echarts";

  export default {
    name: "parkPageRight",
    data() {
      return {
        parkCarOption: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            }
          },
          grid: {
            top: '5%',
            left: 0,
            right: 0,
            bottom: 0,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
              axisLine: {
                lineStyle: {
                  color: "#fff",
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: "#fff",
                }
              }
            }
          ],
          series: [
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              smooth: true,
              itemStyle: {
                normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                      offset: 0, color: '#edd23e' // 0% 处的颜色
                    }, {
                      offset: 0.5, color: '#edd23e' // 100% 处的颜色
                    }, {
                      offset: 1, color: '#ABADAE' // 100% 处的颜色
                    }]
                  )
                }
              }
            }
          ]
        }
      }
    },
    mounted() {
      let parkCar = echarts.init(this.$refs.parkCar);
      parkCar.setOption(this.parkCarOption);
      window.addEventListener('resize', () => {
        parkCar.resize();
      });
    }
  }
</script>
