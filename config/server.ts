export default ({ env }) => {
	const defaultPublicUrl =
		env('NODE_ENV') === 'production'
			? 'https://ecommerce-shoes-backend-2.onrender.com'
			: `http://localhost:${env.int('PORT', 1337)}`;

	return {
		host: env('HOST', '0.0.0.0'),
		port: env.int('PORT', 1337),
		app: {
			keys: env.array('APP_KEYS'),
		},

		// PUBLIC_URL can be explicitly set in .env; otherwise use sensible defaults
		url: env('PUBLIC_URL', defaultPublicUrl),
	};
};
