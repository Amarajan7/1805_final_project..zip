// ====== GAME STATE ======
// the background variables of the game, each have their own images which are established in preload
let CurrentBG;
let bg1;
let bg2;
let bg3;

// the array for the falling phones seen in level 2 and 3 
let phones = [];

//sperate variables for the snake for level three, the scale is different in comparison to the tile size to eliminate confusion
let s;
let scl = 100; // used in level 0/1/2 tile sizing
let food;
let score = 0;

// establish the sprite group, the facing directions for the character sprite .. basically saying leave room for this name to be established
let SPRITE_CHARACTER_EAST = null;
let SPRITE_CHARACTER_WEST = null;
let SPRITE_CHARACTER_SOUTH = null;
let SPRITE_CHARACTER_NORTH = null;

//====The TileMap for level 1 ====//
//the start of the tile variables to 'map out the game'
let tileMap = []; // creates a map for the game which will help the character interact with objects within the game
let tilesX = 23; //23 tiles on the x-axis
let tilesY = 18; // 13 tiles on the y-axis. // both of these values will fit the canvas
let tileSize = 100; // the number of pixels across each tile.
let theCanvasWidth = tilesX * tileSize; // TomFix: Calc canvas size based on tile size and numbers
let theCanvasheight = tilesY * tileSize; // TomFix: Calc canvas size based on tile size and numbers

//establishes the texture variable which displays the textures on screen and tile rules for the individual tiles
let textures = [];



// ========== STARTING POSITIONS FOR ALL OF THE SPRITES ==========
// this is the variables for the sprites which will impact the scene changes in the game
// TOM FIX: Calculate start position of sprites based on the tile
let Ds;
let DSSprite;
let DSPos = { col: 2.5, row: 1.5 };

// seperate sprite for the DS on level 3 so that it can jump around the canvas 
let game;

// phone sprite on the first level
let Phone;
let PhoneSprite;
let PhonePos = { col: 10.5, row: 11.5 };

// the DS on the second level is seperate so that it can start in a different position on screen
let Ds2;
let DS2Sprite;
let DS2Pos = { col: 18, row: 12 };

let charStartX = 21.5; // Character start position
let charStartY = 11.5; // Character start position

// ====== LEVEL 3 (SNAKE GAME) VARIABLES ======
// screen positioning so it fits within the game console background
let screenX = 300;
let screenY = 100;
let screenW = 1700;
let screenH = 1600;

// snake scale (separate from tile scl so they don't conflict)
let snakeScl = 100;

let bgConsole; // game console background image for level 3
let phoneImg;  // falling phone image (used in level 2 and level 3)

//LEVEL DATA OBJECTS

let level0 = {
  //the tile rules establish which tiles are walkable for the sprite
  // 1 represents the walkable tiles whilst 0 represents the walls 
    tileRules : [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //0
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1], //1
      [0, 0, 2, 2,/*DS sprite*/  1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1], //2
      [0, 0, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1], //3
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1], //4     //X Values 
      [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1], //5
      [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1], //6
      [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1], //7
      [0, 0, 1, 1,/* PHONE SPRITE*/  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //8
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //9
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //13
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //0
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //1
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //3
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //18    //X Values 
    ],
  }


  let level1 = { 
  tileRules : [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //0
 
  ],
}

  let level2 = { 
  tileRules : [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //0
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], //0
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], //0
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], //0
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], //0
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], //0
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], //0
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], //0
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], //0
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], //0
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], //0
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], //0
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], //0
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], //0
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], //0
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], //0
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], //0
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //0
 
  ],
}


//LEVEL CONTROL VARIABLES
let levels = [level0, level1, level2];

//the starting level for the sprite
let currentLevel = 0;

// the variable for the tile rules as stated above 
let tileRules;


