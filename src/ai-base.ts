import { OpenAI } from 'openai'
import { HttpsProxyAgent } from 'https-proxy-agent'

export function getOpenAI() {
  const { httpsProxy, openaiBaseURL, akiKey } = process.env

  return new OpenAI({
    baseURL: openaiBaseURL || null,
    apiKey: akiKey,
    httpAgent: httpsProxy ? new HttpsProxyAgent(httpsProxy) : undefined,
  })
}
