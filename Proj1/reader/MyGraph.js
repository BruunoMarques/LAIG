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

MyGraph.prototype.intermediate = function(vertex){
    if(vertex.visited) vertex.redo = true;
	vertex.visited = true;
		
	
	for(var i = 0; i < vertex.derivates.length; i++){
        var new_transf =  mat4.create();
        var next_transf = vertex.derivates[i].component.matrix;
        if(next_transf == null) return "No transformation!";
        mat4.multiply(new_transf, vertex.component.matrix, next_transf);
		vertex.derivates[i].component.matrix_b = next_transf;
        vertex.derivates[i].component.matrix = new_transf;
		this.intermediate(vertex.derivates[i]);
        if(vertex.derivates[i].redo) vertex.derivates[i].component.matrix = vertex.derivates[i].component.matrix_b;
	}
}


MyGraph.prototype.DepthSearch = function(vertexID){
	var indice = this.vertexIDs.indexOf(vertexID);
	if(indice == -1){
		
		return -1;
	}

	for(var i = 0; i< this.vertexSet.length; i++)
	    this.vertexSet[i].visited = false;

  
	
}

