/* ==========================================================================
   MAP - IMPORTED 
  ========================================================================== */

  
/* ==========================================================================
   Initialize
  ========================================================================== */
  
 var user_context;
 var loca;
var c = $('input.retrun_search').val().toLowerCase();
var dd = c.replace(/,/g, "");

/* ==========================================================================
   Logo Link
  ========================================================================== */
	//swap logo
	$('li#logo a').attr('href', 'index.php');

/* ==========================================================================
   Confirm Modal
  ========================================================================== */
  
	$('input.searchBox').click(function(){
	$(this).val('')
	});  
  
	$('input#exit_select').click(function(){
		window.location ="index.php";		
	})
	
	$('input#exit').click(function(){
		$('#sfxModal_confirm').modal();		
	});
	
   /* //////////////////// Exit Modal ///////////////////////////////*/
   
 	$('a.exit').click(function(){
		$('#sfxModal_confirm').modal();	
		
	});  
	
	$('div#sfxModal_confirm input.btn-secondary').click(function(){
		$('#sfxModal_confirm').modal('hide')
	});
	
	$('div#sfxModal_confirm input.btn-primary').click(function(){
		window.open('index.php', '_self');
	});
	

/* ==========================================================================
   Location   - From Existing APPt
   ========================================================================== */
    var y = $('span.zipp').text();
    $('input[name=exist_zip]').val(y);
	
/* ==========================================================================
   Location   - Build Map
   ========================================================================== */
var marker = '';   
var ttl = '';  
    
