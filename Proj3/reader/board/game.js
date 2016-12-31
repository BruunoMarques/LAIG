function MyGame(scene) {
	this.scene = scene;
	this.gamestart = new MyGameBoard(scene);

	this.turn = 0;
	this.pickCount = 0;

	this.thePlay = new MyPlay(null,null);

	this.client = new Client();
	this.resultOf = null;

	this.redScore = 0;
	this.whiteScore = 0;
	this.timevar = 30;
	
	this.direction = 0;
	this.ammount = 0;
	
	this.toUpdate = null;
	this.currID = null;
	this.lastPlayTime = 0;
	this.scoreboard = new MyScoreBoard(scene,3,4,10,7,this.redScore,this.whiteScore);
	this.menu = new MyMenu(scene,3,2,10,7);
};

MyGame.prototype = Object.create(CGFobject.prototype);
MyGame.prototype.constructor = MyGame;



MyGame.prototype.display = function(){

	this.scene.pushMatrix();
	this.gamestart.display();
	this.scoreboard.display();
	this.menu.display();
	this.scene.popMatrix();

};

MyGame.prototype.registerPick = function(customId){


	this.gamestart.updatePick(customId);
	this.checkGame(customId);
	this.startTurn(customId);
}


MyGame.prototype.checkGame = function(id){
	if (id == 100){
		this.scene.changeViewHome();
	}
	else if (id == 101){
		this.timevar = 15;
	}
	else if (id == 102){
		this.timevar = 30;
	}

}


MyGame.prototype.startTurn = function(customId){
	if(this.pickCount % 2 == 0){
		if(customId > 16){
			return;
		}
		else{
		this.thePlay.piece = this.gamestart.parseclicks(customId);
		this.currID = this.gamestart.getPiece(customId);
		this.thePlay.target= [];
		}

	}
	else if(this.pickCount % 2 != 0){
		this.thePlay.target = this.gamestart.parseclicks(customId);
		if(this.thePlay.piece != null && this.thePlay.target != null){
			this.checkPlay(this.thePlay,this.currID);
		}

	}
	this.pickCount++;
}

MyGame.prototype.checkPlay = function(play,piece){

	var check = false;
	var checkplayer = false;
	if(play.piece[0] == play.target[0] && play.piece[1] == play.target[1]){
		return;
		}
	else if(play.piece[0] != play.target[0] && play.piece[1] != play.target[1]){
			return;
	 }
	else if (play.piece[0] == play.target[0]){
		if(play.piece[1] > play.target[1]){
			this.direction = 1;
			this.ammount = play.piece[1] - play.target[1];
		}
		else if(play.piece[1] < play.target[1]){
			this.direction = 0;
			this.ammount =  play.target[1] - play.piece[1];
		}
	}
	else if (play.piece[1] == play.target[1]){
		if(play.piece[0] > play.target[0]){
			this.direction = 3;
			this.ammount = play.piece[0] - play.target[0];
		}
		else if(play.piece[0] < play.target[0]){
			this.direction = 2;
			this.ammount = play.target[0] - play.piece[0];
		}

	}
	if(this.turn %2 == 0 && piece.type < 4){
			checkplayer = true;
	}
	else if(this.turn %2 != 0 && piece.type > 4){
			checkplayer = true;
	}

	if((piece.type == 3 || piece.type == 7 )&& (this.ammount <= 3)){
		check = true;
	}

	if((piece.type == 2 || piece.type == 6 )&& (this.ammount <= 2)){
		check = true;
	}

	if((piece.type == 1 || piece.type == 5 )&& (this.ammount <= 1)){
		check = true;
	}


	if (this.scene.totalTime - this.lastPlayTime > this.timevar){
			this.lastPlayTime = this.scene.totalTime;
			this.turn++;
			//this.scene.myInterface.changeView();
			this.scene.changeViewHome();
			console.log("Play TimedOut, Next turn");
		}

	else {
		if (check && checkplayer){
			this.doPlay(play,this.direction,this.ammount);
			this.lastPlayTime = this.scene.totalTime;
			this.turn++;
			//this.scene.myInterface.changeView();
			//this.scene.changeViewHome();
			console.log("Next turn");
		}
	}
}

MyGame.prototype.getCountWhite = function (){
	var boardtosend = this.gamestart.stringedboard;
	var stringtosend = "count_white("+boardtosend+")";
	var cenas = this;

	this.client.getPrologRequest(stringtosend,function(data){
		cenas.setScoreWhite(data.target.response);
	});
}


MyGame.prototype.getCountRed = function (){
	var boardtosend = this.gamestart.stringedboard;
	var stringtosend = "count_red("+boardtosend+")";
	var cenas = this;

	this.client.getPrologRequest(stringtosend,function(data){
		cenas.setScoreRed(data.target.response);
	});
}

MyGame.prototype.doPlay = function(play, direction,ammount){
	var boardtosend = this.gamestart.stringedboard;
	var stringtosend = "movehelpme("+boardtosend+","+play.piece[0]+","+play.piece[1]+","+this.ammount+","+this.direction+")";
	var cenas = this;
	this.client.getPrologRequest(stringtosend,function(data){
		cenas.parseData(data.target.response);
	});
}

MyGame.prototype.parseData= function(info){
	var cenas2 = JSON.parse(info);
	this.gamestart.checkDifference(cenas2);
	this.gamestart.story.push(this.gamestart.initialboard);
	this.gamestart.initialboard = cenas2;	
	this.animationcheck(this.currID.id);
}


MyGame.prototype.go= function(){
		this.scene.changeViewHome();
		this.gamestart.globalId = 0;
		this.gamestart.pieces = [];
		this.gamestart.updateBoard();
		this.gamestart.createPieces();
		this.updateScore();
}

MyGame.prototype.updateScore= function(){
	this.getCountRed();
	this.getCountWhite();
	this.scoreboard.white =7 - this.redScore;
	this.scoreboard.red = 7 - this.whiteScore;
}

MyGame.prototype.setScoreWhite= function(data){
	var num = JSON.parse(data);
	this.whiteScore =  num -1;
}

MyGame.prototype.setScoreRed= function(data){
	var num = JSON.parse(data);
	this.redScore = num-1;
}

MyGame.prototype.animationcheck= function(id){
	this.p = this.gamestart.getPiece(id);
	var tx;
	var ty;
	
	if(this.direction == 0){
		var tx = this.p.px;
		var ty = this.p.py - this.ammount*2.5;
	}
	else if(this.direction == 1){
		var tx = this.p.px;
		var ty = this.p.py + this.ammount*2.5;
	}
	else if(this.direction == 2){
		var tx = this.p.px + this.ammount*2.5;
		var ty = this.p.py;
	}
	else if(this.direction == 3){
		var tx = this.p.px - this.ammount*2.5;
		var ty = this.p.py;
	}
	
	
	
	this.p.startAnimation(id,this.p.px,this.p.py,tx,ty);
	this.toUpdate = this.p;

}

MyGame.prototype.update= function(currTime){
	if(this.toUpdate != null){
		this.toUpdate.animationUpdate(currTime);
		
	}
}