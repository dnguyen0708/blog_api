import React from 'react'
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios';
function BlogList() {


    const [blogs,setBlogs] = useState([]);
    useEffect(()=>{
      axios.get('http://localhost:5000/blogs/')
        .then(data => setBlogs(data.data))
        .catch(e => console.log(e));
      },[]);


  return (
      <Container>
          <Row className='row equals d-flex justify-content-center'>
            {blogs.map((blog)=>{
                return (
                    <Col className='col-md-3 m-3 card' key={blog._id}>
                        <div className="card-body">
                            <h3 className="card-title">{blog.title}</h3>
                            <div className="card-text">{blog.body}</div>
                            <a href={`/blogs/${blog._id}`} className="mt-3">View Blog</a>
                        </div>
                    </Col>
                    )
            })}
          </Row>
      </Container>

  )
}

export default BlogList