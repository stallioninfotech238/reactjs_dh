import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import intelpixel from "../../images/intelpixel.png"; // with import
import { addPatientApi, getDoctorApi, getPatientByPhoneApi, getCenterApi, getClientApi,updatePatientApi } from "../../services/api";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
let AddPatient = (props) => {
  const history = useHistory();
  const [formInput, setFormInput] = useState({
    "name": "",
    "phone": "",
    "age": "",
    "email": "",
    "address": { "location": "", "pincode": "" },
    "gender": "",
    "doctor": null,
    "client": null, "center": null,"otherDoctor":""
  });
  const [resMessage, setResMessage] = useState("");
  const [resType, setResType] = useState("");
  const [arrDoctor, setArrDoctor] = useState([]);
  const [arrClient, setArrClient] = useState([]);
  const [arrCenter, setArrCenter] = useState([]);
  var isData = false;
  useEffect(() => {
    console.log(props);
    if (localStorage.getItem('user') !== null) {
      getDoctor();
      getClient();
      getCenter();
      if (props.match.params.id !== undefined) {
        getPatientByPhoneApi({ '_id': props.match.params.id }).then((res) => {
          if (res.status && res.data && res.data[0]) {
            setFormInput({ ...res.data[0], 'age': '', 'doctor': null });
            isData = true;
          }
        })
          .catch((e) => {
            console.log("ERROR");
            console.log(e);
          });
      }
    }
  }, []);
  const getDoctor = () => {
    getDoctorApi().then((res) => {
      if (res.status) {
        setArrDoctor([...res.data ?? [],{'name':'Other','_id':'Other'}]);
      }
    })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });
  }
  const getClient = () => {
    getClientApi().then((res) => {
      if (res.status) {
        setArrClient(res.data ?? []);
      }
    })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });
  }
  const getCenter = () => {
    getCenterApi().then((res) => {
      if (res.status) {
        setArrCenter(res.data ?? []);
      }
    })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });
  }
  const add = () => {
var fi = formInput;
if(fi.doctor !== "" && fi.doctor === "Other")
{
fi.doctor = {"name":fi.otherDoctor,"_id":null} 
}
    addPatientApi({
      "patient": fi,
    })
      .then((res) => {
        console.log(res);
        if (res.status) {
          history.push(`/selectTest/${res.data._id}`);
        }
        else {
          setResType("error");
          setResMessage(res.message);
        }
      })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });
  }
  const update = () => {
    var fi = formInput;
    console.log(fi);
    if(fi.otherDoctor !== "" && fi.otherDoctor !== undefined)
    {
    fi.doctor = {"name":fi.otherDoctor,"_id":null} 
    }
    updatePatientApi({
      "patient": fi,
      '_id':props.match.params.id
    })
      .then((res) => {
        console.log(res);
        if (res.status) {
            history.push(`/selectTest/${props.match.params.id}`);
        }
        else {
          setResType("error");
          setResMessage(res.message);

        }
      })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });
  }
  return (
    <div className="container-fluid addPatientPage">
      <div className="row">
        <main className="main-content col-lg-12 col-md-12 col-sm-12 p-0">
          {/* <div className="register-logo-wrap">
            <a href="#">
              <img id="main-logo" src={intelpixel} />
            </a>
          </div> */}

          <div className="main-content-container container-fluid register-wrap">
            <div className="register-head">
              <h2>Add Patient</h2>
            </div>

            <div className="register-box">
              <div className="register-form-wrap">
                <form>
                  <div className='row'>
                    <div className={`w-50 px-4 form-group ${formInput.phone && formInput.phone.trim() === '' ? '' : 'active'}`}>
                      <input
                        type="number"
                        className="form-control px-0 no-spin"
                        id="Phone"
                        pattern="[0-9]{10}" maxlength="10"
                        value={formInput.phone}
                        onChange={(e) => {
                          var s = e.target.value;
                          if (s.length > 10) {
                            s = s.substring(0, 10);
                          }
                          setFormInput({ ...formInput, phone: s });
                        }}
                      />
                      <label className={"ml-2 row"} htmlFor="Phone">Phone Number <div style={{color:'red'}}>*</div></label>

                    </div>
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
                      <label className={"ml-2 row"} htmlFor="Name">Name<div style={{color:'red'}}>*</div></label>
                    </div>
                    {/* <div className={`w-50 px-4 form-group ${formInput.phone && formInput.phone.trim() === '' ? '' : 'active'}`}>
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
                    </div> */}
                  </div>
                  <div className='row'>
                    <div className={`w-50 px-4 form-group ${formInput.age && formInput.age.trim() === '' ? '' : 'active'}`}>
                      <input
                        type="number"
                        className="form-control px-0"
                        id="Age"
                        value={formInput.age}
                        onChange={(e) => {
                          setFormInput({ ...formInput, age: e.target.value });
                        }}
                      />
                      <label className={"ml-2 row"} htmlFor="Age">Age<div style={{color:'red'}}>*</div></label>
                    </div>
                    <div className={`w-50 px-4 form-group ${formInput.email && formInput.email.trim() === '' ? '' : 'active'}`}>
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

                    <div className={`w-50 px-4 form-group active`}>
                      <select id="Center" className="form-control p-0 mt-3" name="Center" value={formInput.center && formInput.center._id} onChange={(e) => {
                        setFormInput({ ...formInput, center:arrCenter.filter((a)=> e.target.value === a._id)[0] });
                      }}>
                        <option value="">Select Center</option>
                        {arrCenter.map((e) => {
                          return <option value={e['_id']} key={e['_id']} >{e['name']}</option>
                        })}

                      </select>
                      <label className={"ml-2 row"} htmlFor="Center">Center<div style={{color:'red'}}>*</div></label>
                    </div>
                    <div className={`w-50 px-4 form-group active`}>
                      <select id="Client" className="form-control p-0 mt-3" name="Client" value={formInput.client && formInput.client._id} onChange={(e) => {
                        setFormInput({ ...formInput, client:arrClient.filter((a)=> e.target.value === a._id)[0] });
                      }}>
                        <option value="">Select Client</option>
                        {arrClient.map((e) => {
                          return <option value={e['_id']} key={e['_id']} >{e['name']}</option>
                        })}

                      </select>
                      <label className={"ml-2"} htmlFor="Client">Client</label>
                    </div>

                  </div>
                  <div className='row'>

                    <div className={`w-50 px-4 form-group active`}>
                      <select id="Doctor" className="form-control p-0 mt-3" name="Doctor" value={formInput.doctor && formInput.doctor._id} onChange={(e) => {
                        setFormInput({ ...formInput, doctor:arrDoctor.filter((a)=> e.target.value === a._id)[0] });
                      }}>
                        <option value="">Select Doctor</option>
                        {arrDoctor.map((e) => {
                          return <option value={e['_id']} key={e['_id']} >{e['name']}</option>
                        })}

                      </select>
                      <label className={"ml-2 row"} htmlFor="Doctor">Doctor<div style={{color:'red'}}>*</div></label>
                    </div>
                   {formInput.doctor && formInput.doctor._id === "Other" && <div className={`w-50 px-4 form-group ${formInput.otherDoctor && formInput.otherDoctor.trim() === '' ? '' : 'active'}`}>
                      <input
                        type="text"
                        className="form-control px-0"
                        id="otherDoctor"
                        value={formInput.otherDoctor}
                        onChange={(e) => {
                          setFormInput({ ...formInput, otherDoctor: e.target.value });
                        }}
                      />
                      <label className={"ml-2 row"} htmlFor="otherDoctor">Doctor Name If Other</label>
                    </div>}

                  </div>
                  <div className='row mt-2'>

                  <div className={` w-50 px-4 form-group ${formInput.gender && formInput.gender.trim() === '' ? '' : 'active'}`}>
                      <input
                        type="text"
                        style={{ display: "none" }}
                        className="form-control px-0"
                        id="gen"
                        value={formInput.gender}
                        onChange={(e) => {
                          setFormInput({ ...formInput, gender: e.target.value });
                        }}
                      />
                      <label className={"ml-2 row"} htmlFor="gen">Gender<div style={{color:'red'}}>*</div></label>

                      <div className={`row mt-4 ml-3`} id="gen">

                        <div className={`row align-items-center`} style={{ width: "50%" }}>
                          <input type="radio" id="male" name="gender" value={'male'} checked={formInput.gender === 'male'} onChange={(e) => {
                            setFormInput({ ...formInput, gender: e.target.value });
                          }} />
                          <div className={"ml-2"} style={{ fontSize: "16px", fontWeight: "500" }} >Male</div>
                        </div>
                        <div className={`row align-items-center`} style={{ width: "50%" }}>
                          <input type="radio" id="female" name="gender" value={'female'} checked={formInput.gender === 'female'} onChange={(e) => {
                            setFormInput({ ...formInput, gender: e.target.value });
                          }} />
                          <div className={"ml-2"} style={{ fontSize: "16px", fontWeight: "500" }} >Female</div>
                        </div>
                      </div>


                    </div>
                    <div className={`w-50 px-4 form-group ${formInput.address && formInput.address.pincode && formInput.address.pincode === '' ? '' : 'active'}`}>
                      <input
                        type="text"
                        className="form-control px-0"
                        id="Pincode"
                        value={formInput.address && formInput.address.pincode}
                        onChange={(e) => {

                          var add = formInput.address;
                          add.pincode = e.target.value;
                          setFormInput({ ...formInput, address: add });
                        }}
                      />
                      <label className={"ml-2"} htmlFor="Pincode">Pincode</label>
                    </div>
                  </div>
                  <div className='row mt-2'>

                    <div className={`w-100 px-4 form-group ${formInput.address && formInput.address.location && formInput.address.location.trim() === '' ? '' : 'active'}`}>
                      <input
                        type="text"
                        className="form-control px-0"
                        id="Address"
                        value={formInput.address && formInput.address.location}
                        onChange={(e) => {
                          var add = formInput.address;
                          add.location = e.target.value;
                          setFormInput({ ...formInput, address: add });
                        }}
                      />
                      <label className={"ml-2"} htmlFor="Address">Address</label>
                    </div>
                  </div>
                  <div className="justify-content-center reg-frm-action row">
                    <button className="btn btn-primary" onClick={(e) => {
                      e.preventDefault();
                       (props.match.params.id !== undefined) ?update() : add();
                    }}>
                      Submit
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
export default AddPatient;
