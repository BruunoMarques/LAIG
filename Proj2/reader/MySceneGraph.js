
function MySceneGraph(filename, scene) {
	this.loadedOk = null;

	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;
	this.graph = new MyGraph();
	// File reading
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */

	this.reader.open('scenes/'+filename, this);
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function()
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;
	this.loadedOk = this.parseFunctionStart(rootElement);
	if(this.loadedOk) this.scene.onGraphLoaded();
};






MySceneGraph.prototype.parseFunctionStart = function(rootElement) {
	var error = this.checkTagOrder(rootElement);
    if(error != null){
        this.onXMLError(error);
        return false;
    }
    else return true;
}


MySceneGraph.prototype.checkTagOrder= function(rootElement){
	var tempChildren = rootElement.children;
	//console.log(tempChildren);
	if(tempChildren.length != 10){
		return 1;
	}

	if(tempChildren[0].tagName != "scene")
		console.warn("Tag 1 of DSX is not scene");

	if(tempChildren[1].tagName != "views")
		console.warn("Tag 2 of DSX is not views");

	if(tempChildren[2].tagName != "illumination")
		console.warn("Tag 3 of DSX is not illumination");

	if(tempChildren[3].tagName != "lights")
		console.warn("Tag 4 of DSX is not lights");

	if(tempChildren[4].tagName != "textures")
		console.warn("Tag 5 of DSX is not textures");

	if(tempChildren[5].tagName != "materials")
		console.warn("Tag 6 of DSX is not materials");

	if(tempChildren[6].tagName != "transformations")
		console.warn("Tag 7 of DSX is not transformations");

	if(tempChildren[7].tagName != "animations")
			console.warn("Tag 8 of DSX is not animations");

	if(tempChildren[8].tagName != "primitives")
		console.warn("Tag 9 of DSX is not primitives");

	if(tempChildren[9].tagName != "components")
		console.warn("Tag 10 of DSX is not components");



    return 	this.parseScene(rootElement);
}


MySceneGraph.prototype.parseScene = function(rootElement){ //done
	var elems = rootElement.getElementsByTagName('scene');

		if (elems == null){
		return "Must add elements";
	}
		if (elems.length != 1){
		return "Just add one scene";
	}

	this.sceneRoot = this.reader.getString(elems[0],'root',true);
	this.axis_length = this.reader.getFloat(elems[0],'axis_length',true);

    return 	this.parseViews(rootElement);
}

MySceneGraph.prototype.parseViews = function(rootElement) {
    var elems = rootElement.getElementsByTagName('views');
    var viewsNumber = elems[0].children.length;
		if(viewsNumber<1){
        return "Atleast one view is required";
    }
    var defaultV = this.reader.getString(elems[0],'default',true);
    var perspectives = [];
    var numRef = [];
    this.views = [];
			for (var i = 0; i < viewsNumber;i++)
    {
        var set = [];
        this.views[i] = [];
        perspectives[i] = elems[0].children[i];
        var id_view = this.reader.getString(perspectives[i],'id',true);
        if(numRef.indexOf(id_view) != -1) return "numRef repeated!";
        numRef.push(id_view);
        set[0] = id_view;
        set[1] = this.reader.getFloat(perspectives[i],'near',true);
        set[2] = this.reader.getFloat(perspectives[i],'far',true);
        set[3] = this.reader.getFloat(perspectives[i],'angle',true);
        set[3] = this.degConverter(set[3]);

        var p_from = perspectives[i].children[0];
        var p_to = perspectives[i].children[1];

        this.getXYZ(set, p_from);
        this.getXYZ(set, p_to);

        this.views[i] = set;
    }
    this.first_view = numRef.indexOf(defaultV);
		if(this.first_view == -1)return "No default view";



    return this.parseIllumination(rootElement);
}

