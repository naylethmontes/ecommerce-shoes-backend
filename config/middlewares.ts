import { resolve } from 'path';

export default [
	'strapi::logger',
	'strapi::errors',
	'strapi::security',
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
	{
		resolve: './src/middlewares/https-redirect',
	},
];
