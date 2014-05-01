function AudioEngine() {

}

AudioEngine.prototype.setBgSound = function(src) {
	this.bgSound = src;
	this.bgSoundId = null;
	this.silenceId = -1;
};

AudioEngine.prototype.playBgSound = function() {
	this.bgSoundId = cc.AudioEngine.getInstance().playMusic(this.bgSound, true);
};

AudioEngine.prototype.pauseBgSound = function() {
	cc.AudioEngine.getInstance().pauseMusic(this.bgSoundId);
	if (this.silenceId == -1) {
		this.silenceId = cc.AudioEngine.getInstance().playEffect(s_silence, true);
	}
};

AudioEngine.prototype.resumeBgSound = function() {
	cc.AudioEngine.getInstance().resumeMusic(this.bgSoundId);
	cc.AudioEngine.getInstance().stopEffect(this.silenceId);
	this.silenceId = -1;
};

AudioEngine.prototype.playJump = function() {
	cc.AudioEngine.getInstance().playEffect(s_jump);
}

AudioEngine.prototype.playPick = function() {
	cc.AudioEngine.getInstance().playEffect(s_pick);
};

AudioEngine.prototype.playRoll = function() {
	cc.AudioEngine.getInstance().playEffect(s_roll);
};