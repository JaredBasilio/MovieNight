import React, {useState} from 'react'
import { Container, Form } from 'react-bootstrap'
import { Route, BrowserRouter as Router , Link, Switch} from 'react-router-dom'
import App from './App'

const poll = (id) => {
    return <App 
        lobbyID = {id}
    />
}

export default function Login() {
    const [lobbyCode, setLobbyCode] = useState('');
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/poll" component={() => {
                                return <App lobbyID = {lobbyCode}/>}}/>
                    <div className="btn btn-success btn-lg">
                        <Form.Control
                                type="movies"
                                placeholder="Join a Session"
                                value={lobbyCode}
                                onChange={e => setLobbyCode(e.target.value)}
                                className="form-inline"
                            />
                        <Link to="/poll">Join Session</Link>
                    </div>
                </Switch>
            </Router>
        </div>
    )
}
