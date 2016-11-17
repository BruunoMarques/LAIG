
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


MyComponent.prototype.update = function(timeset){
    this.totalTime += timeset;
    if(this.animations.length != 0){
        if(this.currAnimation < this.animations.length){
			
            var i = this.currAnimation;
            var animate = this.animations[i];
			
			
            if(animate instanceof MyLinearAnimation){
                for(var j =0; j< animate.cPoints.length;j++){
                    if(animate.intervals[j] > this.totalTime && animate.animRefBool[j]){
                        animate.translate.x += animate.moveDistance[j][0] * timeset;
                        animate.translate.y += animate.moveDistance[j][1] * timeset;
                        animate.translate.z += animate.moveDistance[j][2] * timeset;
                    }
					
                    else if(animate.intervals[j] <= this.totalTime){
						
                        animate.animRefBool[j+1]= true;
                        if(j+1 != animate.cPoints.length)animate.rotate = animate.angles[j+1];
                        else{
							
                            this.currAnimation++;
                            this.totalTime = 0;
                            if(this.currAnimation < this.animations.length)
                                if(this.animations[i+1] instanceof LinearAnimation)this.animations[i+1].translate = animate.translate;
                        }
                    }
                }
            }
            else if(animate instanceof MyCircularAnimation){
				
                if(animate.time > this.totalTime){
                    animate.prevAngle = animate.currAngle;
                    animate.currAngle += (animate.rotspeed) * timeset;
                }
				
				
                else {
					this.currAnimation++;
                    this.totalTime = 0;
                    if(this.currAnimation < this.animations.length)
                        if(this.animations[i+1] instanceof LinearAnimation)
                            this.animations[i+1].translate = new Point(animate.lastpoint.x-this.origin.x, animate.lastpoint.y-this.origin.y, animate.lastpoint.z-this.origin.z);
				}
            }

        }
    }
}