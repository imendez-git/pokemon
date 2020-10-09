import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu as AntMenu } from 'antd';
import { Link } from 'react-router-dom';

// const { SubMenu } = Menu;

const Menu = ({ selected }) => {
    const [active, setActive] = useState(selected);

    const handleClick = (e) => {
        console.log("active opt: ", e.key)
        setActive(e.key)
    }

    return(
        <Wrapper>
            <div>
                <AntMenu onClick={handleClick} selectedKeys={[active]} mode="horizontal" >
                    <AntMenu.Item key='1'>
                        <Link to="/pokedex"/>
                        POKEDEX
                    </AntMenu.Item>
                    <AntMenu.Item key='2'>
                        <Link to="/favorites"/>
                        FAVORITES
                    </AntMenu.Item>
                </AntMenu>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    ant-menu-item ant-menu-item-only-child ant-menu-item-selected .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected{
        color: #F41250;
        border-bottom: 2px solid #F41250;
    }


`;

export default Menu;