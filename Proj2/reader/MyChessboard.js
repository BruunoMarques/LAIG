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

	this.initBuffers();
};

MyChessboard.prototype = Object.create(CGFobject.prototype);
MyChessboard.prototype.constructor=MyChessboard;

MyChessboard.prototype.display = function(){

}
