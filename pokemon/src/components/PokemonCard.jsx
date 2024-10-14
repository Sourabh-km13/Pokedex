import {React,useState} from 'react'
import { Pokedex } from 'pokeapi-js-wrapper'
import { Link } from 'react-router-dom'
export default function PokemonCard({name}) {
  const P = new Pokedex()
  const [image, setimage] = useState('')
  const [title, settitle] = useState('')

  P.getPokemonByName(name)
  .then((res)=>{
    setimage(res.sprites.other.dream_world.front_default)
    settitle(res.name)
  })
  .catch((err)=>{
    settitle('not-found')
  })
  return(
    <>
    
    <Link to={'/poke'} state={{name:title, img:image}}><div
     className='h-fit border-2 border-white w-fit px-2 py-2 rounded-lg shadow-md shadow-blue-300 hover:cursor-pointer hover:shadow-lg hover:shadow-yellow-300'>
        <img className='object-contain w-72 h-72' src={image} alt="not-found" />
        <div className='text-white text-center bg-gray-700'>{title.toLocaleUpperCase()}</div>
    </div></Link>
    
    </>
  )
}
