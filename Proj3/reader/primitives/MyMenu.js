function MyMenu(scene, dimX, dimY, partsX, partsY)
{
	CGFobject.call(this,scene);
	this.scene = scene;
	this.dimX = dimX; //plane length along the x axis
	this.dimY = dimY; //plane length along the y axis
	this.partsX = partsX; //number of divisions along the x axis
	this.partsY = partsY; //number of division along the y axis
	this.controlPoints = this.getControlPoints();
/*
	this.marble = new CGFappearance(this.scene);
	this.marble.setAmbient(1,1,1,0.1);
	this.marble.setDiffuse(0.5,0.5,0.5,0.1);
	this.marble.setSpecular(0.5,0.5,0.5,0.1);
	this.marble.setShininess(100);
	this.marble.loadTexture("./resources/images/canvas.jpg");
*/
	this.play1 = new CGFappearance(this.scene);
	this.play1.setAmbient(1,1,1,0.1);
	this.play1.setDiffuse(0.5,0.5,0.5,0.1);
	this.play1.setSpecular(0.5,0.5,0.5,0.1);
	this.play1.setShininess(100);
	this.play1.loadTexture("./resources/images/playbtn.png");

	this.play2 = new CGFappearance(this.scene);
	this.play2.setAmbient(1,1,1,0.1);
	this.play2.setDiffuse(0.5,0.5,0.5,0.1);
	this.play2.setSpecular(0.5,0.5,0.5,0.1);
	this.play2.setShininess(100);
	this.play2.loadTexture("./resources/images/turntime.png");

	this.play3 = new CGFappearance(this.scene);
	this.play3.setAmbient(1,1,1,0.1);
	this.play3.setDiffuse(0.5,0.5,0.5,0.1);
	this.play3.setSpecular(0.5,0.5,0.5,0.1);
	this.play3.setShininess(100);
	this.play3.loadTexture("./resources/images/15s.png");

	this.play4 = new CGFappearance(this.scene);
	this.play4.setAmbient(1,1,1,0.1);
	this.play4.setDiffuse(0.5,0.5,0.5,0.1);
	this.play4.setSpecular(0.5,0.5,0.5,0.1);
	this.play4.setShininess(100);
	this.play4.loadTexture("./resources/images/30s.png");

	this.play5 = new CGFappearance(this.scene);
	this.play5.setAmbient(1,1,1,0.1);
	this.play5.setDiffuse(0.5,0.5,0.5,0.1);
	this.play5.setSpecular(0.5,0.5,0.5,0.1);
	this.play5.setShininess(100);
	this.play5.loadTexture("./resources/images/background.png");


	this.patch = new MyPatch(this.scene,1,1,partsX,partsY,this.controlPoints);
	this.cube = new MyCube(this.scene,2);
};

MyMenu.prototype = Object.create(CGFobject.prototype);
MyMenu.prototype.constructor=MyMenu;


MyMenu.prototype.getControlPoints = function () {

	var controlPoints = [];

	var halfDimX = this.dimX / 2;
	var halfDimY = this.dimY / 2;

	//For U = 0
	controlPoints.push([-halfDimX, -halfDimY, 0]);
	controlPoints.push([-halfDimX, halfDimY, 0]);

	//For U = 1
	controlPoints.push([halfDimX, -halfDimY, 0]);
	controlPoints.push([halfDimX, halfDimY, 0]);

	return controlPoints;
};


MyMenu.prototype.display = function ()
{/*
	this.scene.pushMatrix();
	this.marble.apply();
	this.scene.translate(14,5,49);
	this.scene.rotate(Math.PI/4,0,1,0);
	this.scene.rotate(-Math.PI/15,1,0,0);
	this.scene.scale(23,15,0.5);
	this.cube.display();
	this.scene.popMatrix();*/

	this.scene.pushMatrix();
	this.scene.translate(50,30,-20);
	this.scene.scale(5,5,5);
	this.play1.apply();
	this.patch.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(50,20,-20);
	this.scene.scale(4,1,2);
	this.play2.apply();
	this.patch.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(40,15,-20);
	this.scene.scale(3,3,4.5);
	this.play3.apply();
	this.patch.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(60,15,-20);
	this.scene.scale(3,3,4.5);
	this.play4.apply();
	this.patch.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(50,20,-20.1);
	this.scene.scale(25,20,4.5);
	this.play5.apply();
	this.patch.display();
	this.scene.popMatrix();
};
