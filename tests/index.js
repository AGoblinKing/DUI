require('../models/Entity');

var assert = require('assert');

var newEntity = new Entity({x: 2, y: 5});

console.log("<Entity Unit Tests>");
assert.equal(newEntity.x, 2, "Entity.x is set");
assert.notEqual(newEntity.x, 0, "Entity x is not original value");
