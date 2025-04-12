const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8888"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export { corsOptions };
