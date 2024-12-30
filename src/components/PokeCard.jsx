import { useEffect,useState } from "react"
import { getFullPokedexNumber, getPokedexNumber} from "../utils"
import TypeCard from "./TypeCard"
import Modal from "./Modal"

export default function PokeCard(props){

    const {selectedPokemon} = props
    const [data, setData] = useState(null)
    const [loading,setLoading] = useState(false)
    const [skill, setSkill] = useState(null);
    const [loadingSkill, setLoadingSkill] = useState(false)

    const {name, height, types, abilities, stats, sprites, moves} = data || {};

    const imgList = Object.keys(sprites || {}).filter(val => {
        return sprites[val] && !['version', 'other'].includes(val);
    });
    
    async function fetchMoveData(move, moveUrl) {
        if (loadingSkill || !localStorage || !moveUrl) {
            return;
        }
    
        // Check cache for move
        let cache = {};
        if (localStorage.getItem("pokemon-moves")) {
            cache = JSON.parse(localStorage.getItem("pokemon-moves")); // Parse cache correctly
        }
    
        if (move in cache) {
            setSkill(cache[move]);
            console.log("Found move in cache.");
            return;
        }
    
        try {
            setLoadingSkill(true);
            const res = await fetch(moveUrl);
            if (!res.ok) {
                throw new Error(`Failed to fetch data: ${res.status}`);
            }
            const moveData = await res.json();
            console.log("Fetched move from API:", moveData);
    
            const description = moveData?.flavor_text_entries?.filter(val => 
                val.version_group.name === 'firered-leafgreen'
            )[0]?.flavor_text;
    
            const skillData = {
                name: move,
                description: description || "No description available."
            };
    
            setSkill(skillData);
    
            // Update cache with the new move
            cache[move] = skillData;
            localStorage.setItem("pokemon-moves", JSON.stringify(cache));
    
        } catch (err) {
            console.error("Error fetching move data:", err.message);
        } finally {
            setLoadingSkill(false);
        }
    }
    

    useEffect(()=>{
        if (!localStorage) {return}

        const cache = localStorage.getItem("pokedex")
            ? JSON.parse(localStorage.getItem("pokedex"))
            : {};

        if (selectedPokemon in cache){
            setData(cache[selectedPokemon])
            console.log("Found Pokemon on cache")
            return
        }

        async function fetchPokemonData(){
            setLoading(true)
            try {
                const baseURL = "https://pokeapi.co/api/v2/";
                const suffix = "pokemon/" + getPokedexNumber(selectedPokemon);
                const finalURL = baseURL+suffix;
                const res = await fetch(finalURL)
                const pokemonData = await res.json();
                setData(pokemonData)
                console.log("Fetched Pokemon Data")
                cache[selectedPokemon] = pokemonData;
                localStorage.setItem("pokedex",JSON.stringify(cache));

            } catch(err){
                console.log("Error : ",err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPokemonData();
        
    },[selectedPokemon])

    if (loading || !data) {
        return (
            <h1>Loading ...</h1>
        )
    }

    return (
        <div className="poke-card">
            {selectedPokemon === null ? (
                <div className="no-pokemon-found">
                    <h2>No Pokémon Found</h2>
                </div>
            ) : (
                <>
                    {skill && (
                        <Modal handleCloseModal={() => setSkill(null)}>
                            <div>
                                <h6>Name</h6>
                                <h2>{skill.name.replaceAll("-", " ")}</h2>
                            </div>
                            <div>
                                <h6>Description</h6>
                                <p>{skill.description}</p>
                            </div>
                        </Modal>
                    )}
                    <div>
                        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                        <h2>{name}</h2>
                    </div>
                    <div className="type-container">
                        {types.map((typeObj, typeIndex) => {
                            return (
                                <TypeCard type={typeObj?.type?.name} key={typeIndex} />
                            );
                        })}
                    </div>
                    <img
                        className="default-image"
                        src={"/pokemon/" + getFullPokedexNumber(selectedPokemon) + ".png"}
                        alt={`${name}-large-image`}
                    />
                    <div className="img-container">
                        {imgList.map((spriteURL, spriteIndex) => {
                            const imgURL = sprites[spriteURL];
                            return (
                                <img key={spriteIndex} src={imgURL} alt={`${name}-img-${spriteURL}`} />
                            );
                        })}
                    </div>
                    <h3>Stats</h3>
                    <div className="stats-card">
                        {stats.map((statObj, statIndex) => {
                            const { stat, base_stat } = statObj;
                            return (
                                <div className="stat-item" key={statIndex}>
                                    <p>{stat?.name.replaceAll("-", " ")}</p>
                                    <h4>{base_stat}</h4>
                                </div>
                            );
                        })}
                    </div>
                    <h3>Moves</h3>
                    <div className="pokemon-move-grid">
                        {moves.map((moveObj, moveIndex) => {
                            const { move } = moveObj;
                            return (
                                <button
                                    onClick={() => {
                                        fetchMoveData(moveObj?.move?.name, moveObj?.move?.url);
                                    }}
                                    key={moveIndex}
                                    className="move-item"
                                >
                                    <p>{moveObj?.move?.name.replaceAll("-", " ")}</p>
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
    
}