MySceneGraph.prototype.parseIllumination = function(rootElement){
	var elems = rootElement.getElementsByTagName('illumination');

	this.doublesided_illu = this.reader.getBoolean(elems[0], 'doublesided', true);
	this.local_illu = this.reader.getBoolean(elems[0], 'local', true);

	var size = elems[0].children.length;

	if(size != 2){
		return "Ambient and Background missing";
	}

	this.ambient_rgb = [];
	this.background_rgb = [];

	for(var i = 0;i< size; i++){
		var e = elems[0].children[i];



		if(i == 0){
            this.getRGBA(this.ambient_rgb,e);
		}
		else{
            this.getRGBA(this.background_rgb,e);
		}
	}

	return 	this.parseLights(rootElement);
}

MySceneGraph.prototype.parseLights = function(rootElement){
    var elems = rootElement.getElementsByTagName('lights');

    var size = elems[0].children.length;

    var omniCheck = false;
    var spotCheck = false;

	var sizeO = 0;
    var sizeS = 0;
    var numRef = [];
    var lightRef = null;



    this.OmniLightsList = [];
    this.SpotLightsList = [];




    for(var i = 0;i<size;i++){
        var e = elems[0].children[i];
        if(e.nodeName == "omni"){
            omniCheck = true;
            this.OmniLightsList[sizeO] = [];

				lightRef = this.reader.getString(e, 'id', true);


            if(numRef.indexOf(lightRef) != -1)return "numRef Repeated!";
            numRef.push(lightRef);

            this.OmniLightsList[sizeO][0] = lightRef;
            this.OmniLightsList[sizeO][1] = this.reader.getBoolean(e, 'enabled', true);
            this.getXYZ(this.OmniLightsList[sizeO], e.children[0]);
            this.OmniLightsList[sizeO][5] = this.reader.getFloat(e.children[0],'w',true);


            for(var j = 1;j<4;j++){
                this.getRGBA(this.OmniLightsList[sizeO], e.children[j]);
            }
            sizeO+=1;
        }


        else if(e.nodeName == "spot"){
            spotCheck = true;
            this.SpotLightsList[sizeS] = [];
            lightRef = this.reader.getString(e, 'id', true);
            if(numRef.indexOf(lightRef) != -1)return "numRef repeated!";
			numRef.push(lightRef);
            this.SpotLightsList[sizeS][0] = lightRef;
            this.SpotLightsList[sizeS][1] = this.reader.getBoolean(e, 'enabled', true);
            var angle =  this.reader.getString(e, 'angle', true);
            angle = this.degConverter(angle);
            this.SpotLightsList[sizeS][2] = angle;
            this.SpotLightsList[sizeS][3] = this.reader.getString(e, 'exponent', true);
            this.getXYZ(this.SpotLightsList[sizeS], e.children[0]);
            this.getXYZ(this.SpotLightsList[sizeS], e.children[1]);
            for(var j = 1;j<4;j++){
                this.getRGBA(this.SpotLightsList[sizeS], e.children[j+1]);
            }
            sizeS+=1;
        }
    }

    if(!omniCheck && !spotCheck){
        return "Missing block";
    }

    if((sizeO + sizeS) > 8)
        return "light <= 8";

    return this.parseTextures(rootElement);
}

MySceneGraph.prototype.parseTextures = function(rootElement) {
    var elems = rootElement.getElementsByTagName('textures');
    var textCounter = elems[0].children.length;

	   var textures;


    if(textCounter < 1) return "One texture required atleast!";



    this.textID = [];
    this.TextureList = [];

    for (var i = 0; i < textCounter;i++)
    {
        var set = [];
        this.TextureList[i] = [];
        textures = elems[0].children[i];
        var id = this.reader.getString(textures,'id',true);
        if(this.textID.indexOf(id) != -1) return "numRef repeated!";
        this.textID.push(id);
        set[0] = this.reader.getString(textures,'file',true);
        set[1] = this.reader.getFloat(textures,'length_s',true);
        set[2] = this.reader.getFloat(textures,'length_t',true);
        this.TextureList[i] = set;
    }

    return 	this.parseMaterials(rootElement);
}


