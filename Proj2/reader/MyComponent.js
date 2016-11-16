
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
			
			
            if(animate instanceof LinearAnimation){
                for(var j =0; j< animate.cPoints.length;j++){
                    if(animate.times[j] > this.totalTime && animate.next_anim[j]){
                        animate.translate.x += animate.walk_d[j][0] * timeset;
                        animate.translate.y += animate.walk_d[j][1] * timeset;
                        animate.translate.z += animate.walk_d[j][2] * timeset;
                    }
					
                    else if(animate.times[j] <= this.totalTime){
						
                        animate.next_anim[j+1]= true;
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
            else if(animate instanceof CircularAnimation){
				
                if(animate.time > this.totalTime){
                    animate.ang_ant = animate.angle_temp;
                    animate.angle_temp += (animate.angle_per_it) * timeset;
                }
				
				
                else {
					this.currAnimation++;
                    this.totalTime = 0;
                    if(this.currAnimation < this.animations.length)
                        if(this.animations[i+1] instanceof LinearAnimation)
                            this.animations[i+1].translate = new Point(animate.final_point.x-this.origin.x, animate.final_point.y-this.origin.y, animate.final_point.z-this.origin.z);
				}
            }

        }
    }
}