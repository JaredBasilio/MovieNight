import React, {Component} from 'react'
import './styles.css'

const IMG_API = 'https://image.tmdb.org/t/p/w500' //w500 means the size of the image

export default function Roulette(props) {
    const movies = props.props;
    const winner = movies[Math.floor(Math.random()*movies.length)];

    console.log(name(winner));

    function name(movie) {
        return movie.name ? movie.name : movie.title;
    }

    function image(movie) {
        return movie.poster_path !== undefined && movie.poster_path != null 
        ? IMG_API + movie.poster_path : "https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/500x735.png";
    }

    return (
        <div className="wheel">
            
        </div>
    )
}
