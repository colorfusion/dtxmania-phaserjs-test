import 'phaser';
import { GameObjects, Geom } from 'phaser';

const bpm : number = 140;
const beatBaseInterval : number = 100;
const beatWidth : number = 500;
const visibleBeats : number = 20;

const judgementLinePosition = 700;

const lineWidth : number = 2;
const lineColor : number = 0x000000;

let currentTime : number;
let isPaused : boolean;
let beatSpeed : number;
let startX : number;
let endX : number;

class BeatLine
{
    public line : Geom.Line;
    public beatIndex : number;
}

export default class BeatLineTest extends Phaser.Scene
{
    public graphics : GameObjects.Graphics;
    public currentTimeText : GameObjects.Text;
    public currentBeatText : GameObjects.Text;
    public beats : BeatLine[];
    public judgementLine : Geom.Line;

    constructor()
    {
        super('beat-line');
    }

    init()
    {
        currentTime = 0;
        beatSpeed = bpm / 60 / 1000;
        startX = (this.game.canvas.width - beatWidth) / 2;
        endX = startX + beatWidth;
    }

    preload()
    {

    }

    create()
    {
        this.beats = [];

        Array(visibleBeats).fill(0).forEach((val, idx) => {
            let newBeat = new BeatLine();
            newBeat.beatIndex = idx;
            newBeat.line = new Phaser.Geom.Line();

            this.beats.push(newBeat);
        });

        this.judgementLine = new Phaser.Geom.Line(startX, judgementLinePosition, endX, judgementLinePosition);

        this.graphics = this.add.graphics();
        this.currentTimeText = this.add.text(10, 10, "");
        this.currentTimeText.setColor('0x000000');
        this.currentBeatText = this.add.text(10, 25, "");
        this.currentBeatText.setColor('0x000000');
        
        this.game.events.on('resume', this.resumeGame, this);
        this.game.events.on('focus', this.resumeGame, this);
        this.game.events.on('blur', this.pauseGame, this);
        this.game.events.on('hidden', this.pauseGame, this);
    }

    update(time: number, delta: number): void 
    {
        if (isPaused)
        {
            return;
        }

        currentTime += delta;
        let timeStr = new Date(currentTime).toISOString().slice(11, -1);
        this.currentTimeText.setText(`Time: ${timeStr}`);

        let currentBeatTime = beatSpeed * currentTime;
        
        this.currentBeatText.setText(`Current Beat: ${currentBeatTime.toFixed(0)}`);

        this.beats.forEach((_, idx) => {
            let currentBeat = this.beats[idx];

            if (currentBeat.beatIndex < currentBeatTime - 10)
            {
                currentBeat.beatIndex += visibleBeats;
            }

            let yPos = judgementLinePosition - (currentBeat.beatIndex - currentBeatTime) * beatBaseInterval;
            currentBeat.line.setTo(startX, yPos, endX, yPos);

            this.beats[idx] = currentBeat;
        });

        let graphics = this.graphics;

        graphics.clear();
        graphics.lineStyle(lineWidth, lineColor);

        this.beats.forEach((beat) => {
            graphics.strokeLineShape(beat.line);
        });

        graphics.lineStyle(3, lineColor);
        graphics.strokeLineShape(this.judgementLine);
    }

    pauseGame()
    {
        isPaused = true;
    }

    resumeGame()
    {
        isPaused = false;
    }
}