var DateTime = luxon.DateTime;
var dt = DateTime.now();
var count = 0;

function generate_element(data, count){
	return '\
		<div class="row pt-4">\
			<div class="col-lg-6 mx-auto">\
				<div class="card shadow-sm">\
					<img src='+data.url+' class="bd-placeholder-img card-img-top"/>\
					<div class="card-body">\
						<h1 class="card-title">data.title</h1>\
						<p class="card-text">'+data.explanation+'</p>\
						<div class="d-flex justify-content-between align-items-center">\
							<div class="btn-group">\
								<button id="like_button'+count+'" type="button" class="btn btn-sm btn-outline-secondary" onclick="toogle(this.id)">Like</button>\
							</div>\
							<small class="text-muted">'+data.date+'</small>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>\
	';
	
}
function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

$(document).ready(function(){

	if (document.cookie){
		dt = DateTime.fromISO(document.cookie);
		document.cookie="";
	}

	$.get("https://api.nasa.gov/planetary/apod?date="+dt.minus({ days: count }).toISODate()+"&api_key=46dTeV1tD7K07GNqTru5sklaZV8tOQV5tJYsNS1j",function(data,status){
		var element = $(generate_element(data, count));
		$('#content').append(element);
		count ++;
	});

	$('#selector').change(function(){
		
		document.cookie = this.value;
		location.reload();
		
	});

});

$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() == getDocHeight()) {
			$.get("https://api.nasa.gov/planetary/apod?date="+dt.minus({ days: count }).toISODate()+"&api_key=46dTeV1tD7K07GNqTru5sklaZV8tOQV5tJYsNS1j",function(data,status){
				var element = $(generate_element(data, count));
				$('#content').append(element);
				count ++;
			});
		}
	});

function toogle(elem){
	
	if ($('#'+elem).attr("class")=="btn btn-sm btn-outline-secondary"){
		$('#'+elem).attr("class","btn btn-sm btn-primary");
		
	}
	else{
		$('#'+elem).attr("class","btn btn-sm btn-outline-secondary");
	}
	
}


