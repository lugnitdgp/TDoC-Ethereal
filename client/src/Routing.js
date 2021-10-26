import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom';

import CreateAccount from './components/CreateAccount/CreateAccount';
import Displayccounts from './components/DisplayAccounts/DisplayAccounts';
import MainSection from './components/MainSection/MainSection';

const Routing = () => {
    return (
        <div>
            <Router>
                <Route exact path="/">
                    <MainSection/>
                </Route>
                <Route exact path="/create">
                    <CreateAccount/>
                </Route>
                <Route exact path="/accounts">
                    <Displayccounts/>
                </Route>
                {/* <Route exact path="/accounts/:id">
                    <Displayccounts/>
                </Route> */}
            </Router>
            
        </div>
    )
}

export default Routing
