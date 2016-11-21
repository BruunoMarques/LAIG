
function XMLscene(myInterface) {
	this.myInterface = myInterface;
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);
	
	this.time = 0
	this.totalTime = 0;
	this.actualTime =0;
	this.waitTime = 1;
	this.stop_anim = true;
	this.animComps = [];
	
    this.initCameras();

    this.initLights();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.enableTextures(true);
	this.setUpdatePeriod(1);
	

	this.axis=new CGFaxis(this);
};

XMLscene.prototype.initLights = function () {

	this.lights[0].setPosition(2, 3, 3, 1);
    this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
    this.lights[0].update();
};

XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(80, 70, 70), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.setDefaultAppearance = function () {
    this.setAmbient(0, 0, 0, 1.0); //testando 0.2 0.4 0.8
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);	
};

// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function () 
{
	this.SetInitialStatus();
	//this.SetViews();
	this.StartLights();
	this.StartMats();
	
	this.StartTextures();
};


XMLscene.prototype.SetInitialStatus = function (){
	this.gl.clearColor(this.graph.background_rgb[0],this.graph.background_rgb[1],this.graph.background_rgb[2],this.graph.background_rgb[3]);
	this.setAmbient(this.graph.ambient_rgb[0],this.graph.ambient_rgb[1],this.graph.ambient_rgb[2],this.graph.ambient_rgb[3]);
	
	this.axis = new CGFaxis(this,this.graph.axis_length);//0.2 e' o default
};

XMLscene.prototype.StartLights = function () {
	var OmniCount = this.graph.OmniLightsList.length;
	var SpotCount = this.graph.SpotLightsList.length;
	
	this.LightCount = OmniCount + SpotCount;
	
    this.lightNames = [];
    this.LightState = [];
	
	
	for(var i=0; i < OmniCount; i++){
		this.lights[i].setPosition(this.graph.OmniLightsList[i][2],this.graph.OmniLightsList[i][3],this.graph.OmniLightsList[i][4],this.graph.OmniLightsList[i][5]);
		this.lights[i].setAmbient(this.graph.OmniLightsList[i][6],this.graph.OmniLightsList[i][7],this.graph.OmniLightsList[i][8],this.graph.OmniLightsList[i][9]);
		this.lights[i].setDiffuse(this.graph.OmniLightsList[i][10],this.graph.OmniLightsList[i][11],this.graph.OmniLightsList[i][12],this.graph.OmniLightsList[i][13]);
		this.lights[i].setSpecular(this.graph.OmniLightsList[i][14],this.graph.OmniLightsList[i][15],this.graph.OmniLightsList[i][16],this.graph.OmniLightsList[i][17]);
		this.lights[i].setVisible(true);
		
		
		if(this.graph.OmniLightsList[i][1])
			this.lights[i].enable();
		else
			this.lights[i].disable();
        this.LightState[i] = this.graph.OmniLightsList[i][1];
        this.lightNames.push(this.graph.OmniLightsList[i][0]);
	}	
	
	for(var j=0; j < SpotCount; j++){
		
		this.lights[OmniCount + j].setSpotDirection(this.graph.SpotLightsList[j][4],this.graph.SpotLightsList[j][5],this.graph.SpotLightsList[j][6]);
		this.lights[OmniCount + j].setPosition(this.graph.SpotLightsList[j][7],this.graph.SpotLightsList[j][8],this.graph.SpotLightsList[j][9],1);
		this.lights[OmniCount + j].setAmbient(this.graph.SpotLightsList[j][10],this.graph.SpotLightsList[j][11],this.graph.SpotLightsList[j][12],this.graph.SpotLightsList[j][13]);
		this.lights[OmniCount + j].setDiffuse(this.graph.SpotLightsList[j][14],this.graph.SpotLightsList[j][15],this.graph.SpotLightsList[j][16],this.graph.SpotLightsList[j][17]);
		this.lights[OmniCount + j].setSpecular(this.graph.SpotLightsList[j][18],this.graph.SpotLightsList[j][19],this.graph.SpotLightsList[j][20],this.graph.SpotLightsList[j][21]);
		this.lights[OmniCount + j].setSpotExponent(this.graph.SpotLightsList[j][3]);
        this.lights[OmniCount + j].setSpotCutOff(this.graph.SpotLightsList[j][2]);
		this.lights[OmniCount + j].setVisible(true);
		
		
		if(this.graph.SpotLightsList[j][1])
			this.lights[OmniCount + j].enable();
		else
			this.lights[i].disable();
        this.LightState[OmniCount + j] = this.graph.SpotLightsList[j][1];
        this.lightNames.push(this.graph.SpotLightsList[j][0]);
	}

	this.myInterface.addLightsGroup();
}

