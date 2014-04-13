function Background(layer, src1, src2, src3, autoMove) {
	this.layer = layer;
	this.autoMove = autoMove;
	this.initSprite(src1, src2, src3);
}


Background.prototype.initSprite = function(src1, src2, src3) {
	this.bg0 = cc.Sprite.create(src1);
	this.bg0.setAnchorPoint(cc.p(0, 0));
	this.bg0.setPosition(0, 0);

	this.bg1 = cc.Sprite.create(src2);
	this.bg1.setAnchorPoint(cc.p(0, 0));
	this.bg1.setPosition(0, 100);

	this.bg2 = cc.Sprite.create(src3);
	this.bg2.setAnchorPoint(cc.p(0, 0));
	this.bg2.setPosition(0, 200);

	this.layer.addChild(this.bg2);
	this.layer.addChild(this.bg1);
	this.layer.addChild(this.bg0);
};

// 根据role的x坐标算bg0, bg1的位置，根据g_worldTime和role的x算bg2的位置
Background.prototype.update = function(x) {
	// bg0, bg1 
	var eyeX = x - g_screenWidth / 2;
	if (eyeX < 0) {
		eyeX = 0;
	}
	if (eyeX > this.layer.map.getMapSize().width - g_screenWidth) {
		eyeX = this.layer.map.getMapSize().width - g_screenWidth;
	}
	this.bg0.setPositionX(eyeX * 0.3);
	this.bg1.setPositionX(eyeX * 0.7);

	// bg2
	var range = this.bg2.getContentSize().width - this.layer.map.getMapSize().width;
	var offsetX = 0;
	if (range > 0 && this.autoMove) {
		var ratio = 10;
		var time = parseInt(g_worldTime * ratio / range);
		if (time % 2 == 0) {
			offsetX = g_worldTime * ratio % range;
		} else {
			offsetX = range - (g_worldTime  * ratio % range);
		}
	}
	this.bg2.setPositionX(eyeX - offsetX);
};