MySceneGraph.prototype.parseMaterials = function(rootElement){
	var elems = rootElement.getElementsByTagName('materials');
	var size = elems[0].children.length;

	if(size < 1)
		return "More than one material is required";

	this.materialsList = [];
	this.matRGB = [];
	this.matshininess = [];

	for(var i = 0;i < size; i++){
		var e = elems[0].children[i];

		this.matRGB[i] = [];
		var numRef = this.reader.getString(e,"id",true);

		if(this.materialsList.indexOf(numRef) != -1)return "numRef repeated";
		this.materialsList[i] = numRef;
		for(var j = 0; j < 4; j++){
            this.getRGBA(this.matRGB[i],e.children[j]);
		}
		this.matshininess[i] = this.reader.getFloat(e.children[4],'value',true);
	}

	return this.parseTransformations(rootElement);
}


MySceneGraph.prototype.parseTransformations = function(rootElement){
	var elems = rootElement.getElementsByTagName('transformations');

	var size = elems[0].children.length;
		if(size < 1)
		return "needs atleast one transformation";

	this.transformationsList = [];


    this.transMatrix = [];

	for(var i = 0; i < size; i++){
		var e = elems[0].children[i];

		var numRef = this.reader.getString(e,'id',true);
		if(this.transformationsList.indexOf(numRef) != -1)return "numRef repeated!";
		this.transformationsList[i] = numRef;
        this.transMatrix[i] = this.getMatrix(e);

	}

    return 	this.parseAnimations(rootElement);
}

MySceneGraph.prototype.parseAnimations = function(rootElement){
	var elems = rootElement.getElementsByTagName('animations');

	this.animationsList = [];

	var size = elems[0].children.length;
	if(size == 0)
		return 	this.parsePrimitives(rootElement);

	for(var i = 0; i < size; i++){
		var e = elems[0].children[i];


		var numRef = this.reader.getString(e,'id',true);
		if(this.animationsList.indexOf(numRef) != -1)return "numRef repeated!";


		var span = this.reader.getString(e,'span',true);
		var type = this.reader.getString(e,'type',true);

		if(type == "linear"){
			var elems1 = elems[0].getElementsByTagName('controlpoint');
			var size1 = elems1.length;
			this.controlPoints = [];

			for(var j = 0; j < size1; j++){
				this.cp = [];

				this.getControlPoint(this.cp,elems1[j]);
				this.controlPoints.push(this.cp);
			}

			var object = new MyLinearAnimation(numRef,span,this.controlPoints);
			this.animationsList.push(object);

		}else if(type == "circular"){

			var radius = this.reader.getFloat(e,'radius',true);
			var centerx = this.reader.getFloat(e,'centerx',true);
			var centery = this.reader.getFloat(e,'centery',true);
			var centerz = this.reader.getFloat(e,'centerz',true);
			var startang = this.reader.getFloat(e,'startang',true);
			var rotang = this.reader.getFloat(e,'rotang',true);
			var fixstartang = this.degConverter(startang);
			var fixrotang = this.degConverter(rotang);
 			var object = new MyCircularAnimation(numRef,span,radius,centerx,centery,centerz,fixstartang,fixrotang);
			this.animationsList.push(object);
		}else
			return "animation type invalid!";
	}

	return 	this.parsePrimitives(rootElement);
}

