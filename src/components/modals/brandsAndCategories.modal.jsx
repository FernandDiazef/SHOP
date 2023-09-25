import React, { useContext, useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { crudContext } from '../../context/context';

const ModalBrandsAndCategories = ({ endPoint, setOpenModal, openModal, isEdit }) => {
    const [form] = Form.useForm();

    const { createElemten, oneData, setOneData, oneDataId, updatedElement } = useContext(crudContext);

    const onFinish = (values) => {
        if (isEdit === "edit") {
            updatedElement(`${endPoint}`, oneDataId, values);
        } else {
            createElemten(`${endPoint}`, values);
        };
        setOpenModal(false);
        form.resetFields();
    };
    useEffect(() => {
        form.setFieldsValue(oneData)
        setOneData("")
       }, [oneData])

    return (
        <>
            <Modal
                forceRender
                okButtonProps={{ style: { backgroundColor: '#62d671', color: 'white' } }}
                title={`${isEdit === "edit" ? "Edit" : "Create"} ${endPoint}`}
                centered
                open={openModal}
                okType="submit"
                okText={`${isEdit === "edit" ? "Edit" : "Create"}`}
                onOk={() => form.submit()}
                onCancel={() => { setOpenModal(false); form.resetFields(); }}
            >
                <Form
                    form={form}
                    className="mt-4"
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={oneData === "" ? "" : oneData}
                    onValuesChange={(_, allValues) => {
                        if (oneData !== "") {
                            setOneData(allValues);
                        }
                    }}
                >
                    <Form.Item
                        label="Name:"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input
                            placeholder='Input name'
                            className="p-2"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export { ModalBrandsAndCategories };