import OpenAI from 'openai';
import dotenv from 'dotenv';

export interface ChatbotConfig {
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export class OpenAIChatbot {
  private openai: OpenAI;
  private model: string;
  private temperature: number;
  private maxTokens: number;

  constructor(config: ChatbotConfig = {}) {
    
    dotenv.config();

    const apiKey = config.apiKey || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key is required. Please provide it in the config or set OPENAI_API_KEY environment variable.');
    }

    this.openai = new OpenAI({ apiKey });
    
    this.model = config.model || 'gpt-3.5-turbo';
    this.temperature = config.temperature || 0.7;
    this.maxTokens = config.maxTokens || 150;
  }

  async chat(message: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [{ role: 'user', content: message }],
        temperature: this.temperature,
        max_tokens: this.maxTokens,
      });

      return response.choices[0]?.message?.content || 'No response generated';
    } catch (error) {
      console.error('Error in OpenAI chat:', error);
      throw new Error('Failed to generate response from OpenAI');
    }
  }

  async chatWithHistory(messages: Array<{ role: 'user' | 'assistant' | 'system', content: string }>): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages,
        temperature: this.temperature,
        max_tokens: this.maxTokens,
      });

      return response.choices[0]?.message?.content || 'No response generated';
    } catch (error) {
      console.error('Error in OpenAI chat:', error);
      throw new Error('Failed to generate response from OpenAI');
    }
  }
}