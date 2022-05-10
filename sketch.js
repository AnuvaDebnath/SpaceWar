var spacecraft,alienGroup,protectionWallGroup;
var humanSpaceCraftImg,AlienSpaceShipImg,AlienPositon="topleft";
var aBullet,lives=3;

function preload() {
humanSpaceCraftImg = loadImage("spaceCraft.png");
AlienSpaceShipImg = loadImage("humanSpaceCraft.png");
protectionWallImg = loadImage("protection wall.png");
}
 
function setup() {
  createCanvas(windowWidth,windowHeight);

  createEdgeSprites()

  alienGroup = new Group();
  protectionWallGroup = new Group();
  sBulletGroup = new Group();
  aBulletGroup = new Group();

  createAlien(100);
  createAlien(150);
  createAlien(200); 
  createAlien(250);
  createAlien(50);

  createProtectionWall();

  spacecraft = createSprite(width/2,height-80,10,10);
  spacecraft.addImage(humanSpaceCraftImg);
  spacecraft.scale = 0.2;
}

function draw() {
  background("black");  

  textSize(30);
  fill("green");
  text("lives = "+lives,width - 150,100)

  if(keyDown(RIGHT_ARROW) && spacecraft.x < width-100){
    spacecraft.x += 10
  }

  if(keyDown(LEFT_ARROW) && spacecraft.x > 100){
    spacecraft.x -= 10
  }

  if(keyDown("space") && frameCount%30 == 0){
    var sBullet = createSprite(spacecraft.x,spacecraft.y,10,10);
    sBullet.velocityY = -3;
    sBulletGroup.add(sBullet);
  }

  sBulletGroup.overlap(alienGroup,function(collector,collected){
    collected.remove();
    collector.remove();
  })

  if(frameCount%20 == 0 && lives > 0){
    r = Math.round(random(1,alienGroup.length));
    aBullet = createSprite(alienGroup[r-1].x,alienGroup[r-1].y,10,10)
    aBullet.velocityY = 5;
    aBulletGroup.add(aBullet);
  }
  
  aBulletGroup.overlap(spacecraft,function(collector,collected){
    lives -= 1;
    collector.remove();
  })

  aBulletGroup.overlap(protectionWallGroup,function(collector,collected){
    collector.remove();
  })

  sBulletGroup.overlap(protectionWallGroup,function(collector,collected){
    collector.remove();
  })

  if(alienGroup.length == 0){
    swal({
      title: `Awesome!`,
      text: "Congrats! you have saved your world",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }
  
  if(lives <= 0){
    spacecraft.destroy();
    swal({
      title: `Game Over`,
      text: "Oops you lost your world....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }

  if(frameCount%100 == 0){
    switch(AlienPositon){
      case "topleft":
        alienGroup.setVelocityXEach(0);
      alienGroup.setVelocityYEach(1);
      AlienPositon ="bottomleft"
      break;

      case "bottomleft":
        alienGroup.setVelocityXEach(1);
        alienGroup.setVelocityYEach(0);
        AlienPositon ="bottomright"
        break;

      case "bottomright":
        alienGroup.setVelocityXEach(0);
      alienGroup.setVelocityYEach(-1);
      AlienPositon ="topright"
      break;

      case "topright":
        alienGroup.setVelocityXEach(-1);
      alienGroup.setVelocityYEach(0);
      AlienPositon ="topleft"
      break;

      default:break;
    }
  }
  drawSprites();
}

function createAlien(y){
  var x = 200;
  for(var i = 0;i < 10;i ++){
    var alien = createSprite(x,y,50,10);
    alien.addImage(AlienSpaceShipImg);
    alien.scale = 0.1;
    alienGroup.add(alien);
    x = x+100;
  }
}

function createProtectionWall(){
  var x = 250;
  for(var i =0;i < 4;i++){
    var wall = createSprite(x,height - 200,100,1000);
    wall.addImage(protectionWallImg);
    protectionWallGroup.add(wall);
    x = x +300;
  }
}
