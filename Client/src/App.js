import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ProtectedRoute from "./Components/protectedRoute";

import Header from './Components/Header/Header'
import SignUp from './Pages/Login'
import Demo from './Pages/demo'
const App=()=>{
 
        return (
            <BrowserRouter>
            <div className="app">
                <Switch>
                    <Route path="/" component={SignUp} exact/>
                    <ProtectedRoute exact path="/demo" component={Demo} />
                </Switch>
            </div>
            </BrowserRouter>
        )
    
}

export default App