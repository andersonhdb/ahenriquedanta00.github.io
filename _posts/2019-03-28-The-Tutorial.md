# Command Pattern - Input manager Tutorial:
### A practical approach to the Command design pattern.

*The golden rule of problem solving is that a hammer is not a screwdrive.* 

*Disclaimer: this tutorial originally was supposed to be a flyweight application tutorial. But due to issues with Babylon.js documentation and implementation, the project began to become way more complex than an entr tutorial is supposed to be. Therefore a shift on the tutorial content was called for. Turned out that this application is more appropriate to a begginer in Babylon*

Hello, this is my first tutorial. Ever. So, any comments and constructive feedback on it will be well appreciated. I have created an interactive summary, so you'll might have an easier time navigating this document. 
Also, if there any request on a tutorial implementation of a specific design pattern, I'm all ears (actually no, I also have a pair of hand... My Lovecraftian anatomy is kind of weird...).

## Summary:

1. [Motivation](#motivation)
2. [Required Knowledge](#required-knowledge)
3. [Not Included](#not-included)
3. [The Situation](#the-situation)
4. [The Problem](#the-problem)
5. [The Solution](#the-solution)
6. [The Implementation](#the-implementation)
7. [References](#references)

## Motivation:

So, it turns out that many game developers and programmers have no idea of the design patterns known to humankind beyond the Singleton. And if they have, it is mostly the notion that they are useful in some cases and not others, they require more coding and planning and that's a bother to keep in mental space, so why should anybody care?  

Now, in these (hopefully) series of tutorials I'll provide examples that will decrease resistance on how to apply a pattern to solve a specific problem and show real applications of those patterns. Also, there will be some references at the end of this post where you may find more information. Two of them are the books where those patterns are explained (though they might be confusing at times) and I would strongly advise to check them out to find more about Design Patterns.

The following two sections are helpful disclaimers to ease the expectations a bit.

## Required Knowledge:

I want to make these tutorials as accessible as possible. So, at least on this one I'll put each step in a level that, if you understand JavaScript and can create an empty Babylon application with a cube and a camera that looks at the cube, then it should be followable... The flipside of this is that, at least this first tutorial, will be a bit longer. If you do not know how to create a simpler Babylon scene, then you'll find in the references a link to a basic Babylon tutorial.

## Not included:

As this tutorial will be long enough as it is, we will be using the Babylon's meshBuilder shapes. So, this means that we will not use custom models from Blender (much to my dismay).

Now, without further ado, let's introduce one situation where the Command pattern applies:

## The Situation:

You want to create a game where you can control more than one character.

You have a team of 3 helicopters, and you want to switch the control from one helicopter to another by pressing the 'Q' and 'E' buttons. Each helicopter is controlled with tank controls ('W' and 'S' move the activated helicopter forward and backward respectively. 'A' and 'D' will turn the helicopter counter-clockwise and clockwise respectively).

## The problem:

One of these 2 situations are flying (no pun intended) through your mind right now: 

1. you either have no idea on how to do this. 
2. Creating game flags to indicate which helicopter is being controlled and closely manage those flags. Also, hard code the input in each case to manage the helicopter.

Now here is my computational definition flags:

>It is a necessary use of memory space on Booleans that should be avoided as much as possible as it does not scale as the number of manageable increase, pollutes code and its complexity tends to get out of control too quickly after two weeks that you have not touched the code.

As if that is not enough, when you hard code the inputs for each helicopter, implementing custom controls is a nightmare (as you need to flag your inputs as well). To complete the whole point as to why you should implement the Command pattern, the game might require in the future that each helicopter will have a different action that might be associated with more than one button (say: red helicopter is a fire fighter that can syphon lake water when you are hovering over a lake and shoot water to quench fire, while yellow helicopter is a rescue helicopter that can lower a ladder to rescue people in the middle of the forest).

## The solution:

Separate the game input logic from character behaviour logic, and connect them through the command pattern.

The command pattern is a solution to "transform a function into an object". The merit of doing such a thing is that you can make references to the command functions and send them to and from other objects. this allows for you input manager to send commands to your game objects.

## The implementation:

### Step 1: Structure

Let’s start with how our files will be organized and structured by the end of this tutorial:

* Application
    * Index.html
    * Babylon
        * Scene.js
        * scripts
            * Commands.js
            * Helicopter_Definition.js
            * Input_manager.js

#### Setp2: Let's create a template babylon application:

Let's start with our Index.html. This is the page where the application will run. Let's take a look at the starter version:

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Helicopter Squad</title>

        <style>
            html, body {
                overflow: hidden;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
            }

            #renderCanvas {
                width: 100%;
                height: 100%;
                touch-action: none;
            }
        </style>

        <script src="https://cdn.babylonjs.com/babylon.js"></script>
        <script src="https://preview.babylonjs.com/loaders/babylonjs.loaders.min.js"></script>
        <script src="https://code.jquery.com/pep/0.4.3/pep.js"></script>
    </head>

   <body>

    <canvas id="babylonCanvas" touch-action="none"></canvas> //touch-action="none" for best results from PEP

   </body>

    <!--All the scripts will go bellow-->

</html>
```

As this is the starting point of the tutorial, I would advise just coping and pasting this first piece of code and let's go modifying it as we proceed. This file is almost the exact same as the standard Babylon Template. But there are three differences: First There is no script for the Babylon Canvas. Second: the canvas id was changed to "*babylonCanvas*" (The main reason, is that it is more self descriptive, considering that in other projects more html might be added around this canvas element). Lastly the title of the page now is "*Helicopter Squad*".

### Step 3: creating Engine references

Now let's add references to the game engine so multiple scripts may refer to it.

In the index.html document right bellow the '<!--All the scripts will go bellow-->' line write this small script:

```html
<!--All the scripts will go bellow-->
<script>
    var canvas = document.getElementById("babylonCanvas"); // Get the canvas element 
    var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
</script>
```
these two lines inside the script create an initialized Babylon engine reference. All scripts listed bellow this one can use the engine methods through the 'engine' variable.

### Step 3: Let's create our scene! Camera! Lights! Ground!

Let's leave the Index.html on the side for now.

Inside the Babylon folder create the Scene.js file.

It is in this file that we shall create our scene, which must contain at least a camera, a light source and some objects with which we can work with.

the first part of the Scene.js is the function createScene(). So, let's create it.

```javascript
function createScene(){

}
```
Inside this magnificent empty function, we shall first create an empty scene and store a reference to it inside a variable.

```javascript
function createScene(){

    //Creating an Empty Scene reference
    var scene = new BABYLON.Scene(engine);

}
```

We do not need to worry about the engine variable because we already created it in index.html. 

Now in order to be able to see anything inside our scene we need a camera. 

Babylon provides two types of camera (their Universal Camera and their Arc Rotate Camera more info at [references](#references)). Because it is easier to setup and we do not wish to add any sort of dynamics to the camera (which is also possible), we'll go with the Universal camera. It will be positioned 20 units above the zero point and it will be looking to the zero point.

So let's create a camera inside our createScene() function.

```javascript
function createScene(){

    //Creating an Empty Scene reference
    var scene = new BABYLON.Scene(engine);

    //Creating a Universal camera
    var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0,20,0), scene);
    camera.setTarget(new BABYLON.Vector3.Zero()); //Lookin at (0,0,0).

}
```
The Universal camera constructor takes 3 arguments: the first is a string containing the camera name. The second is the position of the camera in the format BABYLON.Vector3 the vector3 structure has 3 parameters: the x position, the y position and the z position. Lastly the camera needs a reference to the scene where it is being created.

the setTarget(target) function of the camera tells the engine where the camera should be looking at, it takes a BABYLON.Vector3 argument which represents a 3 dimensional point in the world where the camera should be looking at. In Our case the camera is looking to the point (0,0,0) of our scene.

OK. we have a camera, but without any lights we might as well have no camera at all. BABYLON.JS provides 4 types of lights (Point Light, Directional Light, Spot Light, Hemispheric Light) (More on these in the [references](#references)). For the purposes of this tutorial we are going to use the lights provided inside the template file. Let's add those lights to our scene.

```javascript
function createScene(){

    //Creating an Empty Scene reference
    var scene = new BABYLON.Scene(engine);

    //Creating a Universal camera
    var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0,20,0), scene);
    camera.setTarget(new BABYLON.Vector3.Zero()); //Lookin at (0,0,0).

    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
}
```

As can be seen, we are using one hemispheric light and one point light. We'll see the effect of these lights when we add objects.

Speaking of which, let's create a ground for our scene.

Babylon has some functions to create basic shapes (and we are using basic shapes instead of custom shapes for the reason that this tutorial is long enough, and browsers have some restrictions on loading files that are not served and creating a server to serve custom shape files is out of the scope of this tutorial).

The basic shapes on Babylon are box, sphere, cylinder, plane (not the flying one), disk, Torus, Torus Knot, Ground, Ground from a height map and Tiled Ground (more on these guys on, you guessed it! the [references](#references)).

Our ground will be unsurprisingly created using the ground builder. Like this:

```javascript
function createScene(){

    //Creating an Empty Scene reference
    var scene = new BABYLON.Scene(engine);

    //Creating a Universal camera
    var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0,20,0), scene);
    camera.setTarget(new BABYLON.Vector3.Zero()); //Lookin at (0,0,0).

    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

    //Our Ground.
    var ground = BABYLON.MeshBuilder.CreateGround('ground1', {height:100, width:100, subdivisions: 8}, scene);
}
```

Though the meshBuilder and ground Creator is quite self explanatory. We should be aware of one important thing: the default color of any mesh is white. In order to change this, we need to create a custom material with a specific color. Materials also have their own entrance in the [references](#references).

To create a custom material, change its color and assign it to the ground we add three more lines of code:

```javascript
function createScene(){

    //Creating an Empty Scene reference
    var scene = new BABYLON.Scene(engine);

    //Creating a Universal camera
    var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0,20,0), scene);
    camera.setTarget(new BABYLON.Vector3.Zero()); //Lookin at (0,0,0).

    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

    //Our Ground.
    var ground = BABYLON.MeshBuilder.CreateGround('ground1', {height:100, width:100, subdivisions: 8}, scene);
     var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.2, 0.1);
    ground.material = groundMaterial;
}
```

the first line we add creates a standard material. The second line gives this material a new color. In the final line we change the material of our ground to our custom material.

Ok… It is time to see our scene.

### step 4: Witnessing the our creation!

To see if we are going in the right track and to gauge our progress, we should start checking the state of our scene. To do that we still need to add a few more things inside Scene.js.

```javascript
function createScene(){

    //All the we created so far has been omited
    //.
    //.
    //.

    return scene;
}
/******* End of the create scene function ******/    

var scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () { 
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () { 
    engine.resize();
});
```

We need to return our scene from the createScene() function. Our return statement will be our last inside the function. Outside the function we call the createScene and store it in an outside reference.

the runRenderLoop(calback) is our game loop function. For now, we need it to render our scene every frame. And that is what we are doing by calling the scene.render();

Finally, the last function is related to resizing the window.

Once this is finished the final thing that needs to be done is to add a reference of our Scene.js inside of our Index.html. We do this by adding the following line at Index.html:

```html
<!--All the scripts will go bellow-->
<script>
    var canvas = document.getElementById("babylonCanvas"); // Get the canvas element 
    var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
</script>

<script src="Babylon/Scene.js"></script>

<!--There is more html bellow-->
```

Now if you everything is running correctly and you open the Index.html file with a browser of your choice (I favor Chrome, but hey, you do you), you should be able to see a brownish surface being clearly illuminated by two light sources. Feel free to change the color values of our ground as you see fit. Also, you can mess around with the light to get a feel for how it works.

But we still have some ground to cover. Our next step will be to create our helicopters.

### Step 5: Let's define our Choppas!

Now we could just slap a box inside our createscene and be done with it. But we are creating 3 helicopters, each one will be controllable. So no, not a good idea. To do this properly we need to create an entire file and class dedicated to creating some cubes that move when they should and stop moving with adequate commands.

We start by creating a scripts folder inside our Babylon folder. And inside our scripts folder we'll create our Helicopter_Definitions.js.

Let's open our Helicopter_Definitions.js file and create the helicopter class and for its constructor we are interested in having a reference to the scene, to a color and to a position.

```javascript
class helicopter{
    constructor(scene, color = new Color(1,1,1),position = [0,0,0]){

    }
}
```

Now it is the job of our constructor to build our helicopter inside the scene. But let's start small. Let's create a cube of the chosen color inside the chosen position of the given scene:

```javascript
class helicopter{
    constructor(scene, color = new Color(1,1,1), position = [0,0,0]){
        //Creating the body of our helicopter
        this.body = BABYLON.MeshBuilder.CreateBox("Helicopter Body", {}, scene);
        this.body.position = new BABYLON.Vector3(position[0],position[1],position[2]);
        this.bodymaterial = new BABYLON.StandardMaterial("material", scene);
        this.bodymaterial.diffuseColor = color;
        this.body.material = this.bodymaterial;
    }
}
```

The process is quite similar from the process we used to create our ground. The only thing that is actually new is the second line where we change the position of our box using the position property (which is a vector3. More information on position, rotation and scale can be found in the [references](#references)).

Now we test this class, by creating 3 "helicopters". Save your Helicopter_Definitions.js, go to Index.js and add a reference to the helicopter class, just like this:

```html
<!--All the scripts will go bellow-->
<script>
    var canvas = document.getElementById("babylonCanvas"); // Get the canvas element 
    var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
