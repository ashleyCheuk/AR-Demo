angular.module('app.services', [])
.factory('mcsService', function($q){

    var mcs_config = {
      "logLevel": mcs.logLevelInfo,
      "mobileBackends": {
        "NP_AR": {
          "default": true,
          "baseUrl": "https://apacdemo-apacdemo.mobileenv.us2.oraclecloud.com:443",
          "applicationKey": "5d58c4b9-d4ce-4044-83a3-038a6e846b1f",
          "authorization": {
            "basicAuth": {
              "backendId": "0355f02a-2cd4-4884-807f-ef7f9f5dc819",
              "anonymousToken": "QVBBQ0RFTU9fQVBBQ0RFTU9fTU9CSUxFX0FOT05ZTU9VU19BUFBJRDpzdHJsNXF3a2VIcDRfZg=="
            }
          }
        }
      }
    };

    // initialize MCS mobile backend
    mcs.MobileBackendManager.setConfig(mcs_config);
    var mbe = mcs.MobileBackendManager.getMobileBackend('NP_AR');
    mbe.setAuthenticationType("basicAuth");

    var authenticate = function(username,password) {
      var deferred = $q.defer();
      mbe.Authorization.authenticate(username, password
      , function(statusCode,data) {deferred.resolve(statusCode,data)}
      , function(statusCode,data) {deferred.reject(statusCode,data)});
      return deferred.promise;
    };

    var authenticateAnonymous = function() {
    var deferred = $q.defer();
    mbe.Authorization.authenticateAnonymous(
        function(statusCode,data) {deferred.resolve(statusCode,data)}
      , function(statusCode,data) {deferred.reject(statusCode,data)});
      return deferred.promise;
    };

    var logout = function() {
    var deferred = $q.defer();
    mbe.Authorization.logout(
        function(statusCode,data) {deferred.resolve(statusCode,data)}
      , function(statusCode,data) {deferred.reject(statusCode,data)});
      return deferred.promise;
    };

    var invokeCustomAPI = function(uri,method,payload) {
      var deferred = $q.defer();
       mbe.CustomCode.invokeCustomCodeJSONRequest(uri , method , payload
       , function(statusCode,data) {deferred.resolve(data)}
       , function(statusCode,data) {deferred.reject(statusCode,data)});
       return deferred.promise;
    };

    return {
       authenticate:authenticate,
       authenticateAnonymous:authenticateAnonymous,
       logout:logout,
       invokeCustomAPI:invokeCustomAPI
    }
})
