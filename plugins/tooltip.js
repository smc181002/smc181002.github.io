const plugin = require('tailwindcss/plugin'); 

const tooltip = plugin(
  function({addUtilities, theme, e}) {
    const values = theme('pos');
    let utilities = {
      '.tt': {
        'position': 'relative',
        'width': 'fit-content',
      },
      '.tt > .tt-text': {
        'position': 'absolute',
        'padding': '4px 8px',
        'top': '-150%',
        'left': '0%',
        'z-index': '1000',
        'width': '100%',
        'text-align': 'center',
        'display': 'none',
        'justify-content': 'center',
      },
      '.tt-text > *': {
        'border-radius': '5px',
        'width': 'fit-content',
        'padding': '4px 8px',
      },
      '.tt:hover .tt-text': {
        'display': 'flex',
      },
      '.tt:hover': {
        'cursor': 'pointer',
      },
    }
    let position = Object.entries(values).map(([key, value]) => {
      return {
        [`.${e(`tt-pos-${key}`)}`]: { top: `${value} !important` },
      }
    });

    console.log()
    utilities = {...utilities, ...position[0], ...position[1]};
    console.log(utilities);

    addUtilities(utilities)
  },
  {
    theme: {
      pos: {
        'top': '-150%',
        'bottom': '100%',
      }
    }
  }
);

module.exports = tooltip
