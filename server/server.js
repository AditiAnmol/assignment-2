const initialProductList = [];

const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

//Resolver definitions
const resolvers = {
	Query: {
		productList
	},
	Mutation: {
		productAdd
	}
};

function productAdd(_, { product }){
	product.id = initialProductList.length + 1;
	initialProductList.push(product);
	return product;
}

function productList() {
	return initialProductList;
}

const server = new ApolloServer({
	typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
	resolvers
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function(){
	console.log('App started on port 3000');
});