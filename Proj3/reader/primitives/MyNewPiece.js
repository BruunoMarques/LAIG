function MyNewPiece(scene, type, id, x, y) {
	CGFobject.call(this, scene);

	this.type = type;
	this.id = id;
	this.x = x;
	this.y = y;
	this.px = x*2.5 + 49.9;
	this.py = y*2.5 + 50.0;
	this.positions = [this.x +5 ,Math.abs(this.y - 5)];
	
	this.timeBy = 0;
	this.animation = null;
	this.animationBool = false;
	this.rotateAng = 0;
	this.sizeP = 1;
	this.ready = true;
	
	 this.materialBaseRed = new CGFappearance(scene);
    //set emission
    this.materialBaseRed.setEmission(0.5, 0, 0, 1);
    //set ambient
    this.materialBaseRed.setAmbient(0.5, 0, 0, 1);
    //set diffuse
    this.materialBaseRed.setDiffuse(0.9, 0.1, 0.2, 1);
    //set specular
    this.materialBaseRed.setSpecular(0.9, 0.1, 0.2, 1);
    //set shininess
    this.materialBaseRed.setShininess(200);


    this.materialBaseWhite = new CGFappearance(scene);
    //set emission
    this.materialBaseWhite.setEmission(0.72, 0.62, 0.3, 1);
    //set ambient
    this.materialBaseWhite.setAmbient(0.72, 0.62, 0.3, 1);
    //set diffuse
    this.materialBaseWhite.setDiffuse(0.5, 0.4, 0.7, 1);
    //set specular
    this.materialBaseWhite.setSpecular(0.9, 0.8, 0.5, 1);
    //set shininess
    this.materialBaseWhite.setShininess(200);
	
	
	this.initBuffers();
};
///////////////////////////////////
MyNewPiece.prototype = Object.create(CGFobject.prototype);
MyNewPiece.prototype.constructor=MyNewPiece;

MyNewPiece.prototype.initBuffers = function() {

	this.part = new MyPiece(this.scene);
}



MyNewPiece.prototype.display = function(id, currmat,nextmat, picklock){
this.scene.pushMatrix();
	if (this.animationBool){
		this.scene.translate(this.animation.x_atual,this.animation.y_atual,this.animation.z_atual);
	}

	if (this.type > 3){
		this.materialBaseRed.apply();
	} else{
		this.materialBaseWhite.apply();
	}
		
	
	if (id == this.id) {
        nextmat.apply();
    }

		switch (this.type) {
			case 1:
			
			this.scene.pushMatrix();
			this.scene.translate(this.px,13.8,this.py);
			this.scene.scale(0.15,0.15,0.15);
			
		  if (picklock) {
			this.scene.registerForPick(this.id, this);
		}
				
				this.scene.pushMatrix();
				this.scene.translate(0,3,0);
				this.scene.scale(0.9,1,0.9);
				this.part.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
				this.scene.scale(1,2,1);
				this.part.display();
				this.scene.popMatrix();
			this.scene.popMatrix();	

				break;
			case 2:
			
			this.scene.pushMatrix();
			this.scene.translate(this.px,13.8,this.py);
			this.scene.scale(0.15,0.15,0.15);
			
		  if (picklock) {
			this.scene.registerForPick(this.id, this);
		}			
			
				this.scene.pushMatrix();
				this.scene.translate(0,6,0);
				this.scene.scale(0.8,1,0.8);
				this.part.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
				this.scene.translate(0,2.7,0);
				this.scene.scale(0.9,1,0.9);
				this.part.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
				this.scene.scale(1,2,1);
				this.part.display();
				this.scene.popMatrix();
			this.scene.popMatrix();	
				break;
			case 3:
			this.scene.pushMatrix();
			this.scene.translate(this.px,13.8,this.py);
			this.scene.scale(0.15,0.15,0.15);
		  if (picklock) {
			this.scene.registerForPick(this.id, this);
		}
			
				this.scene.pushMatrix();
				this.scene.translate(0,9,0);
				this.scene.scale(0.6,1,0.6);
				this.part.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
				this.scene.translate(0,6,0);
				this.scene.scale(0.8,1,0.8);
				this.part.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
				this.scene.translate(0,3,0);
				this.scene.scale(0.9,1,0.9);
				this.part.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
				this.scene.scale(1,2,1);
				this.part.display();
				this.scene.popMatrix();
			this.scene.popMatrix();	
					break;
			
			case 5:
			this.scene.pushMatrix();
			this.scene.translate(this.px,13.8,this.py);
			this.scene.scale(0.15,0.15,0.15);
			
		  if (picklock) {
			this.scene.registerForPick(this.id, this);
		}

			
				this.scene.pushMatrix();
				this.scene.translate(0,3,0);
				this.scene.scale(0.9,1,0.9);
				this.part.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
				this.scene.scale(1,2,1);
				this.part.display();
				this.scene.popMatrix();
			this.scene.popMatrix();	

				break;
			case 6:
			this.scene.pushMatrix();
			this.scene.translate(this.px,13.8,this.py);
			this.scene.scale(0.15,0.15,0.15);
			
		  if (picklock) {
			this.scene.registerForPick(this.id, this);
		}			
			
				this.scene.pushMatrix();
				this.scene.translate(0,6,0);
				this.scene.scale(0.8,1,0.8);
				this.part.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
				this.scene.translate(0,2.7,0);
				this.scene.scale(0.9,1,0.9);
				this.part.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
				this.scene.scale(1,2,1);
				this.part.display();
				this.scene.popMatrix();
			this.scene.popMatrix();	
				break;
			case 7:
			this.scene.pushMatrix();
			this.scene.translate(this.px,13.8,this.py);
			this.scene.scale(0.15,0.15,0.15);
		  if (picklock) {
			this.scene.registerForPick(this.id, this);
		}
			
				this.scene.pushMatrix();
				this.scene.translate(0,9,0);
				this.scene.scale(0.6,1,0.6);
				this.part.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
				this.scene.translate(0,6,0);
				this.scene.scale(0.8,1,0.8);
				this.part.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
				this.scene.translate(0,3,0);
				this.scene.scale(0.9,1,0.9);
				this.part.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
				this.scene.scale(1,2,1);
				this.part.display();
				this.scene.popMatrix();
			this.scene.popMatrix();	
					break;					
			default:

		}
this.scene.popMatrix();		
		if (id == this.id){
			        currmat.apply();
				}
this.scene.clearPickRegistration();
}

MyNewPiece.prototype.startAnimation = function(id,x,y,xf,yf){
	this.animationBool = true;
	this.ready = false;
	this.animation = new MygameAnimation(id,x,y,xf,yf);
    this.timeBy = 0;
    this.sizeP = 1;

}


MyNewPiece.prototype.animationUpdate = function(tempovar){
    if(this.animationBool){
        this.timeBy += tempovar;
        if(!this.animation.updateAnimation(this.timeBy,tempovar)){
			console.log("did me");
            this.animationBool = false;
			this.ready = true;
			this.scene.game.go();
        }
    }
};