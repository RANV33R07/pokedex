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

  function handleCloseMenu() {
    setShowSideMenu(true)
  }

  return (
    <>
      <Header handleToggleMenu={handleToggleMenu} />
      <SideNav 
        selectedPokemon={selectedPokemon} 
        setSeletedPokemon={setSeletedPokemon}
        handleToggleMenu={handleToggleMenu}
        showSideMenu = {showSideMenu}
        handleCloseMenu = {handleCloseMenu}
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
