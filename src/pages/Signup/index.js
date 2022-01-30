import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import intelpixel from "../../images/intelpixel.png"; // with import
import { signupApi, getLabApi, getRoleApi } from "../../services/api";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
let Signup = (props) => {
  const history = useHistory();
  const [formInput, setFormInput] = useState({
    "name": "",
    "phone": "",
    "username": "",
    "password": "",
    "password_again": "",
    "lab_id": "",
    "role": "",
    "email": "",
    "address": "",
    "dob": "",
    "gender": ""
  });
  const [resMessage, setResMessage] = useState("");
  const [resType, setResType] = useState("");
  const [arrRole, setArrRole] = useState([]);
  const [arrLab, setArrLab] = useState([]);

  useEffect(() => {
    getLabs();
    getRoles();
  }, []);
  const getLabs = () => {
    getLabApi().then((res) => {
      if (res.status) {
        setArrLab(res.data ?? []);
      }
    })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });

  }
  const getRoles = () => {
    getRoleApi().then((res) => {
      if (res.status) {
        setArrRole(res.data ?? []);
      }
    })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });

  }
  const signup = () => {

    if (formInput.password === '' || formInput.password_again === '' || formInput.password !== formInput.password_again) {
      setResType("error");

      setResMessage('Password does not match');
      return;
    }
    signupApi({
      "user": formInput
    })
      .then((res) => {
        console.log(res);
        if (res.status) {
          setResType("success");

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
  if (localStorage.getItem('user') != null) {
    history.push('/');

  }
  return (
    <div className="container-fluid signupPage">
      <div className="row">
        <main className="main-content col-lg-12 col-md-12 col-sm-12 p-0">
          {/* <div className="register-logo-wrap">
            <a href="#">
              <img id="main-logo" src={intelpixel} />
            </a>
          </div> */}

          <div className="main-content-container container-fluid register-wrap">
            <div className="register-head">
              <h2>Sign Up</h2>
              <p>
                Already have an account? <a href="/signin">Log In</a>
              </p>
            </div>

            <div className="register-box">
              <div className="register-form-wrap">
                <form>
                  <div className='row'>
                    <div className={`w-50 px-4 form-group ${formInput.name && formInput.name.trim() === '' ? '' : 'active'}`}>
                      <input
                        type="text"
                        className="form-control px-0"
                        id="Name"
                        value={formInput.name}
                        onChange={(e) => {
                          setFormInput({ ...formInput, name: e.target.value });
                        }}
                      />
                      <label className={"ml-2"} htmlFor="Name">Name</label>
                    </div>
                    <div className={`w-50 px-4 form-group ${formInput.phone && formInput.phone.trim() === '' ? '' : 'active'}`}>
                      <input
                        type="text"
                        className="form-control px-0"
                        id="Phone"
                        value={formInput.phone}
                        onChange={(e) => {
                          setFormInput({ ...formInput, phone: e.target.value });
                        }}
                      />
                      <label className={"ml-2"} htmlFor="Phone">Phone</label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className={`w-50 px-4 form-group ${formInput.name && formInput.name.trim() === '' ? '' : 'active'}`}>
                      <input
                        type="text"
                        className="form-control px-0"
                        id="Username"
                        value={formInput.username}
                        onChange={(e) => {
                          setFormInput({ ...formInput, username: e.target.value });
                        }}
                      />
                      <label className={"ml-2"} htmlFor="Username">Username</label>
                    </div>
                    <div className={`w-50 px-4 form-group ${formInput.phone && formInput.phone.trim() === '' ? '' : 'active'}`}>
                      <input
                        type="text"
                        className="form-control px-0"
                        id="Email"
                        value={formInput.email}
                        onChange={(e) => {
                          setFormInput({ ...formInput, email: e.target.value });
                        }}
                      />
                      <label className={"ml-2"} htmlFor="Email">Email</label>
                    </div>
                  </div>
                  <div className='row'>

                    <div className={`w-50 px-4 form-group ${formInput.phone && formInput.phone.trim() === '' ? '' : 'active'}`}>
                      <input
                        type="date"
                        className="form-control px-0"
                        id="DOB"
                        value={formInput.dob}
                        onChange={(e) => {
                          setFormInput({ ...formInput, dob: e.target.value });
                        }}
                      />
                      <label className={"ml-2"} htmlFor="DOB">DOB</label>
                    </div>
                    <div className={` w-50 px-4 form-group ${formInput.username && formInput.username.trim() === '' ? '' : 'active'}`}>
                      <input
                        type="text"
                        style={{ display: "none" }}
                        className="form-control px-0"
                        id="gen"
                        value={formInput.dob}
                        onChange={(e) => {
                          setFormInput({ ...formInput, dob: e.target.value });
                        }}
                      />
                      <label className={"ml-2"} htmlFor="gen">Gender</label>

                      <div className={`row mt-4 ml-3`} id="gen">

                        <div className={`row align-items-center`} style={{ width: "50%" }}>
                          <input type="radio" id="male" name="gender" value={'male'} onChange={(e) => {
                            setFormInput({ ...formInput, gender: e.target.value });
                          }} />
                          <div className={"ml-2"} style={{ fontSize: "16px", fontWeight: "500" }} >Male</div>
                        </div>
                        <div className={`row align-items-center`} style={{ width: "50%" }}>
                          <input type="radio" id="female" name="gender" value={'female'} onChange={(e) => {
                            setFormInput({ ...formInput, gender: e.target.value });
                          }} />
                          <div className={"ml-2"} style={{ fontSize: "16px", fontWeight: "500" }} >Female</div>
                        </div>
                      </div>


                    </div>

                  </div>
                  <div className='row'>

                    <div className={`w-100 px-4 form-group ${formInput.address && formInput.address.trim() === '' ? '' : 'active'}`}>
                      <input
                        type="text"
                        className="form-control px-0"
                        id="Address"
                        value={formInput.address}
                        onChange={(e) => {
                          setFormInput({ ...formInput, address: e.target.value });
                        }}
                      />
                      <label className={"ml-2"} htmlFor="Address">Address</label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className={`w-50 px-4 form-group ${formInput.lab_id && formInput.lab_id.trim() === '' ? '' : 'active'}`}>
                      <select id="Lab" className="form-control p-0 mt-3" name="Lab" value={formInput.lab_id} onChange={(e) => {
                        setFormInput({ ...formInput, lab_id: e.target.value });
                      }}>
                        <option value="">Select Lab</option>
                        {arrLab.map((e) => {
                          return <option value={e['_id']} key={e['_id']} >{e['name']}</option>
                        })}

                      </select>
                      <label className={"ml-2"} htmlFor="Lab">Lab</label>
                    </div>
                    <div className={`w-50 px-4 form-group ${formInput.role && formInput.role.trim() === '' ? '' : 'active'}`}>
                      
                      <select id="Role" className="form-control p-0 mt-3" name="Role" value={formInput.role} onChange={(e) => {
                        setFormInput({ ...formInput, role: e.target.value });
                      }}>
                        <option value="">Select Role</option>
                        {arrRole.map((e) => {
                          return <option value={e['_id']} key={e['_id']} >{e['name']}</option>
                        })}

                      </select>
                      <label className={"ml-2"} htmlFor="Role">Role</label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className={`w-50 px-4 form-group ${formInput.password && formInput.password.trim() === '' ? '' : 'active'}`}>
                      <input
                        type="password"
                        className="form-control px-0"
                        id="Password"
                        value={formInput.password}
                        onChange={(e) => {
                          setFormInput({ ...formInput, password: e.target.value });
                        }}
                      />
                      <label className={"ml-2"} htmlFor="Password">Password</label>
                    </div>
                    <div className={`w-50 px-4 form-group ${formInput.password_again && formInput.password_again.trim() === '' ? '' : 'active'}`}>
                      <input
                        type="password"
                        className="form-control px-0"
                        id="PasswordAgain"
                        value={formInput.password_again}
                        onChange={(e) => {
                          setFormInput({ ...formInput, password_again: e.target.value });
                        }}
                      />
                      <label className={"ml-2"} htmlFor="PasswordAgain">Confirm Password</label>
                    </div>
                  </div>
                  <div className="reg-frm-action">
                    <button className="btn btn-primary" onClick={(e) => {
                      e.preventDefault();
                      signup();
                    }}>
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>

              {/* 
              <div className="register-btn-wrap">
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
        if (resType === 'success') {
          history.push('/signin');
        }
        setResMessage("");
        setResType("");
      }}>
        <Alert onClose={() => {
          if (resType === 'success') {
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
export default Signup;
