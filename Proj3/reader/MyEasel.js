function MyEasel(scene) {
	CGFobject.call(this, scene);

	this.scene = scene;

	this.initBuffers();
};

MyEasel.prototype = Object.create(CGFobject.prototype);
MyEasel.prototype.constructor=MyEasel;

MyEasel.prototype.initBuffers = function() {

	this.cube = new MyCube(this.scene,1);
}

MyEasel.prototype.display = function(){
	this.scene.pushMatrix();
	this.scene.translate(0,2,1);
	this.scene.rotate(-Math.PI/10,1,0,0);
	this.scene.scale(27,1.5,4);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,2);
	this.scene.rotate(-Math.PI/15,0,0,1);
	this.scene.rotate(-Math.PI/15,1,0,0);
	this.scene.scale(3,35,1);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(23.5,0,2);
	this.scene.rotate(Math.PI/14,0,0,1);
	this.scene.rotate(-Math.PI/15,1,0,0);
	this.scene.scale(3,35,1);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(6,25	,-3.5);
	this.scene.rotate(-Math.PI/15,1,0,0);
	this.scene.scale(13,3,1);
	this.cube.display();
	this.scene.popMatrix();
/*
	this.scene.pushMatrix();
	this.scene.translate(-3.50,-3,8);
	this.scene.rotate(Math.PI/2,0,1,0);
	this.cube.display();
	this.scene.popMatrix();*/


}
