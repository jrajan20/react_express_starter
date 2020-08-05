const express = require("express");
const cors = require("cors");

const app = express();

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

app.get("/api/customers", (req, res) => {
	res.json(customers);
});

app.post("localhost:3000/api/update", (req, res) => {
	customers = JSON.parse(req.body);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
