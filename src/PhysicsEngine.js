// 一个点在另一个box内
function isPointInBox(p, leftDown, rightTop) {
	if (leftDown.x <= p.x && leftDown.y <= p.y && p.x <= rightTop.x && p.y <= rightTop.y) {
		return true;
	}
	return false;
}

// 判断两个矩形是否相交
function isBodyCollision(b1, b2) {
	// 判断b1的四个点是否在b2中
	var points = new Array(b1.leftDown, b1.rightTop);
	points.push({x : b1.leftDown.x, y : b1.rightTop.y});	// 左上
	points.push({x : b1.rightTop.x, y : b1.leftDown.y});	// 右下
	for (i in points) {
		var p = points[i];
		if (isPointInBox(p, b2.leftDown, b2. rightTop)) {
			return true;
		}
	}

	points = new Array(b2.leftDown, b2.rightTop);
	points.push({x : b2.leftDown.x, y : b2.rightTop.y});	// 左上
	points.push({x : b2.rightTop.x, y : b2.leftDown.y});	// 右下
	for (i in points) {
		var p = points[i];
		if (isPointInBox(p, b1.leftDown, b1. rightTop)) {
			return true;
		}
	}

	// 没有点在另一个矩形内，但是相交，十字形
	if (b2.leftDown.x <= b1.leftDown.x && b1.leftDown.x <= b2.rightTop.x &&
		b2.leftDown.x <= b1.rightTop.x && b1.rightTop.x <= b2.rightTop.x &&
		b1.leftDown.y <= b2.leftDown.y && b2.rightTop.y <= b1.rightTop.y) {
		// b1竖直b2水平
		return true;
	}
	if (b1.leftDown.x <= b2.leftDown.x && b2.leftDown.x <= b1.rightTop.x &&
		b1.leftDown.x <= b2.rightTop.x && b2.rightTop.x <= b1.rightTop.x &&
		b2.leftDown.y <= b1.leftDown.y && b1.rightTop.y <= b2.rightTop.y) {
		// b2竖直b1水平
		return true;
	}

	// 一个矩形完全在另一个矩形内
	if (b1.leftDown.x <= b2.leftDown.x && b1.leftDown.y <= b2.leftDown.y &&
		b2.rightTop.x <= b1.rightTop.x && b2.rightTop.y <= b1.rightTop.y) {
		// b2在b1内
		return true;
	}
	if (b2.leftDown.x <= b1.leftDown.x && b2.leftDown.y <= b1.leftDown.y &&
		b1.rightTop.x <= b2.rightTop.x && b1.rightTop.y <= b2.rightTop.y) {
		// b2在b1内
		return true;
	}
	return false;
}

/**
 * @param sprite: cc.sprite
 * @param collisionCallback
 * @param space
 * @param contentSize {width:xxx, height:yyy}
 * @param p {x:xxx, y:yyy}
 */
function Body(sprite, collisionCallback, space, contentSize, p, isStatic, isNpc) {
	this.sprite = sprite;
	this.collisionCallback = collisionCallback;
	this.space = space;
	this.isStatic = isStatic;
	this.baseVx = 0;		// 地面移动速度
	this.vx = 0;
	this.vy = 0;
	this.ax = 0;
	this.ay = 0;
	this.x = p.x;
	this.y = p.y;
	this.collisionFlag = {left : false, right : false, top : false, down : false};
	this.leftDown = {x : this.x, y : this.y};
	this.rightTop = {x : contentSize.width + this.x, y : contentSize.height + this.y};
	this.width = contentSize.width;
	this.height = contentSize.height;
	this.space.addBody(this);
	this.setPosition(this.x, this.y);
	this.isNpc = isNpc;
	if (isNpc == null) {
		this.isNpc = false;
	}
	// DEBUG
	this.debug = false;
}

Body.prototype.setPosition = function(x, y) {
	this.x = x;
	this.y = y;
	this.leftDown.x = this.x;
	this.leftDown.y = this.y;
	this.rightTop.x = this.x + this.width;
	this.rightTop.y = this.y + this.height;
	this.sprite.setPosition(this.x, this.y);
};

