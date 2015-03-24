var THREE = require('three');

var modelData = {
  createMesh: function (color) {
    var geometry = new THREE.BoxGeometry(1.15,1.15,1.15);
    geometry.faceVertexUvs[0][0] = modelData.Uvs['d1-1']; // 1
    geometry.faceVertexUvs[0][1] = modelData.Uvs['d1-2'];
    geometry.faceVertexUvs[0][2] = modelData.Uvs['d6-1']; // 6
    geometry.faceVertexUvs[0][3] = modelData.Uvs['d6-2'];
    geometry.faceVertexUvs[0][4] = modelData.Uvs['d2-1']; // 2
    geometry.faceVertexUvs[0][5] = modelData.Uvs['d2-2'];
    geometry.faceVertexUvs[0][6] = modelData.Uvs['d5-1']; // 5
    geometry.faceVertexUvs[0][7] = modelData.Uvs['d5-2'];
    geometry.faceVertexUvs[0][8] = modelData.Uvs['d3-1']; // 3
    geometry.faceVertexUvs[0][9] = modelData.Uvs['d3-2'];
    geometry.faceVertexUvs[0][10] = modelData.Uvs['d4-1']; // 4
    geometry.faceVertexUvs[0][11] = modelData.Uvs['d4-2'];

    return new THREE.Mesh(
      geometry,
      new THREE.MeshLambertMaterial({
        color: color,
        shading: THREE.FlatShading,
        alphaMap: THREE.ImageUtils.loadTexture('/src/models/d6.png'),
        // wireframe: true
      })
    );
  },
  faceAngles: {
    1: {x: 90, y: 0, z: 90},
    2: {x: 0, y: 90, z: 90},
    3: {x: 0, y: 0, z: 90},
    4: {x: 180, y: 0, z: 90},
    5: {x: 0, y: -90, z: 90},
    6: {x: -90, y: 0, z: 90},
  },
  Uvs: {
    'd1-1': [
      new THREE.Vector2(0, 0.5),
      new THREE.Vector2(0.25, 0.5),
      new THREE.Vector2(0, 1),
    ],
    'd1-2': [
      new THREE.Vector2(0.25, 0.5),
      new THREE.Vector2(0.25, 1),
      new THREE.Vector2(0, 1),
    ],
    'd2-1': [
      new THREE.Vector2(0.25, 0.5),
      new THREE.Vector2(0.5, 0.5),
      new THREE.Vector2(0.25, 1),
    ],
    'd2-2': [
      new THREE.Vector2(0.5, 0.5),
      new THREE.Vector2(0.5, 1),
      new THREE.Vector2(0.25, 1),
    ],
    'd3-1': [
      new THREE.Vector2(0.5, 0.5),
      new THREE.Vector2(0.75, 0.5),
      new THREE.Vector2(0.5, 1),
    ],
    'd3-2': [
      new THREE.Vector2(0.75, 0.5),
      new THREE.Vector2(0.75, 1),
      new THREE.Vector2(0.5, 1),
    ],
    'd4-1': [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.25, 0),
      new THREE.Vector2(0, 0.5),
    ],
    'd4-2': [
      new THREE.Vector2(0.25, 0),
      new THREE.Vector2(0.25, 0.5),
      new THREE.Vector2(0, 0.5),
    ],
    'd5-1': [
      new THREE.Vector2(0.25, 0),
      new THREE.Vector2(0.5, 0),
      new THREE.Vector2(0.25, 0.5)
    ],
    'd5-2': [
      new THREE.Vector2(0.5, 0),
      new THREE.Vector2(0.5, 0.5),
      new THREE.Vector2(0.25, 0.5),
    ],
    'd6-1': [
      new THREE.Vector2(0.5, 0),
      new THREE.Vector2(0.75, 0),
      new THREE.Vector2(0.5, 0.5)
    ],
    'd6-2': [
      new THREE.Vector2(0.75, 0),
      new THREE.Vector2(0.75, 0.5),
      new THREE.Vector2(0.5, 0.5),
    ],
    d3: [
      new THREE.Vector2(0.6, 1),
      new THREE.Vector2(0.8, 0),
      new THREE.Vector2(1, 1),
      
    ],
    d4: [
      new THREE.Vector2(0.6, 1),
      new THREE.Vector2(0.2, 1),
      new THREE.Vector2(0.4, 0),
    ]
  }
};


module.exports = modelData;