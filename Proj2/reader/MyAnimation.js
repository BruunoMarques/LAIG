class MyAnimation {
	constructor(id,span){
		this.id = id;
		this.span = id;
	}
	
	
	
AngleCalc(x,z,dirZ){
	var anglevec = vec3.fromValues(x,0,z);
	var cosvar = vec3.dot(anglevec,dirZ) / Math.sqrt( Math.dot([x,z],[x,z]));
	var angle = Math.acos(cosvar);
	if (x < 0){
		angle = Math.PI*2-angle;
	}
	
	return angle;
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




