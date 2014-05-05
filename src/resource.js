var s_spring_map = "res/map/spring/map.tmx";
var s_spring_before_map = "res/map/spring/before.tmx";
var s_spring_bg0 = "res/map/spring/bg0.png";
var s_spring_bg1 = "res/map/spring/bg1.png";
var s_spring_bg2 = "res/map/spring/bg2.png";
var s_spring_rock = "res/map/spring/rock.png";
var s_spring_smallRock = "res/map/spring/smallRock.png";
var s_spring_aotuMoveRock = "res/map/spring/autoMoveRock.png";
var s_spring_bgSound = "res/map/spring/bgSound.mp3";

var s_spring_magic = new Array();
var s_spring_magic_grey = new Array();
for (var i = 1; i <= 9; i++) {
    s_spring_magic.push("res/item/magic/" + i + ".png");
}

for (var i = 1; i <= 9; i++) {
    s_spring_magic_grey.push("res/item/magic/" + i + "g.png");
}

var s_molten_map = "res/map/molten/map.tmx";
var s_molten_bg0 = "res/map/molten/bg0.png";
var s_molten_bg1 = "res/map/molten/bg1.png";
var s_molten_bg2 = "res/map/molten/bg2.png";
var s_molten_rock = "res/map/molten/rock.png";

var s_c_stand0 = "res/character/stand0.png";

var s_c_jump0 = "res/character/jump.png";

var standAnimation = new Array();
for (var i = 0; i < 8; i++) {
    standAnimation[i] = "res/character/stand" + i + ".png";
}

var runAnimation = new Array();
for (var i = 0; i < 4; i++) {
    runAnimation[i] = "res/character/run" + i + ".png";
}

s_jump = "res/sound/jump.mp3";
s_pick = "res/sound/pick.mp3";
s_move = "res/map/spring/move.mp3";
s_silence = "res/sound/silence.mp3";

s_dialog = "res/dialog/dialog.png";
s_roll = "res/sound/roll.mp3";
s_next = "res/sound/next.mp3";

s_range = "res/range.png";

var g_resources_level1 = [
    {type:'sound', src:s_jump},
    {type:'sound', src:s_pick},
    {type:'sound', src:s_move},
    {type:'sound', src:s_silence},
    {type:'sound', src:s_next},
    {src:s_c_jump0},
    {src:s_dialog},
    {src:s_range},

    {src:s_spring_before_map},
    {src:s_spring_map},
    {src:s_spring_bg0},
    {src:s_spring_bg1},
    {src:s_spring_bg2},
    {src:s_spring_rock},
    {src:s_spring_smallRock},
    {src:s_spring_aotuMoveRock},
    {type:'sound', src:s_spring_bgSound},

];
var g_resources_level2 = [
    {src:s_molten_map},
    {src:s_molten_bg0},
    {src:s_molten_bg1},
    {src:s_molten_bg2},
    {src:s_molten_rock},


];

g_resources = [];

for (var i in standAnimation) {
    g_resources.push({src:standAnimation[i]});
}
for (var i in runAnimation) {
    g_resources.push({src:runAnimation[i]});
}

for (var i in s_spring_magic) {
    g_resources.push({src:s_spring_magic[i]});
}
for (var i in s_spring_magic_grey) {
    g_resources.push({src:s_spring_magic_grey[i]});
}

/***************************************** npc time *****************************************/

s_npc_old = new Array();

for (var i = 0; i < 12; i++) {
    s_npc_old.push("res/npc/old/" + i + ".png");
}

s_npc_handsome = new Array();

for (var i = 0; i < 12; i++) {
    s_npc_handsome.push("res/npc/handsome/" + i + ".png");
}

s_npc_door = new Array();

for (var i = 0; i < 5; i++) {
    s_npc_door.push("res/npc/door/" + i + ".png");
}

s_npc_floatman = new Array();

for (var i = 0; i < 11; i++) {
    s_npc_floatman.push("res/npc/floatman/" + i + ".png");
}

s_npc_ring = new Array();

for (var i = 0; i < 4; i++) {
    s_npc_ring.push("res/npc/ring/" + i + ".png");
}

// NPC
for (var i in s_npc_old) {
    g_resources.push({src : s_npc_old[i]});
}

for (var i in s_npc_handsome) {
    g_resources.push({src : s_npc_handsome[i]});
}

for (var i in s_npc_door) {
    g_resources.push({src : s_npc_door[i]});
}

for (var i in s_npc_floatman) {
    g_resources.push({src : s_npc_floatman[i]});
}

for (var i in s_npc_ring) {
    g_resources.push({src : s_npc_ring[i]});
}