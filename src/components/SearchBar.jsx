import React, { useRef, useState } from "react"
import "../assets/Autocomplete.css" // Import the CSS
import { Navigate, useNavigate } from "react-router-dom"

export default function Autocomplete({ suggestions }) {
  const [elementidx, setelementidx] = useState(0)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [inputValue, setInputValue] = useState("")
  const navigate = useNavigate()

  const handleChange = (event) => {
    const value = event.target.value
    setInputValue(value)

    // Filter suggestions based on input value
    const filtered = suggestions
      .filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 5) // Limit to 5 suggestions
    setFilteredSuggestions(filtered)
  }
  const handleKeyPress = (e) => {
    console.log("called")
    console.log(elementidx)

    if (e.keyCode == 40 && filteredSuggestions.length > 0) {
      setInputValue(filteredSuggestions[elementidx])
      elementidx < filteredSuggestions.length - 1
        ? setelementidx(elementidx + 1)
        : elementidx
    }
    if (e.keyCode == 38 && elementidx > 0 && filteredSuggestions.length > 0) {
      setelementidx(elementidx - 1)
      setInputValue(filteredSuggestions[elementidx - 1])
    }

    if (e.keyCode == 13) {
      console.log("enter pressed")
      navigate("/poke", { state: { name: inputValue } })
    }
  }
  const handleSelect = (value) => {
    setInputValue(value)
    setFilteredSuggestions([])
    navigate("/poke", { state: { name: value } })
  }

  const handleBlur = () => {
    setTimeout(() => setFilteredSuggestions([]), 100) // Delay to allow click on suggestions
  }

  return (
    <div className="gradient-border h-fit relative w-1/5 mx-auto my-8 px-1 py-1">
      <input
        className="outline-none bg-transparent border-none w-full h-full rounded-lg px-2 py-1"
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyPress}
        placeholder="Type to search..."
      />
      {filteredSuggestions.length > 0 && (
        <ul className="autocomplete-suggestions absolute top-full left-0 w-full bg-gray-700 text-white max-h-32 overflow-y-auto border border-gray-300 rounded mt-1 z-10">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="autocomplete-suggestion p-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
