
var s_map = "res/maptest.tmx";
var s_springback0 = "res/map/spring_back0.png";
var s_springback1 = "res/map/spring_back1.png";
var s_springback2 = "res/map/spring_back2.png";

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
    {src:s_map},
    {src:s_springback0},
    {src:s_springback1},
    {src:s_springback2},

    //plist

    //fnt

    //tmx

    //bgm

    //effect
];

for (var i in standAnimation) {
    g_resources.push({src:standAnimation[i]});
}
for (var i in runAnimation) {
    g_resources.push({src:runAnimation[i]});
}