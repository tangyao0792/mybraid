var RoleSprite = cc.PhysicsSprite.extend({
	space:null,
	standAnimate:null,
	runAnimate:null,
	animate:null,
	currentFrame:null,
	ctor:function(src, space, p) {
		this._super();
		this.initWithFile(src);
		this.currentFrame = src;
        this.setAnchorPoint(cc.p(0, 0));
		this.space = space;

		this.initPhycics(p);
		this.initAnimate();
		this.setAnimate(this.standAnimate);

		this.scheduleUpdate();

	},
	initPhycics:function(p) {
		var width = this._contentSize._width;
        var height = this._contentSize._height;

        this.body = new cp.Body(1, cp.momentForBox(1, width, height));
        this.body.p = p;

        this.shape = new cp.BoxShape(this.body, width, height);
        this.setBody(this.body);

    	this.space.addBody(this.body);
    	this.space.addShape(this.shape);
	},
	initAnimate:function() {
		this.standAnimate = new Animate(this);
		this.standAnimate.setDelayUnit(2.0 / 8);
		for (var i in standAnimation) {
			this.standAnimate.addFrameWithFilename(standAnimation[i]);
		}

		this.runAnimate = new Animate(this);
		this.runAnimate.setDelayUnit(1.0 / 4);
		for (var i in runAnimation) {
			this.runAnimate.addFrameWithFilename(runAnimation[i]);
		}
	},
	setAnimate:function(animate) {
		this.animate = animate;
	},
	runAnimation:function() {
		this.animate.play();
	},
	update:function(dt) {
		this.runAnimation();
	},
	stand:function() {
		this.setAnimate(this.standAnimate);
		this.body.setVel(cc.p(0, 0));
	},
	runLeft:function() {
		this.faceLeft = true;
		this.setFlippedX(false);
		this.setAnimate(this.runAnimate);		
		var vel = this.body.getVel();
		vel.x = -g_runVel;
		this.body.setVel(vel);
	},
	runRight:function() {
		this.faceLeft = false;
		this.setFlippedX(true);
		this.setAnimate(this.runAnimate);
		var vel = this.body.getVel();
		vel.x = g_runVel;
		this.body.setVel(vel);
	},
	jump:function() {
		var vel = this.body.getVel();
		vel.y += g_jumpVel;
		this.body.setVel(vel);
	}
});