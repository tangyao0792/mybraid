var MyScene = cc.Scene.extend({
	gameLayer:null,
	statusLayer:null,
	onEnter:function() {
		this._super();
		g_ring_on = false;

		this.gameLayer = new GameLayer();
		this.gameLayer.init(this.level);

		this.statusLayer = new StatusLayer();
		this.statusLayer.init(this.level);

		this.gameLayer.statusLayer = this.statusLayer;
		
		this.addChild(this.gameLayer);
		this.addChild(this.statusLayer);

		g_gameLayer = this.gameLayer;
		g_statusLayer = this.statusLayer;
		g_currentScene = this;
	},
	nextScene:function() {
		var id = this.level.id;
		if (id >= g_sceneNum - 1) {
			return;
		}
		var scene = g_Scene[id + 1];
		cc.LoaderScene.preload(g_Level[id + 1].resource, function () {
            cc.Director.getInstance().replaceScene(new scene());
        }, this);
	},
	reload:function() {
		var id = this.level.id;
		var scene = g_Scene[id];
		cc.LoaderScene.preload(g_Level[id].resource, function () {
            cc.Director.getInstance().replaceScene(new scene());
        }, this);
	}
});


var MyScene0 = MyScene.extend({
	level:level0
});


var MyScene1 = MyScene.extend({
	level:level1
});


var MyScene2 = MyScene.extend({
	level:level2
});

var g_Scene = new Array();
g_Scene[0] = MyScene0;
g_Scene[1] = MyScene1;
g_Scene[2] = MyScene2;
