function MyCylinderWithTops(scene, base, top, height, slices, stacks) {
	CGFobject.call(this,scene);

	this.height = height;

	this.surface = new MyCylinder(scene, base, top, height, slices, stacks);
	this.base = new MyCircle(scene, base, slices);
	this.top = new MyCircle(scene, top, slices);
};

MyCylinderWithTops.prototype = Object.create(CGFobject.prototype);
MyCylinderWithTops.prototype.constructor = MyCylinderWithTops;


MyCylinderWithTops.prototype.display = function() {

	this.surface.display();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, this.height);
		this.base.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.top.display();
	this.scene.popMatrix();
}
