function loadContacts() {
  this.contactsData = {};
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      this.contactsData = JSON.parse(this.responseText);
       contactsClicked(JSON.stringify(this.contactsData.results[0]));
      for (var i = 0; i < this.contactsData.results.length; i++) {
        var anchor = document.createElement("a");
        anchor.setAttribute('id', JSON.stringify(this.contactsData.results[i]));
        anchor.setAttribute('onclick', 'contactsClicked(this.id)');
        anchor.setAttribute('class', 'accordion-section');
        if (i <= 6) {
          anchor.setAttribute('data-attribute', 'type1');
        } else {
          anchor.setAttribute('data-attribute', 'type2');
        }
        var node = document.createElement("LI");
        anchor.appendChild(node);
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.setAttribute('onclick', 'deleteContacts(this.id)');
        span.className = "close";
        span.appendChild(txt);
        node.appendChild(span);
        var oImg = document.createElement("img");
        oImg.setAttribute('src', this.contactsData.results[i].picture.thumbnail);
        oImg.setAttribute('alt', 'na');
        oImg.setAttribute('id', 'contactImage');
        node.appendChild(oImg);
        var textnode = document.createTextNode(this.contactsData.results[i].name.first + " " + this.contactsData.results[i].name.last);
        node.appendChild(textnode);
        var array = [];
        array.push(textnode);       
        document.getElementById("myList").appendChild(anchor);
      }
      array.sort();
    }
  }
  xhttp.open("GET", "https://randomuser.me/api/?results=10", true);
  xhttp.send();
  
 
}
// poulating the values in details fields
function contactsClicked(name) {
  var obj = JSON.parse(name);
  document.getElementById("email").value = obj.email;
  document.getElementById("phone").value = obj.cell;
  document.getElementById("im").value = obj.email;
  document.getElementById("address").value = obj.location.city+","+obj.location.city+"-"+obj.location.postcode+","+obj.location.state;
  document.getElementById("url").value = obj.login.salt;
  document.getElementById("other").value = "20th July 1988";
}


// Click on a close button to hide the current list item
function deleteContacts(name) {
  var close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}


// search functinality 
function search() {
  var input, filter, ul, li, a, i;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myList");
  a = ul.getElementsByTagName('a');
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < a.length; i++) {
    li = a[i].getElementsByTagName("li");
    if (li[0].innerText.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

// filtering the items based on type
function applyfilter() {
  var e = document.getElementById("filter");
  var selected = e.options[e.selectedIndex].value;
  var mainDiv = document.getElementById("myList");
  var a = mainDiv.getElementsByTagName("a");
  for (var i = 0; i < a.length; i++) {
    a[i].style.display = 'block';
    if (selected != "default") {
      if (a[i].getAttribute('data-attribute') != selected) { 
        if (a[i].style.display == "block")
          a[i].style.display = 'none';
      }
    }
  }
}
// funtionality to be implemented
function add() {
  var a = document.createElement("a");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  a.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myList").appendChild(a);
  }
  document.getElementById("myInput").value = "";
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  a.appendChild(span);
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
//to reset the fields
function reset(){
   document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("im").value = "";
  document.getElementById("address").value = "";
  document.getElementById("url").value = "";
  document.getElementById("other").value = "";
}
