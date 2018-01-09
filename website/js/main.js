"use strict";
var theDOM = new (function() {
	var currentValues = {};
	this.typeOfDay = document.getElementById('type-of-day');
	this.progressBarText = document.getElementById('progress-bar-text');
	this.currentPeriod = document.getElementById('current-period');
	this.periodNamesSaveButton = document.getElementById('period-names-save-button');
	this.notificationDiv = document.getElementById('notification-div');
	this.todayDate = document.getElementById('today-date');
	this.progressBar = document.getElementById('progress-bar');
	/*this.helpMenu = document.getElementById('help-menu');*/
	this.changeNamesForm = document.getElementById('change-names-form');
	this.preloader = document.getElementById('preloader');
	this.notificationText = document.querySelector('#notification-div > p > a');
	this.gSignInButton = document.getElementById('g-signin-main');
	this.navBarButton = document.getElementById('nav-bar-button');
	this.topNavigationBar = document.getElementById('top-navigation-bar');
	this.navTitle = document.getElementById('nav-title');
	this.submitABugForm = document.getElementById('submit-a-bug-form');
	this.hidePreloader = function() {
		theDOM.preloader.querySelector('.material-loader').style.opacity = '0';
		theDOM.preloader.style.opacity = '0';
		theDOM.preloader.style.pointerEvents = 'none';
		setTimeout(function() {
			theDOM.preloader.style.display = 'none';
		}, 2000);
	};
	this.updateProgressBar = function(percentAsNum) {
		if (percentAsNum != currentValues.progressBar) {
			theDOM.progressBar.style.width = percentAsNum + "%";
			theDOM.topNavigationBar.style.background = '-webkit-linear-gradient(left, #4b4b4b ' + percentAsNum + '%, #333333 0%)';
			currentValues.progressBar = percentAsNum;
		}
	};
	this.updateCurrentPeriodText = function(text) {
		if (text != currentValues.periodText) {
			theDOM.currentPeriod.innerHTML = text;
			currentValues.periodText = text;
		}
	};
	this.updateProgressBarText = function(text) {
		if (text != currentValues.progressBarText) {
			theDOM.progressBarText.innerHTML = text;
			theDOM.navTitle.innerHTML = text;
			currentValues.progressBarText = text;
		}
	};
	this.removeByClassName = function(className) {
		var elements = document.getElementsByClassName(className);
		while (elements.length > 0) {
			elements[0].parentNode.removeChild(elements[0]);
		}
	}
	this.hide = function(querySelection) {
		var elements = document.querySelectorAll(querySelection);
		try {
			for (var i in elements) {
				elements[i].style.display = 'none';
			}
		} catch (e) {}
	}
	this.hideNotification = function() {
		var cache = this.notificationDiv;
		cache.style.bottom = '-100px';
		/*setTimeout(function() {
			cache.style.display = 'none';
		}, 100);*/
	}
	this.notify = function(text) {
		var cache = this.notificationDiv;
		cache.style.display = 'table';
		cache.querySelector('p').innerHTML = text + '<span onclick="theDOM.hideNotification();" style="display: inline; float: right; color: #2693e6; cursor: pointer;">CLOSE</span>';
		cache.style.bottom = '';
	}
	this.notifyAndHide = function(text, time) {
		if (!time) var time = 5;
		var here = this;
		here.notify(text);
		setTimeout(function() {
			here.hideNotification();
		}, time * 1000);
	}
	this.insertBugMetaData = function() {
		var jsonObjectToSend = {
			user: user,
			data: data
		};
		document.querySelector('input[name="entry.280797450"]').value = JSON.stringify(jsonObjectToSend);
	}
	this.modal = {
		viewableElements: document.getElementsByClassName('viewable'),
		show: function(html) {
			var cache = document.getElementsByClassName('popup-modal')[0];
			if (html) cache.innerHTML = html;
			cache.style.display = 'block';

			for (var v in this.viewableElements) {
				if (this.viewableElements.hasOwnProperty(v)) {
					this.viewableElements[v].style.filter = 'blur(8px)';
				}
			}
		},
		close: function() {
			document.getElementsByClassName('popup-modal')[0].style.display = 'none';
			for (var v in this.viewableElements) {
				if (this.viewableElements.hasOwnProperty(v)) {
					this.viewableElements[v].style.filter = 'none';
				}
			}
		}
	};
	this.scroll = {
		hideAll: function() {
			if (currentValues.scrollShown === true) {
				/*theDOM.helpMenu.style.display = 'none';*/
				theDOM.topNavigationBar.style.display = 'none';
				currentValues.scrollShown = false;
			}
		},
		showAll: function() {
			if (!currentValues.scrollShown) {
				/*if (window.innerWidth > 900) theDOM.helpMenu.style.display = 'block';*/
				theDOM.topNavigationBar.style.display = 'block';
				currentValues.scrollShown = true;
			}
		}
	};
})();

