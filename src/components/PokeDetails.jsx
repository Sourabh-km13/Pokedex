import React, { useState, useEffect, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Pokedex } from "pokeapi-js-wrapper"

export default function PokeDetails() {
  const [properties, setProperties] = useState({
    abilities: [],
    moves: [],
    forms: [],
    photo: "",
    type: [],
  })

  const location = useLocation()
  const navigate = useNavigate()
  
  useEffect(() => {
    const p = new Pokedex()

    p.getPokemonByName(location.state.name)
      .then((res) => {
        console.log(res)

        setProperties({
          abilities: res.abilities,
          moves: res.moves,
          forms: res.forms,
          photo: res.sprites.other.dream_world.front_default,
          type: res.types,
        })
      })
      .catch((error) => {
        console.error("Error fetching Pokémon details:", error)
        alert("pokemon does not exist ")
        navigate("/")
      })
  }, [location.state.name])

  return (
    <>
      <div className="flex justify-between gap-8">
        <img className="w-1/2 h-svh" src={properties.photo} alt="" />
        <div className="text-white w-1/2 px-6 ">
          <div
            className="tracking-widest text-4xl font- text-center my-4 text-yellow-300 font-semibold
        text-shadow text-shadow-x-2 text-shadow-y-1 text-shadow-sky-500"
          >
            {location.state.name.replace(/^./, (match) => match.toUpperCase())}
          </div>
          {properties ? (
            <>
              <h3
                className="text-xl text-yellow-300 font-semibold
        text-shadow text-shadow-x-2 text-shadow-y-1 text-shadow-sky-500"
              >
                Type:
              </h3>
              <ul className="flex gap-1">
                {properties.type.map((tp, index) => (
                  <li key={index}>{tp.type.name},</li>
                ))}
              </ul>
              <h3
                className="text-xl text-yellow-300 font-semibold
        text-shadow text-shadow-x-2 text-shadow-y-1 text-shadow-sky-500"
              >
                Abilities:
              </h3>
              <ul className="flex gap-1">
                {properties.abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name},</li>
                ))}
              </ul>

              <h3
                className="text-xl text-yellow-300 font-semibold
        text-shadow text-shadow-x-2 text-shadow-y-1 text-shadow-sky-500"
              >
                Moves:
              </h3>
              <ul className="flex gap-1 flex-wrap">
                {properties.moves.map((move, index) => (
                  <li key={index}>{move.move.name},</li>
                ))}
              </ul>

              <h3
                className="text-xl text-yellow-300 font-semibold
        text-shadow text-shadow-x-2 text-shadow-y-1 text-shadow-sky-500"
              >
                Forms:
              </h3>
              <ul className="flex gap-1">
                {properties.forms.map((form, index) => (
                  <li key={index}>{form.name},</li>
                ))}
              </ul>
            </>
          ) : (
            <p>Loading Pokémon details...</p>
          )}
        </div>
      </div>
    </>
  )
}
