import { EditFilled } from '@ant-design/icons';
import { Card, Popconfirm, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { ModalBrandsAndCategories } from '../../components/modals/brandsAndCategories.modal';
import { crudContext } from '../../context/context';

const FormBrands = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState("");


    const { getCostumer, dateFormat, data, getOneElement, deletedOneElement } = useContext(crudContext);
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
            render: (t, r) => {
                return (<>
                    <div className="d-flex flex-row justify-content-center">
                        <Popconfirm title="Sure to delete?" onConfirm={() => deletedOneElement("brands", r.id)}>
                            <Button className="btn-icon btn-danger m-2 w-50" ><Trash /></Button>
                        </Popconfirm>
                        <Button
                            className="btn btn-success m-2 w-50"
                            onClick={async () => { await getOneElement("brands", r.id); setIsEdit("edit"); setOpenModal(true) }}
                        >
                            <EditFilled />
                        </Button>
                    </div>
                </>)
            }
        }
    ];

    useEffect(() => {
        getCostumer("brands");
    }, []);

    return (
        <>
            <Container>
                <Card
                    title="Brands"
                    extra={
                        <Button className="btn btn-info text-white" onClick={() => { setIsEdit(""); setOpenModal(true) }}>
                            Create Brands
                        </Button>
                    }
                >
                    <ModalBrandsAndCategories
                        endPoint={"brands"}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        isEdit={isEdit}
                    />
                    <div className="table-responsive">
                        {data &&
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
                        }
                    </div>
                </Card>
            </Container>
        </>
    );
}

export { FormBrands };