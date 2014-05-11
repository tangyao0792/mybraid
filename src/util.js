
function createSpriteFrameWithFilename(fileName) {
	var texture = cc.TextureCache.getInstance().addImage(fileName);
	var rect = cc.RectZero();
	rect._size = texture.getContentSize();
	var frame = cc.SpriteFrame.createWithTexture(texture, rect);
	return frame;
}



// 计算时间扭曲率
function getRateWhenRingOn(x, y) {
	var dist = Math.sqrt((x - g_ring_x) * (x - g_ring_x) + (y - g_ring_y) * (y - g_ring_y));
	if (dist > g_ring_range) {
		return 1.0;
	} else if (dist < 100) {
		return 0.2
	} else {
		return (dist - 100) / g_ring_range + 0.2;
	}
}