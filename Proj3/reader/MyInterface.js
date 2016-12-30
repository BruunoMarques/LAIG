/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	return true;
};

MyInterface.prototype.addLightsGroup = function(){
    var groupLights = this.gui.addFolder("Lights");
    
	
    for(var i = 0; i < this.scene.LightCount; i++){
        groupLights.add(this.scene.LightState, i, this.scene.LightState[i]).name(this.scene.lightNames[i]);
    }
}

MyInterface.prototype.changeView = function (){
	this.scene.cam += 1;
    if(this.scene.cam == this.scene.cameras.length){
		this.scene.cam = 0;
	}
    this.scene.changeCamera();
    this.setActiveCamera(this.scene.camera);
    console.log("Switched Camera");
}


MyInterface.prototype.undo = function (){
	if(this.scene.game.gamestart.story.length != 0){
		this.scene.game.gamestart.initialboard = this.scene.game.gamestart.story.pop();
		this.scene.game.gamestart.globalId = 0;
		this.scene.game.gamestart.pieces = [];
		this.scene.game.gamestart.updateBoard2();
		this.scene.game.gamestart.createPieces();
		this.scene.game.updateScore();
		console.log("Undid");
	}

	

}

MyInterface.prototype.processKeyboard = function(event) {
		CGFinterface.prototype.processKeyboard.call(this,event);
		switch (event.keyCode || event.which)
	{
		    case 118:
            this.changeView();
            break;
			
			case 117:
            this.undo();
            break;
	}
};
