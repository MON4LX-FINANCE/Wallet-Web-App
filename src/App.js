// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import SignIn from './pages/signin';
import Dash from './pages/dash';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/dash" component={Dash} />
          <Route path="/" component={SignIn} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;