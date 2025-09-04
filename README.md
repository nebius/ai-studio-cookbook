# Nebius AI Studio Cookbook

<img src="images/banner-1.jpg">

This cookbook respository is a collection of guides and examples for working with open models using [Nebius AI Studio](https://studio.nebius.com/). Use these recipes to build and deploy intelligent applications faster.


> ⭐ If you find this repo useful, give it a star! You’ll be notified of new updates and help others discover it too — thank you!

---

## 😎 Featured

- New [model guides](models/README.md) (e.g. GPT-OSS, Qwen3-2507)
- Community contributions: [open bench evaluation guide](community/openbench-evaluation-guide/)
- [Distillation guide](distillation/distillation-1/)
- [Create fun images using LORA adapters](lora/lora-1/README.md)
- [Fun benchmark "pelican riding a bicycle"](fun/pelican-riding-bicycle/)

### 💪 [Cool Apps / Demos](apps/README.md)

See apps powered by Nebius AI - WhatLLM, Streetfighter and more


---

## 🚀 Getting Started

1. Prerequisites:
   - You’ll need a Nebius AI Studio account and API key. Sign up for free [here](https://studio.nebius.com/).
   - Python runtime (local, Google Colab etc.)
2. Follow the [setup guide](setup-dev-env.md)
3. Follow project-specific instructions**

---

## 🎁 [Models](models/)

Checkout latest [model guides and sample code](models/).

Featuring: [Qwen3-2507](models/qwen3-2507.md) and [GPT-OSS](models/gpt-oss.md)

---

## 📘 [APIs](api/)

Access AI Studio using various APIs.

[Open AI comptible API](api/api_native.ipynb)
&nbsp;  • &nbsp;  [LiteLLM](api/api_litellm.ipynb)
&nbsp;  • &nbsp;  [ai-suite](api/api_aisuite.ipynb)
&nbsp;  • &nbsp;  [llama-index](api/api_llamaindex.ipynb)

---

## 🕶️ [Fun and Cool Stuff](fun/)

Have some fun with models.  
- [creating cool images using LORA](lora/lora-1/README.md)
- Try ["Pelican Riding a bicycle" benchmark](fun/pelican-riding-bicycle/)

---

<!-- ## Embeddings -->


## 🔍 [RAG](rag/)

| Example                             | Description                                         | Tech Stack                         |
|-------------------------------------|-----------------------------------------------------|------------------------------------|
| [PDF RAG](rag/rag-pdf-llama-index/) | Simple PDF RAG application                          | LLamaindex + Nebius AI     |
| [Chat with Documents](rag/chat-with-pdf)  | UI Web app to chat interactively with PDF documents | LLamaindex + Nebius AI + Streamlit |
| [Internal Content Generation Platform](rag/content-gen-pipeline-qdrant/)  | A platform for creating social posts, articles, and demo apps with a RAG pipeline. | Qdrant + Nebius AI + Qwen3-Embedding |
| [End-to-end RAG pipeline for PDF documents](rag/rag-milvus-1/)  | Process and query PDF documents using vector database and open source embeddings + models | Llama-index + Milvus db + Nebius AI + Qwen3-Embedding + GPT-OSS |
| [Internal Support Agent](rag/support-agent-weaviate/) | Multi-agent internal support agent with web search, document RAG, Notion/Calendly tools, and Slack bot | Nebius AI + LangGraph + Weaviate |


---

## 🎠 [Agents](agents/)

We have numerous  agent examples: from [starter agents](agents/README.md#-starter-agents) to [intermediate agents](agents/README.md#intermediate-agents) and [advanced agents](agents/README.md#advanced-agents).

**Featured AI Agent frameworks:**  
[<img src="images/crewai-icon.svg" width="20" height="20"> CrewAI](agents/README.md#crewai)
&nbsp;  • &nbsp; [<img src="images/agno-icon.png" width="20" height="20"> Agno](agents/README.md#agno)
&nbsp;  • &nbsp; [<img src="images/google-adk-icon.png" width="20" height="20"> Google ADK](agents/README.md#google-adk-agent-development-kit)
&nbsp;  • &nbsp; [<img src="images/llama-index-icon.jpeg" width="20" height="20"> Llama-index](agents/README.md#llama-index)
&nbsp;  • &nbsp; [<img src="images/pydantic-icon.png" width="20" height="20"> Pydantic](agents/README.md#pydantic-ai)
&nbsp;  • &nbsp; [<img src="images/aws-strands-agent-icon.png" width="20" height="20"> AWS Strands](agents/README.md#strands-agent)

---

## ⚒️ Function / Tool Calling

| Example                             | Description                                         | Tech Stack                         |
|-------------------------------------|-----------------------------------------------------|------------------------------------|
| [simple function calling example 1](tool-calling/function_calling_1.ipynb) | Demonstrates how to call functions                          | Nebius AI     |

---

<!-- ## Vision Modes


## Observability

## MCP

## Finetuning -->

## 🫗 Distillation

| Name | Descripton                                          | Tech Stack           |
|-----------|-----------------------------------------------|-----------------------|
| [Distillation 1](distillation/distillation-1/)  | Example of a distilled model to do grammer check   | Nebius AI | 

<!-- ## LORA -->

---

## 🤝 Contributing

We welcome your contributions!  Open issues, submit pull requests, share your experience.

🧑🏻‍🤝‍🧑🏼 **[View community contributions](community/README.md)**

---


## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📔 Resources

- [Nebius AI Studio Docs](https://docs.nebius.com/studio)
- [Nebius AI Blog](https://nebius.com/blog)

---

## 🌟 GitHub Star History

[![Star History Chart](https://api.star-history.com/svg?repos=nebius/ai-studio-cookbook&type=Date)](https://www.star-history.com/#nebius/ai-studio-cookbook&Date)

---

## ✨ Contributors

Thanks to all of our amazing contributors!

<a href="https://github.com/nebius/ai-studio-cookbook/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nebius/ai-studio-cookbook" />
</a>

---
© Nebius BV, 2025

