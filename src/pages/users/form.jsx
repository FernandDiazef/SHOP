import { EditFilled } from '@ant-design/icons';
import { Card, Popconfirm, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { ModalUsers } from '../../components/modals/users.modal';
import { crudContext } from '../../context/context';


const FormUsers = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState("");

    const { getCostumer, dateFormat, data, getOneElement, deletedOneElement } = useContext(crudContext);
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
        },
        {
            title: 'Email',
            dataIndex: 'email',
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
            dataIndex: "id",
            render: (_, r) => {
                return (<>
                    <div className="d-flex flex-row justify-content-center">
                        <Popconfirm title="Sure to delete?" onConfirm={() => deletedOneElement("users", r.id)}>
                            <Button className="btn-icon btn-danger m-2 w-50"><Trash /></Button>
                        </Popconfirm>
                        <Button
                            className="btn btn-success m-2 w-50"
                            onClick={async () => {await getOneElement("users", r.id); setIsEdit("edit"); setOpenModal(true)}}
                        >
                            <EditFilled />
                        </Button>
                    </div>
                </>)
            }
        }
    ];

    useEffect(() => {
        getCostumer("users");
    }, []);
    return (
        <>
            <Container>
                <Card title="Users"
                    extra={
                        <Button className="btn btn-info text-white" onClick={() => {setIsEdit(""); setOpenModal(true)}}>
                            Create Users
                        </Button>
                        }
                >
                    <ModalUsers
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

export { FormUsers };