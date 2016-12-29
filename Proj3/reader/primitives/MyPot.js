function MyPot(scene) {
	CGFobject.call(this, scene);


	this.outside = [[0.021,	-0.739,	0.384],
									[-0.691,	-0.772,	0.365],
									[-0.734,	0.646,	0.389],
									[0.666,	0.721	,0.383],
									[0.650,	-0.685,	0.407],
									[0.021,	-0.740,	0.383],

									[-0.005,	-1.118,	0.400],
									[-1.015	,-1.039,	0.408],
									[-1.061,	1.269,	0.394],
									[0.973,	1.387	,0.370],
									[1.000,	-1.000,	0.400],
									[-0.008,	-1.109,	0.402],

									[-0.004	,-1.136	,0.792],
									[-1.582,	-0.988,	0.886],
									[-1.670,	1.290,	0.923],
									[1.624,	1.566,	0.835],
									[1.481,	-1.011,	0.779],
									[-0.008,	-1.135,	0.794],

									[0.007,	-1.152,	1.192],
									[-1.465,	-0.981,	1.212],
									[-1.625,	1.351,	1.351],
									[1.626,	1.603,	1.290],
									[1.558,	-1.013,	1.212],
									[0.011,	-1.168,	1.204],

									[0.007,	-1.095,	1.571],
									[-1.000,	-1.000,	1.600],
									[-1.005,	1.157,	1.640],
									[1.051,	1.334,	1.616],
									[1.000,	-1.000,	1.600],
									[0.003,	-1.094,	1.570],

									[0.025,	-0.705,	1.615],
									[-0.729,	-0.706,	1.582],
									[-0.675,	0.559,	1.615],
									[0.646,	0.489,	1.643],
									[0.714,	-0.761,	1.635],
									[0.024,	-0.709,	1.621]];





this.inside = [[-0.021,	0.739,	-0.384],
								[0.691,	0.772,	-0.365],
								[0.734,	-0.646,	-0.389],
								[-0.666,	-0.721	,-0.383],
								[-0.650,	0.685,	-0.407],
								[-0.021,	0.740,	-0.383],

								[0.005,	1.118,	-0.400],
								[1.015	,1.039,	-0.408],
								[1.061,	-1.269,	-0.394],
								[-0.973,	-1.387	,-0.370],
								[-1.000,	1.000,	-0.400],
								[0.008,	1.109,	-0.402],

								[0.004	,1.136	,-0.792],
								[1.582,	0.988,	-0.886],
								[1.670,	-1.290,	-0.923],
								[-1.624,	-1.566,	-0.835],
								[-1.481,	1.011,	-0.779],
								[0.008,	1.135,	-0.794],

								[-0.007,	1.152,	-1.192],
								[1.465,	0.981,	-1.212],
								[1.625,	-1.351,	-1.351],
								[-1.626,	-1.603,	-1.290],
								[-1.558,	1.013,	-1.212],
								[-0.011,	1.168,	-1.204],

								[-0.007,	1.095,	-1.571],
								[1.000,	1.000,	-1.600],
								[1.005,	-1.157,	-1.640],
								[-1.051,	-1.334,	-1.616],
								[-1.000,	1.000,	-1.600],
								[-0.003,	1.094,	-1.570],

								[-0.025,	0.705,	-1.615],
								[0.729,	0.706,	-1.582],
								[0.675,	-0.559,	-1.615],
								[-0.646,	-0.489,	-1.643],
								[-0.714,	0.761,	-1.635],
								[-0.024,	0.709,	-1.621]];

								this.basket = new CGFappearance(this.scene);
								this.basket.setAmbient(0.3,0.3,0.3,0.3);
								this.basket.setDiffuse(0.1,0.1,0.1,0.2);
								this.basket.setSpecular(1,1,1,0.2);
								this.basket.setShininess(5);
								this.basket.loadTexture("./resources/images/basket.jpg");

								this.basketbase = new CGFappearance(this.scene);
								this.basketbase.setAmbient(0.3,0.3,0.3,0.3);
								this.basketbase.setDiffuse(0.1,0.1,0.1,0.2);
								this.basketbase.setSpecular(1,1,1,0.2);
								this.basketbase.setShininess(5);
								this.basketbase.loadTexture("./resources/images/basketbase.jpg");

	this.initBuffers();
};

MyPot.prototype = Object.create(CGFobject.prototype);
MyPot.prototype.constructor=MyPot;

MyPot.prototype.initBuffers = function() {

	this.patch = new MyPatch(this.scene, 5, 5, 20, 20, this.outside);
	this.patch2 = new MyPatch(this.scene, 5, 5, 20, 20, this.inside);
	this.base = new MyCylinder(this.scene,1,1,0.2,20,20);
}

MyPot.prototype.display = function(){


		this.scene.pushMatrix();
		this.scene.translate(10,-15.7,6);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(7,7,7);
		this.basket.apply();
		this.patch.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(10,-15.7,6);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.scale(7,7,7);
		this.basket.apply();
		this.patch2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(10,-12.8,8);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.scale(3.2,3.2,1);
		this.basketbase.apply();
		this.base.display();
		this.scene.popMatrix();

}