// ====== PRELOAD ======
function preload() {

  // the images of each facing direction of the sprite are preloaded onto the canvas so that they are ready to use when called for
  // filenames matched exactly to the files visible in the project folder
  SPRITE_CHARACTER_EAST = loadImage('/images/east.png');
  SPRITE_CHARACTER_WEST = loadImage('/images/West.png');
  SPRITE_CHARACTER_SOUTH = loadImage('images/South.png');
  SPRITE_CHARACTER_NORTH = loadImage('/images/North.png');


  // texture[0] = unwalkable tile (bedroom floor), texture[1] = walkable tile (Background1)
  textures[0] = loadImage("/images/bedroom.png");
  textures[1] = loadImage("/images/Background1.png");
  textures[2] = loadImage("/images/ds.png");

  bg1 = loadImage("/images/bedroom.png");                  // level 0 background - the bedroom
  bg2 = loadImage("/images/sunset.jpg");              // level 1 background
  bg3 = loadImage("/images/game_console_background.png");  // level 2 background - game console

  // these sprites will be the ones that the character interacts with to progress the game
  DSSprite = loadImage("/images/ds.png"); // loads the image for the DS sprite
  PhoneSprite = loadImage("/images/phone.png");

  //the random DS on the final level 
  game = loadImage("/images/ds.png");

  //the DS sprite that appears on the second level
  DS2Sprite = loadImage("/images/ds.png");

  //the image for the falling objects on the second level and used in level 3 as well
  phoneImg = loadImage("/images/phone.png");
}


// === SETUP ===
function setup() {
  createCanvas(theCanvasWidth, theCanvasheight);
  frameRate(60); // normal frame rate for levels 0 and 1

  // snake is initialised here but only runs during level 3 (drawStage3)
  s = new Snake();
  pickLocation();


  // the starting background of the game will be the bedroom
  CurrentBG = bg1;

  //loads Graphic data
  loadLevel();

  //the sprite is loaded onto the canvas
  Ds = new DS(DSSprite, DSPos.col * tileSize, DSPos.row * tileSize);
  Phone = new phone(PhoneSprite, PhonePos.col * tileSize, PhonePos.row * tileSize);
  Ds2 = new DS2(DS2Sprite, DS2Pos.col * tileSize, DS2Pos.row * tileSize);

  // resizes the sprites as the file size is small
  SPRITE_CHARACTER_EAST.resize(150, 150);
  SPRITE_CHARACTER_WEST.resize(150, 150);
  SPRITE_CHARACTER_SOUTH.resize(150, 150);
  SPRITE_CHARACTER_NORTH.resize(150, 150);

  PhoneSprite.resize(80, 80);
  DSSprite.resize(80, 80);
  phoneImg.resize(60, 60);

  game.resize(80, 80);
  DS2Sprite.resize(80, 80);

  // the starting background of the game will be the bedroom
}

const FACING_DIRECTION_SOUTH = 0;
const FACING_DIRECTION_EAST = 1;
const FACING_DIRECTION_WEST = 2;
const FACING_DIRECTION_NORTH = 3;


/* establishes the character class - when no keys are being pressed the player will not be moving and start in the bottom right corner. The characters starting
position will be facing south towards the screen */

let character = {

  //affects the starting position and speed of the character
  startTileX: tileSize * charStartX,
  startTileY: tileSize * charStartY,
  velocityX: 0,
  velocityY: 0,
  //the first skin of the character when no keys have been pressed
  facingDirection: FACING_DIRECTION_SOUTH,

  // checks if the tile is walkable for the sprite or the level transitions 
  checkTargetTile() {

  
    let tileX = Math.floor(this.startTileX / tileSize);
    let tileY = Math.floor(this.startTileY / tileSize);

  
    let nextTileX = tileX + Math.sign(this.velocityX);
    let nextTileY = tileY + Math.sign(this.velocityY);

    // bounds check
    if (
      nextTileX >= 0 && nextTileX < tilesX &&
      nextTileY >= 0 && nextTileY < tilesY
    ) {

      let tile = tileRules[nextTileY][nextTileX];

   // if the next tile is = 2 on the tile map the level will change 
      if (tile === 2) {
        currentLevel++;
        loadLevel();

        // when entering level 1 (drawStage2), reset phones
        phones = [];

        // when entering level 2 (drawStage3), reset the snake game
        if (currentLevel === 2) {
          s = new Snake();
          score = 0;
          pickLocation();
          phones = [];
          frameRate(6); // slow frame rate for the snake game
        }

      }
      /* was origionally going to skip two levels with the phone interaction but kept it simple 
      else if (tile === 3){
        currentLevel += 2;
        loadLevel();
      } */

      // movement is only permitted on tiles labelled 0 
      else if (tile !== 0) {
        // TOM FIX: move exactly one tile at a time (grid-based movement)
        this.startTileX = nextTileX * tileSize;
        this.startTileY = nextTileY * tileSize;
      }
    }

    // after keys are pressed the character will stop moving 
    this.velocityX = 0;
    this.velocityY = 0;
  }
};

