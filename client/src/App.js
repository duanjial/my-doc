import TextEditor from "./components/TextEditor";
import "./style.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import Navbar from "./components/Navbar";
import axios from "axios";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <GlobalProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route
            path="/dashboard"
            render={(props) => <Dashboard {...props} />}
          />
          <Route path="/about">
            <About />
          </Route>
          <Route path="/documents/:id">
            <TextEditor />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
