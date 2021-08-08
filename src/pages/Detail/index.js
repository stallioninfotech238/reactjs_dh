import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import intelpixel from "../../images/intelpixel.png"; // with import
import xray from "../../images/xray.jpg";
import avatar from "../../images/0.jpg";
import queryString from "query-string";
import NotFound from "../../components/notFound";
import { getFiltersApi, getTransactionsApi, setEmergencyApi, setRadiologistApi, setApproverApi } from "../../services/api";
import { urlEndPoint } from "../../services/axiosInstance";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import moment from "moment";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
let Detail = (props) => {
  const id = queryString.parse(props.location.search)._id;
  const [arrRadiologist, setArrRadiologist] = useState([]);
  const [arrBodypart, setArrBodypart] = useState([]);
  const [arrModality, setArrModality] = useState([]);
  const [reload, setReload] = useState(true);
  const [arrData, setArrData] = useState([]);
  const [radiologist, setRadiologist] = useState('');
  const [bodypart, setBodypart] = useState('');
  const [modality, setModality] = useState('');
  const [pateintId, setPateintId] = useState('');
  const [pateintName, setPateintName] = useState('');
  const [studyDesc, setStudyDesc] = useState('');
  const [sDate, setSDate] = useState('');
  const [eDate, setEDate] = useState('');
  const [status, setStatus] = useState('');
  const [resMessage, setResMessage] = useState("");
  const [resType, setResType] = useState("");

  const sendMessage = () => {
    // inquireApi({
    //   inquire: {
    //     email: email,
    //     message: message
    //   }
    // })
    //   .then((res) => {
    //     console.log(res);
    //     if (res.status) {
    //       setPopup(false);
    //       setResType("success");
    //     }
    //     else {
    //       setResType("error");
    //     }
    //     setResMessage(res.message);
    //   })
    //   .catch((e) => {
    //     console.log("ERROR");
    //     console.log(e);
    //   });
  }
  useEffect(() => {
    getFilters('radiologist');
    getFilters('bodypart');
    getFilters('modality');
    getData();
  }, []);
  const getData = () => {
    var payload = {
      start_date: sDate,
      end_date: eDate,
      patient_name: pateintName,
      patient_id: pateintId,
      radiologist_id: radiologist,
      modality_id: modality,
      bodypart_id: bodypart,
      status: status
    };
    getTransactionsApi(payload).then((res) => {
      if (res.status) {
        setArrData(res.data ?? []);
      }
      else {
        setArrData([]);
      }
    })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });
  }
  const getFilters = (filter) => {
    getFiltersApi(filter).then((res) => {
      if (res.status) {
        switch (filter) {
          case 'radiologist':
            setArrRadiologist(res.data ?? []);
            break;
          case 'bodypart':
            setArrBodypart(res.data ?? []);
            break;
          case 'modality':
            setArrModality(res.data ?? []);
            break;
          default:
            break;
        }
      }
    })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });

  }
  // if (!id) return <NotFound />;
  // if (!data) return <div />;
  return (
    <div className="container-fluid listingPage">
      <div className="row">
        <main className="main-content col-lg-12 col-md-12 col-sm-12 p-0">
          <div className="main-navbar sticky-top bg-white">
            <nav className="navbar align-items-center navbar-light flex-md-nowrap p-0">
              {/* <a className="navbar-brand mr-0" href="#">
                <span className="d-table m-auto">
                  <img
                    id="main-logo"
                    className="d-inline-block align-top mr-1"
                    src={intelpixel}
                  />
                  <span className="d-none d-md-inline ml-1"></span>
                </span>
              </a> */}
              <ul className="navbar-nav all-center-dd">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-nowrap" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                    <span className="d-md-inline-block">All Centres</span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-small">
                    <a className="dropdown-item" href="#">
                      <i className="material-icons">&#xE7FD;</i> Centre 1
                    </a>
                    <a className="dropdown-item text-danger" href="#">
                      <i className="material-icons text-danger">&#xE7FD;</i> Centre 2
                    </a>
                  </div>
                </li>

              </ul>


              <form action="#" className="main-navbar__search w-100 d-none d-md-flex d-lg-flex"
              >
                <div className="input-group input-group-seamless ml-3">
                  {/* <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-search"></i>
                    </div>
                  </div>
                  <input
                    className="navbar-search form-control"
                    type="text"
                    placeholder="Search for something..."
                    aria-label="Search"
                  ></input>{" "} */}
                </div>
              </form>
              <ul className="navbar-nav border-left flex-row header-user-wrap">
                <li>
                  <div
                    className="dropdown-menu dropdown-menu-small"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <a className="dropdown-item" href="#">
                      <div className="notification__icon-wrapper">
                        <div className="notification__icon">
                          <i className="material-icons">&#xE6E1;</i>
                        </div>
                      </div>
                      <div className="notification__content">
                        <span className="notification__category">
                          Analytics
                        </span>
                        <p>
                          Your website’s active users count increased by
                          <span className="text-success text-semibold">
                            28%
                          </span>{" "}
                          in the last week. Great job!
                        </p>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#">
                      <div className="notification__icon-wrapper">
                        <div className="notification__icon">
                          <i className="material-icons">&#xE8D1;</i>
                        </div>
                      </div>
                      <div className="notification__content">
                        <span className="notification__category">Sales</span>
                        <p>
                          Last week your store’s sales count decreased by
                          <span className="text-danger text-semibold">
                            5.52%
                          </span>
                          . It could have been worse!
                        </p>
                      </div>
                    </a>
                    <a
                      className="dropdown-item notification__all text-center"
                      href="#"
                    >
                      {" "}
                      View all Notifications{" "}
                    </a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-nowrap px-3"
                    data-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      className="user-avatar rounded-circle mr-2"
                      src={avatar}
                    />
                    <span className="d-md-inline-block">Sierra Brooks</span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-small">
                    <a className="dropdown-item" href="#">
                      <i className="material-icons">&#xE7FD;</i> Profile
                    </a>

                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item text-danger" href="#">
                      <i className="material-icons text-danger">&#xE879;</i>{" "}
                      Logout{" "}
                    </a>
                  </div>
                </li>
              </ul>

              <a href="" title="Patient History" className="btn btn-primary btn-history" data-toggle="modal" data-target="#PatientHistoryModal">Patient History</a>

            </nav>
          </div>

          <div className="main-content-container container-fluid px-4">


            <div className="row mb-30 mt-30">
              <div className="col">
                <div className="card listing-form-wrap">
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Patient ID" aria-label="PatientID" value={pateintId} onChange={(e) => {
                                  setPateintId(e.target.value);
                                }}></input>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Patient Name" aria-label="PatientName" value={pateintName} onChange={(e) => {
                                  setPateintName(e.target.value);
                                }}></input>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Study Description" aria-label="StudyDescription" value={studyDesc} onChange={(e) => {
                                  setStudyDesc(e.target.value);
                                }}></input>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <select className="form-control" onChange={(e) => setRadiologist(e.target.value)}
                                  value={radiologist}
                                >
                                  <option value="">Radiologist</option>
                                  {arrRadiologist.map((e) => {
                                    return <option value={e['_id']}>{e['name']}</option>
                                  })}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">

                                <select className="form-control" onChange={(e) => setModality(e.target.value)}
                                  value={modality}
                                >
                                  <option value="">Modality</option>
                                  {arrModality.map((e) => {
                                    return <option value={e['_id']}>{e['name']}</option>
                                  })}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <select className="form-control" onChange={(e) => setBodypart(e.target.value)}
                                  value={bodypart}
                                >
                                  <option value="">Bodypart</option>
                                  {arrBodypart.map((e) => {
                                    return <option value={e['_id']}>{e['name']}</option>
                                  })}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="row">
                            <div className="col">
                              <div className="form-group button-broup">
                                <label>Date Range</label>
                                <button type="button" className="btn btn-sm btn-outline-primary mb-2" onClick={() => {
                                  const today = moment().format("YYYY-MM-DD");
                                  setSDate(today);
                                  setEDate(today);
                                }}>TODAY</button>
                                <button type="button" className="btn btn-sm btn-outline-primary mb-2" onClick={() => {
                                  const yesterday = moment().subtract(1, 'days').format("YYYY-MM-DD");

                                  setSDate(yesterday);
                                  setEDate(yesterday);
                                }}>YESTERDAY</button>
                                <button type="button" className="btn btn-sm btn-outline-primary mb-2" onClick={() => {
                                  const today = moment().startOf('isoWeek').format("YYYY-MM-DD");
                                  const yesterday = moment().endOf('isoWeek').format("YYYY-MM-DD");

                                  setSDate(today);
                                  setEDate(yesterday);
                                }}>THIS WEEK</button>
                                <button type="button" className="btn btn-sm btn-outline-primary mb-2" onClick={() => {
                                  const today = moment().startOf('month').format("YYYY-MM-DD");
                                  const yesterday = moment().endOf('month').format("YYYY-MM-DD");

                                  setSDate(today);
                                  setEDate(yesterday);
                                }}>THIS MONTH</button>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <input type="date" className="form-control" name="start_date" value={sDate} onChange={(e) => {
                                  console.log(e.target.value);
                                  setSDate(e.target.value);
                                }}></input>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <input type="date" className="form-control" name="end_date" value={eDate} onChange={(e) => {
                                  setEDate(e.target.value);
                                }}></input>
                              </div>
                            </div>
                          </div>



                          <div className="row">
                            <div className="col">
                              <div className="form-group button-broup">
                                <label>Status</label>
                                <button type="button" className={`btn mb-2 btn-sm ${status === 'all' ? 'btn-accent' : 'btn-outline-primary'}`} onClick={() => { setStatus('all'); }}>ALL</button>
                                <button type="button" className={`btn mb-2 btn-sm ${status === 'read' ? 'btn-accent' : 'btn-outline-primary'}`} onClick={() => { setStatus('read'); }}>READ</button>
                                <button type="button" className={`btn mb-2 btn-sm ${status === 'unread' ? 'btn-accent' : 'btn-outline-primary'}`} onClick={() => { setStatus('unread'); }}>UNREAD</button>
                                <button type="button" className={`btn mb-2 btn-sm ${status === 'report_uploaded' ? 'btn-accent' : 'btn-outline-primary'}`} onClick={() => { setStatus('report_uploaded'); }}>REPORT UPLOADED</button>
                                <button type="button" className={`btn mb-2 btn-sm ${status === 'approved' ? 'btn-accent' : 'btn-outline-primary'}`} onClick={() => { setStatus('approved'); }}>APPROVED</button>
                                <button type="button" className={`btn mb-2 btn-sm ${status === 'emergency' ? 'btn-accent' : 'btn-outline-primary'}`} onClick={() => { setStatus('emergency'); }}>EMERGENCY</button>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="row">
                        <div className="col-md-12 form-btn-wrap text-center">
                          <button type="button" className="btn btn-primary" onClick={() => {
                            getData();
                          }}>Submit</button>
                          <button type="button" className="btn btn-secondary" onClick={() => {
                            getData();
                          }}>Reset</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="card mb-30 listing-table-wrap">

                  <div className="card-body p-0 text-center">
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <thead className="bg-light">
                          <tr>
                            <th>#</th>
                            <th>Patient ID</th>
                            <th>Patient Name</th>
                            <th>Patient Age</th>
                            <th>Patient Gender</th>
                            <th>Emergency</th>
                            <th>History</th>
                            <th>Modality</th>
                            <th>Organ</th>
                            <th>Image</th>
                            <th>Assign Radiologist</th>
                            <th>Assign Approver</th>
                            <th>Report</th>
                            <th>Report Status</th>
                            <th>Report Issue</th>
                            <th>Scan Time</th>
                            <th>Upload Time</th>
                            <th>Assignment Time</th>
                            <th>TAT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {arrData.map((ele, i) => {

                            return <tr>
                              <td>{i}</td>
                              <td>{ele.patient && ele.patient._id}</td>
                              <td>{ele.patient && ele.patient.name}</td>
                              <td>{ele.patient && ele.patient.age}</td>
                              <td>{ele.patient && ele.patient.gender}</td>

                              <td>
                                <div className="custom-control custom-toggle custom-toggle-sm mb-1">
                                  <input type="checkbox" id={`emergency${i}`} name={`emergency${i}`} className="custom-control-input" checked={ele.emergency} onChange={() => {
                                    setEmergencyApi({
                                      "transaction": {
                                        "_id": arrData[i]._id,
                                        "emergency": !arrData[i].emergency
                                      }
                                    });
                                    var arr = arrData;
                                    arr[i].emergency = !arr[i].emergency;

                                    setArrData(arr);
                                    setTimeout(function () {
                                      setReload(!reload);

                                    }, 50);
                                  }}></input>
                                  <label className="custom-control-label" htmlFor={`emergency${i}`}></label>
                                </div>
                              </td>
                              <td>{ele.history && ele.history.length > 0 && ele.history[0].content}<br></br> <a className="nav-link" href="upload_pop_up.html"><i className="fas fa-edit"></i></a></td>
                              <td>{ele.modality && ele.modality.name}</td>
                              <td>{ele.bodypart && ele.bodypart.name}</td>
                              <td className="text-nowrap">{`${ele.image_count && ele.image_count.uploaded}/${ele.image_count && ele.image_count.total}`} <i className="fas fa-download"></i></td>
                              <td>
                                <div className="form-group">
                                  <select id="inputState" className="form-control" onChange={(e) => {
                                    arrRadiologist.forEach((e1) => {
                                      if (e1['_id'] === e.target.value) {
                                        setRadiologistApi({
                                          "transaction": {
                                            "_id": ele._id,
                                            "radiologist": {
                                              "_id": e1._id,
                                              "name": e1.name
                                            }
                                          }
                                        });
                                        var arr = arrData;
                                        arr[i].radiologist = e1;
    
                                        setArrData(arr);
                                        setTimeout(function () {
                                          setReload(!reload);
    
                                        }, 50);
                                      }
                                    });

                                  }}
                                    value={getV(ele.radiologist)}>
                                    <option value="">Choose...</option>
                                    {arrRadiologist.map((e) => {
                                      return <option value={e['_id']}>{e['name']}</option>
                                    })}
                                  </select>
                                </div>
                              </td>

                              <td>
                                <div className="form-group">
                                  <select id="inputState" className="form-control" onChange={(e) => {
arrRadiologist.forEach((e1) => {
  if (e1['_id'] === e.target.value) {
    setApproverApi({
      "transaction": {
        "_id": ele._id,
        "radiologist_approver": {
          "_id": e1._id,
          "name": e1.name
        }
      }
    });
    var arr = arrData;
    arr[i].radiologist_approver = e1;

    setArrData(arr);
    setTimeout(function () {
      setReload(!reload);

    }, 50);
  }
});
                                  }}
                                    value={getV(ele.radiologist_approver)}>
                                    <option value="">Choose...</option>
                                    {arrRadiologist.map((e) => {
                                      return <option value={e['_id']}>{e['name']}</option>
                                    })}
                                  </select>
                                </div>
                              </td>

                              <td className="text-nowrap"> <img src={"https://img.icons8.com/nolan/24/doctors-bag.png"} /> <img src={"https://img.icons8.com/nolan/24/doctors-bag.png"} /> </td>
                              <td>{ele.report_status}</td>
                              <td><i className="fas fa-bell"></i></td>
                              <td className="text-nowrap">10:45 AM</td>
                              <td className="text-nowrap">12:45 PM</td>
                              <td className="text-nowrap">12:48 PM</td>
                              <td>Pending</td>
                            </tr>

                          })
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-30">
              <div className="col listing-pagination">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item active"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          <div className="modal fade" id="PatientHistoryModal" tabindex="-1" role="dialog" aria-labelledby="PatientHistoryLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="PatientHistoryLabel">Patient History</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div className="modal-body">
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="feFirstName">First Name</label>
                        <input type="text" className="form-control" id="feFirstName" placeholder="First Name" /> </div>
                      <div className="form-group col-md-6">
                        <label for="feLastName">Last Name</label>
                        <input type="text" className="form-control" id="feLastName" placeholder="Last Name" /> </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="feAge">Age</label>
                        <input type="number" className="form-control" id="feAge" placeholder="Age" /> </div>
                      <div className="form-group col-md-6">
                        <label for="feGender">Gender</label>
                        <input type="text" className="form-control" id="feGender" placeholder="Gender" />  </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12 mb-0">
                        <label for="feDescription">History <i className="fas fa-plus-square"></i></label>
                        <textarea className="form-control" name="feDescription" rows="7" placeholder="Type somthing here..."></textarea>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="modal-footer justify-content-center">
                  <button type="submit" className="btn btn-primary">Update History</button>
                </div>
              </div>
            </div>
          </div>

          <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Legal
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Terms of Service
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Privacy Policy
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  GDPR Policy
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
            <span className="copyright ml-auto my-auto mr-2">
              Copyright © 2018
              <a href="#" rel="nofollow">
                DesignRevision
              </a>
            </span>
          </footer>
        </main>
      </div>

      <Snackbar open={resMessage != ""} autoHideDuration={3000} onClose={() => {
        setResMessage("");
        setResType("");
      }}>
        <Alert onClose={() => {
          setResMessage("");
          setResType("");
        }} severity={resType}>
          {resMessage}
        </Alert>
      </Snackbar>
    </div>

  );
};
const getV = (ele) => {
  return ele._id;
}
export default Detail;
