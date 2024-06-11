import React from 'react';
import { Layout, Menu, Avatar, Dropdown, theme, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { logoutFromSystem } from '../api';

const { Header, Content } = Layout;

const items = [
    {
        key: 'home',
        label: <Link to={`/`}>Home</Link>,
    },
    {
        key: 'price-list',
        label: <Link to={`price-list`}>Price List</Link>,
    }
]

const App: React.FC = () => {

    const navigate = useNavigate();

    const logout = () => {

        const refreshToken = localStorage.getItem('refreshToken')

        logoutFromSystem(refreshToken).then(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate("/login");
        })

    }


    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                />
                <Dropdown dropdownRender={() => (
                    <div style={{
                        minWidth: '400px',
                        minHeight: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start'
                    }}>
                        <Link style={{ width: '100%', padding: 25, background: 'red', color: '#fff' }} to={`profile`}>My profile</Link>
                        <Button onClick={logout}>Logout</Button>
                    </div>
                )}>
                    <Avatar size={40} icon={<UserOutlined />} />
                </Dropdown>
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: '100vh',
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet/>
                </div>
            </Content>
        </Layout>
    );
};

export default App;
