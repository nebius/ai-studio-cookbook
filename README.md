# Nebius AI Studio Cookbook

The Nebius AI Studio Cookbook is a collection of guides and examples for working with open models using Nebius AI Studio. Use these recipes to build and deploy intelligent applications faster.

## Contributing

We welcome your contributions!

### [Community Contributions](community/README.md)


## Resources

- [Nebius AI Studio Docs](https://docs.nebius.com/studio)
- [Nebius AI Blog](https://nebius.com/blog)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Getting Started

**1 - Prerequisites**

- You’ll need a Nebius AI Studio account and API key. Sign up for free [here](https://studio.nebius.com/).
- Python runtime (local, Google Colab etc.)
- Git

**2 - Follow the [setup guide](setup-dev-env.md)**

**3 - Follow project-specific instructions**

## [APIs](api/)

Access AI Studio using various APIs.

| Code                                       | Description           |
|--------------------------------------------|-----------------------|
| [api_native.ipynb](api/api_native.ipynb)         | OpenAI compatible API |
| [api_litellm.ipynb](api/api_litellm.ipynb)       | Using LiteLLM API     |
| [api_aisuite.ipynb](api/api_aisuite.ipynb)       | Using aisuite API     |
| [api_llamaindex.ipynb](api/api_llamaindex.ipynb) | Using llama-index API |



## Embeddings


## [RAG](rag/)

| Example                             | Description                                         | Tech Stack                         |
|-------------------------------------|-----------------------------------------------------|------------------------------------|
| [PDF RAG](rag/rag-pdf-llama-index/) | Simple PDF RAG application                          | LLamaindex + Nebius AI     |
| [Chat with Documents](rag/chat-with-pdf)  | UI Web app to chat interactively with PDF documents | LLamaindex + Nebius AI + Streamlit |

## Function / Tool Calling

| Example                             | Description                                         | Tech Stack                         |
|-------------------------------------|-----------------------------------------------------|------------------------------------|
| [simple function calling example 1](tool-calling/function_calling_1.ipynb) | Demonstrates how to call functions                          | Nebius AI     |


## [Agents](agents/)

#### [View all agent examples](agents/README.md)

#### [View agent examples by framework](agents/README.md#agents-by-framework)

### 🧩 Starter Agents


| Agent | Descripton                                          | Tech Stack           |
|-----------|-----------------------------------------------|-----------------------|
| [CrewAI Research agent](agents/crewai-research-agent/)  | CrewAI research agent   | CrewAI | 
| [Google ADK Tool calling agent](agents/google-adk-tool-calling/) | Function calling agent | Google ADK | 
| [Agno Hacker News Agent](agents/agno-hacker-news-agent/) | Analyze hacker news | Agno | 
| [Llama-index task timer](agents/llamaindex-task-timer/) | Calculate time spent on tasks | Llama-index | 
| [Pydantic weather agent](agents/pydantic-weather-agent/) | Get weather info in realtime  | Pydantic + Duckduckgo | 
| [AWS Strands Weather Agent](agents/aws-strands-weather-agent/) | Weather assistant | Strands SDK |

## 🏃🏻🏃🏽‍♀️ Multi Agents

| Agent | Descripton                                          | Tech Stack           |
|-----------|-----------------------------------------------|-----------------------|
| [Agno multi agent](agno-agents-examples/) | Multiple agents working together to do finance research | Agno + Duckduckgo + Yahoo Finance| 




## Vision Modes


## Observability

## MCP

## Finetuning

## Distillation

## LORA

---
© Nebius BV, 2025

