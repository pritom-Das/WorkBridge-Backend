const bcrypt = require('bcrypt');

async function run() {
  const password = 'superadmin123'; // choose your super admin password
  const hash = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hash);
}

run();
