const admin = require('firebase-admin');
admin.initializeApp();
// Used from example https://github.com/firebase/functions-samples/tree/master/authenticated-json-api
// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const authenticate = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    res.status(403).json('Unauthorized Chicken Nugget');
    return;
  }
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(token);
    req.user = decodedIdToken;
    next();
    return;
  } catch(e) {
    res.status(403).json('Unauthorized');
    return;
  }
};
  
module.exports = authenticate;