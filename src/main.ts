enum ColorString {
    CYAN = '\x1b[36m%s\x1b[0m'
}

class Status {
    allow: boolean = true;
}

class Colors {
    readonly cyan: ColorString = ColorString.CYAN;
}

class ColorMatcher {
    private readonly selectableColors: Colors;

    constructor() {
        this.selectableColors = new Colors();
    }

    // Returns a color
    getColorString(selectedColor: string): string {
        let test: string;

        Object.keys(this.selectableColors).forEach( (color) => {
            // @ts-ignore
            if(selectedColor === color) return test = this.selectableColors[color];
        });

        return test;
    }
}

class Lino extends Colors {
    private readonly status: Status;
    private readonly colorMatcher: ColorMatcher;
    private readonly text: string;

    constructor(text: string) {
        super();
        this.text = text;
        this.colorMatcher = new ColorMatcher();
        this.status = new Status();
    }

    ApplyColor(selectedColor: string): void {
        console.log(this.colorMatcher.getColorString(selectedColor), this.text);
    }

    // TODO: Enable / Disable the process
    set enabled(enabled: boolean) {
        this.status.allow = enabled;
    }
}

// EXAMPLE
new Lino("Text Example").ApplyColor('cyan');
