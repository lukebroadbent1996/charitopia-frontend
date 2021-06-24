import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Axios from "axios";
import "../styles/results.css";

require("dotenv").config();

const Card = styled.div`
  min-height: 29vh;
  max-height: 39vh;
  width: 24vw;
  background: url(${props => props.img}) no-repeat center;
  background-size: cover;
`

<<<<<<< HEAD


const Results = ({ user, data, searched }) => {
=======
const Results = ({ user, data, searched, setData, setSearched }) => {
>>>>>>> 548648974148a26e291833c82af2f43051f232c1
  const [images, setImages] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      const query = searched;
<<<<<<< HEAD
      const response = await Axios(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.KEY}`);
=======
      const response = await Axios(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_KEY}`);
>>>>>>> 548648974148a26e291833c82af2f43051f232c1
      setImages(response.data.results);
    }

    getImages();
  }, [searched]);

  const handleButton = () => {
    setData([]);
    setSearched("");
    setRedirect(true)
  }

  if (redirect) return <Redirect to="/"/>

  return (
    <>
      <div className="container-results">
        {data.length > 0 && images.length > 0 ? data.map((item, index) => {
          return (
            <div className="card-background">
              <Card img={images[index].urls.small} className="card">
                <div className="card-content">
                  <h2 className="card-header">{item.charityName}</h2>
                  <p className="card-text">{item.tagLine}</p>
                  <p>{item.currentRating.score}/100 <img src={item.currentRating.ratingImage.small} alt="rating image" /></p>
                </div>
              </Card>
            </div>
          )
        }) : <h1>Loading...</h1>}
      </div>
      <button className="search-button" type="button" onClick={handleButton}>Search again?</button>
    </>
  )
}

export default Results;