def('Game', {
    extend: THREE.WebGLRenderer,
    init: function(config) {
        THREE.WebGLRenderer.call(this);
        this.updates = [];
        this.setSize(window.innerWidth, window.innerHeight);
        this.autoClear = false;
        this.setClearColorHex(0x0000CC, .5);
    },
    keys: new Keyboard(),
    singleton: true,
    mouse: new Mouse(),
    start: function() {
        this.date = new Date().getTime();
        var self = this;
        //blearg only way I can use requestAnimationFrame
        var update = function() {
            var tmp = self.date;
            self.date = new Date().getTime();
            requestAnimationFrame(update, self.domElement);
            self.delta = self.date - tmp;
            self.mouse.update();
            self.clear();
            if(self.scene.skyCamera)self.render(self.scene.skyScene, self.scene.skyCamera);
            self.render(self.scene, self.scene.camera);
        }
        update();
    },
    setWorld: function(world) {
        var self = this;
        _(world.items).each(function(item) {
            switch(item.type) {
                default: 
                    item.cubeWidth = 100;
                    self.scene.addChild(new Cube(item)); 
            }
        });
    }
});