def('GameScene', {
    extend: THREE.Scene,
    init: function() {
        THREE.Scene.call(this);
        this.camera = new FixedCamera();
    }
});