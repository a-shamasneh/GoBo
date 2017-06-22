import React, { Component } from 'react';
import style from './style';


class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {content:'' };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTextChange(e) {
    this.setState({ content: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let content = this.state.content.trim();
    if (!content) {
      return;
    }
    this.props.onArticleSubmit({content: content });
    this.setState({content: '' });
  }
  render() {
    return (
      <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='Add Article...'
          style={ style.FormText}
          value={ this.state.content }
          onChange={ this.handleTextChange } />
        <input
          type='submit'
          style={ style.FormPost }
          value='Post'/>
      </form>
    )
  }
}














export default ArticleForm;