var backgroundimg,backgroundsprite
var obstop1,obstop2;
var obsbottom1,obsbottom2,obsbottom3;
var gameState="play"
var topObstacleGroup,bottomObstacleGroup;
var restart,restartimg;
var gameover,gameoverimg
var jumpsound,diesound;
var score=0;
var ani


function preload ()
{
backgroundimg=loadImage("assets/bg.png");
balloonimg=loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png");
obstop1 = loadImage("assets/obsTop1.png");
obstop2 = loadImage("assets/obsTop2.png");
obsbottom1 = loadImage("assets/obsBottom1.png");
obsbottom2 = loadImage("assets/obsBottom2.png");
obsbottom3 = loadImage("assets/obsBottom3.png");
restartimg = loadImage("assets/restart.png");
gameoverimg = loadImage("assets/gameOver.png");
jumpsound = loadSound("assets/jump.mp3");
diesound = loadSound("assets/die.mp3");
ani = loadAnimation("assets/balloon1.png")
}
function setup()
{
  createCanvas(800,800);

  
backgroundsprite = createSprite(400,400,200,220);
backgroundsprite.addImage(backgroundimg);
balloon = createSprite(100,200,50,50);
balloon.addAnimation("balloonn",balloonimg);
balloon.addAnimation("anim",ani);
balloon.scale=0.5;
topObstacleGroup=new Group();
bottomObstacleGroup = new Group();
gameover = createSprite(400,400,20,20);
      gameover.addImage(gameoverimg);
      restart = createSprite(400,500,20,20);
      restart.addImage(restartimg);
      gameover.visible = false;
      restart.visible = false;



}
function draw()
{
    background("white");
    drawSprites();
    textSize(30);
    text("Score:"+score,650,60);
    
    
    
    
    

    if(gameState==="play"){
      score=score+Math.round(getFrameRate()/60)

      if(keyWentDown(UP_ARROW)){
        balloon.velocityY=-5;
        jumpsound.play();
      }
      balloon.velocityY=balloon.velocityY+0.3;
      spawnTopObstacles();
    spawnBotttomObstacles();
     if(topObstacleGroup.isTouching(balloon)||bottomObstacleGroup.isTouching(balloon)){
       diesound.play();
       gameState="end"
       
     }
     if(balloon.y>=800||balloon.y<=0){
       diesound.play();
       gameState="end";
     }
    }else if(gameState==="end"){
      balloon.velocityY=0;
      topObstacleGroup.setVelocityXEach(0);
      bottomObstacleGroup.setVelocityXEach(0);
      topObstacleGroup.setLifetimeEach(-1);
      bottomObstacleGroup.setLifetimeEach(-1);
      gameover.visible=true;
      restart.visible=true;
      balloon.changeAnimation("anim",ani);
      
      balloon.y=400;

      if(mousePressedOver(restart)){
        reset ();
      }
      
      
    }

}

function spawnTopObstacles()
{
  if(frameCount% 100===0){
  topobstacle1 = createSprite(800,200,50,50);
  topobstacle1.velocityX = -(4+3*score/100);
  topobstacle1.y = Math.round(random(50,200));
  var num = Math.round(random(1,2))
  switch(num){
    case 1: topobstacle1.addImage(obstop1);
           break;
    case 2: topobstacle1.addImage(obstop2);
           break;


  }
  topobstacle1.scale = 0.2;
  topobstacle1.lifetime=200;
  topObstacleGroup.add(topobstacle1);
}

}
function spawnBotttomObstacles (){

  if(frameCount% 150===0){
    bottomobs = createSprite(800,675,50,50);
    bottomobs.velocityX = -(4+3+3*score/100);
    var num = Math.round(random(1,3))
    switch(num){
      case 1 : bottomobs.addImage(obsbottom1);
             break;
      case 2 : bottomobs.addImage(obsbottom2);
             break;
      case 3 : bottomobs.addImage(obsbottom3);
             break;
    }
    bottomobs.scale =0.1;
    bottomobs.lifetime=200;
    bottomObstacleGroup.add(bottomobs);
  }
}

function reset(){
  gameState = "play";
  bottomObstacleGroup.destroyEach();
  topObstacleGroup.destroyEach();
  score = 0
  gameover.visible=false;
  restart.visible=false;
  balloon.changeAnimation("balloonn",balloonimg);

}














