class helicopter{
    constructor(scene, color = new BABYLON.Color3(1,1,1), position=[0,0,0]){
        
        this.body = BABYLON.MeshBuilder.CreateBox("Helicopter Body", {}, scene);
        this.body.position = new BABYLON.Vector3(position[0],position[1],position[2]);
        this.bodymaterial = new BABYLON.StandardMaterial("material", scene);
        this.bodymaterial.diffuseColor = color;
        this.body.material = this.bodymaterial;
        
        this.helix = BABYLON.MeshBuilder.CreateBox("Helicopter Helix", {}, scene);
        this.helix.position = new BABYLON.Vector3(this.body.position.x,this.body.position.y+1,this.body.position.z);
        this.helix.scaling = new BABYLON.Vector3(2,0.2,0.4);
        this.helixmaterial = new BABYLON.StandardMaterial("helixMaterial", scene);
        this.helixmaterial.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        this.helix.material = this.helixmaterial;

        this.tail = BABYLON.MeshBuilder.CreateBox("Helicopter tail", {}, scene);
        this.tail.scaling = new BABYLON.Vector3(0.5,0.5,0.5);
        this.tail.position = new BABYLON.Vector3(this.body.position.x,this.body.position.y,this.body.position.z+0.8);
        this.tail.material = this.helixmaterial;
        this.isSelected = false;
        //this.helix = BABYLON.MeshBuilder.CreateBox("Helicopter Helix", {}, scene);
        //this.helix_theta = helix_theta;
    }

    RotateRight(){
        this.body.rotation.y += 90 * (Math.PI/180) * engine.getDeltaTime()/1000;
        this.tail.rotation.y += 90 * (Math.PI/180) * engine.getDeltaTime()/1000;
        this.tail.position = new BABYLON.Vector3(this.body.position.x,this.body.position.y,this.body.position.z);
        this.tail.translate(new BABYLON.Vector3(0, 0, 1).normalize(), 1, BABYLON.Space.LOCAL);
    }

    RotateLeft(){
        this.body.rotation.y -= 90 * (Math.PI/180) * engine.getDeltaTime()/1000;
        this.tail.rotation.y -= 90 * (Math.PI/180) * engine.getDeltaTime()/1000;
        this.tail.position = new BABYLON.Vector3(this.body.position.x,this.body.position.y,this.body.position.z);
        this.tail.translate(new BABYLON.Vector3(0, 0, 1).normalize(), 1, BABYLON.Space.LOCAL);
    }

    MoveBackward(){
        this.body.translate(new BABYLON.Vector3(0, 0, 1).normalize(), 5 * engine.getDeltaTime()/1000, BABYLON.Space.LOCAL);
        this.helix.position = new BABYLON.Vector3(this.body.position.x,this.body.position.y+1,this.body.position.z);
        this.tail.position = new BABYLON.Vector3(this.body.position.x,this.body.position.y,this.body.position.z);
        this.tail.translate(new BABYLON.Vector3(0, 0, 1).normalize(), 1, BABYLON.Space.LOCAL);
    }

    MoveFoward(){
        this.body.translate(new BABYLON.Vector3(0, 0, 1).normalize(), -5 * engine.getDeltaTime()/1000, BABYLON.Space.LOCAL);
        this.helix.position = new BABYLON.Vector3(this.body.position.x,this.body.position.y+1,this.body.position.z);
        this.tail.position = new BABYLON.Vector3(this.body.position.x,this.body.position.y,this.body.position.z);
        this.tail.translate(new BABYLON.Vector3(0, 0, 1).normalize(), 1, BABYLON.Space.LOCAL);
    }

    Select(){
        this.isSelected = true;
    }

    Deselect(){
        this.isSelected = false;
    }

    IdleBehaviour(){
        if(this.isSelected){
            this.helix.rotation.y += 360 * (Math.PI/180) * engine.getDeltaTime()/1000;
        }
    }
}