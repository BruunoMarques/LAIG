
function XMLscene() {
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	this.axis=new CGFaxis(this);
};

XMLscene.prototype.initLights = function () {

	this.lights[0].setPosition(2, 3, 3, 1);
    this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
    this.lights[0].update();
};

XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.setDefaultAppearance = function () {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);	
};

// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function () 
{
	


	this.gl.clearColor(this.graph.background_rgb[0],this.graph.background_rgb[1],this.graph.background_rgb[2],this.graph.background_rgb[3]);
	this.setGlobalAmbientLight(this.graph.ambient_rgb[0],this.graph.ambient_rgb[1],this.graph.ambient_rgb[2],this.graph.ambient_rgb[3]);
	this.lights[0].setVisible(true);
    this.lights[0].enable();
	
	this.startLights();

};


XMLscene.prototype.startLights = function(){

		var lightcounter = 0;
	
	
	for (var i = 0; i < this.graph.OmnilightsList.length ; i++ ) {
		
		var tempLight =this.graph.OmnilightsList[i];
		this.lights[lightcounter].setPosition(tempLight.location_omni[0],tempLight.location_omni[1],tempLight.location_omni[2],tempLight.welement);
		this.lights[lightcounter].setAmbient(tempLight.ambient_omni[0],tempLight.ambient_omni[1],tempLight.ambient_omni[2],tempLight.ambient_omni[3]);
		this.lights[lightcounter].setDiffuse(tempLight.diffuse_omni[0],tempLight.diffuse_omni[1],tempLight.diffuse_omni[2],tempLight.diffuse_omni[3]);
		this.lights[lightcounter].setSpecular(tempLight.specular_omni[0],tempLight.specular_omni[1],tempLight.specular_omni[2],tempLight.specular_omni[3]);
		
		this.lights[lightcounter].setVisible(true);
		if (tempLight.enabled_omni){
			this.lights[lightcounter].enable();

			//this.lightStatus[lightcounter] = true;
		}
		else{
			this.lights[lightcounter].disable();
			//this.lightStatus[lightcounter] = false;
		}
		lightcounter++;
	}



	for (var i = 0; i < this.graph.SpotlightsList.length ; i++ ) {
		
		var tempLight =this.graph.SpotlightsList[i];
		this.lights[lightcounter].setPosition(tempLight.location_spot[0],tempLight.location_spot[1],tempLight.location_spot[2]);
		this.lights[lightcounter].setAmbient(tempLight.ambient_spot[0],tempLight.ambient_spot[1],tempLight.ambient_spot[2],tempLight.ambient_spot[3]);
		this.lights[lightcounter].setDiffuse(tempLight.diffuse_spot[0],tempLight.diffuse_spot[1],tempLight.diffuse_spot[2],tempLight.diffuse_spot[3]);
		this.lights[lightcounter].setSpecular(tempLight.specular_spot[0],tempLight.specular_spot[1],tempLight.specular_spot[2],tempLight.specular_spot[3]);
		this.lights[lightcounter].setSpotDirection(tempLight.target_spot[0],tempLight.target_spot[1],tempLight.target_spot[2],tempLight.target_spot[3]);
		this.lights[lightcounter].setSpotExponent(tempLight.exponent);
		this.lights[lightcounter].setSpotCutOff(tempLight.angle);

		this.lights[lightcounter].setVisible(true);
		if (tempLight.enabled_spot){
			this.lights[lightcounter].enable();

			//this.lightStatus[lightcounter] = true;
		}
		else{
			this.lights[lightcounter].disable();
			//this.lightStatus[lightcounter] = false;
		}
		lightcounter++;

	}


	
	console.log(this.lights);
		
};

XMLscene.prototype.display = function () {
	// ---- BEGIN Background, camera and axis setup
	
	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	
	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
    this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Draw axis
	this.axis.display();

	this.setDefaultAppearance();
	
	// ---- END Background, camera and axis setup

	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it
	if (this.graph.loadedOk)
	{	
		

		for (var i = 0; i < this.lights.length ; i++ ) {
			this.lights[i].update();
		}
	};	
};



XMLscene.prototype.ChangeLights = function(){

	for (var i = 0; i < this.numLight; i++) {
		if (this.lightStatus[i])
			this.lights[i].enable();
		else
			this.lights[i].disable();

		this.lights[i].update();
	}


};