function initialize() {
	
	var mapOptions = {
     panControl: true,
     zoomControl: true,
     scaleControl: true,
	 mapTypeControl: true,
	 scaleControl: true,
	 streetViewControl: true,	
	 zoom: 14
	}
	
	 
if ( $('input.retrun_search').val() == ""){
	var mapOptions = {
	 center: new google.maps.LatLng(40.478165, -88.954401),
	  //center: new google.maps.LatLng(28.8238, 56.0141),
	  zoom: 14
	};
}


if (dd=="3 Wood Rd" || 
    dd =="3 wood rd" || 
	 dd == "3 Wood Rd" || 
     dd == "3 wood rd dallas tx 75214" || 
	 dd == "3 wood rd dallas texas 75214" ||
     dd=="3 wood road"){
	
	var mapOptions = {
	 center: new google.maps.LatLng(32.792020, -96.796667),
     panControl: true,
     zoomControl: true,
     scaleControl: true,
	 mapTypeControl: true,
	 scaleControl: true,
	 streetViewControl: true,	
	 zoom: 14
	};

}


if ( dd == "61704" || 
dd =="2 market st"|| 
dd =="2 market street" || 
dd =="2 Market St"  || 
dd =="2 Market Street"){

	console.log($('input.retrun_search').val());
	
	var mapOptions = {
	 center: new google.maps.LatLng(40.483100, -89.017197),
    panControl: true,
    zoomControl: true,
    scaleControl: true,
	mapTypeControl: true,
	scaleControl: true,
	streetViewControl: true,	
	  zoom: 14
	};
}



if ( c == "60644" || 
     c =="600 N Clark St" || 
	 c == "Chicago, IL" || dd == "chicago il" || 
	 dd == "1 grand ave chicago il 60644" ||
	 dd == "chicago il 60644" ){

	console.log($('input.retrun_search').val());
	//alert(dd);
	
	var mapOptions = {
	 center: new google.maps.LatLng(41.892955, -87.631493),
    panControl: true,
    zoomControl: true,
    scaleControl: true,
	mapTypeControl: true,
	scaleControl: true,
	streetViewControl: true,	
	  zoom: 14
	};
}

if ( dd == "75214" || 
	 dd == "75200"){
	 
	 //alert(dd);
	 
	var mapOptions = {
	 center: new google.maps.LatLng(32.787133, -96.795953),
    panControl: true,
    zoomControl: true,
    scaleControl: true,
	mapTypeControl: true,
	scaleControl: true,
	streetViewControl: true,
	  zoom: 14
	};
}

//Display map in the map-canvas div
var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	
	//Call JSON 
	$.getJSON("location.json",function(results){
	   
	   //reference t as the JSON list
		var t = results.d;
		
		//loop through JSON items
		$.each(t, function (index,location){
		    
			//what the user entered
			user_context = $('input.retrun_search').val().trim().toLowerCase();
			
			//zipcode match - case insensitive
			var json_zip = location.zip.trim().toLowerCase();
			
			//city match - case insensitive
			var json_city = location.city.trim().toLowerCase();
			
			//address match - case insensitive
			var json_addr = location.address;
			
			//alert(j_addr);
			
			loca = location.address[0].trim().toLowerCase().replace(/,/g, "");
			//alert(loca)
			
			$.each(json_addr, function( key, value ) {
					
			    //console.log( key + ": " + value );
			  
			    //look in the array and find the searched subtext
				if ($.inArray(user_context, json_addr) > -1) {
						//alert("p");
						// Center market at the Long lat coords
						var pLoc = new google.maps.LatLng(location.Latitude,location.Longitude);
					  
					    //set the marker if there is a match
						marker = new google.maps.Marker({
						  position: pLoc, 
						  map: map, 
						  title:location.Title,
						  icon: location.icon,
						  locat:location.address[0]	
						});									
						
						//get market title
						var tw = marker.title;
						
						//5-15-2014
						var locatt = marker.locat;
						
						//click event for the map marker for address
						google.maps.event.addListener(marker, 'click', function(event){

						//send facility value to continue button
						/*
						 $('.xrow').each(function(){
							if(!$(this).hasClass('hidden')) {
								var f = $(this).attr('id');
								alert(f);
								$('input.fac_named').val(f);
							 }
						 })
						 */
						 
						
							//take location and replace 'array' wording
							showLocation(locatt);
							
							$('div.xrow').each(function(){
							
							    //get the id of the 
								xrowId = $(this).attr('id');
								
								//console.log(tw + xrowId);
								
								console.log(xrowId);
								console.log($(this).parent().attr('id'));
								
								//Match row id with marker title
								if(tw == xrowId) {
									//alert(tw + ' matched ' + xrowId);
									if( $(this).parent().attr('id') == 'list-view' ){
										$('div#list-view').removeClass('hidden');
									}
									$(this).removeClass('hidden').siblings('.xrow').addClass('hidden');						
								}
							});	
							
						
						 //Button go back to normal 
						 $('.sel_btn').removeClass('hidden'); 
						 $('.loc_btn').addClass('hidden');
						 $('.cont_btn').attr('disabled',true);
						});					
				
				}
			});
			
			//if the user infromation is matching with the addtess or city or zip...
			if ( user_context == json_addr || user_context == json_city || user_context == json_zip) {				
			  
			  // Center market at the Long lat coords
			  var pLoc = new google.maps.LatLng(location.Latitude,location.Longitude);
			    
				//set the marker if there is a match
				marker = new google.maps.Marker({
				  position: pLoc, 
				  map: map, 
				  title:location.Title,
				  icon: location.icon,
				  locat:location.address[0]				  
				});									
				
				//get market title
				var tw = marker.title;
				var locatt = marker.locat;
				
				//click event for the map marker
				google.maps.event.addListener(marker, 'click', function(event){
				
				  
					//map directions
					//calculateRoute([40.483100,-89.017197], [41.886963,-87.623415]);
					//calculateRoute([Chicago, IL],[Bloomington, IL]);
					
					//take location and replace 'array' wording
					showLocation(locatt);				
					
					$('div.xrow').each(function(){
							//get the id of the 
							xrowId = $(this).attr('id');
							
							//console.log(xrowId);
							//console.log($(this).parent().attr('id'));
							
							//Match row id with marker title
							if(tw == xrowId) {
							//alert(tw + ' matched ' + xrowId);
								if( $(this).parent().attr('id') == 'list-view' ){
								//alert($(this).parent().attr('id') + ' paernt is list-view');
									$('div#list-view').removeClass('hidden');
								}
								$(this).removeClass('hidden').siblings('.xrow').addClass('hidden');						
							}
					});	
				});
				
				// Auto pop
				if ($('input.retrun_search').val() == "3 Wood Rd") {
					$('div.xrow').each(function(){
						xrowId = $(this).attr('id');
						//console.log(xrowId);
						//console.log($(this).parent().attr('id'));
						
						if(tw == xrowId) {
							if( $(this).parent().attr('id') == 'list-view' ){
								$('div#list-view').removeClass('hidden');
							}
							$(this).removeClass('hidden').siblings('.xrow').addClass('hidden');						
						}
					});	
				}					
				
				/* Cab 3 
				attachSecretMessage(marker);
				
				function attachSecretMessage(marker) {
					//marker.setIcon("markeryes.png"); 
				  var message = '<div class="showFacility">'+ tw + '</div>';
				  var infowindow = new google.maps.InfoWindow({
					content: message
				  });
				  
				  google.maps.event.addListener(marker, 'mouseover', function() {
					infowindow.open(marker.get('map'), marker);
				  });
				}	
				Cab 3  */		
				
			}

		});
		
		marker.setMap(map);

	});
}

