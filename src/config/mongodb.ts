export default {
  port: process.env.PORT || 3000,
  mongoUri:
    process.env.MONGO_URI ||
    "mongodb://fang:nfgnFj237@1.94.138.172:27017/didatabase",
};
