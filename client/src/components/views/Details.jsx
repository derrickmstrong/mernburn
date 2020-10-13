import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

const Details = (props) => {
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

  return (
    <Fragment>
      <div className='d-flex justify-content-center'>
        <div className='card col-md-8 m-3'>
          <div className='card-body'>
            <div
              className='card-link float-right mx-2 cursor'
              onClick={() => {
                history.goBack();
              }}>
              <span role='img' aria-label='go-back'>
                🔙
              </span>
            </div>
            <Link to={`/edit/${data._id}`} className='card-link float-right'>
              <span role='img' aria-label='edit'>
                ✏️
              </span>
            </Link>
            <h1>{data.title}</h1>
            <h6 className='card-subtitle mb-2 text-muted'>
              by {data.author ? data.author : 'Unknown'}
            </h6>
            <p className='card-text'>{data.body}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Details;
