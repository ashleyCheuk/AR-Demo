// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','app.services','app.controller'])

.config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'homeCtrl'
            })

            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            })

            .state('coupon', {
                url: '/coupon',
                templateUrl: 'templates/coupon.html',
                controller: 'couponCtrl'
            })

            .state('feedback', {
                url: '/feedback',
                templateUrl: 'templates/feedback.html',
                controller: 'feedbackCtrl'
            })

            .state('panel', {
                url: '/panel',
                templateUrl: 'templates/panel.html',
                controller: 'panelCtrl'
            })
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

function changeView()
{
    // var barcode = document.getElementById("barcode");
   document.getElementById('barcode').style.display = 'none';
}

function showSale()
{
    var elm = document.getElementById('vicks');
    elm.style.display = 'inline';
    var newone = elm.cloneNode(true);
    elm.parentNode.replaceChild(newone, elm);
    newone.className += " floating";

    elm = document.getElementById('c_vitaman');
    elm.style.display = 'inline';
    var newone = elm.cloneNode(true);
    elm.parentNode.replaceChild(newone, elm);
    newone.className += " floating";

    elm = document.getElementById('lozenger');
    elm.style.display = 'inline';
    var newone = elm.cloneNode(true);
    elm.parentNode.replaceChild(newone, elm);
    newone.className += " floating";

    elm = document.getElementById('coupon');
    elm.style.display = 'inline';
    var newone = elm.cloneNode(true);
    elm.parentNode.replaceChild(newone, elm);
    newone.className += " floating";
}

function takeCoupon(obj)
{
    var product = obj;
    product.style.display = 'none';
}


function loadCamera(dataHolder)
 {
     window.awe.init({
       device_type: awe.AUTO_DETECT_DEVICE_TYPE,
       settings: {
       	container_id: 'container',
         default_camera_position: { x:0, y:0, z:0 },
         default_lights:[
           {
             id: 'point_light',
             type: 'point',
             color: 0xFFFFFF,
           },
         ],
       },
       ready: function() {
         awe.util.require([
           {
             capabilities: ['gum','webgl'],
             files: [
               [ 'js/awe-standard-dependencies.js', 'js/awe-standard.js'],
  			  'js/awe-standard-object_clicked.js',
  			  'js/awe-standard-window_resized.js',
               'js/awe-jsartoolkit-dependencies.js',
               'js/awe.marker_ar.js',
             ],
             success: function() {
  					awe.setup_scene();

  			        awe.pois.add({ id:'poi', position: { x:0, y:0, z:1 }, visible: false });

  			        awe.projections.add({
  								id:'sales_coupon',
  								geometry: { shape: 'cube', x:80,y:40,z:1},
  								position: {x: 0, y: 100, z: 1},
  								material:{ type: 'phong', color: 0xFFFFFF },
  								texture: { path: dataHolder, crossOrigin: 'use-credentials'},
  			        }, { poi_id: 'poi' });

                awe.projections.add({
                      id:'dosage',
                      geometry: { shape: 'cube', x:80,y:40,z:01},
                      position: {x: 80, y: 0, z: 1},
                      material:{ type: 'phong', color: 0xFFFFFF },
                      texture: { path: 'img/dosage.png', crossOrigin: 'use-credentials'},
                    }, { poi_id: 'poi' });
                awe.projections.add({
                      id:'recommend',
                      geometry: { shape: 'cube', x:40,y:80,z:1},
                      position: {x: -80, y: 0, z: 1},
                      material:{ type: 'phong', color: 0xFFFFFF },
                      texture: { path: 'img/pregNoTake.gif', crossOrigin: 'use-credentials'},
                    }, { poi_id: 'poi' });

  			        awe.events.add([{
  								id: 'ar_tracking_marker',
  								device_types: {
  									pc: 1,
  									android: 1
  								},
  								register: function(handler) {
  									window.addEventListener('ar_tracking_marker', handler, false);
  								},
  								unregister: function(handler) {
  									window.removeEventListener('ar_tracking_marker', handler, false);
  								},
  								handler: function(event) {
  									if (event.detail) {
  										if (event.detail['64']) { // we are mapping marker #64 to this projection
  											awe.pois.update({
  												data: {
  													visible: true,
  													position: { x:0, y:0, z:0 },
  													matrix: event.detail['64'].transform
  												},
  												where: {
  													id: 'poi'
  												}
  											});

  										}
  										else {
  											awe.pois.update({
  												data: {
  													visible: false
  												},
  												where: {
  													id: 'poi'
  												}
  											});
  										}
  										awe.scene_needs_rendering = 1;
  									}
  								}
  							}])
  			      },
           },
           {
             capabilities: [],
             success: function() {
  		          document.body.innerHTML = '<p>Try this demo in the latest version of Chrome or Firefox on a PC or Android device</p>';
             },
           },
         ]);
       }
     });

   window.addEventListener('object_clicked', function(e) {
  		switch (e.detail.projection_id) {
  			case 'sales_coupon':
  				console.log('clicked');
  				document.getElementById('barcode').style.display = 'block';
  			  // Clicks to open and close our menu
  			break;
  			case 'ar_button_one':
  			case 'ar_button_two':
  			case 'ar_button_three':
  			case 'ar_button_four':
  			case 'ar_button_five':
  			case 'ar_button_six':
  			case 'ar_button_seven':
  			break;
  	  }
   });
 }
