export function copy() {
  console.log("permission-denied copy click");

  var copyText = document.getElementById("js-copy-data");

  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  document.execCommand("copy");
}

export function open() {
  console.log("permission-denied openSocketsPage click");
}
