import { Context, Next } from 'koa';

export default (_config: unknown, { strapi }) => {
	return async (ctx: Context, next: Next) => {
		const isProduction = process.env.NODE_ENV === 'production';

		if (isProduction && ctx.request.headers['x-forwarded-proto'] !== 'https') {
			ctx.request.headers['x-forwarded-proto'] = 'https';
		}

		await next();
	};
};
