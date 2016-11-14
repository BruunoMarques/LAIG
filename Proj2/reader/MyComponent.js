
function MyComponent() {
	CGFscene.call(this);
	
	this.id = "";
	
	this.transformation_ref = "";
	
	this.materials = [];
	this.texture = "";
	this.matrix = null;
	this.matrix_b = null;
	this.translates = [];
	this.rotates = [];
	this.scales = [];
	
	this.primitivess = [];
	this.compRef = [];
	this.childrenRef = [];
}

MyComponent.prototype = Object.create(CGFscene.prototype);
MyComponent.prototype.constructor = MyComponent;

