    var h = [];
    var currentHelicopter = 0;
    var inputMap = new InputMap();
    var map = [];
    var commands = [];
    /******* Add the create scene function ******/
    function createScene() {

        // Create the scene space
        var scene = new BABYLON.Scene(engine);

        // Add a camera to the scene. It will be located 10 unit above the zero point and looking at the zero point
        var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0,20,0), scene);
        camera.setTarget(new BABYLON.Vector3.Zero());
        
        //camera.attachControl(canvas, true);

        // Add lights to the scene
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

        // Add and manipulate meshes in the scene
        //Let's create our ground, so we can put some trees on it
        var ground = BABYLON.MeshBuilder.CreateGround('ground1', {height:100, width:100, subdivisions: 8}, scene);
        var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.2, 0.1);
        ground.material = groundMaterial;
        //BABYLON.MeshBuilder.CreateBox("Helicopter Body", {}, scene);
        //ground.position.y = -2;

        //Lets Create our Helicopters: The red will be at the center, the green will be on the left and the blue one will be on the right
        //var h = [];

        h[0] = new helicopter(scene, new BABYLON.Color3(1, 0, 0));
        h[1] = new helicopter(scene, new BABYLON.Color3(0, 1, 0,), [2,0,0]);
        h[2] = new helicopter(scene, new BABYLON.Color3(0, 0, 1,), [-2,0,0]);

        h[currentHelicopter].Select();

        //lets Create Our input Manager! with the default listen to the key values of (up: w, down: s, left: a, right: d, left trigger: q, right trigger: e)
        //var inputMap = new InputMap();
        //We want to enable our application to listen to the keyboardevents.
        //inputManager.initKeyboardActionManager(scene, inputManager);
        
        //var map = [];
        
        scene.actionManager = new BABYLON.ActionManager(scene);

        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
            map[evt.sourceEvent.key] = true;//evt.sourceEvent.type == "keydown";

        }));

        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
            map[evt.sourceEvent.key] = false;//evt.sourceEvent.type == "keydown";
        }));


        //There are two commands we have to create in order to switch from one helicopter to another.
        //Ther commands are:

        //var commands = [];

        commands[0] = new HelicopterForwardCommand(h[currentHelicopter]);
        commands[1] = new HelicopterBackwardCommand(h[currentHelicopter]);
        commands[2] = new HelicopterRotateLeftCommand(h[currentHelicopter]);
        commands[3] = new HelicopterRotateRightCommand(h[currentHelicopter]);

        return scene;

    };
    /******* End of the create scene function ******/    

    var scene = createScene(); //Call the createScene function

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () { 
        for(var i = 0; i<h.length; i++){
            h[i].IdleBehaviour();
        }
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

        if(map[inputMap.leftTrigger]){
            map[inputMap.leftTrigger] = false;
            nextHelicopter();
        }
        else if(map[inputMap.rightTrigger]){
            map[inputMap.rightTrigger] = false;
            previousHelicoprter();
        }
        scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () { 
        engine.resize();
    });

    function nextHelicopter(){
        h[currentHelicopter].Deselect();
        currentHelicopter++;
        if(currentHelicopter>=h.length){
            currentHelicopter = 0;
        }
        for(var i=0; i<commands.length; i++){
            commands[i].SetHelicopter(h[currentHelicopter]);
        }
        h[currentHelicopter].Select();
    }

    function previousHelicoprter(){
        h[currentHelicopter].Deselect()
        currentHelicopter--;
        if(currentHelicopter<0){
            currentHelicopter = h.length-1;
        }
        for(var i=0; i<commands.length; i++){
            commands[i].SetHelicopter(h[currentHelicopter]);
        }
        h[currentHelicopter].Select();
    }