Body.prototype.update = function(dt) {
	if (!g_pauseWorld) {
		// 更新速度
		this.vx += this.ax * dt;
		this.vy += this.ay * dt;

		// 算位置
		var dx = dt * (this.vx + this.baseVx);
		var realDx = this.tryMoveX(dx);

		var dy = dt * this.vy;
		var realDy = this.tryMoveY(dy);

	}

	this.updateCollision();
	if (this.collisionFlag.down) {
		this.vy = 0;
	}
	// 头撞墙之后要立刻下降
	if (this.collisionFlag.top) {
		this.vy = g_g * dt;
	}

	//if (this.debug)
	//	cc.log(isBodyCollision({leftDown:{x:59,y:74},rightTop:{x:149,y:113}}, this));

};

Body.prototype.updateCollision = function() {
	this.collisionFlag.left = false;
	this.collisionFlag.down = false;
	this.collisionFlag.right = false;
	this.collisionFlag.top = false;
	for (var i in this.space.bodies) {
		var body = this.space.bodies[i];
		var collision = false;
		if (body == this)
			continue;

		if (body.isNpc) {
			continue;
		}

		var box = {
					leftDown : {x : this.leftDown.x, y : this.leftDown.y - 1}, 
					rightTop : {x : this.rightTop.x, y : this.rightTop.y}
				};
		if (isBodyCollision(box, body)) {
			this.collisionFlag.down = true;
			collision = true;
		}

		box = {
					leftDown : {x : this.leftDown.x - 1, y : this.leftDown.y}, 
					rightTop : {x : this.rightTop.x, y : this.rightTop.y}
				};

		if (isBodyCollision(box, body)) {
			this.collisionFlag.left = true;
			collision = true;
		}

		box = {
					leftDown : {x : this.leftDown.x, y : this.leftDown.y}, 
					rightTop : {x : this.rightTop.x, y : this.rightTop.y + 1}
				};

		if (isBodyCollision(box, body)) {
			this.collisionFlag.top = true;
			collision = true;
		}

		box = {
					leftDown : {x : this.leftDown.x, y : this.leftDown.y}, 
					rightTop : {x : this.rightTop.x + 1, y : this.rightTop.y}
				};

		if (isBodyCollision(box, body)) {
			this.collisionFlag.right = true;
			collision = true;
		}
		// 碰撞回调函数
		if (collision && this.collisionCallback != null) {
			this.collisionCallback(this, body);
		}
	}
};

Body.prototype.tryMoveX = function(dx) {
	dx = parseInt(dx);
	if (dx == 0) {
		return;
	}
	var step = 1;
	if (dx < 0) {
		step = -1;
	}

	if (this.space.hasBoder) {
		if (dx < 0) {
			var tmp = parseInt(this.space.minX - this.leftDown.x);
			if (dx < tmp) {
				dx = tmp;
			}
		} else {
			var tmp = parseInt(this.space.maxX - this.rightTop.x);
			if (dx > tmp) {
				dx = tmp;
			}
		}
	}
	var move = 0;
	while (move != dx) {
		move += step;
		var box = {
			leftDown : {x : this.leftDown.x + move, y : this.leftDown.y}, 
			rightTop : {x : this.rightTop.x + move, y : this.rightTop.y}
		};

		var foundCollision = false;
		for (b in this.space.bodies) {
			var body = this.space.bodies[b];
			if (body == this)
				continue;
			if (isBodyCollision(box, body)) {
				if (body.isNpc) {
					continue;
				}
				foundCollision = true;
				break;
			}
		}
		if (foundCollision) {
			move -= step;
			break;
		}
	}

	this.setPosition(this.x + move, this.y);
	return move;
};

