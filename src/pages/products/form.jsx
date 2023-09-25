import { EditFilled } from '@ant-design/icons';
import { Card, Popconfirm, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { ModalProducts } from '../../components/modals/products.modal';
import { crudContext } from '../../context/context';

const FormProducts = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState("");

    const { getCostumer, dateFormat, data, getOneElement, deletedOneElement } = useContext(crudContext);

    useEffect(() => {
        getCostumer("products");
    }, []);

    const columns = [
        {
            title: "No.",
            dataIndex: "id",
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Brand',
            dataIndex: 'Brand',
            render: (brand) => {
                return brand?.name;
            }
        },
        {
            title: 'User',
            dataIndex: 'User',
            render: (user) => {
                return user?.email;
            }
        },
        {
            title: 'Category',
            dataIndex: 'Category',
            render: (category) => {
                return category?.name;
            }
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (image) => {
                return <img alt='img' className='img-fluid' src={`${image}`} />;
            },
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            render: (date) => {
                return dateFormat(date);
            },
        },
        {
            title: "Updated",
            dataIndex: "updatedAt",
            render: (date) => {
                return dateFormat(date);
            },
        },
        {
            title: "Actions",
            dataIndex: 'id',
            render: (t, r) => {
                return (<>
                    <div className="d-flex flex-row justify-content-center">
                        <Popconfirm title="Sure to delete?" onConfirm={() => deletedOneElement("products", r.id)}>
                            <Button className="btn-icon btn-danger m-2 w-50"><Trash /></Button>
                        </Popconfirm>
                        <Button
                            className="btn btn-success m-2 w-50"
                            onClick={async () => {await getOneElement("products", r.id); setIsEdit("edit"); setOpenModal(true) }}
                        >
                            <EditFilled />
                        </Button>
                    </div>
                </>)
            }
        }
    ];



    return (
        <>
            <Container>
                <Card
                    title="Products"
                    // headStyle={{ backgroundColor: '#432424', color: '#ffffff' }}
                    // bodyStyle={{ backgroundColor: '#ff00ff' }}
                    extra={
                        <Button className="btn btn-info text-white" onClick={() => { setIsEdit(""); setOpenModal(true) }}>
                            Create Product
                        </Button>
                    }
                >
                    <ModalProducts
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        isEdit={isEdit}
                    />
                    <Table
                        columns={columns}
                        dataSource={data}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            total: data.length,
                        }}
                        scroll={{ x: 500 }}
                    />
                </Card>
            </Container>

        </>
    );
}

export { FormProducts };