XMLscene.prototype.StartMats = function() {
	this.materials = [];
	
	var matCount = this.graph.materialsList.length;
	
    this.material_pos = 0;

	for (var i = 0; i < matCount; i++){
		this.materials[i] =  new CGFappearance(this);
		this.materials[i].setEmission(this.graph.matRGB[i][0],this.graph.matRGB[i][1],this.graph.matRGB[i][2],this.graph.matRGB[i][3]);
		this.materials[i].setAmbient(this.graph.matRGB[i][4],this.graph.matRGB[i][5],this.graph.matRGB[i][6],this.graph.matRGB[i][7]);
		this.materials[i].setDiffuse(this.graph.matRGB[i][8],this.graph.matRGB[i][9],this.graph.matRGB[i][10],this.graph.matRGB[i][11]);
		this.materials[i].setSpecular(this.graph.matRGB[i][12],this.graph.matRGB[i][13],this.graph.matRGB[i][14],this.graph.matRGB[i][15]);
		this.materials[i].setShininess(this.graph.matshininess[i]);
	}

}

class Dimension{
    constructor(x,y){
        this.left = x;
        this.right = y;
    }

}

XMLscene.prototype.StartTextures = function() {
	this.textures = [];
    var texCount = this.graph.TextureList.length;
    this.textID = this.graph.textID;
    this.texArray  = [];
    for(var i = 0; i < texCount; i++){
        this.textures[i] = new CGFtexture(this,this.graph.TextureList[i][0]);
        var texArray_temps = new Dimension(this.graph.TextureList[i][1],this.graph.TextureList[i][2]);
        this.texArray[i] = texArray_temps;
    }
}

XMLscene.prototype.displayPrimitives = function (primitive, info, scale) {

    switch(info){
        case "rectangle":
     
            if(scale) {
                var texparam = this.texArray[this.texQueue[this.texQueue.length -1]];
                primitive.changeTextCoords(texparam.left, texparam.right);
            }
            break;
			
        case "triangle":
            if(scale) {
                var texparam = this.texArray[this.texQueue[this.texQueue.length -1]];
                primitive.changeTextCoords(texparam.left, texparam.right);
            }
            break;

    }

}

XMLscene.prototype.displayMaterial = function (vertex) {
    var index = 0;
    var mat_l = vertex.component.materials.length;
    if(this.material_pos + 1 <= mat_l) {
        index = this.material_pos;
    }
    if(this.material_pos + 1 < mat_l){
        this.matBool = true;
    }
    var indice = vertex.component.materials[index];
    if(indice != -1 && typeof indice == 'number'){
        this.matQueue.push(indice);
        return true;
    }
    else if(indice == "inherit")
        return false;
    else
        console.log("abort mission");
    return false;
}

