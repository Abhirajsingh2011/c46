var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie
var zombieGroup
var zombieImage
var bullet
var bulletGroup
var belletImage
var score=0
var life=0
var bullets=100
var heart1
var heart2
var heart3
var heart1Image
var heart2Image
var heart3Image
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bulletImage = loadImage("assets/bullet.png")
  bgImg = loadImage("assets/bg.jpeg")
  zombieImage = loadImage("assets/zombie.png")
  heart1Image = loadImage("assets/heart_1.png")
  heart2Image = loadImage("assets/heart_2.png")
  heart3Image = loadImage("assets/heart_3.png")
}


function setup() {

  zombieGroup = new Group()
  bulletGroup = new Group()
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  heart1=createSprite(displayWidth-150,40,20,20)
  heart1.addImage(heart1Image)
  heart1.scale = 0.5

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,250,300)


}

function draw() {
  background(0); 
spawnZombies()



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 bullet = createSprite(displayWidth-1150,player.y-30,20,10)
 bullet.addImage("bullet",bulletImage)
 bullet.velocityX=20
 bulletGroup.add(bullet)
 bullet.scale = 0.04
 if (bullets>0)
 {
  bullets=bullets-1
 }
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if (zombieGroup.isTouching(bulletGroup))
{
  for(var i=0; i<zombieGroup.length; i++)
  {
    if (zombieGroup[i].isTouching(bulletGroup))
    {
      zombieGroup[i].destroy()
      bulletGroup.destroyEach()
      score = score+1
    }
  }
}
if (zombieGroup.isTouching(player))
{
  for(var i=0; i<zombieGroup.length; i++)
  {
    if (zombieGroup[i].isTouching(player))
    {
      zombieGroup.destroyEach()
      life = life-1
    }
  }
}
drawSprites();
textSize(20)
fill("white")
text("Score : "+score, displayWidth-230, displayHeight/2-280)
text("Life : "+life, displayWidth-230, displayHeight/2-250)
text("Bullet : "+bullets, displayWidth-230, displayHeight/2-220)
}
function spawnZombies(){
  if (frameCount%60===0)
{
  zombie = createSprite(random(500,1100),random(100,500,50,50))
  zombie.addImage(zombieImage)
  zombie.velocityX=-3
  zombie.scale = 0.15
  zombie.lifetime = 500
  zombieGroup.add(zombie)
  zombie.debug=true
  zombie.setCollider("rectangle",0,0,350,900)
}
}