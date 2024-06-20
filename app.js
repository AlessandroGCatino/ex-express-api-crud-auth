const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routerPosts = require('./routers/routerPosts.js');
const routerCategories = require('./routers/routerCategories.js');
const routerTags = require('./routers/routerTags.js');
const routerAuth = require('./routers/routerAuth.js');
const errorHandler = require('./middlewares/errorHandler.js');
const missingPage = require('./middlewares/missingPage.js');
const cors = require("cors");


app.use(cors())

app.use(express.json())

// app.use("/auth", routerAuth)

app.use("/posts", routerPosts)

app.use("/categories", routerCategories)

app.use("/tags", routerTags)

app.use(missingPage)

app.use(errorHandler);

app.listen(port, () => 
    console.log(`Server is running on http://localhost:${port}`))