
import OpenAI from 'openai';
import { OPENAI_API_KEY } from './constants';

const openAIClient = new OpenAI({
  apiKey: OPENAI_API_KEY, // This is the default and can be omitted
  dangerouslyAllowBrowser: true,
  baseURL: "https://api.groq.com/openai/v1",
});

export default openAIClient