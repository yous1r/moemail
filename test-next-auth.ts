import NextAuth from 'next-auth'
console.log("Before NextAuth");
const result = NextAuth(() => {
  console.log("Config function called!");
  return { providers: [] };
});
console.log("After NextAuth", Object.keys(result));
