import httpx
import asyncio
from typing import List, Union
from config import Config

class EmbeddingAgent:
    def __init__(self):
        self.api_key = Config.NEBIUS_API_KEY
        self.base_url = Config.NEBIUS_BASE_URL
        self.model = Config.EMBEDDING_MODEL
        
    async def generate_embeddings(self, texts: Union[str, List[str]]) -> List[List[float]]:
        """Generate embeddings using Nebius Token Factory"""
        if isinstance(texts, str):
            texts = [texts]
            
        if not texts:
            raise Exception("No texts provided for embedding")
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": self.model,
            "input": texts
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/embeddings",
                    headers=headers,
                    json=payload,
                    timeout=60.0
                )
                response.raise_for_status()
                
                result = response.json()
                
                if "data" not in result:
                    raise Exception(f"No 'data' field in response. Keys: {list(result.keys())}")
                
                embeddings = [item["embedding"] for item in result["data"]]
                return embeddings
                
        except Exception as e:
            print(f"Embedding generation failed: {e}")
            raise Exception(f"Embedding error: {str(e)}")
    
    async def generate_embeddings_batch(self, texts: List[str], batch_size: int = None) -> List[List[float]]:
        """Generate embeddings in batches to handle API limits"""
        if batch_size is None:
            batch_size = Config.EMBEDDING_BATCH_SIZE
            
        all_embeddings = []
        
        for i in range(0, len(texts), batch_size):
            batch = texts[i:i + batch_size]
            batch_embeddings = await self.generate_embeddings(batch)
            all_embeddings.extend(batch_embeddings)
            
            # Small delay to respect rate limits
            if i + batch_size < len(texts):
                await asyncio.sleep(0.1)
        
        return all_embeddings
