export default [
	'strapi::logger',
	'strapi::errors',
	{
		name: 'strapi::security',
		config: {
			contentSecurityPolicy: {
				useDefaults: true,
				directives: {
					'connect-src': ["'self'", 'https:'],
					'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
					'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
					upgradeInsecureRequests: null,
				},
			},
		},
	},
	'strapi::cors',
	'strapi::poweredBy',
	'strapi::query',
	'strapi::body',
	{
		name: 'strapi::session',
		config: {
			cookie: {
				secure: true,
				sameSite: 'none',
			},
		},
	},
	'strapi::favicon',
	'strapi::public',
];
