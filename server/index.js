const express = require('express');
const cors = require('cors');
import router from "./router/router.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
