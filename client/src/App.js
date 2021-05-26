import TextEditor from "./TextEditor";
import "./style.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {/* <Redirect to={`/documents/${uuidV4()}`} /> */}
          <Home />
        </Route>
        <Route path="/documents/:id">
          <TextEditor />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
