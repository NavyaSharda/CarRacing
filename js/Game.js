class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gamestate');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gamestate: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playercount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();

      car1=createSprite(200,400)
      car2=createSprite(400,400)
      car3=createSprite(600,400)
      car4=createSprite(800,400)

      cars=[car1,car2,car3,car4]
    }
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    player.getPlayerInfo()

    var pindex=0
    var x=0
    var y 

    for(var i in allPlayers){
      pindex += 1
      x=x+200
      y= displayHeight-allPlayers[i].distance

      cars[pindex-1].x=x
      cars[pindex-1].y=y
      if(pindex == player.index){
        cars[pindex-1].shapeColor="blue"
        camera.position.x=displayWidth/2
        camera.position.y=cars[pindex-1].y
      }
    }
    if(keyIsDown(UP_ARROW)&& player.index !== null){
      player.distance += 20
      player.updatePlayer()
    }
    drawSprites()

   
}
}