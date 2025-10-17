import { Context } from 'koa';

export default (_config: unknown, { strapi }) => {
	return async (ctx: Context, next: () => Promise<void>) => {
		ctx.request.app.proxy = true;
		await next();
	};
};
