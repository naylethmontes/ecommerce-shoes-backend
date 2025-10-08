export default ({ env }) => ({
	connection: {
		client: env('DATABASE_CLIENT', 'postgres'),
		connection: env('DATABASE_URL')
			? {
					connectionString: env('DATABASE_URL'),
					ssl: {
						rejectUnauthorized: env.bool(
							'DATABASE_SSL_REJECT_UNAUTHORIZED',
							false,
						),
					},
				}
			: {
					host: env('DATABASE_HOST', 'localhost'),
					port: env.int('DATABASE_PORT', 5432),
					database: env('DATABASE_NAME', 'ecommerce-shoe'),
					user: env('DATABASE_USERNAME', 'postgres'),
					password: env('DATABASE_PASSWORD', 'postgres'),
					ssl: env.bool('DATABASE_SSL', false) && {
						rejectUnauthorized: env.bool(
							'DATABASE_SSL_REJECT_UNAUTHORIZED',
							true,
						),
					},
				},
		debug: false,
	},
});
