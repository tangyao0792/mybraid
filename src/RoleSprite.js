var RoleSprite = cc.Sprite.extend({
	space:null,
	standAnimate:null,
	runAnimate:null,
	jumpAnimate:null,
	animate:null,
	currentFrame:null,
	body:null,
	state:{stand:true, runLeft:false, runRight:false},
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

        this.body = new Body(this, RoleCollisionListener, this.space, {width : width, height : height}, p, false);
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

		this.jumpAnimate = new Animate(this);
		this.jumpAnimate.setDelayUnit(1.0 / 4);
		this.jumpAnimate.addFrameWithFilename(s_c_jump0);
		this.jumpAnimate.addFrameWithFilename(s_c_jump0);

	},
	setAnimate:function(animate) {
		this.animate = animate;
	},
	runAnimation:function() {
		if (!g_pauseWorld) {
			this.animate.play();
		}
	},
	update:function(dt) {
		if (!this.touchGround()) {
			this.setAnimate(this.jumpAnimate);
		}
		if (!g_pauseWorld) {
			if (this.state.runLeft) {
				this.setFlippedX(false);
			} else if (this.state.runRight) {
				this.setFlippedX(true);
			}
		}
		this.runAnimation();
	},
	stand:function() {
		this.state.stand = true;
		this.state.runLeft = false;
		this.state.runRight = false;
	},
	runLeft:function() {
		if (this.state.runLeft) {
			return;
		}
		this.state.stand = false;
		this.state.runLeft = true;
		this.state.runRight = false;
	},
	runRight:function() {
		if (this.state.runRight) {
			return;
		}
		this.state.stand = false;
		this.state.runLeft = false;
		this.state.runRight = true;
	},
	jump:function() {
		if (this.touchGround()) {
			this.body.vy += g_jumpVel;
		}
	},
	touchGround:function() {
		return this.body.collisionFlag.down;
	}
});

function RoleCollisionListener(roleBody, body) {
	var role = roleBody.sprite;
	if (role.touchGround()) {
		if (role.state.stand) {
			role.body.vx = 0;
			role.setAnimate(role.standAnimate);
		} else if (role.state.runRight) {
			role.body.vx = g_runVel;
			role.setAnimate(role.runAnimate);
		} else {
			role.body.vx = -g_runVel;
			role.setAnimate(role.runAnimate);
		}
	}
}