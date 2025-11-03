const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

class EmbeddingService {
  constructor() {
    this.apiUrl = process.env.NEBIUS_API_URL || 'https://api.tokenfactory.nebius.com/v1';
    this.apiKey = process.env.NEBIUS_API_KEY;
    this.model = 'Qwen/Qwen3-Embedding-8B';
    
    if (!this.apiKey) {
      console.warn('⚠️ NEBIUS_API_KEY not set. Embedding service will not work properly.');
    }
  }

  async generateEmbedding(text) {
    try {
      if (!this.apiKey) {
        throw new Error('Nebius API key not configured');
      }

      const response = await axios.post(
        `${this.apiUrl}/embeddings`,
        {
          input: text,
          model: this.model
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.data[0].embedding;
    } catch (error) {
      console.error('❌ Embedding generation error:', error.response?.data || error.message);
      throw new Error(`Failed to generate embedding: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async generateEmbeddings(texts) {
    try {
      if (!this.apiKey) {
        throw new Error('Nebius API key not configured');
      }

      const response = await axios.post(
        `${this.apiUrl}/embeddings`,
        {
          input: texts,
          model: this.model
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.data.map(item => item.embedding);
    } catch (error) {
      console.error('❌ Batch embedding generation error:', error.response?.data || error.message);
      throw new Error(`Failed to generate embeddings: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async processCompanyData(companyData) {
    try {
      const texts = [];
      const metadata = [];

      // Process different types of company data
      if (companyData.description) {
        texts.push(companyData.description);
        metadata.push({ type: 'description', source: 'company_data' });
      }

      if (companyData.goals && Array.isArray(companyData.goals)) {
        companyData.goals.forEach(goal => {
          texts.push(goal);
          metadata.push({ type: 'goal', source: 'company_data' });
        });
      }

      if (companyData.targets && Array.isArray(companyData.targets)) {
        companyData.targets.forEach(target => {
          texts.push(target);
          metadata.push({ type: 'target', source: 'company_data' });
        });
      }

      if (companyData.products && Array.isArray(companyData.products)) {
        companyData.products.forEach(product => {
          const productText = typeof product === 'string' ? product : JSON.stringify(product);
          texts.push(productText);
          metadata.push({ type: 'product', source: 'company_data' });
        });
      }

      if (companyData.industry) {
        texts.push(companyData.industry);
        metadata.push({ type: 'industry', source: 'company_data' });
      }

      if (companyData.values && Array.isArray(companyData.values)) {
        companyData.values.forEach(value => {
          texts.push(value);
          metadata.push({ type: 'value', source: 'company_data' });
        });
      }

      // Generate embeddings for all texts
      const embeddings = await this.generateEmbeddings(texts);

      // Create points for Qdrant
      const points = embeddings.map((embedding, index) => ({
        id: uuidv4(), // Use UUID instead of simple integer
        vector: embedding,
        payload: {
          text: texts[index],
          ...metadata[index],
          timestamp: new Date().toISOString()
        }
      }));

      return points;
    } catch (error) {
      console.error('❌ Failed to process company data:', error);
      throw error;
    }
  }

  async processQuery(query) {
    try {
      const embedding = await this.generateEmbedding(query);
      return embedding;
    } catch (error) {
      console.error('❌ Failed to process query:', error);
      throw error;
    }
  }

  async processDocumentChunks(chunks) {
    try {
      const texts = chunks.map(chunk => chunk.text);
      const embeddings = await this.generateEmbeddings(texts);

      // Create points for Qdrant
      const points = embeddings.map((embedding, index) => ({
        id: chunks[index].id,
        vector: embedding,
        payload: {
          text: chunks[index].text,
          ...chunks[index].metadata,
          source: 'document',
          timestamp: new Date().toISOString()
        }
      }));

      return points;
    } catch (error) {
      console.error('❌ Failed to process document chunks:', error);
      throw error;
    }
  }

  async validateCredentials() {
    try {
      if (!this.apiKey) {
        return { valid: false, error: 'Missing Nebius API key' };
      }

      // Test with a simple text
      await this.generateEmbedding('test');
      return { valid: true };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
}

module.exports = new EmbeddingService(); 