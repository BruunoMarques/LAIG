
function MySceneGraph(filename, scene) {
	this.loadedOk = null;

	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;

	// File reading
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */

	this.reader.open('scenes/jonas.xml', this);
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function()
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;

	// Here should go the calls for different functions to parse the various blocks
	
	var error = 	this.initiateParse(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}

	this.loadedOk=true;


	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};


MySceneGraph.prototype.checkTagOrder= function(rootElement){
	var tempChildren = rootElement.children;
	if(tempChildren.length != 9){
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

	if(tempChildren[7].tagName != "primitives")
		console.warn("Tag 8 of DSX is not primitives");

	if(tempChildren[8].tagName != "components")
		console.warn("Tag 9 of DSX is not components");
}


MySceneGraph.prototype.initiateParse= function(rootElement){

	this.parseGlobalsScene(rootElement);

	this.viewsList = [];//check
	this.parseGlobalsViews(rootElement);

	
	this.ambient_rgb = [];
	this.background_rgb = [];	
	this.parseGlobalsIllumination(rootElement);
	
	
	this.OmnilightsList = [];
	this.SpotlightsList = [];
	this.parseGlobalsLights(rootElement);
	

	this.texturesList = [];//check
	this.parseGlobalsTextures(rootElement);
	
	
	this.materialsList = [];//check
	this.parseGlobalsMaterials(rootElement);
	
	

	this.rotatesList = [];//check
	this.translatesList = [];//check
	this.scalesList = [];//check
	this.parseGlobalsTransformations(rootElement);
	
	

	this.primitivesList = [];//check
	this.parseGlobalsPrimitives(rootElement);
	
		

	this.ComponentsList = [];
	this.parseGlobalsComponents(rootElement);
}

/*
 * Example of method that parses elements of one block and stores information in a specific data structure
 */

MySceneGraph.prototype.parseGlobalsScene= function(rootElement){
	var elems = rootElement.getElementsByTagName('scene');

	if (elems == null){
		return "faltam elementos na scene";
	}
	if (elems.length != 1){
		return "é necessário apenas 1 scene!";
	}

	this.root = this.reader.getString(elems[0],'root',true);
	this.axis_length = this.reader.getFloat(elems[0],'axis_length',true);
}


MySceneGraph.prototype.parseGlobalsViews= function(rootElement){

	var elems = rootElement.getElementsByTagName('views');
	this.default = this.reader.getString(elems[0],'default',true);
	var size = elems[0].children.length;


	if(size < 1){
		return "Views deve ter pelo menos 1 perspective!";
	}

	for(var j = 0; j < size ; j++){
		var elems1 = rootElement.getElementsByTagName('perspective');

		var id_view = this.reader.getString(elems1[j],'id',true);
		var near_view = this.reader.getFloat(elems1[j],'near',true);
		var far_view = this.reader.getFloat(elems1[j],'far',true);
		var angle_view = this.reader.getFloat(elems1[j],'angle',true);

		var tempView = {};
		tempView.id_view = id_view;
		tempView.near_view = near_view;
		tempView.far_view = far_view;
		tempView.angle_view = angle_view;
		tempView.from = [];
		tempView.to = [];

		var size1 = elems1[0].children.length;

		if(size1 != 2){
			return "Perspective deve ter from e to!";
		}

		this.from = [];
		this.to = [];

		for(var i = 0;i<size;i++){
			var e = elems1[j].children[i];
			if(i == 0){
				var tempFrom = {};

				tempFrom.x  = e.attributes.getNamedItem("x").value;
				tempFrom.y  = e.attributes.getNamedItem("y").value;
				tempFrom.z  = e.attributes.getNamedItem("z").value;

				tempView.from.push(tempFrom);
			}else{
				var tempTo = {};

				tempTo.x  = e.attributes.getNamedItem("x").value;
				tempTo.y  = e.attributes.getNamedItem("y").value;
				tempTo.z  = e.attributes.getNamedItem("z").value;

				tempView.from.push(tempTo);
			}
		}

	this.viewsList.push(tempView);
	}
}


MySceneGraph.prototype.parseGlobalsIllumination= function(rootElement){

	var elems = rootElement.getElementsByTagName('illumination');

	this.doublesided_illu = this.reader.getBoolean(elems[0], 'doublesided', true);
	this.local_illu = this.reader.getBoolean(elems[0], 'local', true);

	var size = elems[0].children.length;

	if(size != 2){
		return "illumination deve ter 2 componentes! (ambient e background)";
	}



	for(var i = 0;i< size; i++){
		var e = elems[0].children[i];
		if(i == 0){
			this.ambient_rgb[0]  = e.attributes.getNamedItem("r").value;
			this.ambient_rgb[1]  = e.attributes.getNamedItem("g").value;
			this.ambient_rgb[2]  = e.attributes.getNamedItem("b").value;
			this.ambient_rgb[3]  = e.attributes.getNamedItem("a").value;
		}
		else{
			this.background_rgb[0] = e.attributes.getNamedItem("r").value;
			this.background_rgb[1] = e.attributes.getNamedItem("g").value;
			this.background_rgb[2] = e.attributes.getNamedItem("b").value;
			this.background_rgb[3] = e.attributes.getNamedItem("a").value;
		}
	}


};


MySceneGraph.prototype.parseGlobalsLights= function(rootElement){

	var elems = rootElement.getElementsByTagName('lights')[0];



	var omnis = elems.getElementsByTagName('omni');
	for(var j = 0; j<omnis.length ;j++){

		var templight = omnis[j];

		var tempOmni = {};
			tempOmni.id_omni = this.reader.getString(templight, 'id', true);
			tempOmni.enabled_omni = this.reader.getBoolean(templight, 'enabled', true);
			tempOmni.location_omni = [];
			tempOmni.ambient_omni = [];
			tempOmni.diffuse_omni = [];
			tempOmni.specular_omni = [];


			var locationref= templight.getElementsByTagName('location')[0];
			var localcoords = this.getXYZ(locationref,true);
			tempOmni.welement = this.reader.getFloat(locationref,'w',true);
			tempOmni.location_omni = localcoords;

			var ambientref= templight.getElementsByTagName('ambient')[0];
			var ambientcomps = this.getRGBA(ambientref,true);
			tempOmni.ambient_omni = ambientcomps;

			var difuseref= templight.getElementsByTagName('diffuse')[0];
			var diffusecomps = this.getRGBA(difuseref,true);
			tempOmni.diffuse_omni = diffusecomps;

			var specularref= templight.getElementsByTagName('specular')[0];
			var specularcomps = this.getRGBA(specularref,true);
			tempOmni.specular_omni = specularcomps;

			this.OmnilightsList.push(tempOmni);

	}

	var spots = elems.getElementsByTagName('spot');
	for(var j = 0; j<spots.length ;j++){

		var templight = spots[j];

		var tempSpot = {};
			tempSpot.id_spot = this.reader.getString(templight, 'id', true);
			tempSpot.enabled_spot = this.reader.getBoolean(templight, 'enabled', true);
			tempSpot.angle = this.reader.getFloat(templight, 'angle', true)* Math.PI/180;
			tempSpot.exponent = this.reader.getFloat(templight, 'exponent', true);
			tempSpot.target_spot =[];
			tempSpot.location_spot = [];
			tempSpot.ambient_spot = [];
			tempSpot.diffuse_spot = [];
			tempSpot.specular_spot = [];



			var targerref= templight.getElementsByTagName('target')[0];
			var targercoords = this.getXYZ(targerref,true);
			tempSpot.target_spot = targercoords ;

			var locationref= templight.getElementsByTagName('location')[0];
			var localcoords = this.getXYZ(locationref,true);
			tempSpot.location_spot = localcoords ;

			var ambientref= templight.getElementsByTagName('ambient')[0];
			var ambientcomps = this.getRGBA(ambientref,true);
			tempSpot.ambient_spot= ambientcomps;

			var difuseref= templight.getElementsByTagName('diffuse')[0];
			var diffusecomps = this.getRGBA(difuseref,true);
			tempSpot.diffuse_spot = diffusecomps;

			var specularref= templight.getElementsByTagName('specular')[0];
			var specularcomps = this.getRGBA(specularref,true);
			tempSpot.specular_spot = specularcomps;

			this.SpotlightsList.push(tempSpot);


	}


}



MySceneGraph.prototype.parseGlobalsTextures= function(rootElement) {
	var elems = rootElement.getElementsByTagName('textures');
	var size = elems[0].children.length;

	for(var i = 0; i < size;i++){
		var elems1 = rootElement.getElementsByTagName('texture');

		var id_texture = this.reader.getString(elems1[i], 'id',true);;
		var file_texture = this.reader.getString(elems1[i], 'file',true);
		var length_s_texture = this.reader.getFloat(elems1[i], 'length_s',true);
		var length_t_texture = this.reader.getFloat(elems1[i], 'length_t',true);

		var tempTexture = {};
		tempTexture.id_texture = id_texture;
		tempTexture.file_texture = file_texture;
		tempTexture.length_s_texture = length_s_texture;
		tempTexture.length_t_texture = length_t_texture;

		this.texturesList.push(tempTexture);
	}



}

MySceneGraph.prototype.parseGlobalsMaterials= function(rootElement) {

	var elems = rootElement.getElementsByTagName('materials');
	var size = elems[0].children.length;

	if(size < 1){
		return "Deve conter materiais";
	}


	for(var j = 0; j<size; j++){
		var elems1 = rootElement.getElementsByTagName('material');
		var size1 = elems1[0].children.length;

		if(size1 != 5){
			return "nope";
		}

		var id_material =  this.reader.getString(elems1[j],'id',true);

		var tempMaterial = {};
		tempMaterial.id_material = id_material;
		tempMaterial.emission_material = [];
		tempMaterial.ambient_material = [];
		tempMaterial.diffuse_material = [];
		tempMaterial.specular_material = [];
		tempMaterial.shininess;

		this.emission_material = [];
		this.ambient_material = [];
		this.diffuse_material = [];
		this.specular_material = [];

		for(var i = 0;i< size1; i++){
			var e = elems1[j].children[i];
			if(i == 0){
				var tempEmission = {};

				tempEmission.r = e.attributes.getNamedItem("r").value;
				tempEmission.g = e.attributes.getNamedItem("g").value;
				tempEmission.b = e.attributes.getNamedItem("b").value;
				tempEmission.a = e.attributes.getNamedItem("a").value;

				tempMaterial.emission_material.push(tempEmission);
			}
			else if(i == 1){
				var tempAmbient = {};

				tempAmbient.r = e.attributes.getNamedItem("r").value;
				tempAmbient.g = e.attributes.getNamedItem("g").value;
				tempAmbient.b = e.attributes.getNamedItem("b").value;
				tempAmbient.a = e.attributes.getNamedItem("a").value;

				tempMaterial.ambient_material.push(tempAmbient);
			}
			else if(i == 2){
				var tempDiffuse = {};

				tempDiffuse.r = e.attributes.getNamedItem("r").value;
				tempDiffuse.g = e.attributes.getNamedItem("g").value;
				tempDiffuse.b = e.attributes.getNamedItem("b").value;
				tempDiffuse.a = e.attributes.getNamedItem("a").value;

				tempMaterial.diffuse_material.push(tempDiffuse);
			}else if(i == 3){
				var tempSpecular = {};

				tempSpecular.r = e.attributes.getNamedItem("r").value;
				tempSpecular.g = e.attributes.getNamedItem("g").value;
				tempSpecular.b = e.attributes.getNamedItem("b").value;
				tempSpecular.a = e.attributes.getNamedItem("a").value;

				tempMaterial.specular_material.push(tempSpecular);
			}else{
				var shininess = e.attributes.getNamedItem("value").value;
				tempMaterial.shininess = shininess;

			}
		}

		this.materialsList.push(tempMaterial);

	}

}



MySceneGraph.prototype.parseGlobalsTransformations= function(rootElement) {
	var elems = rootElement.getElementsByTagName('transformations');
	var size = elems[0].children.length;
	if (elems == null) {
		return "transformations is missing.";
	}


	for(var i = 0; i < size;i++){
		var elems1 = rootElement.getElementsByTagName('transformation');



		var elems2 = elems1[i].getElementsByTagName('rotate')[0];
		var elems3 = elems1[i].getElementsByTagName('translate')[0];
		var elems4 = elems1[i].getElementsByTagName('scale')[0];

		if(elems2 != null){
			var id_rotate = this.reader.getString(elems1[i], 'id', true);
			var axis_rotate = this.reader.getString(elems2, 'axis', true);
			var angle_rotate = this.reader.getFloat(elems2, 'angle', true);

			var tempRotate = {};
			tempRotate.id_rotate = id_rotate;
			tempRotate.axis_rotate = axis_rotate;
			tempRotate.angle_rotate = angle_rotate;

			this.rotatesList.push(tempRotate);

		}else if(elems3 != null){
			var id_translate = this.reader.getString(elems1[i], 'id', true);
			var x_translate = this.reader.getString(elems3, 'x', true);
			var y_translate = this.reader.getString(elems3, 'y', true);
			var z_translate = this.reader.getString(elems3, 'z', true);

			var tempTranslate = {};
			tempTranslate.id_translate = id_translate;
			tempTranslate.x_translate = x_translate;
			tempTranslate.y_translate = y_translate;
			tempTranslate.z_translate = z_translate;

			this.translatesList.push(tempTranslate);

		}else if(elems4 != null){
			var id_scale = this.reader.getString(elems1[i], 'id', true);
			var x_scale = this.reader.getString(elems4, 'x', true);
			var y_scale = this.reader.getString(elems4, 'y', true);
			var z_scale = this.reader.getString(elems4, 'z', true);

			var tempScale = {};
			tempScale.id_scale = id_scale;
			tempScale.x_scale = x_scale;
			tempScale.y_scale = y_scale;
			tempScale.z_scale = z_scale;

			this.scalesList.push(tempScale);
		}

	}

}

MySceneGraph.prototype.parseGlobalsPrimitives= function(rootElement) {
	var elems = rootElement.getElementsByTagName('primitives');
	var size = elems[0].children.length;
	if (elems == null) {
		return "primitives is missing.";
	}

	for(var i = 0; i < size; i++){
		var elems1 = rootElement.getElementsByTagName('primitive');

		var id_primitive = this.reader.getString(elems1[i], 'id', true);

		var tempPrimitive = {};
		tempPrimitive.id_primitive = id_primitive;


		var elems2 = elems1[i].getElementsByTagName('rectangle')[0];
		var elems3 = elems1[i].getElementsByTagName('triangle')[0];
		var elems4 = elems1[i].getElementsByTagName('cylinder')[0];
		var elems5 = elems1[i].getElementsByTagName('sphere')[0];
		var elems6 = elems1[i].getElementsByTagName('torus')[0];

		if(elems2 != null){
			var tempRectangle = {};
			tempPrimitive.rectangle = [];

			tempRectangle.x1 = this.reader.getFloat(elems2, 'x1',true);
			tempRectangle.x2 = this.reader.getFloat(elems2, 'x2',true);
			tempRectangle.y1 = this.reader.getFloat(elems2, 'y1',true);
			tempRectangle.y2 = this.reader.getFloat(elems2, 'y2',true);

			tempPrimitive.rectangle.push(tempRectangle);
		}else if(elems3 != null){
			var tempTriangle = {};
			tempPrimitive.triangle = [];

			tempTriangle.x1 = this.reader.getFloat(elems3, 'x1',true);
			tempTriangle.y1 = this.reader.getFloat(elems3, 'y1',true);
			tempTriangle.z1 = this.reader.getFloat(elems3, 'z1',true);
			tempTriangle.x2 = this.reader.getFloat(elems3, 'x1',true);
			tempTriangle.y2 = this.reader.getFloat(elems3, 'y2',true);
			tempTriangle.z2 = this.reader.getFloat(elems3, 'z2',true);
			tempTriangle.x3 = this.reader.getFloat(elems3, 'x3',true);
			tempTriangle.y3 = this.reader.getFloat(elems3, 'y3',true);
			tempTriangle.z3 = this.reader.getFloat(elems3, 'z3',true);

			tempPrimitive.triangle.push(tempTriangle);
		}else if(elems4 != null){
			var tempCylinder = {};
			tempPrimitive.cylinder = [];

			tempCylinder.base = this.reader.getFloat(elems4, 'base',true);
			tempCylinder.top = this.reader.getFloat(elems4, 'top',true);
			tempCylinder.height = this.reader.getFloat(elems4, 'height',true);
			tempCylinder.slices = this.reader.getFloat(elems4, 'slices',true);
			tempCylinder.stacks = this.reader.getFloat(elems4, 'stacks',true);

			tempPrimitive.cylinder.push(tempCylinder);
		}else if(elems5 != null){
			var tempSphere = {};
			tempPrimitive.sphere = [];


			tempSphere.radius = this.reader.getFloat(elems5, 'radius',true);
			tempSphere.slices = this.reader.getFloat(elems5, 'slices',true);
			tempSphere.stacks = this.reader.getFloat(elems5, 'stacks',true);

			tempPrimitive.sphere.push(tempSphere);
		}else if(elems6 != null){
			var tempTorus = {};
			tempPrimitive.torus = [];

			tempTorus.inner = this.reader.getFloat(elems6, 'inner',true);
			tempTorus.outer = this.reader.getFloat(elems6, 'outer',true);
			tempTorus.slices = this.reader.getFloat(elems6, 'slices',true);
			tempTorus.loops = this.reader.getFloat(elems6, 'loops',true);

			tempPrimitive.torus.push(tempTorus);
		}

		this.primitivesList.push(tempPrimitive);
	}

	//console.log(this.primitivesList);
}


MySceneGraph.prototype.parseGlobalsComponents = function(rootElement) {
		var componentsElem = rootElement.getElementsByTagName('components')[0];
		var components = componentsElem.getElementsByTagName('component');

			for (var i = 0; i < components.length; i++) {
			

				
				var component = components[i];
				var ID = this.reader.getString(component, 'id', true);

				var TempComponent = {};
				TempComponent.ID = ID;
				TempComponent.transformationref = [];
				TempComponent.translates = [];
				TempComponent.scales = [];
				TempComponent.rotations = [];
				TempComponent.materials = [];
				TempComponent.textures = [];
				TempComponent.componentref = [];
				TempComponent.primitiveref = [];
				TempComponent.visited = false;

				
		

				//TRANSFORMATIONS
				var TransformationElements = component.getElementsByTagName('transformation')[0];
				var RefTransformation = TransformationElements.getElementsByTagName('transformationref');

					for (var j = 0; j < RefTransformation.length; j++) {
						var RefID = this.reader.getString(RefTransformation[j], 'id', true);
						TempComponent.transformationref.push(RefID);
					}


				//TRANSLATIONS
				var RefTranslate = TransformationElements.getElementsByTagName('translate');

					for(var j = 0; j < RefTranslate.length; j++ ){
						var Translation = {};

						Translation.x = this.reader.getFloat(RefTranslate[j],'x',true);
						Translation.y = this.reader.getFloat(RefTranslate[j],'y',true);
						Translation.z = this.reader.getFloat(RefTranslate[j],'z',true);

						TempComponent.translates.push(Translation);
					}

					//ROTATIONS
					var RefRotate = TransformationElements.getElementsByTagName('rotate');

					for(var j = 0; j < RefRotate.length; j++ ){
						var Rotation = {};

						Rotation.axis = this.reader.getString(RefRotate[j],'axis',true);
						Rotation.angle = this.reader.getFloat(RefRotate[j],'angle',true);
						
						TempComponent.rotations.push(Rotation);
					}
					
					
			
					//SCALES
					var RefScale = TransformationElements.getElementsByTagName('scale');

					for(var j = 0; j < RefScale.length; j++ ){
						var Scaling = {};

						Scaling.x = this.reader.getFloat(RefScale[j],'x',true);
						Scaling.y = this.reader.getFloat(RefScale[j],'y',true);
						Scaling.z = this.reader.getFloat(RefScale[j],'z',true);

						TempComponent.scales.push(Scaling);
					}

					//Double Check this later MATERIALS
					var materialElems = component.getElementsByTagName('materials')[0];
					var materialRef = materialElems.getElementsByTagName('material');

					for (var j = 0; j < materialRef.length; j++ ){
						var tempMat = this.reader.getString(materialRef[j], 'id', true);
						// para actually adicionar os materiais if (tempMat == this.materials)
						TempComponent.materials.push(tempMat);
					}


					//TEXTURES cenas ainda veilho
					var texturesElem = component.getElementsByTagName('texture')[0];
					var textureID = this.reader.getString(texturesElem,'id',true);

					if (textureID == 'inherit'){

					}
					else if(textureID == 'none'){

					}/*  toREDO
					else for (var i = 0; i < this.textures.length; i++)
					if (this.textures[i].id == textureID)
						componentToSend.texture = this.textures[i];
		*/


					//CHILDREN
					var childrenElems = component.getElementsByTagName('children')[0];
					var childs = childrenElems.getElementsByTagName('primitiveref');

					for (var j = 0; j < childs.length; j++) {
					var primitiveID = this.reader.getString(childs[j], 'id', true);
					//shpuld check the actual primitives before adding
					TempComponent.primitiveref.push(primitiveID);
			}


					//COMPONENTS
					var comps = childrenElems.getElementsByTagName('componentref');

					for (var j = 0; j <comps.length;j++){
						var compID = this.reader.getString(comps[j], 'id', true);

						TempComponent.componentref.push(compID);
					}

					
					
					this.ComponentsList.push(TempComponent);
					
			}
			
	
		
}


MySceneGraph.prototype.getRGBA = function (object, required) {
	var r = this.reader.getFloat(object, 'r', required);
	var g = this.reader.getFloat(object, 'g', required);
	var b = this.reader.getFloat(object, 'b', required);
	var a = this.reader.getFloat(object, 'a', required);
	return vec4.fromValues(r, g, b, a);
};


MySceneGraph.prototype.getXYZ = function (object, required) {
	var x = this.reader.getFloat(object, 'x', required);
	var y = this.reader.getFloat(object, 'y', required);
	var z = this.reader.getFloat(object, 'z', required);
	return vec3.fromValues(x, y, z);
};


MySceneGraph.prototype.getColorFromRGBA = function (object, required) {
	var colour = {};
	colour.r = this.reader.getFloat(object, 'r', required);
	colour.g = this.reader.getFloat(object, 'g', required);
	colour.b = this.reader.getFloat(object, 'b', required);
	colour.a = this.reader.getFloat(object, 'a', required);
	return colour;
};


/*
 * Callback to be executed on any read error
 */



MySceneGraph.prototype.getPrimitives=function(i){

	var primitive;

	
		if(this.primitivesList[i].rectangle != null)
		{
			var x1 = this.primitivesList[i].rectangle[0].x1;
			var x2 = this.primitivesList[i].rectangle[0].x2;
			var y1 = this.primitivesList[i].rectangle[0].y1;
			var y2 = this.primitivesList[i].rectangle[0].y2;

			primitive = new MyRectangle(this.scene,x1,x2,y1,y2);

		}

		if(this.primitivesList[i].triangle != null)
		{
			var p1 = [];
			var p2 = [];
			var p3 = [];

			p1.x = this.primitivesList[i].triangle[0].x1;
			p1.y = this.primitivesList[i].triangle[0].y1;
			p1.z = this.primitivesList[i].triangle[0].z1;
			p2.x = this.primitivesList[i].triangle[0].x2;
			p2.y = this.primitivesList[i].triangle[0].y2;
			p2.z = this.primitivesList[i].triangle[0].z2;
			p3.x = this.primitivesList[i].triangle[0].x3;
			p3.y = this.primitivesList[i].triangle[0].y3;
			p3.z = this.primitivesList[i].triangle[0].z3;

			primitive = new MyTriangle(this.scene,p1,p2,p3);
		}

		if(this.primitivesList[i].cylinder != null)
		{
			var base = this.primitivesList[i].cylinder[0].base;
			var top = this.primitivesList[i].cylinder[0].top;
			var height = this.primitivesList[i].cylinder[0].height;
			var slices = this.primitivesList[i].cylinder[0].slices;
			var stacks = this.primitivesList[i].cylinder[0].stacks;

			primitive = new MyCylinderWithTops(this.scene,base,top,height,slices,stacks);
		}	

		if(this.primitivesList[i].sphere != null)
		{
			var radius = this.primitivesList[i].sphere[0].radius;
			var slices = this.primitivesList[i].sphere[0].slices;
			var stacks = this.primitivesList[i].sphere[0].stacks;

			primitive = new MySphere(this.scene,radius,slices,stacks);
		}

		if(this.primitivesList[i].torus != null)
		{
			var inner = this.primitivesList[i].torus[0].inner;
			var outer = this.primitivesList[i].torus[0].outer;
			var slices = this.primitivesList[i].torus[0].slices;
			var loops = this.primitivesList[i].torus[0].loops;

			primitive = new MyTorus(this.scene,inner,outer,slices,loops);
		}


	
	return primitive;

}

MySceneGraph.prototype.displayGraph=function(){

	var primitive;
	var size = this.primitivesList.length;
	
	this.scene.pushMatrix();

	for(var i = 0; i < size; i++){
		primitive = this.getPrimitives(i);
		primitive.display();
	}

	this.scene.popMatrix();
	
}

MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);
	this.loadedOk=false;
};
