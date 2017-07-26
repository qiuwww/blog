// ajax的替代方案fetch.js


fetch('flowers.jpg').then(function(response) {
  if(response.ok) {
    return response.blob();
  }
  throw new Error('Network response was not ok.');
}).then(function(myBlob) { 
  var objectURL = URL.createObjectURL(myBlob); 
  myImage.src = objectURL; 
}).catch(function(error) {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});

// 具体需要参考
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch