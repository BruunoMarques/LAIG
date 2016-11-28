/* Construtor da parte lateral do cilindro */
function MyCube(scene, dim) {
    CGFobject.call(this, scene);

    this.scene = scene;
    this.dim = dim;

    this.initBuffers();
}
MyCube.prototype = Object.create(CGFobject.prototype);
MyCube.prototype.constructor = MyCube;

/* Inicializa as caracteristicas do body do cilindro */
MyCube.prototype.initBuffers = function() {
  this.square = new MyRectangle(this.scene,0,0,this.dim,this.dim);
}

MyCube.prototype.display = function(){
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2,1,0,0);
    this.square.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,0,this.dim);
    this.square.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI/2,0,1,0);
    this.square.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2,0,1,0);
    this.scene.translate(-this.dim,0,this.dim);
    this.square.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.translate(0,-this.dim,this.dim);
    this.square.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI,0,1,0);
    this.scene.translate(-this.dim,0,0);
    this.square.display();
    this.scene.popMatrix();

}
