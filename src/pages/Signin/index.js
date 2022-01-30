import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import intelpixel from "../../images/intelpixel.png"; // with import
import { signinApi } from "../../services/api";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
let Signin = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [resMessage, setResMessage] = useState("");
  const [resType, setResType] = useState("");
  useEffect(() => {
    // history.push("/");
  }, []);
  const login = () => {
   
    signinApi({
      "user":{
        "username": email,
        "password" : password
}
    })
      .then((res) => {
        console.log(res);
        if (res.status) {
          localStorage.setItem('user',JSON.stringify(res.data));
          history.push('/');
        }
        else {
          setResType("error");
        }
        setResMessage(res.message);
      })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });
  }
  if(localStorage.getItem('user') != null)
  {
    history.push('/');

  }
  return (
    <div className="container-fluid signinPage">
      <div className="row">
        <main className="main-content col-lg-12 col-md-12 col-sm-12 p-0">
          {/* <div className="register-logo-wrap">
            <a href="#">
              <img id="main-logo" src={intelpixel} />
            </a>
          </div> */}

          <div className="main-content-container container-fluid register-wrap">
            <div className="register-head">
              <h2>Log In</h2>
              <p>
                Don't have an account? <a href="/signup">Sign Up</a>
              </p>
            </div>

            <div className="register-box">
              <div className="register-form-wrap">
                <form>
                <div className={`form-group ${email && email.trim() === '' ? '' : 'active'}`}>
                    <input
                      type="text"
                      className="form-control"
                      id="Email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <label htmlFor="Email">Email</label>
                  </div>
                 
                  <div className={`form-group ${password && password.trim() === '' ? '' : 'active'}`}>
                    <input
                      type="password"
                      className="form-control"
                      id="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <label htmlFor="Password">Password</label>
                  </div>

                  <div className="row box-extra-info">
                    <div className="col">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="Remember"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="Remember"
                        >
                          Remember Me
                        </label>
                      </div>
                    </div>

                    <div className="col text-right">
                      <a href="#">Forgot Password or Email?</a>
                    </div>
                  </div>

                  <div className="reg-frm-action">
                    <button  className="btn btn-primary" onClick={(e) => {
                      e.preventDefault();
                      login();
                    }}>
                      Log In
                    </button>
                  </div>
                </form>
              </div>

              {/* <div className="register-btn-wrap">
                <div className="social-icon-btn-wrap">
                  <a href="#" className="facebook-btn">
                    <i className="fab fa-facebook-f"></i> Continue with Facebook
                  </a>
                  <a href="#" className="google-btn">
                    <i className="fab fa-google"></i> Continue with Google
                  </a>
                  <a href="#" className="apple-btn">
                    <i className="fab fa-apple"></i> Continue with Apple
                  </a>
                </div>
              </div> */}
            </div>

            <div className="reg-box-note">
              <p>
                * By signing up, you agree to our{" "}
                <a href="" target="_blank">
                  Terms of Use
                </a>{" "}
                and to
                <br />
                recive wix emails & updates and acknowledge that
                <br /> you read our{" "}
                <a href="" target="_blank">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </main>
      </div>
      <Snackbar open={resMessage != ""} autoHideDuration={3000} onClose={() => {
        setResMessage("");
        setResType("");
      }}>
        <Alert onClose={() => {
          if(resType === 'success')
          {
            history.push('/signin');
          }
          setResMessage("");
          setResType("");
        }} severity={resType}>
          {resMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default Signin;
