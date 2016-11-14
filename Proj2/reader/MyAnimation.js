class MyAnimation {

}

class MyLinearAnimation extends MyAnimation{
	constructor(id,span,type,controlPoints){
		this.id = id;
		this.span = span;
		this.type = type;
		this.controlPoints = controlPoints;
	}
}

class MyCircularAnimation extends MyAnimation{
	constructor(id,span,type,center,radius,startang,rotang){
		this.id = id;
		this.span = span;
		this.type = type;
		this.center = center;
		this.radius = radius;
		this.startang = startang;
		this.rotang = rotang;
	}
}
