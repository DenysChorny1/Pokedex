import React, {useState, useEffect} from 'react'
import Card from "../card/Card";
import Info from "../info/Info";
import axios from "axios";

const Main = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokemonId, setPokemonId] = useState();
    const [modal, setModal] = useState(false);
    const [selectType, setSelectType] = useState(null);
    const [types, setTypes] = useState([]);
  
    const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${url}pokemon/?limit=12`);
          const nextUrl = response.data.next;
          const prevUrl = response.data.previous;
          const pokemonResults = await Promise.all(
            response.data.results.map(async (pokemon) => {
              const pokemonData = await axios.get(pokemon.url);
              return pokemonData.data;
            })
          );
          const typesResponse = await axios.get(`https://pokeapi.co/api/v2/type?limit=999`);
          const typesResults = await Promise.all(
            typesResponse.data.results.map(async (type) => {
              const typeData = await axios.get(type.url);
              return typeData.data;
            })
          );
          setNextUrl(nextUrl);
          setPrevUrl(prevUrl);
          setPokemonData(pokemonResults);
          setTypes(typesResults);
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
    };

    const handleTypeSelect = (event) => {
      setSelectType(event.target.value);
    }
    
    const filteredPokemons = selectType
      ? pokemonData.filter((pokemon) =>
          pokemon.types.find((type) => type.type.name === selectType)
        )
      : pokemonData;
  
    const toggleModal = () => {
      setModal(!modal);
    };

    useEffect(() => {
        fetchData();
    }, [url]);
    
    const Buttons = () => {
        return(
            <div className="btn-group">
                {  prevUrl && <button onClick={()=>{
                    setPokemonData([])
                    setUrl(nextUrl) 
                }}>Previous</button>}

                { nextUrl && <button onClick={()=>{
                    setPokemonData([])
                    setUrl(nextUrl)
                }}>Load More</button>}

            </div>
        )
    }
    const Selected = () => {
        return(
            <select value={selectType} onChange={handleTypeSelect}>
                {[{name: ''}, ...types].map((type) => (
                    <option key={type.name} value={type.name}>{type.name}</option>
                ))}
            </select>
        )
    }
    return(<>
            <h1>Pokedex</h1>
            <div className="container">
                <div className="left-content">
                    <Selected/>
                    <div onClick={toggleModal}>
                        <Card pokemon={filteredPokemons } loading={loading} infoPokemon={id => setPokemonId(id)}/>
                    </div>
                    <Buttons/>
                </div>
                <div  onClick={toggleModal} className={`right-content ${modal ? 'active-modal' : ''}`}>
                   <Info key={pokemonId} data={pokemonId}/>
                </div>
            </div>
    </>   
    )
}
export default Main;