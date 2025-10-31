import { factories } from '@strapi/strapi';

export default factories.createCoreController(
	'api::review.review',
	({ strapi }) => ({
		async create(ctx) {
			try {
				const { comment, rating, product } = ctx.request.body.data; // viene desde el frontend
				const user = ctx.state.user; // token autenticado

				// Validar autenticación
				if (!user) {
					return ctx.unauthorized('Debe iniciar sesión para dejar una reseña');
				}
				console.log('📦 BODY RECIBIDO:', ctx.request.body);

				// Validar datos requeridos
				if (!comment || !rating || !product) {
					return ctx.badRequest('Faltan campos requeridos');
				}

				// Crear la review y conectar con producto y usuario
				const newReview = await strapi.db.query('api::review.review').create({
					data: {
						comment,
						rating,
						user: { connect: [{ id: user.id }] },
						product: { connect: [{ id: product }] },
					},
					populate: { product: true, user: true },
				});
				console.log('✅ RESEÑA CREADA:', newReview);
				return ctx.send({ data: newReview });
			} catch (error) {
				console.error('Error creando review:', error);
				return ctx.internalServerError('Ocurrió un error al crear la reseña');
			}
		},
	}),
);
