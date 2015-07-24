/*
global angular
*/



var s3UploadController = require('./s3upload.controller');

var s3UploadModule = angular.module('s3UploadModule', ['evaporate'])

.controller('s3UploadCtrl', s3UploadController);
