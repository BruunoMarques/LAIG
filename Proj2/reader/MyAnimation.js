class MyAnimation {
	constructor(id,span){
		this.id = id;
		this.span = id;
	}
}

class MyLinearAnimation extends MyAnimation{
	constructor(id,span,controlPoints){
		console.log(id);
		super(id,span);
		this.controlPoints = controlPoints;
	}
}

class MyCircularAnimation extends MyAnimation{
	constructor(id,span,centerx,centery,centerz,radius,startang,rotang){
		super(id,span)
		this.centerx = centerx;
		this.centery = centery;
		this.centerz = centerz;
		this.radius = radius;
		this.startang = startang;
		this.rotang = rotang;
	}
}
