document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("currentyear").textContent = `\u00A9 ${new Date().getFullYear()}`;
  document.getElementById("lastmodified").textContent = `Last Modified: ${document.lastModified}`;
});