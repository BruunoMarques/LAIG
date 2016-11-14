class MyAnimation {

}

class MyLinearAnimation extends MyAnimation{
	constructor(id,span,type,controlPoints){
		console.log(id);
		this.id = id;
		this.span = span;
		this.type = type;
		this.controlPoints = controlPoints;
	}
}

class MyCircularAnimation extends MyAnimation{
	constructor(id,span,type,centerx,centery,centerz,radius,startang,rotang){
		this.id = id;
		this.span = span;
		this.type = type;
		this.centerx = centerx;
		this.centery = centery;
		this.centerz = centerz;
		this.radius = radius;
		this.startang = startang;
		this.rotang = rotang;
	}
}
