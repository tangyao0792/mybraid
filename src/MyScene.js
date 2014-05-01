var MyScene = cc.Scene.extend({
	gameLayer:null,
	statusLayer:null,
	onEnter:function() {
		this._super();
		this.gameLayer = new GameLayer();
		this.gameLayer.init(level1);

		this.statusLayer = new StatusLayer();
		this.statusLayer.init(level1);

		this.gameLayer.statusLayer = this.statusLayer;
		
		this.addChild(this.gameLayer);
		this.addChild(this.statusLayer);

		g_gameLayer = this.gameLayer;
		g_statusLayer = this.statusLayer;
	},
});


var MyScene2 = cc.Scene.extend({
	gameLayer:null,
	statusLayer:null,
	onEnter:function() {
		this._super();
		this.gameLayer = new GameLayer();
		this.gameLayer.init(level2);

		this.statusLayer = new StatusLayer();
		this.statusLayer.init(level2);

		this.gameLayer.statusLayer = this.statusLayer;
		
		this.addChild(this.gameLayer);
		this.addChild(this.statusLayer);

		g_gameLayer = this.gameLayer;
		g_statusLayer = this.statusLayer;
	},
});