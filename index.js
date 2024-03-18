const express = require('express');
const Replicate = require('replicate');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const replicate = new Replicate({
  auth: "r8_Zpkz9MjfUmarRqlZh9nL7yIOUvCl6iu2fKru0",
});

const PORT = process.env.PORT || 3000;

app.get('/face-swap', async (req, res) => {
  try {
    const output = await replicate.run(
      "omniedgeio/face-swap:c2d783366e8d32e6e82c40682fab6b4c23b9c6eff2692c0cf7585fc16c238cfe",
      {
        input: {
          swap_image: req.query.swap_image,
          target_image: req.query.target_image
        }
      }
    );
    res.json(output);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
