import React, { Component } from 'react';
import axios from 'axios';
import ArticleList from './ArticleList';
import ArticleForm from './ArticleForm';
import style from './style';

class AllArticles extends Component {
	constructor(props) {
		super(props);
    	this.state = { data: [] };
	    this.loadArticlesFromServer = this.loadArticlesFromServer.bind(this);
	    this.handleArticleSubmit = this.handleArticleSubmit.bind(this);
	    
	 }
	 loadArticlesFromServer(){
	 	axios.get(this.props.getArticlesurl)
	 	.then(res => {
	 		this.setState({ data: res.data });

	 	}).catch(err => {
			 console.error(err);
			 });
	 }
	 handleArticleSubmit(article) {
	    let articles = this.state.data;
	    let newarticles = articles.concat([article]);
	    this.setState({ data: newarticles });
	    axios.post(this.props.postArticlesurl, article)
	      .catch(err => {
	        console.error(err);
	        this.setState({ data: articles });
	      });
  	}

	 componentDidMount() {
	    this.loadArticlesFromServer();
	    setInterval(this.loadArticlesFromServer, this.props.pollInterval);
  	 }

	 render() {
	 	return (
	 		<div >
	 		<h2>Articles:</h2>
	 		<ArticleList
	 		data={ this.state.data }/>

	 		<ArticleForm onArticleSubmit={ this.handleArticleSubmit }/>

	 		</div>
	 		)
	 }



}

export default AllArticles;