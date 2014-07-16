function class_Enemy(sx,sy,dx,dy,type)
{
	playMap = $("#playBox");
	MapWidth = playMap.css("width");
	MapHeight = playMap.css("height");
	this.startX = sx;
	this.startY = sy;
	this.DirectX = dx;
	this.DirectY = dy;
	this.PosX = sx;
	this.PosY = sy;
	
	this.life = 100;
	this.moveLength = 1;
	if (currentLevel <= 2)
		type = 1;
	if (currentLevel <= 6 && type == 3)
		type = 1;
	if (currentLevel > 6)
		this.life = 150;
	if (currentLevel > 15)
		this.life = 200;
	if (currentLevel > 20)
		this.life = 250;
	this.Type = type;          //enemy类型
	if (type == 3)
		this.life *= 2;
	this.enemyState = 1;
	this.count = 1;
	this.faceto = 1;
	if (type == 1)
		this.picNum = 8;
	if (type == 2)
		this.picNum = 8;
	if (type == 3)
		this.picNum = 3;
	this.getPosX = function(){
		return this.PosX;
	}
	this.getPosY = function(){
		return this.PosY;
	}
	this.setPos = function(x,y){
		this.PosX = x;
		this.PosY = y;
	}
	this.isKilled = function(){
		if (this.life <= 0)
			return true;
		else
			return false;
	}
	this.isOut = function(){
		if (this.PosX < 0 || this.PosX > parseInt(MapWidth) || this.PosY < 0 || this.PosY > parseInt(MapHeight))
		{
			return true;
		}
		else
			return false;
	}
	this.move = function(x, y){
		this.setPos(x, y);
	}
}

//bullet 构造函数
//sx,sy  初始位置
//dx,dy  运行方向
function class_Bullet(sx,sy,dx,dy,id,type){
	playMap = $("#playBox");
	MapWidth = playMap.css("width");
	MapHeight = playMap.css("height");
	this.startX = sx;
	this.startY = sy;
	this.DirectX = dx;
	this.DirectY = dy;
	this.PosX = sx;
	this.PosY = sy;
	this.Id = id;
	this.moveLength = 10;
	this.count = 1;
	if (type == 2)
		this.moveLength = 5;
	this.Type = type;
	this.bulletState = 1;
	this.getPosX = function(){
		return this.PosX;
	}
	this.getPosY = function(){
		return this.PosY;
	}
	this.setPos = function(x,y){
		this.PosX = x;
		this.PosY = y;
	}
	this.isOut = function(){
		if (this.PosX < 0 || this.PosX > parseInt(MapWidth) || this.PosY < 0 || this.PosY > parseInt(MapHeight)){
			return true;
		}
		else
			return false;
	}
	this.move = function(x, y){
		this.setPos(x, y);
	}
}


function class_player()
{
	//"use strict";
	imgID = 1;
	playMap = $("#playBox");
	MapWidth = playMap.css("width");
	MapHeight = playMap.css("height");
	this.bulletType1 = false;//0是普通子弹，1是爆裂弹，2是反弹爆裂弹,3是散弹
	this.bulletType2 = false;
	this.bulletType3 = false;
	this.MapWidth = parseInt(MapWidth);
	this.MapHeight = parseInt(MapHeight);
	this.positionMinx = Math.random() * parseInt(MapWidth);
	this.positionMiny = Math.random() * parseInt(MapHeight);
	this.positionMaxx = this.positionMinx + 65;
	this.positionMaxy = this.positionMiny + 75;
	this.moveLength = 6;
	this.harm = 1;//当前子弹的伤害
	this.shoot = function(){
								if(MouseClick == true)
								{
								
								//TO DO:add a bullut
								}
							};
	this.die = function(positionMinx,positionMiny,positionMaxx,positionMaxy){
								if(((positionMinx >= this.positionMinx && positionMinx <= this.positionMaxx)||(positionMaxx >= this.positionMinx && positionMaxx <= this.positionMaxx))&&((positionMaxy >= this.positionMiny && positionMaxy <= this.positionMaxy)||(positionMiny >= this.positionMiny && positionMiny <= this.positionMaxy)))
									{
										//上面那行用来判断两个矩形是否相交，用\换行失败，所以写在一行了
										return true;
									}
									else return false;
							};
	this.moveLeft = function(){
									if( LeftArrow == true)
									{
										//LeftArrow = false;
										this.positionMinx -= this.moveLength;
										this.positionMaxx -= this.moveLength;
										if(this.positionMinx < 0){
											this.positionMinx = 0;
											this.positionMaxx = 65;
										}
									}
							};
	this.moveRight = function(){
									if( RightArrow == true)
									{
										//RightArrow = false;
										this.positionMinx += this.moveLength;
										this.positionMaxx += this.moveLength;
										if(this.positionMaxx > this.MapWidth){
											this.positionMaxx = this.MapWidth;
											this.positionMinx = this.MapWidth - 65;
										}
									}
							};
	this.moveUp = function(){
									if( UpArrow == true)
									{
										//UpArrow = false;
										this.positionMiny -= this.moveLength;
										this.positionMaxy -= this.moveLength;
										if(this.positionMiny < 0){
											this.positionMiny = 0;
											this.positionMaxy = 75;
										}
									}
							};															
	this.moveDown = function(){
									if( DownArrow == true)
									{
										//DownArrow = false;
										this.positionMiny += this.moveLength;
										this.positionMaxy += this.moveLength;
										if(this.positionMaxy > this.MapHeight){
											this.positionMaxy = this.MapHeight;
											this.positionMiny = this.MapHeight - 75;
										}
									}
									
							};
}

