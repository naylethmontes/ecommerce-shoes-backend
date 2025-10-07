/**
 * review controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
	'api::review.review',
	({ strapi }) => ({
		async create(ctx) {
			const user = ctx.state.user;
			if (!user) {
				return ctx.unauthorized('Debe iniciar sesión para dejar una reseña');
			}

			const { product } = ctx.request.body.data;

			// Verificar si el usuario ya tiene una reseña para este producto
			const existingReview = await strapi.db
				.query('api::review.review')
				.findOne({
					where: {
						user: user.id,
						product: product,
					},
				});

			if (existingReview) {
				return ctx.badRequest('Ya agregaste una reseña a este producto.');
			}

			const response = await super.create(ctx);
			return response;
		},
	}),
);
