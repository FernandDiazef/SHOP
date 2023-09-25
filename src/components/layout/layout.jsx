import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    BarcodeOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    TagsOutlined,
    UserOutlined,

} from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const { Header, Content, Footer, Sider } = Layout;

function LayoutApp({ children }) {
    const items = [
        getItem(<Link to="/" className="text-decoration-none">Home</Link>, "1", <ShopOutlined />),
        getItem(<Link to="/logout" className="text-decoration-none">Logout</Link>, "6", <LogoutOutlined />),
    ];
    let roleValidated = JSON.parse(localStorage.getItem("userDecoded"))

    roleValidated.forEach((rol) => {
        if (rol === "Administrador") {
            items.splice(1, 0, getItem(<Link to="/users" className="text-decoration-none">Users</Link>, "2", <UserOutlined />));
            items.splice(2, 0, getItem(<Link to="/products" className="text-decoration-none">Products</Link>, "3", <ShoppingCartOutlined />));
            items.splice(2, 0, getItem(<Link to="/brands" className="text-decoration-none">Brands</Link>, "5", <BarcodeOutlined />));
        };
        if (rol === "Moderador") {
            if (items.length > 2) {
                items.splice(2, 0, getItem(<Link to="/categories" className="text-decoration-none">Categories</Link>, "4", <TagsOutlined />))
            } else {
                items.splice(1, 0, getItem(<Link to="/categories" className="text-decoration-none">Categories</Link>, "4", <TagsOutlined />))
            };
        };
    });

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={items}

                />
            </Sider>
            <Layout
                className="site-layout"
                style={{
                    marginLeft: collapsed ? 80 : 200,
                }}
            >
                <Header
                    style={{
                        padding: 0,
                        background: "#677390",
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: "24px 16px 0",
                        overflow: "initial",
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            textAlign: "center",
                            background: "#677390",
                            minHeight: "80vh",
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
}
export { LayoutApp };
