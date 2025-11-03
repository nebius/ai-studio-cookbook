# 🧪 End‑to‑End Guide ▸ Evaluating Nebius Token Factory Models with OpenBench

OpenBench is a fast, standardized evaluation framework built by [@groqinc](https://github.com/groq) for reproducible LLM benchmarking.

This guide shows how to evaluate **Nebius Token Factory-hosted open models** (like Meta Llama 3 and Qwen) on benchmarks like **MMLU**, using OpenBench and a single terminal command.

---

## 🧠 What is Model Benchmarking?

> Benchmarking lets you measure how well a language model performs on tasks like logic, math, code, or knowledge recall.  
It’s how we compare models like Llama 3, GPT-4, Claude, or Qwen using standardized tests (e.g. MMLU, GPQA, HumanEval).

---

## ⚡ Quick Preview

We'll run a short evaluation on `Llama-3.3-70B-Instruct-fast` hosted by Nebius Token Factory:

```bash
bench eval mmlu \
  --model openai/meta-llama/Llama-3.3-70B-Instruct-fast \
  --limit 12 \
  --temperature 0.6 \
  --timeout 30000 \
  --max-connections 40 \
  --logfile logs/mmlu_sample.jsonl
```

You'll get back accuracy, token counts, and logs in under 15 seconds.

---

## 🛠️ Full Setup (Step-by-Step)

### 1. Install `uv`

Install the `uv` Python environment manager:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
export PATH="$HOME/.local/bin:$PATH"
```

### 2. Clone and install OpenBench

```bash
git clone https://github.com/groq/openbench.git
cd openbench
uv venv
source .venv/bin/activate
uv pip install -e .
```

### 3. Get your Nebius API key

- Visit [studio.nebius.com](https://studio.nebius.com)
- Sign in with GitHub or Google
- Go to **Account Settings → API Keys** and generate one

Then set the following environment variables:

```bash
export OPENAI_API_KEY=your_nebius_api_key_here
export OPENAI_BASE_URL=https://api.studio.nebius.com/v1
export INSPECT_MAX_CONNECTIONS=40
```

> ⚠️ Note: OpenBench uses the OpenAI-compatible SDK. The Nebius API works seamlessly using `OPENAI_API_KEY`.

---

## ✅ Run the Benchmark (Example: MMLU)

Run a short MMLU benchmark on `Llama-3.3-70B-Instruct-fast`:

```bash
bench eval mmlu \
  --model openai/meta-llama/Llama-3.3-70B-Instruct-fast \
  --limit 12 \
  --temperature 0.6 \
  --timeout 30000 \
  --max-connections 40 \
  --logfile logs/mmlu_sample.jsonl
```

This evaluates the model on 12 academic-style questions (from philosophy to physics).

---

## 📊 View Results

You can view results via log file:

```bash
cat logs/mmlu_sample.jsonl
```

Or launch the local results viewer:

```bash
bench view
```

Then visit `http://localhost:7575` in your browser (if not blocked by firewall settings).

---

## 🤔 What Models Can I Test?

Any Nebius-hosted model available in [Token Factory](https://studio.nebius.com/models) will work.  
You can try:

- `openai/meta-llama/Meta-Llama-3.1-70B-Instruct`
- `openai/meta-llama/Llama-3.3-70B-Instruct-fast`
- and others…

Just make sure the model ID you pass matches Nebius’s naming format.

---

## 🧪 Try Other Benchmarks

To list all available tests:

```bash
bench list
```

Some great quick ones:

- `humaneval` – for code generation
- `openbookqa` – elementary science
- `gpqa_diamond` – graduate-level biology/chem/physics
- `simpleqa` – short factual answers

---

## 🙌 Credits

Huge shoutout to:

- [@AarushSah_](https://x.com/AarushSah_) and the [Groq](https://github.com/groq/openbench) team for building OpenBench
- [Inspect](https://github.com/uk-ai/inspect) from the UK AI Safety Institute, which powers OpenBench's adapter layer

---

## 💡 Why This Matters

Running evaluations directly against **production models** — using *the exact same APIs your apps will call* — is the only way to know how your model will behave in the real world.

This is invaluable for:

- Comparing model variants
- Tracking regressions over time
- Validating fine-tuned versions
- Reporting scores externally

---

## 🔗 Nebius Token Factory

Nebius Token Factory provides hosted inference for top OSS models, fast startup, and zero-retention API usage — all from Europe.

- [Explore models](https://studio.nebius.com/models)
- [Start testing](https://studio.nebius.com)