google.maps.event.addDomListener(window, 'load', initialize);

/* ==========================================================================
   Location   - Marker Events
   ========================================================================== */
   
$('a.map_list').click(function(event){
	//alert('pppp');
	event.preventDefault();	
	var displayItem = $(this).attr('title');
	//console.log(displayItem);
	
	
	$('div.FacilityDisplay').each(function(){
		var facility_display = $(this).attr('id');
		if(facility_display == displayItem) {
				$(this).removeClass('hidden').siblings('.FacilityDisplay').addClass('hidden');	
				
				if (displayItem == 'list-view') {
					$('div#map-canvas').hide();
					$(this).children('.xrow').removeClass('hidden');
				}else {
					$('div#map-canvas').show();
					$(this).children('.xrow').removeClass('hidden');
				}
		}
	});	

});
   
   
/* ==========================================================================
   Location   - Pagination
   ========================================================================== */
   
var ex = $('div.xrow').length;
var ix = 1, yx=1, vx=1,recordGoup = 5;

var remainder = ex % recordGoup;

$('div.xrow').each(function() {
    $(this).addClass('yes' + ix);
    $(this).addClass('no' + yx);
	
    //if( ix < 3) {
	if( ix % recordGoup) {   	
        ix++;
    }else {
        ix= 1;
        
        $('<a class="in"> ' + yx + ' &middot ' +  ' ' + ' </a> ').insertBefore('a.pag-right');
		yx++;
    }
});

if (remainder) {
$('<a class="in">' + yx + '</a> ').insertBefore('a.pag-right');
yx++;
}

$('a.in').each(function(){
    $(this).addClass('no'+ vx);
    vx++;
});

$('a.in').click(function() {
var wx = $(this).attr('class').substr(3,3);
var zx = $('tr').attr('class').substr(5,3);
	$('tr.hidden.'+ wx).removeClass('hidden');
	$('tr.xrow').not("." + wx ).addClass('hidden');
});

//Show total results
$('span#total_items').text(ex);	

/* //////////////////// Add zip after Zip has been submitted ///////////////////////////////*/
if ($('.retrun_search') != '') {
	$('.searchBox').val($('.retrun_search').val());
}
/* //////////////////// Sort Distance///////////////////////////////*/

$('a.sort-dist').toggle(function(event){
	$('div.xrow').tsort('div.dis',{order:'desc'});
	event.preventDefault();	
},
function(event){	
	$('div.xrow').tsort('div.dis',{order:'asc'});	
	event.preventDefault();		
});

/* //////////////////// Replace the Address ///////////////////////////////*/

function showLocation(locatt) {
	$('span.address').text(locatt);
	$('input.hid-address').val(locatt);
}

/* //////////////////// Show map ///////////////////////////////*/

//$('div.disclosures').append('span.showMap');
$('br.showMap').hide().appendTo('div.loading-indicator');	

/* ==========================================================================
   Directions for Dallas - Existing
  ========================================================================== */
  
 /* ==========================================================================
   Continue to Date interaction
  ========================================================================== */ 
  
  $('.sel_btn').click(function() {
  var f = $('.fac_name').closest('.xrow:visible').attr('id');
  $('input.fac_named').val(f);
  //alert( f);
  $(this).addClass('hidden');
  $('img.blue_chk').addClass('hidden');
  
  $('.loc_btn').removeClass('hidden');
  $('.cont_btn').attr('disabled',false);
  
  
  });
  
  /* ==========================================================================
   Continue to Date interaction
  ========================================================================== */ 
  
  