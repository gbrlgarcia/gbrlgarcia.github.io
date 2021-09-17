var DateTime = luxon.DateTime;
var dt = DateTime.now();
var count = 0;

function generate_template(count){
	return '\
		<div class="row pt-4">\
			<div class="col-lg-6 mx-auto">\
				<div id="media_container" class="card shadow-sm">\
					<img id="img_url'+count+'" src="loading.gif" class="bd-placeholder-img card-img-top"/>\
					<div class="card-body">\
						<h2 id="title'+count+'" class="card-title fs-3"></h1>\
						<p id="explanation'+count+'" class="card-text"></p>\
						<div class="d-flex justify-content-between align-items-center">\
							<div class="btn-group">\
								<button id="like_button'+count+'" type="button" class="btn btn-sm btn-outline-secondary" onclick="toogle(this.id)">Like</button>\
							</div>\
							<small id="date'+count+'" class="text-muted"></small>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>\
	';
	
}

function insert_data(count){
	
	$.get("https://api.nasa.gov/planetary/apod?date="+dt.minus({ days: count }).toISODate()+"&api_key=46dTeV1tD7K07GNqTru5sklaZV8tOQV5tJYsNS1j",function(data,status){
		
		if (data.media_type=="image"{
			$('#img_url'+count).attr("src",data.url);
			
		}
		else if (data.media_type=="video"){
			$('#img_url'+count).remove();
			var video = $('<iframe width="727" height="409" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
			$('#media_container').prepend(video);
		}
		
		$('#title'+count).val(data.title);
		$('#explanation'+count).val(data.explanation);
		$('#date'+count).val(data.date);
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

	var template = $(generate_template(count));
	$('#content').append(template);
	

	$('#selector').change(function(){
		
		$('#content').empty();
		dt = DateTime.fromISO(this.value);
		count = 0;
		var template = $(generate_template(count));
		$('#content').append(template);
		insert_data(count);
		
	});

});

$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() == getDocHeight()) {
			var template = $(generate_template(count));
			$('#content').append(template);
			insert_data(count);
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


