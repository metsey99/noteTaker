import React, { useState, useEffect } from 'react';
import { auth, provider } from '../../firebase';
import { Col, Row, Button } from 'antd';

const LoginPage = () => {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user && user.displayName){
        setDisplayName(user.displayName);
      }
    })
  }, []);

  const handleGoogleLogin = async () => {
    try {
      let result = await auth.signInWithPopup(provider);
      if (result.user !== null && result.user.displayName !== null) {
        setDisplayName(result.user.displayName);
      }
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload(true);
    }
  }

  const handleGoogleLogout = async () => {
    try {
      await auth.signOut();
      window.location.reload(true);
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <Row justify="center">
      {displayName === "" ?
        <Col>
          <div>Please Login using your Google account.</div>
          <Button type="primary" onClick={handleGoogleLogin}>Login</Button>
        </Col> :
        <Col>
          <h1>{displayName}</h1>
          <Button type="primary" danger onClick={handleGoogleLogout} >Logout</Button>
        </Col>}
    </Row>
  );
}

export default LoginPage;