def('DUI.State', {
    extend: Jxl.State,
    init: function(config) {
        Jxl.State.prototype.init.call(this, config);
        var self = this;
        DNode.connect(function(world) {
            self.loadWorld(world);
        });
    },
    loadWorld: function(world) {
        this.world = world;
        var self = this;
        _(world.items).each(function(item) {
            switch(item.type) {
                default: 
                    item.x = item.x*26;
                    item.y = item.z*26;
                    var spr = new Jxl.Sprite(item); 
                    spr.border.visible = true;
                    spr.border.color = 0x000;
                    spr.createGraphic(25, 25, 0xFFFF0000);
                    self.add(spr);
            }
        });
    }
})
