import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import intelpixel from "../../images/intelpixel.png"; // with import
import xray from "../../images/xray.jpg";
import avatar from "../../images/0.png";
import shardsLogo from "../../images/intelpixel.png";
import { useHistory } from "react-router-dom";
import { getPatientDetailApi, updateStatusApi, getCategoryApi, getReportFormatApi } from "../../services/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import NotFound from "../../components/notFound";
import moment from "moment";
import JoditEditor from "jodit-react";
import { jsPDF } from "jspdf";
import ReactDOMServer from "react-dom/server";
import html2canvas from "html2canvas";

let Report = (props) => {
  const history = useHistory();
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('Pending');
  const [arrCategory, setArrCategory] = useState([]);
  const [arrFormat, setArrFormat] = useState([]);
  const [editorState, setEditorState] = useState();

  useEffect(() => {

    getData();
  }, []);
  const getData = () => {
    getCategoryApi().then((res) => {
      if (res.code === 200) {
        setArrCategory(res.data ?? []);
      }

    })
      .catch((e) => {
        console.log(e);
      });
    getReportFormatApi().then((res) => {
      if (res.code === 200) {
        setArrFormat(res.data ?? []);
      }

    })
      .catch((e) => {
        console.log(e);
      });
    getPatientDetailApi({ '_id': props.match.params.id }).then((res) => {
      setLoading(false);
      if (res.status && (res.data ?? []).length > 0) {
        setData((res.data ?? [])[0]);
      }
      // else {
      //   setArrData([]);
      // }
    })
      .catch((e) => {
        setLoading(false);

        console.log("ERROR");
        console.log(e);
      });
  }
  const updateStatus = (status) => {
    updateStatusApi({ transaction_id: props.match.params.id, report_id: props.match.params.id, report_status: status }).then((res) => {
      if (res.code == 200) {
        getData();
      }

    })
      .catch((e) => {
        console.log(e);
      });
  }

  if (loading) return (<div className='align-items-center center justify-content-center row w-100' style={{ height: '100vh' }}><CircularProgress color='red' style={{ width: 50, height: 50 }} /></div>);
  if (!loading && !data) return (<NotFound />);
  return (
    <div className="container-fluid reportWrap">
      <div className="row">
        <aside className="main-sidebar col-12 col-md-3 col-lg-2 px-0">
          {/* <aside className="main-sidebar px-0" style={{width:"300px"}}> */}
          <div className="main-navbar">
            <nav className="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0">
              <a
                className="navbar-brand w-100 mr-0"
                href="#"
                style={{ lineHeight: "25px" }}
              >
                <div className="d-table m-auto">
                  {/* <img
                    id="main-logo"
                    className="d-inline-block align-top mr-1"
                    src={shardsLogo}
                    alt="Shards Dashboard"
                    style={{ maxWidth: "25px" }}
                  /> */}
                  <span className="d-none d-md-inline ml-1">
                    Radiology PACS
                  </span>
                </div>
              </a>
              <a className="toggle-sidebar d-sm-inline d-md-none d-lg-none">
                <i className="material-icons">&#xE5C4;</i>
              </a>
            </nav>
          </div>
          <form
            action="#"
            className="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none"
          >
            <div className="input-group input-group-seamless ml-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-search"></i>
                </div>
              </div>
              <input
                className="navbar-search form-control"
                type="text"
                placeholder="Search for something..."
                aria-label="Search"
              />
            </div>
          </form>
          <div className="nav-wrapper">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link " href="#">
                  <i className="material-icons">face</i>
                  <span>{`${data.patient && data.patient.name} ${data.patient && data.patient.age}/${data.patient && data.patient.gender === 'male' ? 'M' : 'F'}`}</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="#">
                  <i className="material-icons">person</i>
                  <span>{`Doctor : ${data.doctor && data.doctor.name}`}</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="material-icons">note_add</i>
                  <span>{`Radiologist : ${data.radiologist && data.radiologist.name}`}</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="material-icons">schedule</i>
                  <span>{`Scan Time : ${data.scan_timestamp && moment(data.scan_timestamp, 'YYYY-MM-DDTHH:mm:ss:sssZ').format('DD/MM/YYYY HH:mm:ss')}`}</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="material-icons">hourglass_empty</i>
                  <span>{`Upload Time : ${data.upload_timestamp && moment(data.upload_timestamp, 'YYYY-MM-DDTHH:mm:ss:sssZ').format('DD/MM/YYYY HH:mm:ss')}`}</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="material-icons">vertical_split</i>
                  <span>History</span>
                  <br />
                  {(data.history ?? []).map((d) => {
                    return <div>
                      <div style={{ height: "10px" }} />
                      <span style={{ whiteSpace: 'pre-wrap' }}>
                        {d.content ?? ''}
                      </span>
                    </div>
                  })}
                </a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-nowrap px-3" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">

                  <span class="d-none d-md-inline-block">Formats</span>
                </a>
                <div class="dropdown-menu dropdown-menu-small">
                  {arrFormat && arrFormat.map((e, i) => {
                    return <div key={i}> <a class="dropdown-item" href="#" onClick={() => {
                      var s = `<div> <div class="m-0 row"><p class="ct1" style="width: 49%;"><span style="font-size: 16px;">Patient ID: ${data.patient._id} </span></p><p class="ct2" style="width: 49%;"><span style="font-size: 16px;">Name Of Patient: ${data.patient.name}</span></p></div><div class="m-0 row"><p class="ct3" style="width: 49%;"><span style="font-size: 16px;">Age/Sex: ${data.patient && data.patient.age}/${data.patient && data.patient.gender === 'male' ? 'M' : 'F'}</span></p><p class="ct1" style="width: 49%;"><span style="font-size: 16px;">Reporting Date: ${moment(new Date()).format("DD/MM/YYYY")}</span></p></div></div>`
                      setEditorState(s + e.content ?? '');
                    }}>
                      <i class="material-icons"></i> {e.name ?? ''}</a>
                    </div>;
                  })}
                </div>
              </li>
            </ul>
          </div>
        </aside>

        <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
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
              {/* <ul className="navbar-nav all-center-dd">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-nowrap"
                    data-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="d-md-inline-block">All Centers</span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-small">
                    <a className="dropdown-item" href="#">
                      <i className="material-icons">&#xE7FD;</i> Center 1
                    </a>
                    <a className="dropdown-item text-danger" href="#">
                      <i className="material-icons text-danger">&#xE7FD;</i>{" "}
                      Center 2
                    </a>
                  </div>
                </li>
              </ul> */}

              <form
                action="#"
                className="main-navbar__search w-100 d-none d-md-flex d-lg-flex"
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
                      <i className="material-icons text-danger">&#xE879;</i>{" "}
                      Logout{" "}
                    </a>
                  </div>
                </li>
              </ul>

              {/* <a
                href=""
                title="Patient History"
                className="btn btn-primary btn-history"
                data-toggle="modal"
                data-target="#PatientHistoryModal"
              >
                Patient History
              </a> */}

              <nav className="nav">
                <a
                  href="#"
                  className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-none text-center border-left"
                  data-toggle="collapse"
                  data-target=".header-navbar"
                  aria-expanded="false"
                  aria-controls="header-navbar"
                >
                  <i className="material-icons">&#xE5D2;</i>
                </a>
              </nav>
            </nav>
          </div>

          <div className="main-content-container container-fluid px-4">
            {/* <div className="page-header row no-gutters py-4"></div> */}

            <div className="page-header row no-gutters ptb-30">
              <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                <span className="text-uppercase page-subtitle">Report</span>
                {/* <h3 className="page-title">Report</h3> */}

              </div>
            </div>

            <div className="row">
              <div className="col-lg-9 col-md-12">
                <div className="card card-small mb-30">
                  <div className="card-body">
                    <form className="add-new-post">
                      <div
                        id="editor-container"
                        className="add-new-post__editor mb-1"
                      > <JoditEditor
                          value={editorState}
                          config={{
                            readonly: false // all options from https://xdsoft.net/jodit/doc/
                          }}
                          tabIndex={1} // tabIndex of textarea
                          onBlur={newContent => setEditorState(newContent)} // preferred to use only this option to update the content for performance reasons
                          onChange={newContent => {
                            console.log(newContent);
                          }}
                        /></div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-12">
                <div className="card card-small mb-30">
                  <div className="card-header border-bottom">
                    <h6 className="m-0">Actions</h6>
                  </div>
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item p-3">
                        <span className="d-flex mb-2">
                          <i className="material-icons mr-1">flag</i>
                          <strong className="mr-1">Status:</strong> {data['report_status'] ?? 'Pending'}
                        </span>
                      </li>
                      <li className="list-group-item d-flex px-3">
                        <button className="btn btn-sm btn-outline-accent" onClick={() => {
                          updateStatus('Pending');
                        }}>
                          <i className="material-icons">save</i> Save Draft
                        </button>
                        <button className="btn btn-sm btn-accent ml-auto" onClick={() => {
                          updateStatus('Complete');
                          // html2canvas(document.getElementsByClassName('jodit-wysiwyg')[0]).then(canvas => {
                          //   const img = canvas.toDataURL('image/jpeg');
                            const doc = new jsPDF('p', 'pt', 'a4');
                            // pdf.for(document.getElementsByClassName('jodit-wysiwyg')[0]);
                            // pdf.save('sasd.pdf')
                        // });
                        var el = document.getElementsByClassName('jodit-wysiwyg')[0];
el.style.width = '600px'
                        doc.html(el, {
                          callback: function (doc) {

                            doc.save();
                          },
                          x: 10,width:200,height:500,
                          y: 10
                       });
                          // doc.html(`<div>${editorState}</div>`);
                          // doc.fromHTML(`<div>${editorState}</div>`);
                          // window.open(doc.output('bloburl'), '_blank');
                          // doc.save("myDocument.pdf");
                        
                        }}>
                          <i className="material-icons">file_copy</i> Publish
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="card card-small mb-30">
                  <div className="card-header border-bottom">
                    <h6 className="m-0">Categories</h6>
                  </div>
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item px-3 pb-2">
                        {arrCategory && arrCategory.map((element, i) => {
                          return <div className="custom-control custom-checkbox mb-1" key={element._id}>
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={i}
                              checked={element.check && element.check === true}
                              onClick={(e) => {
                                console.log(e);
                                var arr = arrCategory;
                                arr[e.target.id].check = !(element.check && element.check === true)
                                setArrCategory(arr);
                              }}
                            />
                            <label
                              className="custom-control-label"
                              for={i}
                            >
                              {element.name}
                            </label>
                          </div>;
                        })}
                      </li>
                      <div className="card-header border-bottom">
                        <h6 className="m-0">New Report Content Category</h6>
                      </div>
                      <div className="card-body p-0">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex px-3">
                            <form>
                              <div className="form-row">
                                <div className="form-group col-md-6">
                                  <input
                                    type="text"
                                    className="form-control is-valid"
                                    id="validationServer01"
                                    placeholder="Category Name"
                                    required
                                  />
                                </div>
                                <div className="form-group col-md-6">
                                  <select className="form-control is-invalid">
                                    <option selected>Choose...</option>
                                    <option>Checkbox Testgroup 1</option>
                                    <option>Checkbox Testgroup 2</option>
                                    <option>Checkbox Testgroup 3</option>
                                    <option>Checkbox Testgroup 4</option>
                                    <option>Checkbox Testgroup 5</option>
                                  </select>
                                </div>
                              </div>

                              <button className="btn btn-sm btn-accent">
                                <i className="material-icons">file_copy</i> Publish
                              </button>
                            </form>
                          </li>
                        </ul>
                      </div>
                    </ul>
                  </div>
                </div>


              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="PatientHistoryModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="PatientHistoryLabel"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="PatientHistoryLabel">
                    Patient History
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div className="modal-body">
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="feFirstName">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="feFirstName"
                          placeholder="First Name"
                        />{" "}
                      </div>
                      <div className="form-group col-md-6">
                        <label for="feLastName">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="feLastName"
                          placeholder="Last Name"
                        />{" "}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="feAge">Age</label>
                        <input
                          type="number"
                          className="form-control"
                          id="feAge"
                          placeholder="Age"
                        />{" "}
                      </div>
                      <div className="form-group col-md-6">
                        <label for="feGender">Gender</label>
                        <input
                          type="text"
                          className="form-control"
                          id="feGender"
                          placeholder="Gender"
                        />{" "}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12 mb-0">
                        <label for="feDescription">
                          History <i className="fas fa-plus-square"></i>
                        </label>
                        <textarea
                          className="form-control"
                          name="feDescription"
                          rows="7"
                          placeholder="Type somthing here..."
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="modal-footer justify-content-center">
                  <button type="submit" className="btn btn-primary">
                    Update History
                  </button>
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
    </div>
  );
};
export default Report;
