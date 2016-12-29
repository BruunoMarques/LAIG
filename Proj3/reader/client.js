function Client(){
  console.log("Starting Client");
}

Client.prototype.constructor=Client;



Client.prototype.getPrologRequest= function(requestString, onSuccess, onError){
	var request = new XMLHttpRequest();
	request.open('GET', 'http://localhost:'+ 8081 + '/' + requestString, false);

	request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);
	};

	request.onerror = onError || function(){console.log("Error waiting for response");};

	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send();
};

/*
Client.prototype.createRequest = function () {
    var temp = new XMLHttpRequest();
    temp.onreadystatechange = function() {
        if (temp.readyState == XMLHttpRequest.DONE ) {
            if (temp.status == 200) {
                return temp.responseText;
            }
            else if (temp.status == 400) {
                console.log("Bad request");
                return false;
            }
            else {
                console.log("No available connection");
                return false;
            }
        }
    };
    return temp;
};

Client.prototype.sendRequest = function (request) {
    var xmlhttp = this.createRequest();
    var url = 'http://localhost:8081/' + "" + request;
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    return xmlhttp.onreadystatechange();
};*/