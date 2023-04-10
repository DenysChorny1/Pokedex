import React from "react";
import style from './Info.module.css';

const Info = ({ data }) => {
    return (
        <div className={style.info_block}>
        {
            (!data) ? "" : (
                <div className={style.info}>
                    <img src={data.sprites.front_shiny} alt="" />
                    <div className={style.name}>
                        <h2>{data.name}</h2><h2>#{data.id}</h2>    
                    </div>
                    <table>
                    <tbody>
                        <tr>
                            <td className={style.table_name}>Types</td>
                            <td className={style.table_info}>{
                                data.types.map(poke=>{
                                    return( <p>{poke.type.name}</p>)
                                })
                            }</td>
                        </tr>
                        <tr>
                            <td className={style.table_name}>Attack</td>
                            <td className={style.table_info}>{data.stats[1].base_stat}</td>
                        </tr>
                        <tr>
                            <td className={style.table_name}>Defence</td>
                            <td className={style.table_info}>{data.stats[2].base_stat}</td>
                        </tr>
                        <tr>
                            <td className={style.table_name}>HP</td>
                            <td className={style.table_info}>{data.stats[0].base_stat}</td>
                        </tr>
                        <tr>
                            <td className={style.table_name}>SP Attack</td>
                            <td className={style.table_info}>{data.stats[3].base_stat}</td>
                        </tr>
                        <tr>
                            <td className={style.table_name}>SP Defence</td>
                            <td className={style.table_info}>{data.stats[4].base_stat}</td>
                        </tr>
                        <tr>
                            <td className={style.table_name}>Speed</td>
                            <td className={style.table_info}>{data.stats[5].base_stat}</td>
                        </tr>
                        <tr>
                            <td className={style.table_name}>Weight</td>
                            <td className={style.table_info}>{data.weight}</td>
                        </tr>
                        <tr>
                            <td className={style.table_name}>Total moves</td>
                            <td className={style.table_info}>{data.base_experience}</td>
                        </tr>
                        </tbody>
                        </table>
                    </div>
            )
        }
        </div>
    )
}
export default Info