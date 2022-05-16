import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import pdfFonts from "pdfmake/build/vfs_fonts";
import pdfMake from "pdfmake/build/pdfmake";
import Banner from "./components/Banner/Banner";
import Content from "./components/Content/Content";
import Fullscreen from "./components/Fullscreen/Fullscreen";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./styles/App.css";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/will-creator-tool">
            <header className="App-header">
              <Banner />
              <h1 id="will-generator">Will Creator</h1>
              <Content />
            </header>
          </Route>
          <Route path={["/will-creator", "/"]}>
            
              <Fullscreen />
            
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
