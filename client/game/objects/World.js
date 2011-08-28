def('World', {
    extend: THREE.Object3D,
    init: function(config) {
        THREE.Object3D.call(this, config);
        this.cubeWidth = 50;
        this.cubeX = 10;
        this.cubeY = 10;
        this.generate();
    },
    map: {},
    generate: function() {
        var mats = [
            textures.terrain[3],
            textures.terrain[3],
            textures.terrain[0],
            textures.terrain[1],
            textures.terrain[3],
            textures.terrain[3]
        ];
        for(var x = 0; x < this.cubeX; x++) {
            this.map[x] = {};
            for(var y = 0; y < this.cubeY; y++) {
                this.map[x][y] = {};
                //var obj = new THREE.Mesh(new THREE.CubeGeometry(this.cubeWidth, this.cubeWidth, this.cubeWidth), [materials.solid, materials.outline]);
                var obj = new Cube({cubeWidth: this.cubeWidth, mats: mats});
                obj.position = new THREE.Vector3(x*this.cubeWidth, 0, y*this.cubeWidth);
                this.addChild(obj);
                this.map[x][y][0] = obj;
            }
        }
    }
});