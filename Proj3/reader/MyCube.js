/* Construtor da parte lateral do cilindro */
function MyCube(scene, x, y, z, dim) {
    CGFobject.call(this, scene);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.dim = dim;

    this.initBuffers();
}
MyCube.prototype = Object.create(CGFobject.prototype);
MyCube.prototype.constructor = MyCube;

/* Inicializa as caracteristicas do body do cilindro */
MyCube.prototype.initBuffers = function() {
  this.square = MyRectangle(this.scene,0,this.dim,0,this.dim);
}

MyCube.prototype.display = function(){
    this.scene.pushMatrix();
    this.scene.translate(0,0,this.height);
    this.square.display();
    this.scene.popMatrix();

}
