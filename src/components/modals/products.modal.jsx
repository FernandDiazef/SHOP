import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select, Upload } from 'antd';
import { crudContext } from '../../context/context';
import { Instance } from '../../api/api';
import { UploadOutlined } from '@ant-design/icons';

const ModalProducts = ({ setOpenModal, openModal, isEdit }) => {
    const [form] = Form.useForm();
    const [brands, setBrands] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState();

    const { createElemten, updatedElement, oneDataId, oneData, setOneData } = useContext(crudContext);

    const getElement = async (endPoint) => {
        const getInstance = await Instance.get(`${endPoint}/`);
        if (endPoint === "brands") {
            setBrands(getInstance.data.data);
        } else if (endPoint === "users") {
            setUsers(getInstance.data.data);
        } else if (endPoint === "categories") {
            setCategories(getInstance.data.data)
        };
    };

    const onFinish = (values) => {
        values.image = values.image.file;
        console.log(values);
        if (isEdit === "edit") {
            updatedElement("products", oneDataId, values, true);
        } else {
            createElemten("products", values, true);
        };
        form.resetFields();
        setFile("")
        setOpenModal(false);
    };
    useEffect(() => {
        form.setFieldsValue(oneData)
        setFile("");
        setOneData("")
        getElement("brands");
        getElement("users")
        getElement("categories")
    }, [oneData])

    const onFileChange = ({fileList}) => {
        console.log('Upload event:', fileList);
        setFile(fileList);
    };
    return (
        <>
            <Modal
                forceRender
                okButtonProps={{ style: { backgroundColor: '#62d671', color: 'white' } }}
                title={`${isEdit === "edit" ? "Edit" : "Create"} Product`}
                centered
                open={openModal}
                okType="submit"
                okText={`${isEdit === "edit" ? "Edit" : "Create"}`}
                onOk={() => form.submit()}
                onCancel={() => { setOpenModal(false); form.resetFields(); setFile(""); }}
            >
                <Form
                    form={form}
                    encType="multipart/form-data"
                    className="mt-4" layout="vertical"
                    onFinish={onFinish}
                    initialValues={oneData === "" ? "" : oneData}
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
                        <Input placeholder='Input name' className="p-2" />
                    </Form.Item>
                    <Form.Item
                        label="Price:"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your price!',
                            },
                        ]}
                    >
                        <Input placeholder='Input price' className="p-2" />
                    </Form.Item>
                    
                    <Form.Item
                        name="image"
                        label="image"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Please input your image!',
                        //     },
                        //]}
                    >
                        <Upload
                            fileList={file}
                            onChange={onFileChange}
                            beforeUpload={() => false}
                            accept="image/*"
                            
                            action={"/upload.do"}
                            name="image"
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>


                    <Form.Item
                        label="Select Brands"
                        name="brandId"
                        rules={[
                            {
                                required: true,
                                message: 'Please Select one option',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="Select Option"
                        >
                            {brands.map((item, index) => (
                                <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Select User"
                        name="userId"
                        rules={[
                            {
                                required: true,
                                message: 'Please Select one option',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="Select Option"
                        >
                            {users.map((item, index) => (
                                <Select.Option key={index} value={item.id}>{item.email}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Select Category"
                        name="categoryId"
                        rules={[
                            {
                                required: true,
                                message: 'Please Select one option',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="Select Option"
                        >
                            {categories.map((item, index) => (
                                <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export { ModalProducts };