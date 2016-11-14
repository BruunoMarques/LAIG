function Node() {
	CGFscene.call(this);
	this.component = null;
	this.derivates = [];
	this.visited = false;
	this.primitives = [];
	this.primitive_types = [];
	this.redo = false;
}

Node.prototype = Object.create(CGFscene.prototype);
Node.prototype.constructor = Node;