/**
 * MyClock
 * @constructor
 */

var time2Ang_s = 360.0 / (60.0 * 1000.0);
var time2Ang_m = time2Ang_s / 60.0;
var time2Ang_h = time2Ang_m / 60.0;

function MyClock(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.lastUpdate = -1;

    this.clockface = new CGFappearance(this.scene);
    this.clockface.setAmbient(0.3,0.3,0.3,1);
    this.clockface.setDiffuse(0.5,0.5,0.5,1);
    this.clockface.setSpecular(0.8,0.8,0.8,1);
    this.clockface.setShininess(100);
    this.clockface.loadTexture("./resources/images/clock.png");
    this.clockface.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.handleAppearance = new CGFappearance(this.scene);
    this.handleAppearance.setAmbient(0,0,0,0);
    this.handleAppearance.setDiffuse(0,0,0,0);
    this.handleAppearance.setSpecular(0,0,0,0);
    this.handleAppearance.setShininess(0);

    this.secondsAppearance = new CGFappearance(this.scene);
    this.secondsAppearance.setAmbient(1,0,0,0);
    this.secondsAppearance.setDiffuse(1,0,0,0);
    this.secondsAppearance.setSpecular(1,0,0,0);
    this.secondsAppearance.setShininess(0);

    this.initBuffers();
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.initBuffers = function() {

  this.face = new MyCircle(this.scene, this.slices);
  this.clock = new MyCylinder(this.scene,1,1,1,this.slices, this.stacks);
  this.seconds = new MyClockHand(this.scene, 0.9, 0);
  this.minutes = new MyClockHand(this.scene, 0.65, 0);
  this.hours = new MyClockHand(this.scene, 0.4, 0);
}

MyClock.prototype.setEnabled = function (state) {

    this.enabled = state;
}

MyClock.prototype.display = function(){
 	var degToRad = Math.PI / 180.0;
    this.clockface.apply();
    this.scene.pushMatrix();
	   this.clock.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
    this.scene.translate(0,0,1);
  //  this.clockface.apply();
	  this.face.display();


	this.scene.pushMatrix();
	this.scene.translate(0,0,0.1);
	this.scene.rotate(this.hours.angle * degToRad, 0, 0, 1);
	this.handleAppearance.apply();
	this.hours.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,0.1);
	this.scene.rotate(this.minutes.angle * degToRad, 0, 0, 1);
  this.handleAppearance.apply();
	this.minutes.display();
	this.scene.popMatrix();


	this.scene.pushMatrix();
	this.scene.translate(0,0,0.1);
	this.scene.rotate(this.seconds.angle * degToRad, 0, 0, 1);
  this.secondsAppearance.apply();
	this.seconds.display();
	this.scene.popMatrix();
  this.scene.popMatrix();
}

MyClock.prototype.update = function (currTime) {

    if (this.lastUpdate == -1) {
		this.lastUpdate = currTime;
		secInc = 0.6;
	}
	else {
		var diff = currTime - this.lastUpdate;
		this.lastUpdate = currTime;
		secInc = diff * (360 / (60 * 1000));
	}

	this.seconds.setAngle(this.seconds.angle - secInc);
	this.minutes.setAngle(this.minutes.angle - secInc / 60);
	this.hours.setAngle(this.hours.angle - secInc / 3600);
}
