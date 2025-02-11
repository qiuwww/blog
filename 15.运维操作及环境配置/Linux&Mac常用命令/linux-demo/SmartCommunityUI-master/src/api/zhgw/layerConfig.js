var layerConfig = {};
export {layerConfig};
layerConfig.layers = [
  {
    name: "王氏骨科",
    url: "http://192.168.1.200:6080/arcgis/rest/services/WSGK/MapServer",
    layers: [
      {
        id: 1,
        label: "PSP",
        url: "/0",
        field: [ //查询条件
          "物探点号",
          "管点类型"
        ],
        tableColumns: [//表格显示字段
          {
            title: '序号',
            align: "center",
            key: "rowIndex",
            width: 65,
          },
          {
            title: '物探点号',
            key: '物探点号',
          },
          {
            title: '管点类型',
            key: '管点类型',
            width: 100
          }
        ],
        type: "point",
      },
      {
        id: 2,
        label: "DLP",
        url: "/1",
        field: [ //查询条件
          "物探点号",
          "管点类型"
        ],
        tableColumns: [//表格显示字段
          {
            title: '序号',
            align: "center",
            key: "rowIndex",
            width: 65,
          },
          {
            title: '物探点号',
            key: '物探点号',
          },
          {
            title: '管点类型',
            key: '管点类型',
            width: 100
          }
        ],
        type: "point",
      },
      {
        id: 3,
        label: "JSP",
        url: "/2",
        field: [ //查询条件
          "物探点号",
          "管点类型"
        ],
        tableColumns: [//表格显示字段
          {
            title: '序号',
            align: "center",
            key: "rowIndex",
            width: 65,
          },
          {
            title: '物探点号',
            key: '物探点号',
          },
          {
            title: '管点类型',
            key: '管点类型',
            width: 100
          }
        ],
        type: "point",
      },
      {
        id: 4,
        label: "DLL",
        url: "/3",
        field: [ //查询条件
          "物探点号",
          "管点类型"
        ],
        tableColumns: [//表格显示字段
          {
            title: '序号',
            align: "center",
            key: "rowIndex",
            width: 65,
          },
          {
            title: '物探点号',
            key: '物探点号',
          },
          {
            title: '管点类型',
            key: '管点类型',
            width: 100
          }
        ],
        type: "point",
      },
      {
        id: 5,
        label: "PSL",
        url: "/4",
        field: [ //查询条件
          "物探点号",
          "管点类型"
        ],
        tableColumns: [//表格显示字段
          {
            title: '序号',
            align: "center",
            key: "rowIndex",
            width: 65,
          },
          {
            title: '物探点号',
            key: '物探点号',
          },
          {
            title: '管点类型',
            key: '管点类型',
            width: 100
          }
        ],
        type: "point",
      },
      {
        id: 6,
        label: "RQL",
        url: "/5",
        field: [ //查询条件
          "物探点号",
          "管点类型"
        ],
        tableColumns: [//表格显示字段
          {
            title: '序号',
            align: "center",
            key: "rowIndex",
            width: 65,
          },
          {
            title: '物探点号',
            key: '物探点号',
          },
          {
            title: '管点类型',
            key: '管点类型',
            width: 100
          }
        ],
        type: "point",
      }
    ]
  }
]


layerConfig.LineLayer = [
  {
    id:3,
    name:"DLL"
  },
  {
    id:4,
    name:"PSL"
  },
  {
    id:5,
    name:"RQL"
  }
]
