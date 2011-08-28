
_.mixin({
   has: function(object, key, func) {
       if(object[key] !== undefined)  {
           func.call(object, object[key]);
           return true;
       }
   },
   clamp: function(num, max, min) {
       return Math.min(Math.Max(num, max), min);
   }
});

var def = function(proto) {
    var tmp = function(config) {
        this.init(config);
        _(this).extend(config);
    };

    tmp.prototype.init = function(){};
    _(proto).has('mixins', function(mixins) { 
        _(mixins).each(function(val) {
            _(tmp.prototype).extend(val.prototype)
        })
    });
    _(proto).has('extend', function(val) {
        _(tmp.prototype).extend(val.prototype);
    });
    _(tmp.prototype).extend(proto);
    if(proto.singleton) {
        return new tmp();
    }
    return tmp;
};