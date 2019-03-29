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