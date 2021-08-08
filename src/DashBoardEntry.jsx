import React, { useEffect,Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link,useHistory } from "react-router-dom";

const DashBoardEntry = (props) => {
  let history = useHistory();

  useEffect(() => {
    // localStorage.setItem("user","bhtjy");
    const now = new Date()

   
    if (localStorage.getItem("user") === null) {
      history.push("/");
    }
    // else  if (now.getTime() > localStorage.getItem("expire")) {
    //   localStorage.removeItem("user");
    //   history.push("/");
    // }
    // else
    // {
    //   setTimeout(function(){localStorage.removeItem("user");window.location.reload()},localStorage.getItem("expire")-now.getTime());

    // }
  }, []);

  return(
    <Router>
      <Switch>
      {/* <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/confirmpayment">
        <ConfirmPayment />
      </Route>
      <Route exact path="/changepassword">
        <ChangePassword />
      </Route>
      <Route
        path="/members"
        render={({ match: { url } }) => (
          <Fragment>
            <Route exact path={`${url}/all`} component={Members} />
            <Route exact path={`${url}/create`} component={MemberCreate} />
            <Route exact path={`${url}/edit`} component={MemberEdit} />
            <Route exact path={`${url}/update`} component={MemberUpdate} />
          </Fragment>
        )}
      />
      <Route
        path="/loans"
        render={({ match: { url } }) => (
          <Fragment>
            <Route exact path={`${url}/all`} component={Loans} />
            <Route exact path={`${url}/transactiondetail`} component={LoanTransactionDetail} />

            <Route exact path={`${url}/close`} component={LoanClose} />
            <Route exact path={`${url}/emicalculator`} component={EmiCalculator} />
            <Route exact path={`${url}/payment`} component={LoanPayment} />
            <Route exact path={`${url}/paymentloan`} component={PaymentLoan} />
            <Route exact path={`${url}/closeloan`} component={CloseLoan} />
            <Route exact path={`${url}/new`} component={LoanNew} />
            <Route exact path={`${url}/newloan`} component={NewLoan} />
          </Fragment>
        )}
      />
      <Route
        path="/deposit"
        render={({ match: { url } }) => (
          <Fragment>
            <Route exact path={`${url}/all`} component={Deposit} />
            <Route exact path={`${url}/transactiondetail`} component={DepositTransactionDetail} />
            <Route exact path={`${url}/depositcalculator`} component={DepositCalculator} />

            <Route exact path={`${url}/recurring`} component={Recurring} />
            <Route exact path={`${url}/recurringdeposit`} component={RecurringDeposit} />
            <Route exact path={`${url}/release`} component={Release} />
            <Route exact path={`${url}/releasedeposit`} component={ReleaseDeposit} />
            <Route exact path={`${url}/new`} component={DepositNew} />
            <Route exact path={`${url}/newdeposit`} component={NewDeposit} />
          </Fragment>
        )}
      /> */}
      </Switch>
    </Router>
  ) ;
};

export default DashBoardEntry;
