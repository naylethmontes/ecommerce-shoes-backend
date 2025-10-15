export default ({ env }) => {
	const defaultPublicUrl =
		env('NODE_ENV') === 'production'
			? 'https://ecommerce-shoes-backend-2.onrender.com'
			: `http://localhost:${env.int('PORT', 1337)}`;

	return {
		host: env('HOST', '0.0.0.0'),
		port: env.int('PORT', 1337),

		proxy: env.bool('PROXY', env('NODE_ENV') === 'production'),

		url: env('PUBLIC_URL', defaultPublicUrl),

		app: {
			keys: env.array('APP_KEYS'),
		},
	};
};
