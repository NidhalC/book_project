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
			let a = this.parentNode.parentNode.rowIndex;
			localStorage.removeItem(document.getElementById('showBooks').getElementsByTagName('tr')[a].cells[2].innerText);
			console.log(document.getElementById('showBooks').getElementsByTagName('tr')[a].cells[2].innerText);
			document.getElementById("showBooks").deleteRow(a);
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
			insertRow(obj);

			localStorage.setItem(inputISBN, JSON.stringify(obj));
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


recuperer();
verif();

function verif(){
	if(localStorage.length!=0){
		for(i=0; i<localStorage.length;i++){
			let cle = localStorage.key(i);
			console.log(cle);
			console.log(typeof(cle));
			console.log(localStorage.getItem(cle));
			console.log(JSON.parse(localStorage.getItem(cle)).auteur);
			insertRow(JSON.parse(localStorage.getItem(cle)));
		}
	}
}


