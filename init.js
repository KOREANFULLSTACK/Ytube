import app from "./app";

const PORT = 4000;

const handleListening = () =>
  console.log("listening import on : http://localhost:gg");
const handleHome = (req, res) => res.send(`hi from home~!`);

app.get("/", handleHome);
app.listen(PORT, handleListening);
