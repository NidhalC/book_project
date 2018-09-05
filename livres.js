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