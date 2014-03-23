g_pauseWorld = false;
g_worldTime = 0.0;

var GameLayer = cc.Layer.extend({
	role:null,
	space:null,
	init:function() {
		this._super();

		this.initPhysics();
		this.initRole();
		this.setKeyboardEnabled(true);
		this.scheduleUpdate();
	},
	initPhysics:function() {
		this.space = new cp.Space();
		this.space.gravity = cp.v(0, -350);
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
	}
});