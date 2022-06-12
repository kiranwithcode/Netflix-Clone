import React, { useState, useEffect } from 'react'
import axios from './axios'
import './Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'

const base_Url = "https://image.tmdb.org/t/p/original/"
const Row = ({title, fetchUrl, isLargeRow}) => {
    const [movies, setMovies] = useState([])
    const [trailerUrl, settrailerUrl] = useState("")

  
    // A snippet of code which runs based on a specific condition/variable

    useEffect(()=>{
        // if [] run onces the row loads, and don't run again
        async function fetchData(){
            const request = await axios.get(fetchUrl)
            // console.log(request.data.results);
            setMovies(request.data.results)
            return request
           // https://api.themoviedb.org/3/discover/tv?api_key=a760fa3892f3aaffc15730596b5f628b&with_networks=213
        }
        fetchData()
    },[fetchUrl])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }

    const handleClick = (movie) =>{
        if(trailerUrl){
            settrailerUrl('')
        }else{
            movieTrailer(movie?.name || "")
            .then(url =>{
                const urlParams = new URLSearchParams( new URL(url).search);
                settrailerUrl(urlParams.get('v'))
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
  
    // console.log(movies);
  return (
    <div className='row'>
        <h2 className='row__title'>{title}</h2>
        <div className="row__posters">
            {/* several row posters */}
            {movies.map(movie =>{
                return <img key={movie.id} onClick={()=> handleClick(movie)} className={`row__poster ${isLargeRow && "row__posterLarge" }`} src={`${base_Url}${ isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.title} />
            })}

        </div>
       {trailerUrl &&  <YouTube videoId={trailerUrl} opts={opts}/> }
        
    </div>
  )
}

export default Row