//updates the characters position and velocity when no key is being pressed
function characterUpdate() {

  //  call collision/tile checking before movement
  character.checkTargetTile();
}

//draws the character in the different positions
function characterDraw() {
  if (character.facingDirection == FACING_DIRECTION_NORTH) {
    image(SPRITE_CHARACTER_NORTH, character.startTileX, character.startTileY);
  } else if (character.facingDirection == FACING_DIRECTION_WEST) {
    image(SPRITE_CHARACTER_WEST, character.startTileX, character.startTileY);
  } else if (character.facingDirection == FACING_DIRECTION_EAST) {
    image(SPRITE_CHARACTER_EAST, character.startTileX, character.startTileY);
  } else if (character.facingDirection == FACING_DIRECTION_SOUTH) {
    image(SPRITE_CHARACTER_SOUTH, character.startTileX, character.startTileY);
  }
}

// ====== SNAKE CLASS ======
// The Snake class is used for level 3. It uses snakeScl instead of scl so it
// doesn't conflict with the tile-based scl used in levels 0/1/2.
function Snake() {
  this.x = 0;
  this.y = 0;

  this.xspeed = 1;
  this.yspeed = 0;

  // array for the tail and also sets the total for the score 
  this.total = 0;
  this.tail = [];

  // sets the direction of the snake seperate from the movement of the sprite 
  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  // tells whether the snake has hit the food or not
  this.eat = function(pos) {
    let d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  };

  //updates the tail for the sprite when they interact with the ds 
  this.update = function() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    // the speed of the snake is affected by the scale of the snake
    this.x += this.xspeed * snakeScl;
    this.y += this.yspeed * snakeScl;

    // reset if snake goes out of the screen area
    if (
      this.x < 0 ||
      this.x > screenW - snakeScl ||
      this.y < 0 ||
      this.y > screenH - snakeScl
    ) {
      resetGame();
    }
  };

  // continues to show the different positions of the character within the snake class
  this.show = function() {
    // draw the tail using the DS image
    for (let i = 0; i < this.tail.length; i++) {
      image(game, this.tail[i].x, this.tail[i].y, 80, 80);
    }

    // show the correct facing direction for the snake head
    let playerImg = SPRITE_CHARACTER_EAST;
    if (this.xspeed === 1)  playerImg = SPRITE_CHARACTER_EAST;
    else if (this.xspeed === -1) playerImg = SPRITE_CHARACTER_WEST;
    else if (this.yspeed === 1)  playerImg = SPRITE_CHARACTER_SOUTH;
    else if (this.yspeed === -1) playerImg = SPRITE_CHARACTER_NORTH;

    // affects the size and position of the sprite 
    image(playerImg, this.x, this.y, 100, 100);
  };
}

// ====== STAGE 1 (Level 0) ======
function drawMaze() {
  CurrentBG = bg1;

  // the character is drawn on screen from the character update and draw function
  characterUpdate();
  characterDraw();


  //obstacles are displayed on screen
  Ds.display();
  Phone.display();

  fill("white");
  stroke ("black");
  strokeWeight ("2")
  textAlign(CENTER);
  textSize(50);
  text("Navigate the maze to get to the DS", width / 2, height / 2);
}


