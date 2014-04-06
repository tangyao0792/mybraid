var RoleSprite = cc.Sprite.extend({
	space:null,
	standAnimate:null,
	runAnimate:null,
	animate:null,
	currentFrame:null,
	body:null,
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
	collisionListener:function(body) {
	},
	initPhycics:function(p) {
		var width = this._contentSize._width;
        var height = this._contentSize._height;

        this.body = new Body(this, this.collisionListener, this.space, {width : width, height : height}, p, false);
        this.body.debug = true;
        this.body.ay = g_g;

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
		this.body.vx = 0;
	},
	runLeft:function() {
		this.setFlippedX(false);
		this.setAnimate(this.runAnimate);		
		this.body.vx = -g_runVel;
	},
	runRight:function() {
		this.setFlippedX(true);
		this.setAnimate(this.runAnimate);
		this.body.vx = g_runVel;
	},
	jump:function() {
		if (this.body.collisionFlag.down) {
			this.body.vy += g_jumpVel;
		}
	}
});