function player_death_animation(playerID,x,y) {
	function death_animation() {
		if (imgID > 1) {
		$('#player' + playerID + '_death' + (imgID - 1))[0].style.display = "none";
		}
		if(imgID >= 7 )
		{
			delete PlayerArr[ele];
			clearInterval(check_death_animation);
			return;
		}
		var tempAng;
		tempAng = angle;
		if(mouseposX < x + 65 / 2)
		{
			$("#player" + playerID + "_death" + imgID).css('transform', 'rotateY(' + 180 + 'deg) rotate(' + -tempAng + 'deg)');
		}
		else{$("#player" + playerID + "_death" + imgID).css('transform', 'rotate(' + tempAng + 'deg)');}
		$('#player' + playerID + '_death' + imgID)[0].style.left = x - 65 / 2 + "px";
		$('#player' + playerID + '_death' + imgID)[0].style.top = y - 75 / 2 + "px";
		$('#player' + playerID + '_death' + imgID)[0].style.display = "block";
		imgID ++;
	}
	check_death_animation = setInterval(death_animation,100);
}
function CheckKey() {
	if(playDeath){return;}//人物死亡
	var middleX = (player.positionMinx + player.positionMaxx) / 2;
	var middleY = (player.positionMiny + player.positionMaxy) / 2;
	var changeToState = 0;
	if (LeftArrow) player.moveLeft();
	if (RightArrow) player.moveRight();
	if (UpArrow) player.moveUp();
	if (DownArrow) player.moveDown();
	mouseMove();
	if (false) //按键冲突 LeftArrow && RightArrow) || (UpArrow && DownArrow)
	{
		// LeftArrow = false;
		// RightArrow = false;
		// UpArrow = false;
		// DownArrow = false;
	} else {
		if (LeftArrow || RightArrow || UpArrow || DownArrow) {
			if (mouseposX < middleX) { //左边模式
				LeftRightModel = 0;
				LeftImgcount = (LeftImgcount + 1) % 3;
				RightImgcount = 0;
				if (LeftImgcount == 0) {
					changeToState = 4;
				} else if (LeftImgcount == 1) {
					changeToState = 5;
				} else {
					changeToState = 6;
				}
			} else { //右边模式
				LeftImgcount = 0;
				LeftRightModel = 1;
				RightImgcount = (RightImgcount + 1) % 4;
				changeToState = RightImgcount;
			}
			$("#player0_" + currentState)[0].style.display = "none";
			$('#player0_' + changeToState)[0].style.left = player.positionMinx + "px";
			$('#player0_' + changeToState)[0].style.top = player.positionMiny + "px";
			$("#player0_" + changeToState)[0].style.display = "block";
			currentState = changeToState;
			$("#player0_" + currentState).css('transform', 'rotate(' + angle + 'deg)');

	}
		//换图片，实现过渡效果
	}
	$('#player' + 0 + '_' + currentState)[0].style.left = player.positionMinx + "px";
	$('#player' + 0 + '_' + currentState)[0].style.top = player.positionMiny + "px";
	$("#player0_" + currentState).css('transform', 'rotate(' + angle + 'deg)');


}
function mouseMove(ev)
{
	if(playDeath){return;}
	if(ev)
	{
		mouseposX = ev.pageX-50;
   		mouseposY = ev.pageY-30;
   		} 
	var middleX = (player.positionMinx + player.positionMaxx) / 2;
	var middleY = (player.positionMiny + player.positionMaxy) / 2;
   	var tanangle = (middleY - mouseposY) / (middleX - mouseposX);
   	angle = Math.atan(tanangle);
   	if(mouseposX <= middleX ){//左边模式

   						if(LeftRightModel == 1){
   						LeftRightModel = 0;
  						LeftImgcount = 0;
  						RightImgcount = 0;
  						if(ev){
  						$("#player0_"+currentState)[0].style.display = "none";
  						$('#player0_4')[0].style.left = player.positionMinx + "px";
  						$('#player0_4')[0].style.top = player.positionMiny + "px";
  						$("#player0_4")[0].style.display = "block";
  						currentState = 4; 
  							}
  						}
  					}
  	else if(mouseposX > middleX ){
  		angle = Math.atan(tanangle);
		if (LeftRightModel == 0) {
			RightImgcount = 0;
			LeftRightModel = 1;
			if(ev){
			$("#player0_" + currentState)[0].style.display = "none";
			$('#player0_0')[0].style.left = player.positionMinx + "px";
			$('#player0_0')[0].style.top = player.positionMiny + "px";
			$("#player0_0")[0].style.display = "block";
			currentState = 0;
			}
		}
  	}
  		angle = angle * 180 / 3.14159;
  		if(ev){
  		$("#player0_"+currentState).css( 'transform', 'rotate('+angle+'deg)' );
  		}
}
//判断鼠标是否被按下
function MouseDown(ev){
	//var e = ev || window.event;             
    mouseposX = ev.pageX-50;
    mouseposY = ev.pageY-50; 
	MouseClick = true;
	singleClick = true;
}
function MouseUp(){
	MouseClick = false;
}
window.onkeydown = function (e)
{
	if(window.event) // IE
	{
		keynum = e.keyCode
	}
		else if(e.which) // Netscape/Firefox/Opera
	{
		keynum = e.which
	}	
	if(playDeath)
	{
		if(keynum == 32 && (!ResetGameState))
		{
			$("#hint").fadeOut('slow', function(){
				$("#mainWrapper").fadeIn('slow');
			});
			// setTimeout("ResetGameState = true;",1000);
			ResetGameState = true;
			testflag = true;
		}
		return;
	}

	if (keynum == 65) {
		LeftArrow = true;
		//player.moveLeft();
	} else if (keynum == 87) {
		UpArrow = true;
		//	player.moveUp();
	} else if (keynum == 68) {
		RightArrow = true;
		//	player.moveRight();
	} else if (keynum == 83) {
		DownArrow = true;
		//player.moveDown();
	}
	else if(keynum == 70){
		if(LevelShow)
		{
			$("#levelBox").fadeOut(1000);
			LevelShow = false;
		}
		else {
			$('#levelBox').fadeIn(1000);
			LevelShow = true;
		}
	}
	if(currentLevel >= 17){
		if(keynum == 82)
		{
			player.bulletType2 = !player.bulletType2;
		}
	}
	if(currentLevel >= 11)
	{
		if(keynum == 69)
		{
			player.bulletType1 = !player.bulletType1;
		}
	}
	if(currentLevel >= 6)
	{
		if(keynum == 81)
		{
			player.bulletType3 = !player.bulletType3;
		}
	}
}