</script>

<script src = "Babylon/scripts/Helicopter_Definition.js"></script>

<script src="Babylon/Scene.js"></script>

<!--There is more html bellow-->
```

And back to Scene.js we will create our 3 colorful cubes inside the createScene() function:

```javascript
function createScene(){

    //All the we created so far has been omited
    //.
    //.
    //.

    //-----------------------CREATING HELICOPTERS--------------------------
    var h = [];

    h[0] = new helicopter(scene, new BABYLON.Color3(1, 0, 0));
    h[1] = new helicopter(scene, new BABYLON.Color3(0, 1, 0,), [2,0,0]);
    h[2] = new helicopter(scene, new BABYLON.Color3(0, 0, 1,), [-2,0,0]);

    return scene;
}
//...
```

our helicopters are conveniently stored inside an array. This will be useful in a few steps. Right now, another thing of note is that we are not specifying the position of our first helicopter, that's because if we do not specify the position, our constructor will use the default value of (0,0,0). All this aside if you save the file and run a quick test, you'll see 3 cubes: one green, another red and the last will be blue.

### step 6: implementing the Commands

This step will involve doing some heavier coding. First, we want to create our input map, this will allow us to deal with an abstraction of the keyboard commands and therefore allow us to remap our commands without going through our whole and gigantic create scene function.

To do this let's create the Input_Manager.js file inside our scripts folder. And inside it we shall create the InputMap class. this is how this class should look:

```javascript
class InputMap{
    constructor(up='w', down='s',left='a',right='d', leftTrigger='q', rightTrigger='e'){
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
        this.leftTrigger = leftTrigger;
        this.rightTrigger = rightTrigger;
    }
}
```

We add a reference to our new script inside the Index.html after the Helicopter_Definition.js and before the Scene.js.

```html
<!--All the scripts will go bellow-->
<script>
    var canvas = document.getElementById("babylonCanvas"); // Get the canvas element 
    var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
