export default ({ env }) => {
	const isProduction = env('NODE_ENV') === 'production';

	return {
		auth: {
			secret: env('ADMIN_JWT_SECRET'),
		},

		apiToken: {
			salt: env('API_TOKEN_SALT'),
		},

		transfer: {
			token: {
				salt: env('TRANSFER_TOKEN_SALT'),
			},
		},

		secrets: {
			encryptionKey: env('ENCRYPTION_KEY'),
		},

		flags: {
			nps: env.bool('FLAG_NPS', true),
			promoteEE: env.bool('FLAG_PROMOTE_EE', true),
		},

		url: isProduction
			? 'https://ecommerce-shoes-backend-2.onrender.com/admin'
			: 'http://localhost:1337/admin',

		authSessions: {
			secure: isProduction ? false : false,
			sameSite: isProduction ? 'none' : 'lax',
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
		},
	};
};
