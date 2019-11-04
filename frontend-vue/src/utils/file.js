export const getObjectURL = file => {
  if (window.createObjectURL) {
    // basic
    return window.createObjectURL(file);
  } else if (window.URL) {
    // mozilla(firefox)
    return window.URL.createObjectURL(file);
  } else if (window.webkitURL) {
    // webkit or chrome
    return window.webkitURL.createObjectURL(file);
  }
};