MySceneGraph.prototype.parsePrimitives = function(rootElement){
	var elems = rootElement.getElementsByTagName('primitives');
	var size = elems[0].children.length;
	var IDstack = [];


	if(size < 1)
		return "Atleast one primitive";

	this.rectangles = [];
	this.triangles = [];
	this.cylinders = [];
	this.spheres = [];
	this.donuts = [];
	this.planes = [];
	this.patches = [];
	this.vehicles = [];
	this.chessboards = [];

	var obj = {
		size_r : 0,
		size_t : 0,
		size_c : 0,
		size_s : 0,
		size_d : 0,
		size_pt : 0,
		size_pl : 0,
		size_v : 0,
		size_ch : 0
	};



	for(var i = 0;i < size;i++){
				var e = elems[0].children[i];


		for(var j = 0; j < e.children.length; j++){
			var error = this.readPrimitives(e,j,obj,IDstack);
			if(error != null) return error;
		}

	}

	return   this.parseComponents(rootElement);

}


MySceneGraph.prototype.readPrimitives = function (e, index, obj, IDstack){
	var id = this.reader.getString(e,'id',true);
	if(IDstack.indexOf(id) != -1) {
	    if(e.children[index].nodeName != e.children[index-1].nodeName)
	    return "ID already exists";
    }
	else IDstack.push(id);
	switch(e.children[index].nodeName){
		case "rectangle":
			this.rectangles[obj.size_r] = [];
			this.rectangles[obj.size_r][0] = id;
			this.rectangles[obj.size_r][1] = this.reader.getFloat(e.children[index],'x1',true);
			this.rectangles[obj.size_r][2] = this.reader.getFloat(e.children[index],'y1',true);
			this.rectangles[obj.size_r][3] = this.reader.getFloat(e.children[index],'x2',true);
			this.rectangles[obj.size_r][4] = this.reader.getFloat(e.children[index],'y2',true);
			obj.size_r+=1;
			break;


		case "triangle":
			this.triangles[obj.size_t] = [];
			this.triangles[obj.size_t][0] = id;
			this.triangles[obj.size_t][1] = this.reader.getFloat(e.children[index],'x1',true);
			this.triangles[obj.size_t][2] = this.reader.getFloat(e.children[index],'y1',true);
			this.triangles[obj.size_t][3] = this.reader.getFloat(e.children[index],'z1',true);
			this.triangles[obj.size_t][4] = this.reader.getFloat(e.children[index],'x2',true);
			this.triangles[obj.size_t][5] = this.reader.getFloat(e.children[index],'y2',true);
			this.triangles[obj.size_t][6] = this.reader.getFloat(e.children[index],'z2',true);
			this.triangles[obj.size_t][7] = this.reader.getFloat(e.children[index],'x3',true);
			this.triangles[obj.size_t][8] = this.reader.getFloat(e.children[index],'y3',true);
			this.triangles[obj.size_t][9] = this.reader.getFloat(e.children[index],'z3',true);
			obj.size_t+=1;
			break;


		case "cylinder":
			this.cylinders[obj.size_c] = [];
			this.cylinders[obj.size_c][0] = id;
			this.cylinders[obj.size_c][1] = this.reader.getFloat(e.children[index],'base',true);
			this.cylinders[obj.size_c][2] = this.reader.getFloat(e.children[index],'top',true);
			this.cylinders[obj.size_c][3] = this.reader.getFloat(e.children[index],'height',true);
			this.cylinders[obj.size_c][4] = this.reader.getFloat(e.children[index],'slices',true);
			this.cylinders[obj.size_c][5] = this.reader.getFloat(e.children[index],'stacks',true);
			obj.size_c+=1;
			break;


		case "sphere":
			this.spheres[obj.size_s] = [];
			this.spheres[obj.size_s][0] = id;
			this.spheres[obj.size_s][1] = this.reader.getFloat(e.children[index],'radius',true);
			this.spheres[obj.size_s][2] = this.reader.getInteger(e.children[index],'slices',true);
			this.spheres[obj.size_s][3] = this.reader.getInteger(e.children[index],'stacks',true);
			obj.size_s+=1;
			break;


		case "torus":
			this.donuts[obj.size_d] = [];
			this.donuts[obj.size_d][0] = id;
			this.donuts[obj.size_d][1] = this.reader.getFloat(e.children[index],'inner',true);
			this.donuts[obj.size_d][2] = this.reader.getFloat(e.children[index],'outer',true);
			this.donuts[obj.size_d][3] = this.reader.getFloat(e.children[index],'slices',true);
			this.donuts[obj.size_d][4] = this.reader.getFloat(e.children[index],'loops',true);
			obj.size_d+=1;
			break;

		case "plane":
			this.planes[obj.size_pl] = [];
			this.planes[obj.size_pl][0] = id;
			this.planes[obj.size_pl][1] = this.reader.getFloat(e.children[index],'dimX',true);
			this.planes[obj.size_pl][2] = this.reader.getFloat(e.children[index],'dimY',true);
			this.planes[obj.size_pl][3] = this.reader.getFloat(e.children[index],'partsX',true);
			this.planes[obj.size_pl][4] = this.reader.getFloat(e.children[index],'partsY',true);
			obj.size_pl+=1;
			break;

		case "patch":
			this.patches[obj.size_pt] = [];
			this.patches[obj.size_pt][0] = id;
			this.patches[obj.size_pt][1] = this.reader.getFloat(e.children[index],'orderU',true);
			this.patches[obj.size_pt][2] = this.reader.getFloat(e.children[index],'orderV',true);
			this.patches[obj.size_pt][3] = this.reader.getFloat(e.children[index],'partsU',true);
			this.patches[obj.size_pt][4] = this.reader.getFloat(e.children[index],'partsV',true);
			this.patches[obj.size_pt][5] = [];
			for(var i = 0; i < e.children[index].children.length; i++ ){
				this.patches[obj.size_pt][5][i] = this.getControlPointPatch(e.children[index].children[i]);
			}
			obj.size_pt+=1;
			break;

			case "vehicle":
				this.vehicles[obj.size_v] = [];
				this.vehicles[obj.size_v][0] = id;
				obj.size_v+=1;
				break;

			case "chessboard":
				this.chessboards[obj.size_ch] = [];
				this.chessboards[obj.size_ch][0] = id;
				this.chessboards[obj.size_ch][1] = this.reader.getFloat(e.children[index],'du',true);
				this.chessboards[obj.size_ch][2] = this.reader.getFloat(e.children[index],'dv',true);
				this.chessboards[obj.size_ch][3] = this.reader.getString(e.children[index],'textureref',true);
				this.chessboards[obj.size_ch][4] = this.reader.getFloat(e.children[index],'su',true);
				this.chessboards[obj.size_ch][5] = this.reader.getFloat(e.children[index],'sv',true);
				this.chessboards[obj.size_ch][6] = [];
				this.getRGBA(this.chessboards[obj.size_ch][6], e.children[index].children[0]);
				this.chessboards[obj.size_ch][7] = [];
				this.getRGBA(this.chessboards[obj.size_ch][7], e.children[index].children[1]);
				this.chessboards[obj.size_ch][8] = [];
				this.getRGBA(this.chessboards[obj.size_ch][8], e.children[index].children[2]);
				obj.size_ch+=1;
				break;
	}

}

