<template>
  <div class="houseStructure">
    <Card>
      <div class="houseStructureLeft">
        <Tree :data="houseStructureTreeData" @on-select-change="treeSelect"></Tree>
      </div>
      <div v-if="unitArr&&unitArr.length>0" class="houseStructureRight">
        <div  class="houseStructureRightTop" :style="'width:' + (unitArr.length * 84) + 'px'">
          <div v-for="(item, index) in unitArr" style="display: flex;">
            <div v-if="index!=0" class="unitSlider"></div>
            <div class="topUnit" @click="uintClick(item)" :class="{'topUnitSelect':item==selectUint}">
              {{item}}单元
            </div>
          </div>

        </div>
        <div v-if=" doorArr && doorArr.length > 0" class="houseStructureRightMid">
          <table border="0" style="width:100%;">
            <tbody>
            <tr v-for="(door,i) in doorArr" :key="i" style="margin-bottom: 10px;">
              <td v-for="(num,j) in door" :key="j" style="text-align:center;padding: 5px;" >
                <div class="doorDiv" @click="houseClick(num.id,num.personName)">
                  <div>{{ num.number }} </div>
                  <div class="doorHost"> <Icon v-if="num.personName && num.personName.trim().length>0" color="#3083f2" type="md-person"/>{{ num.personName }} </div>
                  <div  v-if="num.isZi" class="doorType"> 自 </div>
                  <div v-if="num.personType" class="personTypePoint">
                    <Tooltip v-if=" num.personType.indexOf('2')>-1" content="涉疆涉藏" placement="bottom">
                      <div class="redPoint personTypePointDiv"></div>
                    </Tooltip>
                    <Tooltip v-if=" num.personType.indexOf('3')>-1" content="吸毒人员" placement="bottom">
                      <div class="greenPoint personTypePointDiv"></div>
                    </Tooltip>
                    <Tooltip v-if="num.personType.indexOf('4')>-1" content="刑释人员" placement="bottom">
                      <div  class="grayPoint personTypePointDiv"></div>
                    </Tooltip>
                    <Tooltip v-if=" num.personType.indexOf('5')>-1" content="精神智障患者" placement="bottom">
                      <div  class="yellowPoint personTypePointDiv"></div>
                    </Tooltip>
                    <Tooltip v-if=" num.personType.indexOf('6')>-1" content="上访人员" placement="bottom">
                      <div  class="bluePoint personTypePointDiv"></div>
                    </Tooltip>
                    <Tooltip v-if="num.personType.indexOf('7')>-1" content="涉邪人员" placement="bottom">
                      <div  class="purplePoint personTypePointDiv"></div>
                    </Tooltip>
                  </div>
                </div>

              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="houseStructureRightMid">
          <div class="seizeDiv">
            <img src="/img/qsy.png">
          </div>

        </div>
        <div class="houseStructureRightBottom">
          <div class="point">
            <div class="divPoint">
              <div class="redPoint"></div>
              涉疆涉藏
            </div>
            <div class="divPoint">
              <div class="greenPoint"></div>
              吸毒人员
            </div>
            <div class="divPoint">
              <div class="grayPoint"></div>
              刑释人员
            </div>
            <div class="divPoint">
              <div class="yellowPoint"></div>
              精神智障患者
            </div>
            <div class="divPoint">
              <div class="bluePoint"></div>
              上访人员
            </div>
            <div class="divPoint">
              <div class="purplePoint"></div>
              涉邪人员
            </div>
          </div>
        </div>
      </div>
      <div v-else class="houseStructureRight">
        <div class="seizeDiv">
          <img src="/img/qsy.png">
        </div>

      </div>
      <look-house-with-person v-model="lookHouseShow" :BasicHousingManageId="basicHousingManageId" modalTitle="房屋人口信息"></look-house-with-person>
    </Card>
  </div>
</template>

