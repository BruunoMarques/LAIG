class MyAnimation {
	constructor(id,span){
		this.id = id;
		this.span = id;
	}
		
	
AngleCalc(x,z,dirZ){
	var anglevec = vec3.fromValues(x,0,z);
	var cosvar = vec3.dot(anglevec,dirZ) / Math.sqrt( x*x,z*z);
	var angle = Math.acos(cosvar);
	if (x < 0){
		angle = Math.PI*2-angle;
	}
	
	return angle;
}
}

class MyLinearAnimation extends MyAnimation{
	constructor(id,span,controlPoints){
		
		super(id,span);
		this.controlPoints = controlPoints;
		this.speed = 0;
		this.distance = 0;
		this.rotangle = 0;
		this.translation = new MyPoint(0,0,0);
		
		this.angles = [];
		this.distances = [];
		this.moveDistance = [];
		this.intervals = [];
		
		
		
		
		this.animRefBool = [];
		this.animRefBool[0] = true;
		console.log(this.controlPoints);
		for(var i = 0; i < this.controlPoints.length -1; i++){
          var OriginPoint= this.controlPoints[i+1];
          var destination = vec3.fromValues(this.controlPoints[i].x,this.controlPoints[i].y,this.controlPoints[i].z);
          var origin = vec3.fromValues(OriginPoint.x,OriginPoint.y,OriginPoint.z);
          this.distance += vec3.distance(destination, origin);
          this.animRefBool.push(false);
      }
		
		
	}

duration(matrix){
	var original = matrix;
	var vx = vec3.fromValues(1,0,0);
	var vy = vec3.fromValues(0, 1, 0);
    var vz = vec3.fromValues(0, 0, 1);
	var time = 0;
	
	for(var i = 0;i < this.controlPoints.length;i++){
          var currpoint = this.controlPoints[i];
          var nextpoint = vec3.fromValues(currpoint.x,currpoint.y,currpoint.z);
          var distance = vec3.distance(nextpoint, original);
          this.distances.push(distance);
          var interval = distance/this.speed;
          time += interval;
          this.intervals.push(time);
		  
          vec3.subtract(nextpoint, nextpoint, original);
          var x = vec3.dot(nextpoint, vx);
          var y = vec3.dot(nextpoint, vy);
          var z = vec3.dot(nextpoint, vz);
		  
          var move = [(x/interval), (y/interval), (z/interval)];
		  
          this.moveDistance.push(move);
          this.origin = vec3.fromValues(currpoint.x,currpoint.y,currpoint.z);
          var angle = this.AngleCalc(x, z, vz);
          this.angles.push(angle);
      }
      this.rotangle = this.angles[0];
	
	
}	
	

	
duplicate(){
      var dup = new MyLinearAnimation(this.id, this.span, this.controlPoints);
      return dup;
  }
}

class MyCircularAnimation extends MyAnimation{
	constructor(id,span,centerx,centery,centerz,radius,startang,rotang){
		super(id,span)
		
		this.center = new MyPoint(centerx,centery,centerz);

		this.radius = radius;
		this.startang = startang;
		this.rotang = rotang;
		
		this.prevAngle =0;
		this.currangle = 0;
		
		this.controlPts = [];
		this.rotspeed = this.rotang / span;
		this.lastpoint = new MyPoint(0,0,0);
		this.getLastPoint();
	
	}
	
	getLastPoint(){
	  this.x1 = Math.cos(this.currangle) * this.radius;
      this.y1 = 0;
      this.z1 = Math.sin(this.currangle) * this.radius;
	  
      var x = this.center.x + Math.cos(this.rotang+this.startang) * this.radius;
      var z = this.center.z + Math.sin(-this.rotang+this.startang) * this.radius;
	  
	  
      this.lastpoint = new MyPoint(x,this.center.y, z);
      this.controlPts.push(this.lastpoint);
	}
	
	duplicate(){
      var dup = new MyCircularAnimation(this.id, this.span, this.centerx,this.centery,this.centerz,this.radius,this.startang,this.rotang);
      return dup;
  }
}




