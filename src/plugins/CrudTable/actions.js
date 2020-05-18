export default {
  updateList(id = 'btn-refresh') {
    if (document.getElementById(id)) {
      document.getElementById(id).click();
    }
  }
};
