import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import intelpixel from "../../images/intelpixel.png"; // with import
import { getTestApi } from "../../services/api";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
let TestList = (props) => {
  const history = useHistory();
  const [resMessage, setResMessage] = useState("");
  const [resType, setResType] = useState("");
  const [arrTest, setArrTest] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      getTest();
    }
  }, []);

  const getTest = (s) => {
    console.log(s);
    getTestApi().then((res) => {
      if (res.status) {
        setArrTest(res.data ?? []);
      }
    })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });
  }
  return (
    <div className="container-fluid testListPage">
      <div className="row">
        <main className="main-content col-lg-12 col-md-12 col-sm-12 p-0">
          {/* <div className="register-logo-wrap">
            <a href="#">
              <img id="main-logo" src={intelpixel} />
            </a>
          </div> */}

          <div className="main-content-container container-fluid register-wrap">
            <div className="register-head">
              <h2>Select Test</h2>
            </div>

            <div className="register-box">
              <div className="register-form-wrap">
                <form>
                  {arrTest.map((e, i) => <div className="align-items-center row py-3" style={{ borderBottom: '1px solid #DADADA' }}> <input type="checkbox" id={`test${i}`} name={`test${i}`} value={e._id} style={{ width: "18px", height: "18px" }} defaultChecked={e.isCheck ?? false}
                    onChange={() => {
                      arrTest[i].isCheck = !(arrTest[i].isCheck ?? false);
                      setArrTest(arrTest);
                    }} />
                    <div className="align-items-center justify-content-between m-0 row" style={{ width: "calc(100% - 18px)" }}><h4 className="m-0 mx-2"
                    >{e.name}</h4> <div style={{ fontSize: "20px" }}>{'₹' + e.printing_cost}</div></div></div>)}
                  <div className="justify-content-center reg-frm-action row">
                    <button className="btn btn-primary" onClick={(e) => {
                      e.preventDefault();
                      var arr = arrTest.filter((e) => (e.isCheck ?? false) === true);
                      if (arr.length == 0) {
                        setResType("error");
                        setResMessage('Select some testgroup before procedding.');
                      } else {
                        history.push(`/orderSummary/${props.match.params.id}`, arr);
                      }
                      console.log(arr);
                      // signup();
                    }}>
                      Continue
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
export default TestList;
