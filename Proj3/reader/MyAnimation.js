class MyAnimation {
	constructor(id,span){
		this.id = id;
		this.span = span;
	}
		
	
AngleCalc(x,z,dirZ){
	var anglevec = vec3.fromValues(x,0,z);
	var cosvar = vec3.dot(anglevec,dirZ) / Math.sqrt( x*x+z*z);
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
		this.rotate = 0;
		this.translation = new MyPoint(0,0,0);
		
		this.angles = [];
		this.distances = [];
		this.moveDistance = [];
		this.intervals = [];
		
		
		
		this.animRefBool = [];
		for(var i = 1; i < this.controlPoints.length ; i++){
          var OriginPoint= this.controlPoints[i-1];
          var destination = vec3.fromValues(this.controlPoints[i][0],this.controlPoints[i][1],this.controlPoints[i][2]);
		  var origin = vec3.fromValues(OriginPoint[0],OriginPoint[1],OriginPoint[2]);
          this.distance += vec3.distance(destination, origin);
          this.animRefBool.push(false);
      }
	  
		this.animRefBool[0] = true;
		this.animRefBool.push(false);
	}

duration(matrix){
	var original = matrix;
	var vx = vec3.fromValues(1,0,0);
	var vy = vec3.fromValues(0, 1, 0);
    var vz = vec3.fromValues(0, 0, 1);
	var time = 0;
	
	for(var i = 0;i < this.controlPoints.length;i++){
		
          var currpoint = this.controlPoints[i];
          var nextpoint = vec3.fromValues(currpoint[0],currpoint[1],currpoint[2]);
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
          original = vec3.fromValues(currpoint[0],currpoint[1],currpoint[2]);
          var angle = this.AngleCalc(x, z, vz);
          this.angles.push(angle);
      }
			 this.rotate = this.angles[0];     
	
	
}	
	

	
duplicate(){
      var dup = new MyLinearAnimation(this.id, this.span, this.controlPoints);
      return dup;
  }
}

class MyCircularAnimation extends MyAnimation{
	constructor(id,span,radius,centerx,centery,centerz,startang,rotang){
		super(id,span)

		this.center = new MyPoint(centerx,centery,centerz);
		this.radius = radius;
		this.startang = startang;
		this.rotang = rotang;
	

		this.prevAngle =0;
		this.currangle = 0;
		
		this.controlPoints = [];
		this.rotspeed = this.rotang / span;
		this.lastpoint = new MyPoint(0,0,0);
		this.getLastPoint();
	
	}
	
	getLastPoint(){
	  this.y1 = 0;			
	  this.x1 = Math.cos(this.currangle) * this.radius;
      this.z1 = Math.sin(this.currangle) * this.radius;
	  
      var x = this.center.x + Math.cos(this.rotang+this.startang) * this.radius;
      var z = this.center.z + Math.sin(-this.rotang+this.startang) * this.radius;
	
	  
      this.lastpoint = new MyPoint(x,this.center.y, z);
      this.controlPoints.push(this.lastpoint);
	}
	
	duplicate(){
      var dup = new MyCircularAnimation(this.id, this.span,this.radius,this.center.x,this.center.y,this.center.z,this.startang,this.rotang);
	  return dup;
  }
}




