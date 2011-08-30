var _ = global._= require('./underscore')._;

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
function generatePath(ns) { 
    var target = global;
    if(ns.length != 0) {
        _(ns).each(function(item) {
            if(target[item] === undefined)
                target[item] = {};
            target = target[item];
        });
    }
    return target;
}
var def = global.def = function(name, proto) {
    var DefClass = function(config) {
        this.init(config);
        if(config !== undefined) {
            _(this).extend(config);
        }
    };
    DefClass.prototype.init = function(){};
    _(proto).has('extend', function(val) {
        DefClass.prototype = new val();
        DefClass.prototype.constructor = DefClass;
    });
    _(proto).has('mixins', function(mixins) { 
        _(mixins).each(function(val) {
            _(DefClass.prototype).extend(val.prototype)
        });
    });
    _(proto).has('statics', function(statics){
        _(DefClass).extend(statics);
    });
    _(DefClass.prototype).extend(proto);
    var ns = name.split('.');
    name = ns.pop();
    var ref = generatePath(ns);
    if(proto.singleton) {
        ref[name] = new DefClass();
    } else {
        ref[name] = DefClass;
    }
    return ref[name];
};