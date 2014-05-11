/**
 @class 重写可被时间操纵的Animate类
 */
 var Animate = cc.Class.extend({
 	spriteFrame:null,
 	delayUnit:0,
 	totalUnit:0,
 	currentIndex:-1,
 	target:null,
 	// TODO 把mytime移到role上
 	mytime:0,
 	lastWorldTime:0,
 	id:-1,
 	ctor:function(target) {
 		this.target = target;
 		this.spriteFrames = new Array();

 		this.id = g_animate_id++;
 		g_animate[this.id] = this;
 	},
 	setDelayUnit:function(delayUnit) {
 		this.delayUnit = delayUnit;
 	},
 	addFrameWithFilename:function(fileName) {
		this.spriteFrames.push(createSpriteFrameWithFilename(fileName));
		this.totalUnit = this.delayUnit * this.spriteFrames.length;
 	},
 	play:function() {
 		var dt = g_worldTime - this.lastWorldTime;
 		if (g_ring_on) {
 			dt *= getRateWhenRingOn(this.target.getPositionX(), this.target.getPositionY());
 		}
 		this.mytime += dt;
 		this.lastWorldTime = g_worldTime;
		var tempTime = this.mytime % this.totalUnit;
		var index = Math.floor(tempTime / this.delayUnit);
		if (index != this.currentIndex) {
			this.target.setDisplayFrame(this.spriteFrames[index]);
			this.currentIndex = index;
		}
 	},
 	getCurrentFrame:function() {
 		return this.spriteFrames[this.currentIndex];
 	}
});