Body.prototype.tryMoveY = function(dy) {
	dy = parseInt(dy);
	if (dy == 0) {
		return;
	}
	var step = 1;
	if (dy < 0) {
		step = -1;
	}

	if (this.space.hasBoder) {
		if (dy < 0) {
			var tmp = parseInt(this.space.minY - this.leftDown.y);
			if (dy < tmp) {
				dy = tmp;
			}
		} else {
			var tmp = parseInt(this.space.maxY - this.rightTop.y);
			if (dy > tmp) {
				dy = tmp;
			}
		}
	}
	var move = 0;
	// TODO 把dx变成int
	while (move != dy) {
		move += step;
		var box = {
			leftDown : {x : this.leftDown.x, y : this.leftDown.y + move}, 
			rightTop : {x : this.rightTop.x, y : this.rightTop.y + move}
		};

		var foundCollision = false;
		for (b in this.space.bodies) {
			var body = this.space.bodies[b];
			if (body == this)
				continue;
			if (isBodyCollision(box, body)) {
				if (body.isNpc) {
					continue;
				}
				foundCollision = true;
				break;
			}
		}
		if (foundCollision) {
			move -= step;
			break;
		}
	}
	this.setPosition(this.x, this.y + move);
	return move;
};

/**
 * 自动移动的rock，timeType:0 正常，1不受暂停影响， 2暂停的时候才会动
 */
function MoveRockBody(sprite, space, toLeft, toRight, contentSize, p, vx, timeType) {
	this.sprite = sprite;
	this.space = space;
	this.toLeft = - parseInt(toLeft) + p.x;
	this.toRight = parseInt(toRight) + p.x;
	this.v = vx;
	this.vx = vx;
	this.x = p.x;
	this.y = p.y;
	this.timeType = timeType;
	this.leftDown = {x : this.x, y : this.y};
	this.rightTop = {x : contentSize.width + this.x, y : contentSize.height + this.y};
	this.width = contentSize.width;
	this.height = contentSize.height;
	this.space.addBody(this);
	this.setPosition(this.x, this.y);
	this.isMoving = true;
	this.hasMoved = false;
}

MoveRockBody.prototype.update = function(dt) {
	this.isMoving = false;
	this.isMoving = false;
	if (this.timeType == 0) {
		if (g_pauseWorld) {
			return;
		}
	} else if (this.timeType == 1) {
		// pass
	} else if (this.timeType == 2) {
		if (!g_pauseWorld) {
			return;
		}
	}
	this.isMoving = true;
	var dx = dt * this.vx;
	var realDx = this.tryMoveX(dx);
	if (realDx != 0) {
		this.hasMoved = true;
	} else {
		this.hasMoved = false;
	}
	if (this.x >= this.toRight) {
		this.vx = -this.v;
	}
	if (this.x <= this.toLeft) {
		this.vx = this.v;
	}
};

MoveRockBody.prototype.tryMoveX = Body.prototype.tryMoveX;

MoveRockBody.prototype.setPosition = Body.prototype.setPosition;


// TODO static body 

/**
 * body容器
 *
 */
function Space() {
	this.bodies = new Array();
	this.hasBoder = false;
	this.toRemove = new Array();
	this.npc = new Array();
}

Space.prototype.setBorder = function(mapWidth, mapHeight) {
	this.hasBoder = true;
	this.minX = 0;
	this.minY = 0;
	this.maxX = mapWidth;
	this.maxY = mapHeight;
};
Space.prototype.update = function(dt) {
	for (var i in this.toRemove) {
		var body = this.toRemove[i];
		this.bodies = this.bodies.filter(function(x) {
			return x != body;
		});
	}
	this.toRemove = new Array();

	for (i in this.bodies) {
		var body = this.bodies[i];
		if (!body.isStatic && !body.isItem)		// 效率原因
			body.update(dt);
	}
};

Space.prototype.addBody = function(body) {
	this.bodies.push(body);
};

Space.prototype.addNPC = function(body) {
	this.npc.push(body);
};

// 为了保证bodies的顺序，惰性删除
Space.prototype.removeBody = function(body) {
	this.toRemove.push(body);
}

Space.prototype.testNPCCollision = function(body) {
	var found = false;
	for (var i in this.npc) {
		var npc = this.npc[i];
		if (isBodyCollision(body, npc)) {
			if (npc.collisionCallback != null) {
				npc.collisionCallback();
				found = true;
			}
		}
	}
	return found;
};