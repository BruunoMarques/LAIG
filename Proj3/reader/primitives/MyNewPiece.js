function MyNewPiece(scene, type, id, x, y) {
	CGFobject.call(this, scene);

	this.type = type;
	this.id = id;
	this.x = x*2.5 + 49.9;
	this.y = y*2.5 + 50.0;
	this.positions = [this.x +5 ,Math.abs(this.y - 5)];

	
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
			this.scene.translate(this.x,13.8,this.y);
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
			this.scene.translate(49.9 + this.x*2.5,13.8,50+ this.y*2.5);
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
			this.scene.translate(49.9 + this.x*2.5,13.8,50+ this.y*2.5);
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
			this.scene.translate(49.9 + this.x *2.5,13.8,50+ this.y*2.5);
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
			this.scene.translate(49.9 + this.x*2.5,13.8,50+ this.y*2.5);
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
			this.scene.translate(49.9 + this.x*2.5,13.8,50+ this.y*2.5);
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
		
		if (id == this.id){
			        currmat.apply();
				}

		
	
this.scene.clearPickRegistration();
}
