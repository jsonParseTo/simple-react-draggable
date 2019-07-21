import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const defaultOption = {
  width: 50, // 每一个移动项默认width height
  height: 20,
  offsetX: 3, // 在容器中元素的偏移量
  offsetY: 3
};
export default class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      option: {}
    }
  }
  /**生命周期函数*/
  componentDidMount(){
    let { list, option } = this.props,
        tmpoption = Object.assign({}, defaultOption, option);
    this.setState({
      option: tmpoption,
      list
    });
  }
  componentWillReceiveProps(props){
    let preList = this.props.list;
    let nextList = props.list
    if(nextList !== preList){
      this.setState({
        list: nextList
      })
    }
  }
  /**事件区域 */
  calculateDragContainer(){
    let { option: {offsetX, width} } = this.state;
    let c = ReactDOM.findDOMNode(this.refs.draggableContainer).getBoundingClientRect(),
        col = parseInt((c.width - offsetX) / (width + offsetX));
    return {
      x: c.x,
      y: c.y,
      col
    }
  }
  calculateDragItem(target){
    var t = ReactDOM.findDOMNode(target).getBoundingClientRect();
    return {x: t.x, y: t.y}
  }
  calculateIndexRowCol(i, maxCol) { // index row col
    let row, col;
    row = Math.ceil(i / maxCol);
    col = i % maxCol;
    if(col === 0) {
      col = maxCol;
    }
    return {row, col};
  }
  calculateTargetIndex(target){// 获取目标元素的index
    let { list, option: {width, height, offsetX, offsetY} } = this.state,
        c = this.calculateDragContainer(),
        t = this.calculateDragItem(target),
        targetIndex = -1,targetX,targetY, i,
        len = list.length;
    if(t.x !== c.x && list.length > 0){ // 鼠标落在目标item上
      for(i = 1; i <= len; ++i){
        let {row, col} = this.calculateIndexRowCol(i, c.col);
            targetX = ((col - 1) * width + col * offsetX) + c.x;
            targetY = ((row - 1) * height + row * offsetY) + c.y;
        if(targetX === t.x && targetY === t.y){
          targetIndex = i - 1;
          break; 
        }
      }
    }
    return targetIndex;
  }
  onDragStart = (event, position) => {
    event.dataTransfer.setData("position", position);
  }
  onDragOver = (event) => {
    event.preventDefault(); 
  }
  onDrop = (event) => {
    let {list} = this.state,
        position = event.dataTransfer.getData("position"), // 移动元素位置
        targetIndex = this.calculateTargetIndex(event.target),
        removeItem;
    let {onMove} = this.props;
    if(targetIndex !== -1){
      removeItem = list.splice(position, 1)[0];
      list.splice(targetIndex, 0, removeItem);
      this.setState({list});
      onMove && onMove(list)
    }
    
  }
  render() {
    let {option:{offsetX, offsetY, width, height}, itemClassName, list} = this.state,
        cls = "draggable-item",
        items = [];
    if(!!itemClassName){ // 每一个子项的item
      cls = `${cls} ${itemClassName}`;
    }
    if(!list || list.length === 0){
      return <div></div>;
    }
    list.forEach((item,index) => {
      items.push(
        <div key={item.id}
          onDragStart = {(event) => this.onDragStart(event, index)}
          draggable
          style={{marginTop: offsetY, marginLeft: offsetX, width, height, lineHeight: height+'px'}}
          className={cls}
        >
          {item.name}
        </div>
      );
    })
    
    return <div className="wrapper">
      <div 
        className="draggable-container"
        ref="draggableContainer"
        onDragOver={(event)=>this.onDragOver(event)}
        onDrop={(event)=>{this.onDrop(event)}}
        style={{paddingBottom: offsetY, paddingRight: offsetX}}
      >
        {items}
      </div>
    </div>;
  }
}