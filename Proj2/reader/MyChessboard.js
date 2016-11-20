function MyChessboard(scene, du, dv, textureref, su, sv, c1, c2, cs) {
	CGFobject.call(this, scene);

	this.du = du;
	this.dv = dv;
	this.textureref = textureref;
	this.su = su;
	this.sv = sv;
	this.c1 = c1;
	this.c2 = c2;
	this.cs = cs;

	this.plane = new MyPlane(this.scene,1,1,this.du*10,this.dv*10);
	this.texture = new CGFtexture(this.scene, textureref);
	this.shader = new CGFshader(this.scene.gl, "shaders/shader.vert", "shaders/shader.frag");
	this.shader.setUniformsValues({ uSample : 0,
																 c1 : this.c1,
																 c2 : this.c2,
																 cs : this.cs,
																 du : parseInt(this.du)*1.0,
																 dv: parseInt(this.dv)*1.0,
																 su: parseInt(this.su)*1.0,
																 sv: parseInt(this.sv)*1.0
																 });

	this.initBuffers();
};

MyChessboard.prototype = Object.create(CGFobject.prototype);
MyChessboard.prototype.constructor=MyChessboard;

MyChessboard.prototype.display = function(){
			this.scene.pushMatrix();
 			this.texture.bind(0);
	    this.scene.rotate(Math.PI/2,-1,0,0);
	    this.scene.setActiveShader(this.shader);
	    this.plane.display();
	    this.scene.popMatrix();
	    this.scene.setActiveShader(this.scene.defaultShader);
}
