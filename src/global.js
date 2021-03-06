g_magicBucket_y = 560;
g_magicBucket_x = 10;
g_magicBucket_step = 30;

g_pauseWorld = false;
g_worldTime = 0.0;	// 会被暂停
g_realTime = 0.0;	// 真正的时间，不会暂停
g_lastWorldTime = 0.0;

g_g = -1500;		// 重力加速度g
g_runVel = 130;
g_jumpVel = 540;
g_moveRockVel = 80;

g_screenWidth = 960;
g_screenHeight = 600;

g_dialog_x = 200;
g_dialog_y = 300;

g_gameLayer = null;
g_statusLayer = null;
g_currentScene = null;

g_sceneNum = 3;

g_ring_on = false;
g_ring_x = 0;
g_ring_y = 0;
g_ring_range = 150; // 扭曲时间辐射范围

// id -> object mapping
g_movebody_id = 0;
g_movebody = new Array();

g_animate_id = 0;
g_animate = new Array();

function debug() {
	for (var i in g_animate) {
		cc.log(g_animate[i].lastWorldTime);
	}
}

g_stand_state = 1;
g_run_state = 2;
g_jump_state = 3;