import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Detail from "./pages/Detail";
import Report from "./pages/Report";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Detail}></Route>
        <Route exact path="/report" component={Report}></Route>
       <Route exact path="/signin" component={Signin}></Route> 
              <Route exact path="/signup" component={Signup}></Route>
           {/* <Route exact path="/resetPassword" component={ResetPassword}></Route> 
            <Route exact path="/*" component={DashBoardEntry}></Route> */}
      </Switch>
    </Router>
  );
}

export default App;
