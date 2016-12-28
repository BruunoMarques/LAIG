function MyChessboard(scene) {
	CGFobject.call(this, scene);


	this.scene= scene;
	this.cells = [];
	this.idCell = 16;
	
	this.even = new CGFappearance(this.scene);
	this.even.setAmbient(0.3,0.3,0.3,0.3);
	this.even.setDiffuse(0.1,0.1,0.1,0.2);
	this.even.setSpecular(1,1,1,0.2);
	this.even.setShininess(5);
	this.even.loadTexture("./resources/images/wood.jpg");

	this.odd = new CGFappearance(this.scene);
	this.odd.setAmbient(0.3,0.3,0.3,0.3);
	this.odd.setDiffuse(0.1,0.1,0.1,0.2);
	this.odd.setSpecular(1,1,1,0.2);
	this.odd.setShininess(5);
	this.odd.loadTexture("./resources/images/woodu.jpg");

	this.cells = this.createCells();

	this.initBuffers();
};

MyChessboard.prototype = Object.create(CGFobject.prototype);
MyChessboard.prototype.constructor=MyChessboard;

MyChessboard.prototype.display = function(idpick,texture){
		
	

	    this.scene.pushMatrix();
		
	    var n = this.cells.length;
	    for (var i = 1; i < n+1; i++) {
				if(i % 2 == 0){
					this.even.apply();
				}else {
					this.odd.apply();
				}
	      this.cells[i-1].display(idpick,texture);
	    }

	    this.scene.popMatrix();

}

MyChessboard.prototype.createCells = function(){
	var inc = 2.5;
	var x = 0;
	var y = 0;
	for(var i = 1; i <= 81; i++){
			this.cell = new MyCell(this.scene,this.idCell + i,x,y);
			x += inc;
			if(i % 9 == 0){
				x = 0;
				y += inc;
			}
			this.cells.push(this.cell);
	}

	return this.cells;
}
