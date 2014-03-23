
function createSpriteFrameWithFilename(fileName) {
	var texture = cc.TextureCache.getInstance().addImage(fileName);
	var rect = cc.RectZero();
	rect._size = texture.getContentSize();
	return cc.SpriteFrame.createWithTexture(texture, rect);
}
