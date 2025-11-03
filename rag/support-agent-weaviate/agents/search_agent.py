from exa_py import Exa
from typing import List, Dict, Any
from config import Config

class SearchAgent:
    def __init__(self):
        self.exa = Exa(Config.EXA_API_KEY)
    
    async def search_web(self, query: str, num_results: int = None) -> List[Dict[str, Any]]:
        """Search the web, prioritizing Nebius Token Factory sources"""
        if num_results is None:
            num_results = Config.DEFAULT_SEARCH_RESULTS

        try:
            requested = int(num_results)
        except Exception:
            requested = Config.DEFAULT_SEARCH_RESULTS

        print(f"🌐 Exa search: requested num_results={requested} for query='{query[:60]}'...")

        try:
            # Step 1: Search Nebius-specific domains
            nebius_results = self.exa.search_and_contents(
                query=query,
                num_results=requested,
                text=True,
                use_autoprompt=True,
                include_domains=[
                    "tokenfactory.nebius.com",
                    "docs.tokenfactory.nebius.com",
                    "docs.nebius.com/studio"
                ]
            )

            prioritized_results = []
            for result in getattr(nebius_results, "results", []):
                prioritized_results.append({
                    "title": result.title or "No Title",
                    "url": result.url,
                    "content": result.text or "",
                    "score": getattr(result, "score", 0.0),
                    "source": "nebius_search"
                })

            print(f"🌐 Exa search (Nebius): returned {len(prioritized_results)} results")

            # Step 2: Fallback to general web search
            if len(prioritized_results) < requested:
                remaining = requested - len(prioritized_results)
                web_results = self.exa.search_and_contents(
                    query=query,
                    num_results=remaining,
                    text=True,
                    use_autoprompt=True
                )
                for result in getattr(web_results, "results", []):
                    prioritized_results.append({
                        "title": result.title or "No Title",
                        "url": result.url,
                        "content": result.text or "",
                        "score": getattr(result, "score", 0.0),
                        "source": "web_search"
                    })

                print(f"🌐 Exa search (General): added {len(prioritized_results) - len(nebius_results.results)} results")

            return prioritized_results

        except Exception as e:
            print(f"Web search error: {e}")
            return []
