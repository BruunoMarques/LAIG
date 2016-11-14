/**
 * MySphere
 * @constructor
 */
 function MySphere(scene, radius, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.radius=radius;
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MySphere.prototype = Object.create(CGFobject.prototype);
 MySphere.prototype.constructor = MySphere;

 MySphere.prototype.initBuffers = function() {

	
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
	
	for (var i = 0; i <= this.stacks; i++)
     {
         var s = i * Math.PI / this.stacks;
         
         for (var j = 0; j <= this.slices; j++)
         {
             var t = j *2* Math.PI / this.slices;
             
             var x = this.radius* Math.cos(t) * Math.sin(s);
             var y = this.radius* Math.sin(t) * Math.sin(s);
             var z = this.radius* Math.cos(s);
             
             this.vertices.push(x, y, z);
			 this.texCoords.push(i/this.stacks,j/this.slices);
         }
     }
     this.normals = this.vertices;
     
     for (var i = 0; i < this.stacks; i++)
     {
         for (var j = 0; j < this.slices; j++)
         {
             var a = (i * (this.slices+1)) + j;
             var b = a + this.slices + 1;
             this.indices.push(a, b, a+1);
             this.indices.push(b, b+1, a+1);
         }
     }
	
	
	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };