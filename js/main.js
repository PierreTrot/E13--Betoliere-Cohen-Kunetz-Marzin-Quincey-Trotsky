/* Standard Web */
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame       ||
           window.webkitRequestAnimationFrame || // Pour Chrome et Safari
           window.mozRequestAnimationFrame    || // Pour Firefox
           window.oRequestAnimationFrame      || // Pour Opera
           window.msRequestAnimationFrame     || // Pour Internet Explorer
           function (callback) {               
               window.setTimeout(callback, 1000 / 60);
           };
}());

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'), // permet de dessiner dans le canvas
	width = 1920,
    height = 176;

/* width and heigth canvas */
canvas.width = width;
canvas.height = height;

/* width and heigth ennemi area */
var ennemiArea;
ennemiArea.width = 1280,
ennemiArea.height = 176;

/* variable compteur vie */
var enemy=0;
var viePlayer=3;

/* Variable vérification touche */
var up=true;
var down=true;
var left=true;
var right=true;
var a=0;
var tab=new Array();
var i=getRandomInt(3,10);	// i = nombre de pv si i = j passe

/* variables reliées aux comboShow */
var zrouge;
var qvert;
var sjaune;
var dviolet;

/* Detecte si une touche est pressé ou non :) quand une touche est pressé keysDown prend la valeur[touche pressé] pour true*/
var keysDown = {};
window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});

function imageLoaded() {
    game.imagesLoaded ++;
}


/* Tileset, qui découpe le sprite en carré et les mets dans un tableau  qui corespond aux sx et sy*/
function Tileset(image, tileWidth, tileHeight) {
    this.image = new Image();
    game.images ++;
    this.image.onload = imageLoaded;
    this.image.src = image; // récupère l'image
	this.tileWidth = tileWidth; // récupère la largeur x
    this.tileHeight = tileHeight; // récupère la hauteur y
}

function TilesetEnnemi(image, tileWidth, tileHeight) {
    this.image = new Image();
    game.images ++;
    this.image.onload = imageLoaded;
    this.image.src = image; // récupère l'image
    this.tileWidth = tileWidth; // récupère la largeur x
    this.tileHeight = tileHeight; // récupère la hauteur y
}



/* Fonction animation où on stocke les valeurs pour savoir quels frame afficher, la vitesse de l'animation... */
function Animation(tileset, frames, frameDuration) {
    this.tileset = tileset;
    this.frames = frames;
    this.currentFrame = 0;
    this.frameTimer = Date.now();
    this.frameDuration = frameDuration;
}

/* Fonction qui contient les différentes partie de l'animation, avec l'état (left ou right), ses coordonnées x et y, sa taille (width et heigth) et la vitesse de l'animation*/
function Sprite(stateAnimations, startingState, x, y, width, height, speed) {
    this.stateAnimations = stateAnimations; 
    this.currentState = startingState;
    this.x = 20; // position du bonhomme sur x
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
	
}

/* Différent ennemis */
function ennemi(stateAnimations, startingState, x, y, width, height, speed) {
    this.stateAnimations = stateAnimations; 
    this.currentState = startingState;
    this.x = 600; // position du bonhomme sur x
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
	
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function affichageViePlayer(){
	ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, 150, 25);
	ctx.font = '12pt Arial';
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'top';
    ctx.fillText(viePlayer, 10, 5);
	ctx.fillText('Vie', 30, 5);

}

function creationVieEnnemi() {
	
	for (var j = 0; j < i; j++) {
		var k=getRandomInt(1,5);
		if (k=1){
			enemy = enemy + 1000;
		};
		if (k=2){
			enemy = enemy + 100;
		};
		if (k=3){
			enemy = enemy + 10;
		};
		if (k=4){
			enemy = enemy + 1;
		};
		//console.log(i);
		console.log(j);
	};
}
function affichageVieEnnemi () {
	ctx.fillStyle = 'rgba(168, 31, 31, 0.73)';
    ctx.fillRect(150, 0, 130, 25);
	ctx.font = '12pt Arial';
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'top';
    ctx.fillText(enemy, 170, 5);
	ctx.fillText('Vie', 190, 5);
}

/* Affichage des touches à frapper */
function affichageToucheCombo () {	
	zrouge = setTimeout(function(){
	
	ctx.fillStyle = 'rgba(168, 31, 31, 1)';
    ctx.fillRect(330, 30, 130, 25);},2000);	
	
	qvert = setTimeout(function(){
	ctx.fillStyle = 'rgba(31, 168, 47, 1)';
    ctx.fillRect(330, 30, 130, 25);},5000);
	
	sjaune = setTimeout(function(){
	ctx.fillStyle = 'rgba(168, 163, 31, 1)';
    ctx.fillRect(350, 30, 130, 25);},7000);
	
	dviolet = setTimeout(function(){
	ctx.fillStyle = 'rgb(235, 0, 255)';
    ctx.fillRect(350, 30, 130, 25);},9000);	
	
}