<script>
  import {getHouseTree,getRealHouseAndDoor,getRealDoorAndPerson} from '@/api/zhsq/baseHouseManage/basicHousingManage'
  import {getMaxUnit, getFloorAndDoor} from '@/api/zhsq/tBuildingArchives/tBuildingArchives'
  import lookHouseWithPerson from "./lookHouseWithPerson";
  export default {
    name: "houseStructure",
    components: {
      lookHouseWithPerson,
    },
    data() {
      return {
        houseStructureTreeData: [],//左侧树数据
        selectBuild: '',//选中的楼栋
        selectUint: '',//选中的单元
        selectHouse: '',//选中的房屋
        firstSelectNode:null,//初始化选中的树节点
        unitArr: [],//单元集合
        unitMax:0,//最大单元
        floorMax:0,//最大楼层
        doorMax:0,//最大门牌号（也就是每层的户数）
        doorArr:[],//门牌结合
        lookHouseShow:false,//是否展示房屋信息
        basicHousingManageId:"",//房屋Id
      }
    },
    mounted() {
      this.getHouseTree();
    },
    methods: {
      //获取左侧树数据
      getHouseTree() {
        var _this = this;
        getHouseTree().then(res => {
          if (res && res.success && res.data) {
            _this.houseStructureTreeData = res.data
            _this.searchFirstNode(true)
          }
        })
      },
      //遍历树查找默认选中的楼栋
      searchFirstNode(isSelect){
        if(isSelect==undefined || isSelect ==null){
          isSelect = false;
        }
        let _this = this;
        for (let i in _this.houseStructureTreeData) {
          let children = _this.houseStructureTreeData[i].children;
          if (children && children.length > 0) {
            for (let ii in children) {
              let childrenTwo = children[ii].children;
              if (childrenTwo && childrenTwo.length > 0) {
                for (let iii in childrenTwo) {
                  let childrenTree = childrenTwo[iii].children;
                  if (childrenTree && childrenTree.length > 0) {
                    for (let iv in childrenTree) {
                      let childrenFour = childrenTree[iv].children;
                      if (childrenFour && childrenFour.length > 0) {
                        for (let v in childrenFour) {
                          let childrenFive = childrenFour[iv].children;
                          if (childrenFive && childrenFive.length > 0) {
                            for (let vv in childrenFive) {
                              this.houseStructureTreeData[i].expand = true;
                              children[ii].expand = true;
                              childrenTwo[iii].expand = true;
                              childrenTree[iv].expand = true;
                              childrenFour[v].expand = true;
                              childrenFive[vv].selected = isSelect;
                              if(!isSelect){
                                childrenFive[vv].selected = undefined;
                              }
                              _this.firstSelectNode = childrenFive[vv];
                              _this.houseStructureTreeData = JSON.parse(JSON.stringify(_this.houseStructureTreeData)) ;
                              if(isSelect){
                                _this.selectBuild = childrenFive[vv].id;
                                _this.getMaxNum();
                              }
                              return
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      //树点击事件
      treeSelect(v){
        if(v && v.length>0){
          this.unitArr = [];
          this.floorMax = 0;
          this.doorMax = 0;
          this.selectBuild = "";
          this.doorArr = [];
          if(this.firstSelectNode.selected){
            this.searchFirstNode(false);
          }

          if(v[0].lel === "4"){
            this.selectBuild = v[0].id;
            this.getMaxNum();
          }
          else {

            this.$message.warning('请选中楼栋！')
          }

        }
      },
      getMaxNum() {//获取单元数
        let _this = this;
        _this.unitArr = [];
        getMaxUnit({id: this.selectBuild}).then(res => {
          if (res && res.success) {
            if (res.data[0]) {
              this.unitMax = res.data[0].unitMax;
              for (let i = 0; i < res.data[0].unitMax; i++) {
                this.unitArr.push( (i + 1).toString());
              }
              this.uintClick('1');
            }
          }
        });
      },
      //单元点击事件
      uintClick(item) {
        this.selectUint = item;
        this.floorMax = 0;
        this.doorMax = 0;
        this.floorArry = [];
        let _this = this;
        getFloorAndDoor({id: _this.selectBuild, name: item}).then(res => {
          if (res && res.success && res.data && res.data.length > 0) {//查询楼层数和层户数
            if(res.data[0]){
              _this.floorMax = res.data[0].floorMax;
              _this.doorMax = res.data[0].doorMax;
            }

          } else {
            _this.floorMax = 0;
            _this.doorMax = 0;
          }
          getRealDoorAndPerson({buildArchiveId: this.selectBuild, unit: item}).then(res => {
            if (res && res.success && res.data) {//获取最大楼层数和所有楼层中最多门牌数

              let door =res.data.realDoor;//真实存在的房屋
              let existent =res.data.realHouseInfo;//房屋存在人

              let doors = [];

              let arr= [];
              for(let i =0;i<_this.floorMax;i++){
                arr[i] = [];
                for(let j =0;j<_this.doorMax;j++){
                  let floorArrNumber = 0;
                  if ((j + 1) > 9) {
                    floorArrNumber = (i + 1) + '楼' + (j + 1)+"号";
                  } else {
                    floorArrNumber = (i + 1) + '楼0' + (j + 1)+"号";
                  }
                  let columns = door.filter(function (v) {
                    return v.door == floorArrNumber;
                  })
                  if (columns.length > 0) {
                    arr[i][j] = {
                      "id": columns[0].id,
                      "number": floorArrNumber,
                      "isClick": true,
                      "isZi": false,
                      "personType": '',
                      "hostName":columns[0].hostName,
                    }
                    if (columns[0].houseType == "1") {
                      arr[i][j].isZi = true;
                    }
                  } else {
                    arr[i][j] = {
                      "id": '',
                      "number": floorArrNumber,
                      "isClick": false,
                      "bgColor": 'bgColorAutonomous',
                      "personType": '',
                      "hostName":"",
                    }
                  }

                  let exist = existent.filter(function (e) {
                    return e.doorNum == floorArrNumber;
                  })
                  if (exist.length > 0) {
                    let ej=0
                    arr[i][j].personName =""
                    for (let ei in exist) {
                      if(exist[ei].personName){
                        arr[i][j].personName = arr[i][j].personName+exist[ei].personName+","
                      }

                      if(exist[ei].personType && exist[ei].personType.trim().length>0){
                        if (ej == 0) {
                          arr[i][j].personType = exist[ei].personType;
                        } else {
                          arr[i][j].personType += "," + exist[ei].personType;
                        }
                        ej++
                      }
                    }
                    if(arr[i][j].personName.length>2){
                      arr[i][j].personName =arr[i][j].personName. substring(0,arr[i][j].personName.length-1);
                    }
                    if(arr[i][j].personName.length>7){
                      arr[i][j].personName =arr[i][j].personName. substring(0,9)+"...";
                    }
                  }
                }
              }
              _this.doorArr = arr;//所有的门牌号
            }
          })
        })
      },
      //房屋点击事件
      houseClick(id,personName){
        this.basicHousingManageId = id;
        if(this.basicHousingManageId && this.basicHousingManageId.trim().length>0 && personName && personName.trim().length>0 ){
          this.lookHouseShow = true
        }
        else {
          this.lookHouseShow = false
        }
      }
    }
  }
</script>

<style lang="less">
  .houseStructure {
    /*background: #ffffff;*/
    width: 100%;
    height: calc(100vh - 190px);
    /*padding: 25px 20px 25px 40px;*/
    .ivu-card-bordered {
        height: 100%;
      }
    .houseStructureLeft {
      width: 300px;
      float: left;
      max-height: calc(100vh - 270px);
      height: calc(100vh - 270px);
      overflow: hidden;

      .ivu-tree ul li {
        margin: 0;

        .ivu-icon-ios-arrow-forward:before {
          content: "\F341";
        }

        /*.ivu-tree-arrow-open{*/
        /*  .ivu-icon-ios-arrow-forward:before {*/
        /*    content: "\F33D";*/
        /*  }*/
        /*}*/
      }

      .ivu-tree-title {
        width: calc(100% - 40px);
        padding-right: 63px;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #3e3e3e;
        height: 35px;
        padding-top: 7px;
        border-bottom: 1px solid #f2f2f2;
      }

      .ivu-tree-arrow {
        padding-top: 7px;
      }

      .ivu-tree-title-selected, .ivu-tree-title-selected:hover {
        background: #f1f9ff;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: left;
        color: #3e3e3e;
      }
    }

    .houseStructureLeft {
      overflow-y: scroll;
      scrollbar-width: none;
    }

    .houseStructureLeft::-webkit-scrollbar {
      display: none;
      /*滚动条整体样式*/
      width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }

    .houseStructureLeft::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 2px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #535353;
    }

    .houseStructureLeft::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #ededed;
    }

    .houseStructureRight {
      width: calc(100% - 300px);
      float: right;
      padding-left: 10px;
      max-height: calc(100vh - 270px);
      height: calc(100vh - 270px);
      .seizeDiv{
        img{
          left: 52%;
          position: absolute;
          top: calc(50% - 100px);
        }
      }
      .houseStructureRightTop {
        display: flex;
        height: 32px;
        border-radius: 16px;
        background: #f7f8f9;

        .topUnit {

          border-radius: 16px;
          width: 84px;
          height: 19px;
          line-height: 32px;
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: center;
          color: #676a6c;
          cursor: pointer
        }

        .topUnit:hover, .topUnitSelect {
          font-size: 14px;
          height: 32px;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          line-height: 32px;
          color: #ffffff;
          background: #3083f2;
          border-radius: 16px;
          box-shadow: 0px 4px 8px 0px rgba(48, 131, 242, 0.3);
          width: 86px;
          margin-left: -1px;
        }

        .unitSlider {
          width: 1px;
          height: 16px;
          background: #e5e5e5;
          margin-top: 8px;
        }

      }

      .houseStructureRightMid {
        height: calc(100vh - 350px);
        max-height: calc(100vh - 340px);
        background: #f0f3f7;
        margin-top: 10px;
        border-radius: 8px;
        overflow:hidden;
        padding: 30px;
        .doorDiv{
          padding: 11px;
          min-width: 180px;
          height: 88px;
          background: #ffffff;
          border: 1px solid #cccccc;
          border-radius: 4px;
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: center;
          color: #a1a1a1;
          cursor:pointer;
          .doorHost{
            padding: 5px;
            height: 21px;
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: center;
            color: #3e3e3e;
          }
          .personTypePoint{
            padding-top: 5px;
            .personTypePointDiv{
              margin-right: 5px;
            }
            position: relative;
            left: calc(50% - 10px);
            right: 0;
            top: 0;
            bottom: 0;
            float: left;
          }
          .doorType{
            width: 32px;
            height: 32px;
            background: #bad7ff;
            border-radius: 0px 4px 0px 28px;
            position: relative;
            top: -53px;
            float: right;
            left: 12px;
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: center;
            color: #ffffff;
          }
        }
        .doorDiv:hover{
          border: 2px solid #3083f2;
          border-radius: 4px;
        }
      }
      .houseStructureRightMid:hover {
        overflow: scroll;
      }

      .houseStructureRightMid:hover::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 5px;
      }

      .houseStructureRightMid:hover::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #535353;
      }

      .houseStructureRightMid:hover::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #ededed;
        display: none;
      }

      .redPoint {
        width: 8px;
        height: 8px;
        background: #ee5c5c;
        border-radius: 50%;
      }

      .grayPoint {
        width: 8px;
        height: 8px;
        background: #7e7e7e;
        border-radius: 50%;
      }

      .bluePoint {
        width: 8px;
        height: 8px;
        background: #13c2ff;
        border-radius: 50%;
      }

      .greenPoint {
        width: 8px;
        height: 8px;
        background: #3ace83;
        border-radius: 50%;
      }

      .yellowPoint {
        width: 8px;
        height: 8px;
        background: #ffcc00;
        border-radius: 50%;
      }

      .purplePoint {
        width: 8px;
        height: 8px;
        background: #7a7eff;
        border-radius: 50%;
      }

      .point {
        width: calc(100% - 110px);
        float: right;
        display: flex;
        justify-content: flex-start;
        padding-top: 10px;
        height: 30px;
        position: absolute;
      }

      .divPoint {
        width: 100px;
        float: right;
        display: flex;

        font-size: 12px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #676a6c;
        line-height: 26px;

        .redPoint {
          margin-top: 8px;
          margin-right: 5px;
        }

        .grayPoint {
          margin-top: 8px;
          margin-right: 5px;
        }

        .bluePoint {
          margin-top: 8px;
          margin-right: 5px;
        }

        .greenPoint {
          margin-top: 8px;
          margin-right: 5px;
        }

        .yellowPoint {
          margin-top: 8px;
          margin-right: 5px;
        }

        .purplePoint {
          margin-top: 8px;
          margin-right: 5px;
        }
      }
    }
  }
</style>
