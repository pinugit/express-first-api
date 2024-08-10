import express, { query } from "express";

const app = express();

const PORT = 5000;

const users = [
	{ id: 1, username: "user1", displayname: "User One" },
	{ id: 2, username: "user2", displayname: "User Two" },
	{ id: 3, username: "user3", displayname: "User Three" },
	{ id: 4, username: "user4", displayname: "User Four" },
	{ id: 5, username: "user5", displayname: "User Five" },
	{ id: 6, username: "user6", displayname: "User Six" },
	{ id: 7, username: "user7", displayname: "User Seven" },
	{ id: 8, username: "user8", displayname: "User Eight" },
];

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({ msg: "server is working" });
});

app.get("/api/users", (req, res) => {
	const {
		query: { filter, value },
	} = req;

	if (filter && value)
		return res
			.status(200)
			.json(users.filter((user) => user[filter].includes(value)));

	res.status(200).json(users);
});

app.post("/api/users", (req, res) => {
	console.log(req.body);
	res.json({ msg: "less go" });
});

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
