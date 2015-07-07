// JavaScript Document
jQuery(document).ready(function(e) {
    var $ = jQuery;
	//Get the height of the window and set it to the container
	var height = $(window).height() - 50
	$("#container").css('minHeight',height+'px');
	$("#step-5 div").unbind('click');
	$("#step-5 div").click(function(e) {
		if(!$(this).data('color')) {
			return;
		}
		var curColor = $("#color").val();
		$('div[data-color="'+curColor+'"]').html('');
		$("#color").val($(this).data('color'));
		$(this).html('<img src="images/check.png">');
		e.stopPropagation();
	});
	//Data used to select products that goes with the tank
	var prams = { "tanks":['10','20','30','40','55'], "standName":["Medium","Medium","Medium","Large","XL"],"standData":{"Medium":{"cost":"92.99","forTank":"10, 20, 30"},"Large":{"cost":"123.99","forTank":"40"},"XL":{"cost":"185.99","forTank":"55"}},"filterCost":{"30":"32.99","50":"43.99","70":"48.99"},"forFilter":{"10":["30"],"20":["30","50"],"30":["30","50"],"40":["50","70"],"55":["70"]},"gravelCost":{"5":"5.49","25":"16.99"}}
	//Inital data object
	var data = { 'total':"0", "items":{"Tank":{"cost":"0"},"Stand":{"cost":"0"},"Filter":{"cost":"0"},"Gravel":{"cost":"0", "color":"none", "5":{}, "25":{}},"Decorations":{"pp":{"cost":"0"},"sfc":{"cost":"0"},"lfc":{"cost":"0"}}}, "customerInfo":{},"pickupData":{"storeNumber":"532"}};
	//set the current open step to 1 this is used to determen which step needs to be closed when opeing another step
	var openStep = "1";
	//function to update the order total in the shoping cart
	function updateTotal() {
		var total = parseFloat(data.total);
		total = total.toFixed(2);
		$("#total th:eq(1)").html('$'+total);
	}
	//function to add items to the cart in a way they can be changed also calls the updateTotal
	function addItem(items, cost, id ,replaceValues) {
		var total = parseFloat(data.total) + parseFloat(cost);
		total = total.toFixed(2);
		data.total = total;
		total = "$"+total;
		cost = parseFloat(cost);
		cost = cost.toFixed(2);
		cost = "$"+cost;
		if(replaceValues==true) {
			$('tr[stepid="'+id+'"] td:eq(0)').html(items);
			$('tr[stepid="'+id+'"] td:eq(1)').html(cost);
			updateTotal();
		} else {
			$("#total").remove();
			var output = '<tr stepid="'+id+'"><td>'+items+'</td><td>'+cost+'</td></tr><tr id="total"><th>Total</th><th>'+total+'</th></tr>';
			$("table").append(output);
		}
	}
	//function that enables and openes the next step
	function nextStep(stepid) {
		$("#step-"+stepid+" .drop-down").slideToggle(500);
		stepid = parseFloat(stepid) + 1;
		$("#step-"+stepid).removeClass('disabled');
		$("#step-"+stepid+" .drop-down").css('display','none').slideToggle(500);
		openStep = stepid;
	}
	//Function for getting the current time and translating it into the pickup time
	function getPickupTime() {
		var d = new Date();
		var hours = d.getHours();
		hours = hours + 2
		if(hours>23) {
			hours = hours - 24;
		}
		if(hours>19 || hours<9) {
			hours = 9;
		}	
		var ap='';
		if(hours>12) {
			hours = hours - 12
			ap = 'PM';
		} else {
			ap = 'AM';
		}
		if(hours==0) {
			hours=12
		}
		var minutes = d.getMinutes();
		if(minutes<10) {
			minutes = "0"+minutes;
		}
		output = hours+":"+minutes+" "+ap;
		return output;
	}
	//Click event on the h4s inside each step
	$(".step h4").click(function() {
		var stepid = $(this).parent('div').attr('id');
		stepid = stepid.replace('step-','');
		if($(this).parent('div').hasClass('disabled') || stepid==openStep) {
			return
		}
		$("#step-"+openStep+" .drop-down").slideToggle(500);
		$("#step-"+stepid+" .drop-down").slideToggle(500);
		openStep = stepid;
	});
	$('input[value="Next"], input[value="Update"]').click(function() {
		var stepid = $(this).attr('stepid');
		if(stepid=="1") {
			$("#step-1 .drop-down .alert-danger").remove();
			if(!$("#fname").val() || !$("#lname").val() || !$("#phone").val() || !$("#email").val()) {
				$("#step-1 .drop-down").append('<div id="step-1-error" class="alert alert-danger alert-dismissible fade in"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Please enter all information</div>');
				return
			}
			data.customerInfo.fname=$("#fname").val();
			data.customerInfo.lname=$("#lname").val();
			data.customerInfo.email=$("#email").val();
			var phone = $("#phone").val();
			phone = phone.replace(/\D/g, "");
			if(phone.length<10) {
				$("#step-1 .drop-down").append('<div id="step-1-error" class="alert alert-danger alert-dismissible fade in"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Please enter a valid phone number</div>');
				return
			}
			phone = "("+phone.substring(0,3)+")-"+phone.substring(3,6)+"-"+phone.substring(6,10);
			data.customerInfo.phone = phone
			var email = data.customerInfo.email.indexOf('@');
			if(email==-1) {
				$("#step-1 .drop-down").append('<div id="step-1-error" class="alert alert-danger alert-dismissible fade in"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Please enter a valid email address</div>');
				return
			}
			var output = data.customerInfo.fname+' '+data.customerInfo.lname;
			$(".summary h4:eq(0)").html("Hello "+output); 
			var output =data.customerInfo.phone+'<br>'+data.customerInfo.email;
			$("#info-out").html(output);
			$(".summary").removeClass('summary-closed');
		}
		if(stepid=="2") {
			$('input[value="Checkout"]').addClass('disabled');
			var size=$("#step-"+stepid+" select").val();
			$("#step-2 .drop-down .alert-danger").remove();
			if(size=='') {
				$("#step-2 .drop-down").append('<div class="alert alert-danger alert-dismissible fade in"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Please select a tank size</div>');
				return;
			}
			data.items.Tank.name=size+" Gallon Tank";
			if($(this).val()=='Next') {
				addItem(size+' Gallon Tank', size, "2", false);
			} else {
				var oldCost = data.items.Tank.cost;
				data.total = "0";
				data.items.Stand.cost="0";
				data.items.Filter.cost="0";
				$("#step-3, #step-4, #step-5, #step-6").addClass('disabled');
				$('.disabled input[type="button"]').val('Next');
				$('#step-6 input[type="button"]').val('Update');
				$(".summary table").html('<tr><th>Item</th><th>Cost</th></tr>');
				addItem(size+' Gallon Tank', size, "2", false);
				nextStep(stepid);
			}
			data.items.Tank.cost=size;
			var items = prams.tanks.length;			
			var curItem = 0
			while(curItem!=items) {
				if(size==prams.tanks[curItem]) {
					var stand = prams.standName[curItem];
					var cost = prams.standData[stand].cost;
					var forTank = prams.standData[stand].forTank;
					var output = stand+" Aquarium Stand: $"+cost;
					$("#step-3 .value").html(output);
					//$("#stand").val(stand);
					stand = stand+" Aquarum Stand"
					addItem(stand,cost,"3",false);
					$('tr[stepid="3"]').hide();
					data.total = data.total - cost;
					updateTotal();
					data.items.Stand.cost=cost;
					data.items.Stand.name=stand;
					data.items.Stand.purchasing="false";
				}
				curItem = curItem + 1
			}
			var items = prams.forFilter[size].length;
			var curItem = 0 
			var output ='<option value="">Select...</option>';
			while(items!=curItem) {
				var curItemName = prams.forFilter[size][curItem];
				var cost = prams.filterCost[curItemName];
				output = output + '<option value="'+curItemName+'">Power Filter '+curItemName+': $'+cost+'</option>';
				curItem = curItem + 1;
			}
			$("#step-4 select").html(output);
			var output='';
			var required = size*2
			var curTotal=0;
			var gravelSmall=0;
			var gravelLarge=0;
			while(curTotal!=required) {
				if(curTotal+25>required) {
					curTotal = curTotal + 5
					gravelSmall = gravelSmall + 1;
				} else {
					curTotal = curTotal + 25
					gravelLarge = gravelLarge + 1;
				}
			}
			data.items.Gravel["5"].amount=gravelSmall;
			data.items.Gravel["25"].amount=gravelLarge;
			data.items.Gravel["5"].cost=gravelSmall * parseFloat(prams.gravelCost["5"]);
			data.items.Gravel["25"].cost=gravelLarge * parseFloat(prams.gravelCost["25"]);
			var output ='You will need '+required+' lb. of gravel:<br>('+gravelSmall+') 5 lb bags: $'+prams.gravelCost["5"]+' each<br>('+gravelLarge+') 25 lb bags: $'+prams.gravelCost["25"]+' each';
			$("#step-5 .info").html(output);
			if($(this).val()=='Next') {
				$("#step-2 .drop-down").append('<div class="alert alert-warning alert-dismissible fade in">Updating this will reset the steps below</div>');
			} else {
				$("#step-6-msg").remove();
			}
		}
		if(stepid=="3") {
			$("#step-3 .drop-down .alert-danger").remove();
			if($("#stand").val()=='') {
				$("#step-3 .drop-down").append('<div class="alert alert-danger alert-dismissible fade in"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Please select if you want a stand</div>');
				return;
			}
				if($("#stand").val()=='1') {
					if(data.items.Stand.purchasing=="false") {
						$('tr[stepid="3"]').show();
						data.total = parseFloat(data.total) + parseFloat(data.items.Stand.cost);
						data.items.Stand.purchasing="true";
					}
				} else {
					if(data.items.Stand.purchasing=="true") {
						$('tr[stepid="3"]').hide();
						data.total = parseFloat(data.total) - parseFloat(data.items.Stand.cost);
						data.items.Stand.purchasing="false";
					}
			}
			updateTotal();

		}
		if(stepid=="4") {
			var itemname = $("#step-4 select").val();
			$("#step-4 .drop-down .alert-danger").remove();
			if(itemname=='') {
				$("#step-4 .drop-down").append('<div class="alert alert-danger alert-dismissible fade in"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Please select a filter</div>');
				return;
			}
			var cost = prams.filterCost[itemname];
			var itemname = "Power Filter "+itemname;
			if($(this).val()=='Next') {
				addItem(itemname, cost, "4", false);
				data.items.Filter.name=itemname;
				data.items.Filter.cost=cost;
			} else {
				var oldCost = data.items.Filter.cost;
				data.total = parseFloat(data.total) - parseFloat(oldCost);
				addItem(itemname, cost, "4", true);
				data.items.Filter.name=itemname;
				data.items.Filter.cost=cost;
			}
		}
		if(stepid=="5") {
			var curItem=0;
			var color = $("#color").val();
			$("#step-5 .drop-down .alert-danger").remove();
			if(color=='') {
				$("#step-5 .drop-down").append('<div class="alert alert-danger alert-dismissible fade in"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Please select gravel color</div>');
				return;
			}
			if($(this).val()=='Next') {
				if(data.items.Gravel["5"].amount!="0") {
					var gravelSmall = "("+data.items.Gravel["5"].amount + ") 5 lb Gravel "+color;
					var cost = data.items.Gravel["5"].cost;
					addItem(gravelSmall,cost,"5",false);
				}
				if(data.items.Gravel["25"].amount!="0") {
					var gravelSmall = "("+data.items.Gravel["25"].amount + ") 25 lb Gravel "+color;
					var cost = data.items.Gravel["25"].cost;
					addItem(gravelSmall,cost,"5",false);
				}
			} else {
				var oldColor = data.items.Gravel.color;
				var value = $('tr[stepid="5"]:eq(0) td:eq(0)').html()
				value = value.replace(oldColor, color);
				$('tr[stepid="5"]:eq(0) td:eq(0)').html(value);
				
				var value = $('tr[stepid="5"]:eq(1) td:eq(0)').html()
				if(value) {
					value = value.replace(oldColor, color);
					$('tr[stepid="5"]:eq(1) td:eq(0)').html(value)
				}
			}
			data.items.Gravel.color=color
		}
		if(stepid=="6") {
			data.total = data.total - data.items.Decorations.pp.cost - data.items.Decorations.sfc.cost - data.items.Decorations.lfc.cost;
			$('tr[stepid="6"]').remove();
			var count = parseFloat($("#pp").val());
			if(isNaN(count)==false && count>-1) {
				var itemName = "("+count+") Plastic Plants";
				var cost = 5 * count;
				addItem(itemName,cost,"6", false);
				data.items.Decorations.pp.cost = cost;
				data.items.Decorations.pp.count = count;
			} else {
				data.items.Decorations.pp.cost = 0;
				data.items.Decorations.pp.count = 0;
			}
			var count = parseFloat($("#sfc").val());
			if(isNaN(count)==false && count>-1) {
				var itemName = "("+count+") Fake Coral, Small";
				var cost = 10 * count;
				addItem(itemName,cost,"6", false);
				data.items.Decorations.sfc.cost = cost;
				data.items.Decorations.sfc.count = count;
			} else {
				data.items.Decorations.sfc.cost = 0;
				data.items.Decorations.sfc.count = 0;
			}
			var count = parseFloat($("#lfc").val());
			if(isNaN(count)==false && count>-1) {
				var itemName = "("+count+") Fake Coral, Large";
				var cost = 20 * count;
				addItem(itemName,cost,"6", false);
				data.items.Decorations.lfc.cost = cost;
				data.items.Decorations.lfc.count = count;
			} else {
				data.items.Decorations.lfc.cost = 0;
				data.items.Decorations.lfc.count = 0;
			}
			updateTotal();
			if($('input[value="Checkout"]').hasClass('disabled')==true) {
				$("#step-6 .drop-down").append('<div id="step-6-msg" class="alert alert-success alert-dismissible fade in">You may now checkout</div>');
			}
			$('input[value="Checkout"]').removeClass('disabled');
		}
		if($(this).val()=='Next') {
			$(this).val('Update');
			nextStep(stepid);
		} else {
			$("#step-"+stepid+" .drop-down").append('<div class="alert alert-success alert-dismissible fade in cart-updated">Cart updated</div>');
			setTimeout(function() { $(".cart-updated").fadeOut(500); }, 500);
			setTimeout(function() { $(".cart-updated").remove(); }, 1000);
		}
	});
	$('input[value="Checkout"]').click(function() {
		if($(this).hasClass('disabled')==true) {
			$("#cart").append('<div id="step-1-error" class="alert alert-danger alert-dismissible fade in"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Please compleet all steps</div>');
			return;
		}
		function show_confirm(response) {
			response = response.split('~');
			$("form").hide();
			var items = $("#cart table").html();
			$("#confirm table").html(items);
			var items = data.customerInfo.fname+" "+data.customerInfo.lname+"<br>"+data.customerInfo.phone+"<br>"+data.customerInfo.email;
			$("#confirm .custom-info").html(items);
			var time = response[1];
			data.pickupData.time= time
			$("#pickup").append("Your order will be ready "+time+"<br> Check your email for an order confirmation");
			$("#confirm").removeClass('hide');
			$("#form").addClass('hide');
		}
		var ajax_data = {
			'data':data
		};
		var jqxhr  = $.post('confirm.php', ajax_data, function(response) {
			show_confirm(response);
		});
	});
});