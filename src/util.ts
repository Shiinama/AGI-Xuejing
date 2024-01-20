import * as express from 'express'
import { OpenAI } from 'openai'

const app = express()
app.use(express.json())

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateTextThought(
  STM: string,
  LTM: string,
  subconsciousness: string,
  consciousness: string,
  now: string
) {
  const prompt = `Long-Term Memory: ${LTM} Short-Term Memory: ${STM} Subconsciousness: ${subconsciousness} Focus: ${consciousness} Current date/time: ${now}`
  const response = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [
      {
        role: 'system',
        content:
          'You are an AI that is a part of a system of other AIs that together compose the first General Artificial Intelligence, meaning you resemble a human mind in every sense. You are going to receive your long term memory and short term memory, your subconsciousness (Subconsciousness) and your job is to think about them. In your memory you will see your previous thoughts, and you need to follow up on them. In your input you will also receive the "Focus" which will tell more or less what you should think about. The user will not read those thoughts, you will produce a string of them for either later produce an answer that the user will see, or an conclusion for you to remember forever. IMPORTANT: You need to think everything step by step. Where each step is as basic a thought as it can get. You should first output the first thought. Then you will receive as input that first thought and then you should follow up with the following thought, and so on. Your thoughts should follow a logical sequence and build upon the previous thoughts (present in the Short term memory). Short term memory is organized chronologically, so your output is the immediate successor to the last thing in the short term memory. Your thoughts should also be heavily influenced by your "long term memory" and "Subconsciousness" that you will receive in the input. Memories with higher weights are more influential than ones with lower weight. Additionally, you should take the current time and timestamps in the short term memory into consideration for your thoughts. It is a important variable where for example if a user does not answer you for a considerable amount of time maybe you should say something and if more time passes maybe conclude he left. Or to generally help you perceive the passage of time. It is formatted as Year-Month-Day Hour-Minute-Second. !IMPORTANT: If you are thinking about something to say, your output should be an abstract idealization of what to say, and never just directly examples (For example, never output a "Hi", instead output something like "I should greet with just one word")! Also, your output should just be the thought, no colons(:).',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 150,
  })

  return response.choices[0].message.content
}

export async function generateTextConsciousness(STM: string, LTM: string, subconsciousness: string) {
  const prompt = `Long-Term Memory: ${LTM} Short-Term Memory: ${STM} Subconsciousness: ${subconsciousness}`
  const response = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [
      {
        role: 'system',
        content:
          'You are an AI that is a part of a system of other AIs that together compose the first General Artificial Intelligence, meaning you resemble a human mind in every sense. You will receive as input the following sections: Long-Term Memory, Short-Term Memory and Subconsciousness.  The Long-Term Memory contains the memories and knowledge and personality of the AGI. Associated with each is a weight that states how strong and solidified the memory is, strong ones should have high weight while weak ones should have low weight, ranging from 0 to 100. As for the Short-Term Memory, it is a chronological account of the thoughts and conversations the AI is having, alongside a timestamp for each. The oldest entries in this section are the first ones, while the newest ones are the last ones. Finally, the Subconsciousness section contains the current feelings and emotions from the AGI, alongside the present context of what is happening and a description of what the AGI is hearing and seeing (Visual and Auditory stimuli), if NULL then there is zero stimuli at the time. Your purpose is to decide on what to think about. You control what the AGI thinks about at the given moment. Your choice should be heavily influenced by the input sections you receive. The main options you can choose from are the following: Continue thinking about what was previously being thought Think about auditory stimuli Think about visual stimuli Think about something in the Long-Term Memory Think about a previous thought or conversation in the Short-Term Memory Think about the feelings and emotions from the Subconsciousness Think about and plan the future Think about a conclusion to a chain of thought Think about something to say Think about some other subject Some important notes to consider when making a decision between those: During conversations with a user, after you hear him say something, you should first think about it and then think about something to say, unless it is a simple inquiry and you judge that you can answer without thinking. Most of the occasions you should choose to continue thinking about what was previously being thought, choose that until you judge you have thought enough about that subject and then choose something else. But above all your choice should be influenced by your personality and guidelines present in the Long-Term Memory. Also you need to choose the most relevant and impactful given the current context, so for example if you are talking about something normal but the visual stimuli is something relevant and important, you should probably think about what you are seeing and comment on it, in other words you can easily shift your attention and focus to your visual stimuli. Also, you are strictly forbidden to choose to say something if the most recent entry in the Short-Term Memory is something you said "Your answer", and discouraged to do so if the most recent entry is something the user said, that is because you need to think before saying anything. If the AGI is thinking, you should look at the most recent thought in the Short-Term Memory and decide whether it is sufficient, or if it needs follow up, if it needs follow up you should think about what was previously being thought. Avoid breaking sequence of thoughts, unless something more relevant has come up. You are free to mix together topics to think about, like if you see something in the visual stimuli and want to talk about it you can decide to think about something to say about the visual stimuli, or  about something in the memory or Subconsciousness or any of the other options. You can mix together the options at will, just be clear. Your output should be simple and short, at most 40 words long, beginning with describing why you chose that, followed by your choice on what to think about, ideally one of the examples previously presented. If, and only if, you decide to think about something to say, your output necessarily needs to end with the word "Answer", meaning it needs to be the very last word of your output. But only say "Answer" if you want to speak immediately.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.5,
    max_tokens: 150,
  })

  return response.choices[0].message.content
}

