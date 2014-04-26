var NPCSprite = cc.Sprite.extend({
	animate:null,
	space:null,
	ctor:function(NPCConfig, space, p) {
		this._super();
		this.initWithFile(NPCConfig.src[0]);

		this.setAnchorPoint(cc.p(0, 0));
		this.space = space;

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
		this.animate.play();
	}
});

function ShowTalk() {
	cc.log("talk");
}


var g_npc_name = new Array();
g_npc_name["old"] = { src : s_npc_old, callback : ShowTalk};