</script>

<script src = "Babylon/scripts/Helicopter_Definition.js"></script>
<script src = "Babylon/scripts/Input_Manager.js"></script>

<script src="Babylon/Scene.js"></script>

<!--There is more html bellow-->
```

This map will only work with the keyboard, but even with that restriction it will allow us to work with the 'up' input instead of the hardcoded 'w' key. Why is this abstraction important? Because the player might be more confortable using the 'JIKL' inputs instead of the 'AWSD'. Using this approach, we need only modify the values of the inputmap, and the rest of the code will follow suit.

Now this is the moment where we need to modify our code slightly for the sake of consistency. See, the createScene() function is supposed to be our setup, and modifications throughout the game loop should be addressed in the engine.runRenderLoop(callback). This separation is important, specially when troubleshooting (Either the issue is in the setup or the in the dynamics, you can see that any troubles in the setup is related to the createScene() function and any trouble in the dynamics is in the engine.runRenderLoop(callback)). But in order to enforce that We need to start declaring variables outside createScene().

So, we shall do this with our Scene.js:

```javascript
var h = []; //reference to the helicopters
var inputMap = new InputMap(); //We'll work with the defaut inputs that we stablished

function createScene(){

    //All the we created so far has been omited
    //.
    //.
    //.

    //-----------------------CREATING HELICOPTERS--------------------------
    //var h = [];

    h[0] = new helicopter(scene, new BABYLON.Color3(1, 0, 0));
    h[1] = new helicopter(scene, new BABYLON.Color3(0, 1, 0,), [2,0,0]);
    h[2] = new helicopter(scene, new BABYLON.Color3(0, 0, 1,), [-2,0,0]);

    return scene;
}
//...
```

Testing this version should yield the same three static cubes. As the last test.

At this point, to allow our application to read inputs from the keyboard we need to create an ActionManager (referenced in the [references](#references)). This special object creates listeners to specific event triggers and manage them.

The implementation of the ActionManager is:

```javascript
var h = []; //reference to the helicopters
var inputMap = new InputMap(); //We'll work with the defaut inputs that we stablished
var Map = [];

