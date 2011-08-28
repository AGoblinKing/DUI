var _ = global._= require('./underscore')._;

_.mixin({
   has: function(object, key, func) {
        if(object[key] !== undefined) func.call(object, object[key]);   
   }
});

var def = global.def = function(proto) {
    var tmp = function(config) {
        _(this).extend(config); 
        this.init();
    };
    tmp.prototype.init = function(){};
    _(proto).has('mixins', function(mixins) { 
        _(mixins).each(function(val) {
            _(tmp).extend(val.prototype)
        })
    });
    _(proto).has('extend', function(val) {
        _(tmp).extend(val.prototype);
    });
    _(tmp.prototype).extend(proto);
    return tmp;
};