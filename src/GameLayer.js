g_pauseWorld = false;
g_worldTime = 0.0;
g_g = -1800;	// 重力加速度g
g_runVel = 150;
g_jumpVel = 600;

var GameLayer = cc.Layer.extend({
	role:null,
	space:null,
	map:null,
	wall:null,
	init:function() {
		this._super();

		this.initPhysics();
		this.initMap();	
		this.initRole();
		this.setKeyboardEnabled(true);
		this.scheduleUpdate();
	},
	initMap:function() {
		this.map = cc.TMXTiledMap.create(s_map);
		// wall
		this.wall = new Array();
		var wallGroup = this.map.getObjectGroup("wall").getObjects();
		for (var i in wallGroup) {
			var w = wallGroup[i];
			var x = w['x'];
			var y = w['y'];
			var wall = cc.Sprite.create(s_grass);
			wall.setAnchorPoint(cc.p(0, 0));
			wall.setPosition(x, y);
			this.addChild(wall);

			var body = new Body(wall, null, this.space, {width : w['width'], height:w['height']}, {x : x, y : y}, true);
		}
	},
	initPhysics:function() {
		this.space = new Space();
	},
	initRole:function() {
		this.role = new RoleSprite(s_c_stand0, this.space, cc.p(100, 300));
		this.role.setAnchorPoint(cc.p(0, 0));

        var s = cc.Director.getInstance().getWinSize();
		this.addChild(this.role);
	},
	update:function(dt) {
		if (!g_pauseWorld) {
			g_worldTime += dt;
		}
		this.space.update(dt);
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