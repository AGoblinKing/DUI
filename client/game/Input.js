 def('Keyboard', {
    init: function() {
        var self = this;
        $(window).bind('keydown', function(e) {
            if(!self.disabled) {
                self[String.fromCharCode(e.which)] = true;
                self[e.which] = true;
            }
        });
        $(window).bind('keyup', function(e) {
            self[String.fromCharCode(e.which)] = undefined;
            self[e.which] = undefined;
        });
    },
    disabled: false
});

def('Mouse', {
    extend: THREE.Vector2,
    init: function() {
        THREE.Vector2.call(this, 0, 100000);
        var self = this;
        $(window).bind('mousemove', function(e) {
            self.x = e.pageX/window.innerWidth*2-1;
            self.y = -e.pageY/window.innerHeight*2+1;
        });
        $(window).bind('mousedown', function(e) {
           self.down = true;
        });
        $(window).bind('mouseup', function(e){
           self.down = false;
        });
    },
    down: false,
    intersects: [],
    projector: new THREE.Projector(),
    update: function() {
        var vector = new THREE.Vector3(this.x, this.y, .5 );
	    this.projector.unprojectVector(vector, Game.scene.camera );
	    var ray = new THREE.Ray(Game.scene.camera.position, vector.subSelf( Game.scene.camera.position ).normalize() );
	    var intersects = ray.intersectScene(Game.scene);
        _(_(this.intersects).without(intersects)).each(function(item, iter) {
            if(item.object['mouseout']) item.object.mouseout(iter, this);
        });
	    this.intersects = intersects;
        _(this.intersects).each(function(item, iter) {
            if(item.object['mouseover']) item.object.mouseover(iter, this);
        });
    }
});
            
 