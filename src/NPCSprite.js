var NPCSprite = cc.Sprite.extend({
	animate:null,
	space:null,
	action:null,	// action非null时必须先执行action再执行动画
	isRing:false,
	ctor:function(NPCConfig, space, p, isRing) {
		this._super();
		this.initWithFile(NPCConfig.src[0]);

		this.setAnchorPoint(cc.p(0, 0));
		this.space = space;
		if (isRing == true) {
			this.isRing = true;
		}

		this.collisionCallback = NPCConfig.callback;

		this.initAnimate(NPCConfig.src);
		this.initPhycics(p);

		this.scheduleUpdate();
	},
	initAnimate:function(srcArray) {
		this.animate = new Animate(this);
		this.animate.setDelayUnit(0.8);
		for (var i in srcArray) {
			this.animate.addFrameWithFilename(srcArray[i]);
		}
	},
	initPhycics:function(p) {
		var width = this._contentSize._width;
        var height = this._contentSize._height;

        this.body = new Body(this, this.collisionCallback, this.space, {width : width, height : height}, p, true, true);
        this.space.addNPC(this.body);
	},
	update:function(dt) {
		if (this.action != null) {
			this.runAction(this.action);
			this.action = null;
			return;
		}
		this.animate.play();
	}
});


g_npc = new Array();


g_npc["old"] = { 
	src : s_npc_old, 
	callback:function() {
		var dialog = g_DialogFactory.getDialog("old", new Array("哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈", "hello world!", "ni hao", "bye bye"));
		dialog.show();
	}
};

g_npc["handsome"] = {
	src : s_npc_handsome,
	callback:function() {
		var dialog = g_DialogFactory.getDialog("handsome", new Array("我爱上让我奋不顾身的一个人", "我以为这就是我所追求的世界",
			"然而横冲直撞", "被误解被骗", "是否成人的世界背后", "总有残缺"));
		dialog.show();
	}
};

g_npc["door"] = {
	src : s_npc_door,
	callback:function() {
		if (g_statusLayer.tryNext()) {
			g_gameLayer.audioEngine.playNext();
			g_currentScene.nextScene();
			return;
		}
		var dialog = g_DialogFactory.getDialog("door", new Array("我还有一些东西遗漏在这个时空"));
		dialog.show();
	}
};

g_npc["floatman"] = {
	src : s_npc_floatman,
	callback:function() {
		var dialog = g_DialogFactory.getDialog("floatman", new Array("为什么让我飘着？"));
		dialog.show();
	}
};

g_npc["ring"] = {
	src : s_npc_ring,
	callback:function(npc) {
		var to = cc.p(g_magicBucket_x + g_magicBucket_step * 10 + g_gameLayer.eyeX, g_magicBucket_y);
		var actionTo = cc.MoveTo.create(0.6, to);
		var action = cc.Sequence.create(
			actionTo,
			cc.CallFunc.create(
				function(ring) {
					g_gameLayer.space.removeNpc(npc.body);
					g_gameLayer.removeChild(ring);
					g_statusLayer.enableRing();
					g_gameLayer.role.hasRing = true;
				},
				this)
		);
		npc.action = action;
	}
};
