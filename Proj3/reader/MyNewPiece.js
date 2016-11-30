function MyNewPiece(scene, type) {
	CGFobject.call(this, scene);

	this.type = type;

console.log(this.controlPoints);

	this.initBuffers();
};

MyNewPiece.prototype = Object.create(CGFobject.prototype);
MyNewPiece.prototype.constructor=MyNewPiece;

MyNewPiece.prototype.initBuffers = function() {

	this.part = new MyPiece(this.scene);
}

MyNewPiece.prototype.display = function(){

		switch (this.type) {
			case 0:
				this.scene.pushMatrix();
				this.scene.translate(0,3,0);
				this.scene.scale(0.9,1,0.9);
				this.part.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
				this.scene.scale(1,2,1);
				this.part.display();
				this.scene.popMatrix();

				break;
			case 1:
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

				break;
			case 2:
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

					break;
			default:

		}





}
