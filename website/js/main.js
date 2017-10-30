const documentOriginalTitle = 'MVHS Bell Countdown',
api = {
	'schedule': 'https://bell.mvhs.club/api/schedule',
	'get_info': 'https://bell.mvhs.club/api/v1?w=get_info',
	'update_user': 'https://bell.mvhs.club/api/v1?w=update_user'
};
var data,
	untouchedData,
	user,
	dateNiceFormat,
	usingGoogle = false;

function getOrdinalNum(n) {
	return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}
function toStandardTime(time) {
	time = time.split(":");
	hours = parseInt(time[0]);
	if (hours > 12) hours = hours - 12;
	return(hours + ':' + time[1]);
}
function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function notSeenThenAlert(text) {
	if (!localStorage.getItem(text)) {
		alert(text);
		localStorage.setItem(text, 'seen');
	}
}
function parseNames() {
	for (i in data.days[dateNiceFormat].schedule) {
		if (data.days[dateNiceFormat].schedule[i].name[2] != 'updated') {
			asdinfei = data.days[dateNiceFormat].schedule[i].name;
			data.days[dateNiceFormat].schedule[i].name = [
				asdinfei,
				asdinfei,
				'updated'
			];
		}
		if (typeof(data.days[dateNiceFormat].schedule[i].name[0]) == 'number') {
			var periodNumber = data.days[dateNiceFormat].schedule[i].name[0];
			if (user.preferences.period_names['period' + periodNumber] != '' && user.preferences.period_names['period' + periodNumber]) {
				data.days[dateNiceFormat].schedule[i].name[1] = user.preferences.period_names['period' + periodNumber];
			} else {
				data.days[dateNiceFormat].schedule[i].name[1] = getOrdinalNum(data.days[dateNiceFormat].schedule[i].name[0]) + ' Period';
			}
		}
	}
}

function updateUser(syncOnline) {
	console.log('updating user');
	localStorage.setItem('user', JSON.stringify(user));
	if (syncOnline && usingGoogle) {
		var postData = 'email=' + encodeURIComponent(user.info.email) + '&newJSON=' + encodeURIComponent(JSON.stringify(user));
		$.ajax({
			url: api.update_user,
			type: 'POST',
			data: postData,
			success: function() {
				console.log('synced online');
			}
		});
	}
	parseNames();
	for (z in data.days[dateNiceFormat].schedule) {
		cacheName = data.days[dateNiceFormat].schedule[z];
		if (typeof(cacheName.name[0]) == 'number' || /\d/.test(cacheName.name[0]) || cacheName.name[0] == 'Lunch' || cacheName.name[0] == 'Brunch') {
			document.getElementById('table-period-' + cacheName.name[0]).innerHTML = cacheName.name[1];
		}
	}
	for (hi in user.preferences.period_names) {
		if (user.preferences.period_names[hi] != '') {
			document.querySelector('input[name="' + hi + '"]').value = user.preferences.period_names[hi];
			document.querySelector('input[name="' + hi + '"]').className += ' has-value';
		}
	}
}
function gSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	usingGoogle = true;
	document.getElementById('g-signin-main').style.display = 'none';
	document.getElementById('period-names-save-button').innerHTML = '<span style="margin-right: 10px; vertical-align: middle;">Save To The Cloud</span><i style="vertical-align: middle;" class="material-icons">cloud</i>';
	var statusGoogle = document.getElementById('google-user-status');
	statusGoogle.style.display = 'inline';
	statusGoogle.querySelector('img').src = profile.Paa;
	document.querySelector('#google-signin-dropdown > div > div > p').innerHTML = 'Sign Out of ' + profile.U3;

	var elements = document.getElementsByClassName('remove-on-google');
	while(elements.length > 0){
		elements[0].parentNode.removeChild(elements[0]);
	}

	var postData = 'first_name=' + encodeURIComponent(profile.ofa) + '&last_name=' + encodeURIComponent(profile.wea) + '&email=' + encodeURIComponent(profile.U3) + '&json=' + encodeURIComponent(JSON.stringify(user));
	$.ajax({
		url: api.get_info,
		type: 'POST',
		data: postData,
		success: function(r) {
			if (r.info == "accountCreated") {
				user.info.first_name = profile.ofa;
				user.info.last_name = profile.wea;
				user.info.email = profile.U3;
				user.info.profile_pic = profile.Paa;
				updateUser(true);
			} else {
				user = JSON.parse(r.user);
				updateUser(false);
			}
		}
	});
	document.addEventListener('click', function(event) {
		if (!document.getElementById('google-signin-dropdown-button').contains(event.target)) {
			document.getElementById('google-signin-dropdown').style.display = 'none';
		}
	});
}
function gSignOut() {
	gapi.auth2.getAuthInstance().signOut().then(function() {
		console.log('sign out successful');
		usingGoogle = false;
		location.reload();
	});
}
function gFail() {

}

