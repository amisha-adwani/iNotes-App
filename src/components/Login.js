import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom'
const Login = () => {
    let navigate = useNavigate()
  const [credentials, setCredentials] = useState({ username:"",email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const host = "http://localhost:5000/api/auth/login";
    const response = await fetch(`${host}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.username,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
    // save the auth token and redirect
    localStorage.setItem('token', json.authtoken)
    navigate('/')

    }
    else{
        alert('Invalid credentials')
    }
  };

  const handleChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div className="m-3">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name"         
            name='username'
          value={credentials.username}
          onChange={handleChange}/>
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"

        >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"          name='email'
          value={credentials.email}
          onChange={handleChange} />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"

        >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"           name='password'
          value={credentials.password}
          onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
