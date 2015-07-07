<?php require_once 'includes/head.php';
?>
    <div class="row" id="form">
    <h1 class="col-md-push-1 col-lg-11">Build your own fish tank bundle</h1>
    <div class="summary summary-closed col-md-4 col-md-push-7" id="cart">
    <h4>Hello,</h4>
    <div id="info-out">
    </div>
    <h4>Your Cart</h4>
        <table><tr><th>Item</th><th>Cost</th></tr><tr id="total"><th>Total</th><th>$0.00</th><tr></tr></table>
        <form method="post" action="confirm.php">
        <input type="button" value="Checkout" class="disabled">
        <!--<input type="hidden" name="data" id="data">-->
        </form>
    </div>
    <div class="summary col-md-4 col-md-pull-3">
    <div id="step-1" class="step">
    	<h4>Step 1: Customer Information</h4>
    	<div class="drop-down">
    		<label for="fname">First Name</label><input type="text" id="fname" name="fname">
            <label for="lname">Last Name</label><input type="text" id="lname" name="lname">
            <label for="email">Email</label><input type="text" id="email" name="email">
            <label for="phone">Phone Number</label><input type="text" id="phone" name="phone">
            <br><input type="button" value="Next" stepid="1">
        </div></div>
    <div id="step-2" class="disabled step">
    	<h4>Step 2: Tank Size</h4>
        <div class="drop-down" h4>
        	<select><option value="">Select...</option><option value="10">10 Gallons: $10</option><option value="20">20 Gallons: $20</option><option value="30">30 Gallons: $30</option><option value="40">40 Gallons: $40</option><option value="55">55 Gallons: $55</option></select>
            <input type="button" value="Next" stepid="2">
        </div></div>
    <div id="step-3" class="disabled step">
    <h4>Step 3: Stand</h4>
    	<div class="drop-down" h4>
        	<div class="value"></div><select id="stand"><option value="" selected>Select...</option><option value="1">Stand</option><option value="0">No Stand</option></select><input type="button" value="Next" stepid="3">
        </div>
    </div>
    <div id="step-4" class="disabled step">
    <h4>Step 4: Filter</h4>
    	<div class="drop-down"><div>The stronger the filter, the cleaner the tank</div><select></select><input type="button" value="Next" stepid="4">
        </div>
    </div>
    <div id="step-5" class="disabled step">
    <h4>Step 5: Gravel</h4>
    	<div class="drop-down" h4>
        <div class="info"></div>
        <h4>Select a Color</h4>
        <div style="background-image:url(images/white.jpg);" class="gravel" data-color="White"></div>
        <div style="background-image:url(images/black.jpg);" class="gravel" data-color="Black"></div>
        <div style="background-image:url(images/brown.jpg);" class="gravel" data-color="Brown"></div>
        <div style="background-image:url(images/green.jpg);" class="gravel" data-color="Green"></div>
        <div style="background-image:url(images/blue.jpg);" class="gravel" data-color="Blue"></div>
        <input type="hidden" id="color" value="">
        <input type="button" value="Next" stepid="5">
    </div>
    </div>
    <div id="step-6" class="disabled step">
    	<h4>Step 6: Decorations</h4>
        <div class="drop-down" h4>
        	Plastic Plants: $5 each<input type="text" id="pp" maxlength="2"><br>
            Fake coral, small: $10 each<input type="text" id="sfc" maxlength="2"><br>
            Fake coral, large: $20 each<input type="text" id="lfc" maxlength="2"><br>
            <input type="button" value="Update" stepid="6">
        </div>
    </div>
    </div>
    </div>
    <div id="confirm" class="row hide">
    <h1 class="col-md-push-1 col-lg-12">Thank you for your purchase</h1>
    <div class="col-md-4 col-md-push-1 summary">
    <h4>Purchase Summary</h4>
    <table></table>
    </div>
    <div class="col-md-4 col-md-push-2 summary">
    <h4>Your Contact Information</h4>
    <div class="custom-info"></div>
    <h4>Pickup Information</h4>
    <div id="pickup">
    Parma #532<br>
    6870 Ridge Rd<br>
	Parma, Ohio 44129<br>
	(440) 845-9592<br>
    9AM-9PM<br>
    </div>
    </div>
    </div>
</div>
<?php require_once 'includes/footer.php'; ?>
