import React, {useState} from 'react'
import { Route, BrowserRouter as Router , Link, Switch} from 'react-router-dom'
import { navigate } from "@reach/router"
import Login from './Login';
import App from './App';
import { Container, Form } from 'react-bootstrap'
import io  from 'socket.io-client'

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
        <Router>
            <Switch>
                <Route path="/" component={() => {
                                return <App lobbyID = {lobbyCode}/>}}/>
                <Route exact path={"/" + random()} component={create}/> 
                <div className="btn btn-success btn-lg">
                    <Form.Control
                                    type="movies"
                                    placeholder="Join a Session"
                                    value={lobbyCode}
                                    onChange={e => setLobbyCode(e.target.value)}
                                    className="form-inline"
                                    onKeyPress={event => {
                                        if (event.key === "Enter") {
                                            navigate("/" + lobbyCode);
                                        }}}
                                />
                    <Link to={"/" + random()}>Create a Session</Link>
                </div>
            </Switch>
        </Router>
    )
}
