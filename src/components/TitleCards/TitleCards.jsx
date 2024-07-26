import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data';



const TitleCards = ({title, category}) => {


  const[apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2RlN2MyZGQzMWQzMDgyOWU1NDMzNzlhN2Q0YTc5MiIsIm5iZiI6MTcyMTk3ODA2NC45NDE4ODgsInN1YiI6IjY2YTM0NzM3M2RlMjEwMjExMjA4ZjFiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k-pk1nGAavFw9-IVCfDgohTZE-F5e1GMeiY4Mo3mPc0'
    }
  };
  
 

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);

  }, [])

  return (
    <div className = "titlecards">
      <h2>{title?title: "Popular On Netflix"}</h2>
      <div className = "card-list" ref = {cardsRef}>
        {apiData.map( (card, index) => {
          return(
            <div className = "card" key = {index}>
              <img src = {`https://image.tmdb.org/t/p/w500/` + card.backdrop_path} alt = "" />
              <div className = "card-info">
                <p>{card.original_title}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards