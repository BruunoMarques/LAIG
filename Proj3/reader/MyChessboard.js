function MyChessboard(scene, du, dv, textureref, su, sv, c1, c2, cs) {
	CGFobject.call(this, scene);

//initialize variables
	this.du = du;
	this.dv = dv;
	this.textureref = textureref;
	this.su = su;
	this.sv = sv;
	this.c1 = c1;
	this.c2 = c2;
	this.cs = cs;

//construct plane, texture, shader
	this.plane = new MyPlane(this.scene,this.du,this.dv,this.du*10,this.dv*10);
	this.texture = new CGFtexture(this.scene, textureref);
	this.shader = new CGFshader(this.scene.gl, "shaders/chessboard.vert", "shaders/chessboard.frag");

//sets the variables in the shader
	this.shader.setUniformsValues({du : this.du});
	this.shader.setUniformsValues({dv: this.dv});
	this.shader.setUniformsValues({su: this.su});
	this.shader.setUniformsValues({sv: this.sv});
	this.shader.setUniformsValues({c1 : this.c1});
	this.shader.setUniformsValues({c2 : this.c2});
	this.shader.setUniformsValues({cs : this.cs});

	this.initBuffers();
};

MyChessboard.prototype = Object.create(CGFobject.prototype);
MyChessboard.prototype.constructor=MyChessboard;

//displays the board
MyChessboard.prototype.display = function(){
			this.scene.pushMatrix();
 			this.texture.bind(0);
	    this.scene.rotate(Math.PI/2,-1,0,0);
	    this.scene.setActiveShader(this.shader);
	    this.plane.display();
	    this.scene.popMatrix();
	    this.scene.setActiveShader(this.scene.defaultShader);
}
