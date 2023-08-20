import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

function Signup(props) {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const host ='http://localhost:5000/api/auth/signup';
    const response = await fetch(`${host}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/home");
      props.showAlert('success', 'successfully created an account')
    } else {
      props.showAlert('danger', 'Invalid credentials')
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Form>
      <Form.Group className="mb-3" >
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control type="text" name='name' placeholder="Enter name" onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label htmlFor="email">Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password" onChange={handleChange} minLength={5}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default Signup;