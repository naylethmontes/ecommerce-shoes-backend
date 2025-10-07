// @ts-ignore

/**
 * order controller
 */

//export default factories.createCoreController('api::order.order');

import { factories } from '@strapi/strapi';
import crypto from 'crypto';

module.exports = factories.createCoreController(
	'api::order.order',
	({ strapi }) => ({
		async create(ctx) {
			const { products, uuid, total, buyer, email, phone, signature } =
				ctx.request.body;

			const user = ctx.state.user;

			if (!user) {
				return ctx.unauthorized(
					'Debes estar autenticado para realizar una orden',
				);
			}

			// 1. Guardar orden en Strapi

			try {
				const newOrder = await strapi.entityService.create('api::order.order', {
					data: {
						wompiId: uuid,
						status: 'pending',
						total_price: total,
						user: user.id,
						buyer,
						email,
						phone,
						signature,

						items: Array.isArray(products)
							? products.map((p) => ({
									quantity: p.quantity || 1,
									size: p.selectedSize || 'default',
									color: p.selectedColor || 'default',
									product: p.id,
							  }))
							: [],
					},
				});

				return ctx.send({
					message: 'Orden creada y guardada exitosamente 🧾',
					orderId: newOrder.id,
				});
			} catch (error) {
				console.error('Error al guardar la orden en Strapi ❌', error);
				return ctx.throw(500, 'No se pudo guardar la orden en Strapi');
			}
		},

		// ✅ Función para generar la firma
		async generateSignature(ctx) {
			try {
				const { reference, amountInCents, currency } = ctx.request.body;

				if (!reference || !amountInCents || !currency) {
					return ctx.badRequest('Faltan datos para generar la firma');
				}

				const merchantId = process.env.WOMPI_MERCHANT_ID;
				const privateKey = process.env.WOMPI_PRIVATE_KEY;

				if (!merchantId || !privateKey) {
					return ctx.internalServerError('Llaves de Wompi no configuradas');
				}

				const rawSignature = `${reference}~${merchantId}~${amountInCents}~${currency}`;
				const signature = crypto
					.createHmac('sha256', privateKey)
					.update(rawSignature)
					.digest('hex');

				return ctx.send({ signature });
			} catch (error) {
				console.error('Error generando firma Wompi ❌', error);
				return ctx.internalServerError('No se pudo generar la firma');
			}
		},
	}),
);
