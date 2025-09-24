import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import logger, { registerGlobalLogHandlers } from "@/lib/logger";

registerGlobalLogHandlers();
logger.info("Bootstrapping promptbazaar.ai web application");

createRoot(document.getElementById("root")!).render(<App />);
