### Gazelle

It is a project built with Next 14.

The project is for learning purposes, attempting to implement DDD pattern in backend side.

This project can connect to mcp server gazelle-mcp, and handle queries using genAI as LLM models

## Getting Started

First, run npm install:

```bash
npm install
```

This project uses Prisma as an ORM to interact with the database MySQL.

You can run the script to push the database schema to MySQL.
Ensure you have set your credentials in the `.env` file.

```bash
npm run prisma:push
```

Now you can run on dev mode.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## More about MCP server for Gazelle

Here is the repo [link](https://github.com/ivan1900/gazelle-mcp)
