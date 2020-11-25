/** Routes for users of pg-intro-demo. */

const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
	try {
		const results = await db.query(`SELECT * FROM users`);
		return res.json({ users: results.rows });
	} catch (e) {
		return next(e);
	}
});

router.get("/search", async (req, res, next) => {
	try {
		const type = req.query.type;
		const results = await db.query(`SELECT * FROM users WHERE type=$1`, [type]);
		return res.json(results.rows);
	} catch (e) {
		return next(e);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { name, type } = req.body;
		const results = await db.query(
			"INSERT INTO users (name, type) VALUES ($1, $2)",
			[name, type]
		);
		return res.json(results.rows);
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
