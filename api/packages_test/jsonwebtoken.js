var jwt = require('jsonwebtoken');

var token = jwt.sign(
  // 数据
  {
    // exp: Math.floor(Date.now() / 1000) + (60 * 60), expiration 过期时间
    foo: 'bar',
  },
  // secret
  'shhhhh',
  // 其他选项
  // 默认 HMAC SHA256

  {
    //algorithm: ‘RS256’
  }
);

try {
  jwt.verify(token, 'shhahhh', function(err, decoded) {
    // console.log(decoded); // bar
    console.log(err);
  });
} catch (_) {}

// get the decoded payload and header
var decoded = jwt.decode(token, { complete: true });
console.log(decoded);
