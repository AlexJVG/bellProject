/*var cacheName = 'v1';
var cacheFiles = [
	'./',
	'/',
	'/css/main.css',
	'/css/material.css',
	'/js/main.js',
	'/js/material.js',
	'https://fonts.googleapis.com/css?family=Roboto:400,700'
];

self.addEventListener('install', function(e) {
	console.log('serivice worker installed');
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('caching cache files');
			return(cache.addAll(cacheFiles));
		})
	);
});
self.addEventListener('activate', function(e) {
	console.log('serivice worker activated');
	e.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {
				if (thisCacheName !== cacheName) {
					console.log('Removing cached files from ' + thisCacheName);
					return(caches.delete(thisCacheName));
				}
			}));
		})
	);
});
self.addEventListener('fetch', function(e) {
	console.log('serivice worker fetched');
});*/