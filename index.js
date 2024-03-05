const express = require('express');
const replicate = require('replicate');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // يمكنك تغيير رقم المنفذ حسب الحاجة

// استيراد وتكوين العميل
const replicateClient = new replicate({
  auth: "r8_6yGN7OMnvt84GFFL03hsS0QIZPT76wX3IpKef",
});

// تحديد مسار الطلب لتشغيل النموذج
app.get('/run-face-swap-detect', async (req, res) => {
  try {
    const output = await replicateClient.run(
      "peter65374/face-swap-detect:5db71f3a5e1e125471fe70a9a08e4624a84522ed285d9229cc902f3aeb3a8603",
      {
        input: {
          model_faces: "https://replicate.delivery/pbxt/Jofw0BnnqfaewOsXQ59xlpBISEI2QFZXFa2VoeKIziJK3sLa/modelfaces.zip",
          target_image: "https://replicate.delivery/pbxt/Jofvzz4ZyhEQ3E4VMb8zm7JqxFanZtjIDfMAC0A8nOyYS4vj/multifaces.jpg",
          inference_mode: "swap"
        }
      }
    );
    res.json({ url: output, message: 'Generated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
