var open = require('open');

try {
  open('http://localhost:8080/webpack-dev-server/');
}
catch(e) {
  console.log('Error: ', e);
}
finally {
}
