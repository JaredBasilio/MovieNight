import React, {useState} from 'react'
import { Route, BrowserRouter as Router , Link, Switch} from 'react-router-dom'
import { navigate } from "@reach/router"
import Login from './Login';
import App from './App';
import { Container, Form } from 'react-bootstrap'
import io  from 'socket.io-client'
import "./styles.css"

const socket = io('http://localhost:4000')
var lobbies = [];
let lobbyCode = "";

const create = () => {
    return <App lobbyID={"placeholder"}/>
}

const random = () => {
    var crypto = require("crypto");
    var id = crypto.randomBytes(4).toString('hex');
    console.log(id);
    return id;
}

export default function Select() {
    const [lobbyCode, setLobbyCode] = useState('');
    return (
        <div className="main-page">
            <Router>
                <Switch>
                    <Route exact path={"/" + lobbyCode} component={() => {
                                    return <App lobbyID = {lobbyCode}/>}}/>
                    <Route exact path={"/" + random()} component={create}/>
                    <div>
                        <h1>Join a Queue</h1>
                        <Form.Control
                                        type="movies"
                                        placeholder="Enter Code"
                                        value={lobbyCode}
                                        onChange={e => setLobbyCode(e.target.value)}
                                        className="form-inline"
                                        onKeyPress={event => {
                                            if (event.key === "Enter") {
                                                navigate("/" + lobbyCode);
                                            }}}
                                    />
                        <Link to={"/" + random()} className="dark-button">Create a Session</Link>
                    </div>
                </Switch>
            </Router>
        </div>
    )
}