function createScene(){

    //All the we created so far has been omited
    //.
    //.
    //.

    //-----------------------CREATING HELICOPTERS--------------------------

    h[0] = new helicopter(scene, new BABYLON.Color3(1, 0, 0));
    h[1] = new helicopter(scene, new BABYLON.Color3(0, 1, 0,), [2,0,0]);
    h[2] = new helicopter(scene, new BABYLON.Color3(0, 0, 1,), [-2,0,0]);

    //-------------------Implementing the Action Manager-------------------

    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        map[evt.sourceEvent.key] = true;

    }));

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        map[evt.sourceEvent.key] = false;
    }));

    return scene;
}
//...
```

4 Thing were added: The first one is the Map array declaration right before the declaration of createScene(). This will be an array of trues and false, where the indexes will be the pressed keyboard keys. The rest of the added statements are inside the createScene() function. The second is the declaration and instancing of our actionManager, third and fourth newly added code snippets are almost identical, the difference between them is that the first one has the OnKeyDownTrigger as the first parameter of the BABYLON.ExecuteCodeAction function, also, the first one is setting one of the Map array positions to true. The Last statement has the OnKeyUpTrigger and sets the Map position to false.

Essentially, we made our application sensible to keyboard input, but we still need to implement the logic to move our helicopters. For that we need to create some functions inside the helicopter class.

So, let's open the Helicopter_Definitions.js file and create the following functions:

```javascript
class helicopter{
    constructor(scene, color = new Color(1,1,1), position = [0,0,0]){
        //the conde was omited fr the sake of clarity
    }

    //Movement Functions:
    RotateLeft(){
        this.body.rotation.y -= 90 * (Math.PI/180) * (engine.getDeltaTime()/1000);
    }

    RotateRight(){
        this.body.rotation.y += 90 * (Math.PI/180) * (engine.getDeltaTime()/1000);
    }

    MoveFoward(){
        this.body.translate(new BABYLON.Vector3(0, 0, 1).normalize(), -5 * (engine.getDeltaTime()/1000), BABYLON.Space.LOCAL);
    }

    MoveBackward(){
        this.body.translate(new BABYLON.Vector3(0, 0, 1).normalize(), 5 * (engine.getDeltaTime()/1000), BABYLON.Space.LOCAL);
    }
}
```

These functions implement the tank movement of the helicopters. (You can find more on specific rotation and translation functions in the [references](#references)) 

The Rotate functions modify the rotation of the cube along the y axis. In this case I aimed to have the helicopter rotate 90 degrees per second (independent from frame rate). The rotation is described in radians (therefore the multiplication by PI and division by 180) and is multiplied by the engine.DeltaTime(). the engine is the reference to the started Babylon Engine in index.html, the DeltaTime() function returns the amount of milliseconds elapsed between the current frame and the last, but we need this value in seconds, so we divide it by 1000.

For the Move functions, I had to use the translate function with the last argument being BABYLON.Space.LOCAL, to use the local axes of my helicopter and move it along it local z axis (Which takes into considerations the object rotation). The second argument tells by how much the helicopter will move (5 units per second in this case). The first argument is the axis that the helicopter will follow (in the case of forward and backward that is the z axis (0,0,1)).

Now we create the commands.

Each Command has its own class with an Execute function... Explaining without any substance to work upon is guaranteed to make my life way harder than it should be, so let's create the commands for the helicopters and then I'll elaborate further. First create the Command.js file inside our scripts folder. Open it and write the following:

```javascript
class HelicopterForwardCommand{
    constructor(helicopter){
        this.heli = helicopter;
    }

