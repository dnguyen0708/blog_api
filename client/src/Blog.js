import React from 'react'
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown'
import {useNavigate} from 'react-router-dom';

function Blog() {


    const navigate = useNavigate();
    const params = useParams();
    const [blog,setBlog] = useState({});
    const [loading,setLoading] = useState(true);
    const [comment,setComment] = useState({
        author:'',
        body:''
    });

    useEffect(()=>{
        axios.get('http://localhost:5000/blogs/'+params.blogId)
            .then(data => {
                setBlog(data.data);
                setLoading(false);
            })
            .catch(e => console.log(e))
    },[]);

    function onChangeHandler(e){
        setComment({...comment, [e.target.name]:e.target.value});
    }
    function formHandler(e){
        e.preventDefault();

        axios.post('http://localhost:5000/blogs/'+blog._id+'/newcomment',comment)
            .then(res => setBlog(res.data))
            .catch(e => console.log(e));

        setComment({
            author:'',
            body:''
        });
    }

    function editHandler(){
        navigate('/blogs/'+params.blogId+'/editblog',{state: {blog:blog}} );
    }

    async function deleteHandler(){
        await axios.post('http://localhost:5000/blogs/'+blog._id+'/delete');
        navigate('/blogs/');
    }

    if(loading){
        return(
            <div className="">
                LOADING...
            </div>
        )
    }

  return (
      <>
            <Container className='mt-3 blog'>
                <Row>
                    <Col xs={9}>
                        <Card style={{ width: '100%' }}>
                            <Dropdown className='align-self-end m-1'>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={editHandler}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={deleteHandler}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Card.Body>
                                <Card.Title>{blog.title}</Card.Title>
                                <Card.Text>
                                    {blog.body}
                                </Card.Text>
                            </Card.Body>
                                {blog.comments.map((c)=>{
                                    return(
                                    <Card.Body key={c._id}>
                                        <Card.Title>Comments</Card.Title>
                                                <Card.Text>
                                                    {c.author} <br/>
                                                    {c.body } <br/> 
                                                    {(new Date(Date.parse(c.date))).toLocaleString()}
                                                </Card.Text>
                                    </Card.Body>
                                    )
                                })}
                        </Card>
                    </Col>

                    <Col>
                    <Form onSubmit={formHandler}>
                        <Form.Group className="mb-3" controlId="author">
                            {/* <Form.Label>Author</Form.Label> */}
                            <Form.Control type="text" name="author" 
                                placeholder="Your Name"
                                minLength={1}
                                onChange={onChangeHandler}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control as="textarea"
                            onChange={onChangeHandler}
                            name="body"
                            placeholder="Leave a comment here"
                            minLength={1}
                            style={{height:'150px'}}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        </Form>
                        
                    </Col>
                </Row>
            </Container>
      </>

  )
}

export default Blog