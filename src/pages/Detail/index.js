import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import intelpixel from "../../images/intelpixel.png"; // with import
import xray from "../../images/xray.jpg";
import avatar from "../../images/0.png";
import queryString from "query-string";
import NotFound from "../../components/notFound";
import { getFiltersApi,getTestApi, getTransactionsApi, setEmergencyApi, setRadiologistApi, setApproverApi, addHistoryApi, updateHistoryApi, getCenterByIdApi } from "../../services/api";
import { urlEndPoint } from "../../services/axiosInstance";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import moment from "moment";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
let Detail = (props) => {
  const history = useHistory();

  const id = queryString.parse(props.location.search)._id;
  const [arrRadiologist, setArrRadiologist] = useState([]);
  const [arrTestGroup, setArrTestGroup] = useState([]);
  const [arrCategory, setArrCategory] = useState([]);
  const [reload, setReload] = useState(true);
  const [arrData, setArrData] = useState([]);
  const [testGroup, setTestGroup] = useState('');
  const [category, setCategory] = useState('');
  const [pateintId, setPateintId] = useState('');
  const [pateintName, setPateintName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [sDate, setSDate] = useState('');
  const [eDate, setEDate] = useState('');
  const [status, setStatus] = useState('');
  const [resMessage, setResMessage] = useState("");
  const [resType, setResType] = useState("");
  const [addHistory, setAddHistory] = useState({});
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState('');
  const [arrCenter, setArrCenter] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState({ "name": "All Centers", "_id": "0" });
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
    if (localStorage.getItem('user') != null) {
      getFilters('radiologist');
      getData();
      getCenter();
      getTest();
    }
  }, []);

  const getCenter = () => {
    var arr1 = JSON.parse(localStorage.getItem('user'))['center_id'];
    getCenterByIdApi({ "center_id": arr1 }).then((res) => {
      if (res.status) {
        var a = res.data ?? [];
        a = [{ "name": "All Centers", "_id": "0" }, ...a];
        setArrCenter(a);
      }
    })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
      });

  }
  const getData = () => {
    var payload = {
      start_date: sDate,
      end_date: eDate,
      patient_name: pateintName,
      patient_id: pateintId,
      category_id: category,
      testGroup_id: testGroup,
      status: status,
      patient_phone:mobileNo
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

  const getTest = () => {
    getTestApi().then((res) => {
      if (res.status) {
        setArrTestGroup(res.data ?? []);
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
  const addHistoryCall = () => {
    addHistoryApi({
      'transactions': {
        'patient': {
          'name': addHistory['ahFirstName'] + ' ' + addHistory['ahLastName'],
          'gender': addHistory['ahGender'],
          'age': addHistory['ahAge']
        },
        'history': (addHistory['ahHistory'] ?? []).map((e) => {
          return { 'content': e }
        })
      }
    }).then((res) => {
      setLoading(false);
      if (res.status) {
        setOpenPopup('');
        setResType("success");
      }
      else {
        setResType("error");
      }
      setResMessage(res.message);
    })
      .catch((e) => {
        setResType("error");
        setLoading(false);
        setResMessage(`${e}`);
        console.log("ERROR");
        console.log(e);
      });

  }
  const updateHistoryCall = () => {
    updateHistoryApi({
      'transaction': {
        '_id': addHistory['_id'],
        'patient': {
          'name': addHistory['ahFirstName'] + ' ' + addHistory['ahLastName'],
          'gender': addHistory['ahGender'],
          'age': addHistory['ahAge']
        },
        'history': (addHistory['ahHistory'] ?? []).map((e) => {
          return { 'content': e }
        })
      }
    }).then((res) => {
      setLoading(false);
      if (res.code === 200) {
        setOpenPopup('');
        setResType("success");
      }
      else {
        setResType("error");
      }
      setResMessage(res.message);
    })
      .catch((e) => {
        setResType("error");
        setLoading(false);
        setResMessage(`${e}`);
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
                    <span className="d-md-inline-block">{(selectedCenter && selectedCenter.name) ?? ''}</span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-small">
                    {arrCenter.map((e) => {
                      return <a className="dropdown-item" href="#" onClick={(e1) => {
                        setSelectedCenter(e);
                      }}>
                        <i className="material-icons">&#xE7FD;</i>{e.name ?? ''}
                      </a>
                    })}

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

                      style={{ width: '40px', height: '40px' }}
                      className="user-avatar rounded-circle mr-2"
                      src={avatar}
                    />
                    <span className="d-md-inline-block">{JSON.parse(localStorage.getItem('user'))['username']}</span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-small">
                    <a className="dropdown-item" href="#">
                      <i className="material-icons">&#xE7FD;</i> Profile
                    </a>

                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item text-danger" href="#" onClick={() => {
                      localStorage.removeItem('user');
                      history.push('/signin');
                    }}>
                      <i className="material-icons text-danger" >&#xE879;</i>{" "}
                      Logout{" "}
                    </a>
                  </div>
                </li>
              </ul>

              <a onClick={() => {
                // setLoading(false);
                // setOpenPopup('show');

                // setAddHistory({ 'ahFirstName': '', 'ahLastName': '', 'ahAge': '', 'ahGender': '', 'ahHistory': [''], 'ahAction': 'Add History' });
              }} href="/patient" title="Patient Register" className="btn btn-primary btn-history">Patient Register</a>

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
                            <div className="col-md-12">
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Patient ID" aria-label="PatientID" value={pateintId} onChange={(e) => {
                                  setPateintId(e.target.value);
                                }}></input>
                              </div>
                            </div>
                          </div>

                          <div className="row">

                          <div className="col-md-6">
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Patient Name" aria-label="PatientName" value={pateintName} onChange={(e) => {
                                  setPateintName(e.target.value);
                                }}></input>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Patient Mobile Number" aria-label="MobileNo" value={mobileNo} onChange={(e) => {
                                  setMobileNo(e.target.value);
                                }}></input>
                              </div>
                            </div>
                          </div>

                          <div className="row">

                          <div className="col-md-6">
                              <div className="form-group">
                                <select className="form-control" onChange={(e) => setTestGroup(e.target.value)}
                                  value={testGroup}
                                >
                                  <option value="">TestGroup</option>
                                  {arrTestGroup.map((e) => {
                                    return <option value={e['_id']}>{e['name']}</option>
                                  })}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">

                                <select className="form-control" onChange={(e) => setCategory(e.target.value)}
                                  value={category}
                                >
                                  <option value="">Category</option>
                                  {arrCategory.map((e) => {
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
                            <th>Category</th>
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

                            return <tr style={{ position: 'relative' }}>
                              {/* <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }} 
                              // onClick={() => {
                              //   // history.push(`/report/${ele._id}`);
                              // }}
                              >

                              </div> */}
                              <td> <a className="nav-link" href="" onClick={() => {
                                history.push(`report/${ele._id}`)
                              }}><i className="fas fa-eye"></i></a></td>
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
                              <td>{ele.history && ele.history.length > 0 && ele.history[0].content}<br></br>
                                <a className="nav-link" href="" data-toggle="modal" data-target="" onClick={() => {
                                  setLoading(false);
                                  setOpenPopup('show');
                                  setAddHistory({ '_id': ele['_id'], 'ahFirstName': ele.patient && ele.patient.name && ele.patient.name.split(" ") && ele.patient.name.split(" ")[0], 'ahLastName': ele.patient && ele.patient.name && ele.patient.name.split(" ") && ele.patient.name.split(" ")[1], 'ahAge': ele.patient && ele.patient.age, 'ahGender': ele.patient && ele.patient.gender, 'ahHistory': (ele.history ?? []).map((e) => e['content']).length == 0 ? [''] : (ele.history ?? []).map((e) => e['content']), 'ahAction': 'Update History' });
                                }}><i className="fas fa-edit"></i></a>
                              </td>
                              <td>{ele.category && ele.category.name}</td>
                              <td>{ele.testGroup && ele.testGroup.name}</td>
                              <td className="text-nowrap">{`${(ele.image_count && ele.image_count.uploaded) ?? 0}/${(ele.image_count && ele.image_count.total) ?? 0}`} <i className="fas fa-download"></i></td>
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
                              <td className="text-nowrap">{`${ele.scan_timestamp && moment(ele.scan_timestamp, 'YYYY-MM-DDTHH:mm:ss:sssZ').format('DD/MM/YYYY')} ${ele.scan_timestamp && moment(ele.scan_timestamp, 'YYYY-MM-DDTHH:mm:ss:sssZ').format('hh:mm a')}`}</td>
                              <td className="text-nowrap">{`${ele.upload_timestamp && moment(ele.upload_timestamp, 'YYYY-MM-DDTHH:mm:ss:sssZ').format('DD/MM/YYYY')} ${ele.upload_timestamp && moment(ele.upload_timestamp, 'YYYY-MM-DDTHH:mm:ss:sssZ').format('hh:mm a')}`}</td>
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

            {/* <div className="row mb-30">
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
            </div> */}

          </div>

          <div className={`modal fade ${openPopup}`} id="PatientHistoryModal" tabindex="-1" role="dialog" aria-labelledby="PatientHistoryLabel" aria-hidden="true" style={{ display: openPopup === 'show' ? 'block' : 'none', backgroundColor: '#00000033' }} >
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="PatientHistoryLabel">Patient History</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                    setOpenPopup('');
                  }}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div className="modal-body">
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="feFirstName">First Name</label>
                        <input type="text" className="form-control" id="feFirstName" placeholder="First Name" value={addHistory['ahFirstName']} onChange={(e) => {
                          setAddHistory({ ...addHistory, 'ahFirstName': e.target.value });
                        }} /> </div>
                      <div className="form-group col-md-6">
                        <label for="feLastName">Last Name</label>
                        <input type="text" className="form-control" id="feLastName" placeholder="Last Name" value={addHistory['ahLastName']} onChange={(e) => {
                          setAddHistory({ ...addHistory, 'ahLastName': e.target.value });
                        }} /> </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="feAge">Age</label>
                        <input type="number" className="form-control" id="feAge" placeholder="Age" value={addHistory['ahAge']} onChange={(e) => {
                          setAddHistory({ ...addHistory, 'ahAge': e.target.value });
                        }} /> </div>
                      <div className="form-group col-md-6">
                        <label for="gen">Gender</label>
                        <div className={`row mt-2 ml-3`} id="gen">

                          <div className={`row align-items-center`} style={{ width: "50%" }}>
                            <input type="radio" id="male" name="gender" value={'male'} checked={addHistory['ahGender'] === 'male'} onChange={(e) => {
                              setAddHistory({ ...addHistory, 'ahGender': e.target.value });
                            }} />
                            <div className={"ml-2"} style={{ fontSize: "16px", fontWeight: "500" }} >Male</div>
                          </div>
                          <div className={`row align-items-center`} style={{ width: "50%" }}>
                            <input type="radio" id="female" name="gender" value={'female'} checked={addHistory['ahGender'] === 'female'} onChange={(e) => {
                              setAddHistory({ ...addHistory, 'ahGender': e.target.value });
                            }} />
                            <div className={"ml-2"} style={{ fontSize: "16px", fontWeight: "500" }} >Female</div>
                          </div>
                        </div> </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12 mb-0">
                        <label for="feDescription">History <i className="fas fa-plus-square" onClick={() => {
                          var arr = addHistory['ahHistory'] ?? [];
                          arr.push('');
                          setAddHistory({ ...addHistory, 'ahHistory': arr });
                        }}></i></label>
                        {(addHistory['ahHistory'] ?? []).map((e, index) => {
                          return <div style={{ position: 'relative' }} > <textarea style={{ width: 'calc(100% - 20px)' }} className="form-control mb-2" value={e} onChange={(e) => {
                            var arr = addHistory['ahHistory'] ?? [];
                            arr[index] = e.target.value;
                            setAddHistory({ ...addHistory, 'ahHistory': arr });
                          }} name="feDescription" rows="4" placeholder="Type somthing here..."></textarea>
                            <i className="fas fa-trash-alt fa-lg" style={{ position: 'absolute', top: 4, right: 0, color: 'red' }} onClick={() => {
                              var arr = addHistory['ahHistory'] ?? [];
                              arr.splice(index, 1);
                              setAddHistory({ ...addHistory, 'ahHistory': arr });
                            }}></i>

                          </div>
                        })}

                      </div>
                    </div>
                  </form>
                </div>

                <div className="modal-footer justify-content-center">
                  <button type="submit" className="btn btn-primary p-0" style={{ width: '200px', height: '40px' }} onClick={() => {
                    setLoading(true);
                    if (addHistory['ahAction'] === 'Add History') {
                      addHistoryCall();
                    } else {
                      updateHistoryCall();
                    }
                  }}>{loading ? <CircularProgress color='red' style={{ width: 35, height: 35 }} /> : addHistory['ahAction']}</button>
                </div>
              </div>
            </div>
          </div>

          {/* <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
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
          </footer> */}
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
  return ele && ele._id;
}
export default Detail;
