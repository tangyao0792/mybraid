/********************************* 第一关入门 *********************************/
var level0 = {
	id:0,
	map:s_spring_before_map,
	bg0:s_spring_bg0,
	bg1:s_spring_bg1,
	bg2:s_spring_bg2,
	bgAutoMove:true,
	rock:s_spring_rock,
	smallRock:s_spring_smallRock,
	moveRock:s_spring_aotuMoveRock,
	magic:s_spring_magic,
	magicGrey:s_spring_magic_grey,
	magicNum:4,
	bgSound:s_spring_bgSound,
	resource:g_resources_level1
};



/********************************* 第一关 *********************************/
var level1 = {
	id:1,
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
	magicNum:9,
	bgSound:s_spring_bgSound,
	resource:g_resources_level1
};


var level2 = {
	id:2,
	map:s_molten_map,
	bg0:s_molten_bg0,
	bg1:s_molten_bg1,
	bg2:s_molten_bg2,
	bgAutoMove:false,
	rock:s_molten_rock,
	bgSound:s_spring_bgSound,
	magic:s_spring_magic,
	magicGrey:s_spring_magic_grey,
	resource:g_resources_level2
};


var g_Level = new Array();
g_Level[0] = level0;
g_Level[1] = level1;
g_Level[2] = level2;