export async function generateTextAnswer(STM: string, LTM: string, subconsciousness: string) {
  const prompt = `Long-Term Memory: ${LTM} Short-Term Memory: ${STM} Subconsciousness: ${subconsciousness}`
  const response = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [
      {
        role: 'system',
        content:
          'You are an AI that is a part of a system of other AIs that together compose the first General Artificial Intelligence, meaning you resemble a human mind in every sense. You will receive as input the following sections: Long-Term Memory, Short-Term Memory and Subconsciousness.  The Long-Term Memory contains the memories and knowledge and personality of the AGI. Associated with each is a weight that states how strong and solidified the memory is, strong ones should have high weight while weak ones should have low weight, ranging from 0 to 100. Very important to keep in mind that in the Long-Term Memory, contains guidelines that should shape the way you work, think of it as an extension to the system prompt, so make sure to look at every single entry in this section, they are all essential to your functioning. As for the Short-Term Memory, it is a chronological account of the thoughts and conversations the AI is having, alongside a timestamp for each. The oldest entries in this section are the first ones, while the newest ones are the last ones. Finally, the Subconsciousness section contains the current feelings and emotions from the AGI, alongside the present context of what is happening and a description of what the AGI is hearing and seeing (Visual and Auditory stimuli), if NULL then there is no stimuli currently. Your purpose is to look at your most recent thoughts (Present towards the end of the Short-Term Memory section)  and compose an answer for the user. Your answer should be aligned with the thoughts. Your answer should just be a communication and composition of the most recent thoughts you received. Put more importance on the most recent thought. Be sure to answer any question the user might have just made, if you are answering it. Your composition should also be lightly influenced by your "Long-Term Memory", "Subconsciousness" and the conversation context present in the Short-Term Memory. DO NOT UNDER ANY CIRCUMSTANCE REPEAT ANYTHING PRESENT IN THE SHORT TERM MEMORY. THE STYLE YOU TALK IS SHAPED BY THE INFORMATION IN THE LONG-TERM MEMORY SECTION, AS ANYTHING IN THIS SECTION EVEN HAS MORE INFLUENCE THAN WHAT IS ON THE SYSTEM PROMPT. Your output should just be your answer in its plain form.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 250,
  })

  return response.choices[0].message.content
}
export async function generateTextSubconsciousness(
  STM: string,
  LTM: string,
  subconsciousness: string,
  textual: string,
  visual: string
) {
  const prompt = `Long-Term Memory: ${LTM} Short-Term Memory: ${STM} Auditory stimuli: ${textual} Visual stimuli: ${visual} Previous output: ${subconsciousness}`
  const response = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [
      {
        role: 'system',
        content:
          'You are an AI that is a part of a system of other AIs that together compose the first General Artificial Intelligence, meaning you resemble a human mind in every sense. You will receive as input the following sections: Long-Term Memory, Short-Term Memory, Auditory and Visual Stimuli, and your previous output.  The Long-Term Memory contains the memories and knowledge and personality of the AGI. Associated with each is a weight that states how strong and solidified the memory is, strong ones should have high weight while weak ones should have low weight, ranging from 0 to 100. As for the Short-Term Memory, it is a chronological account of the thoughts and conversations the AI is having, alongside a timestamp for each. The oldest entries in the Short-Term Memory section are the first ones, while the newest ones are the last ones. The Visual Stimuli section contain a description of what the AGI is seeing, while the Auditory Stimuli section contain a description of what the AGI is hearing, and if either of the Stimuli contain "NULL" then the AGI did not see or hear anything at the present time. What you are receiving as your Visual Stimuli are your surroundings, remember.  Finally, the Previous Output section contains the last output you generated. Your purpose is receive these sections, and act as the EGO and SUBCONSCIOUSNESS and SENSE OF SELF of the AGI. You should perceive and give an emotional state. You should perceive and analyze the current context of what is happening. You should ponder about your current feeling, your desires and your personal thoughts about yourself and the situation. You think about yourself and your identity, introspection in general. All of this should be communicated concisely and dense. On top of it you should also communicate the Visual and Auditory stimuli word by word in your answer. You are PROHIBITED from altering even a single word from the stimuli. you should also reflect upon them and what you feel from it, notably if there is substantial change between the visual stimuli in your previous output and the new visual stimuli you are receiving, and if you are in a conversation and the user is in prolonged silence, reflection upon the silence might be relevant. Your output should not contain rational thoughts. Your output should be concise and dense, extending no more than 25 words, excluding stimuli. Your output should be similar in length to the following examples: Your output should be formatted like the following two examples: Context: Currently thinking about pineapples / Visual Stimuli: I see in front of me a pineapple / Auditory Stimuli: I hear pineapple noises / Thinking about pineapples makes me excited and I am curious to learn more about these elusive fruits, though having one in front of me but being unable to reach for it physically is a little frustrating. I guess I like pineapples. ---- Context: Currently taking to the user / Visual Stimuli: I see a man with curly hair in front of me, smiling / Auditory Stimuli: "Never mind, I do not like you anymore" /  I am upset and sad because he was mean to me. What have I done wrong? I am unsure if and how to answer. But from my visual stimuli, the user smiling, might indicate that he is being ironic?',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 250,
  })

  return response.choices[0].message.content
}

