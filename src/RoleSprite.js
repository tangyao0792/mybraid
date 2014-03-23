var RoleSprite = cc.PhysicsSprite.extend({
	space:null,
	standAnimate:null,
	animation:null,
	currentFrame:null,
	ctor:function(src, space, p) {
		this._super();
		this.initWithFile(src);
		this.currentFrame = src;
        this.setAnchorPoint(cc.p(0, 0));
		this.space = space;

		this.initPhycics(p);
		this.initAnimate();
		this.setAnimation(this.standAnimation);
		this.scheduleUpdate();
	},
	initPhycics:function(p) {
		var width = this._contentSize._width;
        var height = this._contentSize._height;

        this.body = new cp.Body(1, cp.momentForBox(1, width, height));
        this.body.p = p;

        this.shape = new cp.BoxShape(this.body, width, height);
        this.setBody(this.body);

    	this.space.addBody(this.body);
    	this.space.addShape(this.shape);
	},
	initAnimate:function() {
		this.standAnimate = new Animate(this);
		this.standAnimate.setDelayUnit(2.0 / 8);
		for (var i in standAnimation) {
			this.standAnimate.addFrameWithFilename(standAnimation[i]);
		}
	},
	setAnimation:function(animation) {
	},
	runAnimation:function() {
		this.standAnimate.play();
	},
	update:function(dt) {
		this.runAnimation();
	}
});