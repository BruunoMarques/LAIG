/**
 * MyCylinder
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyCylinder(scene, base, top, height, slices, stacks) {
    CGFobject.call(this, scene);
    
	this.base = base;
    this.top = top;
    this.height = height;
    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function () {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var inc=2*Math.PI / (this.slices);

	//---------------vertices/normals--------------------

    for (var j= 0; j <= this.stacks; j++) {
        for (var i = 0; i < this.slices; i++) {
       
			this.vertices.push( (this.top - j * (this.top - this.base) / this.stacks) * Math.cos(i * inc),  (this.top - j * (this.top - this.base) / this.stacks) * Math.sin(i * inc), j * this.height / this.stacks);

			this.normals.push( (this.top - j * (this.top - this.base) / this.stacks) * Math.cos(i * inc),  (this.top - j * (this.top - this.base) / this.stacks) * Math.sin(i * inc), 0);
        }
    }


	//--------------indices------------------------
    for (var j = 1; j <= this.stacks; j++) {

        this.indices.push(j*this.slices + this.slices - 1, j*this.slices - 1, j * this.slices - this.slices);
		this.indices.push(j*this.slices + this.slices - 1, j * this.slices - this.slices, j*this.slices);
        

        for (var i = 1; i < this.slices; i++) {

           this.indices.push(j * this.slices + i - 1, j * this.slices - this.slices + i - 1, j * this.slices - this.slices + i);
           this.indices.push(j * this.slices + i - 1, j * this.slices - this.slices + i, j * this.slices + i);

        }
    }

    var s = 0;
	var t = 0;
	var sinc = 1/this.slices;
	var tinc = 1/this.stacks;
	for (var a = 0; a <= this.stacks; a++) {
		for (var b = 0; b < this.slices; b++) {
			this.texCoords.push(s, t);
			s += sinc;
		}
		s = 0;
		t += tinc;
	}

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();

};