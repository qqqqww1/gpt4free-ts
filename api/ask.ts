import { VercelRequest, VercelResponse } from '@vercel/node';
import { ChatModelFactory, Model } from '../model';

const chatModel = new ChatModelFactory({
  proxy: process.env.https_proxy || process.env.http_proxy,
});

interface AskReq {
  prompt: string;
  model: Model;
}

export default async (request: VercelRequest, response: VercelResponse) => {
  const {
    prompt,
    model = Model.Forefront,
    ...options
  } = request.query as unknown as AskReq;
  if (!prompt) {
    response.statusCode = 400;
    response.json({ error: 'please input prompt' });
    return;
  }
  const chat = chatModel.get(model);
  if (!chat) {
    response.statusCode = 400;
    response.json({ error: 'Unsupported model' });
    return;
  }
  const res = await chat.ask({ prompt: prompt as string, options });
  response.statusCode = 200;
  response.json({ text: res?.text });
};
