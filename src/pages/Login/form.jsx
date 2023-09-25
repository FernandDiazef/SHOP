import React, { useState } from 'react';
import { Card, Checkbox, Col, Modal, Row } from 'antd';
import { Form, Input } from 'antd';
import { Button } from 'react-bootstrap';
import { Avatar, Space } from 'antd';
import { useAuth } from './context';
import { Link, Navigate } from 'react-router-dom';
import "./loginBackground.css";
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const FormLogin = () => {
    const auth = useAuth();
    const [modalValidated, setModalValidated] = useState(false);
    
    const info = () => {
        Modal.info({
          title: 'Your email does not exist or the password is incorrect',
          content: (
            <div>
              <p>Your email does not exist, please register first <br/> or verify your email or password</p>
            </div>
          ),
          onOk() {setModalValidated(false)},
        });
      };

      if (localStorage.getItem("user")) {
        return <Navigate to="/" />
    };

    return (
        
        <div className='img-background'>
            <Row className="container d-flex justify-content-center">
                <Col span={50} className="mt-4">
                    <Card
                        className="d-flex mt-5 flex-lg-row flex-column justify-content-center align-items-center p-3"
                        hoverable
                        cover={<img alt="shopConsumer" className='img-fluid' style={{ maxHeight: "42em" }} src="https://img.freepik.com/free-vector/consumer-society-abstract-concept_335657-3111.jpg" />}
                    >
                        <Col span={30}>
                            <Card className="container border border-0 border-start w-100 me-5 ms-3">
                                <Space direction="vertical" size={16} className="mb-2 text-center w-100">
                                    <Space wrap size={16}>
                                        <Avatar style={{ width: "6em" }} size={100} src="https://logomaker.designfreelogoonline.com/media/productdesigner/logo/resized/000749_online_store_logos_design_free_online_E-commerce_cart_logo_maker-01.png" />
                                    </Space>
                                    <h3>Welcome Back</h3>
                                </Space>
                                <Form
                                    form={auth.form}
                                    layout="vertical"
                                    name="basic"
                                    onFinish={(values) => auth.Authentication(values, setModalValidated)}
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
                                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Input Email" className="p-2" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Password:"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                                min: 4,
                                                max: 10,
                                            },
                                        ]}
                                    >
                                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='Input Password' className="p-2" />
                                    </Form.Item>
                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select your checkbox!',
                                            }
                                        ]}
                                    >
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                    <Link to={"/register"} className="text-decoration-none fs-6" >Register Account</Link>
                                    <Button type="submit" className="btn btn-info text-white w-100 p-2 mt-2">
                                        Login
                                    </Button>
                                </Form>
                                {modalValidated === true && info()}
                            </Card>
                        </Col>
                    </Card>
                </Col>

            </Row >
        </div>
    );
}

export { FormLogin };
