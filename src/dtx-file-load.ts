import 'phaser';

const file = {
    name: 'adv',
    path: 'adv.dtx'
};

export default class DTXFileLoad extends Phaser.Scene
{
    constructor()
    {
        super('DTXFileLoad');
    }

    init()
    {

    }

    preload()
    {
        this.load.binary(file.name, file.path);
    }

    create()
    {
        let fileRawData = this.cache.binary.get(file.name);
        const textDecoder = new TextDecoder("shift-jis");
        const fileContentStr = textDecoder.decode(fileRawData)

        const stringArray = fileContentStr.replace(/\r/gm,'').split('\n');
        const processedArray = stringArray
            .filter((value : string) => value.length != 0 && value[0] == '#')
            .map((value : string) => value.replace(/\t.*/gm, '').substring(1).split(" ", 2));

        console.log(processedArray);

        let text = this.add.text(10, 10, `${processedArray[0][0]} : ${processedArray[0][1]}`);
        text.setColor("0xffffff");
    }

    update(time: number, delta: number): void 
    {
        
    }
}