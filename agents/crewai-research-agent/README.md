# CrewAI Starter Agent

A simple yet powerful AI research crew built with CrewAI that leverages multiple specialized agents to discover and analyze groundbreaking technologies. 

## References and Acknowledgements

- [CrewAI documentation](https://docs.crewai.com/)
- [CrewAI + Nebius](https://docs.crewai.com/en/concepts/llms#nebius-ai-studio)
- [CrewAI examples](https://github.com/crewAIInc/crewAI)
- [Nebius Token Factory documentation](https://docs.tokenfactory.nebius.com//inference/quickstart)
- This example is contributed from [Arindam200/awesome-ai-apps](https://github.com/Arindam200/awesome-ai-apps)



## Features

- 🔬 **Specialized Research**: Dedicated researcher agent focused on discovering groundbreaking technologies
- 🤖 **Intelligent Analysis**: Powered by Meta-Llama-3.1-70B-Instruct model for deep insights
- 📊 **Structured Output**: Well-defined tasks with clear expected outputs
- ⚡ **Sequential Processing**: Organized task execution for optimal results
- 💡 **Customizable Crew**: Easy to extend with additional agents and tasks

## Prerequisites

- Nebius API key (get it from [Nebius Token Factory](http://tokenfactory.nebius.com/))
- If running locally, python 3.10 or higher dev environment.

## Tech Stack

- CrewAI agent framework
- Nebius AI for LLM inference

## Task Structure

Tasks are defined with:

- Clear description
- Expected output format
- Assigned agent
- Sequential processing

## Example Tasks

- "Identify the next big trend in AI"
- "Analyze emerging technologies in quantum computing"
- "Research breakthroughs in sustainable tech"
- "Investigate future of human-AI collaboration"
- "Explore cutting-edge developments in robotics"

## Setup

The code can be run locally or on Google colab.  Colab is recommended, as it doesn't need any setup.

### Local env setup

1. Clone the repository:

```bash
git clone   https://github.com/nebius/token-factory-cookbook/
cd  agents/crewai-research-agent
```
2. Install dependencies:

if using `uv` package manager
```bash
uv sync
```

If using conda/pip

```bash
pip  install  -r requirements.txt
```


1. Create a `.env` file in the project root and add your Nebius API key:

```
NEBIUS_API_KEY=your_api_key_here
```

## Video

🎥 [Video tutorial](https://www.youtube.com/watch?v=jth10qwoMq0)

## Code

[agent.ipynb](agent.ipynb) notebook can be run locally or Google Colab.
- [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/nebius/token-factory-cookbook/blob/main/agents/crewai-research-agent/agent.ipynb)
- run locally:  
    `uv run --with jupyter jupyter lab agent.ipynb`

[agent.py](agent.py) python script can be run locally.

```bash
# using uv
uv run python agent.py

# or 
python agent.py
```

## Dev Notes

How the uv project was created.

```bash
uv init .
uv add -r requirements.txt
uv add --dev ipykernel   # for jupyter kernel
uv sync

# create a kernel to use uv env within vscode
source  .venv/bin/activate
uv run python -m ipykernel install --user --name=$(basename $(pwd)) --display-name "$(basename $(pwd))"
jupyter kernelspec list  # verify kernel is successfully created
```




