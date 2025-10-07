// src/api/order/routes/custom.ts

export default {
	routes: [
		{
			method: 'POST',
			path: '/orders',
			handler: 'order.create',
			config: {
				policies: [],
				middlewares: [],
			},
		},
		// ✅ Ruta personalizada para generar la firma
		{
			method: 'POST',
			path: '/orders/generate-signature',
			handler: 'order.generateSignature',
			config: {
				policies: [],
				middlewares: [],
			},
		},
	],
};
