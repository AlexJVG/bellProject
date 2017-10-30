<?php
	header('Cache-Control: max-age=3600');
?>
<!-- created and maintained by Arjun P (MVHS) -->
<!-- contact hi@mvhs.club for questions, suggestions, and bugs -->
<!DOCTYPE html>
<html>
	<head>
		<title>MVHS Bell Countdown</title>
		<meta charset="utf-8">

		<meta name="viewport" content="width=device-width">
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="theme-color" content="#fccb0b">
		<link rel="manifest" href="/manifest.json?v=1.3">
		<link rel="shortcut icon" href="/images/touch/1024.png?v=1.3">

		<link rel="apple-touch-icon" sizes="1024x1024" href="/images/touch/1024Square.png?v=1.3">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-title" content="Countdown">

		<meta name="application-name" content="Countdown">

		<meta name="google-signin-client_id" content="989074405041-k1nns8p3h7eb1s7c6e3j6ui5ohcovjso.apps.googleusercontent.com">

		<link href="https://fonts.googleapis.com/css?family=Roboto:400,700|Material+Icons" rel="stylesheet">
		<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

		<link rel="stylesheet" type="text/css" href="/css/material.css?v=1.3">
		<link rel="stylesheet" type="text/css" href="/css/main.css?v=1.3">
		
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-108094966-1"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', 'UA-108094966-1');
		</script>
	</head>
	<body>
		<input style="height: 0; margin: 0; padding: 0; z-index: -5; position: absolute;" />
		<div id="notification-div">
			<p>
				<a target="_blank" href="https://chrome.google.com/webstore/detail/mvhs-bell-countdown/enpponilfcooflcegkodmpdgboooohjm">Install the Chrome Extension</a>
			</p>
			<i class="material-icons" onclick="$('#notification-div').css('opacity', '0');">cancel</i>
		</div>
		<div id="help-menu" class="remove-on-embed">
			<div id="help-menu-question-mark" onclick="$(this).hide();$('#help-menu').animate({top: '20%'});$('#help-menu-main-content').slideDown(300);">
				<h1>?</h1>
			</div>
			<div id="help-menu-main-content">
				<div style="height: 92%; overflow-y: scroll;">
					<h1 style="font-weight: bold; color: black; padding: 0px 3px; display: inline;">Help/About</h1>
					<!-- <div class="help-menu-tile">
						<h4>FAQ</h4>
						<div style="height: 8px;"></div>
						<p><span style="font-weight: bold;">Q:</span> Is there a Google Chrome Extension?</p>
						<p><span style="font-weight: bold;">A:</span> Yes. Click <a href="https://chrome.google.com/webstore/detail/mvhs-bell-countdown/enpponilfcooflcegkodmpdgboooohjm" target="_blank">here</a> to download it.</p>
						<div style="height: 8px;"></div>
						<p><span style="font-weight: bold;">Q:</span> How do I view today's full schedule?</p>
						<p><span style="font-weight: bold;">A:</span> Hover over the text directly below today's date.</p>
					</div> -->
					<div class="help-menu-tile">
						<h4>Any comments, questions, or suggestions?</h4>
						<form action="https://docs.google.com/forms/d/e/1FAIpQLSfa-8n2rPhlrR0e0Gcni3rCs4-keO1SZAo19TQ5DdZEEfZghA/formResponse" target="_blank" method="POST" id="mG61Hd">
							<input required type="text" autocomplete="off" name="entry.817291111" placeholder="Your Name" style="outline: none; border: none; padding: 5px; background: transparent; width: 45%;" />
							<input type="email" name="entry.1776598004" placeholder="Your Email" required style="outline: none; border: none; padding: 5px; background: transparent; width: 45%; border-left: 1px solid #ccc;" />
							<div style="height: 1px; background-color: #ccc;"></div>
							<textarea required name="entry.1559247310" placeholder="Write here..." style="outline: none; border: none; border-radius: 3px; padding: 5px; background: transparent; width: 100%; height: 30px;" onfocus="$(this).animate({height: '100px'}, 300);" onfocusout="$(this).animate({height: '30px'}, 300);"></textarea>
							<input type="hidden" name="fvv" value="1">
							<input type="hidden" name="draftResponse" value="[null,null,&quot;-4370327041105561515&quot;]">
							<input type="hidden" name="pageHistory" value="0">
							<input type="hidden" name="fbzx" value="-4370327041105561515">
							<br>
							<button class="material-form-button">Submit</button>
						</form>
					</div>
					<div class="help-menu-tile">
						<h4>Contact</h4>
						<p><span style="font-weight: bold;">Email:</span> <a href="mailto:hi@mvhs.club">hi@mvhs.club</a></p>
					</div>
					<div class="help-menu-tile">
						<h4>Disclaimer</h4>
						<p>This website and the Google Chrome extension are not officially endorsed or affiliated with Mountain View High School. There is no guarantee that these apps are correct. Therefore, we are not responsible for tardies, absences, etc.</p>
					</div>
				</div>
				<button class="material-form-button" style="margin-top: 10px;" onclick="$('#help-menu').animate({top: '86%'}, function() {$('#help-menu-question-mark').show();});$('#help-menu-main-content').slideUp(300);">Close</button>
			</div>
		</div>
		<div id="first-div">
			<div class="inner-main-div">
				<h1 style="width: 75%; background-color: black;" class="not-loaded" id="today-date">&nbsp;</h1>
				<div style="display: inline; position: relative;">
					<h1 style="width: 45%; background-color: black;" id="type-of-day" onclick="$('#schedule-dropdown').slideDown(300);" onmouseover="$('#schedule-dropdown').slideDown(300);" class="not-loaded">&nbsp;</h1>
					<div id="schedule-dropdown" class="remove-on-embed">
						<h1>Today's Schedule</h1>
						<table>
							<tr>
								<th>Period</th>
								<th class="right-table-row">Time</th>
							</tr>
						</table>
						<div style="text-align: center;">
							<button class="material-form-button" onclick="$('#schedule-dropdown').slideUp(300);">Close</button>
						</div>
					</div>
				</div>
				<div id="entire-progress-bar">
					<div id="inner-text">
						<h1 id="progress-bar-text">Loading...</h1>
						<h1 style="width: 25%;" class="not-loaded" id="current-period">&nbsp;</h1>
					</div>
					<div id="progress-bar">
					</div>
				</div>
			</div>
		</div>
		<div id="second-div" class="remove-on-embed">
			<div class="inner-main-div" style="padding-top: 50px;">
				<div style="border-bottom: 3px solid #fccb0b; display: inline-block;">
					<h1 id="period-names-title">Period Names</h1>
				</div>
				<div id="google-user-status" style="float: right; padding: 15px 0 0 0; display: none;">
					<div style="display: table;">
						<div style="display: table-cell;">
							<img style="border-radius: 50%; height: 50px; width: 50px; float: right; margin: 0 10px 0 0; border: 1px solid black;" src="https://lh4.googleusercontent.com/-HTeS2xWuxm0/AAAAAAAAAAI/AAAAAAAABMc/DnkPdXTlDlQ/s96-c/photo.jpg">
						</div>
						<div style="display: table-cell; vertical-align: middle;">
							<i class="material-icons" style="cursor: pointer;" id="google-signin-dropdown-button" onclick="document.getElementById('google-signin-dropdown').style.display = 'block';">more_vert</i>
						</div>
					</div>
					<div id="google-signin-dropdown">
						<div>
							<div>
								<p style="word-break: break-all;" onclick="gSignOut();"></p>
							</div>
						</div>
					</div>
				</div>
				<div id="form-outer-div">
					<form class="material-form" id="change-names-form">
						<div class="container" id="form-container">
							<div class="col-md-6">
								<div class="material-input-group">
									<input type="text" name="period0" maxlength="20" class="material-form-control"/>
									<label>Period 0</label>
								</div>
								<div class="material-input-group">
									<input type="text" name="period1" maxlength="20" class="material-form-control"/>
									<label>Period 1</label>
								</div>
								<div class="material-input-group">
									<input type="text" name="period2" maxlength="20" class="material-form-control"/>
									<label>Period 2</label>
								</div>
								<div class="material-input-group">
									<input type="text" name="period3" maxlength="20" class="material-form-control"/>
									<label>Period 3</label>
								</div>
							</div>
							<div class="col-md-6">
								<div class="material-input-group">
									<input type="text" name="period4" maxlength="20" class="material-form-control"/>
									<label>Period 4</label>
								</div>
								<div class="material-input-group">
									<input type="text" name="period5" maxlength="20" class="material-form-control"/>
									<label>Period 5</label>
								</div>
								<div class="material-input-group">
									<input type="text" name="period6" maxlength="20" class="material-form-control"/>
									<label>Period 6</label>
								</div>
								<div class="material-input-group">
									<input type="text" name="period7" maxlength="20" class="material-form-control"/>
									<label>Period 7</label>
								</div>
							</div>
							<div>
								<button class="material-form-button" style="display: inline-block;" id="period-names-save-button"><span style="margin-right: 10px; vertical-align: middle;">Save To Your Computer</span><i style="vertical-align: middle;" class="material-icons">computer</i></button>
								<h3 style="display: inline; margin: 0 20px;" class="remove-on-google">or</h3>
								<div id="g-signin-main" style="display: inline-block;" data-onsuccess="onSignIn"></div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div id="footer">
				<p>This website is very new. If you find a bug/problem, email <a href="mailto:hi@mvhs.club">hi@mvhs.club</a></p>
			</div>
		</div>
		<script src="https://apis.google.com/js/platform.js" async defer></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<script src="/js/material.js?v=1.3"></script>
		<script src="/js/main.js?v=1.3.1"></script>
		<script type="text/javascript">
			window.onload = function() {
				
			};
		</script>
	</body>
</html>