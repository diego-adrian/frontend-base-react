/* eslint-disable */
const Util = {
  toType (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  },

  stripHTML (texto) {
    return texto.replace(/(<([^>]+)>)/ig, '');
  },

  replace (text, find, replace) {
    for (let i = 0, l = find.length, regex; i < l; i++) {
      regex = new RegExp(find[i], 'g');
      text = text.replace(regex, replace[i]);
    }
    return text;
  },

  fullscreen () {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT);
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  },

  size (obj) {
    return Object.keys(obj).length;
  },

  serialize (json) {
    const string = [];
    for (const i in json) {
      string.push(`${i}=${json[i]}`);
    }
    return string.join('&');
  },

  trimUrl (url) {
    let urlFormateado = url;
    if (url) {
      if (url[0] === '/') {
        urlFormateado = url.substring(1);
      }
    }
    return urlFormateado;
  },

  getKeys (data) {
    const types = {};
    data.reduce((container, el) => {
      types[el.key] = el;
      return types;
    }, types);
    return types;
  },

  events() {
    // Fullscreen event and hack mozilla
    document.addEventListener('onkeyup', (e) => {
      if (e.keyCode === 27) {
        document.querySelector('body').classList.remove('fullscreen');
      }
    });

    document.addEventListener('mozfullscreenchange', () => {
      if (!document.mozFullScreen) {
        document.querySelector('body').classList.remove('fullscreen');
      }
    }, false);

    if (process.env.REACT_APP_ONBEFOREUNLOAD) {
      window.onbeforeunload = () => '¿Está seguro de abandonar la página?.';
    }
  }
};

export default Util;
