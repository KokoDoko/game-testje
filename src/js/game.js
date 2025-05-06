import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 800,
            height: 450,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    // MAAK EEN FOR LOOP VOOR 30 VISSEN
    // ELKE VIS HEEFT RANDOM POSITIE EN RANDOM VELOCITY
    // GEBRUIK JE EIGEN PLAATJES
    // MAAK EEN ANDERE ACTOR MET EEN ANDER PLAATJE
    // MAAK EEN ACTOR VOOR DE ACHTERGROND



    startGame() {
        let bg = new Actor()
        bg.graphics.use(Resources.BG.toSprite())
        bg.pos = new Vector(400, 225)
        this.add(bg)

        for(let i = 0;i <30; i++) {
            const fish = new Actor()
            fish.graphics.use(Resources.Fish.toSprite())

            let x = Math.random() * 800
            let y = Math.random() * 450

            let sc = Math.random() + 0.2
            fish.scale = new Vector(sc, sc)

            fish.pos = new Vector(x, y)
            fish.vel = new Vector(-300 + Math.random() * 100,20)
            fish.angularVelocity = Math.random() - 0.5
            fish.events.on("exitviewport", (e) => this.fishLeft(e))
            this.add(fish)
        }

        let shark = new Actor()
        shark.graphics.use(Resources.Shark.toSprite())
        shark.scale = new Vector(0.6, 0.6)
        shark.pos = new Vector(40, 225)
        shark.vel = new Vector(60,0)
        shark.events.on("exitviewport", (e) => this.sharkLeft(e))
        this.add(shark)
    }

    sharkLeft(e) {
        e.target.pos = new Vector(-40, 225)
    }

    fishLeft(e) {
        let x = Math.random() * 800
        let y = Math.random() * 450
        e.target.pos = new Vector(800+x, y)
    }
}

new Game()
