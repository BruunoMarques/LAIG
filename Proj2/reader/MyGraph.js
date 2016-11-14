function MyGraph() {
	CGFscene.call(this);
	
	this.vertexIDs = [];
	this.vertexSet = [];
	
	
}

MyGraph.prototype = Object.create(CGFscene.prototype);
MyGraph.prototype.constructor = MyGraph;

MyGraph.prototype.addEdges = function(){
	for(var i = 0;i< this.vertexSet.length; i++){
		var childs = this.vertexSet[i].component.compRef;
		for(var j = 0; j < childs.length; j++){
			var indice = this.vertexIDs.indexOf(childs[j]);
			if(indice == -1){
				console.log(childs[j] + "wrong name");
				return -1;
			}
			this.vertexSet[i].derivates.push(this.vertexSet[indice]);
		}
	}
}

MyGraph.prototype.getPrimitives = function (vertex,primitive, info) {
    var prim;
	console.log(info);
	console.log(primitive);
    switch(info){
        case "rectangle":
            prim = new MyRectangle(this.scene, primitive[1], primitive[2], primitive[3], primitive[4]);
            break;
        case "triangle":
            prim = new MyTriangle(this.scene, primitive[1], primitive[2], primitive[3], primitive[4], primitive[5], primitive[6], primitive[7], primitive[8], primitive[9]);
            break;
        case "cylinder":
            prim = new MyCylinder(this.scene, primitive[1], primitive[2], primitive[3], primitive[4], primitive[5]);
            break;
        case "sphere":
            prim = new MySphere(this.scene, primitive[1], primitive[2], primitive[3]);
            break;
        case "torus":
            prim = new MyTorus(this.scene, primitive[1],primitive[2], primitive[3], primitive[4]);
            break;
    }
	console.log(prim);
    vertex.component.primitivess.push(prim);
}

//funcao responsavel por invocar a inicializacao das primitivas de um vertice/componente
MyGraph.prototype.initiatePrimitives = function (vertex) {
    for(var i = 0; i < vertex.primitives.length; i++){
        this.getPrimitives(vertex,vertex.primitives[i],vertex.primitive_types[i]);
    }
    for(var i = 0; i < vertex.derivates.length; i++){
        this.initiatePrimitives(vertex.derivates[i]);
    }
 }
  
  
MyGraph.prototype.DepthSearch = function(vertexID,scene){
	var indice = this.vertexIDs.indexOf(vertexID);
	if(indice == -1){
		
		return -1;
	}
	this.scene = scene;
	for(var i = 0; i< this.vertexSet.length; i++)
	    this.vertexSet[i].visited = false;

  
	this.initiatePrimitives(this.vertexSet[indice]);
}

