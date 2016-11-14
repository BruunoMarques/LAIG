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

