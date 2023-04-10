import React from 'react'
import style from './Card.module.css';

const Card = ({ pokemon, loading, infoPokemon}) => {
    return (
        <div className={style.cards}>
        {
            loading ? <h1>Loading...</h1> :
                pokemon.map((item) => {
                    return (
                        <div className={style.card} key={item.id} onClick={()=>infoPokemon(item)}>
                            <img src={item.sprites.front_default} alt={item.name} />
                            <h2>{item.name}</h2>
                            <div className={style.types}>
                                {
                                    item.types.map(poke=>{
                                        return <span>{poke.type.name}</span>
                                    })
                                }
                            </div>
                        </div>
                    )
                })
        }
        </div>
    )
}
export default Card;