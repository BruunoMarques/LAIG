function MyScoreBoard(scene, dimX, dimY, partsX, partsY, red, white)
{
	CGFobject.call(this,scene);
	this.scene = scene;
	this.dimX = dimX; //plane length along the x axis
	this.dimY = dimY; //plane length along the y axis
	this.partsX = partsX; //number of divisions along the x axis
	this.partsY = partsY; //number of division along the y axis
	this.red = red;
	this.white = white;
	this.controlPoints = this.getControlPoints();

	this.marble = new CGFappearance(this.scene);
	this.marble.setAmbient(1,1,1,0.1);
	this.marble.setDiffuse(0.5,0.5,0.5,0.1);
	this.marble.setSpecular(0.5,0.5,0.5,0.1);
	this.marble.setShininess(100);
	this.marble.loadTexture("./resources/images/scoreboard.jpg");

	this.zero = new CGFappearance(this.scene);
	this.zero.setAmbient(1,1,1,0.1);
	this.zero.setDiffuse(0.5,0.5,0.5,0.1);
	this.zero.setSpecular(0.5,0.5,0.5,0.1);
	this.zero.setShininess(100);
	this.zero.loadTexture("./resources/images/zero.png");

	this.um = new CGFappearance(this.scene);
	this.um.setAmbient(1,1,1,0.1);
	this.um.setDiffuse(0.5,0.5,0.5,0.1);
	this.um.setSpecular(0.5,0.5,0.5,0.1);
	this.um.setShininess(100);
	this.um.loadTexture("./resources/images/um.png");

	this.dois = new CGFappearance(this.scene);
	this.dois.setAmbient(1,1,1,0.1);
	this.dois.setDiffuse(0.5,0.5,0.5,0.1);
	this.dois.setSpecular(0.5,0.5,0.5,0.1);
	this.dois.setShininess(100);
	this.dois.loadTexture("./resources/images/dois.png");

	this.tres = new CGFappearance(this.scene);
	this.tres.setAmbient(1,1,1,0.1);
	this.tres.setDiffuse(0.5,0.5,0.5,0.1);
	this.tres.setSpecular(0.5,0.5,0.5,0.1);
	this.tres.setShininess(100);
	this.tres.loadTexture("./resources/images/tres.png");

	this.quatro = new CGFappearance(this.scene);
	this.quatro.setAmbient(1,1,1,0.1);
	this.quatro.setDiffuse(0.5,0.5,0.5,0.1);
	this.quatro.setSpecular(0.5,0.5,0.5,0.1);
	this.quatro.setShininess(100);
	this.quatro.loadTexture("./resources/images/quatro.png");

	this.cinco = new CGFappearance(this.scene);
	this.cinco.setAmbient(1,1,1,0.1);
	this.cinco.setDiffuse(0.5,0.5,0.5,0.1);
	this.cinco.setSpecular(0.5,0.5,0.5,0.1);
	this.cinco.setShininess(100);
	this.cinco.loadTexture("./resources/images/cinco.png");

	this.seis = new CGFappearance(this.scene);
	this.seis.setAmbient(1,1,1,0.1);
	this.seis.setDiffuse(0.5,0.5,0.5,0.1);
	this.seis.setSpecular(0.5,0.5,0.5,0.1);
	this.seis.setShininess(100);
	this.seis.loadTexture("./resources/images/seis.png");

	this.sete = new CGFappearance(this.scene);
	this.sete.setAmbient(1,1,1,0.1);
	this.sete.setDiffuse(0.5,0.5,0.5,0.1);
	this.sete.setSpecular(0.5,0.5,0.5,0.1);
	this.sete.setShininess(100);
	this.sete.loadTexture("./resources/images/sete.png");

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
	this.marble.apply();
	this.scene.translate(14,5,49);
	this.scene.rotate(Math.PI/4,0,1,0);
	this.scene.rotate(-Math.PI/15,1,0,0);
	this.scene.scale(23,15,0.5);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(21.3,15,40.3);
	this.scene.rotate(Math.PI/4,0,1,0);
	this.scene.rotate(-Math.PI/15,1,0,0);
	this.scene.scale(4,4,4);
	switch (this.red) {
    case 0:
        this.zero.apply();
        break;
    case 1:
        this.um.apply();
        break;
    case 2:
        this.dois.apply();
        break;
    case 3:
        this.tres.apply();
        break;
    case 4:
        this.quatro.apply();
        break;
    case 5:
        this.cinco.apply();
        break;
    case 6:
        this.seis.apply();
				break;
		case 7:
		    this.sete.apply();
				break;
			}
	this.patch.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(37.9,15,23.7);
	this.scene.rotate(Math.PI/4,0,1,0);
	this.scene.rotate(-Math.PI/15,1,0,0);
	this.scene.scale(4,4,4);
	switch (this.white) {
		case 0:
				this.zero.apply();
				break;
		case 1:
				this.um.apply();
				break;
		case 2:
				this.dois.apply();
				break;
		case 3:
				this.tres.apply();
				break;
		case 4:
				this.quatro.apply();
				break;
		case 5:
				this.cinco.apply();
				break;
		case 6:
				this.seis.apply();
				break;
		case 7:
				this.sete.apply();
				break;
			}
	this.patch.display();
	this.scene.popMatrix();
};