// ====== STAGE 2 (Level 1) ======
function drawStage2() {

  CurrentBG = bg2;

  characterUpdate();
  characterDraw();

  Ds2.display();

  fill("white");
  textAlign(CENTER);
  textSize(30);
  text("Avoid the phones and get to the DS", width / 2, height / 2);

  // MORE PHONES (harder)
  // affects how often the phones fall and the speed of them
  if (frameCount % 15 === 0) {
    for (let i = 0; i < 2; i++) {
      phones.push({
        x: random(width),
        y: -20,
        speed: random(3, 6) // some phones will fall faster than others
      });
    }
  }

  for (let p of phones) {
    p.y += p.speed;
    image(phoneImg, p.x, p.y);

    let px = character.startTileX;
    let py = character.startTileY;

    if (
      p.x < px + 40 &&
      p.x + 30 > px &&
      p.y < py + 40 &&
      p.y + 30 > py
    ) {
      // hit = reset
      character.startTileX = 1;
      character.startTileY = 1;
      phones = [];
    }
  }
}


// ====== STAGE 3 (Level 2) - Snake Game inside game console ======
function drawStage3() {
  // changes the current background to the game console image
  CurrentBG = bg3;

  // draw the game console background stretched to fill the canvas
  image(bg3, 0, 0, width, height);

  // push/translate so all snake game drawing is offset to fit inside the console screen
  push();
  translate(screenX, screenY);

  // draw the screen background colour inside the console
  fill("#ffb6c1");
  noStroke();
  rect(0, 0, screenW, screenH);

  // update and show the snake
  s.update();
  s.show();

  // check if snake eats the DS (food)
  if (s.eat(food)) {
    score++;
    pickLocation();
  }

  // draw the DS food item
  image(game, food.x, food.y, 80, 80);

  // spawn and draw falling phones
  makePhones();
  drawPhonesStage3();

  fill(255);
  textSize(22);
  textAlign(LEFT);
  text("DS: " + score + " / 8", 10, 28);

  if (score >= 8) {
    textAlign(CENTER);
    textSize(42);
    text("YOU WIN!", screenW / 2, screenH / 2);
    noLoop();
  }

  pop();
}

// spawns phones from the top for stage 3, checking they don't spawn too close together
function makePhones() {
  if (frameCount % 5 === 0) {
    let spawnX = random(screenW - 30);

    let tooClose = false;
    for (let p of phones) {
      if (abs(p.x - spawnX) < 60) {
        tooClose = true;
      }
    }

    if (!tooClose) {
      phones.push({
        x: spawnX,
        y: -30,
        speed: random(6, 9) // phone speed
      });
    }
  }
}

// draws falling phones for stage 3 and checks for collision with the snake head
function drawPhonesStage3() {
  for (let i = phones.length - 1; i >= 0; i--) {
    phones[i].y += phones[i].speed;

    image(phoneImg, phones[i].x, phones[i].y, 60, 60);

    // collision check with snake head
    if (
      phones[i].x < s.x + 60 &&
      phones[i].x + 60 > s.x &&
      phones[i].y < s.y + 60 &&
      phones[i].y + 60 > s.y
    ) {
      resetGame();
      return;
    }

    // remove phones that have fallen off screen
    if (phones[i].y > screenH) {
      phones.splice(i, 1);
    }
  }
}

// picks a spot inside the console screen for the DS (food) to appear
function pickLocation() {
  let cols = Math.floor(screenW / snakeScl);
  let rows = Math.floor(screenH / snakeScl);

  food = createVector(
    Math.floor(random(cols)) * snakeScl,
    Math.floor(random(rows)) * snakeScl
  );
}

// reset game and score if game is failed by colliding with a phone or going out of bounds,
// and also resets the snake and phones
function resetGame() {
  s = new Snake();
  phones = [];
  score = 0;
  pickLocation();
}

