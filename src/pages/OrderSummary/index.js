import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import intelpixel from "../../images/intelpixel.png"; // with import
import { couponcodesValidateApi, addTransactionApi, getPatientByPhoneApi, getCenterApi, getClientApi, updatePatientApi } from "../../services/api";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
let OrderSummary = (props) => {
  const history = useHistory();
  const [formInput, setFormInput] = useState({
    "coupon": "",
    "paidAmount": ""
  });
  const [resMessage, setResMessage] = useState("");
  const [resType, setResType] = useState("");
  const [patient, setPatient] = useState(null);
  useEffect(() => {
    console.log(props);

    if (localStorage.getItem('user') !== null) {
      if (props.location.state === undefined) {
        history.push(`/selectTest/${props.match.params.id}`);
      }
      if (props.match.params.id !== undefined) {
        getPatientByPhoneApi({ '_id': props.match.params.id }).then((res) => {
          if (res.status && res.data && res.data[0]) {
            setPatient(res.data[0]);
          }
        })
          .catch((e) => {
            console.log("ERROR");
            console.log(e);
          });
      }
    }
  }, []);
  const add = () => {

    addTransactionApi({
      "transaction": {
        client_id: patient.client,
        center_id: patient.center,
        lab_id:patient.center.lab_id,
        report_ids: [],
        doctor: patient.doctor,
        booking_timestamp: Date(),
        user: {
          _id: localStorage.getItem('user')._id, //user id
          role: localStorage.getItem('user').role
        },
        patient_id: patient._id,
        patient_age: patient.age,
        diagnostics: {
          _id: patient._id,
          name: patient.name,
          testgroups: props.location.state.map((e) => {
            return {
              _id: e._id,
              name: e.name,
              price: {
                mrp: e.printing_cost
              }
            }
          }),
          price: {
            paid: [{
              amount: formInput.paidAmount,
              user_id: localStorage.getItem('user')._id
            }],
            mrp: props.location.state.reduce((n, { printing_cost }) => n + printing_cost, 0),

          }
        },
        appointment_time: Date(),

        coupon_id: formInput.coupon,
        patient: patient,
        transaction_patient_id: patient._id,
        uploaded_by_user: {
          _id: localStorage.getItem('user')._id, //user id
          role: localStorage.getItem('user').role
        },
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status) {
          history.push('/');
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
  const verifyCode = () => {

    couponcodesValidateApi({
      "coupon":  formInput.coupon,
      "testgroups": [],
      "total_price":props.location.state.reduce((n, { printing_cost }) => n + printing_cost, 0),
      "patient_id":patient._id
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
  if (patient === null)
    return (<div></div>);
  return (
    <div className="container-fluid orderSummaryPage">
      <div className="row">
        <main className="main-content col-lg-12 col-md-12 col-sm-12 p-0">
          {/* <div className="register-logo-wrap">
            <a href="#">
              <img id="main-logo" src={intelpixel} />
            </a>
          </div> */}

          <div className="main-content-container container-fluid register-wrap">
            <div className="register-head">
              <h2>Order Summary</h2>
            </div>

            <div className="register-box">
              <div className="register-form-wrap">
                <form>
                  <h3>Patient Summary</h3>
                  <div className="row m-0">
                    <div className="w-50" style={{ fontSize: "20px" }}>{patient.name}</div>
                    <div className="w-50" style={{ fontSize: "20px" }}>{patient.age}</div>
                  </div>
                  <div className="row m-0 mt-2">
                    <div className="w-50" style={{ fontSize: "20px" }}>{patient.phone}</div>
                    <div className="w-50" style={{ fontSize: "20px" }}>{patient.gender.toUpperCase()}</div>
                  </div>
                  <h3 className="mt-5">Test Summary</h3>
                  <div className="row m-0">
                    <div className="w-50" style={{ fontSize: "20px" }}>LAB NAME</div>
                    <div className="w-50" style={{ fontSize: "20px" }}>{patient.center && patient.center.name}</div>
                  </div>
                  <div className="row m-0 mt-2">
                    <div className="w-50" style={{ fontSize: "20px" }}>YOUR TESTS</div>
                    <div className="w-50" style={{ fontSize: "20px" }}>{props.location.state.map((e, i) => <div>{i + 1 + `. ${e.name}`}</div>)}</div>
                  </div>
                  <div className="row m-0 mt-2">
                    <div className="w-50" style={{ fontSize: "20px" }}>MRP</div>
                    <div className="w-50" style={{ fontSize: "20px" }}>{'₹ ' + props.location.state.reduce((n, { printing_cost }) => n + printing_cost, 0)}</div>
                  </div>
                  <div className="row m-0 mt-2">
                    <div className="w-50" style={{ fontSize: "20px" }}>PAYABLE VALUE</div>
                    <div className="w-50" style={{ fontSize: "20px" }}>{'₹ ' + props.location.state.reduce((n, { printing_cost }) => n + printing_cost, 0)}</div>
                  </div>
                  <div className="row m-0 mt-2">
                    <div className="w-50">
                      <button className="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        if (formInput.coupon.trim() === '') {
                          setResType("error");
                          setResMessage('Please enter Coupon.');
                        } else {
                          verifyCode();
                        }
                      }}>
                        APPLY
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control px-0 w-50"
                      id="Coupon"
                      placeholder="COUPON CODE"
                      value={formInput.coupon}
                      onChange={(e) => {
                        setFormInput({ ...formInput, coupon: e.target.value });
                      }}
                    />
                  </div>
                  <div className="row m-0 mt-2">
                    <div className="w-50" style={{ fontSize: "20px" }}>PAID AMOUNT</div>
                    <input
                      type="number"
                      className="form-control px-0 w-50"
                      id="PaidAmount"
                      placeholder="PAID VALUE"
                      value={formInput.paidAmount}
                      onChange={(e) => {
                        setFormInput({ ...formInput, paidAmount: e.target.value });

                      }}
                    />
                  </div>
                  <div className="justify-content-center reg-frm-action row mt-5">
                    <button className="btn btn-primary" onClick={(e) => {
                      e.preventDefault();
                      if (formInput.paidAmount.trim() === '') {
                        setResType("error");
                        setResMessage('Please enter Paid Amount.');
                      } else {
                        add();
                        // history.push('/');
                      }
                    }}>
                      BOOK NOW
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
export default OrderSummary;
