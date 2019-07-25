import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from '.index2';
import "./index.css"

const list = [{
  id: 1,
  name: '测试测试测试吃1'
},{
  id: 2,
  name: '测试测试测试吃2'
},{
  id: 3,
  name: '测试测试测试吃3'
},{
  id: 4,
  name: '测试测试测试吃4'
},{
  id: 5,
  name: '测试测试测试吃6'
},{
  id: 7,
  name: '测试测试测试吃7'
}];

ReactDOM.render(<Draggable list={list} className="tabs"/>, document.getElementById('root'))