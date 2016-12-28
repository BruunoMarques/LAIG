/* Construtor do retangulo */
function MyCell(scene, id, x, y) {
	CGFobject.call(this, scene);

	this.scene = scene;
	this.id = id;
	this.x = x;
	this.y = y;
	this.square = new MyRectangle(this.scene,0,0,2.5,2.5);
	this.positions = [this.x/2.5,this.y/2.5];
	console.log(this.positions);
	this.initBuffers();
};

MyCell.prototype = Object.create(CGFobject.prototype);
MyCell.prototype.constructor=MyCell;

/* Inicializa as caracteristicas do retangulo */
MyCell.prototype.display = function(id,texture) {
	
	
		if(id == this.id){
		texture.apply();
		console.log(this.positions);
		}

	this.scene.pushMatrix();
	this.scene.rotate(-Math.PI/2,1,0,0);
	this.scene.translate(this.x,this.y,0);
	
	this.scene.registerForPick(this.id, this);
	
	this.square.display();
	this.scene.popMatrix();
	
	
		if (id == this.id){
		texture.apply();
		}

};
