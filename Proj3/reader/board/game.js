function MyGame(scene) {
	this.scene = scene;
	this.gamestart = new MyGameBoard(scene);

	this.turn = 0;
	this.pickCount = 0;

	this.thePlay = new MyPlay([],[]);
	
	this.client = new Client();
	this.resultOf = null;

	this.redScore = 7;
	this.whiteScore = 7;



 //depois é preciso por isto noutro sitio, onde vai ser atualizados os scores, senao nao vai atualizar
	this.scoreboard = new MyScoreBoard(scene,3,4,10,7,this.redScore,this.whiteScore);
};

MyGame.prototype = Object.create(CGFobject.prototype);
MyGame.prototype.constructor = MyGame;



MyGame.prototype.display = function(){

	this.scene.pushMatrix();
	this.gamestart.display();
	this.scoreboard.display();
	this.scene.popMatrix();

};

MyGame.prototype.registerPick = function(customId){


	this.gamestart.updatePick(customId);
	this.startTurn(customId);
}

MyGame.prototype.startTurn = function(customId){

	if(this.pickCount % 2 == 0){
		this.thePlay.piece = this.gamestart.parseclicks(customId);
		this.thePlay.target= [];
	}
	else if(this.pickCount % 2 != 0){
		this.thePlay.target = this.gamestart.parseclicks(customId);
		this.checkPlay(this.thePlay);
	}
	this.pickCount++;
	this.turn++;
}

MyGame.prototype.checkPlay = function(play){
	var direction;
	var ammount;
	if(play.piece[0] == play.target[0] && play.piece[1] == play.target[1]){
		return;
		}
	else if(play.piece[0] != play.target[0] && play.piece[1] != play.target[1]){
			return;
	 }
	else if (play.piece[0] == play.target[0]){
		if(play.piece[1] > play.target[1]){
			direction = 1;
			ammount = play.piece[1] - play.target[1];
		}
		else if(play.piece[1] < play.target[1]){
			direction = 0;
			ammount =  play.target[1] - play.piece[1];
		}
	}
	else if (play.piece[1] == play.target[1]){
		if(play.piece[0] > play.target[0]){
			direction = 3;
			ammount = play.piece[0] - play.target[0];
		}
		else if(play.piece[0] < play.target[0]){
			direction = 2;
			ammount = play.target[0] - play.piece[0];
		}

	}
	this.doPlay(play,direction,ammount);
	
		console.log("Next turn");
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
	var stringtosend = "movehelpme("+boardtosend+","+play.piece[0]+","+play.piece[1]+","+ammount+","+direction+")";
	console.log(stringtosend);
	
	var cenas = this;
	this.client.getPrologRequest(stringtosend,function(data){
		console.log(data.target.response);
		cenas.parseData(data.target.response);
	});
}

MyGame.prototype.parseData= function(info){
	var cenas2 = JSON.parse(info);
	this.gamestart.initialboard = cenas2;
	this.gamestart.globalId = 0;
	this.gamestart.redpieces = [];
	this.gamestart.whitepieces=[];
	this.gamestart.updateBoard();
	this.gamestart.createPieces();
	this.updateScore();
}

MyGame.prototype.updateScore= function(){
	this.getCountRed();
	this.getCountWhite();
	this.scoreboard.white =this.whiteScore;
	this.scoreboard.red = this.redScore;
}

MyGame.prototype.setScoreWhite= function(data){
	var num = JSON.parse(data);
	this.whiteScore =  num -1;
}

MyGame.prototype.setScoreRed= function(data){
	var num = JSON.parse(data);
	this.redScore = num-1;
}

