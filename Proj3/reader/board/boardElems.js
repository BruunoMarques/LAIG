function MyGameBoard(scene) {


    CGFobject.call(this, scene);
    this.scene = scene;
    this.redpieces = [];
	this.whitepieces = [];
	this.globalId = 0;

	this.story = [];


	this.initialboard = [[3,0,0,0,0,0,0,0,3],
    [0,0,2,1,1,1,2,0,0],
    [0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,5,0,0,0,0],
    [0,0,6,5,5,5,6,0,0],
    [7,0,0,0,0,0,0,0,7]];

	this.stringedboard = "[[3,0,0,0,0,0,0,0,3],"+
    "[0,0,2,1,1,1,2,0,0],"+
    "[0,0,0,0,1,0,0,0,0],"+
    "[0,0,0,0,0,0,0,0,0],"+
    "[0,0,0,0,0,0,0,0,0],"+
    "[0,0,0,0,0,0,0,0,0],"+
    "[0,0,0,0,5,0,0,0,0],"+
    "[0,0,6,5,5,5,6,0,0],"+
    "[7,0,0,0,0,0,0,0,7]]";

    this.createPieces();
		this.createBoard();
		this.createPot();
		this.createClock();



    /* to lockpicking */
    this.pickLock = true;
    /** Selected cell storage */
    this.pick = -1;
    /** cells register switch */
    this.registerPick;

    this.resetRegisterPick();


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

	this.materialSelected = new CGFappearance(scene);
    //set emission
    this.materialSelected.setEmission(0.1, 0.62, 0.2, 1);
    //set ambient
    this.materialSelected.setAmbient(0.1, 0.62, 0.2, 1);
    //set diffuse
    this.materialSelected.setDiffuse(0.1, 0.1, 0.1, 0.2);
    //set specular
    this.materialSelected.setSpecular(0.1, 0.1, 0.1, 0.2);
    //set shininess
    this.materialSelected.setShininess(30);
};

MyGameBoard.prototype = Object.create(CGFobject.prototype);
MyGameBoard.prototype.constructor = MyGameBoard;

MyGameBoard.prototype.display = function() {
	this.scene.clearPickRegistration();
    this.scene.pushMatrix();


    this.materialBaseRed.apply();



    for (var i = 0; i < this.redpieces.length; i++) {

            this.redpieces[i].display(this.pick,this.materialBaseRed, this.materialSelected, this.pickLock);

    }


	this.materialBaseWhite.apply();

	for (var i = 0; i < this.whitepieces.length; i++) {

            this.whitepieces[i].display(this.pick,this.materialBaseWhite, this.materialSelected, this.pickLock);
    }



    this.scene.popMatrix();

	    this.scene.pushMatrix();

		this.scene.translate(38.7,13.1,61.3);
		this.scene.scale(1.005,1,1.005);
		this.board.display(this.pick,this.materialSelected);
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.pot.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(50,50,0);
	this.clock.display();
	this.scene.popMatrix();
};


MyGameBoard.prototype.createBoard = function() {

	this.board = new MyChessboard(this.scene);

};

MyGameBoard.prototype.createPot = function() {

	this.pot = new MyPot(this.scene);

};

MyGameBoard.prototype.createClock = function() {

	this.clock = new MyClock(this.scene,12,1);

};


MyGameBoard.prototype.createPieces = function() {
	var sz = this.initialboard.length;

				for (var i = 0; i < sz;i++){
					for (var j = 0; j < sz;j++){

							var tp = this.initialboard[i][j];

							if(tp==0){

							}
							else if (tp < 4 ){
							var piecetoadd = new MyNewPiece(this.scene,tp,this.globalId + 1,-4 +i,-4+j);
							this.globalId++;
							this.whitepieces.push(piecetoadd);
							}
							else{
							var piecetoadd = new MyNewPiece(this.scene,tp-4,this.globalId + 1,-4+i,-4+j);
							this.globalId++;
							this.redpieces.push(piecetoadd);
							}


					}
				}
};


MyGameBoard.prototype.udpateClock = function(currTime){
		this.clock.update(currTime);
}

MyGameBoard.prototype.updatePick = function(id) {
    this.pick = id;
    this.lockCell(id);
}

MyGameBoard.prototype.resetRegisterPick = function() {
    this.registerPick = [];

    for (var i = 0; i < this.redpieces; i++) {
        this.registerPick.push(true);
    }
	for (var i = 0; i < this.whitepieces; i++) {
        this.registerPick.push(true);
    }

	for(var i = 0; i < this.board.cells.length; i++){
		this.registerPick.push(true);
	}
}

/**
Update already picked cell
*/
MyGameBoard.prototype.lockCell = function(id) {
    this.registerPick[id] = false;
}

MyGameBoard.prototype.parseclicks = function(id) {

	var clickedon;
    if (id < 9){
		for(var i = 0; i < this.whitepieces.length;i++){
			if(id == this.whitepieces[i].id){
				clickedon = this.whitepieces[i].positions;
				console.log(clickedon);
			}
		}
	}
	else if (id < 17){
		for(var i = 0; i < this.redpieces.length;i++){
			if(id == this.redpieces[i].id){
				clickedon = this.redpieces[i].positions;
				console.log(clickedon);
			}
		}
	}

	else if (id < 98){
		for(var i = 0; i < this.board.cells.length;i++){
			if(id == this.board.cells[i].id){
				clickedon = this.board.cells[i].positions;
				console.log(clickedon);
			}
		}
	}
	return clickedon;
}
