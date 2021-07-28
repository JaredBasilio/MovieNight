import React from 'react'
import "./styles.css";

const IMG_API = 'https://image.tmdb.org/t/p/w500/'

const Queue = (props) => {
    function image(movie) {
        return movie.poster_path != undefined && movie.poster_path != null ? IMG_API + movie.poster_path : "https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/500x735.png";
    }
    return (
        <> 
            {props.props.map((movie) => (
                <div class="list-item">
                    <img src={image(movie)} alt=""></img>
                    <div className="list-item-info">
                        <h5>{movie.title}</h5>
                    </div>
                    <button className="remove-button" onClick={() => props.remove(movie)}>✖</button>
                </div>
            ))} 
        </>
    )
}

export default Queue;