function main() {
	return $.ajax({
			type: 'GET',
			url: api.schedule,
			success: function(response) {
				data = response;
				untouchedData = response;
				var minutes,
					d = new Date(),
					currentMilitaryTime,
					currentI,
					daysOfTheWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
					monthsOfTheYear = ['January','February','March','April','May','June','July','August','September','October','November','December'];
				dateNiceFormat = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
				$('#today-date').css({'width': '', 'background-color': 'transparent', 'margin-bottom': ''}).removeClass('not-loaded').text(daysOfTheWeek[d.getDay()] + ', ' + monthsOfTheYear[d.getMonth()] + ' ' + getOrdinalNum(d.getDate()));

				if (d.getMinutes() < 10) {
					minutes = '0' + d.getMinutes();
				} else {
					minutes = d.getMinutes();
				}
				console.log(dateNiceFormat);
				currentMilitaryTime = d.getHours() + ':' + minutes;

				if (data.days[dateNiceFormat]) {

					if (data.days[dateNiceFormat].type) {
						data.days[dateNiceFormat].schedule = data.presets[data.days[dateNiceFormat].type].schedule;
						if (!data.days[dateNiceFormat].name) {
							data.days[dateNiceFormat].name = data.presets[data.days[dateNiceFormat].type].name;
						}
					}
					$('#type-of-day').css({'width': '', 'background-color': 'transparent'}).removeClass('not-loaded').text(data.days[dateNiceFormat].name);

					parseNames();

					for (i in data.days[dateNiceFormat].schedule) {

						var fromThisTime = dateNiceFormat + ' ' + data.days[dateNiceFormat].schedule[i].from + ':00';
						var toThisTime = dateNiceFormat + ' ' + data.days[dateNiceFormat].schedule[i].to + ':00';
						var currentDateParseTime = Date.parse(dateNiceFormat + ' ' + currentMilitaryTime + ':00');
						
						if ((Date.parse(fromThisTime) <= currentDateParseTime) && (Date.parse(toThisTime) >= currentDateParseTime)) {
							currentI = i;
							var lastAction = Date.parse(fromThisTime);
							var nextAction = Date.parse(toThisTime);
							var totalTimeOfAction = nextAction - lastAction;
							var progressBar = 0;
							var intervalLength = 0;
							var currentPeriodText = '';
							$('#current-period').css('width', '').removeClass('not-loaded').text(data.days[dateNiceFormat].schedule[currentI].name[1]);

							var x = setInterval(function() {
								var now = new Date().getTime();
								now += (1000 * data.secondsOffset);
								var distance = nextAction - now;

								var percentDoneWith = Math.floor(100 * (1 - (distance / totalTimeOfAction)));

								var days = Math.floor(distance / (1000 * 60 * 60 * 24));
								var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + (days * 24);
								var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
								var seconds = Math.floor((distance % (1000 * 60)) / 1000);

								if (seconds < 0) {
									currentI++;
									count = 0;
									percentDoneWith = 0;
									if (document.hasFocus()) {
										$('#progress-bar').animate({width:  "0%"}, 2000);
										progressBar = 0;
									}
									try {
										fromThisTime = dateNiceFormat + ' ' + data.days[dateNiceFormat].schedule[currentI].from + ':00';
										toThisTime = dateNiceFormat + ' ' + data.days[dateNiceFormat].schedule[currentI].to + ':00';
										lastAction = Date.parse(fromThisTime);
										nextAction = Date.parse(toThisTime);
										totalTimeOfAction = nextAction - lastAction;
										$('#current-period').text(data.days[dateNiceFormat].schedule[currentI].name[1]);
									} catch (e) {
										$('#progress-bar-text').text('Nothing');
										$('#current-period').text("You're free!");
										document.title = documentOriginalTitle;
										count++;
										if (count > 3600) {
											location.reload();
											count = 0;
										}
									}
								} else {
									if (seconds < 10) {
										seconds = '0' + seconds;
									}
									if (minutes < 10 && hours != 0) {
										minutes = '0' + minutes;
									}

									if (hours != 0) {
										html = hours + ':' + minutes + ':' + seconds;
									} else {
										html = minutes + ':' + seconds;
									}

									if (document.hasFocus()) {
										$('#progress-bar-text').text(html);
										if (progressBar != percentDoneWith) {
											$('#progress-bar').animate({width: percentDoneWith + "%"}, 2000);
											progressBar = percentDoneWith;
										}
										if (currentPeriodText != data.days[dateNiceFormat].schedule[currentI].name[1]) {
											document.getElementById('current-period').innerHTML = data.days[dateNiceFormat].schedule[currentI].name[1];
											currentPeriodText = data.days[dateNiceFormat].schedule[currentI].name[1];
										}
									}

									document.title = html + ' left of ' + data.days[dateNiceFormat].schedule[currentI].name[1];
								}

							}, intervalLength);
							intervalLength = 1000;
						}
					}
				}
				if (!x) {
					$('#progress-bar-text').text('Nothing');
					$('#current-period').css('width', '').removeClass('not-loaded').text("You're free!");
					if (!data.days[dateNiceFormat]) {
						$('#type-of-day').css({'width': '', 'background-color': 'transparent'}).removeClass('not-loaded').text('Looks like we forgot to update the schedule for today. Send us an email!');
					}
					var w = setInterval(function() {
						location.reload();
					},3600000)
				}
			}
		});
}