function comboShow() {	
	
	if (enemy.charAt(0)==0){
		up=false;
	};
	if (enemy.charAt(1)==0){
		down=false;
	};
	if (enemy.charAt(2)==0){
		left=false;
	};
	if (enemy.charAt(3)==0){
		right=false;
	};
	while (enemy!=0 && a<=i){
		var b=getRandomInt(1,5);
		if (b==1 && up==true){
			tab[a]="up";			
			enemy = enemy-1000;
			a=a+1;
		};
		if (b==2 && down==true){
			tab[a]="down";
			enemy = enemy-100;
			a=a+1;
		};
		if (b==3 && left==true){
			tab[a]="left";
			enemy = enemy-10;
			a=a+1;
		};
		if (b==4 && right==true){
			tab[a]="right";
			enemy = enemy-1;
			a=a+1;
		};
		
	};
}

function comboDo(){
	var combo = 0;		
		
 		if(90 in keysDown) {
 			var press="up";
				ctx.fillStyle = 'rgba(168, 31, 31, 1)';
    			ctx.fillRect(400, 160, 160, 25);
			console.log('z');
		};
		if(83 in keysDown) {
 			var press="down";
			ctx.fillStyle = 'rgba(31, 168, 47, 1)';
    			ctx.fillRect(400, 90, 130, 25);
			console.log('s');
		};
		if(81 in keysDown) {
 			var press="left";
			ctx.fillStyle = 'rgba(168, 163, 31, 1)';
    			ctx.fillRect(400, 90, 130, 25);
			console.log('q');
		};
		if(68 in keysDown) {
 			var press="right";
			ctx.fillStyle = 'rgb(235, 0, 255)';
    		ctx.fillRect(400, 90, 130, 25);
			console.log('d');
		};
		if(tab[combo]==press){
			var combo=combo+1;
			//afficher un combo?
			
			
	
		} else if(tab[combo]!=press){
			var combo=0;
			viePlayer-1;
		
			//afficher "miss"
		}
		
		console.log(combo);
	
	
}
/* fonctin qui dessine la sprite */
function drawSprite(sprite) {
    ctx.drawImage(
		// appelle l'image
        sprite.stateAnimations[sprite.currentState].tileset.image,
		
		// source x sur l'image
        sprite.stateAnimations[sprite.currentState].frames[sprite.stateAnimations[sprite.currentState].currentFrame].split(',')[0] * sprite.stateAnimations[sprite.currentState].tileset.tileWidth,
		
		// source y sur l'image
        sprite.stateAnimations[sprite.currentState].frames[sprite.stateAnimations[sprite.currentState].currentFrame].split(',')[1] * sprite.stateAnimations[sprite.currentState].tileset.tileHeight,
		
		// source width
        sprite.stateAnimations[sprite.currentState].tileset.tileWidth,
		
		// source height
        sprite.stateAnimations[sprite.currentState].tileset.tileHeight,
		
		// destination x sur le canvas
        Math.round(sprite.x),
		
		// destination y sur le canvas
        Math.round(sprite.y),
		
		// destination width
        sprite.width,
		
		// destination height
        sprite.height
    );
}

/* On compare le temps qui passe avec le temps d'affichage de l'animation 
et si 200 millisecondes sont passé, vaut true, puis on check la position de la frame dans le tableaux. Si ce n'est pas la dernière, on incrémente de 1 sinon on reset la frame à 0; Après le reset on attribue 200 ms avant de recommencer à la frame 0.
*/
function updateAnimation(anim) {
    if (Date.now() - anim.frameTimer > anim.frameDuration) {
        if (anim.currentFrame < anim.frames.length - 1) anim.currentFrame ++;
        else anim.currentFrame = 0;
        anim.frameTimer = Date.now();
    }

}
									/* Variables */

/* Contient les variables relatives aux jeux */
var game = {
    images: 0,
    imagesLoaded: 0
}

/* Compteur fps */
/*
var fps = {
    current: 0,
    last: 0,
    lastUpdated: Date.now(),
    draw: function() {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, 305, 25);
        ctx.font = '12pt Arial';
        ctx.fillStyle = '#fff';
        ctx.textBaseline = 'top';
        ctx.fillText(fps.last + 'fps', 5, 5);
    },
    update: function() {
        fps.current ++;
        if (Date.now() - fps.lastUpdated >= 1000) {
            fps.last = fps.current;
            fps.current = 0;
            fps.lastUpdated = Date.now();
        }
    }
}
*/

var spriteTiles = new Tileset('snoop_petit.png', 44, 108); // permet de donner de nouvelles valeurs à la function Tileset 

