const express = require("express");
const cors = require("cors");

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let updatedCustomers = null;

app.get("/api/customers", (req, res) => {
	if (updatedCustomers) {
		res.json(updatedCustomers);
	} else {
		let customers = [
			{
				id: "777",
				firstName: "Stewie",
				lastName: "Griffin",
				accounts: [
					{
						number: "1234",
						balance: "100.0",
						transactionHistory: [],
						users: ["777"],
					},
				],
				alerts: [],
			},
			{
				id: "504",
				firstName: "Glenn",
				lastName: "Quagmire",
				accounts: [
					{
						number: "2001",
						balance: "35000.0",
						transactionHistory: [],
						users: ["504"],
					},
				],
				alerts: [],
			},
			{
				id: "002",
				firstName: "Joe",
				lastName: "Swanson",
				accounts: [
					{
						number: "1010",
						balance: "7425.0",
						transactionHistory: [],
						users: ["002"],
					},
					{
						number: "5500",
						balance: "15000",
						transactionHistory: [],
						users: ["002"],
					},
				],
				alerts: [],
			},
			{
				id: "123",
				firstName: "Peter",
				lastName: "Griffin",
				accounts: [
					{
						number: "0123",
						balance: "150.0",
						transactionHistory: [],
						users: ["123"],
					},
				],
				alerts: [],
			},
			{
				id: "456",
				firstName: "Lois",
				lastName: "Griffin",
				accounts: [
					{
						number: "0456",
						balance: "65000.0",
						transactionHistory: [],
						users: ["456"],
					},
				],
				alerts: [],
			},
			{
				id: "219",
				firstName: "John",
				lastName: "Shark",
				accounts: [
					{
						number: "1010",
						balance: "7425.0",
						transactionHistory: [],
						users: ["002"],
					},
				],
				alerts: [],
			},
		];
		res.json(customers);
	}
});

app.post("/api/customers", (req, res) => {
	updatedCustomers = req.body;
	console.log(updatedCustomers);
	res.json(updatedCustomers);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
