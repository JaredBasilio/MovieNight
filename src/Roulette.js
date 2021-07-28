import React, {Component} from 'react'
import './styles.css'

const IMG_API = 'https://image.tmdb.org/t/p/w500' //w500 means the size of the image

export default function Roulette(props) {
    const movies = props.props;
    
    function image(movie) {
        return movie.poster_path !== undefined && movie.poster_path != null 
        ? IMG_API + movie.poster_path : "https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/500x735.png";
    }
    return (
        <div className="carousel">
            {movies.map((movie) => (
                <img src={image(movie)} alt=""></img>
            ))}
        </div>
    )
}
