import React, { Fragment, useState, useEffect } from "react";
import "./style.css";
import intelpixel from "../../images/intelpixel.png"; // with import
import xray from "../../images/xray.jpg";
import avatar from "../../images/0.jpg";

let Report = (props) => {
  useEffect(() => { }, []);

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
                {/* <span className="text-uppercase page-subtitle">Report</span> */}
                <h3 className="page-title">Report</h3>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-9 col-md-12">                
                <div className="card card-small mb-30">
                  <div className="card-body">
                    <form className="add-new-post">
                    
                      <div id="editor-container" className="add-new-post__editor mb-1"></div>
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
                          <strong className="mr-1">Status:</strong> Critical
                        </span>
                        
                      </li>
                      <li className="list-group-item d-flex px-3">
                        <button className="btn btn-sm btn-outline-accent">
                          <i className="material-icons">save</i> Save Draft</button>
                        <button className="btn btn-sm btn-accent ml-auto">
                          <i className="material-icons">file_copy</i> Publish</button>
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
                        <div className="custom-control custom-checkbox mb-1">
                          <input type="checkbox" className="custom-control-input" id="category1" checked />
                          <label className="custom-control-label" for="category1">Abnormal</label>
                        </div>
                        <div className="custom-control custom-checkbox mb-1">
                          <input type="checkbox" className="custom-control-input" id="category2" checked />
                          <label className="custom-control-label" for="category2">Normal</label>
                        </div>
                        <div className="custom-control custom-checkbox mb-1">
                          <input type="checkbox" className="custom-control-input" id="category3" />
                          <label className="custom-control-label" for="category3">TB</label>
                        </div>
                        <div className="custom-control custom-checkbox mb-1">
                          <input type="checkbox" className="custom-control-input" id="category4" />
                          <label className="custom-control-label" for="category4">ILD</label>
                        </div>
                        <div className="custom-control custom-checkbox mb-1">
                          <input type="checkbox" className="custom-control-input" id="category5" />
                          <label className="custom-control-label" for="category5">Mass</label>
                        </div>
                      </li>
                      <li className="list-group-item d-flex px-3">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="New category" aria-label="Add new category" aria-describedby="basic-addon2" />
                          <div className="input-group-append">
                            <button className="btn btn-white px-2" type="button">
                              <i className="material-icons">add</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
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
                        <input type="text" className="form-control" id="feLastName" placeholder="Last Name"  /> </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="feAge">Age</label>
                        <input type="number" className="form-control" id="feAge" placeholder="Age" /> </div>
                      <div className="form-group col-md-6">
                        <label for="feGender">Gender</label>
                        <input type="text" className="form-control" id="feGender" placeholder="Gender" /> </div>
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
      
     
    
    
    </div>


 );
};
export default Report;
