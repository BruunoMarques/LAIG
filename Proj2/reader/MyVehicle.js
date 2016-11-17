function MyVehicle(scene) {
	CGFobject.call(this, scene);


	this.controlPoints = [[-0.190,0.087,-1.033],
											[-0.188,	0.088,	-1.033],
											[-0.191,	0.091	,-1.029],
											[-0.172,	0.123	,-1.020],
											[-0.189,	0.088,	-1.030],
											[-0.191,	0.090,	-1.021],

											[-0.133,-1.112,	-1.305],
											[-1.755	,-1.133	,-1.224],
											[-1.539,	1.842,	-1.129],
											[1.372,	1.821,	-1.275],
											[1.641,	-1.110,	-1.174],
											[-0.133,	-1.105,	-1.293],

											[0.000,	-1.000,	0.800],
											[-1.000,	-1.000,	0.800],
											[-1.000,	1.000,	0.800],
											[1.000,	1.000,	0.800],
											[1.000,	-1.000,	0.800],
											[0.000,	-1.000,	0.800],

											[0.000,	-1.000,	1.200],
											[-1.000,	-1.000,	1.200],
											[-1.000,	1.000,	1.200],
											[1.000,	1.000,	1.200],
											[1.000,	-1.000,	1.200],
											[0.000,	-1.000,	1.200],

											[0.000,	-1.000,	1.600],
											[-1.000,	-1.000,	1.600],
											[-1.000,	1.000,	1.600],
											[1.000,	1.000,	1.600],
											[1.000,	-1.000,	1.600],
											[0.000,	-1.000,	1.600],

											[0.015,	-0.616,	1.559],
											[0.015,	-0.614,	1.561],
											[0.016,	-0.630,	1.582],
											[0.015,	-0.632,	1.584],
											[0.015,	-0.620,	1.564],
											[0.012,	-0.612,	1.554]];



	this.initBuffers();
};

MyVehicle.prototype = Object.create(CGFobject.prototype);
MyVehicle.prototype.constructor=MyVehicle;

MyVehicle.prototype.initBuffers = function() {
	this.patch = new MyPatch(this.scene, 5, 5, 20, 20, this.controlPoints);
}

MyVehicle.prototype.display = function(){

	this.scene.pushMatrix();
	this.patch.display();
	this.scene.popMatrix();


}
