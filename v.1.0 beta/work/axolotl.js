// * ████ Axolotl Progress Bars Library ████ * \\

const c = {
  log: (...args) => console.log(...args)
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class axolotl {
  static colors = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    light_gray: '\x1b[37m',
    dark_gray: '\x1b[90m',
    light_red: '\x1b[91m',
    light_green: '\x1b[92m',
    light_yellow: '\x1b[93m',
    light_blue: '\x1b[94m',
    light_magenta: '\x1b[95m',
    light_cyan: '\x1b[96m',
    white: '\x1b[97m',
    gray: '\x1b[90m',
    reset: '\x1b[0m',
  };

  static bars = {
    basic: {
      mode: 'percent',
      complete: '█',
      incomplete: '░',
      completeColor: 'light_green',
      incompleteColor: 'gray'
    },
    spinner: {
      mode: 'indeterminate',
      frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
      color: 'light_green'
    }
  };

  static render(type, state) {
    const bar = this.bars[type];

    if (!bar) {
      throw new Error(`render: bar type "${type}" does not exist`);
    }

    if (bar.mode === 'percent') {
      const { percent, proportion, total, ccolor, icolor } = state;

      const charsTotal = total * proportion;
      const completeChars = Math.round((percent / 100) * charsTotal);
      const incompleteChars = Math.max(0, charsTotal - completeChars);

      const activeCColor = ccolor || bar.completeColor;
      const activeIColor = icolor || bar.incompleteColor;

      const line =
        (this.colors[activeCColor] || '') +
        bar.complete.repeat(completeChars) +
        (this.colors[activeIColor] || '') +
        bar.incomplete.repeat(incompleteChars) +
        this.colors.reset;

      process.stdout.write(`\r[${line}] ${percent.toFixed(1)}%`);
    }

    if (bar.mode === 'indeterminate') {
      const { frame = 0, text = '', ccolor } = state;
      const activeColor = ccolor || bar.color;
      const char = bar.frames[frame % bar.frames.length];

      process.stdout.write(
        `\r${this.colors[activeColor] || ''}${char}${this.colors.reset} ${text}`
      );
    }
  }

  static async asyncbar(
    type,
    whileIsDoing,
    proportion = 1,
    total = 40,
    options = {}
  ) {
    const {
      interval = 80,
      text = '',
      ccolor = null,
      icolor = null
    } = options;

    if (!this.bars[type]) {
      throw new Error(`asyncbar: bar type "${type}" does not exist`);
    }

    const bar = this.bars[type];
    let finished = false;
    let frame = 0;

    while (!finished) {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);

      const result = await whileIsDoing();

      if (bar.mode === 'indeterminate') {
        if (result === false) break;
        this.render(type, { frame, text, ccolor });
        frame++;
      } 
      else if (bar.mode === 'percent') {
        if (typeof result !== 'number') {
          throw new Error('asyncbar: percent bar requires number');
        }

        const percent = Math.min(100, Math.max(0, result));
        this.render(type, {
          percent,
          proportion,
          total,
          ccolor,
          icolor
        });

        if (percent >= 100) finished = true;
      }

      await wait(interval);
    }

    process.stdout.write('\n');
  }

  static simpbar(
    type = 'basic',
    proportion = 1,
    total = 40,
    msdelay = 3000,
    ccolor = null,
    icolor = null
  ) {
    const start = Date.now();

    if (!this.bars[type]) {
      throw new Error(`simpbar: bar type "${type}" does not exist`);
    }

    return this.asyncbar(
      type,
      () => {
        const elapsed = Date.now() - start;
        if (type === 'spinner') return elapsed < msdelay;
        return (elapsed / msdelay) * 100;
      },
      proportion,
      total,
      { ccolor, icolor }
    );
  }
}

export default axolotl;