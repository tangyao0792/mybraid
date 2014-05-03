var StatusLayer = cc.Layer.extend({
	level:null,
	magicBucket:null,
	timeLabel:null,
	magicNum:0,
	ring:null,
	init:function(level) {
		this._super();
		this.level = level;

		this.timeLabel = cc.LabelTTF.create("00:00", "Arial", 36);
		this.timeLabel.setAnchorPoint(cc.p(0, 0));
		this.timeLabel.setPosition(g_magicBucket_x + g_magicBucket_step * 11 + 10, g_magicBucket_y - 7);
		this.addChild(this.timeLabel);

		this.loadLevel();
		this.scheduleUpdate();
	},
	loadLevel:function() {
		this.magicBucket = new Array();
		//for (var i in this.level.magicGrey) {
		for (var i = 0; i < this.level.magicNum; i++) {
			var magicGrey = cc.Sprite.create(this.level.magicGrey[i]);
			magicGrey.setAnchorPoint(cc.p(0, 0));
			var p = cc.p(g_magicBucket_x + parseInt(i) * g_magicBucket_step, g_magicBucket_y);
			magicGrey.setPosition(p);
			this.addChild(magicGrey);
			this.magicBucket.push(magicGrey);
		}
	},
	update:function(dt) {
		var worldMinute = parseInt(g_worldTime / 60);
		var worldSecond = parseInt(g_worldTime % 60);
		var string = "";
		if (worldMinute < 10) {
			string += "0";
		}
		string += worldMinute + ":";
		if (worldSecond < 10) {
			string += "0";
		}
		string += worldSecond;

		this.timeLabel.setString(string);
	},
	enableItem:function(item) {
		var id = item.id;
		this.addChild(item);
		item.setPosition(cc.p(g_magicBucket_x + parseInt(id) * g_magicBucket_step, g_magicBucket_y));
		this.magicNum++;
	},
	enableRing:function() {
		if (this.ring == null) {
			this.ring = cc.Sprite.create(s_npc_ring[0]);
			this.ring.setAnchorPoint(cc.p(0, 0));
			this.ring.setPosition(cc.p(g_magicBucket_x + g_magicBucket_step * 10, g_magicBucket_y));
		}
		this.addChild(this.ring);
	},
	disableRing:function() {
		this.removeChild(this.ring);
	},
	tryNext:function() {
		return this.magicNum == this.level.magicNum;
	}
});