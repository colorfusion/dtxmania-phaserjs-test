import 'phaser';
import { GameObjects, Sound } from 'phaser';

export default class Demo extends Phaser.Scene
{
    private isPlaying : boolean = false;

    private vid : GameObjects.Video;
    private bgm_d : Sound.BaseSound;
    private drums : Sound.BaseSound;

    constructor()
    {
        super('demo');
    }

    init()
    {
        this.sound.pauseOnBlur = false;
    }

    preload()
    {
        this.load.video('bg', 'bg.mp4');
        this.load.audio('bgm_d', 'bgm_d.mp3');
        this.load.audio('drums', 'drums.mp3');
    }

    create()
    {
        this.vid = this.add.video(0, 0, 'bg').setInteractive();
        this.bgm_d = this.sound.add('bgm_d');
        this.drums = this.sound.add('drums');
        this.vid.setOrigin(0, 0);

        this.game.events.on('blur', this.pauseGame, this);
        
        this.game.events.on('hidden', this.pauseGame, this);

        this.vid.on('pointerdown', () => {
            if (!this.isPlaying)
            {
                this.vid.setPaused(false);
                if (this.bgm_d.isPaused)
                {
                    this.bgm_d.resume();
                    this.drums.resume();
                }
                else
                {
                    this.bgm_d.play();
                    this.drums.play();
                }
            }
            else
            {
                this.vid.setPaused(true);
                this.bgm_d.pause();
                this.drums.pause();
            }
            
            this.isPlaying = !this.isPlaying;
        });
    }

    pauseGame()
    {
        this.vid.setPaused(true);
        this.bgm_d.pause();
        this.drums.pause();

        this.isPlaying = false;
    }
}
