var gameWidth = window.innerWidth;
var gameHeight = window.innerHeight;

var config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'flappy bird',
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 550 },
            debug: false
        }
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var isPaused = false, gameOver = false, start = false, chooseLevel = false, chooseColorPlayer1 = false, chooseColorPlayer2 = false;
var scorePlayer1 = 0, scorePlayer2 = 0;
var birdX = (gameWidth/2)-50, birdY = (gameHeight/2)-50;

function preload (){
    this.load.image('pipebottom', 'assets/pipes/pipebottom.png');
    this.load.image('pipetop', 'assets/pipes/pipetop.png');
    this.load.image('BlueBird', 'assets/birds/bird.png');
    this.load.image('Greenbird', 'assets/birds/bird2.png');
    this.load.image('Redbird', 'assets/birds/bird3.png');
    this.load.image('YellowBird', 'assets/birds/bird4.png');
    this.load.image('background', 'assets/menu/back.png');
    this.load.image('start', 'assets/menu/start.png');
    this.load.image('easyMode', 'assets/menu/easyMode.png');
    this.load.image('mediumMode', 'assets/menu/mediumMode.png');
    this.load.image('hardMode', 'assets/menu/hardMode.png');
    this.load.image('Player_1', 'assets/menu/Player_1.png');
    this.load.image('Player_2', 'assets/menu/Player_2.png');
    this.load.image('Amarelo', 'assets/menu/Amarelo.png');
    this.load.image('Verde', 'assets/menu/Verde.png');
    this.load.image('Vermelho', 'assets/menu/Vermelho.png');
    this.load.image('Azul', 'assets/menu/Azul.png');

    this.load.audio('flap', './assets/sounds/wing.ogg');
    this.load.audio('hit', './assets/sounds/hit.ogg');
    this.load.audio('die', './assets/sounds/die.ogg');
    this.load.audio('score', './assets/sounds/point.ogg');
}

var platforms,spacebar,player,player2,scoreTextPlayer1, scoreTextPlayer2, player1Color, player2Color;
var gap = 0, xGap = 250;
const gravityValue = 300;

