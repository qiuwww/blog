
// action文件夹当中定义action creators，

function message_update(msg) {
  return {
    type: 'MSG_UPDATE',
    msg
  }
}

function guest_update(nameList) {
  return {
    type: 'GUEST_UPDATE',
    nameList
  }
}

function nickname_get(nickName) {
  return {
    type: 'NICKNAME_GET',
    nickName
  }
}

function nickname_forget() {
  return {
    type: 'NICKNAME_FORGET'
  }
}

export { message_update, guest_update, nickname_get, nickname_forget }




var row;
var res = (len) => Mock.mock({
	'errno|1': [0],
	'errmsg': 'this is error message',
	'total|0-8': 1,
	'data': {
		'leftBottom|100': [{
			'index|+1': 1,
			'title': '@cword(3,5)',
			'id|10000-100000': 10000
		}],
		'rightTop|100': ['@date("yyyy-MM-dd")'],		
		'rightBottom|10000': function(){ // 第一层是行
			row = Mock.mock({
				'rightBottomCol|1000': ['@cword(3,5)'] // 第二层是列
			})
			return new Array(1000).fill(row.rightBottomCol);
		}
	}
});
res(200);