var spriteEnnemi = new TilesetEnnemi('snoop_petit.png', 44, 108); // on donne une nouvelles à 

/* On utilise un tableau pour stocker les paramètre des frames, ce tableau sert à définir les coordonnées du Tileset. On connait la la width et la heigth de tile du coup on peut retrouver toutes les Tile que l'on veut */
var spriteLeftAnim = new Animation(spriteTiles, ['3,0', '2,0', '1,0', '0,0'], 200);
var spriteRightAnim = new Animation(spriteTiles, ['0,1', '1,1', '2,1', '3,1'], 200);

/* Tableau sprite Ennemi */
var spriteLeftAnim = new Animation(spriteEnnemi, ['3,0', '2,0', '1,0', '0,0'], 200);
var spriteRightAnim = new Animation(spriteEnnemi, ['0,1', '1,1', '2,1', '3,1'], 200);

/* On donne respectivement le nom 'left' pour l'animation left et 'right' pour l'anim de right.  */

// Ici le player commencera position droite
var player = new Sprite({'left': spriteLeftAnim, 'right': spriteRightAnim}, 'right', canvas.width / 2, canvas.height / 2, 44, 91, 100);
// Ici l'ennemi commencera position gauche
var ennemi = new ennemi({'left': spriteLeftAnim, 'right': spriteRightAnim}, 'left', canvas.width / 2, canvas.height / 2, 44, 91, 100);









 
/* check touches de clavier et les coordonnées du sprite */
function update(mod) {
	/* le si indique que Si une touché est pressé, le key code retourne true, si true il augmente/diminue la valeur des coordonnées x/y de notre sprite par la vitesse multiplier par le mod( qui permet de garder une framerate stable)*/
	
	 if (37 in keysDown) {
        player.currentState = 'left';
        player.x -= player.speed * mod;
        updateAnimation(player.stateAnimations[player.currentState]);
    }
    else if (39 in keysDown) {
        player.currentState = 'right';
        player.x += player.speed * mod;
        updateAnimation(player.stateAnimations[player.currentState]);
    }
	
	/* Hit box */
	if (player.x >= width-player.width){
		player.x = width-player.width;
	} else if (player.x <= 0) {
		player.x = 0;
	}
	
	//fps.update(); // compteur fps
 
}

/* repère de la zone où spawn les ennemis */
function ennemiArea(){
	
	/* zone ennemi 1 */
	ctx.strokeStyle = 'rgb(255, 0, 0)';
	ctx.strokeRect(640,0, ennemiArea.width, ennemiArea.height);
	
	/* zone ennemi 1 */
	ctx.strokeStyle = 'rgb(0, 29, 255)';
	ctx.strokeRect(430,0, ennemiArea.width, ennemiArea.height);
	
	/* zone ennemi 3 */
	ctx.strokeStyle = 'rgb(235, 0, 255)';
	ctx.strokeRect(530,0, ennemiArea.width, ennemiArea.height);
}


 
/* Affichage background */
function render() {
	
 	ctx.fillStyle = game.backgroundImage; // zone qui contient le bg	
    ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	
	ctx.drawImage(background,0,0); // affiche le background	
	
	
	//fps.draw(); // affiche le compteur fps
	
	//ennemiArea(); // affiche la zone repère ennemi	
	
	/* Compteurs */
	
	/* Affichage Compteur vie player */
	
	//affichageViePlayer();
	
	/* Compteur vie ennemi */
	
	//affichageVieEnnemi();
	/* Apparition ennemi quand le joueur passe la coordonnée voulu. Repaire  la zone ennemi */
	if (player.x >= 400-player.width){
		player.x = 400-player.width;
		affichageToucheCombo();		
		drawSprite(ennemi); // affiche un ennemi				
		comboDo();		
		} else if (player.x <= 0) {
		player.x = 0;
			
	}
	
	
	
	
	
	//if(player.x >=
	
	/*if(player.x >= 500-player.width){
		player.x = 500-player.width;
		
		ctx.clearRect ( 0 , 0 , drawSprite(ennemi).width, drawSprite(ennemi).height );
	} else if (player.x <= 0) {
		player.x = 0;
	}*/
			

    drawSprite(player); // affiche le joueur
	
}
 
function main() {
    update((Date.now() - then) / 1000); // calcul(mod) pour avoir une framerate stable
	
	if(game.images === game.imagesLoaded){ // check si les images sont chargées 
    render();
	}	
    then = Date.now();
}




/* Background game */
var background = new Image();
background.src = "img/bg.jpg";

background.onload = function(){
    ctx.drawImage(background,0,0);   
}

var then = Date.now();
setInterval(main, 10); // appelle la fonction main toutes les 10 millisecondes