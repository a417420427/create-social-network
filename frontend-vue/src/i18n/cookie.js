export const cookie = {
  get: cname => {
    const name = cname + '=';

    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.indexOf(name) === 0) {
        return cookie.substr(name.length, cookie.length - name.length);
      }
    }

    return '';
  },
  set: (key, value, dateString, path) => {
    if (typeof key !== 'string' || !key) {
      return;
    }

    value = value || '';

    let date = new Date();
    if (!value) {
      // no value is set, delete the cookie
      date = new Date('1970-01-01');
      dateString = date.toGMTString();
    } else if (!dateString) {
      // by default, save cookie for one year
      date = new Date(date.getTime() + 365 * 24 * 3600 * 1000);
      dateString = date.toGMTString();
    }

    path = path || '/';

    const expires = 'expires=' + dateString;

    document.cookie = key + '=' + value + '; ' + expires + '; path=' + path;
  },
};
