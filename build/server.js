 // BASE SETUP
// ==============================================

var express = require('express');
var app 	= express();
var router	= express.Router();
var port    = process.env.PORT || 8080;

// Middlewares
//first edit 
const fileUpload = require('express-fileupload');
var http 				= require('http');
// var path 				= require('path');
// var morgan 				= require('morgan');
var bodyParser 			= require('body-parser');
// var methodOverride 		= require('method-override');
var cookieParser 		= require('cookie-parser');
var session 			= require('express-session');
// var favicon				= require('serve-favicon');
var errorhandler		= require('errorhandler');
// var secure				= require('./config/secure.js')
// var ejs					= require('ejs');
// var passport			= require('passport');
// var fs = require('fs');
var MongoStore 			= require('connect-mongo');
//var routes 				= require('./routes');
var cors = require('cors');
var mongoose = require('mongoose');
var database 			= require('./config/database');
var reqpost = require('request');
var apiCityRouteController = require('./api/routecontrollers/cities.js');
var apiLabRouteController = require('./api/routecontrollers/labs.js');
var apiCenterRouteController = require('./api/routecontrollers/centers.js');
var apiClientRouteController = require('./api/routecontrollers/clients.js');
var apiTransactionRouteController = require('./api/routecontrollers/transactions.js');
var apiReportRouteController = require('./api/routecontrollers/Reports.js');
var apiPatientRouteController = require('./api/routecontrollers/patients.js');
var apiDoctorRouteController = require('./api/routecontrollers/doctors.js');
var apiRoleRouteController = require('./api/routecontrollers/roles.js');
var apiUserRouteController = require('./api/routecontrollers/users.js');
var apiCategoryRouteController = require('./api/routecontrollers/categories.js');
var apiRadiologistRouteController = require('./api/routecontrollers/radiologists.js');
var apiBodyPartRouteController = require('./api/routecontrollers/bodyparts.js');
var apiTestRouteController = require('./api/routecontrollers/testGroups.js');
var apiReportcontentcategoryRouteController = require('./api/routecontrollers/reportcontentcategories.js');
var apiReportFormatRouteController = require('./api/routecontrollers/reportformats.js');
var apimachineLearnRouteController = require('./api/routecontrollers/machineLearn.js');


// API ROUTES -------------------
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
var apiRoutes = express.Router(); 
app.use('/api', apiRoutes);
// parse application/json
app.use(bodyParser.json())
// get an instance of the router for api routes
var apiRoutes = express.Router(); 
app.use(cors());
app.options('*', cors());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// app.use(session({
// 	secret: 'ihd86g3ydou18',
// 	saveUninitialized : true,
// 	resave : true,
// 	store : MongoStore.create({ 						//using mongo-connect features
// 		mongoUrl: database.url,
// 		ttl: 14*24*60*60
// 	})
// }))
//app.get("/api/centers/get",apiTransactionRouteController.getAllTransactionsData);
var uri = "mongodb://localhost:27017/pacs";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});
//app.post('/api/testgroups/category/fields/update', apiTestgroupRouteController.updateTestgroupCategory);

//City
app.get("/api/city/get",apiCityRouteController.getCity);
app.post("/api/city/getbyid",apiCityRouteController.getCityById);
app.post("/api/city/create", apiCityRouteController.createCity);
app.post("/api/city/update", apiCityRouteController.updateCity);
app.post("/api/city/delete", apiCityRouteController.deleteCity);

//Lab
app.get("/api/lab/get",apiLabRouteController.getLab);
app.post("/api/lab/getbyid",apiLabRouteController.getLabById);
app.post("/api/lab/getbycityid",apiLabRouteController.getLabByCityId);
app.post("/api/lab/create", apiLabRouteController.createLab);
app.post("/api/lab/update", apiLabRouteController.updateLab);
app.post("/api/lab/delete", apiLabRouteController.deleteLab);

//Center
app.get("/api/center/get",apiCenterRouteController.getCenter);
app.post("/api/center/getbyid",apiCenterRouteController.getCenterById);
app.post("/api/center/getbylabid",apiCenterRouteController.getCenterByLabId);
app.post("/api/center/create", apiCenterRouteController.createCenter);
app.post("/api/center/update", apiCenterRouteController.updateCenter);
app.post("/api/center/delete", apiCenterRouteController.deleteCenter);

//Role
app.get("/api/role/get",apiRoleRouteController.getRole);
app.post("/api/role/getbyid",apiRoleRouteController.getRoleById);
app.post("/api/role/create", apiRoleRouteController.createRole);
app.post("/api/role/update", apiRoleRouteController.updateRole);
app.post("/api/role/delete", apiRoleRouteController.deleteRole);

//User
app.get("/api/user/get",apiUserRouteController.getUser);
app.post("/api/user/getbyid",apiUserRouteController.getUserById);
app.post("/api/user/create", apiUserRouteController.createUser);
app.post("/api/user/update", apiUserRouteController.updateUser);
app.post("/api/user/delete", apiUserRouteController.deleteUser);
app.post("/api/user/login", apiUserRouteController.login);
app.post("/api/user/logout", apiUserRouteController.logout);

