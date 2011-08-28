def('FixedCamera', {
    extend: THREE.Camera,
    init: function(options) {
        THREE.Camera.call(this, config.viewAngle, config.aspectRatio, config.near, config.far);
        if(options){
            this.zoom = options.zoom === undefined ? this.zoom : options.zoom;
            this.angle = options.angle === undefined ? this.angle : options.angle;
        }
        this.resetCamera();
    },
    zoom: 300,
    angle: {
        x: 45,
        y: 45
    },
    setAngle: function(amount) {
        this.angle = amount;
        this.resetCamera();
    },
    resetCamera: function() {
        this.position.x  = this.target.position.x + Math.cos(this.angle.x)*this.zoom;
        this.position.z  = this.target.position.z + Math.cos(this.angle.x)*this.zoom;
        this.position.y  = this.target.position.y + Math.sin(this.angle.y)*this.zoom;
    },
    setZoom: function(amount) {
        this.zoom = amount;
        this.resetCamera();
    },
    update: function(parentMatrixWorld, forceUpdate, camera) {
        var x=0, z=0;
        if(Game.keys['W'] == true) {
            x -= 1;
        }
        if(Game.keys['S'] == true) {
            x += 1;
        }
        if(Game.keys['A'] == true) {
            z += 1;
        }
        if(Game.keys['D'] == true) {
            z -= 1;
        }
        
        var xnew = x * Math.cos(this.angle) - z * Math.sin(this.angle)
        var znew = z * Math.cos(this.angle) + x * Math.sin(this.angle)
        this.target.position.x += xnew;
        this.position.x +=xnew;
        this.target.position.z += znew;
        this.position.z += znew;
        THREE.Camera.prototype.update.call(this, parentMatrixWorld, forceUpdate, camera);
    }
});

def('ThirdPersonCamera', {
    extend: THREE.Camera,
    init: function(options) {
        THREE.Camera.call(this, config.viewAngle, config.aspectRatio, config.near, config.far);
        this.position.z = 300;
        this.zoom = 300;
        this.lat = 0;
        this.lon = 0;
        this.rotSpeed = .01;
        this.mouse = new THREE.Vector2(-1, -1);
    },
    update: function(parentMatrixWorld, forceUpdate, camera) {
        if(this.mouse.x != -1) {
            this.lon += (Game.mouse.x - window.innerWidth/2)*this.rotSpeed;
            this.lat += (Game.mouse.y - window.innerHeight/2)*this.rotSpeed;
        }
        this.lat = Math.max(-85,Math.min(85,this.lat));
        this.phi = (90-this.lat)*Math.PI/180;
        this.theta=this.lon*Math.PI/180;

        this.position.x=this.zoom*(Math.sin(this.phi)*Math.cos(this.theta))+this.target.position.x;
        this.position.y=this.zoom*Math.cos(this.phi)+this.target.position.y;
        this.position.z = this.zoom*(Math.sin(this.phi)*Math.sin(this.theta))+this.target.position.z;
        this.mouse.x = Game.mouse.x;
        this.mouse.y = Game.mouse.y;
        THREE.Camera.prototype.update.call(this, parentMatrixWorld, forceUpdate, camera);
    }
});
