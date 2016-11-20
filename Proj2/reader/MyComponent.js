
function MyComponent() {
	CGFscene.call(this);
	
	this.id = "";
	
	this.transformation_ref = "";
	
	this.materials = [];
	this.texture = "";
	this.matrix = null;
	this.matrix_b = null;
	this.translates = [];
	this.rotates = [];
	this.scales = [];
	
	this.animations = [];
	
	this.origin = null;
	this.currAnimation = 0;
	this.totalTime = 0;
	
	this.primitivess = [];
	this.compRef = [];
	this.childrenRef = [];
}

MyComponent.prototype = Object.create(CGFscene.prototype);
MyComponent.prototype.constructor = MyComponent;

MyComponent.prototype.startOrigin = function(){
	var originvalue = vec3.fromValues(0,0,0);
	var v0 = vec3.fromValues(1, 0, 0);
    var v1 = vec3.fromValues(0, 1, 0);
    var v2 = vec3.fromValues(0, 0, 1);
	vec3.transformMat4(originvalue,vec3.fromValues(0,0,0), this.matrix);
	this.origin = new MyPoint(vec3.dot(originvalue,v0),vec3.dot(originvalue,v1),vec3.dot(originvalue,v2));
}


MyComponent.prototype.update = function(timeset){
    this.totalTime += timeset;
    if(this.animations.length != 0){
        if(this.currAnimation < this.animations.length){
			
            var i = this.currAnimation;
            var animate = this.animations[i];
			
			
            if(animate instanceof MyLinearAnimation){
                for(var j =0; j< animate.controlPoints.length;j++){
                    if(animate.intervals[j] > this.totalTime && animate.animRefBool[j]){
						
                        animate.translation.x += animate.moveDistance[j][0] * timeset;
                        animate.translation.y += animate.moveDistance[j][1] * timeset;
                        animate.translation.z += animate.moveDistance[j][2] * timeset;
                    }
					
                    else if(animate.intervals[j] <= this.totalTime){

                        animate.animRefBool[j+1]= true;
                        if(j+1 != animate.controlPoints.length)animate.rotate = animate.angles[j+1];
                        else{
                            this.currAnimation++;
                            this.totalTime = 0;
                            if(this.currAnimation < this.animations.length)
                                if(this.animations[i+1] instanceof MyLinearAnimation)this.animations[i+1].translation = animate.translation;
                        }
                    }
                }
            }
            else if(animate instanceof MyCircularAnimation){
				console.log("is instance");
                if(animate.span > this.totalTime){
                    animate.prevAngle = animate.currangle;
                    animate.currangle += (animate.rotspeed) * timeset;
                }
				
				
                else {
					console.log("is reket");
					this.currAnimation++;
                    this.totalTime = 0;
                    if(this.currAnimation < this.animations.length)
                        if(this.animations[i+1] instanceof MyLinearAnimation)
                            this.animations[i+1].translate = new Point(animate.lastpoint.x-this.origin.x, animate.lastpoint.y-this.origin.y, animate.lastpoint.z-this.origin.z);
				}
            }

        }
    }
}