export default ({ env }) => ({
	host: env('HOST', '0.0.0.0'),
	port: env.int('PORT', 1337),

	url:
		env('NODE_ENV') === 'production'
			? env(
					'RENDER_EXTERNAL_URL',
					'https://ecommerce-shoes-backend-2.onrender.com',
				)
			: `http://localhost:${env.int('PORT', 1337)}`,

	app: {
		keys: env.array('APP_KEYS', ['testKey1', 'testKey2']),
	},

	settings: {
		trustProxy: true,
	},
});
