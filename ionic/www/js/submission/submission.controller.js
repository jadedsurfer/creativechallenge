/*
global submissionModule
 */

submissionModule.controller('SubmissionDetailCtrl',
  function($scope, $stateParams, Submission) {
    $scope.submission = Submission.get({id: $stateParams.submissionId});
});
