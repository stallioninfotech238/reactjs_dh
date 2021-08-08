import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Detail from "./pages/Detail";
import Report from "./pages/Report";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Detail}></Route>
        <Route exact path="/report" component={Report}></Route>
        {/* <Route exact path="/" component={DashBoard}></Route> 
            <Route exact path="/detail" component={Detail}></Route>
            <Route exact path="/resetPassword" component={ResetPassword}></Route> 
            <Route exact path="/*" component={DashBoardEntry}></Route> */}
      </Switch>
    </Router>
  );
}

export default App;
