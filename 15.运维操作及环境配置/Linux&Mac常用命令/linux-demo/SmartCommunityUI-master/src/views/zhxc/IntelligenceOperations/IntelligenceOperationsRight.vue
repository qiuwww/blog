<template>
  <div class="IntelligenceOperationsRight">
    <div class="rightWrap">
      <div class="titleName">
        <p class="name gradient-blue">{{data.right1.name}}</p>
        <p class="en"><span>{{data.right1.englishname}}</span><span></span></p>
      </div>
      <div class="areaGeneral m-t-15">
        <div>
          <i-circle
            :percent="100"
            stroke-linecap="square"
            stroke-color="#43a3fb"
            style="width: 90%;height: 100%;"
          >
            <p><span>{{data.right1.circle1.count}}</span><i>{{data.right1.circle1.unit}}</i></p>
            <h3>{{data.right1.circle1.name}}</h3>
          </i-circle>
        </div>
        <div>
          <i-circle
            :percent="100"
            stroke-linecap="square"
            stroke-color="#43a3fb"
            style="width: 90%;height: 100%;"
          >
            <p><span>{{data.right1.circle2.count}}</span><i>{{data.right1.circle2.unit}}</i></p>
            <h3>{{data.right1.circle2.name}}</h3>
          </i-circle>
        </div>
        <div>
          <i-circle
            :percent="100"
            stroke-linecap="square"
            stroke-color="#43a3fb"
            style="width: 90%;height: 100%;"
          >
            <p><span>{{data.right1.circle3.count}}</span><i>{{data.right1.circle3.unit}}</i></p>
            <h3>{{data.right1.circle3.name}}</h3>
          </i-circle>
        </div>
      </div>
      <div class="el-row">
        <div class="titleName" style="margin-top: 20px;">
          <p class="name gradient-blue">{{data.right2.name}}</p>
          <p class="en"><span>{{data.right2.englishname}}</span><span></span></p>
        </div>
        <Carousel autoplay loop :autoplay-speed="5000" style="margin-top: 20px; padding: 0 4%;">
          <CarouselItem v-for="(item,i) in data.right2.CarouselItem" :key="i" >
            <img :src="'/tempfile'+item.picture1" style="width: 48%"/>
            <img :src="'/tempfile'+item.picture2" style="width: 48%"/>
          </CarouselItem>
        </Carousel>
      </div>
      <div class="titleName" style="margin-top: 2vh;">
        <p class="name gradient-blue">{{data.right3.name}}</p>
        <p class="en">
          <span>{{data.right2.englishname}}</span><span></span>
        </p>
      </div>
      <div class="dev-li dev-blue">
        <h2>
          <font v-for="(item,i) in data.right3.label1" :style="{color:item.color,fontWeight:item.fontWeight}" :key="i" >{{item.text}}</font>
          <!-- 通过发展特色旅游，尤其是共享农庄带动超过
          <h3>50人</h3>
          就业。 周边群众人均增收
          <h3>1万</h3>
          元。 -->
          <div style="float: right; text-indent: 0px">
            <img
              :src="'/tempfile'+data.right3.pictureQR"
              style="width: 5.5vw;padding:0.3vw"
            />
          </div>
          <font v-for="(item,i) in data.right3.label2" :style="{color:item.color,fontWeight:item.fontWeight}" :key="'b'+i" >{{item.text}}</font>
          <!-- 近年来,利用本地的资源优势,釆取先进的经营模式,积极推进相关产业健康稳步发展,延长产业链
          增加附加值,提高经济效益,带动当地剩余劳动力和贫困户就业增收,助力脱贫。 -->
        </h2>
        <img
          :src="'/tempfile'+data.right3.picture"
          style="width: 100%;padding:0.3vw"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "yykf",
  data() {
    return {
        //data:null,
    };
  },
  props: {
    data:{
        type: Object,
        default:function(){
          return{};
        }
    }
  },
  created(){
        //this.data =this.$parent.dataarr.yykf;
    },
  mounted() {
  },
  methods: {

  },
};
</script>

<style lang="less" scoped>
.IntelligenceOperationsRight {
  background: url(../../../assets/layerManagement/right-shadow.png) repeat-y;
  background-size: 100%;
  right: 0;
  position: absolute;
  top: 0px;
  bottom: 0;
  width: 25%;
  margin-top: 4vh;
  padding: 25px 10px 0 25px;
  overflow-y: auto;
  font-family: Adobe 黑体 Std R;
}
&::-webkit-scrollbar {
  width: 0;
}
.rightWrap{
  width: 85%;
  float: right;
}
.areaGeneral,
.energy-card {
  margin-top: 2vh;
}

.titleName .name {
  display: inline-block;
  font-size: 1.3vw;
  font-family: Adobe 黑体 Std R;
  font-weight: 700;
}

.gradient-blue {
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(#02e4ff),
    to(#035cff)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.titleName {
  padding-left: 0;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAY8AAAACCAYAAACgw1BVAAAAQklEQVRIie3SsQ2AMBADwItEEZagZQImYKYMyGSfFSjSgHy1ZcmSW1WJiIhf23HjXDVyw/MyO/KtiIjPOXChL2vEBPqoBQdAU67mAAAAAElFTkSuQmCC)
    no-repeat 0 100%;
  background-size: auto;
  background-size: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.titleName .en {
  color: #919293;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-family: Adobe 黑体 Std R;
}

.titleName .en span {
  font-weight: lighter;
  letter-spacing: -0.5px;
  white-space: nowrap;
  font-size: 0.6vw;
  font-family: Adobe 黑体 Std R;
  zoom: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.titleName .en span:last-child {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAAABCAYAAAA4l4ckAAAAE0lEQVQokWP8//+/GcMoGAVUAgBnXAM143UjwAAAAABJRU5ErkJggg==)
    50% repeat-x;
  height: 0.8vh;
  margin-left: 0.5vh;
}

.areaGeneral,
.areaGeneral > div {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.areaGeneral > div {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  color: #fff;
}

// .areaGeneral > div:first-of-type p {
//   background: url(data:image/png;base64,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);
//   background-size: 100%;
// }

.areaGeneral > div p {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 5vw;
  //width: 5vw;
  // background: url(data:image/png;base64,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)
  //   50% no-repeat;
}
.areaGeneral > div h3 {
  margin-top: 2vw;
  font-size: 0.9vw;
  font-family: Adobe 黑体 Std R;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.areaGeneral > div p span {
  font-size: 0.9vw;
  font-family: Adobe 黑体 Std R;
  line-height: 4vh;
  display: inline-block;
  height: 4vh;
  margin-top:2vw;
}

.areaGeneral > div p i {
  font-style: normal;
  font-weight: 400;
  font-size: 0.9vw;
  font-family: Adobe 黑体 Std R;
}

.dev-li {
  margin: 10px 0 10px 0;
}

.dev-li h2 {
  text-shadow: rgba(0, 0, 0, 0.8) 1px 5px 5px;
  display: inline-block;
  font-size: 0.9vw;
  font-family: Adobe 黑体 Std R;
  font-weight: 400;
  color: #fff;
  line-height: 2.6vh;
  text-align: justify;
  text-indent: 1.8vw;
}

.dev-li h3 {
  font-size: 0.9vw;
  font-weight: 900;
  line-height: 2.6vh;
  text-align: justify;
  color: #00afff;
  font-family: Adobe 黑体 Std R;
  display: inline-block;
  text-indent: 0;
}
</style>
