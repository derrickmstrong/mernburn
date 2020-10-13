import React, { useState, Fragment } from 'react';
import axios from 'axios';

const Compose = (props) => {
  const initialState = [
      {
        title: '',
        body: '',
        author: '',
      },
    ],
    [post, setPost] = useState(initialState);

  const handleInput = async (e) => {
   await setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
          await axios.post('/api/blog/post', post)
          setPost({
              ...post,
              title: '',
              body: '',
              author: '',
          })
          props.history.push('/blog')
      } catch (err) {
          console.log(err)
      }
  }

  return (
    <Fragment>
      <div className='d-flex justify-content-center'>
        <div className='card col-md-8 m-3'>
        <h1>Compose</h1>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label for='title'>Title</label>
                <input
                  type='text'
                  className='form-control'
                  name='title'
                  id='title'
                  onChange={handleInput}
                  required
                />
              </div>
              <div className='form-group'>
                <label for='body'>Body</label>
                <input
                  type='text'
                  className='form-control'
                  name='body'
                  id='body'
                  onChange={handleInput}
                  required
                />
              </div>
              <div className='form-group'>
                <label for='author'>Author</label>
                <input
                  type='text'
                  className='form-control'
                  name='author'
                  id='author'
                  placeholder='Unknown'
                  onChange={handleInput}
                />
              </div>
              <button type='submit' className='btn btn-primary float-right'>
                Create Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Compose;
