def('Cube', {
    extend: THREE.Mesh,
    init: function(config) {
        THREE.Mesh.call(this, new THREE.CubeGeometry(config.cubeWidth, config.cubeWidth, config.cubeWidth), [materials.solid, materials.outline]);
        this.setProperties(config);
    },
    mouseover: function(iter) {
        if(iter == 0) this.materials[0].color = 0x000000; 
    },
    mouseout: function(iter) {
        this.materials[0].color = 0xFFFFFF;
    },
    setProperties: function(config) {
        this.position.x = config.x !== undefined ? config.x : 0;
        this.position.y = config.y !== undefined ? config.y : 0;
        this.updateFunc = config.update;
    },
    updateProperties: function(config) {
        if(this.updateFunc) {
            var self = this;
            this.updateFunc(function(config) {
                self.setProperties(config);
            });
        }
    }
});
