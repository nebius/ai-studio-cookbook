# AI Data Analyst Chatbot for E-Commerce Analytics

A production-grade AI Data Analyst Chatbot workflow for n8n, leveraging Nebius Token Factory's DeepSeek-V3-0324-fast LLM for advanced, structured data analysis and Google Workspace automation.

This repository demonstrates a generic e-commerce analytics agent use case—no brand-specific logic or data is included. The workflow can be adapted to any e-commerce or transactional business scenario.

![Workflow Diagram](assets/workflow-diagram.png)

---

## 🛠️ Architecture Overview

- **Workflow Orchestration:** Built in [n8n](https://n8n.io/), using modular nodes for event-driven automation and data transformation.
- **LLM Integration:** Utilizes [Nebius Token Factory](https://studio.nebius.com/) DeepSeek-V3-0324-fast for high-performance, context-aware reasoning and structured output.
- **Google Workspace Integration:** Secure OAuth2 connections to Google Sheets and Google Docs for real-time data retrieval and document updates.
- **Memory & State:** Implements buffer memory for short-term context retention (last 5 messages) to enable coherent, multi-turn conversations.
- **Structured Output Parsing:** Enforces strict JSON schema validation for LLM responses, ensuring reliable downstream automation.

---

## ⚙️ Workflow Deep Dive

This solution is designed for e-commerce analytics, but can be adapted to any transactional data scenario. The workflow includes:
- Chat message trigger (`When chat message received`)
- LLM-powered agent for structured reasoning (`AI Agent`)
- Google Sheets/Docs integration for data and reporting (`Get transactions by status`, `Get transactions by product name`, `Get all transactions`, `Document Strategy`)
- Memory and output parsing for robust automation (`Buffer Memory`, `Structured Output Parser`)
- Decision and routing logic (`If`, `If1`, `If2`, `Merge`, `Set`)

For technical implementation, node configuration, and code examples, see [Cookbook.md](./Cookbook.md).

---

## 🧩 Example Use Cases
- Automated financial and sales analysis for e-commerce
- Real-time lead generation and outreach
- Instant database chatbots for internal knowledge
- Competitive intelligence with live document updates

---

## 🧑‍💻 Model & Security Details
- **Model:** Nebius DeepSeek-V3-0324-fast (Open-source, EU-hosted, zero data retention)
- **Security:**
  - All API credentials managed via n8n's encrypted credential store
  - OAuth2 for Google integrations
  - No data is stored or logged outside your infrastructure
- **Performance:**
  - Hosted on NVIDIA GPUs for low-latency inference
  - Cost-effective, scalable, and GDPR-compliant

---

## 🚀 Quick Start
1. Import `ecommerce-analytics-agent-workflow.json` into n8n.
2. Configure Nebius and Google credentials as described in [Cookbook.md](./Cookbook.md).
3. Replace the Google Sheets/Docs URLs with your own.
4. Activate the workflow and interact via the n8n chat interface or webhook.

---

## 📚 Resources
- [Nebius Token Factory](https://studio.nebius.com/)
- [n8n Documentation](https://docs.n8n.io/)
- [Google OAuth n8n Setup Guide](https://docs.n8n.io/integrations/builtin/credentials/Google/)

---

Contributions welcome! 