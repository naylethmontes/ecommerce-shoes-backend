//import { factories } from '@strapi/strapi';

//export default factories.createCoreRouter('api::review.review');

export default {
	routes: [
		{
			method: 'GET',
			path: '/reviews',
			handler: 'review.find',
			config: { auth: false },
		},
		{
			method: 'GET',
			path: '/reviews/:id',
			handler: 'review.findOne',
			config: { auth: false },
		},
		{
			method: 'POST',
			path: '/reviews',
			handler: 'review.create',
			config: {
				auth: {
					scope: ['api::review.review.create'],
				},
			},
		},
		{
			method: 'PUT',
			path: '/reviews/:id',
			handler: 'review.update',
			config: { auth: false },
		},
		{
			method: 'DELETE',
			path: '/reviews/:id',
			handler: 'review.delete',
			config: { auth: false },
		},
	],
};
