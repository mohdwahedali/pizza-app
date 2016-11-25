//Start script to handle pizza order flow

if(localStorage.getItem("orderData") && localStorage.getItem("orderData").length > 0){
	var dt = localStorage.getItem("orderData");
	var orderData = JSON.parse(dt);
}else{
	var orderData = {
		"Size": '',
		"Ingredients": '',
		"Cheese": 'No',
		"FirstName": '',
		"SurName": '',
		'Street': '',
		'StreetNo':'',
		'PostCode':'',
		'City':''
	};

}


function updateOrder(){
	var prp, val;
	prp = arguments[0];
	val = arguments[1];
	orderData[prp] = val;

	if (typeof(Storage) !== "undefined") {
	    localStorage.setItem("orderData", JSON.stringify(orderData));
	} else {
	    console.log("Storage is not supported !");
	}
}

$(document).ready(function() {

	//Script to handle drop-down selection
	
	//Size selection
    $('.size-button-selected').on('click', function(){
    	$('.size-button-selected').removeClass('selected');
    	$(this).toggleClass('selected');
    	var size = $(this).find('p').text().trim();
    	updateOrder('Size', size);
    });	

	$(".plus-button").on('click', function () {

		var selectedVal = $('.selectpicker option:selected').val().trim();
		var valDom = '<span class="value-color">'+selectedVal+'<img src="images/icons/cancel_small.png" alt="cancel-icon"></span>';
		var valExist = [];

		if($('.value .value-color').length > 0){
			$('.value .value-color').each(function(){
				valExist.push($(this).text().trim());				
			});
		}
		
		if(valExist.indexOf(selectedVal) == -1){
			$('p.value').append(valDom);
		}
		

	});
	$('.value').on('click', '.value-color img', function(){
		$(this).parent().remove();
	});

	//Next button in order screen

	$('.orderNext').on('click', function(){

		var ings = [];
		if($('.value .value-color').length > 0){
			$('.value .value-color').each(function(){
				ings.push($(this).text().trim());				
			});
		}

		var ingsStr = ings.toString();
		updateOrder('Ingredients', ingsStr);

		var cheese = $('.switch').find('input#cheese').is(':checked');
		cheese = (cheese=== true) ? 'Yes' : 'No';
		updateOrder('Cheese', cheese);    
	});

	//Next button in address screen	

	$('.addressNext').on('click', function(){		
		
		var fName, sName, street, sNo, pin, city;

		fName = $('#fName').val();
		updateOrder('FirstName', fName);

		sName = $('#sName').val();
		updateOrder('SurName', sName);

		street = $('#street').val();
		updateOrder('Street', street);

		sno = $('#sno').val();
		updateOrder('StreetNo', sno);


		pin = $('#pin').val();
		updateOrder('PostCode', pin);

		city = $('#city').val();
		updateOrder('City', city);


	});

	//to display data in finish page
	
	if($('#pIngs').length > 0){	
		$('#pIngs').text(orderData['Ingredients']);
	}
	if($('#pSize').length > 0){	
		$('#pSize').text(orderData['Size']);
	}
	if($('#pCheese').length > 0){	
		$('#pCheese').text(orderData['Cheese']);
	}
	if($('#pAddr').length > 0){
		var addr = orderData['FirstName'] +' <br> ' + orderData['Street'] +','+ orderData['StreetNo'] +' <br>'+ orderData['PostCode'] +' '+ orderData['City'];	
		$('#pAddr').append(addr);
	}
	

	$('.makeOrder').on('click', function(e){
		var orderData = localStorage.getItem("orderData");
		
        e.preventDefault();

		$.ajax({
		  'url': "https://echo.getpostman.com/post",
		  'type': 'POST',
		  'data': orderData,
		  'dataType': 'text/json',
		}).done(function(sData) {
		  	console.log("Success: "+sData);
		  	//localStorage.setItem("orderData", '');
		  	//document.location.href='thankyou.html';
		}, function(){
			console.log("Failed !");
		});

		
		document.location.href='thankyou.html';

	});

	if($('#orderUserName').length > 0){		
		$('#orderUserName').text(orderData['FirstName']);
		localStorage.setItem("orderData",'');
	}

	

});