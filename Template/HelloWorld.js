//In this file we will create a black cube on the screen and make it follow the mouse position
//I know this isnt Hello World but its the easyist thing i could come up with

//Create World
const world = new GameMaker.World(GameMaker.Init(), new GameMaker.Vecter2(0,0))

//Create and add a Shape Sprite to the current world
var MouseSprite = new GameMaker.ShapeSprite("TestObject", new GameMaker.Vecter2(1,1), new GameMaker.Vecter2(15,15))
world.addobjects(MouseSprite)

//Load the mouse plugin so we can get info about mos position
var Mouse = new GameMaker.Plugins.Mouse("Mouse", world)

//Update the screen
setInterval( () => {

    //Set The MouseSprite's position to the position on the mouse
    MouseSprite.pos = world.plugins.mouse.pos

    //Render the world to the screen
    world.render()
    
} ,1/60)
