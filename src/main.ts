export type AvailableColors =
    'black'     |
    'red'       |
    'green'     |
    'yellow'    |
    'blue'      |
    'magenta'   |
    'cyan'      |
    'white'     |
    'crimson'

enum ColorString {
    BLACK = "\x1b[30m",
    RED = "\x1b[31m",
    GREEN = "\x1b[32m",
    YELLOW = "\x1b[33m",
    BLUE = "\x1b[34m",
    MAGENTA = "\x1b[35m",
    CYAN = '\x1b[36m%s\x1b[0m',
    WHITE = "\x1b[37m",
    CRIMSON = "\x1b[38m",
    BGBLACK = "\x1b[40m",
    BGRED = "\x1b[41m",
    BGGREEN = "\x1b[42m",
    BGYELLOW = "\x1b[43m",
    BGBLUE = "\x1b[44m",
    BGMAGENTA = "\x1b[45m",
    BGCYAN = "\x1b[46m",
    BGWHITE = "\x1b[47m",
    BGCRIMSON = "\x1b[48m",
}

enum SpecialString {
    BRIGHT = "\x1b[1m",
    DIM = "\x1b[2m",
    UNDERSCORE = "\x1b[4m",
    BLINK = "\x1b[5m",
    REVERSE = "\x1b[7m",
    HIDDEN = "\x1b[8m",
    BOLD_ON = "\x1b[1m",
    BOLD_OFF = "\x1b[22m"
}

class Special {
    readonly bright: SpecialString = SpecialString.BRIGHT;
    readonly dim: SpecialString = SpecialString.DIM;
    readonly underscore: SpecialString = SpecialString.UNDERSCORE;
    readonly blink: SpecialString = SpecialString.BLINK;
    readonly reverse: SpecialString = SpecialString.REVERSE;
    readonly hidden: SpecialString = SpecialString.HIDDEN;
    readonly boldOn: SpecialString = SpecialString.BOLD_ON;
    readonly boldOff: SpecialString = SpecialString.BOLD_OFF;
}

class Helpers {
    allow: boolean = true;
    static readonly Reset: string = "\x1b[0m";
}

class Colors {
    // COLORS
    readonly cyan: ColorString = ColorString.CYAN;
    readonly black: ColorString = ColorString.BLACK;
    readonly red: ColorString = ColorString.RED;
    readonly green: ColorString = ColorString.GREEN;
    readonly yellow: ColorString = ColorString.YELLOW;
    readonly blue: ColorString = ColorString.BLUE;
    readonly magenta: ColorString = ColorString.MAGENTA;
    readonly white: ColorString = ColorString.WHITE;
    readonly crimson: ColorString = ColorString.CRIMSON;
    // BACKGROUND COLORS
    readonly bgcyan: ColorString = ColorString.BGCYAN;
    readonly bgblack: ColorString = ColorString.BGBLACK;
    readonly bgred: ColorString = ColorString.BGRED;
    readonly bggreen: ColorString = ColorString.BGGREEN;
    readonly bgyellow: ColorString = ColorString.BGYELLOW;
    readonly bgblue: ColorString = ColorString.BGBLUE;
    readonly bgmagenta: ColorString = ColorString.BGMAGENTA;
    readonly bgwhite: ColorString = ColorString.BGWHITE;
    readonly bgcrimson: ColorString = ColorString.BGCRIMSON;
}

class ColorMatcher {
    private readonly selectableColors: Colors;

    constructor() {
        this.selectableColors = new Colors();
    }

    // Returns a color
    getColorString(selectedColor: AvailableColors): string {
        let color: AvailableColors;

        Object
            .keys(this.selectableColors)
            .forEach(selectableColor => {
                // @ts-ignore
                if(selectedColor === selectableColor) return color = this.selectableColors[selectableColor];
            });

        return color || this.selectableColors['white'];
    }
    
}

class Lino extends Colors {
    private readonly helpers: Helpers;
    private readonly special: Special;
    private readonly colorMatcher: ColorMatcher;
    private readonly text: string;

    constructor(text: string) {
        super();
        this.text = text;
        this.colorMatcher = new ColorMatcher();
        this.helpers = new Helpers();
        this.special = new Special();
    }

    ApplyColor(selectedColor: AvailableColors): void {
        console.log(this.colorMatcher.getColorString(selectedColor), this.text, Helpers.Reset);
    }

    ApplyBackgroundColor(selectedColor: AvailableColors): void {
        const backgroundColor: any = 'bg' + selectedColor;
        console.log(this.colorMatcher.getColorString(backgroundColor), this.text, Helpers.Reset);
    }

}

// EXAMPLE
new Lino("Text Example").ApplyColor('cyan');
new Lino("Text Example").ApplyBackgroundColor('blue');
