var MyScene = cc.Scene.extend({
	onEnter:function() {
		this._super();
		var gameLayer = new GameLayer();
		gameLayer.init(level1);
		this.addChild(gameLayer);
	}
});