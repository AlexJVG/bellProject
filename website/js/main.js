const api = 'https://bell.mvhs.club/api',
	documentOriginalTitle = 'MVHS Bell Countdown';
var data,
	untouchedData;

function getOrdinalNum(n) {
	return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}
function toStandardTime(time) {
	time = time.split(":");
	hours = parseInt(time[0]);
	if (hours > 12) hours = hours - 12;
	return(hours + ':' + time[1]);
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
	$.ajax({
		type: 'GET',
		url: api,
		success: function(response) {
			data = response;
			untouchedData = response;
			var minutes,
				dateNiceFormat,
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

			periodNames = JSON.parse(localStorage.getItem('periodNames'));
			console.log(periodNames);
			if (data.days[dateNiceFormat]) {

				if (data.days[dateNiceFormat].type) {
					data.days[dateNiceFormat].schedule = data.presets[data.days[dateNiceFormat].type].schedule;
					if (!data.days[dateNiceFormat].name) {
						data.days[dateNiceFormat].name = data.presets[data.days[dateNiceFormat].type].name;
					}
				}
				$('#type-of-day').css({'width': '', 'background-color': 'transparent'}).removeClass('not-loaded').text(data.days[dateNiceFormat].name);

				for (i in data.days[dateNiceFormat].schedule) {

					var fromThisTime = dateNiceFormat + ' ' + data.days[dateNiceFormat].schedule[i].from + ':00';
					var toThisTime = dateNiceFormat + ' ' + data.days[dateNiceFormat].schedule[i].to + ':00';
					var currentDateParseTime = Date.parse(dateNiceFormat + ' ' + currentMilitaryTime + ':00');
					asdinfei = data.days[dateNiceFormat].schedule[i].name;
					data.days[dateNiceFormat].schedule[i].name = [
						asdinfei,
						asdinfei
					];
					if (typeof(data.days[dateNiceFormat].schedule[i].name[0]) == 'number') {
						if (periodNames) {
							var periodNumber = data.days[dateNiceFormat].schedule[i].name[0];
							if (periodNames['period' + periodNumber] != '') {
								data.days[dateNiceFormat].schedule[i].name[1] = periodNames['period' + periodNumber];
							} else {
								data.days[dateNiceFormat].schedule[i].name[1] = getOrdinalNum(data.days[dateNiceFormat].schedule[i].name[0]) + ' Period';
							}
						} else {
							data.days[dateNiceFormat].schedule[i].name[1] = getOrdinalNum(data.days[dateNiceFormat].schedule[i].name[0]) + ' Period';
						}
					}
					
					if ((Date.parse(fromThisTime) <= currentDateParseTime) && (Date.parse(toThisTime) >= currentDateParseTime)) {
						currentI = i;
						var lastAction = Date.parse(fromThisTime);
						var nextAction = Date.parse(toThisTime);
						var totalTimeOfAction = nextAction - lastAction;
						var progressBar = 0;
						var intervalLength = 0;
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

			$table = $('#schedule-dropdown').find('table');
			for (z in data.days[dateNiceFormat].schedule) {
				cacheName = data.days[dateNiceFormat].schedule[z];
				if (typeof(cacheName.name[0]) == 'number' || /\d/.test(cacheName.name[0]) || cacheName.name[0] == 'Lunch' || cacheName.name[0] == 'Brunch') {
					$table.append('<tr class="schedule-table-row" id="' + cacheName.name[1].replace(/\s/g, '') + '"><td>' + cacheName.name[1] + '</td><td class="right-table-row">' + toStandardTime(cacheName.from) + ' - ' + toStandardTime(cacheName.to) + '</td></tr>');
				}
			}
			for (hi in periodNames) {
				if (periodNames[hi] != '') {
					$('input[name="' + hi + '"]').attr('value', periodNames[hi]).addClass('has-value');
				}
			}
		}
	});
	$('#change-names-form').on('submit', function() {
		var formData = $(this).serializeArray();
		var jsonValues = {};
		$.map(formData, function(n, i){
			jsonValues[n['name']] = n['value'];
		});
		localStorage.setItem('periodNames', JSON.stringify(jsonValues));
		
		/*window.location.href = '/?' + $(this).serialize();
		location.reload();
		return false;*/
	});
});