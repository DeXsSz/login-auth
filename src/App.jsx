import React, { useEffect, useState } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Navbar from './components/Navbar';
import Login from './components/Login';
import Admin from './components/Admin';
import {auth} from './firebase'
function App() {
    const [firebaseUser, setFirebaseUser] = useState(false);
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                console.log('Se cargo el user');
                setFirebaseUser(user)
            }else{
                console.log('No se puedo cargar el usuario');
                setFirebaseUser(null)
            }
        })
    },[])
    return firebaseUser !== false?(
        <BrowserRouter>
        <div className="container">
            <Navbar firebaseUser={firebaseUser}/>
            <Switch>
                <Route path="/" exact>Home</Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/admin">
                    <Admin/>
                </Route>
            </Switch>
        </div>
        </BrowserRouter>
    ): (<p>Loading...</p>);
}

export default App;
