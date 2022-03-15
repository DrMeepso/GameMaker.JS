const GameMaker = {

   Init: function () {

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
      constructor(canvas, gravity) {
         this.canvas = canvas
         this.canvasContext = canvas.getContext('2d');
         this.gravity = gravity
         this.objects = []
         this.plugins = {}
         this.addobjects = function (Object) {

            this.objects.push(Object)

         }

         this.canvasContext.save()

         this.render = function () {

            this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.objects.forEach((object) => {

               switch(object.type){

                  case "ShapeSprite":

                     this.canvasContext.translate(object.pos.X, object.pos.Y)

                     this.canvasContext.rotate(object.angle * Math.PI / 180)

                     this.canvasContext.fillStyle = object.color
                     this.canvasContext.fillRect(-object.size.X / 2, -object.size.Y / 2, object.size.X, object.size.Y)

                     this.canvasContext.restore()
                     this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);


                  break


               }

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
      constructor(Name, Position, Size, Angle) {

         this.type = "BaseObject"
         this.pos = Position
         this.name = Name
         this.size = Size
         this.angle = Angle

      }
   },

   BasePlugin: class BasePlugin {
      constructor(World) {

         this.world = World
         this.type = "BasePlugin"

      }
   },

   Plugins: {}

}

GameMaker.ImageSprite = class ImageSprite extends GameMaker.BaseObject {
   constructor(Name, Position, Size, Angle, ImageURL) {

      super(Name, Position, Size, Angle)
      this.type = "ImageSprite"
      this.image = ImageURL

   }
}

GameMaker.ShapeSprite = class ShapeSprite extends GameMaker.BaseObject {
   constructor(Name, Position, Size, Angle, Color) {

      super(Name, Position, Size, Angle)
      this.type = "ShapeSprite"
      this.color = Color

   }
}

GameMaker.Plugins.Mouse = class Mouse extends GameMaker.BasePlugin {
   constructor(World) {

      super(World)
      this.type = "Mouse"
      this.world.plugins.mouse = {}
      this.world.plugins.mouse.pos = new GameMaker.Vecter2(0, 0)

      var CurrentWorld = this.world

      this.world.canvas.addEventListener("mousemove", function (e) {

         var cRect = CurrentWorld.canvas.getBoundingClientRect();
         var canvasX = Math.round(e.clientX - cRect.left);
         var canvasY = Math.round(e.clientY - cRect.top);

         this.pos = new GameMaker.Vecter2(canvasX, canvasY)
         CurrentWorld.plugins.mouse.pos = this.pos

      })

   }
}

GameMaker.Plugins.Keybord = class Keybord extends GameMaker.BasePlugin {
   constructor(World) {

      super(World)
      this.type = "Keybord"
      this.world.plugins.keybord = { down: [] }

      this.isKeyDown = (key) => {
         if (keys[key] != undefined) {

            return True

         } else {

            return False

         }
      }

      var keys = this.world.plugins.keybord.down

      window.addEventListener("keydown",
         function (e) {
            keys[e.keyCode] = true;
         },
         false);

      window.addEventListener('keyup',
         function (e) {
            keys[e.keyCode] = undefined;
         },
         false);

   }
}



console.log("GameMaker Started")
