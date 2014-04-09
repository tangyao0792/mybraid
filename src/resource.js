
var s_spring_map = "res/map/spring/map.tmx";
var s_spring_bg0 = "res/map/spring/bg0.png";
var s_spring_bg1 = "res/map/spring/bg1.png";
var s_spring_bg2 = "res/map/spring/bg2.png";
var s_spring_rock = "res/map/spring/rock.png";

var s_molten_map = "res/map/molten/map.tmx";
var s_molten_bg0 = "res/map/molten/bg0.png";
var s_molten_bg1 = "res/map/molten/bg1.png";
var s_molten_bg2 = "res/map/molten/bg2.png";
var s_molten_rock = "res/map/molten/rock.png";

var s_c_stand0 = "res/stand0.png";

var standAnimation = new Array();
for (var i = 0; i < 8; i++) {
    standAnimation[i] = "res/stand" + i + ".png";
}

var runAnimation = new Array();
for (var i = 0; i < 4; i++) {
    runAnimation[i] = "res/run" + i + ".png";
}

var g_resources = [
    {src:s_spring_map},
    {src:s_spring_bg0},
    {src:s_spring_bg1},
    {src:s_spring_bg2},
    {src:s_spring_rock},

    {src:s_molten_map},
    {src:s_molten_bg0},
    {src:s_molten_bg1},
    {src:s_molten_bg2},
    {src:s_molten_rock}
];

for (var i in standAnimation) {
    g_resources.push({src:standAnimation[i]});
}
for (var i in runAnimation) {
    g_resources.push({src:runAnimation[i]});
}