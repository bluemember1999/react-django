import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

export default () => (
  <Container>
    <h2 >
      404
    </h2>
    <h3>
      Sorry, the page you visited does not exist.
    </h3>
    <Link to="/">
      <Button type="primary">Back</Button>
    </Link>
  </Container>
);