import { Hono } from "hono";

const route = new Hono()

route.post('/register', async (c) => {
    const body = await c.req.json()
    const user = {
        username: body.username,
        password: body.password
    }

    return c.json({
        message: "User registered",
        data: user
    }, 201)

})

export default route