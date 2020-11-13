import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../../components/header/header';
import { connect } from 'react-redux';
import { Select, Tag, Button, Modal as AntModal } from 'antd';
import PokeModal from '../../components/modals/PokeModal';
import Filter from '../../components/filter';
import { getAll, getSpecificData } from '../../store/actions/PokemonsActions';

const { Option } = Select;

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokeList: [],
            filteredPokemon: [],
            onFilter: false,
            showModal: false,
            pokeActive: {},
        }
        props.getPokemons();
    }

    componentDidMount() {
        this.getAllPokemons();
    }

    getAllPokemons = () => {
        const { getSpecific } = this.props;
        let dataPokemon = [];

        for (let i = 0; i < 9; i++) {
            getSpecific(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then(resp => {
                // console.log("Pokemon: ",resp.result.name)
                dataPokemon.push(resp.result);
            }).catch(err => {
                console.log("err: ", err)
            })
        }
        console.log("Datapokemon: ", dataPokemon);
        this.setState({ pokeList: dataPokemon })
    }

    setTagColor = (type) => {
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

    filter = (id) => {
        this.setState({ onFilter: true });
        const { pokeList } = this.state;

        let found = [];
        pokeList.map(item => {
            if (item.id === id) {
                found.push(item);
            }
        })
        this.setState({ filteredPokemon: found });
    }

    onChange = (value) => {
        console.log("Selected Pokemon: ", value)
    }

    render() {
        const { pokeList, filteredPokemon, onFilter } = this.state;

        const pokemons = pokeList.sort(function (a, b) {
            return a.id - b.id;
        });

        return (
            <Wrapper>
                <Header />
                <div className="header">
                    <h1>
                        Find your favorite Pokemon here!
                    </h1>
                    <h2>What are you waiting? Click one and find out more info about the pokemon</h2>
                </div>
                <div className="filter">
                    <Filter
                        data={pokemons}
                        placeholder="Find a pokemon"
                        onFilterChange={(value) => this.filter(value)}
                        onClean={() => this.setState({ onFilter: false })}
                    />
                </div>
                <div className="poke-container">
                    {
                        onFilter ?
                            filteredPokemon.map(item => {
                                return (
                                    <div className="poke-item" onClick={() => this.setState({ showModal: true, pokeActive: item })}>
                                        <label>{item.name.toUpperCase()}</label>
                                        <div className="pic">
                                            {
                                                item.sprites.other &&
                                                <img
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`}
                                                    alt={item.name}
                                                    width={150}
                                                    height={130}
                                                />
                                            }
                                        </div>
                                        <div>
                                            <label className="atribute">Order: </label>
                                            <label className="value">{item.order}</label>
                                        </div>
                                        <div>
                                            <label className="atribute">Height: </label>
                                            <label className="value">{item.height}</label>
                                        </div>
                                        <label className="atribute">Types: </label>
                                        <div className="poke-data">
                                            {
                                                item.types && item.types.map(type => {
                                                    return (
                                                        <Tag color={this.setTagColor(type.type.name)}>{type.type.name.toUpperCase()}</Tag>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                            :
                            pokemons && pokemons.map(item => {
                                return (
                                    <div className="poke-item" onClick={() => this.setState({ showModal: true, pokeActive: item })}>
                                        <label>{item.name.toUpperCase()}</label>
                                        <div className="pic">
                                            {
                                                item.sprites.other &&
                                                <img
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`}
                                                    alt={item.name}
                                                    width={150}
                                                    height={130}
                                                />
                                            }
                                        </div>
                                        <div>
                                            <label className="atribute">Order: </label>
                                            <label className="value">{item.order}</label>
                                        </div>
                                        <div>
                                            <label className="atribute">Height: </label>
                                            <label className="value">{item.height}</label>
                                        </div>
                                        <label className="atribute">Types: </label>
                                        <div className="poke-data">
                                            {
                                                item.types && item.types.map(type => {
                                                    return (
                                                        <Tag color={this.setTagColor(type.type.name)}>{type.type.name.toUpperCase()}</Tag>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
                <AntModal
                    title={false}
                    visible={this.state.showModal}
                    onCancel={() => this.setState({ showModal: false })}
                    footer={null}
                    bodyStyle={{
                        height: '100%',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row"
                    }}
                    destroyOnClose={true}
                    width={600}
                >
                    <PokeModal data={this.state.pokeActive} />
                </AntModal>
            </Wrapper>
        )
    }
};

const Wrapper = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
flex-wrap: wrap;
width: 100%;

    .header{
        margin: 30px;

        h1{
            color:
        }
    }

    .poke-container{
        margin-top: 30px;
        display: flex;
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
    }
    .poke-item{
        width:100%;
        width: 325px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        border-radius: 10px;
        background-color: #FFF;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
        margin: auto auto 30px auto;

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
        &:hover {
            cursor: pointer;
        }
    }
    .filter{
        width: 100%;
    }
    .button{
        min-width: 120px;
        height: 30px;
        color: #F41250;
        font-size: 12px;
        margin-top: 20px;
        border: 1px #F41250 solid;
        border-radius: 20px;
        font-weight: 600;
        text-transform: uppercase;

        &:hover {
            border: 1px #F41250 solid;
            background-color: #F41250;
            color: #fff;
            cursor: pointer;
        }
        &:focus {
            background-color: #fff;
            color: #F41250;
            border: 1px #F41250 solid;
        }
    }
`;

const mapStateToProps = (state) => ({
    pokeLoading: state.pokemonsReducer.getAll.isLoading,
    pokeSuccess: state.pokemonsReducer.getAll.isSuccess,
    pokemons: state.pokemonsReducer.getAll.data,

    pokeDataSuccess: state.pokemonsReducer.getSpecific.isSuccess,
    pokeDataLoading: state.pokemonsReducer.getSpecific.isLoading,
    pokeData: state.pokemonsReducer.getSpecific.data,
});

const mapDispatchToProps = (dispatch) => ({
    getPokemons: () => dispatch(getAll()),
    getSpecific: (url) => dispatch(getSpecificData(url)),
});

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export default ConnectedDashboard;
