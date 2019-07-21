import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from './App' 

const list = [{
  id: 1,
  name: '测试1'
},{
  id: 2,
  name: '测试2'
},{
  id: 3,
  name: '测试3'
},{
  id: 4,
  name: '测试4'
},{
  id: 5,
  name: '测试6'
},{
  id: 7,
  name: '测试7'
}];

ReactDOM.render(<Draggable list={list}/>, document.getElementById('root'))