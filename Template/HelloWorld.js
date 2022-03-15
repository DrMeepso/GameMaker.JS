//In this file we will create a black cube on the screen and make it follow the mouse position
//I know this isnt Hello World but its the easyist thing i could come up with

//Create World
const world = new GameMaker.World(GameMaker.Init(), new GameMaker.Vecter2(0,0))

//Create and add a Shape Sprite to the current world
var MouseSprite = new GameMaker.ShapeSprite("TestObject", new GameMaker.Vecter2(1,1), new GameMaker.Vecter2(15,15), 0, '#cf4e4e')
world.addobjects(MouseSprite)

var MouseSpriteHover = new GameMaker.ShapeSprite("TestObject", new GameMaker.Vecter2(0,0), new GameMaker.Vecter2(15,15), 0, '#4ecfa8')
world.addobjects(MouseSpriteHover)

//Load the mouse plugin so we can get info about mos position
var Mouse = new GameMaker.Plugins.Mouse(world)
var Keybord = new GameMaker.Plugins.Keybord(world)

//Create Roto var in the scope
var Roto = 0

//Update the screen
setInterval( () => {

    //Set The MouseSprite's position to the position on the mouse
    MouseSprite.pos = world.plugins.mouse.pos
    MouseSprite.angle += 1

    //Make 2nd cube spin around the mouse
    Roto += 0.2
    MouseSpriteHover.pos.X = world.plugins.mouse.pos.X + Math.cos(Roto) * 50
    MouseSpriteHover.pos.Y = world.plugins.mouse.pos.Y + Math.sin(Roto) * 50
    
    //Render the world to the screen
    world.render()
    
} ,1000/60)
