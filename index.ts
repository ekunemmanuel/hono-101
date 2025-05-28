import { Hono } from "hono";
import authRoute from './auth'
const app = new Hono();

app.route('/auth', authRoute)
// Home route
app.get("/", (c) => c.text('hello'))

// Get all users
app.get("/users", (c) => {
    return c.json(users)
})

// Create a new user
app.post("/users", async (c) => {
    const body = await c.req.json()
    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const user = {
        id: nextId,
        name: body.name,
        age: body.age,
        color: body.color
    }
    users.push(user)
    return c.json(users)
})

// Middleware that logs Methods and Path
app.use(async (c, next) => {
    console.log(`${c.req.method} ${c.req.path}`);

    await next()
})
// Get a user by id
app.get("/users/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const user = users.find(u => u.id === id);

    if (!user) {
        return c.json({ error: "User not found" }, 404);
    }
    return c.json(user);
})

// Partially update a user (PATCH)
app.patch("/users/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) {
        return c.json({ error: "User not found" }, 404);
    }

    const body = await c.req.json();
    users[idx] = { ...users[idx], ...body, id };
    return c.json(users[idx]);
});

// Update a user completely (PUT)
app.put("/users/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) {
        return c.json({ error: "User not found" }, 404);
    }

    const body = await c.req.json();
    users[idx] = { id, ...body };
    return c.json(users[idx]);
});

// Delete a user by id
app.delete("/users/:id", (c) => {
    const id = Number(c.req.param("id"));
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) {
        return c.json({ error: "User not found" }, 404);
    }

    const deleted = users.splice(idx, 1)[0];
    return c.json(deleted);
});


Bun.serve({
    fetch: app.fetch,
    port: 3000,
})

const users = [
    {
        id: 1,
        name: "Emmanuel",
        age: 12,
        color: "Green"
    },
    {
        id: 2,
        name: "Daniel",
        age: 34,
        color: "Yellow"
    },
    {
        id: 3,
        name: "Scoot",
        age: 20,
        color: "Blue"
    },
    {
        id: 4,
        name: "Sharon",
        age: 12,
        color: "Pink"
    },
    {
        id: 5,
        name: "Paul",
        age: 48,
        color: "White"
    }
]

