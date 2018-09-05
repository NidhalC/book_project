
function Book(auteur, titre, ISBN){
  this.auteur=auteur;
  this.titre = titre;
  this.ISBN = ISBN;

}

/*function loadDoc(){
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'https://api.scorelooker.com/books', true);
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var reponse= xhttp.responseText;
      var j= document.getElementById('showBooks');

      for (let i=0 ;i <reponse.length; i++){

        j.innerHTML += obj[i].titre   ;
        j.innerHTML += obj[i].auteur ;
        j.innerHTML += obj[i].ISBN ;

      }
    };
  }
  xhttp.send();
}*/

function addBook() {
  var li = document.createElement("li");
  var inputTitre = document.getElementById("myTitre").value;
  var inputAuteur = document.getElementById("myAuteur").value;
  var inputISBN = document.getElementById("myISBN").value;
  var obj = new Book(inputTitre,inputAuteur,inputISBN);
  var ls = localStorage.getItem('saveobj');
  insertRow(obj);
  if (ls == ''){
    localStorage.setItem('saveobj', JSON.stringify([obj]));
  }else{
    console.log(ls);
    var books = JSON.parse(ls);
    books.push(obj);
    localStorage.setItem('saveobj', JSON.stringify(books));
  }
}


/*
  var t = document.createTextNode(obj);
  li.appendChild(t);

  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
} */

function recuperer(){
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'https://api.scorelooker.com/books', true);
  xhttp.responseType = 'json';

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
  var text = xhttp.response; // get the string from the response
  for(let i=0;i<text.length;i++){
    insertRow(text[i]);
    console.log(text[i].auteur);
  }

}
}
var rep = xhttp.send();
}

function insertRow(book) {
  var foo = document.getElementById('showBooks').insertRow(1);
  var cell1 = foo.insertCell(0);
  var cell2 = foo.insertCell(1);
  var cell3 = foo.insertCell(2);
  cell1.innerText = book.titre;
  cell2.innerText = book.auteur;
  cell3.innerText = book.ISBN;
}

recuperer();
localStorage.setItem('saveobj', '');