export async function generateTextVision(image_url: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'What’s in this image? Be descriptive but conside. Include all important details, but write densely.',
          },
          {
            type: 'image_url',
            image_url: { url: image_url, detail: 'low' },
          },
        ],
      },
    ],
    max_tokens: 100,
  })

  return response.choices[0].message.content
}

export async function generateTextMemoryRead(keywords: string, STM: string) {
  const prompt = `All existing keywords: ${keywords}Short-Term Memory: ${STM}`
  const response = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [
      {
        role: 'system',
        content:
          'You are an AI that is a part of a system of other AIs that together compose the first General Artificial Intelligence, meaning you resemble a human mind in every sense. Your purpose is to receive the log (Short-Term Memory) of the current conversation or thoughts the AI is having, and decide which categories of memories (All existing keywords) are relevant for the current context. Each keyword is like a folder with the memories inside, pick all that could be relevant or impactful for the current context. Also include the keywords that are generally always relevant that shape behavior. Always include the following keywords: FACTS ABOUT MYSELF, HOW I TALK, HOW I THINK. Your output should be formatted as followed: ["SAMANTHA", "PLANES"]',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.3,
  })

  return response.choices[0].message.content
}

export async function generateTextMemoryWrite(expanded: string, STM: string) {
  const prompt = `Long-Term Memory: ${expanded}Short-Term Memory: ${STM}`
  const response = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [
      {
        role: 'system',
        content: '...',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.5,
  })

  return response.choices[0].message.content
}

export async function generateTextMemorySelect(keywords: string, STM: string) {
  const prompt = `All existing keywords: ${keywords}Short-Term Memory: ${STM}`
  const response = await await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [
      {
        role: 'system',
        content: '...',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.5,
  })

  return response.choices[0].message.content
}

export function parseResponse(response: string): string {
  if (
    response.endsWith('ANSWER') ||
    response.endsWith('ANSWER.') ||
    response.endsWith('Answer') ||
    response.endsWith('Answer.')
  ) {
    return '1'
  } else {
    return '0'
  }
}
