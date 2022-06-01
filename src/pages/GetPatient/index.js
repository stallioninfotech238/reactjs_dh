import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import intelpixel from "../../images/intelpixel.png"; // with import
import { getPatientByPhoneApi } from "../../services/api";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
let GetPatient = (props) => {
  const history = useHistory();
  const [formInput, setFormInput] = useState({
    "phone": ""
  });
  const [resMessage, setResMessage] = useState("");
  const [resType, setResType] = useState("");
  const [arrPatient, setArrPatient] = useState([]);

 
  const getPatient = (s) => {
    console.log(s);
    getPatientByPhoneApi({'phone':s}).then((res) => {
      if (res.status) {
        setArrPatient(res.data ?? []);
      }
    })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });
  }
  return (
    <div className="container-fluid getPatientPage">
      <div className="row">
        <main className="main-content col-lg-12 col-md-12 col-sm-12 p-0">
          {/* <div className="register-logo-wrap">
            <a href="#">
              <img id="main-logo" src={intelpixel} />
            </a>
          </div> */}

          <div className="main-content-container container-fluid register-wrap">
            <div className="register-head">
              <h2>Patient</h2>
            </div>

            <div className="register-box">
              <div className="register-form-wrap">
                <form>
                  <div className='row'>
                    <div className={`w-100 px-4 form-group ${formInput.phone && formInput.phone.trim() === '' ? '' : 'active'}`}>
                    <input
                        type="number"
                        className="form-control px-0 no-spin"
                        id="Phone"
                        pattern="[0-9]{10}" maxlength="10"
                        value={formInput.phone}
                        onChange={(e) => {
                          var s = e.target.value;
                          if(s.length > 10)
                          {
                            s = s.substring(0, 10);
                          }
                          if(s.length == 10)getPatient(s);
                          setFormInput({ ...formInput, phone: s });

                        }}
                      />
                      <label className={"ml-2"} htmlFor="Phone">Phone Number</label>
                     
                    </div>
                  
                  </div>
                  {arrPatient.map((e)=><h4 className="mx-2" style={{borderBottom:'1px solid #DADADA',paddingBottom:'8px',cursor:'pointer'}} onClick={()=>{
                    history.push(`/addPatient/${e._id}`);
                  }}>{e.name}</h4>)}
                  <div className="justify-content-center reg-frm-action row">
                    <button className="btn btn-primary" onClick={(e) => {
                     history.push('/addPatient');
                    }}>
                      Add Patient
                    </button>
                  </div>
                </form>
              </div>
            </div>


          </div>
        </main>
      </div>
      <Snackbar open={resMessage != ""} autoHideDuration={3000} onClose={() => {
        if (resType === 'success') {
          // history.push('/signin');
        }
        setResMessage("");
        setResType("");
      }}>
        <Alert onClose={() => {
          if (resType === 'success') {
            // history.push('/signin');
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
export default GetPatient;
