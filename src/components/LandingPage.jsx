import PokemonCard from "./PokemonCard"
import Autocomplete from "./SearchBar"


export default function LandingPage() {
    const pokeArr=['pikachu','charmander','bulbasaur','squirtle','charizard','dragonite','snorlax','lugia','golduck','gyarados','onix','machamp','arcanine','rapidash','gastly','lapras']
    return(
        <>
        <Autocomplete suggestions={pokeArr}/>
        <div className="text-white flex flex-wrap gap-8 px-20">
        {
            pokeArr.map((ele,idx)=>{
                return <PokemonCard key={idx} name={ele}/>
            })
        }
        </div>
        </>

    )
}
