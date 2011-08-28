function loadSpriteMap(path, dimensions, callback) {
    var spriteTextures = [];
    var image = new Image();
    image.onload = function() {
        for(var y = 0; y < image.height; y += dimensions.y) {
            for(var x = 0; x < image.width; x += dimensions.x) {
                var tmp = $('<canvas/>')[0];
                var ctx = tmp.getContext('2d');
                tmp.width = dimensions.x;
                tmp.height = dimensions.y;
                ctx.drawImage(image, x, y, dimensions.x, dimensions.y);
                var img = $('<img/>')[0];
                img.src = tmp.toDataURL();
                spriteTextures.push(new THREE.Texture(img));
            }
        }
        if(callback) callback(spriteTextures);
    };
    image.src = path;
}
