import { useState,useEffect } from "react"
import {first151Pokemon,getFullPokedexNumber} from "../utils"

export default function SideNav(props){
     
    const {handleCloseMenu,handleToggleMenu,selectedPokemon, setSeletedPokemon,showSideMenu} = props
    const [currCards, setCurrCards] = useState(first151Pokemon);
    const [input, setInput] = useState("");

    useEffect(()=>{
        const newCards = first151Pokemon.filter((pokemonName)=>{
            return pokemonName.toLowerCase().includes(input.toLowerCase());
        })
        setCurrCards(newCards);
        if (newCards.length > 0) {
            setSeletedPokemon(first151Pokemon.indexOf(newCards[0]));
        } else {
            // Optional: Handle the case when the list is empty (e.g., no matches)
            setSeletedPokemon(null); // Or another appropriate fallback value
        }
    }, [input])

    return (
        <nav className={' ' + (!showSideMenu ? " open" : '')}>
            <div className={"header " + (!showSideMenu ? " open" : '')} >
                <button onClick={handleCloseMenu} className="open-nav-button">
                    <i className="fa-solid fa-arrow-left-long"></i>
                </button>
                <h1 className="text-gradient">Pokédex</h1>
            </div>

            <input 
                type="text"
                placeholder="Search Pokemon"
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />
            {currCards.map((pokemon, pokemonIndex)=>{
                const currIndex = first151Pokemon.indexOf(pokemon)
                return (
                    <button onClick={()=>{
                        setSeletedPokemon(first151Pokemon.indexOf(pokemon))
                    }} className={"nav-card " + (selectedPokemon===currIndex? "nav-card-selected":"")} key={pokemonIndex}>
                        <p>{getFullPokedexNumber(currIndex)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}