XMLscene.prototype.displayTexture = function (vertex) {
    var texture_id = vertex.component.texture;
    var matIndex = this.matQueue[this.matQueue.length-1];
    this.texparam = null;
	
	
    if(typeof texture_id == 'number'){
        this.texQueue.push(texture_id);
        this.materials[matIndex].setTexture(this.textures[texture_id]);
        this.texparam = this.texArray[this.texQueue[this.texQueue.length -1]];
        if(this.texparam.right != 1.0 || this.texparam.left != 1.0)this.materials[matIndex].setTextureWrap('REPEAT', 'REPEAT');
        else this.materials[matIndex].setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.materials[matIndex].apply();
		
        return true;
    }
    if(texture_id == "inherit"){
        var next_text = this.texQueue[this.texQueue.length -1 ];
        this.materials[matIndex].setTexture(this.textures[next_text]);
        if(next_text == "none") {
            this.materials[matIndex].setTexture(null);
            this.materials[matIndex].apply();
            return false;
        }
        this.texparam = this.texArray[next_text];
        if(this.texparam.right != 1.0 || this.texparam.left != 1.0)this.materials[matIndex].setTextureWrap('REPEAT', 'REPEAT');
        else this.materials[matIndex].setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }
    else if(texture_id == "none"){
        this.materials[matIndex].setTexture(null);
        this.texQueue.push(texture_id);
        this.materials[matIndex].apply();
		
        return true;
    }
    this.materials[matIndex].apply();
	
    return false;
}



XMLscene.prototype.RecursiveSearch = function (vertex) {
    this.pushMatrix();
	
    var matCheck = this.displayMaterial(vertex);
    var texCheck = this.displayTexture(vertex);

	if (vertex.component.animations.length > 0){

		this.animation(vertex);
	}
    this.multMatrix(vertex.component.matrix);
	
    var searchvar = false;
	
    if(this.texparam != null)searchvar = ((texCheck == true || vertex.component.texture == "inherit") && (this.texparam.left != 1 || this.texparam.right != 1));
	
    for(var i = 0; i < vertex.primitives.length; i++){
        this.displayPrimitives(vertex.component.primitivess[i],vertex.primitive_types[i],searchvar);
		vertex.component.primitivess[i].display();
    }
	
    for(var i = 0; i < vertex.derivates.length; i++){
        this.RecursiveSearch(vertex.derivates[i]);
    }
    if(matCheck)this.matQueue.pop();
    if(texCheck)this.texQueue.pop();
	
	
    this.popMatrix();
}

XMLscene.prototype.displaySceneGraph = function () {
	var graphScene = this.graph.graph;
	var indice = graphScene.vertexIDs.indexOf(this.graph.sceneRoot);
    this.matQueue = [];
    this.texQueue = [];
    this.RecursiveSearch(graphScene.vertexSet[indice]);
}


XMLscene.prototype.updateLights = function(index){
    if(this.LightState[index]) this.lights[index].enable();
    else this.lights[index].disable();
    this.lights[index].update();
}

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
        this.displaySceneGraph();
		for(var i = 0;i < this.LightCount; i++){
			this.updateLights(i);
		}
	};
};

XMLscene.prototype.update = function(currTime){

	this.actualTime = (currTime - this.time) /1000;
	if (this.time == 0){
		this.actualTime = 0;
	}

	this.time = currTime;  
	this.totalTime += this.actualTime;
	
	if( this.stop_anim && this.totalTime > this.waitTime){
		this.stop_anim = false;
		this.totalTime = 0;
		this.time = 0;	
		}

	if(!this.stop_anim){
		for(var i =0; i <this.animComps.length; i++){
			this.animComps[i].update(this.actualTime);
		}
	}	
}


XMLscene.prototype.animation = function(vertex){
	
	var originPoint = vertex.component.origin;
	console.log(originPoint);
	var index = vertex.component.currAnimation;
	if(index == vertex.component.animations.length){
		index--;
	}
	var animate = vertex.component.animations[index];
	
	if(animate instanceof MyLinearAnimation){

        this.translate(animate.translation.x,animate.translation.y,animate.translation.z);
        this.translate(originPoint.x,originPoint.y,originPoint.z);
        this.rotate(animate.rotangle,0,1,0);
        this.translate(-originPoint.x,-originPoint.y,-originPoint.z);
    }
	
	
    else if(animate instanceof MyCircularAnimation){

		console.log(animate);
        this.translate(animate.center.x,animate.center.y,animate.center.z);
        this.rotate(animate.currangle,0,1,0);
        this.translate(animate.x1,animate.y1,animate.z1);
        this.rotate(animate.startang,0,1,0);
        this.translate(-originPoint.x,-originPoint.y,-originPoint.z);
    }
}

