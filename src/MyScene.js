var MyScene = cc.Scene.extend({
	gameLayer:null,
	coverLayer:null,
	covered:false,
	onEnter:function() {
		this._super();
		this.gameLayer = new GameLayer();
		this.gameLayer.init(this, level1);
		this.addChild(this.gameLayer);
		this.coverLayer = cc.LayerColor.create(cc.c4(0, 0, 0, 50), g_screenWidth, g_screenHeight);
	},
	cover:function() {
		if (this.covered) {
			return;
		}
		this.covered = true;
		this.addChild(this.coverLayer);
	},
	uncover:function() {
		if (!this.covered) {
			return;
		}
		this.covered = false;
		this.removeChild(this.coverLayer);
	}
});