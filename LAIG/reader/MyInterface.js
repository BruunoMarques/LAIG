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



MyInterface.prototype.init = function(application) {

    CGFinterface.prototype.init.call(this, application);

    this.gui = new dat.GUI();
	
    this.OmniLightslist = this.gui.addFolder("Omni Lights");

    this.SpotLightslist = this.gui.addFolder("Spot Lights");


    return true;
};




MyInterface.prototype.processKeyDown = function(event) {


    switch (event.keyCode) {
        case (86):
        case (118): //V
            this.scene.updateView();
            break;
        case (77):
        case (109): //M
            this.scene.updateMaterial();
            break;
    };
};
