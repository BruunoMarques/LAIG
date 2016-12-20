function MyScoreBoard(scene, dimX, dimY, partsX, partsY)
{
	CGFobject.call(this,scene);
	this.scene = scene;
	this.dimX = dimX; //plane length along the x axis
	this.dimY = dimY; //plane length along the y axis
	this.partsX = partsX; //number of divisions along the x axis
	this.partsY = partsY; //number of division along the y axis
	this.controlPoints = this.getControlPoints();

	this.patch = new MyPatch(this.scene,1,1,partsX,partsY,this.controlPoints);
	this.cube = new MyCube(this.scene,2);
};

MyScoreBoard.prototype = Object.create(CGFobject.prototype);
MyScoreBoard.prototype.constructor=MyScoreBoard;

MyScoreBoard.prototype.getControlPoints = function () {

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


MyScoreBoard.prototype.display = function ()
{
	this.scene.pushMatrix();
	//this.marble.apply();
	this.scene.translate(20,5,43);
	this.scene.rotate(Math.PI/4,0,1,0);
	this.scene.rotate(-Math.PI/15,1,0,0);
	this.scene.scale(15,23,0.5);
	this.cube.display();
	this.scene.popMatrix();
};
