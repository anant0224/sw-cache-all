var perm;
var oldresponse;

function create() {

  var response = perm;
  var cats = document.getElementById("cats");
	//$.each(response.photos.photo, function(i, item) {
		var src = "https://farm9.static.flickr.com/8759/17724301858_a2184c4ee6_n.jpg";
		var container = document.createElement('LI');
		var image = document.createElement('img');
		image.src = src;
		container.appendChild(image);
		cats.appendChild(container);
	//});
	
	var arrayResponse = oldresponse;
	var myImage = document.createElement('img');
  var myFigure = document.createElement('figure');
  var myCaption = document.createElement('caption');
  var imageURL = arrayResponse[1].url;

  myImage.src = imageURL;

  
  myFigure.appendChild(myImage);
  myFigure.appendChild(myCaption);
  var imgSection = document.querySelector('section');
  imgSection.appendChild(myFigure);
  
}

function jsonFlickrApi(response) {
  perm = response;
	/*var cats = $("#cats");
	$.each(response.photos.photo, function(i, item) {
		var src = "https://farm"
			+ item.farm
			+ ".static.flickr.com/"
			+ item.server
			+ "/" + item.id
			+ "_" + item.secret
			+ "_n.jpg";
		var container = $("<li/>").appendTo(cats);
		$("<img/>").attr("src", src).appendTo(container);
	});
	*/
	
	
}

function imgLoad(imgJSON) {
  // return a promise for an image loading
  return new Promise(function(resolve, reject) {

    var init = { method: 'GET' };    
    fetch(imgJSON.url).then(function(response) {
      if (response.status == 200) {
        var arrayResponse = [];
        response.blob().then(function(myBlob) {
          arrayResponse[0] = myBlob;
          arrayResponse[1] = imgJSON;
          resolve(arrayResponse);
        });

      } else {
        reject(Error('Image didn\'t load successfully; error code:' + response.statusText));
      }
    }, function() {
      reject(Error('There was a network error.'));
    }); 
  });
};

$(function() {

  /*var init = { method: 'GET' };    
  fetch(flickr_api_url).then(function(response) {
    if (response.status == 200) {
      var arrayResponse = [];
      response.blob().then(function(myBlob) {
        arrayResponse[0] = myBlob;
        arrayResponse[1] = imgJSON;
        var myImage = document.createElement('img');
        var myFigure = document.createElement('figure');
        var myCaption = document.createElement('caption');
        var imageURL = window.URL.createObjectURL(arrayResponse[0]);

        myImage.src = imageURL;
        myImage.setAttribute('alt', arrayResponse[1].alt);
        myCaption.innerHTML = '<strong>' + arrayResponse[1].name + '</strong>: Taken by ' + arrayResponse[1].credit;
        
        var imgSection = document.querySelector('section');
        imgSection.appendChild(myFigure);
        myFigure.appendChild(myImage);
        myFigure.appendChild(myCaption);
      });

    } else {
      reject(Error('Image didn\'t load successfully; error code:' + response.statusText));
    }
  }, function() {
    reject(Error('There was a network error.'));
  });*/

	$.ajax({
		url: flickr_api_url,
		method: 'GET',
		dataType: 'jsonp',
		jsonpCallback: 'jsonFlickrApi',
		cache: true,
		data: {
			tags: 'cat',
			safe_search: 1,
			per_page: 20
		},
		error: function(err) {
			console.log(err);
		}
	});
	
  imgLoad(Gallery.images[0]).then(function(arrayResponse) {
    oldresponse = arrayResponse;
  }, function(Error) {
    console.log(Error);
  });      
	
});

if(navigator.serviceWorker) {
	navigator
		.serviceWorker
		.register('sw.js')
		.then(function(r) {
			console.log('Cats are now available offline');
		})
		.catch(function(e) {
			console.log('Cats are NOT available offline');
			console.log(e);
		});
} else {
	console.log('Service workers are not supported');
}