// function for loading the levels
function loadLevel() {
  //Load graphics data
  tileRules = levels[currentLevel].tileRules;

  let tileID = 0; //ID for each tile

  for (let tileX = 0; tileX < tilesX; tileX++) { //loop for tile creation
    tileMap[tileX] = [];
    for (let tileY = 0; tileY < tilesY; tileY++) {
      // use texture index 1 (background2) as default walkable tile, 0 for unwalkable
      let textureIndex = tileRules[tileY][tileX] === 0 ? 0 : 1;
      tileMap[tileX][tileY] = new Tile(textures[textureIndex], tileX, tileY, tileSize, tileID);
      tileID++;
    }
  }
}


// when each key is pressed the character will move and face in different directions
// TOM FIXES
// During level 3 (snake game), arrow keys control the snake instead of the character
function keyPressed(event) {

  if (currentLevel === 2) {
    // level 3: arrow keys control the snake
    if (event.code === "ArrowLeft")  s.dir(-1, 0);
    else if (event.code === "ArrowUp")    s.dir(0, -1);
    else if (event.code === "ArrowRight") s.dir(1, 0);
    else if (event.code === "ArrowDown")  s.dir(0, 1);

  } else {
    // levels 0 and 1: arrow keys control the tile-based character
    if (event.code == "ArrowLeft") {
      character.velocityX = -10;
      character.velocityY = 0; // FIX
      character.facingDirection = FACING_DIRECTION_WEST;

    } else if (event.code == "ArrowUp") {
      character.velocityX = 0; // FIX
      character.velocityY = -10;
      character.facingDirection = FACING_DIRECTION_NORTH;

    } else if (event.code == "ArrowRight") {
      character.velocityX = 10;
      character.velocityY = 0; // FIX
      character.facingDirection = FACING_DIRECTION_EAST;

    } else if (event.code == "ArrowDown") {
      character.velocityX = 0; // FIX
      character.velocityY = 10;
      character.facingDirection = FACING_DIRECTION_SOUTH;
    }
  }
}


// draws all the variables onto the canvas, learning from previous code.
function draw() {

  image(CurrentBG, 0, 0, width, height);

  if (currentLevel === 0) drawMaze();       // ESTABLISHES THE LEVEL PROGRESSION OF THE GAME
  else if (currentLevel === 1) drawStage2();
  else if (currentLevel === 2) drawStage3();
}


// In order to help me understand objects and classes I turned to moodle and used the class content
class DS {
  constructor(sprite, xPos, yPos) {
    this.sprite = sprite;
    this.xPos = xPos; // x position
    this.yPos = yPos; // y position
  }
  display() {
    image(this.sprite, this.xPos, this.yPos);
  }
}

class phone {
  constructor(sprite, xPos, yPos) {
    this.sprite = sprite;
    this.xPos = xPos;
    this.yPos = yPos;
  }
  display() {
    image(this.sprite, this.xPos, this.yPos);
  }
}

class DS2 {
  constructor(sprite, xPos, yPos) {
    this.sprite = sprite;
    this.xPos = xPos; // x position
    this.yPos = yPos; // y position
  }
  display() {
    image(this.sprite, this.xPos, this.yPos);
  }
}


//the class for the tiles enabling the textures to be displayed on screen when called in the drawing function
class Tile {
  constructor(texture, tileX, tileY, tileSize, tileID) {
    this.texture = texture;
    this.tileX = tileX;
    this.tileY = tileY;
    this.xPos = tileX * tileSize;
    this.yPos = tileY * tileSize;
    this.tileSize = tileSize;
    this.tileID = tileID;
  }

  display() {
    image(this.texture, this.xPos, this.yPos, this.tileSize, this.tileSize);
  }

  debugGrid() {
  }
}

// References : 
// 


// We turned to p5.js to try and work on some screen transitions but later turned to moodle and coding train to work on tile maps to make transitions and movement easier to understand 

/* Reference for collisions to change screen https://www.youtube.com/watch?v=l0HoJHc-63Q. */ 
/* Collisions with sprites example to help me understand collision interactions https://editor.p5js.org/mbardin/sketches/VwxMnvRx */


/* The coding train https://www.youtube.com/watch?v=AaGK-fj-BAM */ 