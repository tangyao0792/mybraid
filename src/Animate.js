/**
 @class 重写可被时间操纵的Animate类
 */
 var Animate = cc.Class.extend({
 	spriteFrame:null,
 	delayUnit:0,
 	totalUnit:0,
 	currentIndex:0,
 	target:null,
 	ctor:function(target) {
 		this.target = target;
 		this.spriteFrames = new Array();
 	},
 	setDelayUnit:function(delayUnit) {
 		this.delayUnit = delayUnit;
 	},
 	addFrameWithFilename:function(fileName) {
		this.spriteFrames.push(createSpriteFrameWithFilename(fileName));
		this.totalUnit = this.delayUnit * this.spriteFrames.length;
 	},
 	play:function() {
		var tempTime = g_worldTime % this.totalUnit;
		var index = Math.floor(tempTime / this.delayUnit);
		if (index != this.currentIndex) {
			this.target.setDisplayFrame(this.spriteFrames[index]);
			this.currentIndex = index;
		}
 	}
});
/*function Animate(target) {
	this.spriteFrames = new Array();
	cc.log(this.spriteFrames);
	this.delayUnit = 0;
	this.totalUnit = 0;
	this.currentIndex = 0;
	this.target = target;

		function setDelayUnit(delayUnit) {
			this.delayUnit = delayUnit;
		}
		function addFrameWithFilename(fileName) {
			cc.log(this.spriteFrames);
		function play() {
	
		}
	}
}
*/