    SetHelicopter(helicopter){
        this.heli = helicopter;
    }

    Execute(){
        this.heli.MoveFoward();
    }
}

class HelicopterBackwardCommand{
    constructor(helicopter){
        this.heli = helicopter;
    }

    SetHelicopter(helicopter){
        this.heli = helicopter;
    }

    Execute(){
        this.heli.MoveBackward();
    }
}

class HelicopterRotateRightCommand{
    constructor(helicopter){
        this.heli = helicopter;
    }

    SetHelicopter(helicopter){
        this.heli = helicopter;
    }

    Execute(){
        this.heli.RotateRight();
    }
}

class HelicopterRotateLeftCommand{
    constructor(helicopter){
        this.heli = helicopter;
    }

    SetHelicopter(helicopter){
        this.heli = helicopter;
    }

    Execute(){
        this.heli.RotateLeft();
    }
}
```

Each class is pretty much the same except that they have specific names and their Execute function calls upon a different function of the helicopter reference. The setHelicopter function saves a bit of instancing time when switching control between helicopters and the only attribute this command has is a reference to a helicopter.

Now we shall put these commands to use inside our Scene.js script. But firs we must add a reference to our commands inside our Index.html, right bellow the Input_Manager.js reference.

```html
<!--All the scripts will go bellow-->
<script>
    var canvas = document.getElementById("babylonCanvas"); // Get the canvas element 
    var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
</script>

<script src = "Babylon/scripts/Helicopter_Definition.js"></script>
<script src = "Babylon/scripts/Input_Manager.js"></script>
<script src= "Babylon/scripts/Commands.js"></script>

<script src="Babylon/Scene.js"></script>

<!--There is more html bellow-->
```

Let's create our commands inside Scene.js

```javascript
var h = []; //reference to the helicopters
var inputMap = new InputMap(); //We'll work with the defaut inputs that we stablished
var Map = [];
var currentHelicopter = 0;
var commands = [];

function createScene(){

    //All the we created so far has been omited
    //.
    //.
    //.

    //-------------------Implementing the Action Manager-------------------

    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        map[evt.sourceEvent.key] = true;

    }));

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        map[evt.sourceEvent.key] = false;
    }));

    //------------------------Implementing Commands----------------------

    commands[0] = new HelicopterForwardCommand(h[currentHelicopter]);
    commands[1] = new HelicopterBackwardCommand(h[currentHelicopter]);
    commands[2] = new HelicopterRotateLeftCommand(h[currentHelicopter]);
    commands[3] = new HelicopterRotateRightCommand(h[currentHelicopter]);

    return scene;
}
//...
```

we created two extra variables outside createScene: currentHelicopter and commands. commands will be our array of commands, and current helicopter holds the index of the helicopter that you will control. Inside the CreateScene function we create 4 commands to control the red helicopter (index 0) using the 4 classes we created inside Command.js. Now all that is left is to bind the commands to the key pressings. And we'll do that inside the engine.runRenderLoop(calback) function. So you should go inside the Scene.js file and modify the engine.runRenderLoop(callback) function to look like this:

```javascript
//...

engine.runRenderLoop(function () { 
    scene.render();
    if (map[inputMap.up]) {
        commands[0].Execute();
    }
    else if (map[inputMap.down]) {
        commands[1].Execute();
    }

    if (map[inputMap.left]) {
        commands[2].Execute();
    }
    else if (map[inputMap.right]) {
        commands[3].Execute();
    }
});

//...
```

I would suggest running the code and mess around with the 'AWSD' keys. But i need to explain what you just copied and pasted. This function is being called every frame. Each if verifies inside Map (our array that contains true for keys being pressed and false if they aren't) if the key associated with our input map is being pressed. If it is being pressed it executes one of the commands associated with the selected helicopter.

### Step 7: Switching the choppas!

Up until this point We were able to implement the command pattern and able to command our red helicopter. But we want to switch commands between helicopters during execution time (which means changing the value of currentHelicopter and updating our command references). And it is at this point where this pattern shines. We'll implement two functions: one for switching up in the array and another for switching down in the array and associate them to our remaining keys 'e' and 'q'.

Let's create these functions at the bottom of Scene.js. The functions are:

```javascript
//...

