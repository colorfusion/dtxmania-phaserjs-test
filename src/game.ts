import 'phaser';
import Demo from './demo';

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#fff',
    width: 1280,
    height: 720,
    loader: {
        baseURL: 'assets'
    },
    scene: [Demo]
};

const game = new Phaser.Game(config);
