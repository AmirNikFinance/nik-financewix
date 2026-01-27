# Chatbot Setup Guide

## Overview
This guide explains how to set up the Google LLM Notebook-based chatbot for education and lead capture on your website.

## Features
- **AI-Powered Conversations**: Uses Google LLM Notebook for intelligent responses
- **Banking Knowledge**: Pre-trained on bank policies and loan products
- **Lead Capture**: Automatically captures visitor emails and phone numbers
- **Responsive Design**: Works on desktop and mobile
- **Easy Integration**: Floating chat bubble that appears on all pages

## Setup Steps

### 1. Create a Google LLM Notebook

1. Go to [Google Colab](https://colab.research.google.com/)
2. Create a new notebook
3. Set up your LLM model (e.g., using Google's Generative AI API)
4. Create an API endpoint that accepts POST requests with the following format:

```json
{
  "messages": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi there!" }
  ],
  "systemPrompt": "You are a helpful assistant...",
  "temperature": 0.7,
  "maxTokens": 500
}
```

### 2. Configure Environment Variables

Add these to your `.env` file:

```env
REACT_APP_GOOGLE_LLM_ENDPOINT=https://your-notebook-endpoint.com/api/chat
REACT_APP_GOOGLE_LLM_API_KEY=your-api-key-here
```

### 3. Update Chatbot Configuration

Edit `/src/config/chatbot.config.ts` to customize:
- System prompt and knowledge topics
- Lead capture settings
- UI positioning and behavior

### 4. Test the Chatbot

1. Start your development server: `npm run dev`
2. Look for the chat bubble in the bottom-right corner
3. Send a test message
4. Check the browser console for any errors

## Configuration Options

### Enable/Disable Chatbot
```typescript
// In chatbot.config.ts
googleLLM: {
  enabled: true, // Set to false to disable
  // ...
}
```

### Customize System Prompt
```typescript
// In chatbot.config.ts
knowledgeBase: {
  systemPrompt: `Your custom prompt here...`
}
```

### Lead Capture Settings
```typescript
// In chatbot.config.ts
leadCapture: {
  collectEmail: true,
  collectPhone: true,
  collectName: false,
  storageCollection: 'referrals'
}
```

## API Integration

### Sending Messages
The chatbot sends messages to your LLM endpoint with this structure:

```json
{
  "messages": [
    { "role": "user", "content": "What loan products do you offer?" },
    { "role": "assistant", "content": "We offer..." }
  ],
  "systemPrompt": "You are an expert...",
  "temperature": 0.7,
  "maxTokens": 500
}
```

### Expected Response
Your endpoint should return:

```json
{
  "response": "Here's information about our loan products..."
}
```

## Lead Capture

When visitors engage with the chatbot:
1. After 4+ messages, a lead capture form appears
2. Visitors can enter their email and phone
3. Data is stored in the `referrals` collection
4. You can view leads in your Wix dashboard

## Customization

### Change Chat Bubble Position
```typescript
// In chatbot.config.ts
ui: {
  position: 'bottom-right', // or 'bottom-left', 'top-right', 'top-left'
}
```

### Modify Welcome Message
Edit the initial message in `/src/components/ChatBot.tsx`:

```typescript
const [messages, setMessages] = useState<Message[]>([
  {
    id: '1',
    role: 'assistant',
    content: 'Your custom welcome message here',
    timestamp: new Date()
  }
]);
```

### Add Quick Reply Suggestions
Edit `generateFollowUpSuggestions()` in `/src/lib/googleLLM.ts`:

```typescript
const suggestions: Record<string, string[]> = {
  'home loan': [
    'What are the current interest rates?',
    'What are the eligibility requirements?',
    // Add more suggestions
  ],
  // Add more topics
};
```

## Troubleshooting

### Chatbot Not Responding
1. Check that `REACT_APP_GOOGLE_LLM_ENDPOINT` is set correctly
2. Verify your API key is valid
3. Check browser console for CORS errors
4. Ensure your LLM endpoint is accessible

### Lead Capture Not Working
1. Verify the `referrals` collection exists in your Wix database
2. Check that `BaseCrudService` is properly configured
3. Look for errors in the browser console

### Styling Issues
- The chatbot uses Tailwind CSS classes
- Ensure your Tailwind config includes the chatbot component
- Check that color tokens (primary, accent, etc.) are defined

## Advanced Configuration

### Custom Knowledge Base
To add domain-specific knowledge:

1. Create a knowledge base file:
```typescript
// /src/lib/bankingKnowledge.ts
export const BANKING_KNOWLEDGE = {
  'home-loans': {
    description: 'Long-term loans for property purchase',
    rates: '4.5% - 6.5%',
    terms: '15-30 years'
  },
  // Add more products
};
```

2. Update the system prompt to reference this knowledge

### Analytics Integration
The chatbot tracks lead captures with Google Analytics:

```typescript
if (window.gtag) {
  window.gtag('event', 'chatbot_lead_capture', {
    email: email,
    has_phone: !!phone
  });
}
```

## Support

For issues or questions:
1. Check the browser console for error messages
2. Review the configuration in `/src/config/chatbot.config.ts`
3. Verify your LLM endpoint is working correctly
4. Check that all environment variables are set

## Next Steps

1. ✅ Set up Google LLM Notebook endpoint
2. ✅ Configure environment variables
3. ✅ Test the chatbot
4. ✅ Customize knowledge base and prompts
5. ✅ Monitor lead captures in your dashboard
6. ✅ Iterate based on user feedback
