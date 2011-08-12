var Consumable = def({
    update: function(callback) {
        callback(this.client);  
    },
    get client: function() {
        return _({'update':'update'}).extend(_(this.clients).map(function(val, key, this) {
            return this[val];
        }));
    },
    clients: [] 
});

var Vector = def({
    x: 0,
    y: 0
});

var Entity = def({
    mixins: [Vector, Consumable],
    clients: {'x':'x', 'y':'y'}
});

var Collection = def({
    mixins: [Consumable],
    items: [],
    get citems: function() {
        return _(this.items).map(function(val) {
            return val.client;
        });
    },
    update: function(callback) {
       callback(this.items)
    },
    clients: {'items': 'citems'}
});


exports = {
    "Consumable": Consumable,
    "Vector": Vector,
    "Entity": Entity,
    "Collection": Collection
};








