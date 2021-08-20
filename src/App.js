import './App.css';
import React , {useState} from 'react';
import { Container, Form, Button} from 'react-bootstrap'
import Modal from 'react-modal'
import { useEffect } from 'react';
import Movie from './Movie';
import MovieDescription from './MovieDescription';
import './styles.css';
import { Scrollbars } from "react-custom-scrollbars"
import Poll from './components/Poll'
import Queue from './Queue';
import update from 'react-addons-update';
import { Route, BrowserRouter as Router , Link, Switch} from 'react-router-dom'
import io  from "socket.io-client"
import Roulette from './Roulette'

const socket = io('http://localhost:4000');

const App = (lobbyID) => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('')
  const [currMovie, setCurrMovie] = useState('')
  const [movieInfo, setMovieInfo] = useState('')
  const [moreInfo, setMoreInfo] = useState('more-info-inactive');
  const [availablePick, setAvailablePick] = useState('dark-button-disabled');
  const [queuedMovies, setQueuedMovies] = useState([]);
  const room = lobbyID.lobbyID;
  const [joinedRoom, setJoinedRoom]= useState(false);
  
  const [pollModalIsOpen, setPollModalOpen] = useState(false);
  const [randomModalIsOpen, setRandomModalOpen] = useState(false);
  
  if (!joinedRoom) {
    socket.emit('join_room',room);
    setJoinedRoom(true);
  }

  const dequeue = (movie) => {
    socket.emit('remove movie', movie);
  }

  const enqueue = (movie1) => {
    var contains = queuedMovies.some(movie2 =>{
      return JSON.stringify(movie1) === JSON.stringify(movie2);
    });

    if (!contains) {
      socket.emit('new movie' ,movie1);
    }
  };

  socket.off('new movie').on('new movie', (movie) => {
    setQueuedMovies(queuedMovies => [...queuedMovies, movie]);
    setAvailablePick('dark-button');
  });

  socket.off('remove movie').on('remove movie', (movie) => {
    var a = [...queuedMovies];
    for (let i = 0; i < queuedMovies.length;i++) {
      if (queuedMovies[i].id === movie.id) {
        a.splice(i, 1);
        setQueuedMovies(a);
      }
    }
  });

  const chooseMovie = (movie) => {
    setCurrMovie(movie);
  };

  const displayMovie = async (movie_id) => {
      const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=efbc558df7bc1be7d809a2ad47f776ca&language=en-US`;
      const response = await fetch(url);
      const responseJson = await response.json();
      setMovieInfo(responseJson);
  }

  const getMovieRequest = async (searchValue) => {
      const url = `https://api.themoviedb.org/3/search/multi?api_key=efbc558df7bc1be7d809a2ad47f776ca&language=en-US&query=${searchValue}&page=1&include_adult=true`;
      const response = await fetch(url);
      const responseJson = await response.json();
      if(responseJson.results) {
          setMovies(responseJson.results.filter((movie) => {return movie.adult === false}));
      }
  };


  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    displayMovie(currMovie);
    if (currMovie != '') {
      setMoreInfo('more-info-active');
    }
  }, [currMovie])

  /**
     * TODO
     * -Give option for randomizer or poll
     * -allow cross computer polling
     * -create login page with socket.io
     * -add label for current lobby
     * -add the option to request a reroll, otherwise deny
     *  -add option for user alias and added by on queue
  */

  return (
    <>
      <body>
          <div id="sidebar" className="queue">
            <h1>Entries</h1>
            <button onClick={() => setPollModalOpen(true)} className={availablePick}>Create Poll</button>
            <button onClick={() => setRandomModalOpen(true)} className={availablePick}>Choose Random</button>{' '}
            <Modal isOpen={pollModalIsOpen} 
                  onRequestClose={() => setPollModalOpen(false)}
                  shouldCloseOnOverlayClick={false}
                  style={
                    {
                      overlay: {
                        backgroundColor: 'grey',
                        zIndex: 2
                      },
                    }
                  }>
              <Poll 
                props = {queuedMovies}
                members = {5}
                />
              <button className="dark-button" onClick={() => setPollModalOpen(false)}>Close</button>
              <button className="dark-button" onClick={() => setPollModalOpen(false)}>Reroll</button> 
            </Modal>
            <Modal isOpen={randomModalIsOpen} 
                  onRequestClose={() => setRandomModalOpen(false)}
                  shouldCloseOnOverlayClick={false}
                  style={
                    {
                      overlay: {
                        backgroundColor: 'grey',
                        zIndex: 2
                      },
                    }
                  }>
              <Roulette props = {queuedMovies}/>
              <button className="dark-button" onClick={() => setRandomModalOpen(false)}>Close</button>
              <button className="dark-button" onClick={() => setRandomModalOpen(false)}>Reroll</button> 
            </Modal>
            <h3>User: {socket.id != undefined ? socket.id.substring(0,5) : "none"}</h3>
            <h3>Lobby Code: {room}</h3>
            <div className="queue-list">
              <Queue props = {queuedMovies} remove = {dequeue}/>
            </div>
          </div>
          <div className="right-side">
            <Form.Control
                                type="movies"
                                placeholder="Search for Movie"
                                value={searchValue}
                                onChange={e => setSearchValue(e.target.value)}
                                className="form-inline"
                            />
              <div className="container-margins">
                <div className="grid-container" >
                    <Movie
                        movies = {movies}
                        chooseMovie = {chooseMovie}
                        />
                </div>
                <div className={moreInfo}>
                  <MovieDescription 
                    props = {movieInfo}
                    enqueue = {enqueue}
                    />
                </div>
            </div>
          </div>
      </body>
    </>
  )
}

export default App;