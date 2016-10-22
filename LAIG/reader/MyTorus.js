/**
 * MyTorus
 * @constructor
 */

 var degToRad = Math.PI / 180.0;
 
 function MyTorus(scene, inner, outer, slices, loops) {
 	CGFobject.call(this,scene);
	
	this.inner = inner;
	this.outer = outer,
	this.slices=slices;
	this.loops=loops;

 	this.initBuffers();
 };

 MyTorus.prototype = Object.create(CGFobject.prototype);
 MyTorus.prototype.constructor = MyTorus;

 MyTorus.prototype.initBuffers = function() {

	this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.textCoords = [];

    
 	var incSlices = 360.0/this.slices
 	var incLoops = 360.0/this.loops;
 	var c = (this.outer - this.inner)/2;

	var incS = 0;
	for(var j = 0; j <= this.loops; j++)
	{
		var sRad = incS*degToRad;
		var incB = 0;
		for(var i = 0; i <= this.slices; i++)
		{
			var bRad = incB*degToRad;

			/*vertices*/
			var d = this.inner + c + c*Math.cos(sRad);
			this.vertices.push(d*Math.cos(bRad),d*Math.sin(bRad),c*Math.sin(sRad));

			/*indices*/
			if(i > 0 && j > 0)
			{
				this.indices.push((this.slices+1)*(j)+(i),(this.slices+1)*(j)+(i-1),(this.slices+1)*(j-1)+(i-1));
				this.indices.push((this.slices+1)*(j)+(i),(this.slices+1)*(j-1)+(i-1),(this.slices+1)*(j-1)+(i));
			}

			/*normals*/
			this.normals.push(d*c*Math.cos(bRad)*Math.cos(sRad),d*c*Math.sin(bRad)*Math.cos(sRad),d*c*Math.sin(sRad));

			/*textCoords*/
			this.textCoords.push(i/(this.slices), 1 -j/this.loops);

			incB += incSlices;
		}
		
		incS += incLoops;
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };