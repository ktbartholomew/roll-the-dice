var THREE = require('three');

var modelData = {
  createMesh: function (color) {
    var geometry = new THREE.OctahedronGeometry(0.9,0);
    geometry.faceVertexUvs[0][0] = modelData.Uvs.d1; // 1
    geometry.faceVertexUvs[0][1] = modelData.Uvs.d7; // 7
    geometry.faceVertexUvs[0][2] = modelData.Uvs.d5; // 5
    geometry.faceVertexUvs[0][3] = modelData.Uvs.d3; // 3
    geometry.faceVertexUvs[0][4] = modelData.Uvs.d2; // 2
    geometry.faceVertexUvs[0][5] = modelData.Uvs.d8; // 8
    geometry.faceVertexUvs[0][6] = modelData.Uvs.d6; // 6
    geometry.faceVertexUvs[0][7] = modelData.Uvs.d4; // 4
    

    return new THREE.Mesh(
      geometry,
      new THREE.MeshLambertMaterial({
        color: color,
        shading: THREE.FlatShading,
        alphaMap: THREE.ImageUtils.loadTexture('/src/models/d8.png'),
        // wireframe: true
      })
    );
  },
  faceAngles: {
    1: {x: 45, y: 45, z: 90},
    2: {x: -135, y: -45, z: 90},
    3: {x: 45, y: 135, z: 90},
    4: {x: -135, y: 225, z: 90},
    5: {x: 45, y: 225, z: 90},
    6: {x: -135, y: 135, z: 90},
    7: {x: 45, y: -45, z: 90},
    8: {x: -135, y: 45, z: 90}
  },
  Uvs: {
    d1: [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.2222, 0),
      new THREE.Vector2(0.1111, 1),
    ],
    d2: [
      new THREE.Vector2(0.2222, 0),
      new THREE.Vector2(0.4444, 0),
      new THREE.Vector2(0.3333, 1)
    ],
    d3: [
      new THREE.Vector2(0.4444, 0),
      new THREE.Vector2(0.6666, 0),
      new THREE.Vector2(0.5555, 1),
    ],
    d4: [
      new THREE.Vector2(0.6666, 0),
      new THREE.Vector2(0.8888, 0),
      new THREE.Vector2(0.7777, 1),
    ],
    d5: [
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0.7777, 1),
      new THREE.Vector2(0.8888, 0),
    ],
    d6: [
      new THREE.Vector2(0.7777, 1),
      new THREE.Vector2(0.5555, 1),
      new THREE.Vector2(0.6666, 0),
    ],
    d7: [
      new THREE.Vector2(0.5555, 1),
      new THREE.Vector2(0.3333, 1),
      new THREE.Vector2(0.4444, 0),
    ],
    d8: [
      new THREE.Vector2(0.3333, 1),
      new THREE.Vector2(0.1111, 1),
      new THREE.Vector2(0.2222, 0),
    ]
  }
};


module.exports = modelData;