import {pokemonTypeColors} from "../utils"

export default function TypeCard(props){

    const {type} = props
    const color = pokemonTypeColors && pokemonTypeColors[type] && pokemonTypeColors[type].color;
    const background = pokemonTypeColors && pokemonTypeColors[type] && pokemonTypeColors[type].background

    return (
        <div className="type-tile" style={{color : color , background : background}}>
            <p>{type}</p>
        </div>
    )
}