import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import './styles/App.css';

import Homepage from "./components/homepage";
import Recommended from "./components/recommended";
import Register from "./components/register";
import Account from "./components/account";
import Results from "./components/results";
import Login from "./components/login";

const StyledWrapper = styled.div`
  display: flex; 
  min-height: 100vh;
  width: 100%;
  background: url(${props => props.img}) no-repeat center bottom fixed;
  background-size: cover;
`

const App = () => {
  const [user, setUser] = useState("");
  const [randomImg, setRandomImg] = useState("");
  const [randomImgSrc, setRandomImgSrc] = useState("");
  const [changed, setChanged] = useState(false);
  const [data, setData] = useState([]);
  const [searched, setSearched] = useState("");

  const getRandomImg = () => { 
    //gets all the images from the folder images and puts them into an object as a key value pair. 
    //key = file name (./ removed from it) value = image path from built.
    const importAll = (r) => {
      let images = {};
      r.keys().forEach((keys) => { images[keys.replace("./", "")] = r(keys) });
      return images;
    }
    //require.context is from webpack. It allows you to search from folders that are publically avaible with regEx to filter.
    const images = importAll(require.context("./images/", false, /\.jpg$/));
    const imgArr = Object.keys(images);

    let num = Math.floor(Math.random() * imgArr.length);

    let newRandomImg = imgArr[num];
    let newRandomImgSrc = Object.entries(images)[num][1].default;
    setRandomImg(newRandomImg);
    setRandomImgSrc(newRandomImgSrc);
    setChanged(false);
  }

  useEffect(() => {
    getRandomImg()
  }, [changed]);

  return (
    <div className="App">
      <StyledWrapper img={randomImgSrc}>
        <Router>
          <div className="navbar">
            <ul>
              <li>
                <Link to="/" className="navbar-item" onClick={() => setChanged(true)}>Search</Link>
              </li>
              <li>
                <Link to="/recommended" className="navbar-item" onClick={() => setChanged(true)}>Recommended</Link>
              </li>
              {user ?
                <>
                  <li>
                    <Link to="/account" className="navbar-item" onClick={() => setChanged(true)}>Account</Link>
                  </li> 

                </>
              : 
                <>
                  <li>
                    <Link to="/login" className="navbar-item" onClick={() => setChanged(true)}>Login</Link>
                  </li>
                  <li>
                    <Link to="/register" className="navbar-item" onClick={() => setChanged(true)}>Register</Link>
                  </li>
                </>}
            </ul>
          </div>

          <Switch>
            <Route path="/account">
              <Account user={user} setUser={setUser} />
            </Route>
            <Route path="/recommended">
              <Recommended />
            </Route>
            <Route path="/login">
              <Login setUser={setUser} />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/search">
              <Results user={user} data={data} searched={searched} />
            </Route>
            <Route path="/">
              <Homepage setData={setData} data={data} setSearched={setSearched} />
            </Route>
          </Switch>
        </Router>
      </StyledWrapper>
    </div>
  );
}

export default App;