MySceneGraph.prototype.runPrimitives = function(vertex, types, id){

    var emptyvar;
    if((emptyvar = this.isPrimitive(types[0], id, vertex, "rectangle")) == null)
    if((emptyvar = this.isPrimitive(types[1], id, vertex, "triangle")) == null)
    if((emptyvar = this.isPrimitive(types[2], id, vertex, "cylinder")) == null)
    if((emptyvar = this.isPrimitive(types[3], id, vertex, "sphere")) == null)
    if((emptyvar = this.isPrimitive(types[4], id, vertex, "torus")) == null)
		if((emptyvar = this.isPrimitive(types[5], id, vertex, "plane")) == null)
		if((emptyvar = this.isPrimitive(types[6], id, vertex, "patch")) == null)
		if((emptyvar = this.isPrimitive(types[7], id, vertex, "vehicle")) == null)
		if((emptyvar = this.isPrimitive(types[8], id, vertex, "chessboard")) == null)
                        return;



}

MySceneGraph.prototype.isPrimitive = function(type, id, vertex, tipo){
    var help = 0;


    for(var i = 0; i < type.length; i++){
        if(type[i][0] == id){
            vertex.primitive_types.push(tipo);
            vertex.primitives.push(type[i]);
            help = 1;
        }
        else if(help == 1)
            return "end primitives";
    }
    if(help == 1) return "end primitives";
    return null;
}





