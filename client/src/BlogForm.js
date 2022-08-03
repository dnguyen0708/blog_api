import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
function BlogForm() {

    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const [blog,setBlog] = useState(location.state ? location.state.blog :
        {
            title:'',
            body:''
        });
    
    let url = 'http://localhost:5000/blogs/newblog';
    if(params.blogId){
        url = `http://localhost:5000/blogs/${params.blogId}/update`;
    }
    
    function formHandler(e){
        e.preventDefault();
        if(blog.title !== '' && blog.body !== ''){
            axios.post(url,blog)
            .then(()=>{
                setBlog({
                    title:'',
                    body:''
                });
                navigate('/blogs');
            })
            .catch(e => console.log(e));        
        }
        else{
            console.log("ERRORS: Title or Body is empty! must contain at least 1 or more characters");
        }
        
    }

    function onChangeHandler(e){
        setBlog(
            {
                ...blog,
                [e.target.name]: e.target.value
            }
        )
    }

  return (
      <Container className='mt-3'>
        <Form onSubmit={formHandler}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text"
                    value={blog.title}
                    name="title"
                    placeholder="Blog title"
                    onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="body">
                <Form.Label>Blog Content</Form.Label>
                <Form.Control as="textarea"
                    value={blog.body}
                    name="body" 
                    placeholder="Blog content goes here" 
                    rows={5}
                    onChange={onChangeHandler} />
            </Form.Group>
            <Button variant="primary" size='lg' type="submit">
                Submit
            </Button>
        </Form>
      </Container>

  )
}

export default BlogForm