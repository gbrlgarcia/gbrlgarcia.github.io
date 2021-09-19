var DateTime = luxon.DateTime;
var dt = DateTime.now();
var count = 0;

function insert_content(c){
	
	var template = '\
		<div class="row pt-4">\
			<div class="col-lg-6 mx-auto">\
				<div id="media_container'+c+'" class="card shadow-sm">\
					<div class="d-flex justify-content-center">\
						<img id="media_url'+c+'" src="loading.gif" width="128px" height="128px"/>\
					</div>\
					<div class="card-body">\
						<h2 id="title'+c+'" class="card-title fs-3"></h1>\
						<p id="explanation'+c+'" class="card-text"></p>\
						<div class="d-flex justify-content-between align-items-center">\
							<div class="btn-group">\
								<button id="like_button'+c+'" type="button" class="btn btn-sm btn-outline-secondary" onclick="toogle(this.id)">Like</button>\
							</div>\
							<small id="date'+c+'" class="text-muted"></small>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>\
	';
	
	$('#content').append(template);
	
	$.get("https://api.nasa.gov/planetary/apod?date="+dt.minus({ days: c }).toISODate()+"&api_key=46dTeV1tD7K07GNqTru5sklaZV8tOQV5tJYsNS1j",function(data,status){
		
		if (data.media_type=="image") {
			$('#media_url'+c).remove();
			var img = $('<div class="d-flex justify-content-center"><img id="media_url'+c+'" src="'+data.url+'" class="bd-placeholder-img card-img-top"/></div>');
			$('#media_container'+c).prepend(img);
			
		}
		if (data.media_type=="video"){
			$('#media_url'+c).remove();
			var video = $('<div class="ratio ratio-16x9"><iframe id="media_url'+c+'" src="'+data.url+'"></iframe></div>');
			$('#media_container'+c).prepend(video);
		}
		$('#title'+c).append(data.title);
		$('#explanation'+c).append(data.explanation);
		$('#date'+c).append(data.date);
		
		count ++;
	});
	
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

	$('#selector').attr("max",DateTime.now().toISODate());
	$('#selector').val(DateTime.now().toISODate());

	insert_content(count);

	$('#selector').change(function(){
		
		$('#content').empty();
		dt = DateTime.fromISO(this.value);
		count = 0;
		insert_content(count);
		
	});

});

$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() >= getDocHeight()) {
				insert_content(count);
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