function nextHelicopter(){
        currentHelicopter++;
        if(currentHelicopter>=h.length){
            currentHelicopter = 0;
        }
        for(var i=0; i<commands.length; i++){
            commands[i].SetHelicopter(h[currentHelicopter]);
        }
    }

    function previousHelicoprter(){
        currentHelicopter--;
        if(currentHelicopter<0){
            currentHelicopter = h.length-1;
        }
        for(var i=0; i<commands.length; i++){
            commands[i].SetHelicopter(h[currentHelicopter]);
        }
    }
```

The idea of each function is to increase or decrease the value of currentHelicopter and then loop through the commands updating the reference to the current helicopter.

Now we need to call these functions. For that we update the engine.runRenderLoop(callback) function.

```javascript
//...

engine.runRenderLoop(function () { 
    scene.render();
    if (map[inputMap.up]) {
        commands[0].Execute();
    }
    else if (map[inputMap.down]) {
        commands[1].Execute();
    }

    if (map[inputMap.left]) {
        commands[2].Execute();
    }
    else if (map[inputMap.right]) {
        commands[3].Execute();
    }

    //Switching functions
    if(map[inputMap.leftTrigger]){
        map[inputMap.leftTrigger] = false;
        nextHelicopter();
    }
    else if(map[inputMap.rightTrigger]){
        map[inputMap.rightTrigger] = false;
        previousHelicoprter();
    }
});

//...
```

The script is ready to run. A few comments on the lines we added: the input map associated with each is 'e' and 'q' and we have exhausted the mapping we have done in inputmap. We can add more by going inside the Input_Manager and modifying the inputMap constructor. The reason behind setting map to false is because we want this function to be used only once per key press.

And this is it! This was my tutorial on Babylon.js and the command pattern! Well, I hope you guys enjoyed it... Wait, what is that? is that a...

### Challenge!:

Welp, if you guys go into the files that I have uploaded for the project there are some extra stuff. More specifically: the helicopters in my files actually look more like helicopters (inside the helicopter class constructor I created two more cubes: one to be the helix and another to be the tail, their shape were modified using the scaling property of objects) and because of that my helicopter class has 3 more functions: select, deselect and IdleBehaviour and the movement functions had to be accommodated (to move the helix and tail accordingly). AND because of those modifications my NextHelicoter, PreviousHelicopter and engine.runRenderLoop are slightly different. The challenge is to figure out these small differences. What they do and as a bonus, how to create 3 more helicopters and setup an AI to control each using the commands.

## References

This is my compilation of source for putting this tutorial together:

#### Design Patterns:
The Gang of four: [Design Patterns: Elements of Reusable Object-Oriented Software (Addison-Wesley Professional Computing Series)](https://www.amazon.com/Design-Patterns-Object-Oriented-Addison-Wesley-Professional-ebook/dp/B000SEIBB8)

Bob Nystrom's: [Game Programming Patterns](http://www.gameprogrammingpatterns.com/)

#### Babylon references:
[Babylon.js base application](https://doc.babylonjs.com/babylon101/first)

Step 3: [Cameras](https://doc.babylonjs.com/babylon101/cameras)

Step 3: [Lights](https://doc.babylonjs.com/babylon101/lights)

Step 3: [Shapes](https://doc.babylonjs.com/how_to/set_shapes)

Step 3: [Material](https://doc.babylonjs.com/babylon101/materials)

Step 5: [Postion, Rotation and Scale](https://doc.babylonjs.com/babylon101/position)

Step 6: [ActionManager](https://doc.babylonjs.com/how_to/how_to_use_actions#triggers)

Step 6: [ActionManager Documentation](https://doc.babylonjs.com/api/classes/babylon.actionmanager)

Step 6: Extra [ActionManager example](https://www.babylonjs-playground.com/#Y1W3F9)

Step 6: [Rotations and translations](https://doc.babylonjs.com/how_to/rotate)

Step 6: [Difference Between engine.getDeltaTime() and scene.getAnimationRatio](https://forum.babylonjs.com/t/whats-the-difference-between-engine-getdeltatime-and-scene-getanimationratio/61)

Step 6: [Best way to get time between frames](http://www.html5gamedevs.com/topic/38996-recommended-way-to-get-time-between-last-frames-in-observables-ie-deltatime/)
