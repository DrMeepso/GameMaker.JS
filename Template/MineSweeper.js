//In this file we will create a black cube on the screen and make it follow the mouse position
//I know this isnt Hello World but its the easyist thing i could come up with

// #aad751
// #a2d149

// #d7b899
// #e5c29f

// #b9dd77

setTimeout(() => { console.log(Startup()) }, 10)

function getColor(Value) {

   if (Value % 2 == 0) {

      return '#aad751'

   } else {

      return '#a2d149'

   }


}

function lerp(v0, v1, t) {
    return v0*(1-t)+v1*t
}

function Startup() {

    //Create World
    const world = new GameMaker.World(GameMaker.Init(), new GameMaker.Vecter2(0, 0))
    world.backgroundColor = '#202124'

    new GameMaker.Plugins.Mouse(world)

    var Text = new GameMaker.TextSprite("FPS", new GameMaker.Vecter2(0,0),0,"FPS: ")
    world.addobjects(Text)

    //Create Tiles
    for (let X = 0; X < 10; X++) {
      
      for (let Y = 0; Y < 10; Y++) {
      
         var Tile = new GameMaker.ShapeSprite("TileObject", new GameMaker.Vecter2( 50 +(X * 30), 50 + (Y * 30)), new GameMaker.Vecter2(30, 30), 0, getColor(X + Y))
         Tile.basicColor = getColor(X + Y)
         Tile.ID = (Y + (10 * X))
         Tile.Pressed = false
         world.addobjects(Tile)
      }
    }

    var Selected = new GameMaker.ShapeSprite("Selected", new GameMaker.Vecter2(0,0), new GameMaker.Vecter2(30, 30), 0, "#ffffff")
    Selected.opacity = 20
    Selected.Neededpos = new GameMaker.Vecter2(0,0)
    world.addobjects(Selected)

    var FPS = 0

    world.canvas.addEventListener("mousedown", function (e) {

      console.log(e)  

    })


    //Update the screen
    setInterval(() => {

         // Highlight selected tile
         world.objects.forEach( (Object) => {

            if (Object.name != "TileObject") {return}

            if (((world.plugins.mouse.pos.X >= (Object.pos.X - (Object.size.X / 2))) && (world.plugins.mouse.pos.Y >= (Object.pos.Y - (Object.size.Y / 2)))) && ((world.plugins.mouse.pos.X <= (Object.pos.X + (Object.size.X / 2))) && (world.plugins.mouse.pos.Y <= (Object.pos.Y + (Object.size.Y / 2))))) {
               Selected.Neededpos = Object.pos
               Selected.SelectedID = Object.ID
            }     
         })
        
         Selected.pos = new GameMaker.Vecter2(lerp(Selected.pos.X, Selected.Neededpos.X, 0.4),lerp(Selected.pos.Y, Selected.Neededpos.Y, 0.4))

         if (world.objects.find( object => object.ID === Selected.SelectedID ).basicColor == '#aad751') {

            world.objects.find( object => object.ID === Selected.SelectedID ).color = '#e5c29f'

         }
         if (world.objects.find( object => object.ID === Selected.SelectedID ).basicColor == '#a2d149') {

            world.objects.find( object => object.ID === Selected.SelectedID ).color = '#d7b899'

         }

        //Render the world to the screen
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