window.onkeyup = function(e){
	var keynum;
	if(window.event) // IE
	{
	keynum = e.keyCode
	}
	else if(e.which) // Netscape/Firefox/Opera
	{
	keynum1 = e.which
	}
		if(keynum == 65){
		LeftArrow = false;
		//player.moveLeft();
	}
	else if(keynum == 87){
		UpArrow = false;
	//	player.moveUp();
	}
	else if(keynum == 68){
		RightArrow = false;
	//	player.moveRight();
	}
	else if(keynum == 83){
		DownArrow = false;
		//player.moveDown();
	}
}

//产生0~top的伪随机数
function RandomInteger(top){
	return Math.round(Math.random()*top);
}

function levelSystem(){
	var text;
	if(killEnemyCount >= currentLevel)
	{
		killEnemyCount -= currentLevel;
		currentLevel++;
		LevelUpRemainder = true;
	}
	if(currentLevel >= 16){
		text = "Level："+currentLevel+"      "+"Rest_Enemies:"+(currentLevel - killEnemyCount);
	}
	else if(currentLevel >= 11){
		text = "Level："+currentLevel+"      "+"Rest_Enemies:"+(currentLevel - killEnemyCount);
	}
	else if(currentLevel >= 6){
			text = "Level："+currentLevel+"      "+"Rest_Enemies:"+(currentLevel - killEnemyCount);
	}
	else{
			text = "Level："+currentLevel+"      "+"Rest_Enemies:"+(currentLevel - killEnemyCount);
	}
	if(currentLevel == 6 && LevelUpRemainder)
	{
		LevelUpOnShow = true;
		text = "You get new weapon! Press Q to Open/Close";
		drawLevelBox(text);
		$('#levelBox').fadeIn(1000);
		LevelShow = true;
		setTimeout(function() {
			//$('#levelBox').fadeOut(1000);
			LevelShow = false;
			LevelUpOnShow = false;
		},5000);
		player.bulletType3 = true;
		LevelUpRemainder = false;
	} 
	else if (currentLevel == 11 && LevelUpRemainder) {
		LevelUpOnShow =true;
		text = "You get new weapon! Press E to Open/Close";
		drawLevelBox(text);
		$('#levelBox').fadeIn(1000);
		LevelShow = true;
		setTimeout(function() {
			//$('#levelBox').fadeOut(1000);
			LevelShow = false;
			LevelUpOnShow = false;
		},5000);
		player.bulletType1 = true;
		LevelUpRemainder = false;
	} 
	else if (currentLevel == 16 && LevelUpRemainder) {
		LevelUpOnShow = true;
		text = "You get new weapon! Press R to Open/Close";
		drawLevelBox(text);
		$('#levelBox').fadeIn(1000);
		LevelShow = true;
		setTimeout(function() {
			//$('#levelBox').fadeOut(1000);
			LevelShow = false;
			LevelUpOnShow = false;
		},5000);
		LevelUpRemainder = false;
		player.bulletType2 = true;
	}
	else if(!LevelUpOnShow){
	drawLevelBox(text);
	}
}

function drawLevelBox(text)
{

	$('#levelBox')[0].innerHTML = text;
}

