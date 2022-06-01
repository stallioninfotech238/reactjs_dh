import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Detail from "./pages/Detail";
import Report from "./pages/Report";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AddPatient from "./pages/AddPatient";
import TestList from "./pages/TestList";
import OrderSummary from "./pages/OrderSummary";
import GetPatient from "./pages/GetPatient";
import NotFound from "./components/notFound";
import { useHistory } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={Detail}></Route> */}
        {/* <Route exact path="/report/:id" component={Report}></Route> */}
        <Route exact path="/signin" component={Signin}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        {/* <Route exact path="/addPatient" component={AddPatient}></Route> */}
        <Route exact path="/*" component={Auth}></Route>
      </Switch>
    </Router>
  );
}
function Auth() {
  const history = useHistory();

  if (localStorage.getItem('user') == null) {
    history.push('/signin');
    return <div></div>

  }
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Detail}></Route>
        <Route exact path="/report/:id" component={Report}></Route>
        {/* <Route exact path="/signin" component={Signin}></Route>
        <Route exact path="/signup" component={Signup}></Route> */}
        <Route exact path="/addPatient/:id?" component={AddPatient}></Route>
        <Route exact path="/selectTest/:id" component={TestList}></Route>
        <Route exact path="/orderSummary/:id" component={OrderSummary}></Route>
        <Route exact path="/patient" component={GetPatient}></Route>
        <Route exact path="/*" component={NotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
