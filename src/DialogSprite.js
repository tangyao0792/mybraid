// 一行不超过50字
var g_dialogMaxLine = 25;

var DialogSprite = cc.Sprite.extend({
	isShowing:false,
	textArray:null,
	index:0,
	ctor:function(name, textArray) {
		this._super();
		this.initWithFile(s_dialog);
	
		this.setAnchorPoint(cc.p(0, 0));
		this.setPosition(g_gameLayer.eyeX + g_dialog_x, g_dialog_y);

		this.textArray = textArray;

		this.text = cc.LabelTTF.create("", "Arial", 15);
		this.text.setAnchorPoint(cc.p(0, 0));
		this.text.setPosition(g_gameLayer.eyeX + g_dialog_x + 120, g_dialog_y + 180);	
		this.text.setColor(new cc.Color3B(0, 0, 0));

	},
	setText:function(text) {
		var result = '';
		var count = 0;
		for (var i in text) {
			if (i % g_dialogMaxLine == 0) {
				count ++;
				result += '\n';
			}
			result += text[i];
		}
		this.text.setPosition(g_gameLayer.eyeX + g_dialog_x + 120, g_dialog_y + 180 - count * 15);
		this.text.setString(result);
	},
	nextText: function() {
		g_gameLayer.audioEngine.playRoll();
		this.index++;
		if (this.index >= this.textArray.length) {
			this.close();
			return;
		}
		this.setText(this.textArray[this.index]);
	},
	show:function() {
		this.setPosition(g_gameLayer.eyeX + g_dialog_x, g_dialog_y);
		g_gameLayer.audioEngine.playRoll();
		if (this.isShowing) {
			return;
		}
		this.index = 0
		this.setText(this.textArray[this.index]);
		this.isShowing = true;
		g_gameLayer.addChild(this);
		g_gameLayer.addChild(this.text);
		g_gameLayer.showDialog(this);
	}, 
	close:function() {
		if (!this.isShowing) {
			return;
		}
		this.isShowing = false;
		g_gameLayer.removeChild(this);
		g_gameLayer.removeChild(this.text);
		g_gameLayer.closeDialog();
	},
	input:function(key) {
		switch (key) {
			case cc.KEY.space:
				this.nextText();
				break;
			case cc.KEY.y:
				this.yes();
				break;
			case cc.KEY.n:
				this.no();
				break;
			case cc.KEY.escape:
				this.close();
				break;
			default:
				;
		}
	},
	yes:function() {
		cc.log("yes");
	},
	no:function() {
		cc.log("no");
	}
});

var ReloadDialogSprite = DialogSprite.extend({
	ctor:function() {
		this._super("reload", new Array("确定重新进入关?(y/n)"));
	}, 
	yes:function() {
		g_currentScene.reload();
	},
	no:function() {
		this.close();
	}
});

// 一个dialog可以被show多次，不用每次都new一个
function DialogFactory () {
	this.all = new Array();
}

DialogFactory.prototype.getDialog = function(name, text) {
	if (name in this.all) {
		return this.all[name];
	}
	this.all[name] = new DialogSprite(name, text);
	return this.all[name];
};

DialogFactory.prototype.clear = function() {
	this.all = new Array();
};

var g_DialogFactory = new DialogFactory();