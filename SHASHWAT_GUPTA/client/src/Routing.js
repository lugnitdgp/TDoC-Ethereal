import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import CreateAccount from './components/CreateAccount'

const Routing = () => {
    return (
      <div>
        <Router>
          <Route exact path="/create">
            <CreateAccount />
          </Route>
          </Router>
      </div>
    );
}

export default Routing