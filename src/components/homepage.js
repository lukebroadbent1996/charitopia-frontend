import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BiSearchAlt2 as SearchSymbol } from "react-icons/bi";
import "../styles/homepage.css";

import animals from "../utils/animals.json";
import { Redirect } from "react-router-dom";

const Homepage = ({ setData, data, setSearched }) => {
  const [input, setInput] = useState("");
  const [display, setDisplay] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  const handleClickOutside = (e) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplay(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api", { "search": input});
      setData(await response.data);
      setSearched(input);
    } catch (error) {
      console.error(error);
    }
  }

  if (data[0]) return <Redirect to="/search"/>

  return (
    <div className="container-homepage">
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="pos-rel">
          <input className="search-bar"
          type="text"
          name='search'
          placeholder="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onClick={() => setDisplay(!display)} />
          {display && (
            <div className="auto-container" ref={wrapperRef}>
              {animals
              .filter((search) => search.toLowerCase().search(input.toLowerCase()) > -1)
              .map((item, index) => {
                return (
                  <div className="option" 
                  key={index} 
                  tabIndex="0" 
                  onClick={() => { setInput(item); setDisplay(false); }}
                  onKeyPress={(e) => { if (e.key === "Enter") { setInput(item); setDisplay(false); }}}>
                    <p>{item}</p>
                  </div>
                )
              })}
            </div>
          )}
          <button type="submit" className="submit-button"><SearchSymbol color="rgb(134, 134, 134)" size="3em" /></button>
        </div>
      </form>
    </div>
  )
}

export default Homepage;