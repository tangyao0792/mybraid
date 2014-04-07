g_pauseWorld = false;
g_worldTime = 0.0;
g_g = -1800;	// 重力加速度g
g_runVel = 150;
g_jumpVel = 600;

g_screenWidth = 800;

var GameLayer = cc.Layer.extend({
	role:null,
	space:null,
	map:null,
	wall:null,
	init:function() {
		this._super();

		this.initBackground();
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

			var body = new Body(wall, null, this.space, {width : w['width'], height:w['height'] - 20}, {x : x, y : y}, true);
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
	initBackground:function() {
		this.background = new Background(this, s_springback0, s_springback1, s_springback2);
	},
	// 设计原则：不管如何操作时间，update都必须要调用
	update:function(dt) {
		if (!g_pauseWorld) {
			g_worldTime += dt;
		}	
		this.space.update(dt);

		this.updateCamera(this.role.getPositionX());
		this.background.update(this.role.getPositionX());
	},
	// 根据role的x坐标，调整camera
	updateCamera:function(x) {
		var eyeX = x - g_screenWidth / 2;
		if (eyeX < 0) {
			eyeX = 0;
		}
		if (eyeX > this.map.getMapSize().width - g_screenWidth * 1.5) {
			eyeX = this.map.getMapSize().width - g_screenWidth * 1.5;
		}
		var camera = this.getCamera();
		var eyeZ = cc.Camera.getZEye();
		camera.setEye(eyeX, 0, eyeZ);
		camera.setCenter(eyeX, 0, 0);	
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
				break;
			case cc.KEY.x:  	// 调试
				this.role.body.setPosition(Math.random() * this.map.getMapSize().width, Math.random() * this.map.getMapSize().height);
				break;
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