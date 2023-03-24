var gameWidth = window.innerWidth;
var gameHeight = window.innerHeight;

var config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'flappy bird',
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 550 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var isPaused = false, gameOver = false;
var score = 0;
var score2 = 0;
var birdX = (gameWidth/2)-50;
var birdY = (gameHeight/2)-50;

function preload (){
    this.load.image('pipebottom', 'assets/pipebottom.png');
    this.load.image('pipetop', 'assets/pipetop.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('bird2', 'assets/bird2.png');

    this.load.audio('flap', './assets/sounds/wing.ogg');
    this.load.audio('hit', './assets/sounds/hit.ogg');
    this.load.audio('die', './assets/sounds/die.ogg');
    this.load.audio('score', './assets/sounds/point.ogg');
    this.load.audio('score2', './assets/sounds/point.ogg');
}

var platforms,spacebar,player,player2,scoreText, scoreText2;
var gap = 250; 
var xGap = 250;

/*
    Nivel facil -> gap = 500
    Nivel Medio -> gap = 150
    Nivel Dificil -> gap = 120

    Cheat presionar uma tecla e aumenta o pipe
*/

function create (){
    var colors = ["0x1fbde0","0x0a4957","0x08272e"];
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    this.cameras.main.setBackgroundColor(randColor)

    scoreText = this.add.text(birdX, (gameHeight/4),score,{fontSize: 60, color: '#fff'});
    scoreText2 = this.add.text(birdX, (gameHeight/2),score2,{fontSize: 60, color: '#d9d9d9'});
    
    platforms = this.physics.add.staticGroup();
    var pipePos = gameWidth+2*xGap
    let pos = getRandom();
    
    platforms.create(pipePos, pos[0], 'pipebottom').setScale(1).refreshBody();
    platforms.create(pipePos, pos[1], 'pipetop').setScale(1).refreshBody();

    player = this.physics.add.sprite(birdX, birdY, 'bird');
    player2 = this.physics.add.sprite(birdX, birdY, 'bird2');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    player2.setBounce(0.2);
    player2.setCollideWorldBounds(true);

    this.anims.create({
        key: 'flap',
        frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 3 }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'flap',
        frames: this.anims.generateFrameNumbers('bird2', { start: 0, end: 3 }),
        frameRate: 20,
        repeat: 0
    });

    player.body.setGravityY(300)
    player2.body.setGravityY(150)

    this.physics.add.collider(player, platforms, playerHit, null, game)
    this.physics.add.collider(player2, platforms, playerHit2, null, game)

    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //this.input.keyboard.addKey('M')

    this.input.keyboard.on('keydown-' + 'SPACE', flapNow);
    this.input.on('pointerdown', flapNowBird2); 
}

function getRandom() {
    let safePadding = 25;
    let min = Math.ceil(safePadding+gap/2);
    let max = Math.floor(game.canvas.height-safePadding-gap/2);
    let ran =  Math.floor(Math.random() * (max - min + 1)) + min;
    let rantop = ran-((gap/2)+260);
    let ranbot = ran+((gap/2)+260);
    return [ranbot, rantop]
}

var countpipe = 0;
function update ()  {
    let children = platforms.getChildren();
    children.forEach((child) => {
        if (child instanceof Phaser.GameObjects.Sprite) {
            child.refreshBody();
            child.x += -3;
            if(child.x <= gameWidth && !child.drawn) {
                countpipe+=1;
                child.drawn=true;

                if(countpipe>=2) {
                    let pos = getRandom();
                    platforms.create(gameWidth+xGap, pos[0], 'pipebottom').setScale(1).refreshBody();

                    platforms.create(gameWidth+xGap, pos[1], 'pipetop').setScale(1).refreshBody();
                    countpipe=0;
                }
            }
            if(child.x <= -50) {
                child.destroy();
            }

            if(child.x< birdX && !gameOver && child.texture.key=="pipebottom" && !child.scored){
                child.scored = true
                score+=1;
                score2+=1;
                scoreText.setText(score)
                scoreText2.setText(score2)
                game.sound.play("score");
            }
        }
    });

    if(player.y > Number(game.canvas.height)+200 && player2.y > Number(game.canvas.height)+200) {
        endGame();
    }
    if(player.y < -200 && player2.y < -200) {
        endGame();
    }
}

var player1Active = true;
var player2Active = true;

function flapNowBird2(){
    if(gameOver || !player2Active) return;
    if(isPaused) resume();
    player2.setVelocityY(-330);
    game.sound.play("flap");
}

function flapNow(){
    if(gameOver || !player1Active) return;
    if(isPaused) resume();
    player.setVelocityY(-330);
    game.sound.play("flap");
}

var hitflag = false;
var hitflag2 = false;

function playerHit() {
    score = this.score;
    if(hitflag) return;
    game.sound.play("hit");
    hitflag=true;
    scoreText.setText(score)
    verify();
    setTimeout(playerDead, 200);
    player1Active = false; // desativa o player 1
}

function playerHit2() {
    score2 = this.score2;
    if(hitflag2) return;
    game.sound.play("hit");
    hitflag2=true;
    scoreText2.setText(score2)
    verify();
    setTimeout(playerDeadPlayer2, 200);
    player2Active = false; // desativa o player 2
}

function playerDead() {
    score = this.score;
    scoreText.setText(score)
    game.sound.play("die");
    player.setCollideWorldBounds(false);
    verify();
}

function playerDeadPlayer2() {
    score2 = this.score2;
    scoreText2.setText(score2)
    game.sound.play("die");
    player2.setCollideWorldBounds(false);
    verify();
}

function verify(){
    if(!player1Active && !player2Active){
        gameOver = true;
    }
    if(!player1Active && !player2Active){
        player.body.setVelocityX(0)
        player2.body.setVelocityX(0)
        console.log("game over 1 and 2") 
    }
    else if(!player1Active){
        player.body.setVelocityX(0)
        console.log("game over 1") 
    }
    else if(!player2Active){
        player2.body.setVelocityX(0)
        console.log("game over 2")  
    }
}