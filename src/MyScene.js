var MyScene = cc.Scene.extend({
	gameLayer:null,
	onEnter:function() {
		this._super();
		this.gameLayer = new GameLayer();
		this.gameLayer.init(level1);
		this.addChild(this.gameLayer);
	},
});