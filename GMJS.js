const GameMaker = {

   Init: function(){

      var Canvas = document.createElement('canvas')
      Canvas.className = "GameMakerCanvas"
   
      resizeCanvas()

      document.body.append(Canvas)
      window.addEventListener('resize', resizeCanvas, false);
        
      function resizeCanvas() {
         Canvas.width = window.innerWidth;
         Canvas.height = window.innerHeight;
         Canvas.style.position = 'absolute'
         Canvas.style.top = '0px'
         Canvas.style.left = '0px'
      }

      return Canvas

   },
   
   World: class World {
      constructor(canvas,gravity) {
         this.canvas = canvas
         this.canvasContext = canvas.getContext('2d');
         this.gravity = gravity
         this.objects = []
         this.plugins = {}
         this.addobjects = function(Object){

            this.objects.push(Object)

         }
         this.render = function(){

            this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.objects.forEach((object) => {

               this.canvasContext.fillRect(object.pos.X,object.pos.Y,object.size.X,object.size.Y)
            
            })

         }
      }
   },
   
   Vecter2: class Vecter2 {
      constructor(X, Y) {
         this.X = X;
         this.Y = Y;
      }
   },

   BaseObject: class BaseObject {
      constructor(Name, Position, Size) {
   
         this.type = "BaseObject"
         this.pos = Position
         this.name = Name
         this.size = Size

      }
   },

   Plugins: {}

}

GameMaker.ImageSprite = class ImageSprite extends GameMaker.BaseObject {
      constructor(Name, Position, Size, ImageURL) {
   
         super(Name, Position, Size)
         this.type = "ImageSprite"
         this.image = ImageURL

      }
}

GameMaker.ShapeSprite = class ShapeSprite extends GameMaker.BaseObject {
      constructor(Name, Position, Size, Color) {
   
         super(Name, Position, Size)
         this.type = "ShapeSprite"
         this.color = Color

      }
}

GameMaker.Plugins.Mouse = class Mouse extends GameMaker.BaseObject {
      constructor(Name, World) {
   
         super(Name, new GameMaker.Vecter2(-1,-1), new GameMaker.Vecter2(10,10))
         this.type = "Mouse"
         World.plugins.mouse = {}
         World.plugins.mouse.pos = new GameMaker.Vecter2(0,0)

         World.canvas.addEventListener("mousemove", function(e) { 
            var cRect = World.canvas.getBoundingClientRect();
            var canvasX = Math.round(e.clientX - cRect.left);
            var canvasY = Math.round(e.clientY - cRect.top);

            this.pos = new GameMaker.Vecter2(canvasX, canvasY)  
            World.plugins.mouse.pos = this.pos  

         })
         
      }
}

GameMaker.Plugins.Keybord = class Keybord extends GameMaker.BaseObject {
      constructor(Name, World) {
   
         super(Name, new GameMaker.Vecter2(-1,-1), new GameMaker.Vecter2(10,10))
         this.type = "Keybord"
         World.plugins.keybord = {down: []}

         this.isKeyDown = (key) => {

         if (keys[key] != undefined)
            
            return True

         } else {

            return False

         }

         var keys = World.plugins.keybord.down

         window.addEventListener("keydown",
            function(e){
               keys[e.keyCode] = true;
            },
         false);

         window.addEventListener('keyup',
            function(e){
               keys[e.keyCode] = undefined;
            },
         false);
         
      }
}



console.log("GameMaker Started")