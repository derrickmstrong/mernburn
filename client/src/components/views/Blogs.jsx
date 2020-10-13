import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blogs = (props) => {
  const initialState = [
    {
      title: '',
      body: '',
      author: '',
    },
  ];
  const [data, setData] = useState(initialState);

  const fetchData = async () => {
    const result = await axios.get(`/api/blogs`);
    setData(result.data);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, [props]);

  // Delete Blog
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`/api/blog/${id}`);
      props.history.push(`/blog`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='container'>
      <div className='d-flex flex-wrap justify-content-center'>
        {data.map((item) => {
          return (
            <Fragment key={item._id}>
              <div className='card col-md-5 m-4'>
                <div className='card-body'>
                  <div
                    className='card-link float-right mx-2 cursor'
                    onClick={() => {
                      deleteBlog(item._id);
                    }}>
                   <span role='img' aria-label='delete' >❌</span> 
                  </div>
                  <Link
                    to={`/edit/${item._id}`}
                    className='card-link float-right'>
                    <span role='img' aria-label='edit'>✏️</span>
                  </Link>
                  <h5 className='card-title '>{item.title}</h5>
                  <h6 className='card-subtitle mb-2 text-muted'>
                    by {item.author ? item.author : 'Unknown'}
                  </h6>
                  <p className='card-text text-truncate'>{item.body}</p>
                  <Link to={`/details/${item._id}`} className='card-link'>
                    See More
                  </Link>
                </div>
              </div>
            </Fragment>
          );
        }).sort((a,b) => b - a)}
      </div>
    </div>
  );
};

export default Blogs;
