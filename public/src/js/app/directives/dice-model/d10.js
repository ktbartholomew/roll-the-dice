var THREE = require('three');
window.THREE = THREE;

var modelData = {
  createMesh: function (color) {
    var vertices = [
      0,0.866,0,
      Math.sin(Math.PI * 0), 0, Math.cos(Math.PI * 0),
      Math.sin(Math.PI * 0.4), 0, Math.cos(Math.PI * 0.4),
      Math.sin(Math.PI * 0.8), 0, Math.cos(Math.PI * 0.8),
      Math.sin(Math.PI * 1.2), 0, Math.cos(Math.PI * 1.2),
      Math.sin(Math.PI * 1.6), 0, Math.cos(Math.PI * 1.6),
      Math.sin(Math.PI * 2), 0, Math.cos(Math.PI * 2),
      0, -0.866, 0
    ];
    
    var indices = [
      0,1,2,
      0,2,3,
      0,3,4,
      0,4,5,
      0,5,6,
      2,1,7,
      3,2,7,
      4,3,7,
      5,4,7,
      6,5,7
    ];
    var geometry = new THREE.PolyhedronGeometry(vertices, indices, 1, 0);
    geometry.faceVertexUvs[0][0] = modelData.Uvs.d1; // 10
    geometry.faceVertexUvs[0][1] = modelData.Uvs.d7; // 8
    geometry.faceVertexUvs[0][2] = modelData.Uvs.d3; // 20
    geometry.faceVertexUvs[0][3] = modelData.Uvs.d5; // 2
    geometry.faceVertexUvs[0][4] = modelData.Uvs.d9; // 12
    geometry.faceVertexUvs[0][5] = modelData.Uvs.d8; // 16
    geometry.faceVertexUvs[0][6] = modelData.Uvs.d2; // 17
    geometry.faceVertexUvs[0][7] = modelData.Uvs.d6; // 15
    geometry.faceVertexUvs[0][8] = modelData.Uvs.d4; // 18
    geometry.faceVertexUvs[0][9] = modelData.Uvs.d10; // 14

    return new THREE.Mesh(
      geometry,
      new THREE.MeshLambertMaterial({
        color: color,
        shading: THREE.FlatShading,
        alphaMap: THREE.ImageUtils.loadTexture('/src/models/d10.png'),
        // wireframe: true
      })
    );
  },
  faceAngles: {
    1: {x: 24, y: 324, z: 0},
    2: {x: 204, y: 72, z: 0},
    3: {x: 24, y: 180, z: 0},
    4: {x: 204, y: 288, z: 0},
    5: {x: 24, y: 108, z: 0},
    6: {x: 204, y: 0, z: 0},
    7: {x: 24, y: 252, z: 0},
    8: {x: 204, y: 144, z: 0},
    9: {x: 24, y: 324, z: 0},
    10: {x: 204, y: 216, z: 0}
  },
  Uvs: {
    d1: [
      new THREE.Vector2(0/256, 1 - 64/256),
      new THREE.Vector2(60/256, 1 - 64/256),
      new THREE.Vector2(30/256, 1 - 0/256)
    ],
    d2: [
      new THREE.Vector2(120/256, 1 - 64/256),
      new THREE.Vector2(90/256, 1 - 0/256),
      new THREE.Vector2(60/256, 1 - 64/256)
    ],
    d3: [
      new THREE.Vector2(120/256, 1 - 64/256),
      new THREE.Vector2(180/256, 1 - 64/256),
      new THREE.Vector2(150/256, 1 - 0/256)
    ],
    d4: [
      new THREE.Vector2(240/256, 1 - 64/256),
      new THREE.Vector2(210/256, 1 - 0/256),
      new THREE.Vector2(180/256, 1 - 64/256)
    ],
    d5: [
      new THREE.Vector2(240/256, 1 - 64/256),
      new THREE.Vector2(180/256, 1 - 64/256),
      new THREE.Vector2(210/256, 1 - 128/256)
    ],
    d6: [
      new THREE.Vector2(120/256, 1 - 64/256),
      new THREE.Vector2(150/256, 1 - 128/256),
      new THREE.Vector2(180/256, 1 - 64/256)
    ],
    d7: [
      new THREE.Vector2(120/256, 1 - 64/256),
      new THREE.Vector2(60/256, 1 - 64/256),
      new THREE.Vector2(90/256, 1 - 128/256)
    ],
    d8: [
      new THREE.Vector2(0/256, 1 - 64/256),
      new THREE.Vector2(30/256, 1 - 128/256),
      new THREE.Vector2(60/256, 1 - 64/256)
    ],
    d9: [
      new THREE.Vector2(30/256, 1 - 128/256),
      new THREE.Vector2(90/256, 1 - 128/256),
      new THREE.Vector2(60/256, 1 - 64/256)
    ],
    d10: [
      new THREE.Vector2(150/256, 1 - 128/256),
      new THREE.Vector2(120/256, 1 - 64/256),
      new THREE.Vector2(90/256, 1 - 128/256)
    ],
  }
};


module.exports = modelData;