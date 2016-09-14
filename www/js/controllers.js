angular.module('app.controller', ['app.services'])
.controller('homeCtrl', function($scope,$state,mcsService) {

  //document.getElementById('nurse_gif').hidden = true;

  $scope.coupons = [];
  mcsService.invokeCustomAPI("NPAppAPI/data?tableName=coupon" , "GET" , null)
  .then (function(data) {
        $scope.coupons = data;

        var test = JSON.parse(JSON.stringify(data));

        console.log(test.items[0].imageurl);
        document.getElementById('container').hidden = true;
        loadCamera(test.items[0].imageurl);
  })
  .catch(function(err) {
      console.log('Error calling endpoint /departments: '+err);
  });

  $scope.pushNotificationChange = function()
  {
      var state = !$scope.pushNotification.checked;
      document.getElementById('container').hidden = state;
      document.getElementById('floated-imgs').hidden = $scope.pushNotification.checked;
      document.getElementById('storeLocator').hidden = $scope.pushNotification.checked;
      document.getElementById('logo').hidden = $scope.pushNotification.checked;
      document.getElementById('feedback').hidden = $scope.pushNotification.checked;

  };

  $scope.pushNotification = { checked: false };

  $scope.gotoCoupons = function ()
  {
      $state.go('coupon');
  }

  $scope.gotoFeedback = function ()
  {
    $state.go('feedback');
  }

  $scope.gotoPanel = function ()
  {
      $state.go('panel');
  }
})

.controller('couponCtrl', function($scope,$state, mcsService,$ionicHistory) {
  $scope.tasks = [
    { title: 'img/coupons/10 coupon.png' },
    { title: 'img/coupons/10 coupon.png' },
    { title: 'img/coupons/30 coupon.png' },
    { title: 'img/coupons/50 coupon.png' }
  ];

  $scope.goBack = function ()
  {
    $state.go('home');
  }
})

.controller('panelCtrl', function($scope,$state, mcsService,$ionicHistory)
{

  $scope.goBack = function ()
  {
    $state.go('home');
  }
  
})

.controller('feedbackCtrl', function($scope,$state, mcsService,$ionicHistory)
{
  $scope.contactNotification = { checked: false };

  $scope.goBack = function ()
  {
    $state.go('home');
  }

  $scope.sendContact = function()
  {
    if ($scope.contactNotification.checked)
    {
        alert('Thankyou for you feedback a representative will be in contact');
        $state.go('home');
    }
    else
    {
      $state.go('home');
    }
  }
})

.controller('loginCtrl', function($scope,$state, mcsService,$ionicHistory) {

    // We could add logic here to pre-populate username, password with previously used values
    $scope.loginData = {
        username: 'ashley.cheuk@oracle.com',
        password: 'Ora@1234',
    };

    $scope.doLogin = function () {
      mcsService.authenticate($scope.loginData.username, $scope.loginData.password)
       .then(function() {$state.go('home')})
       .catch(function(err) {alert('Username or password is invalid')});
    }

    $scope.value = 65;
  $scope.options = {
    size: 300
    //other options
  };
    //$state.go('home');

})
