def('DUI.Consumable', {
    update: function(callback) {
        callback(this.client());
    },
    beforeClient: function(){},
    client: function() {
        this.beforeClient();
        var self = this,
            tmp = {};
        _(this.clients).each(function(val, key) {
            if(_(self[val]).isFunction()) {
                tmp[key] = self[val]();
            } else {
                tmp[key] = self[val];
            }
        });
        return _({'update':this['update']}).extend(tmp);
    },
    clients: {}
});

def('DUI.Vector', {
    x: 0,
    y: 0,
    z: 0
});

def('DUI.Entity', {
    mixins: [DUI.Vector, DUI.Consumable],
    type: 'cube',
    clients: {'x':'x', 'z':'z', 'y':'y', 'type':'type'},
    update: function(callback, ent) {
        this.x = ent.x;
        this.y = ent.y;
        this.z = ent.z;
        callback(this.client());
    }
});

def('DUI.Collection', {
    mixins: [DUI.Consumable],
    items: [],
    citems: function() {
      return _(this.items).map(function(val) {
          return val.client();
       });
    },
    add: function(item) {
        this.items.push(item);  
    },
    clients: {'items': 'citems'}
});
