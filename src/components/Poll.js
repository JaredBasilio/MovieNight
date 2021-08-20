import React, {useState, useEffect} from 'react'
import Countdown from 'react-countdown'
import "./Poll.css"
import Options from "./Options.js"

const Poll = (props)=> {
    const movies = props.props;
    return (
        <>
            <div className="main">
                <h1>Select a Movie</h1>
                <div className="options">
                    {movies.map((movie) => (
                        <Options
                            props={movie}
                            count = {props.members}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Poll;