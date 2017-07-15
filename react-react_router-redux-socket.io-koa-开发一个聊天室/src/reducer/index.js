
// 项目中使用了redux作为数据流管理工具，
// 配合react，能够让页面组件同页面数据形成规律的映射。
// 因此，整个应用的数据结构如下, 也就是redux中的store的数据结构如下：
// {
//   "nickName": "your nickname",
//   "nameList": ["user A","user B","user C","...."],
//   "msgList": [
//     {
//     "nickName": "some user",
//     "msg": "some string"
//   },{
//     "nickName": "another user",
//     "msg": "another string"
//   },
//   ]
// }

// reducer文件夹中定义reducer函数

// 可以看出，在redux的思想下，我们可以对整个应用抽象出一个总体的数据结构，
// 数据结构的改变，会引发各个组件的改变，
// 而组件当中的各种事件，又会反过来修改数据结构，
// 从而再次引起页面的改变，这是一种单向的数据流，
// 总体的数据都在store这个对象中进行维护，
// 从而让整个应用开发变得更加有规律。


import { combineReducers } from 'redux'

function nickname_reducer(state = '', action) {
  switch (action.type) {
    case 'NICKNAME_GET':
      return action.nickName;
    case 'NICKNAME_FORGET':
      return '';
    default:
      return state;
  }
}

function name_reducer(state = [], action) {
  switch (action.type) {
    case 'GUEST_UPDATE':
      return action.nameList;
    default:
      return state;
  }
}

function msg_reducer(state = [], action) {
  switch (action.type) {
    case 'MSG_UPDATE':
      var newState = [];
      newState = [...state, action.msg];
      return newState;
    case 'NICKNAME_FORGET':
      return [];
    default:
      return state;
  }
}

var reducers = combineReducers({
  nickName: nickname_reducer,
  nameList: name_reducer,
  msgList: msg_reducer
});

export default reducers
