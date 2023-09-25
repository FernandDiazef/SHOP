import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
const NotFound = () => (
  <div className='img-background'>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to={"/"} ><Button className="btn btn-info text-white">Back Home</Button></Link>}
    />
  </div>

);
export { NotFound };