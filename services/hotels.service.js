const database = require("moleculer-db");
const DynamoAdapter = require("moleculer-db-adapter-dynamodb");
const dynamodb = require("dynamodb");
const Joi = require("joi");

module.exports = {
	name: "hotels",
	mixins: [database],
	adapter: new DynamoAdapter({
		aws: {},
	}),
	model: dynamodb.define("hotel", {
		hashKey: "id",
		schema: {
			id: dynamodb.types.uuid(),
			name: Joi.string().required(),
			address: Joi.string().required(),
			vacancies: Joi.number(),
		}
	}),

	async started() {
		await this.model.createTable().catch((err) => {
			if (err.code === "ResourceInUseException") {
				return;
			}

			throw err;
		});
	}
};

