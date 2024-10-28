const svgCaptcha = require('svg-captcha');

// In-memory store for CAPTCHA texts (this can be replaced by Redis or a database in production)
const captchaStore = {};

// Generate CAPTCHA and store the text with a unique ID
function captcha(req, res){
  const captcha = svgCaptcha.create({
    size: 6,         // Length of the captcha text
    noise: 3,        // Amount of noise lines
    color: false,     // Colored text
    background: '#f0f8ff',// Background color
    width:'120',
    height:'40',
  });

  // Create a unique ID for the CAPTCHA
  const captchaId = Date.now().toString() + Math.floor(Math.random() * 1000);

  // Store the CAPTCHA text in memory (for validation)
  captchaStore[captchaId] = captcha.text;

  // Send the CAPTCHA image and ID as a JSON response
  res.json({
    captchaId: captchaId,
    captchaImage: captcha.data
  });
};

// Endpoint to verify CAPTCHA
function verifyCaptcha(req){
  const { captchaId, captchaText } = req.body;

  // Check if the CAPTCHA ID and text are correct
  console.log(captchaStore[captchaId],captchaStore[captchaId].toLowerCase(),captchaText.toLowerCase())
  if (captchaStore[captchaId] && captchaStore[captchaId].toLowerCase() === captchaText.toLowerCase()) {
    // Remove the CAPTCHA from the store after validation
    delete captchaStore[captchaId];
    console.log('captcha verified');
    return ({ success: true, message: 'CAPTCHA verified successfully!' });
  } else {
    // console.log('captcha verification failed');
    return({ success: false, message: 'Invalid CAPTCHA.' });
  }
};

module.exports={captcha,verifyCaptcha};