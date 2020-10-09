import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpecificData } from '../../store/actions/PokemonsActions';
import { Tag, Tooltip } from 'antd';
import { StarOutlined, StarTwoTone } from '@ant-design/icons';
import { success } from '../messages/notifications';


const PokeModal = ({ data, removed }) => {
    const [fav, setFav] = useState(false);
    const dispatch = useDispatch();
    const [pokeStats, setPokeStats] = useState([]);
    const [moves, setMoves] = useState();

    useEffect(() => {
        console.log("Item selected: ",data)
        console.log("Favs: ", localStorage.getItem(data.name))
        if(localStorage.getItem(data.name)){
            setFav(true);
        }
        else{
            setFav(false);
        }
    },[fav])

    useEffect(() => {
        init();
    },[])

    const init = () => {
        let stats = [];
        let moves = [];
        data.stats && data.stats.map(item => {
            let obj = {};
            dispatch(getSpecificData(item.stat.url)).then(resp => {
                // console.log("Stat: ",resp.result);
                obj.stat = item.stat.name;
                obj.base_stat = item.base_stat;
                obj.effort = item.effort;
                obj.details = resp.result;
                
                stats.push(obj);
            })
        })
        setPokeStats(stats);

        data.moves && data.moves.map(item => {
            moves.push(item.move.name);
        })
        // console.log("Moves. ", moves)
        setMoves(moves);
    }

    const setFavItem = (action) => {
        console.log("DataId: ",data.id)
        if(action === 'add')
        {
            localStorage.setItem(data.name, data.id)
            setFav(true);
            success('Added to favorites.')
        }else{
            localStorage.removeItem(data.name, data.id)
            setFav(false);
            removed();
            success('Removed from favorites.')
        }
    }

    const setTagColor = (type) => {
        switch (type) {
            case 'fire': return 'red'; break;
            case 'water': return 'blue'; break;
            case 'electric': return 'yellow'; break;
            case 'poison': return 'purple'; break;
            case 'normal': return 'grey'; break;
            case 'dark': return 'black'; break;
            case 'ground': return '#679706'; break;
            case 'grass': return '#966C04'; break;
            case 'flying': return 'cyan'; break;
            case 'bug': return 'geekblue'; break;
            case 'psychic': return '#EE64DD'; break;
            case 'fairy': return '#F5AFEC'; break;
            case 'fighting': return '#DB7017'; break;
            case 'ice': return '#32AACF'; break;
            case 'steel': return '#405F69'; break;
            case 'rock': return '#9B9793'; break;
            case 'ghost': return '#50DCB3'; break;
            default: return 'lime'; break;
        }
    }

    return (
        <Wrapper>
            <div className="header">
                {
                    <Tooltip title={fav ? "Remove from Favs" : "Add to Favs"}>
                        <StarOutlined 
                            style={{ color: fav ? 'yellow' : null }}
                            onClick={() => setFavItem(fav ? 'remove' : 'add')} 
                        />
                    </Tooltip>
                }
            </div>
            <div className="container">
                <div className="pic">
                    {
                        data.sprites.other && <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt={data.name} />
                    }
                </div>
                <div className="poke-item">
                    <label>{data.name.toUpperCase()}</label>
                    <div>
                        <label className="atribute">Order: </label>
                        <label className="value">{data.order}</label>
                    </div>
                    <div>
                        <label className="atribute">Height: </label>
                        <label className="value">{data.height}</label>
                    </div>
                    <label className="atribute">Types: </label>
                    <div className="poke-data">
                        {
                            data.types && data.types.map(type => {
                                return (
                                    <Tag color={setTagColor(type.type.name)}>{type.type.name.toUpperCase()}</Tag>
                                )
                            })
                        }
                    </div>
                    <label className="atribute">Abilities: </label>
                    <div className="poke-data">
                        {
                            data.abilities && data.abilities.map(type => {
                                return (
                                    <Tag color="magenta">{type.ability.name.toUpperCase()}</Tag>
                                )
                            })
                        }
                    </div>
                    <label className="atribute">Stats: </label>
                    <div className="poke-data">
                        {
                            pokeStats && pokeStats.map(stat => {
                                return (
                                    <Tag color="blue">{stat.stat.toUpperCase()+": "+stat.base_stat}</Tag>
                                )
                            })
                        }
                    </div>
                    <label className="atribute">Moves: </label>
                    <div className="poke-data">
                        {
                            moves && moves.map((move,i) => {
                                if(i<10){
                                    return (
                                        <Tag color="green">{move.toUpperCase()}</Tag>
                                    )
                                }else if(i===10){
                                    return (
                                        <Link to={{
                                            pathname: `/moves`,
                                            state: {
                                                record: { data: data },
                                            },
                                        }}
                                        >
                                            <Tag color="green">{(moves.length-10)+" more moves."}</Tag>
                                        </Link>                                        
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </Wrapper>
    )
};

const Wrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;

    .header{
        font-size: 25px;
        display: flex;
        justify-content: flex-start;
    }
    .container{
        width:100%;
        display:flex;
        justify-content: center;
        flex-direction: row;
    }
    .pic{
        width: 80%;
        height: 100%;
        display: flex;
        align-content: center;
        justify-content: center;

        img{
            width:200px;
            height: 230px;
        }
    }
    .poke-item{
        width:100%;
        height: 100%
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px; 
        
        label{
            font-size: 18px;
            font-family: Candara;
            font-weight: 600;
        }
        .atribute{
            font-size: 16px;
            font-family: Candara;
            font-weight: 400;
        }
        .value{
            font-size: 16px;
            font-family: Candara;
            font-weight: 600;
            color: #6094FF;
        }
    }
`;

export default PokeModal;