
// Logic and Data

const DATA = {
  pi: '',
  e: ''
};

async function loadData(number) {
  DATA[number] = await $.get(`./src/numbers/${number}.txt`);
}

function makeColors(num) {
  return num.match(/.{1,6}/g);
}

// jQuery

class View {
  static getWidth(proportion) {
    return `${100 / proportion}vw`;
  }
  
  static getNumberColor(areNumbersOn) {
    return areNumbersOn ? '#fff9' : '#fff0';
  }
  
  static setSize(proportion) {
    const width = View.getWidth(proportion);
    $('#container div').css({
      width,
      height: width,
      lineHeight: width
    });
  }
  
  static changeNumberDisplay(areNumbersOn) {
    $('#container div').css({
      color: View.getNumberColor(areNumbersOn)
    });
  }
  
  static appendElement({ color, displayColor, proportion, areNumbersOn }) {
    const width = View.getWidth(proportion);
    const textColor = View.getNumberColor(areNumbersOn);
    $('#container').append(`
      <div style="background: #${color}; width: ${width}; height: ${width}; line-height: ${width}; color: ${textColor}">
        ${displayColor}
      </div>`);
  }

  static clearColors() {
    $('#container').empty();
  }
  
  static setNumber(number) {
    $('#number-toggle').text(number === 'pi' ? 'π' : 'e');
  }
}


// Display

const PROPORTIONS = [4, 6, 8, 12, 16, 32, 64, 100];
class Model {

  constructor() {
    this.increaseSize.bind(this);
    this.decreaseSize.bind(this);
    this.toggleNumbers.bind(this);
    this.toggleNumber.bind(this);
    this.proportionIndex = 4;
    this.areNumbersOn = false;
    this.colors = [];
    this.number = 'pi';
    this.timeout = 0;
  }

  setColors(colors) {
    this.colors = colors;
  }

  getProportion() {
    return PROPORTIONS[this.proportionIndex];
  }

  setNumbers(isOn) {
    this.areNumbersOn = isOn;
    View.changeNumberDisplay(this.areNumbersOn);
  }

  addElement(i) {
    if (i === this.colors.length) {
      return;
    }
  
    const color = this.colors[i];
    const displayColor = (i === 0) ? `${color[0]}.${color.substring(1)}` : color;
    View.appendElement({
      color,
      displayColor,
      proportion: this.getProportion(),
      areNumbersOn: this.areNumbersOn
    });

    this.timeout = setTimeout(() => {
      this.addElement(i + 1);
    }, 1);
  }

  async setNumber(number) {
    this.number = number;
    if (DATA[this.number] === '') {
      await loadData(this.number);
    }
    clearTimeout(this.timeout);
    View.clearColors();
    View.setNumber(number);
    const colors = makeColors(DATA[this.number]);
    display.setColors(colors);
    display.addElement(0);
  }

  // Display::actions

  increaseSize() {
    if (this.proportionIndex > 0) {
      --this.proportionIndex;
      View.setSize(this.getProportion());
      this.setNumbers(false);
    }
  }

  decreaseSize() {
    if (this.proportionIndex < PROPORTIONS.length - 1) {
      ++this.proportionIndex;
      View.setSize(this.getProportion());
      this.setNumbers(false);
    }
  }

  toggleNumbers() {
    this.areNumbersOn = !this.areNumbersOn;
    View.changeNumberDisplay(this.areNumbersOn);
  }

  toggleNumber() {
    this.setNumber(this.number === 'pi' ? 'e' : 'pi');
  }
}

// Main

const display = new Model();
display.setNumber('pi');

