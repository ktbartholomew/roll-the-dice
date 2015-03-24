var $ = require('jquery');
require('angular');
var THREE = require('three');
var TWEEN = require('tween.js');

require('./dice-model/d4');
require('./dice-model/d6');
require('./dice-model/d8');
require('./dice-model/d20');

module.exports = 'app.directives.dice-model';

angular.module(module.exports, [])
.directive('diceModel', function () {
  return {
    scope: {
      color: '=?',
      diceModel: '=?model',
      value: '=?'
    },
    controller: function ($scope, $element, $attrs) {
      $scope.animating = false;
    },
    link: function ($scope, $element, $attrs) {

      var addCamera = function () {
        $scope.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        $scope.camera.setLens(35);
        $scope.camera.position.set(0,0,5);
      };

      var addLights = function () {
        var light = new THREE.PointLight(0x808080, 3);
        light.position.set(0,1,5);
        $scope.scene.add(light);
        $scope.scene.add(new THREE.AmbientLight(0x404040));
      };

      var addModel = function () {
        $scope.scene.remove($scope.dice);

        $scope.model = require('./dice-model/d' + $scope.diceModel);
        $scope.dice = $scope.model.createMesh(stringToHex($scope.color));
        $scope.scene.add($scope.dice);

        window.dice = $scope.dice;
      };

      var stringToHex = function (string) {
        string = string.replace('#', '0x');
        return parseInt(string);
      };

      var animate = function () {
        window.requestAnimationFrame(function (time) {
          TWEEN.update(time);
          $scope.renderer.render($scope.scene, $scope.camera);

          if($scope.animating === true) {
            animate();  
          }
        });
      };

      var showSide = function (side) {
        side = $scope.model.faceAngles[side];

        if (!$scope.animating) {
          $scope.animating = true;
          animate();  
        }

        var tween = new TWEEN.Tween($scope.dice.rotation)
        .to({
          x: side.x * (Math.PI/180),
          y: side.y * (Math.PI/180),
          z: side.z * (Math.PI/180)
        }, 1000)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onComplete(function () {
          $scope.animating = false;
        })
        .start();
      };

      $scope.scene = new THREE.Scene();
      $scope.renderer = new THREE.WebGLRenderer({alpha: true});
      $scope.renderer.setSize(240, 240);

      
      addCamera();
      addLights();
      addModel();

      $element.append($scope.renderer.domElement);
      $scope.animating = true;
      animate();

      // $(window).on('keyup', function (e) {
      //   switch(e.keyCode){
      //     case 37: // left
      //       $scope.dice.rotation.y += 5 * (Math.PI/180);
      //     break;
      //     case 39: // right
      //       $scope.dice.rotation.y -= 5 * (Math.PI/180);
      //     break;
      //     case 38: // up
      //       $scope.dice.rotation.x -= 5 * (Math.PI/180);
      //     break;
      //     case 40: // down
      //       $scope.dice.rotation.x += 5 * (Math.PI/180);
      //     break;
      //   }

      //   $scope.dice.rotation.z = 90 * (Math.PI/180);

      //   console.log({
      //     x: $scope.dice.rotation.x * (180/Math.PI),
      //     y: $scope.dice.rotation.y * (180/Math.PI),
      //     z: $scope.dice.rotation.z * (180/Math.PI),
      //   });
      // });
      
      $scope.$watch('diceModel', function (newValue, oldValue) {
        if (typeof newValue === 'undefined') {
          return;
        }

        addModel();
        animate();
      });

      $scope.$watch('color', function (newValue, oldValue) {
        if (typeof newValue === 'undefined') {
          return;
        }

        addModel();
        animate();
      });

      $scope.$watch('value', function (newValue, oldValue) {
        if (typeof newValue === 'undefined') {
          return;
        }

        showSide(newValue);
      });
    }
  };
});