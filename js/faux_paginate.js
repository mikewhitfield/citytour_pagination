/* ==========================================================================
   Pagination
   ========================================================================= */	

function pagination() { 


	g.ix = 1;
	g.yx=1;
	
	var ex = $('article.map_tour_info').length;
	vx=1,recordGoup = 2, bx =5;

	var remainder = ex % recordGoup;


	//alert(remainder);

	$('article.map_tour_info').each(function() {	

	
		$(this).addClass('yes' + g.ix);
		$(this).addClass('no' + g.yx);
		
		//alert(g.yx);
		resultNum.push(g.yx);	
				
		if( g.ix % recordGoup) { 	
			g.ix++;
		}else {
			g.ix= 1;
			
			$('<a href="#" class="in">' +  g.yx  + '</a> ').insertBefore('a.pag-right');
			g.yx++;		
		}
		
		/*
		if($(this).hasClass('no1')){
		alert()
			$(this).removeClass('hidden');
		}else{
			$(this).addClass('hidden');
		}
		*/
				
	});
		
	   //alert(remainder);
	   if(remainder) {
	   $('<a href="#" class="in">' + g.yx + '</a> ').insertBefore('a.pag-right');
	   g.yx++;
	   }

	$('a.in').each(function(){
		//make an attribute with the value of the pagination number
		g.shoNum = $(this).text();
		$(this).attr("data-shownum", g.shoNum);
		
		//send the pagintation value to url
		$(this).attr("href","tour.html" + "?" + "sho=" + g.shoNum);
		

		
		//create a class to match the paginated row
		$(this).addClass('no'+ vx);
		vx++;
	});


	
	$('article.map_tour_info.hidden.'+ "no" + g.paginationNum).removeClass('hidden');
	$('article.map_tour_info').not("." + "no" + g.paginationNum).addClass('hidden');	
	
	$('.page-left').click(function() {

		if ( g.current_page > 0 ) {
			var yy = $(this).attr('class').substr(10,3)
			//alert(g.current_page);			  
			$('.page-left[class*="n"]').removeClass();
			$(this).addClass('page-left');			
			$(this).addClass('no' + g.current_page);   
			g.current_page--
			
			$('article.map_tour_info').each(function(){
				if(g.current_page > 0){
					//make css into a list
					var trClassName  = $(this).attr('class').substr(5,3);//replace with hasClass method
						
					//alert(trClassName + " " + "no" + g.current_page);
					
					if (trClassName   != "no" +  g.current_page ) {
						$(this).addClass('hidden');
					}else{
						$(this).removeClass('hidden');
					}
				}
			});
					
		}else {
			alert("test");
			return
		}
				
	});


	$('.pag-right').click(function() {
		var total = $('a.in').length + 1;
		if ( g.current_page < total  ) {
			var yy = $(this).attr('class').substr(9,3)
			//alert(g.current_page);			  
			$('.pag-right[class*="n"]').removeClass();
			$(this).addClass('pag-right');			
			$(this).addClass('no' + g.current_page);   
			g.current_page++
			
			$('article.map_tour_info').each(function(){
				if(g.current_page < total ){
					//make css into a list
					var trClassName  = $(this).attr('class').substr(5,3);
						
					//alert(trClassName + " " + "no" + g.current_page);
					
					if (trClassName   != "no" +  g.current_page ) {
						$(this).addClass('hidden');
					}else{
						$(this).removeClass('hidden');
					}
				}
			});
					
		}else {
			alert("test");
			return
		}
				
	});	
}