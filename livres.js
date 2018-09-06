function Book(auteur, titre, ISBN){
	this.auteur=auteur;
	this.titre = titre;
	this.ISBN = ISBN;
}

function recuperer(){
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'https://api.scorelooker.com/books', true);
	xhttp.responseType = 'json';

	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
var text = xhttp.response; // get the string from the response
for(let i=0;i<text.length;i++){
	insertRow(text[i]);
}

}
}
var rep = xhttp.send();
}

function insertRow(book) {
	var foo = document.getElementById('showBooks').insertRow(-1);
	var cell1 = foo.insertCell(0);
	var cell2 = foo.insertCell(1);
	var cell3 = foo.insertCell(2);
	var cell4 = foo.insertCell(3);
	cell1.innerText = book.titre;
	cell2.innerText = book.auteur;
	cell3.innerText = book.ISBN;
	var span = document.createElement("span");
	var txt = document.createTextNode("\u00D7");
	span.className = "close";
	span.appendChild(txt);
	cell4.appendChild(span);
	var close = document.getElementsByClassName("close");
	var i;
	for (i = 0; i < close.length; i++) {
		close[i].onclick = function() {
			document.getElementById("showBooks").deleteRow(this.parentNode.parentNode.rowIndex);
			var d=document.getElementById("message");
			var sp = document.getElementById("popUp");
			sp.innerText='Livre supprimé';
			d.className = 'red';
			d.style = "display:block;";
			setTimeout(function(){
				d.style = "display:none;";
			}, 2000);
		}
	}
}

function addBook() {
	var inputTitre = document.getElementById("myTitre").value;
	var inputAuteur = document.getElementById("myAuteur").value;
	var inputISBN = document.getElementById("myISBN").value;
	if(inputTitre=='' || inputAuteur=='' || inputISBN==''){
		alert('Merci de remplir tous les champs');
	}else {
		if(isNaN(parseFloat(inputISBN))){
			alert('Numéro ISBN non valide');
		}else{
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
			var d=document.getElementById("message");
			var sp = document.getElementById("popUp");
			sp.innerText='Livre ajouté';
			d.className = 'green';
			d.style = "display:block;";
			setTimeout(function(){
				d.style = "display:none;";
			}, 2000);
		}
	}
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
	close[i].onclick = function() {
		console.log('appel methode');
		document.getElementById("showBooks").deleteRow(i);
	}
}

recuperer();
verif();

function verif(){
	if(localStorage.getItem('saveobj')!=''){
		var books = JSON.parse(localStorage.getItem('saveobj'));
		for(i=0; i<books.length;i++){
			insertRow(books[i]);
		}
	}
}


