import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import "../styles/results.css";

const Card = styled.div`
  width: 25vw;
  background: url(${props => props.img}) no-repeat center bottom fixed;
  background-size: cover;
`

const KEY = "6Fl9v7VsHxRVVHl22wphy2-O8Nwv6bCpm-TryVnP6dw";

const Results = ({ user, data, searched }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const query = searched;
      const response = await Axios(`https://api.unsplash.com/search/photos?query=${query}&client_id=${KEY}`);
      setImages(response.data.results);
    }

    getImages();
  }, [searched]);


  return (
    <div className="container-results">
      {data.length > 0 ? data.map((item, index) => {
        return (
          <Card >
            <div className="card-content">
              <h2 className="card-header">{item.charityName}</h2>
              <p className="card-text">{item.mission}</p>
            </div>
          </Card>
        )
      }) : <h1>Loading...</h1>}
    </div>
  )
}

export default Results;