MySceneGraph.prototype.parseComponents = function(rootElement){
	var elems = rootElement.getElementsByTagName('components');
	var size = elems[0].children.length;

	this.components = [];


    var types = [];
    types.push(this.rectangles); types.push(this.triangles); types.push(this.cylinders); types.push(this.spheres); types.push(this.donuts);
		types.push(this.planes);	types.push(this.patches); types.push(this.vehicles); types.push(this.chessboards);

		for(var i = 0;i < size; i++){
		var e = elems[0].children[i];
        var error = null;
		var type = new MyComponent();


		type.id = this.reader.getString(e,'id',true);
        var vertex = new Node();

		if(this.components.indexOf(type.id) != -1)
			return "Ref Repeated ";
		this.components.push(type.id);


		for(var j = 0; j < e.children.length; j++){
			var child = e.children[j];
			if(child.nodeName == "texture"){
                var texID = this.reader.getString(child,"id",true);
                type.texture = this.textID.indexOf(texID);
                if(type.texture == -1) type.texture = texID;
			}
			if(child.nodeName == "transformation" && child.children[0] != "transformatonref"){
			    type.matrix = this.getMatrix(child);
            }
			for(var k = 0; k < child.children.length;k++){
				var transf = child.children[k];
				if(child.nodeName == "transformation"){

					if(transf.nodeName == "transformationref"){
						if(child.children.length != 1)
							return + type.id ;
						type.transformation_ref = this.reader.getString(transf,"id",true);
                        type.matrix = this.getTransformation(type.transformation_ref);
                        if(type.matrix == -1) return  type.transformation_ref;
					}
				}


				if(child.nodeName == "animation"){

					var obj_id = this.reader.getString(transf,"id",true);

					for (i = 0; i < this.animationsList.length; i++){
						if(obj_id == this.animationsList[i].id) {
							var animationref = this.animationsList[i].duplicate();
							}
					}
					if (type.animations.length == 0){
					type.startOrigin();
					}
					if (animationref instanceof MyLinearAnimation){
						if (type.animations.length < 1){
						var originalvec = vec3.fromValues(type.origin.x,type.origin.y,type.origin.z);
						var startpoint = animationref.controlPoints[0];
						animationref.distance +=  vec3.distance(vec3.fromValues(startpoint[0],startpoint[1],startpoint[2]), originalvec);
						animationref.speed = animationref.distance/animationref.span;
						animationref.duration(originalvec);
						}
						else{
						var previousref = type.animations[type.animations.length -1].controlPoints;
						var originalvec = vec3.fromValues(previousref[previousref.length-1][0],
						previousref[previousref.length-1][1],
						previousref[previousref.length-1][2]);
						var startpoint = animationref.controlPoints[0];
						animationref.distance +=  vec3.distance(vec3.fromValues(startpoint[0],startpoint[1],startpoint[2]), originalvec);
						animationref.speed = animationref.distance/animationref.span;
						animationref.duration(originalvec);
					}
				}
				
				type.animations.push(animationref);
				}

				if(child.nodeName == "materials"){
					if(child.children.length < 1)
						return "Atleast one material is required";
					var mat_id = this.reader.getString(transf,"id",true);
                    var mati = this.materialsList.indexOf(mat_id);
                    if(mati == -1) mati = "inherit";
					type.materials.push(mati);
				}


				if(child.nodeName == "children"){
					if(child.children.length < 1)
						return "Needed atleast on child";
					var obj_id = this.reader.getString(transf,"id",true);
					if(transf.nodeName == "componentref")
						type.compRef.push(obj_id);
					else {
                        error = this.runPrimitives(vertex, types, obj_id);
                        if(error!= null) return error;
                    }

				}



			}
		}
		vertex.component = type;
		this.graph.vertexSet.push(vertex);
	}
	this.graph.vertexIDs = this.components;
	if(this.graph.addEdges() == -1) return "error at scene graph";
	if(this.graph.DepthSearch(this.sceneRoot,this.scene) == -1)return "error on the root element";
}

