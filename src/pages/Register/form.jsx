import React, { useContext } from 'react';
import { Card, Col, Row } from 'antd';
import { Form, Input } from 'antd';
import { Button } from 'react-bootstrap';
import { registerContext } from './context';
import { Link } from 'react-router-dom';

const FormRegister = () => {
    const { onFinish, onFinishFailed } = useContext(registerContext);

    return (
        <div className='img-background'>
            <Row className="container d-flex justify-content-center">
                <Col span={50} className="mt-5">
                    <Card
                        className="d-flex mt-5 flex-lg-row flex-column justify-content-center p-3"
                        hoverable
                        cover={<img alt="shopConsumer" className='img-fluid' style={{ maxHeight: "38em" }} src="https://www.brandbuffet.in.th/wp-content/uploads/2021/01/Social-Commerce.png" />}
                    >
                        <Col span={30}>
                            <Card className="container border border-0 border-start w-100 me-5 ms-3">
                                <div className="text-center">
                                    <h3>Register your <br /> Account </h3>
                                </div>
                                <Form
                                    layout="vertical"
                                    name="basic"
                                    onFinishFailed={onFinishFailed}
                                    onFinish={onFinish}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        name={'email'}
                                        label="Email:"
                                        rules={[
                                            {
                                                required: true,
                                                type: 'email',
                                                message: 'Please input your Email!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Input Email" className="p-2" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Password:"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password placeholder='Input Password' className="p-2" />
                                    </Form.Item>
                                    <Link to={"/login"} className="text-decoration-none fs-6" >Return Login</Link>
                                    <Button type="submit" className="btn btn-info text-white w-100 p-2 mt-2">
                                        Register
                                    </Button>
                                </Form>
                            </Card>
                        </Col>
                    </Card>
                </Col>

            </Row >
        </div>
    );
}

export { FormRegister };
