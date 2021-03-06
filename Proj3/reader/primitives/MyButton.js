function MyButton(scene, orderU, orderV, partsU, partsV, controlPoints,id) {
	CGFobject.call(this, scene);

	this.orderU = orderU;
	this.orderV = orderV;
	this.partsU = partsU;
	this.partsV = partsV;
	this.id = id;
	this.ControlPoints = [];



	for(var i = 0; i <= this.orderU; i++)
	{
		var temp = [];
		for(var j = 0; j <= this.orderV; j++)
		{
			var newControlPoint = controlPoints[i*(this.orderV + 1) + j];
			newControlPoint.push(1);
			temp.push(newControlPoint);
		}
		this.ControlPoints.push(temp);
	}

	this.patch = this.makeSurface();

	this.initBuffers();
};

MyButton.prototype = Object.create(CGFobject.prototype);
MyButton.prototype.constructor=MyButton;

MyButton.prototype.getKnotsVector = function(degree) { // TODO (CGF 0.19.3): add to CGFnurbsSurface

	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
}

MyButton.prototype.makeSurface = function () {

	var knots1 = this.getKnotsVector(this.orderU); // to be built inside webCGF in later versions ()
	var knots2 = this.getKnotsVector(this.orderV); // to be built inside webCGF in later versions


	var nurbsSurface = new CGFnurbsSurface(this.orderU, this.orderV, knots1, knots2, this.ControlPoints); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	var obj = new CGFnurbsObject(this.scene, getSurfacePoint, this.partsU, this.partsV );
	return obj;
}

MyButton.prototype.display = function(picklock) {
	if (picklock) {
		this.scene.registerForPick(this.id, this);
	}
	this.patch.display();
}
