import React from 'react';
import styled from 'styled-components';
import { Col } from 'antd';
import Menu from '../menus/menu';
import { Link } from 'react-router-dom';

const Header = ({ active }) => {
    return(
        <div>
            <Nav>
                <div className="row" >
                    <Col className="col" lg={{ span: 4 }} md={{ span: 3 }} sm={{ span: 2 }} xs={{ span: 3 }} />
                    <Col className="col" lg={{ span: 6 }} md={{ span: 5 }} sm={{ span: 4 }} xs={{ span: 3 }}>
                        <Link to="/">
                            <img src={`/icons/pokeball-phone.svg`} alt="pokeicon" />
                            <label className="title" >POKÉMON</label>
                        </Link>
                    </Col>
                    <Col className="col" lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 5 }} xs={{ span: 4 }} />
                    <Col className="col" lg={{ span: 8 }} md={{ span: 10 }} sm={{ span: 11 }} xs={{ span: 12 }}>
                        <label className="title-two" >Pókemon resources by</label>
                        <label className="title-two" style={{ fontWeight: '600' }} > Israel Méndez</label>
                    </Col>
                </div>
            </Nav>
            <div className="menu">
                <Menu selected={active} />
            </div>
        </div>
    )
};

const Nav = styled.nav`
    background-color: #F41250;
    width: 100%;
    height: 150px;
    margin:0px auto !important; 
    min-width: 500px;
    user-select: none;
    display: flex;
    flex-direction: column;

    .row {
        height: 100%;
        width: 100%;
        display: flex;
        margin-bottom: 20px;
    }
    .menu{
        width: 90;
        display: flex;
        justify-cotent: center;
    }
    
    .col {
        height: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    img{
        height: 50px;
    }
    .title{
        color: white;
        font-weight: 600;
        font-size: 18px;
        font-family: 'Candara';
        &:hover{
            cursor: pointer;
        }
    }
    .title-two{
        color: white;
        font-size: 18px;
        font-family: 'Candara';
        padding-right: 6px;
    }
    
    @media (max-width:458px){
        .col {
            height: 95%;
            display: flex;
            width: 80%;
            align-items: center;
            flex-wrap: wrap;
        }
    }
    @media (max-width:371px){
        .row {
            height: 95%;
        }
        .col {
            height: 95%;
            width: 100%;
        }
    }
`;

export default Header;