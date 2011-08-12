var Consumable = def({
    update: function(callback) {
        callback(this.client);  
    },
    get client() {
        return {'update':'update'};
        return _({'update':'update'}).extend(_(this.clients).map(function(val, key) {
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
    get citems() {
        return _(this.items).map(function(val) {
            return val.client;
        });
    },
    update: function(callback) {
       callback(this.items)
    },
    clients: {'items': 'citems'}
});


module.exports = {
    "Consumable": Consumable,
    "Vector": Vector,
    "Entity": Entity,
    "Collection": Collection
};








