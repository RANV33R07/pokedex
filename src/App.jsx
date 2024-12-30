import { useState } from 'react'
import Header from './components/Header'
import SideNav from './components/SideNav'
import PokeCard from './components/PokeCard'
import TypeCard from './components/TypeCard'

function App() {

  const [selectedPokemon, setSeletedPokemon] = useState(0);
  const [showSideMenu, setShowSideMenu] = useState(false);

  function handleToggleMenu(){
    setShowSideMenu(!showSideMenu)
  }

  return (
    <>
      <Header handleToggleMenu={handleToggleMenu} />
      <SideNav 
        selectedPokemon={selectedPokemon} 
        setSeletedPokemon={setSeletedPokemon}
        handleToggleMenu={handleToggleMenu}
        showSideMenu = {showSideMenu}
      />
      <PokeCard
        selectedPokemon={selectedPokemon}
      />
      <TypeCard 
        selectedPokemon={selectedPokemon}
      />
    </>
  )
}

export default App
