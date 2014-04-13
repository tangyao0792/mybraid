g_pauseWorld = false;
g_worldTime = 0.0;	// 会被暂停
g_realTime = 0.0;	// 真正的时间，不会暂停

g_g = -1800;		// 重力加速度g
g_runVel = 180;
g_jumpVel = 600;
g_moveRockVel = 100;

g_screenWidth = 960;
g_screenHeight = 600;

var GameLayer = cc.Layer.extend({
	role:null,
	space:null,
	map:null,
	wall:null,
	level:null,
	coverLayer:null,
	covered:false,
	init:function( level) {
		this._super();

		this.level = level;
		this.loadLevel();
		this.setKeyboardEnabled(true);
		this.scheduleUpdate();

		this.coverLayer = cc.LayerColor.create(cc.c4(0, 0, 10, 100), this.map.getMapSize().width, this.map.getMapSize().height);
	},
	cover:function() {
		if (this.covered) {
			return;
		}
		this.covered = true;
		this.addChild(this.coverLayer);
	},
	uncover:function() {
		if (!this.covered) {
			return;
		}
		this.covered = false;
		this.removeChild(this.coverLayer);
	},
	loadLevel:function() {

		this.initBackground();
		this.initPhysics();
		this.initMap();	
		this.initRole();
	},
	initMap:function() {
		this.map = cc.TMXTiledMap.create(this.level.map);
		this.space.setBorder(this.map.getMapSize().width, this.map.getMapSize().height);
		// wall
		var wallGroup = this.map.getObjectGroup("rock").getObjects();
		for (var i in wallGroup) {
			var w = wallGroup[i];
			var x = w['x'];
			var y = w['y'];
			var wall = cc.Sprite.create(this.level.rock);
			wall.setAnchorPoint(cc.p(0, 0));
			wall.setPosition(x, y);
			this.addChild(wall);

			var body = new Body(wall, null, this.space, {width : w['width'], height:w['height'] - 20}, {x : x, y : y}, true);
		}

		if (this.map.getObjectGroup("moveRock") != null) {
			var moveRock = this.map.getObjectGroup("moveRock").getObjects();
			for (var i in moveRock) {
				var w = moveRock[i];
				var x = w['x'];
				var y = w['y'];
				var wall = cc.Sprite.create(this.level.moveRock);
				wall.setAnchorPoint(cc.p(0, 0));
				wall.setPosition(x, y);
				this.addChild(wall);

				if (w['timeType'] != 0) {
					wall.setZOrder(1);
				}
				var body = new MoveRockBody(wall, this.space, w['toLeft'], w['toRight'], {width : w['width'],
						 height:w['height'] - 20}, {x : x, y : y}, 100, w['timeType']);
			}
		}

	},
	initPhysics:function() {
		this.space = new Space();
	},
	initRole:function() {
		this.role = new RoleSprite(s_c_stand0, this.space, cc.p(100, 300));
		this.role.setAnchorPoint(cc.p(0, 0));
		this.role.setZOrder(2);

        var s = cc.Director.getInstance().getWinSize();
		this.addChild(this.role);
	},
	initBackground:function() {
		this.background = new Background(this, this.level.bg0, this.level.bg1, this.level.bg2, this.level.bgAutoMove);
	},
	// 设计原则：不管如何操作时间，update都必须要调用
	update:function(dt) {
		if (!g_pauseWorld) {
			g_worldTime += dt;
		}	
		g_realTime += dt;
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
		if (eyeX > this.map.getMapSize().width - g_screenWidth) {
			eyeX = this.map.getMapSize().width - g_screenWidth;
		}
		var camera = this.getCamera();
		var eyeZ = cc.Camera.getZEye();
		camera.setEye(eyeX, 0, eyeZ);
		camera.setCenter(eyeX, 0, 0);	
	},
	stopWorld:function() {
		this.cover();
		g_pauseWorld = true;
	},
	resumeWorld:function() {
		this.uncover();
		g_pauseWorld = false;
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
			case cc.KEY.c:
				this.role.jump();
				break;
			case cc.KEY.x:
				this.stopWorld();
				break;

			case cc.KEY.d:  	// 调试
				this.role.body.setPosition(Math.random() * this.map.getMapSize().width, Math.random() * this.map.getMapSize().height);
				break;

			case cc.KEY.w:      // load level调试
				this.level = level2;
				this.loadLevel();
				break;
			case cc.KEY.q:
				this.level = level1;
				this.loadLevel();
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
			case cc.KEY.x:
				this.resumeWorld();
				break;
		}
	}
});