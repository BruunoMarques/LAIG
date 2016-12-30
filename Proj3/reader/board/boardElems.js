function MyGameBoard(scene) {


    CGFobject.call(this, scene);
    this.scene = scene;
    this.pieces = [];
	this.offpieces = [];
	this.globalId = 0;

	this.story = [];

	this.diffArray = [];


	this.initialboard = [[3,0,0,0,0,0,0,0,3],
    [0,0,2,1,1,1,2,0,0],
    [0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,5,0,0,0,0],
    [0,0,6,5,5,5,6,0,0],
    [7,0,0,0,0,0,0,0,7]];

	this.stringedboard = this.boardConvert(this.initialboard);

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
    this.scene.pushMatrix();



    for (var i = 0; i < this.pieces.length; i++) {

            this.pieces[i].display(this.pick,this.materialBaseRed, this.materialSelected, this.pickLock);

    }
	
	  for (var i = 0; i < this.offpieces.length; i++) {

            this.offpieces[i].display(1,this.materialBaseRed, this.materialSelected, false);

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
	this.scene.scale(5,5,1);
	this.clock.display();
	this.scene.popMatrix();
	
	this.scene.clearPickRegistration();
};



MyGameBoard.prototype.checkDifference = function(board) {
	var recieved;
	var current;
	var count1 = 0;
	var count2 = 0;
	var count3 = 0;
	var count5 = 0;
	var count6 = 0;
	var count7 = 0;
	var countL1 = 0;
	var countL2 = 0;
	var countL3 = 0;
	var countL5 = 0;
	var countL6 = 0;
	var countL7 = 0;

	for(var i = 0; i < board.length; i++){
		for(var j = 0; j < board.length; j++){
			recieved = board[i][j];
			if(recieved != 0){			
				}
			 if (recieved == 1){
				count1++;
			}	
			if (recieved == 2){
				count2++;
			}	
			if (recieved == 3){
				count3++;
			}	
			if (recieved == 5){
				count5++;
			}	
			if (recieved == 6){
				count6++;
			}
			if (recieved == 7){
				count7++;
			}				
		}
	}
	
	for(var i = 0; i < this.initialboard.length; i++){
		for(var j = 0; j < this.initialboard.length; j++){
			current = this.initialboard[i][j];
				if(current != 0){
				}
			if (current == 1){
				countL1++;
			}	
			if (current == 2){
				countL2++;
			}	
			if (current == 3){
				countL3++;
			}	
			if (current == 5){
				countL5++;
			}	
			if (current == 6){
				countL6++;
			}
			if (current == 7){
				countL7++;
			}	
		}
	}	
	var d1 =Math.abs(count1 - countL1);
	while(d1 != 0){
			this.diffArray.push(1);
			d1--;
		}	

	var d2 =Math.abs(count2 - countL2);
	while(d2 != 0){
			this.diffArray.push(2);
			d2--;
		}	

	var d3 =Math.abs(count3 - countL3);
	while(d3 != 0){
			this.diffArray.push(3);
			d3--;
		}	

	var d5 =Math.abs(count5 - countL5);
	while(d5 != 0){
			this.diffArray.push(5);
			d5--;
		}	

	var d6 =Math.abs(count6 - countL6);
	while(d6 != 0){
			this.diffArray.push(6);
			d6--;
		}	

	var d7 =Math.abs(count7 - countL7);
	while(d7 != 0){
			this.diffArray.push(7);
			d7--;
		}	

};


MyGameBoard.prototype.createBoard = function() {

	this.board = new MyChessboard(this.scene);

};

MyGameBoard.prototype.updateBoard = function() {
	this.stringedboard = this.boardConvert(this.initialboard);
};


MyGameBoard.prototype.updateBoard2 = function() {
	var converted = [];
	for (var i = 0; i < this.initialboard.length;i++){
			converted.push(this.initialboard[i].reverse());
	}
	this.stringedboard = this.boardConvert(converted);
};


MyGameBoard.prototype.boardConvert = function(board) {

	var arr = "["+board[0]+"]";
	for(var i =1; i < board.length;i++){
		arr = ""+arr+",["+board[i]+"]";
	}


	return "["+arr+"]";

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
					this.initialboard[i].reverse();
					for (var j = 0; j < sz;j++){

							var tp = this.initialboard[i][j];

							if(tp==0){

							}
							else{
							var piecetoadd = new MyNewPiece(this.scene,tp,this.globalId + 1,-4 +i,-4+j);
							this.globalId++;
							this.pieces.push(piecetoadd);
							}
					}
				}
				
				for(var i = 0; i < this.diffArray.length; i++){
					var piecetoadd = new MyNewPiece(this.scene,this.diffArray[i],99,1,8);
					this.offpieces.push(piecetoadd);
				}
};


MyGameBoard.prototype.udpateClock = function(currTime){
		this.clock.update(currTime);
}

MyGameBoard.prototype.updatePick = function(id) {
    this.pick = id;
}

MyGameBoard.prototype.resetRegisterPick = function() {
    this.registerPick = [];

    for (var i = 0; i < this.pieces; i++) {
        this.registerPick.push(true);
    }

	for(var i = 0; i < this.board.cells.length; i++){
		this.registerPick.push(true);
	}
}

/**
Update already picked cell
*/
MyGameBoard.prototype.getPiece = function(id) {
	
		for(var i = 0; i < this.pieces.length;i++){
			if(id == this.pieces[i].id){
				return this.pieces[i];
			}
		}
}

MyGameBoard.prototype.getCell = function(id) {
	
		for(var i = 0; i < this.board.cells.length;i++){
			if(id == this.board.cells[i].id){
				return this.board.cells[i];
			}
		}
}

MyGameBoard.prototype.parseclicks = function(id) {
	if(id <17){
	var clickedon;
	var p = this.getPiece(id);
	clickedon = p.positions;
	}


	else if(id < 98){
	var c = this.getCell(id);
	clickedon = c.positions;
	}

	
	return clickedon;
}
