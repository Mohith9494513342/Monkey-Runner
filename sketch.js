var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey , monkey_running,ground,banana;
var banana ,bananaImage, obstacle, obstacleImage,monkeyImage;
var FoodGroup, obstacleGroup
var score=0;

function preload(){
  
monkeyImage=loadAnimation("sprite_0.png","sprite_1.png");  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
createCanvas(700,400);  
monkey=createSprite(80,330,20,20);  
monkey.addAnimation( "running",monkey_running); 
monkey.scale=0.2;  
  
ground=createSprite(0,400,2000,20);  
ground.velocityX=-4;
ground.x=ground.width/2;  
  
FoodGroup = createGroup();  
obstacleGroup=createGroup();  
  
 monkey.setCollider("rectangle",-50,-50,monkey.width,  monkey.height);
monkey.debug = true  
}


function draw() {
background("blue");
 if(ground.x<0){
   ground.x=0;
 } 
  
  
  
  
monkey.collide(ground);  
 if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }  
monkey.velocityY = monkey.velocityY + 0.8

spawnObstacle();  
  
function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 170;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  } 
}


function spawnObstacle(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(600,370,10,40);
      obstacle.addImage(obstacleImage);
      obstacle.velocityX=-3;
   
    //generate random obstacles
    var rand = Math.round(random(1,350));
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 170;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}  

  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  }
console.log(gameState);
 drawSprites(); 

if(gameState === PLAY){
    
    if(monkey.isTouching( FoodGroup)){
       FoodGroup.visible=false;
       }
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
  text("Survival time"+score,500,50);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnBanana();
  
    //spawn obstacles on the ground
    spawnObstacle();  
    
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  }
   else if (gameState === END) {
     monkey.visible=false;
text("PRESS ENTER TO RESTART",300,200);     
if(keyDown("ENTER")){
  gameState=PLAY;
  score=0;
}  
text("SURVIVAL TIME:"+score,320,220);
ground.velocityX = 0;
monkey.velocityY=0;  
monkey.changeAnimation("running",monkeyImage);      
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     FoodGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);    
   }
    

}