function create (){
    const startButton = this.add.image(800, 400, 'background');
    const startLabel = this.add.image(800, 250, 'start');
    const easyModeLabel = this.add.image(800, 400, 'easyMode');
    const mediumModeLabel = this.add.image(800, 500, 'mediumMode');
    const hardModeLabel = this.add.image(800, 600, 'hardMode');
    const Player_1 = this.add.image(800, 350, 'Player_1').setVisible(false);
    const Player_2 = this.add.image(800, 350, 'Player_2').setVisible(false);
    const Amarelo = this.add.image(800, 500, 'Amarelo').setVisible(false);
    const Verde = this.add.image(800, 550, 'Verde').setVisible(false);
    const Vermelho = this.add.image(800, 600, 'Vermelho').setVisible(false);
    const Azul = this.add.image(800, 450, 'Azul').setVisible(false);
    
    startLabel.setInteractive();
    easyModeLabel.setInteractive();
    mediumModeLabel.setInteractive();
    hardModeLabel.setInteractive();

    easyModeLabel.on('pointerdown', function(){
        easyModeLabel.destroy();
        mediumModeLabel.destroy();
        hardModeLabel.destroy();
        gap = 300;
        chooseLevel = true;

        Player_1.setInteractive().setVisible(true);
        Player_2.setInteractive().setVisible(false);
        Amarelo.setInteractive().setVisible(true);
        Verde.setInteractive().setVisible(true);
        Vermelho.setInteractive().setVisible(true);
        Azul.setInteractive().setVisible(true);

        Azul.on('pointerdown', function(){
            if(chooseColorPlayer1){
                player2Color = 'BlueBird';
                player2.setTexture(player2Color);
                chooseColorPlayer2 = true;
                Azul.destroy();
            }

            if(!chooseColorPlayer1){
                player1Color = 'BlueBird';
                player.setTexture(player1Color);
                Azul.destroy();
                Player_1.destroy();
                Player_2.setVisible(true);
                chooseColorPlayer1 = true;
            }

            if(chooseColorPlayer1 && chooseColorPlayer2){
                Verde.destroy();
                Vermelho.destroy();
                Amarelo.destroy();
                Player_2.destroy();
            }
        })

        Amarelo.on('pointerdown', function(){
            if(chooseColorPlayer1){
                player2Color = 'YellowBird';
                player2.setTexture(player2Color);
                chooseColorPlayer2 = true;
                Amarelo.destroy();
            }

            if(!chooseColorPlayer1){
                player1Color = 'YellowBird';
                player.setTexture(player1Color);
                Amarelo.destroy();
                Player_1.destroy();
                Player_2.setVisible(true);
                chooseColorPlayer1 = true;
            }

            if(chooseColorPlayer1 && chooseColorPlayer2){
                Verde.destroy();
                Vermelho.destroy();
                Azul.destroy();
                Player_2.destroy();
            }
        })

        Verde.on('pointerdown', function(){
            if(chooseColorPlayer1){
                player2Color = 'Greenbird';
                player2.setTexture(player2Color);
                chooseColorPlayer2 = true;
                Verde.destroy();
            }

            if(!chooseColorPlayer1){
                player1Color = 'Greenbird';
                player.setTexture(player1Color);
                Verde.destroy();
                Player_1.destroy();
                Player_2.setVisible(true);
                chooseColorPlayer1 = true;
            }

            if(chooseColorPlayer1 && chooseColorPlayer2){
                Amarelo.destroy();
                Vermelho.destroy();
                Azul.destroy();
                Player_2.destroy();
            }
        })

        Vermelho.on('pointerdown', function(){
            if(chooseColorPlayer1){
                player2Color = 'Redbird';
                player2.setTexture(player2Color);
                chooseColorPlayer2 = true;
                Vermelho.destroy();
            }

            if(!chooseColorPlayer1){
                player1Color = 'Redbird';
                player.setTexture(player1Color);
                Vermelho.destroy();
                Player_1.destroy();
                Player_2.setVisible(true);
                chooseColorPlayer1 = true;
            }

            if(chooseColorPlayer1 && chooseColorPlayer2){
                Amarelo.destroy();
                Verde.destroy();
                Azul.destroy();
                Player_2.destroy();
            }
        })
    })

    mediumModeLabel.on('pointerdown', function(){
        easyModeLabel.destroy();
        mediumModeLabel.destroy();
        hardModeLabel.destroy();
        gap = 160;
        chooseLevel = true;

        Player_1.setVisible(true);
        Amarelo.setInteractive().setVisible(true);
        Verde.setInteractive().setVisible(true);
        Vermelho.setInteractive().setVisible(true);
        Azul.setInteractive().setVisible(true);

        Azul.on('pointerdown', function(){
            if(chooseColorPlayer1){
                player2Color = 'BlueBird';
                player2.setTexture(player2Color);
                chooseColorPlayer2 = true;
                Azul.destroy();
            }

            if(!chooseColorPlayer1){
                player1Color = 'BlueBird';
                player.setTexture(player1Color);
                Azul.destroy();
                Player_1.destroy();
                Player_2.setVisible(true);
                chooseColorPlayer1 = true;
            }

            if(chooseColorPlayer1 && chooseColorPlayer2){
                Verde.destroy();
                Vermelho.destroy();
                Amarelo.destroy();
                Player_2.destroy();
            }
        })

        Amarelo.on('pointerdown', function(){
            if(chooseColorPlayer1){
                player2Color = 'YellowBird';
                player2.setTexture(player2Color);
                chooseColorPlayer2 = true;
                Amarelo.destroy();
            }

            if(!chooseColorPlayer1){
                player1Color = 'YellowBird';
                player.setTexture(player1Color);
                Amarelo.destroy();
                Player_1.destroy();
                Player_2.setVisible(true);
                chooseColorPlayer1 = true;
            }

            if(chooseColorPlayer1 && chooseColorPlayer2){
                Verde.destroy();
                Vermelho.destroy();
                Azul.destroy();
                Player_2.destroy();
            }
        })

        Verde.on('pointerdown', function(){
            if(chooseColorPlayer1){
                player2Color = 'Greenbird';
                player2.setTexture(player2Color);
                chooseColorPlayer2 = true;
                Verde.destroy();
            }

            if(!chooseColorPlayer1){
                player1Color = 'Greenbird';
                player.setTexture(player1Color);
                Verde.destroy();
                Player_1.destroy();
                Player_2.setVisible(true);
                chooseColorPlayer1 = true;
            }

            if(chooseColorPlayer1 && chooseColorPlayer2){
                Amarelo.destroy();
                Vermelho.destroy();
                Azul.destroy();
                Player_2.destroy();
            }
        })

        Vermelho.on('pointerdown', function(){
            if(chooseColorPlayer1){
                player2Color = 'Redbird';
                player2.setTexture(player2Color);
                chooseColorPlayer2 = true;
                Vermelho.destroy();
            }

            if(!chooseColorPlayer1){
                player1Color = 'Redbird';
                player.setTexture(player1Color);
                Vermelho.destroy();
                Player_1.destroy();
                Player_2.setVisible(true);
                chooseColorPlayer1 = true;
            }

            if(chooseColorPlayer1 && chooseColorPlayer2){
                Amarelo.destroy();
                Verde.destroy();
                Azul.destroy();
                Player_2.destroy();
            }
        })
    })

    hardModeLabel.on('pointerdown', function(){
        easyModeLabel.destroy();
        mediumModeLabel.destroy();
        hardModeLabel.destroy();
        gap = 130;
        chooseLevel = true;

        Player_1.setVisible(true);
        Amarelo.setInteractive().setVisible(true);
        Verde.setInteractive().setVisible(true);
        Vermelho.setInteractive().setVisible(true);
        Azul.setInteractive().setVisible(true);

        Azul.on('pointerdown', function(){
            if(chooseColorPlayer1){
                player2Color = 'BlueBird';
                player2.setTexture(player2Color);
                chooseColorPlayer2 = true;
                Azul.destroy();
            }

            if(!chooseColorPlayer1){
                player1Color = 'BlueBird';
                player.setTexture(player1Color);
                Azul.destroy();
                Player_1.destroy();
                Player_2.setVisible(true);
                chooseColorPlayer1 = true;
            }

            if(chooseColorPlayer1 && chooseColorPlayer2){
                Verde.destroy();
                Vermelho.destroy();
                Amarelo.destroy();
                Player_2.destroy();
            }
        })

        Amarelo.on('pointerdown', function(){
            if(chooseColorPlayer1){
                player2Color = 'YellowBird';
                player2.setTexture(player2Color);
                chooseColorPlayer2 = true;
                Amarelo.destroy();
            }

            if(!chooseColorPlayer1){
                player1Color = 'YellowBird';
                player.setTexture(player1Color);
                Amarelo.destroy();
                Player_1.destroy();
                Player_2.setVisible(true);
                chooseColorPlayer1 = true;
            }

            if(chooseColorPlayer1 && chooseColorPlayer2){
                Verde.destroy();
                Vermelho.destroy();
                Azul.destroy();
                Player_2.destroy();
            }
        })

        Verde.on('pointerdown', function(){
            if(chooseColorPlayer1){
                player2Color = 'Greenbird';
                player2.setTexture(player2Color);
                chooseColorPlayer2 = true;
                Verde.destroy();
            }

            if(!chooseColorPlayer1){
                player1Color = 'Greenbird';
                player.setTexture(player1Color);
                Verde.destroy();
                Player_1.destroy();
                Player_2.setVisible(true);
                chooseColorPlayer1 = true;
            }

            if(chooseColorPlayer1 && chooseColorPlayer2){
                Amarelo.destroy();
                Vermelho.destroy();
                Azul.destroy();
                Player_2.destroy();
            }
        })

        Vermelho.on('pointerdown', function(){
            if(chooseColorPlayer1){
                player2Color = 'Redbird';
                player2.setTexture(player2Color);
                chooseColorPlayer2 = true;
                Vermelho.destroy();
            }

            if(!chooseColor){
                player1Color = 'Redbird';
                player.setTexture(player1Color);
                Vermelho.destroy();
                Player_1.destroy();
                Player_2.setVisible(true);
                chooseColorPlayer1 = true;
            }

            if(chooseColorPlayer1 && chooseColorPlayer2){
                Amarelo.destroy();
                Verde.destroy();
                Azul.destroy();
                Player_2.destroy();
            }
        })
    })

    startLabel.on('pointerdown', function(){
        if(chooseLevel && chooseColorPlayer1 && chooseColorPlayer2){
            startButton.destroy();
            startLabel.destroy();
            start = true;
        }
    })

    var colors = ["0x1fbde0","0x0a4957","0x08272e"];
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    this.cameras.main.setBackgroundColor(randColor);

    scoreTextPlayer1 = this.add.text(birdX, (gameHeight/4),scorePlayer1,{fontSize: 60, color: '#d9d9d9'});
    scoreTextPlayer2 = this.add.text(birdX, (gameHeight/2),scorePlayer2,{fontSize: 60, color: '#d9d9d9'});

    platforms = this.physics.add.staticGroup();
    var pipePos = gameWidth+2*xGap;
    let pos = [100, 400];

    platforms.create(pipePos, pos[0], 'pipetop').setScale(1).refreshBody();
    platforms.create(pipePos, pos[1], 'pipebottom').setScale(0).refreshBody(); 

    player = this.physics.add.sprite(birdX, birdY);
    player2 = this.physics.add.sprite(birdX, birdY);

    configurePlayer(player);
    configurePlayer(player2);

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
    
    player.body.gravity.y = gravityValue;
    player2.body.gravity.y = gravityValue;

    this.physics.add.collider(player, platforms, player1Hit, null, game)
    this.physics.add.collider(player2, platforms, player2Hit, null, game)

    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    var keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z); 
    keyZ.on('down', function () {
        gap = 600; 
    });

    this.input.keyboard.on('keydown-' + 'SPACE', flapbird1);
    this.input.on('pointerdown', flapBird2); 

    this.input.keyboard.on('keydown-A', addScore);
    this.input.keyboard.on('keydown-L', addScorePlayer2);
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
        if (child instanceof Phaser.GameObjects.Sprite && start) {
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

            if(child.x< birdX && !gameOver && child.texture.key=="pipebottom" && !child.scored && start){
                child.scored = true
                scorePlayer1+=1;
                scorePlayer2+=1;
                scoreTextPlayer1.setText(scorePlayer1)
                scoreTextPlayer2.setText(scorePlayer2)
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

function flapBird2(){
    if(gameOver || !player2Active) return;
    if(isPaused) resume();
    player2.setVelocityY(-330);
    game.sound.play("flap");
}

function flapbird1(){
    if(gameOver || !player1Active) return;
    if(isPaused) resume();
    player.setVelocityY(-330);
    game.sound.play("flap");
}

var hitflag = false;
var hitflag2 = false;

function player1Hit() {
    scorePlayer1 = this.scorePlayer1;
    if(hitflag) return;
    game.sound.play("hit");
    hitflag=true;
    scoreTextPlayer1.setText(scorePlayer1)
    verify();
    setTimeout(player1Dead, 200);
    player1Active = false; 
}

function player2Hit() {
    scorePlayer2 = this.scorePlayer2;
    if(hitflag2) return;
    game.sound.play("hit");
    hitflag2=true;
    scoreTextPlayer2.setText(scorePlayer2)
    verify();
    setTimeout(player2Dead, 200);
    player2Active = false; 
}

function player1Dead() {
    scorePlayer1 = this.scorePlayer1;
    scoreTextPlayer1.setText(scorePlayer1)
    game.sound.play("die");
    player.setCollideWorldBounds(false);
    verify();
}

function player2Dead() {
    scorePlayer2 = this.scorePlayer2;
    scoreTextPlayer2.setText(scorePlayer2)
    game.sound.play("die");
    player2.setCollideWorldBounds(false);
    verify();
}

function addScore() {
    scoreTextPlayer1.setText(scorePlayer1 += 1000);
}

function addScorePlayer2() {
    scoreTextPlayer2.setText(scorePlayer2 += 3000);
}

function verify(){
    if(!player1Active && !player2Active){
        gameOver = true;
    }
    if(!player1Active && !player2Active){
        player.body.setVelocityX(0)
        player2.body.setVelocityX(0)
    }
    else if(!player1Active){
        player.body.setVelocityX(0)
    }
    else if(!player2Active){
        player2.body.setVelocityX(0)
    }
}

function configurePlayer(player) {
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
}
  
function endGame() {
    alert("Game Over!. O jogo vai recomeçar.");
    location.reload();
}