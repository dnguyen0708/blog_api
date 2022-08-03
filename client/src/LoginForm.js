import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {

    function formHandler(){
        return;
    }

    function onChangeHandler(){
        return;
    }
    return (
        <Container className='mt-3'>
          <Form onSubmit={formHandler}>
              <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text"
                      name="username"
                      placeholder="Username"
                      onChange={onChangeHandler} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password'
                      name="password" 
                      placeholder="Password" 
                      onChange={onChangeHandler} />
              </Form.Group>
              <Button variant="primary" size='lg' type="submit">
                  Submit
              </Button>
          </Form>
        </Container>
    )
}

export default LoginForm