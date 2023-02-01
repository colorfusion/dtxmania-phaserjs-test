import 'phaser';
import Demo from './demo';
import ChipTest from './chip-test';
import BeatLineTest from './beat-line-test';
import DTXFileLoad from './dtx-file-load';

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#fff',
    width: 1280,
    height: 720,
    loader: {
        baseURL: 'assets'
    },
    scene: [DTXFileLoad, Demo, BeatLineTest, ChipTest]
};

const game = new Phaser.Game(config);
