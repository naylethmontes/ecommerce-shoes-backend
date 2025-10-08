import { url } from 'inspector';

export default ({ env }) => ({
	host: env('HOST', '0.0.0.0'),
	port: env.int('PORT', 1337),
	app: {
		keys: env.array('APP_KEYS'),
	},

	url: env('PUBLIC_URL', 'https://ecommerce-shoes-backend-1.onrender.com'),
});
