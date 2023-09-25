import { Card } from 'antd';
import React from 'react';

const Home = () => {
    return (
        <>
            <h1>{"Bienvenido guapo <3"}</h1>
            <Card
                hoverable
                style={{
                    width: 240,
                }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Card.Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
        </>
    );
}

export { Home };