function MyPlane(scene, dimX, dimY, partsX, partsY) {
	CGFobject.call(this, scene);

	this.dimX = dimX;
	this.dimY = dimY;
	this.partsX = partsX;
	this.partsY = partsY;

	this.controlPoints = [
                        [-this.dimX/2,-this.dimY/2, 0],
                        [-this.dimX/2,this.dimY/2, 0],
                        [this.dimX/2,-this.dimY/2, 0],
                        [this.dimX/2,this.dimY/2, 0]
                      ];

	this.patch = new MyPatch(this.scene,1,1,partsX,partsY,this.controlPoints);

	this.initBuffers();
};

MyPlane.prototype = Object.create(CGFobject.prototype);
MyPlane.prototype.constructor=MyPlane;

MyPlane.prototype.display = function(){

	this.patch.display();

}
