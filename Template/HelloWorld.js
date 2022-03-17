//In this file we will create a black cube on the screen and make it follow the mouse position
//I know this isnt Hello World but its the easyist thing i could come up with

setTimeout(() => { console.log(Startup()) }, 10)

function Startup() {

    //Create World
    const world = new GameMaker.World(GameMaker.Init(), new GameMaker.Vector2(0, 0))

    //Create HTML image just becuase
    var HTMLSprite = new GameMaker.ImageSprite("HTML", new GameMaker.Vector2(0, 0), new GameMaker.Vector2(250, 300), 0, 'HTML.png')
    world.addobjects(HTMLSprite)

    //Create and add a Shape Sprite to the current world
    var MouseSprite = new GameMaker.ShapeSprite("TestObject", new GameMaker.Vector2(0, 0), new GameMaker.Vector2(15, 15), 0, '#cf4e4e')
    world.addobjects(MouseSprite)

    //Do the same here but with a diffrent color
    var MouseSpriteHover = new GameMaker.ShapeSprite("TestObject2", new GameMaker.Vector2(0, 0), new GameMaker.Vector2(15, 15), 0, '#4ecfa8')
    world.addobjects(MouseSpriteHover)

    //Load the mouse plugin so we can get info about mos position
    var Mouse = new GameMaker.Plugins.Mouse(world)
    var Keyboard = new GameMaker.Plugins.Keyboard(world)

    var Roto = 0

    //Update the screen
    setInterval(() => {

        HTMLSprite.pos = new GameMaker.Vector2(world.canvas.width/2,world.canvas.height/2)

        //Make cubes spin around the mouse
        Roto += 0.1

        MouseSpriteHover.pos.X = world.plugins.mouse.pos.X + Math.cos(Roto) * 25
        MouseSpriteHover.pos.Y = world.plugins.mouse.pos.Y + Math.sin(Roto) * 25
        MouseSpriteHover.angle = MouseSpriteHover.pos.angle(world.plugins.mouse.pos)

        MouseSprite.pos.X = world.plugins.mouse.pos.X + Math.cos(Roto) * -25
        MouseSprite.pos.Y = world.plugins.mouse.pos.Y + Math.sin(Roto) * -25
        MouseSprite.angle = MouseSpriteHover.pos.angle(world.plugins.mouse.pos)

        //Render the world to the screen
        world.render()

    }, 1000 / 60)

   return world

}