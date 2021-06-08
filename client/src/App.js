import TextEditor from "./TextEditor";
import "./style.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
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
            {/* <Redirect to={`/documents/${uuidV4()}`} /> */}
            <Home />
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
          <Route path="/documents/:id">
            <TextEditor />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
