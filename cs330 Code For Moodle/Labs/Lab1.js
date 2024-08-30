function randomarray() {
  var array = [];
  var sum = 0;
  for (i = 0; i < 5; i++) {
    var num = Math.floor(Math.random() * 100);
    array.push(num);
    sum += num;
  }
  var mean = sum / array.length;
  var greater = [];
  for (j = 0; j < array.length; j++) {
    if (array[j] > mean) {
      greater.push(array[j]);
    }
  }
  document.querySelector("#CountGoesHere").innerHTML =
    "The array is: " +
    array +
    "<br>" +
    "The mean is: " +
    mean +
    "<br>" +
    "These numbers are greater: " +
    greater;
}
