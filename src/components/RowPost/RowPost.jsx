import { useEffect, useState } from "react"
import Youtube from 'react-youtube'
import axios from '../../axios'
import { API_KEY, imageUrl } from "../../constants/constants"
import "./RowPost.css"
export default function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId, setUrlId] = useState('')
  useEffect(() => {
    axios.get(props.url).then(response => {
      setMovies(response.data.results);
    }).catch(err => {
      console.log(err);

    })

  }, [])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1
    }
  }
  const handleMovie = (id) => {
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        const trailers = response.data.results.filter(video => video.type === 'Trailer')
        if (response.data.results.length !== 0 && trailers.length !== 0) {
          setUrlId(trailers[0])
        } else {
          console.log('No trailers found');
        }
      })
  }
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj, index) =>
          <img key={index} onClick={() => { handleMovie(obj.id) }} className={props.isSmall ? 'poster-sm' : 'poster-lg'} src={`${imageUrl + obj.backdrop_path}`} alt="poster" />
        )}
      </div>
      {urlId && <Youtube videoId={urlId.key} opts={opts} />}
    </div>
  )
}


