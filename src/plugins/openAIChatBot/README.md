# OpenAI Chatbot Plugin

A simple and flexible OpenAI-powered chatbot plugin that can be easily integrated into your applications.

## Features

- Simple chat interface with OpenAI's GPT models
- Support for chat history
- Configurable parameters (model, temperature, max tokens)
- Environment variable support for API key

## Installation

1. Install the required dependencies:
```bash
npm install openai dotenv
```

2. Set up your OpenAI API key:
   - Create a `.env` file in your project root
   - Add your OpenAI API key: `OPENAI_API_KEY=your-api-key-here`
   - Or provide it directly in the code (not recommended for production)

## Usage

```typescript
import { OpenAIChatbot } from './plugins/openai-chatbot';

// Initialize with default settings
const chatbot = new OpenAIChatbot();

// Or initialize with custom settings
const chatbot = new OpenAIChatbot({
  apiKey: 'your-api-key', // Optional: can also use OPENAI_API_KEY env variable
  model: 'gpt-4', // Optional: defaults to 'gpt-3.5-turbo'
  temperature: 0.8, // Optional: defaults to 0.7
  maxTokens: 200 // Optional: defaults to 150
});

// Simple chat
const response = await chatbot.chat('Hello, how are you?');
console.log(response);

// Chat with history
const history = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'What is the capital of France?' },
  { role: 'assistant', content: 'The capital of France is Paris.' },
  { role: 'user', content: 'What is its population?' }
];
const response = await chatbot.chatWithHistory(history);
console.log(response);
```

## Configuration Options

- `apiKey`: Your OpenAI API key (optional if set in environment variables)
- `model`: The OpenAI model to use (defaults to 'gpt-3.5-turbo')
- `temperature`: Controls randomness in responses (0-1, defaults to 0.7)
- `maxTokens`: Maximum tokens in response (defaults to 150)

## Security Note

Never commit your API key to version control. Always use environment variables or secure secret management in production. 