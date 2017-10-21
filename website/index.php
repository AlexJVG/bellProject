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
		<link rel="manifest" href="/manifest.json?v=1.1">
		<link rel="shortcut icon" href="/images/touch/1024.png?v=1.1">

		<link rel="apple-touch-icon" sizes="1024x1024" href="/images/touch/1024Square.png?v=1.1">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-title" content="Countdown">

		<meta name="application-name" content="Countdown">

		<link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
		<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

		<link rel="stylesheet" type="text/css" href="/css/material.css?v=1.1">
		<link rel="stylesheet" type="text/css" href="/css/main.css?v=1.1">
		
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
		<div id="first-div">
			<div class="inner-main-div">
				<h1 style="width: 75%; background-color: black;" class="not-loaded" id="today-date">&nbsp;</h1>
				<div style="display: inline; position: relative;">
					<h1 style="width: 45%; background-color: black;" id="type-of-day" onclick="$('#schedule-dropdown').slideDown(300);" onmouseover="$('#schedule-dropdown').slideDown(300);" class="not-loaded">&nbsp;</h1>
					<div id="schedule-dropdown">
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
		<div id="second-div">
			<div class="inner-main-div" style="padding-top: 50px; height: ">
				<div style="border-bottom: 3px solid #fccb0b; display: inline-block;">
					<h1 id="period-names-title">Period Names</h1>
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
							<button class="material-form-button">Save</button>
						</div>
					</form>
				</div>
			</div>
			<div id="footer">
				<p>This website is very new — it was coded a few weeks ago in a matter of hours. If you found a bug/problem, email <a href="mailto:hi@mvhs.club">hi@mvhs.club</a></p>
			</div>
		</div>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<script src="/js/material.js?v=1.1"></script>
		<script src="/js/main.js?v=1.1"></script>
		<script>
			if (!localStorage.getItem('v1.1Update')) {
				alert("Version 1.1 Updates:\n\n1) Hover over the large date at the top of the page and today's schedule appears (click instead of hover on smartphones)\n\n2) You enter custom period names by scrolling down.\n\n3) If you're on a smartphone, you can now easily add bell.mvhs.club to your homescreen.");
				localStorage.setItem('v1.1Update', 'true');
			}
		</script>
	</body>
</html>