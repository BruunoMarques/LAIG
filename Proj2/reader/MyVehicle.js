function MyVehicle(scene) {
	CGFobject.call(this, scene);


	

	this.initBuffers();
};

MyVehicle.prototype = Object.create(CGFobject.prototype);
MyVehicle.prototype.constructor=MyVehicle;

MyVehicle.prototype.display = function(){

}
