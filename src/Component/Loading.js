import {Spinner} from 'react-bootstrap';
import React from 'react';

export default function Loading(props) {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="border"/>
    </div>
  );
};
