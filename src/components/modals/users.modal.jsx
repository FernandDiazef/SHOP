import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { crudContext } from '../../context/context';

const ModalUsers = ({ setOpenModal, openModal, isEdit }) => {
    const [form] = Form.useForm();
    const [emialEdit, setEmailEdit] = useState();

    const { createElemten, oneData, setOneData, oneDataId, updatedElement } = useContext(crudContext);

    const onFinish = (values) => {
        if (isEdit === "edit") {
            updatedElement(`users`, oneDataId, values);
        } else {
            createElemten("users", values);
        }
        form.resetFields();
        setOpenModal(false);
    };

    useEffect(() => {
        setEmailEdit({email: oneData.email});
        form.setFieldsValue(emialEdit)
        setOneData("")
    }, [oneData])

    return (
        <>
            <Modal
                forceRender
                okButtonProps={{ style: { backgroundColor: '#62d671', color: 'white' } }}
                title={`${isEdit === "edit" ? "Edit" : "Create"} Users`}
                centered
                open={openModal}
                okType="submit"
                okText={`${isEdit === "edit" ? "Edit" : "Create"}`}
                onOk={() => form.submit()}
                onCancel={() => { setOpenModal(false); form.resetFields() }}
            >
                <Form
                    form={form}
                    className="mt-4"
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={emialEdit === "" ? "" : emialEdit}
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
                                min: 4,
                                max: 10,
                            },
                        ]}
                    >
                        <Input.Password placeholder='Input Password' className="p-2" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export { ModalUsers };