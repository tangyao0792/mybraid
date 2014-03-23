g_pauseWorld = false;
g_worldTime = 0.0;
g_g = -1800;	// 重力加速度g
g_runVel = 150;
g_jumpVel = 500;

var GameLayer = cc.Layer.extend({
	role:null,
	space:null,
	keyState:{left:false, right:false, up:false, down:false},
	init:function() {
		this._super();

		this.initPhysics();
		this.initRole();
		this.setKeyboardEnabled(true);
		this.scheduleUpdate();
	},
	initPhysics:function() {
		this.space = new cp.Space();
		this.space.gravity = cp.v(0, g_g);
		this.space.addStaticShape(new cp.SegmentShape(this.space.staticBody,
		    cp.v(0, 200),
		    cp.v(10000, 200),
		    0
		 ));

	},
	initRole:function() {
		this.role = new RoleSprite(s_c_stand0, this.space, cc.p(500, 500));
		this.role.setAnchorPoint(cc.p(0, 0));

        var s = cc.Director.getInstance().getWinSize();
        this.role.setPosition(s.width / 2, s.height / 2 + 200);
		this.addChild(this.role);
	},
	update:function(dt) {
		if (!g_pauseWorld) {
			g_worldTime += dt;
		}
		this.space.step(dt);
	},
	onKeyDown:function(key) {
		switch(key) {
			case cc.KEY.left:
				this.role.runLeft();
				break;
			case cc.KEY.right:
				this.role.runRight();
				break;
			case cc.KEY.up:
				this.role.jump();
		}
	},
	onKeyUp:function(key) {
		switch(key) {
			case cc.KEY.left:
				this.role.stand();
				break;
			case cc.KEY.right:
				this.role.stand();
				break;
		}
	}
});