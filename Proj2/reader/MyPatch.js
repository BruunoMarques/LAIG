function MyPatch(scene, orderU, orderV, partsU, partsV, controlPoints) {
	CGFobject.call(this, scene);

	this.orderU = orderU;
	this.orderV = orderV;
	this.partsU = partsU;
	this.partsV = partsV;
	this.controlPoints = controlPoints;

	this.patch = this.makeSurface();

	this.initBuffers();
};

MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor=MyPatch;

MyPatch.prototype.getKnotsVector = function(degree) { // TODO (CGF 0.19.3): add to CGFnurbsSurface

	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
}

MyPatch.prototype.makeSurface = function () {

	var knots1 = this.getKnotsVector(this.orderU); // to be built inside webCGF in later versions ()
	var knots2 = this.getKnotsVector(this.orderV); // to be built inside webCGF in later versions

	var nurbsSurface = new CGFnurbsSurface(this.orderU, this.orderV, knots1, knots2, this.controlPoints); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	var obj = new CGFnurbsObject(this.scene, getSurfacePoint, this.partsU, this.partsV );
	return obj;
}

MyPatch.prototype.display = function() {
	this.patch.display();
}
