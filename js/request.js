function getRequest(body, callback = (response) => {}) {
  fetch("https://jscp-diplom.netoserver.ru/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body
  })
  .then(response => response.json())
  .then(data => {
    callback(data);
  })
  .catch(error => {
   
  });
}