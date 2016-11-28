/* Construtor da parte lateral do cilindro */
function MyCube(scene, x, y, z, dim) {
    CGFobject.call(this, scene);

    this.scene = scene;
    this.topo = topo;
    this.base = base;
    this.height = height;
    this.slices = slices;
    this.stacks = stacks;
    this.diference = (this.base - this.topo) / this.stacks;
    this.circleTop;
    this.circleBas;
    this.body;

    this.initBuffers();
}
MyCube.prototype = Object.create(CGFobject.prototype);
MyCube.prototype.constructor = MyCube;

/* Inicializa as caracteristicas do body do cilindro */
MyCube.prototype.initBuffers = function() {
}

MyCube.prototype.display = function(){
    this.scene.pushMatrix();
    this.scene.translate(0,0,this.height);
    this.circleTop.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI,1,0,0);
    this.circleBas.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.body.display();
    this.scene.popMatrix();
}
