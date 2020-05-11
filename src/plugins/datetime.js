/* eslint-disable */
import Util from './utils';
export default {
  formatDate: 'dd/MM/YYYY',
  months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  days: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayslong: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],

  pad (string, targetLength, padString) {
    targetLength = targetLength >> 0;
    string = String(string);
    padString = String(padString);
    if (string.length > targetLength) {
      return String(string);
    }

    targetLength = targetLength - string.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(string);
  },

  date (date, separator, format) {
    return this.convert(date, separator, format);
  },

  isDate (date) {
    if (Util.toType(date) === 'string') {
      date = this.convert(date);
    }
    return this.isValid(date);
  },

  convert (date, separator = '/', format) {
    if (date) {
      format = format || this.formatDate;
      date = date.split(separator);
      if (format === 'dd/MM/YYYY') {
        return new Date(date[2], date[1] - 1, date[0], 0, 0, 0);
      } else if (format === 'MM/dd/YYYY') {
        return new Date(date[2], date[0] - 1, date[1], 0, 0, 0);
      } else {
        return new Date(date[0], date[1] - 1, date[2], 0, 0, 0);
      }
    }
    return date;
  },

  parse (date, separator) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join(separator || '-');
  },

  getDate (date) {
    date = new Date(date);
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
  },

  isValid (date) {
    if (Util.toType(date) !== 'date') {
      return false;
    }
    return !isNaN(date.getTime());
  },

  now (typeDate = false, format) {
    const now = new Date();
    let date = this.sanitizeDateString(
      `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`, 'date'
    );
    if (format && format === 'SIN_FORMATO') {
      return date;
    }
    if (format === 'datetime') {
      date = date.split('-');
      return `${[date[2], date[1], date[0]].join('/')} ${now.getHours()}:${now.getMinutes()}`;
    }
    date = date.split('-');
    date = new Date(date[0], date[1] - 1, date[2], 0, 0, 0);
    if (typeDate) {
      return date;
    }
    return this.replace(date, format || this.formatDate);
  },

  dateLiteral (date) {
    return this.format(date, 'dd de MMM del YYYY');
  },

  time (date) {
    return this.format(date, 'HH:mm');
  },

  timeLiteral (time, txt) {
    let text = '';
    if (typeof time === 'number') {
      if (time === 0) {
        return '';
      }
      if (time < 60) {
        text = `${time}s`;
      } else if (time < 3600) {
        text = Math.floor(time / 60) + 'm ' + (time % 60 > 0 ? (time % 60 + 's') : '');
      } else {
        text = Math.floor(time / 3600) + 'h ' + (time % 3600 > 0 ? (Math.floor(time / 60)
          + 'm ') : '') + (time % 60 > 0 ? (time % 60 + 's') : '');
      }
      return (txt || '') + text;
    } else {
      if (time.length === 0) {
        return '';
      }
      time = time.split(':');
      const hours = time[0];
      const minutes = time[1];

      if (parseInt(hours) > 0) {
        text += parseInt(hours) + 'h ';
      }
      if (parseInt(minutes) > 0) {
        text += parseInt(minutes) + 'm ';
      }
      if (time.length === 3 && parseInt(time[2]) > 0) {
        text += parseInt(time[2]) + 's';
      }

      return (txt || '') + text;
    }
  },

  datetimeLiteral (date) {
    return this.format(date, 'dddd dd de MMM del YYYY a la(s) HH:mm');
  },

  getSeconds (time) {
    time = time.split(':');
    const hours = time[0];
    const minutes = time[1];
    let total = 0;

    if (parseInt(hours) > 0) {
      total += parseInt(hours) * 3600;
    }
    if (parseInt(minutes) > 0) {
      total += parseInt(minutes) * 60;
    }
    if (time.length === 3 && parseInt(time[2]) > 0) {
      total += parseInt(time[2]);
    }

    return total;
  },

  format (date, format) {
    if (date) {
      const d = new Date(date);
      if (this.isDate(d)) {
        return this.replace(d, format || this.formatDate);
      }
      return date;
    }
  },

  standar (date, format) {
    if (date) {
      const type = Util.toType(date);
      if (type === 'date') {
        return date;
      }
      let day, month, year;
      if (type === 'string') {
        format = format || this.formatDate;
        const separator = date.indexOf('/') !== -1 ? '/' : '-';
        date = date.split(separator);
        const [first, second, thirth] = date;

        if (format === 'dd-MM-YYYY' || format === 'dd/MM/YYYY') {
          day = first;
          month = second - 1;
          year = thirth;
        }

        if (format === 'MM-dd-YYYY' || format === 'MM/dd/YYYY') {
          day = second;
          month = first - 1;
          year = thirth;
        }

        if (format === 'YYYY-MM-dd' || format === 'YYYY/MM/dd') {
          day = thirth;
          month = second - 1;
          year = first;
        }

        if (format === 'YYYY-dd-MM' || format === 'YYYY/dd/MM') {
          day = second;
          month = thirth - 1;
          year = first;
        }
      }
      return new Date(year, month, day);
    }
    return null;
  },

  replace (date, format) {
    format = format || this.formatDate;
    date = this.standar(date, format);
    const monthLiteral = format.indexOf('MMM') !== -1;
    return Util.replace(format,
      ['dddd', 'ddd', 'dd', monthLiteral ? 'MMM' : 'MM', 'YYYY', 'HH', 'mm', 'ss'],
      [
        this.dayslong[date.getDay()],
        this.days[date.getDay()],
        (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate(),
        monthLiteral ? this.months[date.getUTCMonth()] : ((date.getUTCMonth() + 1 < 10
          ? '0' : '') + (date.getUTCMonth() + 1)),
        date.getUTCFullYear(),
        (date.getHours() < 10 ? '0' : '') + date.getHours(),
        (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
        (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
      ]);
  },

  sanitizeDateString (dateString, type = 'date') {
    const [year, month = 1, date = 1] = dateString.split('-');
    return `${year}-${pad(month)}-${pad(date)}`.substr(0, {
      date: 10,
      month: 7,
      year: 4
    }[type]);
  }
};