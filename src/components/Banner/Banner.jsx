import "./Banner.css"
import { API_KEY, imageUrl } from "../../constants/constants";
import axios from '../../axios'
import { useEffect, useState } from 'react';
export default function Banner() {
  const [movie, setMovie] = useState()
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((res) => {
      setMovie(res.data.results[(Math.floor(Math.random()*20))])
    })
  }, [])

  return (
    <div style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ''})` }} className="banner">
      <div className="content">
        <h1 className="title">{movie ? movie.title : ''}</h1>
        <div className="banner-buttons">
          <button className="button">Play</button>
          <button className="button">My list</button>
        </div>
        <h1 className="description">
          {movie ? movie.overview : ''}
        </h1>
      </div>
      <div className="fade"></div>
    </div>
  )
}

