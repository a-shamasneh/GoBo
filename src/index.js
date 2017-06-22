import React from 'react';
import ReactDOM from 'react-dom';
import Allart from './AllArticls';
ReactDOM.render(
 <Allart postArticlesurl='http://localhost:4000/article/create'
  getArticlesurl='http://localhost:4000/articles/view'
  pollInterval={1000}/>,
 document.getElementById('root')
);