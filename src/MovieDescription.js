import React from 'react';
import "./styles.css";
import {Button} from 'react-bootstrap';

const IMG_API = 'https://image.tmdb.org/t/p/w500/' //w500 means the size of the image

const genre = 'https://api.themoviedb.org/3/genre/movie/list?api_key=efbc558df7bc1be7d809a2ad47f776ca&language=en-US';

const MovieDescription = (props) => {
    function image(movie) {
        return movie.poster_path != undefined && movie.poster_path != null ? IMG_API + movie.poster_path : "https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/500x735.png";
    }

    function name(movie) {
        return movie.name ? movie.name : movie.title;
    }

    function dateToSeason(date) {
        if (!date) return
        const month = date.substring(5,7);
        var season = "";
        if (month >= 9 && month <= 11) {
            season = "Fall";
        } else if (month >= 12 && month <= 2) {
            season = "Winter";
        } else if (month >= 3 && month <= 5) {
            season = "Spring";
        } else if (month >= 6 && month <= 8) {
            season = "Summer";
        }
        return season + " " + date.substring(0, 4);
    }

    return (
        <>
            <div className="card">
                <img src={image(props.props)} alt=""></img>
                <div>
                    <h1>{name(props.props)}</h1>
                    <p>{dateToSeason(props.props.release_date)}</p>
                    <p>{props.props.overview}</p>
                    <button onClick={() => props.enqueue(props.props)} className="dark-button">Add to Queue</button>
                </div>
            </div>
        </>
    )
}

export default MovieDescription;