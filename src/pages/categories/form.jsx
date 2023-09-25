import { EditFilled } from '@ant-design/icons';
import { Card, Popconfirm, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { ModalBrandsAndCategories } from '../../components/modals/brandsAndCategories.modal';
import { crudContext } from '../../context/context';

const FormCategories = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState("");
    const { getCostumer, dateFormat, data, deletedOneElement, getOneElement } = useContext(crudContext);
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
            render: (_, r) => {
                return (<>
                    <div className="d-flex flex-row justify-content-center">
                        <Popconfirm title="Sure to delete?" onConfirm={() => deletedOneElement("categories", r.id)}>
                            <Button className="btn-icon btn-danger m-2 w-50"><Trash /></Button>
                        </Popconfirm>

                        <Button
                            className="btn btn-success m-2 w-50"
                            onClick={async () => {await getOneElement("categories", r.id); setIsEdit("edit"); setOpenModal(true)}}
                        >
                            <EditFilled />
                        </Button>
                    </div>
                </>)
            }
        }
    ];
    useEffect(() => {
        getCostumer("categories");
    }, []);
    return (
        <>
            <Container>
                <Card
                    title="Categories"
                    extra={
                        <Button className="btn btn-info text-white" onClick={() => {setIsEdit(""); setOpenModal(true)}}>
                            Create Category
                        </Button>
                    }
                >
                    <ModalBrandsAndCategories
                        endPoint={"categories"}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        isEdit={isEdit}
                    />
                    <div className="table-responsive">

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
                    </div>
                </Card>
            </Container>

        </>
    );
}


export { FormCategories };