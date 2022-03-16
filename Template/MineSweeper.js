setTimeout(() => { console.log(Startup()) }, 10)

function lerp(v0, v1, t) {
   return v0 * (1 - t) + v1 * t
}

function PreloadImages(){

   var UpdateImage = new Image(30, 30)
   UpdateImage.src = '/Assets/minesweeper_Pressed.png'

   var UpdateImage = new Image(30, 30)
   UpdateImage.src = '/Assets/minesweeper_Flag.png'

   var UpdateImage = new Image(30, 30)
   UpdateImage.src = '/Assets/minesweeper_Unpressed.png'
}

function Startup() {

   PreloadImages()

   //Create World
   const world = new GameMaker.World(GameMaker.Init(), new GameMaker.Vecter2(0, 0))
   world.backgroundColor = '#202124'

   new GameMaker.Plugins.Mouse(world)

   //Create Tiles
   for (let X = 0; X < 10; X++) {

      for (let Y = 0; Y < 10; Y++) {

         var Tile = new GameMaker.ImageSprite("TileObject", new GameMaker.Vecter2(100 + (X * 60), 100 + (Y * 60)), new GameMaker.Vecter2(60, 60), 0, '/Assets/minesweeper_Unpressed.png')
         Tile.ID = (Y + (10 * X))
         Tile.Pressed = false
         Tile.Bomb = false
         Tile.Flaged = false
         world.addobjects(Tile)
      }
   }

   var Text = new GameMaker.TextSprite("FPS", new GameMaker.Vecter2(1, 1), 0, "FPS: ")
   Text.font = "Consolas"
   world.addobjects(Text)

   var Selected = new GameMaker.ShapeSprite("Selected", new GameMaker.Vecter2(-60, -60), new GameMaker.Vecter2(60, 60), 0, "#ffffff")
   Selected.opacity = 20
   Selected.Neededpos = new GameMaker.Vecter2(-30, -30)
   world.addobjects(Selected)

   var FPS = 0

   world.canvas.addEventListener("mousedown", function (e) {

      var SelectedObject = world.objects.find(object => object.ID === Selected.SelectedID)

      if (e.button == 0 && SelectedObject.Flaged == false) {

         var UpdateImage = new Image(30, 30)
         UpdateImage.src = '/Assets/minesweeper_Pressed.png'

         SelectedObject.imageObject = UpdateImage
         SelectedObject.Pressed = true

      }
      if (e.button == 2) {

         if (SelectedObject.Pressed) {return}

         SelectedObject.Flaged = !SelectedObject.Flaged

         if (SelectedObject.Flaged == true){

            var UpdateImage = new Image(30, 30)
            UpdateImage.src = '/Assets/minesweeper_Flag.png'
   
            SelectedObject.imageObject = UpdateImage

         } else {

            var UpdateImage = new Image(30, 30)
            UpdateImage.src = '/Assets/minesweeper_Unpressed.png'
   
            SelectedObject.imageObject = UpdateImage

         }
            
      }

   })


   //Update the screen
   setInterval(() => {

      world.objects.forEach((Object) => {

         if (Object.name != "TileObject") { return }

         if (((world.plugins.mouse.pos.X >= (Object.pos.X - (Object.size.X / 2))) && (world.plugins.mouse.pos.Y >= (Object.pos.Y - (Object.size.Y / 2)))) && ((world.plugins.mouse.pos.X <= (Object.pos.X + (Object.size.X / 2))) && (world.plugins.mouse.pos.Y <= (Object.pos.Y + (Object.size.Y / 2))))) {
            Selected.Neededpos = Object.pos
            Selected.SelectedID = Object.ID
         }
      })

      Selected.pos = new GameMaker.Vecter2(lerp(Selected.pos.X, Selected.Neededpos.X, 0.2), lerp(Selected.pos.Y, Selected.Neededpos.Y, 0.2))

      world.render()

      FPS += 1

   }, 1000 / 120)

   //Calculate FPS
   setInterval(() => {

      Text.text = `FPS: ${FPS * 4}`
      FPS = 0

   }, 250)

   return world

}