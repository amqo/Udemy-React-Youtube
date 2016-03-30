import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {

  static contextTypes =  {
    router: PropTypes.object
  };

  getFieldDangerStyle(field) {
    return field.touched && field.invalid ? 'has-danger' : '';
  }

  onSubmit(formProps) {
    this.props.createPost(formProps)
      .then(() => {
        // blog post has been created, navigate to index
        this.context.router.push('/');
      });
  }

  render() {
    //const handleSubmit = this.props.handleSubmit; // Refactor
    //const title = this.props.fields.title ...
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Create A New Post</h3>

        <div className={ `form-group ${this.getFieldDangerStyle(title)}` }>
          <label htmlFor="">Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            { title.touched ? title.error : '' }
          </div>
        </div>

        <div className={ `form-group ${this.getFieldDangerStyle(categories)}` }>
          <label htmlFor="">Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            { categories.touched ? categories.error : '' }
          </div>
        </div>

        <div className={ `form-group ${this.getFieldDangerStyle(content)}` }>
          <label htmlFor="">Content</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">
            { content.touched ? content.error : '' }
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}

//Differences between connect and reduxForm
// connect: 1st argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
