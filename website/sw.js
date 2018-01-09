/*var 
	cacheName = 'v1',
	cacheFiles = [
		'/',
		'/api/schedule',
		'/api/presets'
	],
	apiOnline = true,
	lastCacheDate = {};

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll(cacheFiles);
		})
	);
	self.skipWaiting();
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(names) {
			Promise.all(
				names.filter(function(name) {
					return name !== cacheName;
				}).map(function(name) {
					return caches.delete(name)
				})
			)
		})
	);
});


self.addEventListener('fetch', function(event) {
	var requestClone = event.request.clone()
		requestURL = new URL(requestClone.url);
	if (!(requestURL.origin.includes('http://localhost') || requestURL.origin.includes('https://bell.mvhs.club'))) {
		requestURL.pathname == null;
	}
	if (requestURL.pathname == '/' || requestURL.pathname == '/api/presets') {

		if (lastCacheDate[requestClone.url] && ((Date.now() - lastCacheDate[requestClone.url]) < 1.44e7)) {
			event.respondWith(
				caches.match(requestClone).then(function(response) {
					if (response) {
						console.log("[ServiceWorker] " + requestClone.url + " Found in Cache");
						return response;
					}
					console.log('[ServiceWorker] No response when looking in cache for ', requestClone);
				})
			);
		} else {
			event.respondWith(
				fetch(requestClone).then(function(fetchResponse) {
					var responseClone = fetchResponse.clone();
					console.log(fetchResponse);
					if (responseClone.status == 200) {
						apiOnline = true;
						console.log("[ServiceWorker] " + requestClone.url + " Online");

						caches.open(cacheName).then(function(cache) {
							cache.put(event.request, responseClone);
							console.log('[ServiceWorker] ' + requestClone.url + ' Cached');
							lastCacheDate[requestClone.url] = Date.now();
						});
						return fetchResponse;
					}
				}).catch(function(error) {
					apiOnline = false;
					console.log("[ServiceWorker] " + requestClone.url + " Offline");
					return caches.match(requestClone).then(function(cacheResponse) {
						console.log("[ServiceWorker] " + requestClone.url + " Received From Cache");
						return cacheResponse;
					});
				})
			);
		}
	} else if (requestURL.pathname == '/api/schedule') {
		event.respondWith(
			fetch(requestClone).then(function(response) {
				var responseClone = response.clone();
				if (response) {
					apiOnline = true;
					console.log("[ServiceWorker] " + requestClone.url + " Online");

					caches.open(cacheName).then(function(cache) {
						cache.put(event.request, responseClone);
						console.log('[ServiceWorker] ' + requestClone.url + ' Cached');
						lastCacheDate[requestClone.url] = Date.now();
					});
					return response;
				}
			}).catch(function(error) {
				apiOnline = false;
				console.log("[ServiceWorker] " + requestClone.url + " Offline");
				return caches.match(requestClone).then(function(cacheResponse) {
					console.log("[ServiceWorker] " + requestClone.url + " Received From Cache");
					return cacheResponse;
				});
			})
		);
	}
});*/
var apiOnline = true;
self.addEventListener('message', function(event) {
	var command = event.data.command;
	switch (command) {
		case 'apiOnline':
			event.ports[0].postMessage({
				'error': null,
				'online': apiOnline
			});
			break;
		default:
			event.ports[0].postMessage({
				'error': 'unkownPath'
			});
			break;
	}
});

/*self.addEventListener('fetch', function (e) {
	console.log('[ServiceWorker] Fetch', e.request.url);
	if (e.request.method == 'GET') {
		e.respondWith(
			caches.match(e.request).then(function(response) {

				if (response) {
					console.log("[ServiceWorker] Found in Cache");
					return response;
				}

				var requestClone = e.request.clone();
				fetch(requestClone).then(function(response) {

					if (!response) {
						console.warn("[ServiceWorker] No response from fetch ")
						return response;
					}
					var responseClone = response.clone();

					return response;
					caches.open(cacheName).then(function(cache) {

						cache.put(e.request, responseClone);
						console.log('[ServiceWorker] New Data Cached', e.request.url);
						return response;

					});
				}).catch(function (err) {
					console.error('[ServiceWorker] Error Fetching & Caching New Data', err);
				});
			})
		);
	}
});*/