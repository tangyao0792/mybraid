var MyScene = cc.Scene.extend({
	onEnter:function() {
		this._super();
		var gameLayer = new GameLayer();
		gameLayer.init();
		this.addChild(gameLayer);
	}
});