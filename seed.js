const db = require('./server/db/db');
const User = require('./server/db/models/user');

/* Seed function syncs our db and creates 2 users.
Seed function is concerned only with modifying the database. */
async function seed() {
  await db.sync({ forced: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '1234' }),
    User.create({ email: 'murphy@email.com', password: '12345' }),
  ]);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
}

/* Separately, attempt the seed (which puts stuff in the database),if the seed fails
then we are setting process.exitCode to 1 which means it's not successful,
this let's us know if there are any async that's still left over.
Finally is used for resource cleanup; once we're done seeding, then close db connection. */
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
  // finally {
  //   console.log('closing db connection');
  //   await db.close();
  //   console.log('db connection closed');
  // }
}

/* You can do 2 things with JS file using node: you can require it by another file or
run itself by doing "node script seed/npm run seed"
So the function below allows you to distinguish how you are using the JS file by required.main attirbute.
What is the module name that this is running as:
is it running as the MAIN thing it was called or is it running as something that was required elsewhere?

Execute the 'seed' function, IF we ran this module directly ('node seed') from command line. */
if (module === require.main) {
  runSeed();
}
