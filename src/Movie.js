import React from 'react';
import "./styles.css";

const IMG_API = 'https://image.tmdb.org/t/p/w500/' //w500 means the size of the image

const Movie = (props) => {
    function name(movie) {
        return movie.name ? movie.name : movie.title;
    }
    function image(movie) {
        return movie.poster_path !== undefined && movie.poster_path != null ? IMG_API + movie.poster_path : "https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/500x735.png";
    }
    function rating(movie) {
        return movie.vote_average ? movie.vote_average : '?';
    }
    return (
        <>
            {props.movies.map((movie) => (
                <div className="grid-item">
                    <div className="rating">{rating(movie)}</div>
                    <img src={image(movie)} alt="" 
                    className="poster" onClick={() => props.chooseMovie(movie.id)}
                    style={{cursor: "pointer"}}></img>
                    <h1>{name(movie)}</h1>
                </div>
            ))}
        </>
    )
}

export default Movie;