// Usage: ts-node python-scripts/hashPassword.ts <password>
import * as bcrypt from 'bcrypt';

const password = process.argv[2];
if (!password) {
  console.error('Usage: ts-node python-scripts/hashPassword.ts <password>');
  process.exit(1);
}

bcrypt.hash(password, 10, (err: Error | undefined, hash: string | undefined) => {
  if (err) throw err;
  console.log('Hash:', hash);
});