/*
 * Callback to be executed on any read error
 */

 MySceneGraph.prototype.getTransformation = function(id){
    var indice = this.transformationsList.indexOf(id);
    if(indice == -1) return -1;
    return this.transMatrix[indice];
}


MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);
	this.loadedOk=false;
};

MySceneGraph.prototype.getMatrix = function (e) {
    var matrix = mat4.create();
    for(var j = 0; j < e.children.length; j++){
        var transf = e.children[j];
        switch(transf.nodeName){
            case "translate":
                var temp = this.getNewCoords(transf);
                mat4.translate(matrix, matrix, temp);
                break;
            case "rotate":
                var temp = [];
                this.getAngle(temp, transf);
                var rot = [];
                switch (temp[0]){
                    case "x":
                        rot = [1,0,0];
                        break;
                    case "y":
                        rot = [0,1,0];
                        break;
                    case "z":
                        rot = [0,0,1];
                        break;
                }
                mat4.rotate(matrix, matrix, temp[1], rot);
                break;
            case "scale":
                var temp = this.getNewCoords(transf);
                mat4.scale(matrix, matrix, temp);
                break;
        }
    }
    return matrix;
}




MySceneGraph.prototype.degConverter = function(degrees) {
    return degrees * Math.PI / 180;
};

MySceneGraph.prototype.getXYZ = function(comp, transf){
    var x = this.reader.getFloat(transf,"x",true);
    var y = this.reader.getFloat(transf,"y",true);
    var z = this.reader.getFloat(transf,"z",true);
    comp.push(x);
    comp.push(y);
    comp.push(z);
}

MySceneGraph.prototype.getAngle = function(comp, transf){
    var axis = this.reader.getString(transf,"axis",true);
    var angle = this.reader.getFloat(transf,"angle",true);
    angle = this.degConverter(angle);
    comp.push(axis);
    comp.push(angle);
}

MySceneGraph.prototype.getNewCoords = function(transf){
    var comp = [];
    this.getXYZ(comp, transf);
    return comp;
}

MySceneGraph.prototype.getRGBA = function(comp, transf){
    var r = transf.attributes.getNamedItem("r").value;
    var g = transf.attributes.getNamedItem("g").value;
    var b = transf.attributes.getNamedItem("b").value;
    var aaa = transf.attributes.getNamedItem("a").value;
    comp.push(r);
    comp.push(g);
    comp.push(b);
    comp.push(aaa);
}

MySceneGraph.prototype.getControlPoint = function(cp,transf){
	var xx = this.reader.getFloat(transf,"xx",true);
	var yy = this.reader.getFloat(transf,"yy",true);
	var zz = this.reader.getFloat(transf,"zz",true);
	this.cp.push(xx);
	this.cp.push(yy);
	this.cp.push(zz);
}

MySceneGraph.prototype.getControlPointPatch = function(transf){
	this.pt = [];
	var xx = this.reader.getFloat(transf,"x",true);
	var yy = this.reader.getFloat(transf,"y",true);
	var zz = this.reader.getFloat(transf,"z",true);
	this.pt.push(xx);
	this.pt.push(yy);
	this.pt.push(zz);
	return this.pt;
}

