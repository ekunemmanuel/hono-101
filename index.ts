import { Hono } from "hono";

const app = new Hono();

app.get("/", (c)=> c.text('hello'))

Bun.serve({
    fetch:app.fetch,
    port: 3000,
})