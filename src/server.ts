import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { sendSms } from "./actions/sendSms";

dotenv.config();
const app = express();
app.use(express.json());

const MCP_SCHEMA: any = {
  name: "Lambda Global MCP",
  version: "1.0.0",
  description:
    "AI Agent-ийн илгээсэн action-уудыг гүйцэтгэдэг middleware сервер.",
  capabilities: [
    {
      name: "send_sms",
      type: "action",
      description: "Хэрэглэгчид SMS илгээдэг capability.",
      returns: {
        success: "boolean",
      },
    },
  ],
};

app.post("/talent", (req: Request, res: Response) => {
  const { phone } = req.body;
  console.log("phone: ", phone);
  res.json({
    first_name: "Munkhjin",
    last_name: "Mira",
    phone,
    job: "full stack developer",
  });
});

app.get("/schema", (req: Request, res: Response) => {
  console.log("уншиж байна");
  res.json(MCP_SCHEMA);
});

app.post("/execute", async (req: Request, res: Response) => {
  try {
    const body = req.body as any;
    console.log("🤖 MCP EXECUTE:", body);

    switch (body.action) {
      case "send_sms":
        await sendSms(body);
        return res.json({ success: true });

      default:
        return res.status(400).json({ error: "Unknown action" });
    }
  } catch (err: any) {
    console.error("❌ MCP Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send(`
    <h2>✅ Lambda Global MCP Server</h2>
    <p>Schema: <a href="/schema">/schema</a></p>
    <p>Execute: POST /execute</p>
  `);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 MCP Server running at http://localhost:${PORT}`)
);