var embed = getParameterByName('_embed');

if (localStorage.getItem('user')) {
	user = JSON.parse(localStorage.getItem('user'));
} else {
	user = {
		'preferences': {
			'period_names': {

			}
		},
		'info': {
		}
	};
	if (localStorage.getItem('periodNames')) {
		user.preferences.period_names = JSON.parse(localStorage.getItem('periodNames'));
		localStorage.removeItem('periodNames');
		console.log('converted to new schema');
	}
	localStorage.setItem('user', JSON.stringify(user));
}
if (embed == 'true') {
	var elements = document.getElementsByClassName('remove-on-embed');
	while(elements.length > 0){
		elements[0].parentNode.removeChild(elements[0]);
	}

	document.querySelector('#notification-div > p > a').innerHTML = 'View the full site';
	document.querySelector('#notification-div > p > a').href = 'https://bell.mvhs.club'
	document.getElementById('type-of-day').style.cursor = 'auto';
	document.body.style.overflow = 'hidden';
}

$(function() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('/service-worker.js', {scope: '/'})
			.then(function(registration) {
				console.log('service worker registered');
			})
			.catch(function(error) {
				console.log('service worker failed' + error);
			});
	}
	main().done(function() {
		gapi.signin2.render('g-signin-main', {
			'scope': 'profile email',
			'width': 240,
			'height': 50,
			'longtitle': true,
			'theme': 'dark',
			'onsuccess': gSignIn,
			'onfailure': gFail
		});
		if (embed == 'true') {
			document.body.focus();
			//notSeenThenAlert("Tired of re-entering your preferences and period names for each of your devices? Using your Google account, you can now sync all of your preferences online! Try it at the full website (bell.mvhs.club)");
		} else {
			notSeenThenAlert("Version 1.3 Updates:\n\n1) Tired of re-entering your preferences and period names for each of your devices? Using your Google account, you can now sync all of your preferences online! Scroll to try it out.");
			$table = $('#schedule-dropdown').find('table');
			for (z in data.days[dateNiceFormat].schedule) {
				cacheName = data.days[dateNiceFormat].schedule[z];
				if (typeof(cacheName.name[0]) == 'number' || /\d/.test(cacheName.name[0]) || cacheName.name[0] == 'Lunch' || cacheName.name[0] == 'Brunch') {
					$table.append('<tr class="schedule-table-row"><td id="table-period-' + cacheName.name[0] + '">' + cacheName.name[1] + '</td><td class="right-table-row">' + toStandardTime(cacheName.from) + ' - ' + toStandardTime(cacheName.to) + '</td></tr>');
				}
			}
			for (hi in user.preferences.period_names) {
				if (user.preferences.period_names[hi] != '') {
					$('input[name="' + hi + '"]').attr('value', user.preferences.period_names[hi]).addClass('has-value');
				}
			}
			$(window).scroll(function(event) {
				var scrollTopVar = $(document).scrollTop();
				if (scrollTopVar > 0 && window.innerWidth > 900) {
					$('#help-menu').show();
				} else {
					$('#help-menu').hide();
				}
			});
			$('#mG61Hd').on('submit', function() {
				var here = this;
				var a = $(here).serialize();
				$.ajax({
					type: "POST",
					url: "https://docs.google.com/forms/d/e/1FAIpQLSfa-8n2rPhlrR0e0Gcni3rCs4-keO1SZAo19TQ5DdZEEfZghA/formResponse",
					data: a,
					success: function(formsData) {
						console.log(formsData);
						if (formsData.includes('Your response has been recorded.')) {
							$(here).html('<p>We will take a look at it as soon as possible!</p>')
						}
					},
					error: function(formsData) {
						$(here).html('<p>We will take a look at it as soon as possible!</p>')
					}
				})
				return false;
			});
			$('#change-names-form').on('submit', function(event) {
				event.preventDefault();
				var formData = $(this).serializeArray();
				var jsonValues = {};
				$.map(formData, function(n, i){
					jsonValues[n['name']] = n['value'];
				});
				user.preferences.period_names = jsonValues;
				updateUser(true);
				var lastName = document.getElementById('period-names-save-button').innerHTML;
				document.getElementById('period-names-save-button').innerHTML = 'Saving';
				setTimeout(function() {
					document.getElementById('period-names-save-button').innerHTML = lastName;
				}, 1000);
				return false;
				
				/*window.location.href = '/?' + $(this).serialize();
				location.reload();
				return false;*/
			});
		}
	});
});