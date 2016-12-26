function MyPiece(scene) {
	CGFobject.call(this, scene);


	this.controlPoints = [[-1.549	,-1.258,	-0.575],
												[-1.378,	-0.439,	-0.528],
												[-1.252	,0.557	,-0.498],
												[-1.110	,1.543,	-0.501],

												[-0.516	,-1.357,	-0.447],
												[2.032	,1.204	,1.833],
												[1.417,	-1.413,	2.079],
												[0.004,	1.402	,-0.370],

												[0.590,	-1.401,	-0.392],
												[-1.246,	1.713,	1.840],
												[-1.727	,-1.112	,2.463],
												[1.105	,1.282	,-0.364],

												[1.562,	-1.566	,-0.247],
												[1.836,	-0.615	,-0.225],
												[1.944,	0.320	,-0.249],
												[2.143,	1.091,	-0.355]];

console.log(this.controlPoints);

	this.initBuffers();
};

MyPiece.prototype = Object.create(CGFobject.prototype);
MyPiece.prototype.constructor=MyPiece;

MyPiece.prototype.initBuffers = function() {

	this.patch = new MyPatch(this.scene, 3, 3, 20, 20, this.controlPoints);
	this.base = new MyCube(this.scene,1);
}

MyPiece.prototype.display = function(){

		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.rotate(Math.PI/25,0,0,1);
		this.scene.rotate(Math.PI/30,0,1,0);
		this.scene.scale(4,4,4);
		this.patch.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-6,-2.5,-6);
		this.scene.scale(14,1,12);
		this.base.display();
		this.scene.popMatrix();


}
