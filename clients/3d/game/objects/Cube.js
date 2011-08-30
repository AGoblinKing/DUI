def('Cube', {
    extend: THREE.Mesh,
    init: function(config) {
        THREE.Mesh.call(this, new THREE.CubeGeometry(config.cubeWidth, config.cubeWidth, config.cubeWidth), [materials.solid, materials.outline]);
        this.setProperties(config);
    },
    mouseover: function(iter) {
        this.oldColor = this.materials[1].color;
        this.materials[1].color = 0xFFFFFF; 
    },
    mouseout: function(iter) {
        this.materials[1].color = this.oldColor;
    },
    setProperties: function(config) {
        this.position.x = config.x !== undefined ? config.x * config.cubeWidth : 0;
        this.position.z = config.y !== undefined ? config.y * config.cubeWidth : 0;
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