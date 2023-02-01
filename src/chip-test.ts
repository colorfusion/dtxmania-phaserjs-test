import 'phaser';

const chipList = new Map([
   ['crash_cymbal', { url: 'crash_cymbal.mp3', keyCode: Phaser.Input.Keyboard.KeyCodes.T }], 
   ['snare', { url: 'snare.mp3', keyCode: Phaser.Input.Keyboard.KeyCodes.Y }], 
   ['hihat', { url: 'hihat.mp3', keyCode: Phaser.Input.Keyboard.KeyCodes.U }], 
   ['kick', { url: 'kick.mp3', keyCode: Phaser.Input.Keyboard.KeyCodes.I}]
]);

export default class ChipTest extends Phaser.Scene
{
    private keyMap = new Map();

    constructor()
    {
        super('chip-test');
    }

    init()
    {
        this.sound.pauseOnBlur = false;
    }

    preload()
    {
        chipList.forEach((value: { url:string, keyCode:number }, key: string) => {
            this.load.audio(key, value.url);
        });
    }

    create()
    {
        chipList.forEach((value: { url:string, keyCode:number }, key: string) => {
            // this.soundMap.set(key, this.sound.add(key));
            this.keyMap.set(key, this.input.keyboard.addKey(value.keyCode));
        });
    }

    update(time: number, delta: number): void 
    {
        this.keyMap.forEach((value, key) => {
            if (Phaser.Input.Keyboard.JustDown(value))
            {
                this.sound.play(key);
            }
        });
    }
}