//Client
app.get("/api/client/get",apiClientRouteController.getClient);
app.post("/api/client/getbyid",apiClientRouteController.getClientById);
app.post("/api/client/create", apiClientRouteController.createClient);
app.post("/api/client/update", apiClientRouteController.updateClient);
app.post("/api/client/delete", apiClientRouteController.deleteClient);

//Patient
app.get("/api/patient/get",apiPatientRouteController.getPatient);
app.post("/api/patient/getbyid",apiPatientRouteController.getPatientById);
app.post("/api/patient/create", apiPatientRouteController.createPatient);
app.post("/api/patient/update", apiPatientRouteController.updatePatient);
app.post("/api/patient/delete", apiPatientRouteController.deletePatient);

//Doctor
app.get("/api/doctor/get",apiDoctorRouteController.getDoctor);
app.post("/api/doctor/getbyid",apiDoctorRouteController.getDoctorById);
app.post("/api/doctor/create", apiDoctorRouteController.createDoctor);
app.post("/api/doctor/update", apiDoctorRouteController.updateDoctor);
app.post("/api/doctor/delete", apiDoctorRouteController.deleteDoctor);

//Bodyparts
app.get("/api/bodypart/get",apiBodyPartRouteController.getBodyPart);
app.post("/api/bodypart/getbyid",apiBodyPartRouteController.getBodyPartById);
app.post("/api/bodypart/create", apiBodyPartRouteController.createBodyPart);
app.post("/api/bodypart/update", apiBodyPartRouteController.updateBodyPart);
app.post("/api/bodypart/delete", apiBodyPartRouteController.deleteBodyPart);

//TestGroups
app.get("/api/test/get",apiTestRouteController.getTest);
app.post("/api/test/getbyid",apiTestRouteController.getTestById);
app.post("/api/test/create", apiTestRouteController.createTest);
app.post("/api/test/update", apiTestRouteController.updateTest);
app.post("/api/test/delete", apiTestRouteController.deleteTest);

//Transaction
app.get("/api/transaction/get",apiTransactionRouteController.getTransaction);
app.post("/api/transaction/getbyid",apiTransactionRouteController.getTransactionById);
app.post("/api/transaction/create", apiTransactionRouteController.createTransaction);
app.post("/api/transaction/update", apiTransactionRouteController.updateTransaction);
app.post("/api/transaction/delete", apiTransactionRouteController.deleteTransaction);

//Report
app.get("/api/report/get",apiReportRouteController.getReport);
app.post("/api/report/getbyid",apiReportRouteController.getReportById);
app.post("/api/report/create", apiReportRouteController.createReport);
app.post("/api/report/update", apiReportRouteController.updateReport);
app.post("/api/report/delete", apiReportRouteController.deleteReport);

app.post("/api/transaction/emergency/set", apiReportRouteController.setEmergency);
app.post("/api/transaction/issue/report", apiReportRouteController.setIssue);
app.post("/api/transaction/radiologist/assign", apiReportRouteController.setRadiologist);
app.post("/api/transaction/approver/assign", apiReportRouteController.setApprover);
app.post("/api/report/status/update", apiReportRouteController.updateReportReportStatus);
app.post("/api/transaction/report/create", apiReportRouteController.addReport);
app.get("/api/transactions/list/get",apiReportRouteController.getReportList);
app.get("/api/transaction/patient/details/get",apiReportRouteController.getPatientDetail);
app.get("/api/report/transaction/patient/details/get",apiReportRouteController.getPatientDetailForReport);
app.post("/api/transaction/history/edit", apiReportRouteController.updateHistory);



//ReportFormat
app.get("/api/reportFormat/get",apiReportFormatRouteController.getReportFormat);
app.post("/api/reportFormat/getbyid",apiReportFormatRouteController.getReportFormatById);
app.post("/api/reportFormat/create", apiReportFormatRouteController.createReportFormat);
app.post("/api/reportFormat/update", apiReportFormatRouteController.updateReportFormat);
app.post("/api/reportFormat/delete", apiReportFormatRouteController.deleteReportFormat);

//Categories
app.get("/api/categories/names/get",apiCategoryRouteController.getCategoryNames);
app.get("/api/categories/by/testGroups/get",apiCategoryRouteController.getNamesByTest);
app.post("/api/categories/create", apiCategoryRouteController.addCategory);


//ReportContentCategories
app.get("/api/reportcontentcategories/names/get",apiReportcontentcategoryRouteController.getReportcontentcategoryNames);
app.get("/api/reportcontentcategories/by/test/names/get",apiReportcontentcategoryRouteController.getReportcontentcategoryNamesByTest);
app.post("/api/reportcontentcategories/create", apiReportcontentcategoryRouteController.addReportcontentcategory);


//Radiologists
app.get("/api/radiologist/names/getall",apiRadiologistRouteController.getNames);
app.post("/api/radiologist/create", apiRadiologistRouteController.addRadiologist);







//Users
app.post("/api/machine/get", apimachineLearnRouteController.getData);

app.get('/yo', function (req,res) {
	console.log(req.cookies);
	console.log('*************************');
	console.log(req.session);
})

app.listen(port);
console.log('Magic happens on port ' + port);

