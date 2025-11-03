const axios = require('axios');

class NebiusService {
  constructor() {
    this.baseUrl = process.env.NEBIUS_API_URL || 'https://api.tokenfactory.nebius.com/v1';
    this.apiKey = process.env.NEBIUS_API_KEY;
    this.folderId = process.env.NEBIUS_FOLDER_ID;
    this.useStudioAPI = true; // Try Token Factory API first
    
    if (!this.apiKey) {
      console.warn('⚠️ NEBIUS_API_KEY not set. Nebius service will not work properly.');
    }
  }

  async generateText(prompt, model = 'meta-llama/Llama-3.3-70B-Instruct', maxTokens = 1000) {
    try {
      if (!this.apiKey) {
        throw new Error('Nebius API credentials not configured');
      }

      // Use Studio API only for now
      try {
        console.log('🔗 Using Nebius Token Factory API...');
        return await this.generateTextWithStudioAPI(prompt, model, maxTokens);
      } catch (error) {
        console.error('❌ Token Factory API failed:', error.message);
        console.error('❌ Error details:', {
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url
        });
        throw error;
      }
    } catch (error) {
      console.error('❌ Nebius API error:', error.response?.data || error.message);
      console.error('🔍 Error details:', {
        code: error.code,
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      throw new Error(`Failed to generate text: ${error.response?.data?.message || error.message}`);
    }
  }

  async generateTextWithStudioAPI(prompt, model, maxTokens) {
    console.log(`🔗 Making request to: ${this.baseUrl}/chat/completions`);
    console.log(`🤖 Model: ${model}`);

    const requestBody = {
      model: model,
      max_tokens: maxTokens,
      temperature: 0.6,
      top_p: 0.9,
      extra_body: {
        top_k: 50
      },
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates high-quality content suggestions based on company data and goals.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    };

    const response = await axios.post(
      `${this.baseUrl}/chat/completions`,
      requestBody,
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      }
    );

    return response.data.choices[0].message.content;
  }

  async generateTextWithFoundationAPI(prompt, model, maxTokens) {
    if (!this.folderId) {
      throw new Error('NEBIUS_FOLDER_ID required for foundation models API');
    }

    console.log(`🔗 Making request to: https://api.nebius.cloud/foundationModels/v1/completion`);
    console.log(`📁 Folder ID: ${this.folderId}`);
    console.log(`🤖 Model: yandexgpt-lite`);

    const requestBody = {
      modelUri: `gpt://${this.folderId}/yandexgpt-lite`,
      completionOptions: {
        maxTokens: maxTokens,
        temperature: 0.7,
        stream: false
      },
      messages: [
        {
          role: 'system',
          text: 'You are a helpful assistant that generates high-quality content suggestions based on company data and goals.'
        },
        {
          role: 'user',
          text: prompt
        }
      ]
    };

    const response = await axios.post(
      'https://api.nebius.cloud/foundationModels/v1/completion',
      requestBody,
      {
        headers: {
          'Authorization': `Api-Key ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      }
    );

    return response.data.result.alternatives[0].message.text;
  }

  async generateContentSuggestions(companyData, contentType, goals, contextData = []) {
    // Build context information from uploaded documents
    let contextInfo = '';
    if (contextData && contextData.length > 0) {
      contextInfo = `\n\nRelevant Context from Uploaded Documents:\n`;
      contextData.forEach((doc, index) => {
        contextInfo += `${index + 1}. Source: ${doc.source || 'Document'}\n`;
        contextInfo += `   Content: ${doc.text.substring(0, 200)}${doc.text.length > 200 ? '...' : ''}\n\n`;
      });
    }

    const contentPrompts = {
      article: `Based on the following company information and uploaded documents, suggest 3 article ideas that align with the company's goals and reference the uploaded content:

Company Data: ${JSON.stringify(companyData)}
Company Goals: ${goals}${contextInfo}

Please provide:
1. Article title
2. Brief description (2-3 sentences)
3. Key points to cover (reference uploaded documents when relevant)
4. Target audience
5. Estimated reading time

Format as JSON array with objects containing: title, description, keyPoints, targetAudience, readingTime.`,

      demo_application: `Based on the following company information and uploaded documents, suggest 3 demo application ideas that showcase the company's capabilities and leverage the uploaded content:

Company Data: ${JSON.stringify(companyData)}
Company Goals: ${goals}${contextInfo}

Please provide:
1. Demo title
2. Demo description (how it relates to uploaded documents)
3. Key features to highlight
4. Target audience
5. Estimated demo duration

Format as JSON array with objects containing: title, description, keyFeatures, targetAudience, duration.`,

      social_media_post: `Based on the following company information and uploaded documents, suggest 5 social media post ideas that reference and promote the uploaded content:

Company Data: ${JSON.stringify(companyData)}
Company Goals: ${goals}${contextInfo}

Please provide:
1. Post title/headline
2. Post content (2-3 sentences, reference uploaded documents)
3. Suggested hashtags
4. Best platform (LinkedIn, Twitter, Instagram, etc.)
5. Engagement strategy

Format as JSON array with objects containing: title, content, hashtags, platform, engagementStrategy.`
    };

    try {
      const prompt = contentPrompts[contentType] || contentPrompts.article;
      const response = await this.generateText(prompt, 'meta-llama/Llama-3.3-70B-Instruct', 1500);
      
      // Try to extract and parse JSON from the response
      let parsedResponse = this.extractAndParseJSON(response);
      
      if (parsedResponse) {
        return {
          success: true,
          data: parsedResponse,
          rawResponse: response
        };
      } else {
        // If JSON parsing fails, return formatted text
        return {
          success: false,
          data: this.formatTextResponse(response),
          rawResponse: response
        };
      }
    } catch (error) {
      console.error(`❌ Failed to generate ${contentType} suggestions:`, error);
      throw error;
    }
  }

  extractAndParseJSON(response) {
    try {
      // Try to find JSON in the response
      const jsonMatch = response.match(/```json\s*(\[[\s\S]*?\])\s*```/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]);
      }
      
      // Try to find JSON array directly
      const arrayMatch = response.match(/\[[\s\S]*\]/);
      if (arrayMatch) {
        return JSON.parse(arrayMatch[0]);
      }
      
      // Try to parse the entire response as JSON
      return JSON.parse(response);
    } catch (error) {
      console.warn('⚠️ Could not parse JSON response:', error.message);
      return null;
    }
  }

  formatTextResponse(response) {
    // Clean up the response and format it nicely
    let formatted = response
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .replace(/^\s*\[\s*/, '')
      .replace(/\s*\]\s*$/, '')
      .trim();
    
    // Split by objects and format each one
    const objects = formatted.split('},').map((obj, index) => {
      if (index < formatted.split('},').length - 1) {
        obj += '}';
      }
      return obj.trim();
    });
    
    return objects.map(obj => {
      try {
        return JSON.parse(obj);
      } catch (error) {
        // If parsing fails, return as formatted text
        return { content: obj, type: 'text' };
      }
    });
  }

  async generateRAGResponse(query, contextData) {
    const prompt = `Based on the following context and query, provide a comprehensive and relevant response:

Context: ${JSON.stringify(contextData)}

Query: ${query}

Please provide a detailed response that:
1. Directly addresses the query
2. Uses information from the provided context
3. Is well-structured and professional
4. Includes actionable insights when applicable

Response:`;

    try {
      return await this.generateText(prompt, 'meta-llama/Llama-3.3-70B-Instruct', 2000);
    } catch (error) {
      console.error('❌ Failed to generate RAG response:', error);
      throw error;
    }
  }

  async analyzeCompanyData(companyData) {
    const prompt = `Analyze the following company data and provide insights:

Company Data: ${JSON.stringify(companyData)}

Please provide:
1. Key strengths and opportunities
2. Potential content themes
3. Target audience analysis
4. Recommended content strategy
5. Competitive advantages to highlight

Format as JSON with these sections.`;

    try {
      const response = await this.generateText(prompt, 'meta-llama/Llama-3.3-70B-Instruct', 1500);
      
      try {
        return JSON.parse(response);
      } catch (parseError) {
        console.warn('⚠️ Could not parse analysis JSON, returning as text');
        return response;
      }
    } catch (error) {
      console.error('❌ Failed to analyze company data:', error);
      throw error;
    }
  }

  async validateCredentials() {
    try {
      if (!this.apiKey) {
        return { valid: false, error: 'Missing API credentials' };
      }

      // Test with a simple prompt
      await this.generateText('Hello', 'meta-llama/Llama-3.3-70B-Instruct', 10);
      return { valid: true };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
}

module.exports = new NebiusService(); 