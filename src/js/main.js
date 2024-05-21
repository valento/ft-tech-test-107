document.addEventListener("DOMContentLoaded", () => {
  if( document.getElementById('ft-quotes-feed') === null || document.getElementById('ft-quotes-feed').innerHTML == '') {
    history.go(0);
  }
})