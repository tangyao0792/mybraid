/**
 * 保存世界的时间栈，用来实现回到过去
 * 有回到过去功能的关卡，除了各个item，不能使用remove/add child功能，因为没有实现这样的记录功能
 */
function Timestack() {
	this.stack = new Array();
}

/**
 *	把所有body的v、a、p，所有animate的time，item状态记录下来
 */
Timestack.prototype.pushWorld = function() {
	var movebody = new Array();
	for (var i in g_movebody) {
		var body = g_movebody[i];
		var b = {
			vx : body.vx,
			x : body.x,
			y : body.y
		};
		movebody[i] = b;
	}

/*	// 既能倒退时间，又能扭曲时间的关卡才需要
	// 暂时不设计这样的关卡
	var animate = new Array();
	for (var i in g_animate) {
		var a = g_animate[i];
		animate[i] = {
			mytime : a.mytime,
			lastWorldTime : a.lastWorldTime
		};
	}
*/

	var r = g_gameLayer.role;
	var role = {
		state : {stand : r.state.stand, runLeft : r.state.runLeft, runRight : r.state.runRight},
		animate : r.animate.state,
		/* role body state */
		x : r.body.x,
		y : r.body.y,
		vx : r.body.vx,
		vy : r.body.vy,
		ax : r.body.ax,
		ay : r.body.ay,
	};

	this.stack.push({
		role : role,
		movebody : movebody,
//		animate : animate,
		worldTime : g_worldTime
	})	
};

Timestack.prototype.popWorld = function() {
	if (this.stack.length == 0) {
		return;
	}
	var world = this.stack.pop();

	// load role
	g_gameLayer.role.body.setPosition(world.role.x, world.role.y);
	g_gameLayer.role.body.vx = world.role.vx;
	g_gameLayer.role.body.vy = world.role.vy;
	g_gameLayer.role.body.ax = world.role.ax;
	g_gameLayer.role.body.ay = world.role.ay;

	switch (world.role.animate) {
		case g_stand_state:
			g_gameLayer.role.setAnimate(g_gameLayer.role.standAnimate);
			break;
		case g_run_state:
			g_gameLayer.role.setAnimate(g_gameLayer.role.runAnimate);
			break;
		case g_jump_state:
			g_gameLayer.role.setAnimate(g_gameLayer.role.jumpAnimate);
			break;
	}

	g_gameLayer.role.state = world.role.state;


	// load automove body
	for (var i in world.movebody) {
		g_movebody[i].vx = world.movebody[i].vx;
		g_movebody[i].setPosition(world.movebody[i].x, world.movebody[i].y);
	}

	g_worldTime = world.worldTime;
};

g_timestack = new Timestack();
g_poping_world = false;

function startPoping() {
	g_poping_world = true;
}

function stopPoping() {
	g_poping_world = false;	
}