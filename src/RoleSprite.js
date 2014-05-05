var RoleSprite = cc.Sprite.extend({
	space:null,
	standAnimate:null,
	runAnimate:null,
	jumpAnimate:null,
	animate:null,
	body:null,
	state:{stand:true, runLeft:false, runRight:false},
	layer:null,
	hasRing:false,
	ctor:function(src, space, p, layer) {
		this._super();
		this.initWithFile(src);
        this.setAnchorPoint(cc.p(0, 0));
		this.space = space;

		this.initPhycics(p);
		this.initAnimate();
		this.setAnimate(this.standAnimate);

		this.layer = layer;

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
			this.layer.audioEngine.playJump();
		}
	},
	touchGround:function() {
		return this.body.collisionFlag.down;
	},
	pick:function(itemSprite) {
		this.layer.audioEngine.playPick();
		var id = itemSprite.id;
	
		var to = cc.p(g_magicBucket_x + parseInt(id) * g_magicBucket_step + this.layer.eyeX, g_magicBucket_y);
		var actionTo = cc.MoveTo.create(0.6, to);
		var action = cc.Sequence.create(
			actionTo,
			cc.CallFunc.create(MoveToListener, itemSprite, this.layer.statusLayer)
		);
		itemSprite.runAction(action);		
		itemSprite.removeSelf();
	},
	talk:function() {
		var npc = this.space.testNPCCollision(this.body);
		if (npc != null) {
			if (npc.collisionCallback != null) {
				npc.collisionCallback(npc.sprite);
			}
			this.stand();
		}
	},
	pickRing:function () {
		var npc = this.space.testRingCollision(this.body);
		if (npc != null) {
			if (npc.sprite.isRing) {
				npc.collisionCallback(npc.sprite);
				g_gameLayer.hideRange();
			}
		}
	},
	putRing:function() {
		if (this.hasRing) {
			this.hasRing = false;
			g_gameLayer.ring.body.setPosition(this.getPositionX(), this.getPositionY());
			g_gameLayer.ring.scheduleUpdate();
			this.space.addNPC(g_gameLayer.ring.body);
			g_gameLayer.addChild(g_gameLayer.ring);
			g_statusLayer.disableRing();
			g_ring_on = true;
			g_ring_x = this.getPositionX();
			g_ring_y = this.getPositionY();
			g_gameLayer.showRange();
		}
	}
});

function MoveToListener(item, statusLayer) {
	item.parant.removeChild(item);
	statusLayer.enableItem(item);
}

function RoleCollisionListener(roleBody, body) {
	var role = roleBody.sprite;
	if (role.touchGround()) {
		if (role.state.stand) {
			role.body.vx = 0;
			role.setAnimate(role.standAnimate);
			// TODO fix bug, 站在地上，和空中的移动物体碰撞，base速度会变
			if (body.hasMoved) {
				roleBody.baseVx = body.vx;
			} else {
				roleBody.baseVx = 0;
			}
		} else if (role.state.runRight) {
			role.body.vx = g_runVel;
			role.setAnimate(role.runAnimate);
			roleBody.baseVx = 0;
		} else {
			role.body.vx = -g_runVel;
			role.setAnimate(role.runAnimate);
			roleBody.baseVx = 0;
		}
	}
	if (body.isItem) {
		role.pick(body.sprite);
	}
}