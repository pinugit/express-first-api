import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {});

app.get("/api/users", async (req, res) => {
	const {
		query: { filter, value },
	} = req;

	const users = await prisma.user.findMany();
	res.status(200).json(users);
});

app.post("/api/users", async (req, res) => {
	try {
		const { name, email } = req.body;
		if (!name && !email)
			return res.status(500).json({ msg: "enter some data" });

		const user = await prisma.user.create({
			data: {
				name: name,
				email: email,
			},
		});

		return res.status(201).json({ user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "error creating blog" });
	}
});

app.get("/api/articles", async (req, res) => {
	const articles = await prisma.article.findMany();

	res.status(200).json(articles);
});

app.post("/api/articles/:userId", async (req, res) => {
	const userId = Number.parseInt(req.params.userId);

	const article = await prisma.article.create({
		data: {
			title: req.body.title,
			body: req.body.body,
			authorId: userId,
		},
	});

	res.status(201).json(article);
});

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
