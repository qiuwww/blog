

// 以component/namelist中的组件为例，该组件用于显示在线用户昵称列表，
// 因此它接受一个数组，也就是store中的nameList作为参数，因此其通用组件的写法也很简单：
import React from 'react'

require('./index.less');

class NameList extends React.Component {
  constructor(props) {
    super(props);
  //   this.state = {
  //     list: []
  //   }
  //   this.index = this.props.eventHandler.subscribe('namelist fresh', function(data) {
  //     this.setState({list: data.list});
  //   }.bind(this));
  // }
  // componentWillUnmount() {
  //   this.props.eventHandler.unsubscribe('namelist fresh', this.index);
  }
  render() {
    var {nameList} = this.props;
    return (
      <ul className='name-list'>
        <li className='name-list-title'>在线用户:</li>
        {nameList.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
      </ul>
    )
  }
}

export default NameList
