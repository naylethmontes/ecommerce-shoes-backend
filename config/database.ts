export default ({ env }) => ({
	connection: {
		client: 'postgres',
		connection: {
			// prefer DATABASE_URL when provided (Render/managed DBs)
			connectionString: env('DATABASE_URL', null),
			host: env('DATABASE_HOST', 'localhost'),
			port: env.int('DATABASE_PORT', 5432),
			database: env('DATABASE_NAME', 'ecommerce-tienda'),
			user: env('DATABASE_USERNAME', 'postgres'),
			password: env('DATABASE_PASSWORD', 'postgres'),
			ssl: env.bool('DATABASE_SSL', false)
				? {
						rejectUnauthorized: env.bool(
							'DATABASE_SSL_REJECT_UNAUTHORIZED',
							true,
						),
					}
				: false,
		},
		debug: false,
	},
});