function Play(){
	var d = 10;
	var h = 10;
	playMap = $("#playBox"); //游戏地图
	MapWidth = parseInt(playMap.css("width"));
	MapHeight = parseInt(playMap.css("height"));
	var PlayerArr = [];//玩家数组，包括上轮挂掉的
	PlayerTotal = 0;//玩家总数
	BulletArr = [];  //子弹数组
	BulletTotal = 0; //子弹总数
	EnemyArr = [];  //敌人数组
	EnemyTotal = 0; //敌人总数
	LeftRightModel = 1;//0表示是左边模式，1是右边模式
	intervalTime = 200; //间隔时间
	LeftImgcount = 0;
	RightImgcount = 0;
	currentState = 0;//记录当前切换到第几张图了
	$('#playBox').append($('<div id = "enemyBox"></div>'));
	$('#playBox').append($('<div id = "bulletBox"></div>'));

	//设定：
	//开始：产生 player
	function playerGenerate(){
		var tempPlayer;
		//产生当前的player
		player = new class_player();
		PlayerArr.push(player);
		for(var i = 0; i <7;i++){
			if(!i){
				$('#playBox').append($('<img id = "player'+PlayerTotal+'_'+i+'" style="position:absolute;display:none" src = "img/doom_guy.png">'));
				$('#player'+PlayerTotal+'_'+i)[0].style.left = PlayerArr[PlayerTotal].positionMinx + "px";
  				$('#player'+PlayerTotal+'_'+i)[0].style.top = PlayerArr[PlayerTotal].positionMiny + "px";
			}
			else{
			$('#playBox').append($('<img id = "player'+PlayerTotal+'_'+i+'" style="position:absolute;display:none" src = "img/doom_guy_frame'+i+'.png">'));
			$('#player'+PlayerTotal+'_'+i)[0].style.left = PlayerArr[PlayerTotal].positionMinx + "px";
  			$('#player'+PlayerTotal+'_'+i)[0].style.top = PlayerArr[PlayerTotal].positionMiny + "px";
  			$('#playBox').append($('<img id = "player'+PlayerTotal+'_death'+i+'" style="position:absolute;display:none" src = "img/doom_death_frame'+i+'.png">'));
			$('#player'+PlayerTotal+'_death'+i)[0].style.left = PlayerArr[PlayerTotal].positionMinx + "px";
  			$('#player'+PlayerTotal+'_death'+i)[0].style.top = PlayerArr[PlayerTotal].positionMiny + "px";
  			}
  		}
  		PlayerTotal++;
	}
	playerGenerate();//产生两个player
	$('#player'+0+'_'+0)[0].style.display = "block";

	//每1秒：产生 enemy
	var enemyGenerate = function(){
		if(ResetGameState){return;}
		//clearInterval(ReEnemyGenerate);
		mapWidth = parseInt(MapWidth);
		mapHeight = parseInt(MapHeight);
		sx = RandomInteger(mapWidth);
		sy = RandomInteger(mapHeight);
		model = RandomInteger(100);
		switch (model % 4)
		{
			case 0:{
				sx = 0;
				ex = mapWidth;
				ey = mapHeight - sy;
				break;
			}
			case 1:{
				sy = 0;
				ey = mapHeight;
				ex = mapWidth - sx;
				break;
			}
			case 2:{
				sx = mapWidth;
				ex = 0;
				ey = mapHeight - sy;
				break;
			}
			case 3:{
				sy = mapHeight;
				ey = 0;
				ex = mapWidth - sx;
				break;
			}
		}
		model = RandomInteger(100);
		switch (model % 3)
		{
			case 0:{
				type = 1;
				break;
			}
			case 1:{
				type = 2;
				break;
			}
			case 2:{
				type = 3;
				break;
			}
		}
		var DX = ex - sx;
		var DY = ey - sy;
		temp_dx = DX /Math.sqrt((DX*DX)+(DY*DY));
		temp_dy = DY /Math.sqrt((DX*DX)+(DY*DY));
		dx = temp_dx;
		dy = temp_dy;
		var e = new class_Enemy(sx,sy,dx,dy,type);
		EnemyArr.push(e);
		type = e.Type;
		//确定图片朝向
		if (type == 1)
		{
			if (sx == 0 || (sy == 0 && sx < ex) || (ey == 0 && sx < ex))
				e.faceto = 1;
			else
				e.faceto = 0;
		}
		else
		{
			if (PlayerArr[0].positionMinx > sx)
				e.faceto = 1;
			else
				e.faceto = 0;
		}
		rotate = Math.atan(dy/dx);
		rotate = rotate * 180 / 3.14159;
		for (var i = 1; i <= e.picNum*2; i++)
		{
			var tem = i;
			var picName = "";
			if (type == 1)
				picName = "'img/small_moving_frame_0";
			if (type == 2)
				picName = "'img/small_homing_frame_0";
			if (type == 3)
				picName = "'img/big_bad_frame0";
			$('#enemyBox').append("<img style='position:absolute;' src="+picName+""+tem+".png' class='enemy' id='enemy"+type+"_"+EnemyTotal+"_"+i+"'></img>");
			if (i == 1 && e.faceto == 0 || i == e.picNum+1 && e.faceto == 1)
				$("#enemy"+type+"_"+EnemyTotal+"_"+i).css({display:"block"});
			else
				$("#enemy"+type+"_"+EnemyTotal+"_"+i).css({display:"none"});
			$("#enemy"+type+"_"+EnemyTotal+"_"+i)[0].style.left = sx+"px";
			$("#enemy"+type+"_"+EnemyTotal+"_"+i)[0].style.top = sy+"px";
			$("#enemy"+type+"_"+EnemyTotal+"_"+i).css('transform', 'rotate('+rotate+'deg)' );
		}
		for (var i = 1; i <= 6; i++)
		{
			$('#enemyBox').append($("<img style='position:absolute;display:none' src='img/doom_splat_frame"+i+".png' id='boom"+EnemyTotal+"_"+i+"'></img>"));
			$('#boom'+EnemyTotal+"_"+i)[0].style.display = 'none';
		}
		temp = $("<img style='position:absolute;' src='img/small_moving_frame1.png' class='enemy' id='enemy"+EnemyTotal+"'></img>");
		$('#enemyBox').append(temp);
		$('#enemy'+EnemyTotal)[0].style.left = sx+"px";
		$('#enemy'+EnemyTotal)[0].style.top = sy+"px";
		$('#enemy'+EnemyTotal)[0].style.display = 'none';
		$('#enemy'+EnemyTotal).css('transform', 'rotate('+rotate+'deg)' );
		EnemyTotal++;
	}
	var MultipleGenerate = function(){
		if(ResetGameState){return;}
		for (var i = 1; i <= currentLevel; i++)
		{
			enemyGenerate();
			if (i > currentLevel/12)
				break;
		}
	}
	ReEnemyGenerate = setInterval(MultipleGenerate, intervalTime * 5);

	//产生子弹
	//sx,sy初始位置
	//dx,dy运行方向
	var bulletGenerate = function(sx,sy,dx,dy,type){
		if(ResetGameState){return;}
		var b = new class_Bullet(sx,sy,dx,dy, BulletTotal,type);
		BulletArr.push(b);
		if (type == 1)
		{
			temp = "<img style='position:absolute;' src = 'img/old_guy_bullet.png'class='bullet' id='bullet"+BulletTotal+"'></img>";
			$('#bulletBox').append(temp);
			$('#bullet'+BulletTotal)[0].style.left = sx+"px";
			$('#bullet'+BulletTotal)[0].style.top = sy+"px";
			var degree = Math.acos(dx);
			if(dy <= 0){
				degree = -degree;
			}
			degree = degree * 180 / 3.14159;
			$("#bullet"+BulletTotal).css( 'transform', 'rotate('+degree+'deg)' );
		}
		else
		{
			rotate = Math.atan(dy/dx);
			rotate = rotate * 180 / 3.14159;
			if (sx > player.positionMinx + 65 / 2){
				rotate += 180;
			}
			for (var i = 1; i <= 3; i++)
			{
				$('#bulletBox').append($("<img style='position:absolute;' src='img/big_bad_bullet_0"+i+".png' class='bullet' id='bullet"+BulletTotal+"_"+i+"'></img>"));
				if (i == 1)
					$("#bullet"+BulletTotal+"_"+i).css({display:"block"});
				else
					$("#bullet"+BulletTotal+"_"+i).css({display:"none"});
				$("#bullet"+BulletTotal+"_"+i)[0].style.left = sx+"px";
				$("#bullet"+BulletTotal+"_"+i)[0].style.top = sy+"px";
				$("#bullet"+BulletTotal+"_"+i).css('transform', 'rotate('+rotate+'deg)' );
			}
			temp = "<img style='position:absolute;' src = 'img/big_bad_bullet_03.png'class='bullet' id='bullet"+BulletTotal+"'></img>";
			$('#bulletBox').append(temp);
			$('#bullet'+BulletTotal)[0].style.left = sx+"px";
			$('#bullet'+BulletTotal)[0].style.top = sy+"px";
			$('#bullet'+BulletTotal)[0].style.display = "none";
			$("#bullet"+BulletTotal).css('transform', 'rotate('+rotate+'deg)' );
		}
		BulletTotal++;
	}

	var BoomAnimate = function(ele,sx,sy,tot){
		if(ResetGameState){return;}
		for (var i = 1; i <= 6; i++)
		{
			if (i == 1)
				$('#boom'+ele+"_"+i)[0].style.display = 'block';
			else
				$('#boom'+ele+"_"+i)[0].style.display = 'none';
			$('#boom'+ele+"_"+i)[0].style.left = sx+'px';
			$('#boom'+ele+"_"+i)[0].style.top = sy+'px';
		}
		var BoomState = 1;
		var Booming = function(){
			$('#boom'+ele+"_"+BoomState)[0].style.display = 'none';
			BoomState++;
			if (BoomState > tot)
				clearInterval(temp);
			else
			{
				$('#boom'+ele+"_"+BoomState)[0].style.display = 'block';
			}
		}
		if (tot == 1)
			t = intervalTime * 2;
		else
			t= intervalTime/3;
		var temp = setInterval(Booming, t);
	}

		var checkDeath = function(){
		if(ResetGameState){return;}
		//删除被子弹打中的怪物
		for(var elem in BulletArr)
		{
			if (BulletArr[elem].Type == 1){
				for(var ele in EnemyArr)
				{
					var enemyWidth = 60;
					if (EnemyArr[ele].Type != 3)
						enemyWidth = 30;
					if(EnemyArr[ele].PosX + enemyWidth > BulletArr[elem].PosX && EnemyArr[ele].PosY + enemyWidth > BulletArr[elem].PosY && EnemyArr[ele].PosY - enemyWidth < BulletArr[elem].PosY && EnemyArr[ele].PosX - enemyWidth < BulletArr[elem].PosX){
						//remove
						// EnemyArr[ele].life -= player.harm;
						$("#bullet"+elem).remove();
						if (player.bulletType2) { //反弹爆裂弹效果
							var changeDeg = 0.26;
							var moveLength = 50;
							var DX1, DX2, DY1, DY2, originDeg, DX, DY;
							DX = BulletArr[elem].DirectX;
							DY = BulletArr[elem].DirectY;
							originDeg = Math.acos(BulletArr[elem].DirectX);
							if (BulletArr[elem].DirectY < 0) {
								originDeg = -originDeg;
							}
							DX1 = Math.cos(originDeg + changeDeg);
							DX2 = Math.cos(originDeg - changeDeg);
							DY1 = Math.sin(originDeg + changeDeg);
							DY2 = Math.sin(originDeg - changeDeg);
							bulletGenerate(BulletArr[elem].PosX - moveLength * DX, BulletArr[elem].PosY - moveLength * DY, -BulletArr[elem].DirectX, -BulletArr[elem].DirectY, 1);
							bulletGenerate(BulletArr[elem].PosX - moveLength * DX, BulletArr[elem].PosY - moveLength * DY, -DX1, -DY1, 1);
							bulletGenerate(BulletArr[elem].PosX - moveLength * DX, BulletArr[elem].PosY - moveLength * DY, -DX2, -DY2, 1);
						}
						else if(player.bulletType1){//爆裂弹效果
							var changeDeg = 0.26;
							var moveLength = 50;
							var DX1,DX2,DY1,DY2,originDeg,DX,DY;
							DX = BulletArr[elem].DirectX;
							DY = BulletArr[elem].DirectY;
							originDeg = Math.acos(BulletArr[elem].DirectX);
							if(BulletArr[elem].DirectY < 0)
							{
								originDeg = -originDeg;
							}
							DX1 = Math.cos(originDeg + changeDeg);
							DX2 = Math.cos(originDeg - changeDeg);
							DY1 = Math.sin(originDeg + changeDeg);
							DY2 = Math.sin(originDeg - changeDeg);
							bulletGenerate(BulletArr[elem].PosX+moveLength*DX,BulletArr[elem].PosY + moveLength * DY,BulletArr[elem].DirectX,BulletArr[elem].DirectY,1);
							bulletGenerate(BulletArr[elem].PosX+moveLength*DX,BulletArr[elem].PosY + moveLength * DY,DX1,DY1,1);
							bulletGenerate(BulletArr[elem].PosX+moveLength*DX,BulletArr[elem].PosY + moveLength * DY,DX2,DY2,1);

						}
						delete BulletArr[elem];
						EnemyArr[ele].life -= 50;
						if(EnemyArr[ele].life <= 0)
						{
							$('#explosion')[0].play();
							type =  EnemyArr[ele].Type;
							num = EnemyArr[ele].picNum*2;
							BoomAnimate(ele, EnemyArr[ele].PosX,EnemyArr[ele].PosY, 6);
							$("#enemy"+ele).remove();
							delete EnemyArr[ele];
							killEnemyCount++;
							for (var i = 1; i <= num; i++)
								$("#enemy"+type+"_"+ele+"_"+i).remove();
						}
						else
							BoomAnimate(ele, EnemyArr[ele].PosX,EnemyArr[ele].PosY, 1);
					}	
				}
			}
			else
			{
				for(var ele in PlayerArr)
		 		{
		 			if(PlayerArr[ele].positionMaxx - d > BulletArr[elem].PosX && PlayerArr[ele].positionMaxy - h > BulletArr[elem].PosY && PlayerArr[ele].positionMiny + h < BulletArr[elem].PosY && PlayerArr[ele].positionMinx + d < BulletArr[elem].PosX){
		 				//remove
		 				$("#bullet_enemy"+elem).remove();
		 				delete BulletArr[elem];
		 				$("#player0_"+currentState).remove();
		 				player_death_animation(0,PlayerArr[ele].positionMinx,PlayerArr[ele].positionMiny);
		 				playDeath = true;

		 				$("#hint").fadeIn('slow', function(){
							//$("#mainWrapper").fadeOut('slow');
						});
		 				$("#death")[0].play();
		 				delete PlayerArr[ele];
		 			}
		 		}
		 	}	
		}
	//删除被怪物撞到的人
		for(var ele in PlayerArr)
		{
			for(var elem in EnemyArr)
			{
				var enemyWidth = 15;
				if(PlayerArr[ele].positionMaxx - d < EnemyArr[elem].PosX - enemyWidth || PlayerArr[ele].positionMaxy - h < EnemyArr[elem].PosY - enemyWidth || EnemyArr[elem].PosX + enemyWidth < PlayerArr[ele].positionMinx + d || EnemyArr[elem].PosY + enemyWidth < PlayerArr[ele].positionMiny + h){
					;
				}
				else{
					$("#player0_"+currentState).remove();
					playDeath = true;
					//alert(player.positionMinx);
					player_death_animation(0,PlayerArr[ele].positionMinx,PlayerArr[ele].positionMiny);
					$("#hint").css({display:'block'});
		 			//$("#mainWrapper").css({display:'none'});
					$("#death")[0].play();
					delete PlayerArr[ele];
					}
			}
		}
	}
	var RecheckDeath = setInterval(checkDeath,20);

	//每0.2秒-检测出界：player（禁止出界） enemy（消除） bullet（消除）
	var checkRange = function(){
		if(ResetGameState){return;}
		//监测人物出界
		// for(var elem in PlayerArr)
		// {
		// 	if (PlayerArr[elem].positionMiny > parseInt(MapHeight) ||  PlayerArr[elem].positionMaxx < 0 || PlayerArr[elem].positionMinx > parseInt(MapWidth) || PlayerArr[elem].positionMaxy < 0 )
		// 	{
		// 		//remove 
		// 		$("#player"+elem).remove();
		// 		delete PlayerArr[elem];
		// 		}
		// }
		//监测怪物出界
		for(var ele in EnemyArr)
		{
			if (EnemyArr[ele].isOut())
			{	
				type =  EnemyArr[ele].Type;
				num = EnemyArr[ele].picNum*2;
				$("#enemy"+ele).remove();
				delete EnemyArr[ele];
				for (var i = 1; i <= num; i++)
					$("#enemy"+type+"_"+ele+"_"+i).remove();
			}
		}
		//监测子弹出界
		for(var el in BulletArr)
		{
			if (BulletArr[el].isOut())
			{	
				$("#bullet"+el).remove();
				delete BulletArr[el];
				for (var i = 1; i <= 3; i++)
					$("#bullet"+el+"_"+i).remove();
			}
		}
	}
	RecheckRange = setInterval(checkRange,500);	

	//每0.2秒-检测player方向改变：player:键盘方向键按下
	setInterval(CheckKey,20);

	//每0.05秒-检测player发射子弹：鼠标左键按下
	var CheckMouse = function(){
		if(playDeath){return;}
		if(MouseClick || singleClick)
		{	
			singleClick = false;
			// cursor.PosX = mouseposX;
			// cursor.PosY = mouseposY;
			$("#playerFire")[0].play();
			var tempWidth = (player.positionMaxx - player.positionMinx) / 2; 
			var tempHeight = (player.positionMaxy - player.positionMiny) / 2;
			var middleX = (player.positionMinx + player.positionMaxx) / 2;
			var middleY = (player.positionMiny + player.positionMaxy) / 2;
			var DX = mouseposX - middleX;
			var DY = mouseposY - middleY;
			var dx1,dy1;
			dx1 = DX /Math.sqrt((DX*DX)+(DY*DY));
			dy1 = DY /Math.sqrt((DX*DX)+(DY*DY));
			DX = dx1;
			DY = dy1;
			var tempangle = -angle;
			if(mouseposX < middleX)
			{
				tempangle += 180;
			}
			if (player.bulletType3) { //散弹效果
				var changeDeg = 0.26;
				var DX1, DX2, DY1, DY2, originDeg;
				originDeg = Math.acos(DX);
				if (DY < 0) {
					originDeg = -originDeg;
				}
				DX1 = Math.cos(originDeg + changeDeg);
				DX2 = Math.cos(originDeg - changeDeg);
				DY1 = Math.sin(originDeg + changeDeg);
				DY2 = Math.sin(originDeg - changeDeg);
				bulletGenerate(middleX + tempWidth * Math.cos(tempangle / 180 * 3.14159 - 0.2), middleY - tempWidth * Math.sin(tempangle / 180 * 3.14159 - 0.2), DX, DY, 1);
				bulletGenerate(middleX + tempWidth * Math.cos(tempangle / 180 * 3.14159 - 0.2), middleY - tempWidth * Math.sin(tempangle / 180 * 3.14159 - 0.2), DX1, DY1, 1);
				bulletGenerate(middleX + tempWidth * Math.cos(tempangle / 180 * 3.14159 - 0.2), middleY - tempWidth * Math.sin(tempangle / 180 * 3.14159 - 0.2), DX2, DY2, 1);
			}
			else{
				bulletGenerate(middleX + tempWidth * Math.cos(tempangle/180 * 3.14159 - 0.2), middleY - tempWidth * Math.sin(tempangle/180 * 3.14159 - 0.2), DX, DY,1);
			}

		}
	}
	var ReCheckMouse = setInterval(CheckMouse,200);
	//事件进行：
		//每0.2秒-子弹直线运动	
		var bulletMove = function(){
			if(ResetGameState){return ;}
			for (var i in BulletArr){
				var cursor = BulletArr[i];
				var state = cursor.bulletState;
				var newX = cursor.PosX + cursor.DirectX * cursor.moveLength;
				var newY = cursor.PosY + cursor.DirectY * cursor.moveLength;
				BulletArr[i].setPos(newX, newY);
				$("#bullet"+i)[0].style.left = newX + "px";
				$("#bullet"+i)[0].style.top = newY + "px";
				if (cursor.Type == 2)
				{
					cursor.count = (cursor.count+1) % 2;
					if (cursor.count == 1)
					{
						$("#bullet"+i+"_"+state)[0].style.display = 'none';
						state = state % 3+1;
						$("#bullet"+i+"_"+state)[0].style.left = newX + "px";
						$("#bullet"+i+"_"+state)[0].style.top = newY + "px";
						$("#bullet"+i+"_"+state)[0].style.display = 'block';
						cursor.bulletState = state;
					}
					else
					{
						$("#bullet"+i+"_"+state)[0].style.left = newX + "px";
						$("#bullet"+i+"_"+state)[0].style.top = newY + "px";
					}
				}
			}
		}
		var ReBulletMove = setInterval(bulletMove, intervalTime/15);

		//每0.2秒-enemy（1）（3）直线运动
		var enemyMoveStraight = function(){
			if(ResetGameState){return ;}
			for (var i in EnemyArr){
				if (EnemyArr[i].Type != 2){
					var cursor = EnemyArr[i];
					var state = cursor.enemyState;
					var newX = cursor.PosX + cursor.DirectX * cursor.moveLength;
					var newY = cursor.PosY + cursor.DirectY * cursor.moveLength;
					EnemyArr[i].setPos(newX, newY);
					$("#enemy"+i)[0].style.left = newX+"px";
					$("#enemy"+i)[0].style.top = newY+"px";
					var DX = PlayerArr[0].positionMinx+5 - cursor.PosX;
					var DY = PlayerArr[0].positionMiny+5 - cursor.PosY;
					rotate = Math.atan(DY/DX);
					rotate = rotate * 180 / 3.14159;
					cursor.count = (cursor.count+1) % 2;
					lastFaceto = cursor.faceto;
					if (cursor.Type == 3)
					{
						if (PlayerArr[0].positionMinx > cursor.PosX)
							cursor.faceto = 1;
						else
							cursor.faceto = 0;
					}
					if (cursor.count == 1)
					{
						tem = state + lastFaceto * cursor.picNum;
						$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.display = 'none';
						state = state % cursor.picNum+1;
						tem = state + cursor.faceto * cursor.picNum;
						$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.left = newX + "px";
						$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.top = newY + "px";
						$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.display = 'block';
						if (cursor.Type == 3)
							$("#enemy"+cursor.Type+"_"+i+"_"+tem).css('transform', 'rotate('+rotate+'deg)' );
						cursor.enemyState = state;
					}
					else
					{
						tem = state + lastFaceto * cursor.picNum;
						$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.display = 'none';
						tem = state + cursor.faceto * cursor.picNum;
						$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.left = newX + "px";
						$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.top = newY + "px";
						$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.display = 'block';
						if (cursor.Type == 3)
							$("#enemy"+cursor.Type+"_"+i+"_"+tem).css('transform', 'rotate('+rotate+'deg)' );
					}
				}
			}
		}
		var ReEnemyMoveStraight = setInterval(enemyMoveStraight, intervalTime/15);

		//每0.2秒-enemy（2）瞄准player运动
		var enemyMoveToward = function(){
			if(ResetGameState){return ;}
			for (var i in EnemyArr)
				if (EnemyArr[i].Type == 2){
				var cursor = EnemyArr[i];
				var state = cursor.enemyState;
				var DX = PlayerArr[0].positionMinx+5 - cursor.PosX;
				var DY = PlayerArr[0].positionMiny+5 - cursor.PosY;
				temp_dx = DX /Math.sqrt((DX*DX)+(DY*DY));
				temp_dy = DY /Math.sqrt((DX*DX)+(DY*DY));
				DX = temp_dx;
				DY = temp_dy;
				cursor.DirectX = DX;
				cursor.DirectY = DY;
				rotate = Math.atan(DY/DX);
				rotate = rotate * 180 / 3.14159;
				var newX = cursor.PosX + cursor.DirectX * cursor.moveLength;
				var newY = cursor.PosY + cursor.DirectY * cursor.moveLength;
				EnemyArr[i].setPos(newX, newY);
				$("#enemy"+i)[0].style.left = newX+"px";
				$("#enemy"+i)[0].style.top = newY+"px";
				cursor.count = (cursor.count+1) % 2;
				lastFaceto = cursor.faceto;
				if (PlayerArr[0].positionMinx > cursor.PosX)
					cursor.faceto = 1;
				else
					cursor.faceto = 0;
				if (cursor.faceto != lastFaceto)
				{
					for (var j = 1; j <= cursor.picNum; j++)
					{
						tem = j + lastFaceto * cursor.picNum;
						$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.display = 'none';
					}
				}
				tem = state + lastFaceto * cursor.picNum;
				if (cursor.count == 1)
				{
					$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.display = 'none';
					state = state % cursor.picNum+1;
					tem = state + cursor.faceto * cursor.picNum;
					$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.left = newX + "px";
					$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.top = newY + "px";
					$("#enemy"+cursor.Type+"_"+i+"_"+tem).css('transform', 'rotate('+rotate+'deg)' );
					$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.display = 'block';
					cursor.enemyState = state;
				}
				else
				{
					$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.display = 'none';
					state = state % cursor.picNum+1;
					tem = state + cursor.faceto * cursor.picNum;
					$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.left = newX + "px";
					$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.top = newY + "px";
					$("#enemy"+cursor.Type+"_"+i+"_"+tem).css('transform', 'rotate('+rotate+'deg)' );
					$("#enemy"+cursor.Type+"_"+i+"_"+tem)[0].style.display = 'block';
				}
			}
		}
		ReEnemyMoveToward = setInterval(enemyMoveToward, intervalTime/15);

		//每0.4秒-enemy（3） 瞄准player发射子弹
		var enemyShootToward = function(){
			if(ResetGameState){return ;}
			for (var i in EnemyArr)
				if (EnemyArr[i].Type == 3){
				var cursor = EnemyArr[i];
				var DX = PlayerArr[0].positionMinx+5 - cursor.PosX;
				var DY = PlayerArr[0].positionMiny+5 - cursor.PosY;
				temp_dx = DX /Math.sqrt((DX*DX)+(DY*DY));
				temp_dy = DY /Math.sqrt((DX*DX)+(DY*DY));
				DX = temp_dx;
				DY = temp_dy;
				sx = cursor.PosX+42+42*DX;
				sy = cursor.PosY+47+42*DY;
				bulletGenerate(sx, sy, DX, DY, 2);
			}
		}
		ReEnemyShootToward = setInterval(enemyShootToward, intervalTime*10);

		ReLevelSystem = setInterval(levelSystem,100);

		function ResetGame() {
			if (ResetGameState) {
			//$("#hint").css({display:'block'});
			clearInterval(check_death_animation);
			clearInterval(ReBooming);
			imgID = 1;
			LeftRightModel = 1; //0表示是左边模式，1是右边模式
			LeftImgcount = 0;
			RightImgcount = 0;
			currentState = 0; //记录当前切换到第几张图了
			killEnemyCount = 0;
			currentLevel = 1;
			BulletArr = [];
			BulletTotal = 0;
			EnemyArr = [];
			EnemyTotal = 0;
			PlayerArr = [];
			PlayerTotal = 0;
			$(".bullet").remove();
			$(".enemy").remove();
			$(".player").remove();
			playerGenerate();
			ResetGameState = false;
			playDeath = false;
			$('#player'+0+'_'+0)[0].style.display = "block";
			}
		}
		Replay = setInterval(ResetGame,100);
}

var LeftArrow,RightArrow,UpArrow,DownArrow, MouseClick;//记录按键情况
var mouseposX,mouseposY;
var angle,keyEvent;
var playDeath = false;
var singleClick = false;
var killEnemyCount = 0;
var currentLevel = 1;
var ResetGameState = false;
var testflag = false;
var ReBooming;
var LevelUpOnShow = false;
var LevelUpRemainder = true;
var LevelShow = true;

$(document).ready(function() {
  $("#welcome").click(function(){
    $("#welcome").fadeOut('slow', function(){
    	$("#levelBox").fadeIn('slow');
      	$("#welcome").hide();
      	$('#mainWrapper').fadeIn('slow', function(){
		$('#BGM2')[0].play();
      	Play();
      });
    });
  })
})
