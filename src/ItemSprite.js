var ItemSprite = cc.Sprite.extend({
	id:0,
	space:null,
	animate:null,
	body:null,
	parant:null,
	ctor:function(parant, srcArray, space, p, id) {
		this._super();
		this.initWithFile(srcArray[0]);

		this.setAnchorPoint(cc.p(0, 0));
		this.space = space;
		this.parant = parant;
		this.id = id;

		this.initAnimate(srcArray);
		this.initPhycics(p);

		this.scheduleUpdate();
	},
	initAnimate:function(srcArray) {
		this.animate = new Animate(this);
		this.animate.setDelayUnit(0.5);
		for (var i in srcArray) {
			this.animate.addFrameWithFilename(srcArray[i]);
		}
	},
	initPhycics:function(p) {
		var width = this._contentSize._width;
        var height = this._contentSize._height;

        this.body = new Body(this, null, this.space, {width : width, height : height}, p, true);
        // TODO add into constructor
        this.body.isItem = true;
	},
	update:function(dt) {
		this.animate.play();
	},
	removeSelf:function() {
		this.space.removeBody(this.body);
	}
});
