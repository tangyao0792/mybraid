var StatusLayer = cc.Layer.extend({
	level:null,
	magicBucket:null,
	timeLabel:null,
	magicNum:0,
	init:function(level) {
		this._super();
		this.level = level;

		this.timeLabel = cc.LabelTTF.create("00:00", "Arial", 36);
		this.timeLabel.setAnchorPoint(cc.p(0, 0));
		this.timeLabel.setPosition(g_magicBucket_x + g_magicBucket_step * 9 + 10, g_magicBucket_y - 7);
		this.addChild(this.timeLabel);

		this.loadLevel();
		this.scheduleUpdate();
	},
	loadLevel:function() {
		this.magicBucket = new Array();
		for (var i in this.level.magicGrey) {
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
		if (this.magicNum == 9) {
			alert("You Win!");
		}
	}
});