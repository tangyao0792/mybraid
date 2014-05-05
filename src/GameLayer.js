var GameLayer = cc.Layer.extend({
	role:null,
	space:null,
	map:null,
	wall:null,
	level:null,
	coverLayer:null,
	covered:false,
	statusLayer:null,
	eyeX:0,
	audioEngine:null,
	isTalking:false,
	dialog:null,
	ring:null,
	range:null,
	init:function( level) {
		this._super();

		this.level = level;
		this.loadLevel();
		this.setKeyboardEnabled(true);
		this.scheduleUpdate();

		this.coverLayer = cc.LayerColor.create(cc.c4(0, 0, 10, 100), this.map.getMapSize().width, this.map.getMapSize().height);
		this.range = cc.Sprite.create(s_range);
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
		this.initAudio();
	},
	initAudio:function() {
		this.audioEngine = new AudioEngine();
		this.audioEngine.setBgSound(this.level.bgSound);
		this.audioEngine.playBgSound();
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

		
		if (this.map.getObjectGroup("smallRock") != null) {
			wallGroup = this.map.getObjectGroup("smallRock").getObjects();
			for (var i in wallGroup) {
				var w = wallGroup[i];
				var x = w['x'];
				var y = w['y'];
				var wall = cc.Sprite.create(this.level.smallRock);
				wall.setAnchorPoint(cc.p(0, 0));
				wall.setPosition(x, y);
				this.addChild(wall);

				var body = new Body(wall, null, this.space, {width : w['width'], height:w['height'] - 20}, {x : x, y : y}, true);
			}
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
						 height:w['height'] - 20}, {x : x, y : y}, g_moveRockVel, w['timeType']);
			}
		}

		if (this.map.getObjectGroup("item") != null) {
			var items = this.map.getObjectGroup("item").getObjects();
			for (var i in items) {
				var it = items[i];
				for (var j in this.level.magic) {
					if (it.name == "m" + (parseInt(j) + 1)) {
						var magic = new ItemSprite(this, new Array(this.level.magic[j], this.level.magic[j]), this.space, {x:it['x'], y:it['y']}, j);
						this.addChild(magic);
					}
				}
			}
		}

		if (this.map.getObjectGroup("NPC") != null) {
			var npcs = this.map.getObjectGroup("NPC").getObjects();
			for (var i in npcs) {
				var n = npcs[i];
				var name = n["name"];
				if (!(name in g_npc)) {
					cc.log(name + " not in dict");
					continue;
				}
				var npc = new NPCSprite(g_npc[name], this.space, {x:n['x'], y:n['y']});
				this.addChild(npc);
				if (name == "ring") {
					this.ring = npc;
					this.ring.isRing = true;
				}
			}
		}

	},
	initPhysics:function() {
		this.space = new Space();
	},
	initRole:function() {
		this.role = new RoleSprite(s_c_stand0, this.space, cc.p(100, 150), this);
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
		this.eyeX = eyeX;
	},
	stopWorld:function() {
		if (g_pauseWorld) 
			return;
		this.cover();
		g_pauseWorld = true;
		this.audioEngine.pauseBgSound();
	},
	resumeWorld:function() {
		if (!g_pauseWorld)
			return;
		this.uncover();
		g_pauseWorld = false;
		this.audioEngine.resumeBgSound();
	},
	showDialog:function(dialog) {
		this.dialog = dialog;
		this.isTalking = true;
	},
	closeDialog:function() {
		if (!this.isTalking) {
			return;
		}
		this.isTalking = false;
		this.dialog = null;
	},
	onKeyDown:function(key) {
		if (this.isTalking) {
			this.dialog.input(key);
			return;
		}
		switch(key) {
			case cc.KEY.z:
				if (this.role.hasRing) {
					this.role.putRing();
				} else {
					this.role.pickRing();
				}
				break;
			case cc.KEY.left:
				this.role.runLeft();
				break;
			case cc.KEY.right:
				this.role.runRight();
				break;
			case cc.KEY.up:
				this.role.jump();
				break;
			case cc.KEY.space:
				this.role.talk();
				break;
			case cc.KEY.c:
				this.role.jump();
				break;
			case cc.KEY.x:
				this.stopWorld();
				break;
			// 重新进入
			case cc.KEY.escape:
				var reload = new ReloadDialogSprite();
				reload.show();
				break;

			case cc.KEY.d:  	// 调试
				this.role.body.setPosition(Math.random() * this.map.getMapSize().width, Math.random() * this.map.getMapSize().height);
				break;

			case cc.KEY.w:      // load level调试
				g_currentScene.nextScene();
				break;
			case cc.KEY.q:
				cc.Director.getInstance().replaceScene(new MyScene0());
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
	},
	enableItem:function(item) {
		this.statusLayer.enableItem(item);
	},
	showRange:function() {
		if (!g_ring_on) {
			return;
		}
		cc.log('s');
		this.range.setZOrder(10);
		this.range.setPosition(g_ring_x, g_ring_y);
		this.addChild(this.range);
	},
	hideRange:function() {
		if (g_ring_on) {
			return;
		}
		cc.log('h');
		this.removeChild(this.range);
	}
});