import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Edit = (props) => {
  const history = useHistory(),
    initialState = [
      {
        title: '',
        body: '',
        author: '',
      },
    ],
    [data, setData] = useState(initialState);

  const fetchData = async () => {
    try {
      const result = await axios.get(`/api/blog/${props.match.params._id}`);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, [props]);

  const handleInput = async (e) => {
    await setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/blog/${data._id}`, data);
      props.history.push(`/details/${data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className='d-flex justify-content-center'>
        <div className='card col-md-8 m-3'>
          <h1>Edit {data.title}</h1>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label for='title'>Title</label>
                <input
                  type='text'
                  className='form-control'
                  name='title'
                  id='title'
                  value={data.title}
                  onChange={handleInput}
                />
              </div>
              <div className='form-group'>
                <label for='body'>Body</label>
                <input
                  type='text'
                  className='form-control'
                  name='body'
                  id='body'
                  value={data.body}
                  onChange={handleInput}
                />
              </div>
              <div className='form-group'>
                <label for='author'>Author</label>
                <input
                  type='text'
                  className='form-control'
                  name='author'
                  id='author'
                  value={data.author}
                  placeholder='Unknown'
                  onChange={handleInput}
                />
              </div>
              <div
                onClick={() => {
                  history.goBack();
                }}
                className='btn btn-danger float-right'>
                Cancel
              </div>
              <button
                type='submit'
                className='btn btn-primary float-right mr-3'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Edit;
