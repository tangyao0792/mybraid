var level1 = {
	map:s_spring_map,
	bg0:s_spring_bg0,
	bg1:s_spring_bg1,
	bg2:s_spring_bg2,
	bgAutoMove:true,
	rock:s_spring_rock,
	smallRock:s_spring_smallRock,
	moveRock:s_spring_aotuMoveRock,
	magic:s_spring_magic,
	magicGrey:s_spring_magic_grey,
	bgSound:s_spring_bgSound,
	npc:null
};

level1.npc = new Array();

level1.npc["old"] = { 
	src : s_npc_old, 
	callback:function() {
		var dialog = g_DialogFactory.getDialog("old", new Array("哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈", "hello world!", "ni hao", "bye bye"));
		dialog.show();
	}
};


var level2 = {
	map:s_molten_map,
	bg0:s_molten_bg0,
	bg1:s_molten_bg1,
	bg2:s_molten_bg2,
	bgAutoMove:false,
	rock:s_molten_rock,
	bgSound:s_spring_bgSound,
	magic:s_spring_magic,
	magicGrey:s_spring_magic_grey
};