function css(element, styles) {
	for (i in styles) {
		element.style[i] = styles[i];
	}
}

function escapeHTML(unsafeText) {
	var div = document.createElement('div');
	div.innerText = unsafeText;
	return div.innerHTML;
}

// userValSet(['stats', 'user', 'views', 'full'], 'hello');
function userValSet(where, value) {
	var place = 'user',
		code = '';
	for (i in where) {
		place += '.' + where[i];
		if ((parseInt(i) + 1) === where.length) {
			code = place + ' = value;';
		} else {
			code = place + ' = ' + place + ' || {};';
		}
		eval(code);
	}
}
function ajax(param) {
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		if (!param.type) param.type = 'GET';
		if (param.type != "GET") {
			xhr.open(param.type, param.url, true);

			if (param.processData != undefined && param.processData === false && param.contentType != undefined && param.contentType === false) {	
			} else if (param.contentType != undefined || param.contentType === true) {
				xhr.setRequestHeader('Content-Type', param.contentType);
			} else {
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			}
		} else {
			xhr.open(param.type, param.url, true);
		}
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.onerror = function () {
			reject(xhr.responseText);
		};
		xhr.onload = function () {
			if (xhr.status === 200) {
				if (param.success) {
					if (xhr.getResponseHeader("Content-Type").includes('application/json')) {
						param.success(JSON.parse(xhr.responseText));
					} else {
						param.success(xhr.responseText);
					}
				}
				if (xhr.getResponseHeader("Content-Type").includes('application/json')) {
					resolve(JSON.parse(xhr.responseText));
				} else {
					resolve(xhr.responseText);
				}
			} else {
				reject(xhr.responseText);
			}
		};
		if (param.data != null || param.data != undefined) {
			xhr.send(param.data);
		} else {
			xhr.send();
		}
	});
}
function getOrdinalNum(e) {
	return e + (e > 0 ? ["th", "st", "nd", "rd"][e > 3 && 21 > e || e % 10 > 3 ? 0 : e % 10] : "")
}
function toStandardTime(e) {
	var hours;
	return e = e.split(":"), hours = parseInt(e[0]), hours > 12 && (hours -= 12), hours + ":" + e[1]
}
function sendMessageToSW(message) {
	if (navigator.serviceWorker && navigator.serviceWorker.controller) {
		return new Promise(function (resolve, reject) {
			var messageChannel = new MessageChannel();
			messageChannel.port1.onmessage = function (event) {
				if (event.data.error) {
					reject(event.data.error);
				} else {
					resolve(event.data);
				}
			};
			navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
		});
	} else {
		return new Promise(function (resolve, reject) {
			resolve({'success': true, 'error': 'noServiceWorker', 'online': true});
		});
	}
}
function parseNames() {
	for (i in data.days[dateNiceFormat].schedule) {
		if (data.days[dateNiceFormat].schedule[i].name[2] != 'updated') {
			var asdinfei = data.days[dateNiceFormat].schedule[i].name;
			data.days[dateNiceFormat].schedule[i].name = [
				asdinfei,
				asdinfei,
				'updated'
			];
		}
		if (typeof(data.days[dateNiceFormat].schedule[i].name[0]) === 'number') {
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
	console.log('Updating User');
	localStorage.setItem('user', JSON.stringify(user));
	if (syncOnline && usingGoogle) {
		var postData = 'email=' + encodeURIComponent(user.info.email) + '&newJSON=' + encodeURIComponent(JSON.stringify(user));
		ajax({
			url: api.update_user,
			type: 'POST',
			data: postData
		}).then(function() {
			console.log('Synced Online');
		});
	}
	parseNames();
	if (!embed) {
		var table = document.getElementById('schedule-dropdown').querySelector('table');
		table.innerHTML = '';
		for (var z in data.days[dateNiceFormat].schedule) {
			var cacheName = data.days[dateNiceFormat].schedule[z];
			if (cacheName.name[0] != 'Passing') {
				table.insertAdjacentHTML('beforeend', '<tr class="schedule-table-row"><td id="table-period-' + cacheName.name[0] + '">' + cacheName.name[1] + '</td><td class="right-table-row">' + toStandardTime(cacheName.from) + ' - ' + toStandardTime(cacheName.to) + '</td></tr>');
			}
		}
		for (var hi in user.preferences.period_names) {
			var cache = document.querySelector('input[name="' + hi + '"]');
			try {
				if (user.preferences.period_names[hi] != null) {
					cache.value = user.preferences.period_names[hi];
				}
				if (user.preferences.period_names[hi] === '') {
					cache.classList.remove('has-value');
				} else {
					cache.classList.add('has-value');
				}
			} catch (e) {

			}
		}
	}
}
function gSignIn(googleUser) {
	document.getElementById('g-signin-main').style.display = 'none';
	theDOM.removeByClassName('remove-on-google');
	sendMessageToSW({command: swCommands.api_online}).then(function(result) {
		if (result.online === true) {
			var profile = googleUser.getBasicProfile();
			usingGoogle = true;
			theDOM.periodNamesSaveButton.style.display = 'inline-block';
			var statusGoogle = document.getElementById('google-user-status');
			statusGoogle.style.display = 'inline';
			statusGoogle.querySelector('img').src = profile.Paa + '?sz=40';
			document.querySelector('#google-signin-dropdown > div > div > p').innerHTML = 'Sign Out of ' + profile.U3;

			var postData = 'first_name=' + encodeURIComponent(profile.ofa) + '&last_name=' + encodeURIComponent(profile.wea) + '&email=' + encodeURIComponent(profile.U3);
			ajax({
				url: api.get_info,
				type: 'POST',
				data: postData
			}).then(function(r) {
				if (r.success) {
					if (r.info === 'alreadyAccount') {
						user = JSON.parse(r.user);
					}
					userValSet(['info', 'first_name'], profile.ofa);
					userValSet(['info', 'last_name'], profile.wea);
					userValSet(['info', 'email'], profile.U3);
					userValSet(['info', 'profile_pic'], profile.Paa);
					if (embed) {
						try {
							user.stats.user.views.embed;
							user.stats.user.views.embed++;
						} catch (e) {
							userValSet(['stats', 'user', 'views', 'embed'], 1);
						}
					} else {
						try {
							user.stats.user.views.full;
							user.stats.user.views.full++;
						} catch (e) {
							userValSet(['stats', 'user', 'views', 'full'], 1);
						}
					}
					var finishLoad = timeAfterLoad || Date.now();
					userValSet(['stats', 'ttd'], finishLoad - window.performance.timing.requestStart);
					userValSet(['stats', 'tti'], window.performance.timing.domInteractive - window.performance.timing.requestStart);
					userValSet(['stats', 'user', 'lastView'], dateNiceFormat);

					// Opera 8.0+
					var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

					// Firefox 1.0+
					var isFirefox = typeof InstallTrigger !== 'undefined';

					// Safari 3.0+ "[object HTMLElementConstructor]" 
					var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
						return p.toString() === "[object SafariRemoteNotification]";
					})(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

					// Internet Explorer 6-11
					var isIE = /*@cc_on!@*/ false || !!document.documentMode;

					// Edge 20+
					var isEdge = !isIE && !!window.StyleMedia;

					// Chrome 1+
					var isChrome = !!window.chrome && !!window.chrome.webstore;

					var possibleBrowser;

					if (isOpera) {
						possibleBrowser = 'Opera';
					} else if (isFirefox) {
						possibleBrowser = 'Firefox';
					} else if (isSafari) {
						possibleBrowser = 'Safari';
					} else if (isIE) {
						possibleBrowser = 'MSIE';
					} else if (isEdge) {
						possibleBrowser = 'MS Edge';
					} else if (isChrome) {
						possibleBrowser = 'Chrome';
					} else {
						possibleBrowser = navigator.userAgent;
					}

					if (r.info === 'accountCreated') userValSet(['stats', 'user', 'accountCreationDate'], dateNiceFormat);

					userValSet(['stats', 'browser'], {
						platform: navigator.platform,
						appVersion: navigator.appVersion,
						browser: possibleBrowser
					});
					console.log('TTI: ' + user.stats.tti);
					console.log('TTD: ' + user.stats.ttd);
					updateUser(true);
				}
			});
		} else {
			theDOM.periodNamesSaveButton.innerHTML = '<span style="margin-right: 10px; vertical-align: middle; color: red;">Problem connecting to our servers</span><i style="vertical-align: middle; color: red;" class="material-icons">error</i>';
			theDOM.periodNamesSaveButton.disabled = 'true';
			theDOM.periodNamesSaveButton.style.backgroundColor = '#a6a6a6';
		}
	});
}
function gSignOut() {
	theDOM.notifyAndHide('Signing Out');
	gapi.auth2.getAuthInstance().signOut().then(function() {
		console.log('sign out successful');
		usingGoogle = false;
		localStorage.removeItem('user');
		location.reload();
	});
}
function gFail() {

}

function parseSchedule() {
	var clonedData = JSON.parse(JSON.stringify(data));
	var normDataInc = 0;

	for (var i in clonedData.days[dateNiceFormat].schedule) {
		i = parseInt(i);

		var thisClass = clonedData.days[dateNiceFormat].schedule[i];

		if (clonedData.days[dateNiceFormat].schedule[i + 1]) {
			var nextClass = clonedData.days[dateNiceFormat].schedule[i + 1];

			var nextClassFrom = dateNiceFormat + ' ' + nextClass.from + ':00';
			var thisClassTo = dateNiceFormat + ' ' + thisClass.to + ':00';

			if (nextClassFrom == thisClassTo) {
				var differenceBetween = 0;
			} else {
				var differenceBetween = Date.parse(nextClassFrom); - Date.parse(thisClassTo);
			}

			if (differenceBetween !== 0 && nextClass.name !== 'Lunch' && nextClass.name !== 'Brunch') {
				data.days[dateNiceFormat].schedule.splice(normDataInc + 1, 0, {
					"name": "Passing",
					"from": thisClass.to,
					"to": nextClass.from
				});
				normDataInc++;
			}
		}
		normDataInc++;
	}
}


function main() {
	return ajax({
			type: 'GET',
			url: api.schedule,
			success: function(response) {
				data = response;
				var minutes,
					d = new Date(),
					currentMilitaryTime,
					currentI,
					html;

				data.presets = presets;

				dateNiceFormat = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
				theDOM.todayDate.innerText = d.toLocaleString(locale, {weekday: "long"}) + ', ' + d.toLocaleString(locale, {month: "long"}) + ' ' + getOrdinalNum(d.getDate());

				if (d.getMinutes() < 10) {
					minutes = '0' + d.getMinutes();
				} else {
					minutes = d.getMinutes();
				}
				currentMilitaryTime = d.getHours() + ':' + minutes;

				if (!data.days[dateNiceFormat]) data.days[dateNiceFormat] = data.presets[['weekend', 'A', 'tutorial', 'B', 'C', 'A', 'weekend'][d.getDay()]];

				if (data.days[dateNiceFormat]) {

					parseSchedule();

					if (data.days[dateNiceFormat].type) {
						data.days[dateNiceFormat].schedule = data.presets[data.days[dateNiceFormat].type].schedule;
						if (!data.days[dateNiceFormat].name) {
							data.days[dateNiceFormat].name = data.presets[data.days[dateNiceFormat].type].name;
						}
					}
					theDOM.typeOfDay.innerText = data.days[dateNiceFormat].name

					parseNames();

					for (i in data.days[dateNiceFormat].schedule) {

						var fromThisTime = dateNiceFormat + ' ' + data.days[dateNiceFormat].schedule[i].from + ':00',
							toThisTime = dateNiceFormat + ' ' + data.days[dateNiceFormat].schedule[i].to + ':00',
							currentDateParseTime = Date.parse(dateNiceFormat + ' ' + currentMilitaryTime + ':00');
						
						if ((Date.parse(fromThisTime) <= currentDateParseTime) && (Date.parse(toThisTime) >= currentDateParseTime)) {
							currentI = i;

							var lastAction = Date.parse(fromThisTime),
								nextAction = Date.parse(toThisTime),
								totalTimeOfAction = nextAction - lastAction;

							theDOM.updateCurrentPeriodText(data.days[dateNiceFormat].schedule[currentI].name[1]);

							var mainLoop = function() {
								var now = new Date().getTime();
								now += (1000 * data.secondsOffset);

								var distance = nextAction - now,
									percentDoneWith = Math.floor(100 * (1 - (distance / totalTimeOfAction))),
									days = Math.floor(distance / 864e5),
									hours = Math.floor((distance % 864e5) / 36e5) + (days * 24),
									minutes = Math.floor((distance % 36e5) / 6e4),
									seconds = Math.floor((distance % 6e4) / 1e3);
							
								/*var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
								hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + (days * 24),
								minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
								seconds = Math.floor((distance % (1000 * 60)) / 1000);*/

								if (seconds < 0) {
									currentI++;
									var count = 0;
									percentDoneWith = 0;
									if (document.hasFocus()) {
										theDOM.updateProgressBar(0);
									}
									try {
										fromThisTime = dateNiceFormat + ' ' + data.days[dateNiceFormat].schedule[currentI].from + ':00';
										toThisTime = dateNiceFormat + ' ' + data.days[dateNiceFormat].schedule[currentI].to + ':00';
										lastAction = Date.parse(fromThisTime);
										nextAction = Date.parse(toThisTime);
										totalTimeOfAction = nextAction - lastAction;
										theDOM.updateCurrentPeriodText(data.days[dateNiceFormat].schedule[currentI].name[1]);
									} catch (e) {
										theDOM.updateProgressBarText("Nothing");
										theDOM.updateCurrentPeriodText("You’re free!");
										document.title = documentOriginalTitle;
										count++;
										if (count > 3600*20) {
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

									if (document.hasFocus() || embed) {
										theDOM.updateProgressBarText(html);
										theDOM.updateProgressBar(percentDoneWith);
										theDOM.updateCurrentPeriodText(data.days[dateNiceFormat].schedule[currentI].name[1]);
									}

									document.title = html + ' left of ' + data.days[dateNiceFormat].schedule[currentI].name[1];
								}
							}
							theDOM.updateProgressBarText("Click Here");
							mainLoop();
							var x = setInterval(mainLoop, 50);
						} else if ((i === 0) && (Date.parse(fromThisTime) > currentDateParseTime)) {
							var secondsAfterToReload = Math.round(Math.random()*15) + 1;
							var timeForReload = Date.parse(fromThisTime);
							var now = (new Date().getTime()) + (1000 * data.secondsOffset);
							var timeTillRelaod = (timeForReload - now) + (secondsAfterToReload*1e3);
							var beforeClassInterval = setInterval(function() {
								location.reload();
							}, timeTillRelaod);
						}
					}
				}
				if (!x) {
					theDOM.updateProgressBarText("Nothing");
					theDOM.updateCurrentPeriodText("You're free!");
					if (!data.days[dateNiceFormat]) {
						theDOM.typeOfDay.innerText = 'Looks like we forgot to update the schedule for today. Send us an email!';
					}
					var w = setInterval(function() {
						location.reload();
					}, 3600000)
				}
				theDOM.hidePreloader();
			}
		});
}



const documentOriginalTitle = 'MVHS Bell Countdown',
	api = {
		'schedule': '/api/schedule',
		'presets': '/api/presets',
		'get_info': '/api/v1/get_info',
		'update_user': '/api/v1/update_user'
	},
	swCommands = {
		'api_online': 'apiOnline'
	};
var data,
	user,
	dateNiceFormat,
	usingGoogle = false,
	url = new URL(window.location.href),
	presets,
	locale = "en-us",
	embed = url.searchParams.has('_embed'),
	timeAfterLoad;

if (navigator.userAgent.includes('MSIE')) {
	document.body.style.padding = '15px';
	document.body.innerHTML = '<h1 style="color:red; font-weight:bold; font-size:75px;">Stop</h1><p>Please! Stop using bad/old browsers. We will not and do not support Microsoft Internet Explorer.</p><p>We support and encourage the use of Google Chrome, Mozilla Firefox, Opera. Safari and Microsoft Edge might work too.</p>';
	throw new Error('Please! Stop using bad/old browsers. We will not and do not support Microsoft Internet Explorer.');
}

if (localStorage.getItem('user')) {
	user = JSON.parse(localStorage.getItem('user'));
} else {
	user = {
		'preferences': {
			'period_names': {}
		},
		'info': {}
	};
	if (localStorage.getItem('periodNames')) {
		userValSet(['preferences', 'period_names'], JSON.parse(localStorage.getItem('periodNames')));
		localStorage.removeItem('periodNames');
		console.log('converted to new schema');
	}
	localStorage.setItem('user', JSON.stringify(user));
}

if (navigator.serviceWorker) {
	navigator.serviceWorker
		.register('/sw.js', {scope: '/'})
		.then(function(registration) {
			console.log('Service Worker Registered');
		})
		.catch(function(error) {
			console.log('Service Worker Failed' + error);
		});
}

ajax({
	url: api.presets,
	success: function(responseData) {
		presets = responseData;
	}
}).then(function() {
	main().then(function() {
		//if (window.innerWidth < 700) theDOM.gSignInButton.innerText = 'Google Sign in';
		try {
			gapi.load('auth2', function() {
				var auth2 = gapi.auth2.init({
					client_id: '989074405041-k1nns8p3h7eb1s7c6e3j6ui5ohcovjso.apps.googleusercontent.com',
					cookiepolicy: 'single_host_origin',
					'scope': 'profile email'
				});
				auth2.attachClickHandler(theDOM.gSignInButton, {}, gSignIn, gFail);
				gapi.signin2.render('gapi-fake', {
					'scope': 'profile email',
					'width': 240,
					'height': 50,
					'longtitle': true,
					'theme': 'dark',
					'onsuccess': gSignIn,
					'onfailure': gFail
				});
			});
		} catch (e) {
			setTimeout(function() {
				alert('We have encountered a error while connecting to Google. If you have an ad-blocker installed, disable it and reload. If not, try again later.');
				theDOM.gSignInButton.innerHTML = 'Try Reloading';
			}, 2000);
		}
		if (embed) {
			/*document.onclick = function(event) {
				window.open('https://bell.mvhs.club', '_blank');
			}*/
			localStorage.setItem('chromeExtension', 'installed');

			//theDOM.removeByClassName('remove-on-embed');

			document.body.style.overflow = 'hidden';

			if (localStorage.getItem('extensionTimes')) {
				var cache = parseInt(localStorage.getItem('extensionTimes'));
				if (cache % 5 === 0) {
					theDOM.notify('Visit the  <a style="display: inline;" target="_blank" href="https://bell.mvhs.club">full site</a>');
				}
				localStorage.setItem('extensionTimes', cache + 1);
			} else {
				localStorage.setItem('extensionTimes', 0);
			}
		} else {
			if (localStorage.getItem('chromeExtension')) {
				theDOM.hideNotification();
			} else {
				theDOM.notifyAndHide('Install the <a style="display: inline;" target="_blank" href="https://chrome.google.com/webstore/detail/mvhs-bell-countdown/enpponilfcooflcegkodmpdgboooohjm">Chrome Extension</a>', 10);
			}
			setTimeout(function() {
				history.replaceState('', document.title, "/");
			}, 2000);
			updateUser(false);
			window.onscroll = function() {
				var scrollTopVar = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
				scrollTopVar > 0 ? theDOM.scroll.showAll() : theDOM.scroll.hideAll();
			}
			document.onclick = function(event) {
				if (!document.getElementById('google-signin-dropdown-button').contains(event.target)) {
					document.getElementById('google-signin-dropdown').style.display = 'none';
				}
			}
			theDOM.changeNamesForm.onsubmit = function(event) {
				event.preventDefault();
				var here = this;

				sendMessageToSW({command: swCommands.api_online}).then(function(result) {
					if (result.online === true) {
						theDOM.periodNamesSaveButton.disabled = 'true';

						var lastName = theDOM.periodNamesSaveButton.innerHTML;
						theDOM.periodNamesSaveButton.innerHTML = 'Saving';

						var jsonValues = {}, periodNum = 0, inputElements = here.querySelectorAll('input');
						
						for (i in inputElements) {
							var thisElement = inputElements[i];
							jsonValues[thisElement.name] = thisElement.value;
						}

						userValSet(['preferences', 'period_names'], jsonValues);
						userValSet(['stats', 'user', 'lastPeriodNameUpdate'], dateNiceFormat);
						updateUser(true);

						setTimeout(function() {
							theDOM.periodNamesSaveButton.innerHTML = lastName;
							theDOM.periodNamesSaveButton.disabled = '';
							theDOM.notifyAndHide("Your changes were saved.");
						}, 1500);
					}

					if (result.online === false && usingGoogle === true) {
						theDOM.periodNamesSaveButton.innerHTML = '<span style="color: red;">Sorry, we are having problems right now</span>';
					}
				});
				return false;
			};
			timeAfterLoad = Date.now();
		}
	});
});