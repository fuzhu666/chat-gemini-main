import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

import { ChatErrorType } from '@/types/fetch';
import { OpenAIChatStreamPayload } from '@/types/openai/chat';

import { createErrorResponse } from '../errorResponse';
import { GenerativeModel } from '@google/generative-ai';

interface CreateChatCompletionOptions {
  openai: OpenAI | GenerativeModel;
  payload: OpenAIChatStreamPayload;
}

export const createChatCompletion = async ({ payload, openai }: CreateChatCompletionOptions) => {
  // ============  1. preprocess messages   ============ //
  const { messages, ...params } = payload;

  // ============  2. send api   ============ //

  try {
    if (openai instanceof OpenAI) {
      const response = await openai.chat.completions.create(
        {
          messages,
          ...params,
          stream: true,
        } as unknown as OpenAI.ChatCompletionCreateParamsStreaming,
        { headers: { Accept: '*/*' } },
      );
      const stream = OpenAIStream(response);
      return new StreamingTextResponse(stream);
    } else {
      const mMessage = messages.map(item => {
        return {
          parts: item.content,
          role: item.role
        }
      })
      const response = await openai.generateContentStream({
        contents: messages.map(item => {
          return {
            parts: [
              {
                text: item.content.toString()
              }
            ],
            role: item.role
          }
        }) as any
      });
      
      // const stream = OpenAIStream(response);
      return new StreamingTextResponse(response.stream);
    }
    
  } catch (error) {
    // Check if the error is an OpenAI APIError
    if (error instanceof OpenAI.APIError) {
      let errorResult: any;

      // if error is definitely OpenAI APIError, there will be an error object
      if (error.error) {
        errorResult = error.error;
      }
      // Or if there is a cause, we use error cause
      // This often happened when there is a bug of the `openai` package.
      else if (error.cause) {
        errorResult = error.cause;
      }
      // if there is no other request error, the error object is a Response like object
      else {
        errorResult = { headers: error.headers, stack: error.stack, status: error.status };
      }

      // track the error at server side
      console.error(errorResult);

      return createErrorResponse(ChatErrorType.OpenAIBizError, {
        endpoint: openai.baseURL,
        error: errorResult,
      });
    }

    // track the non-openai error
    console.error(error);

    // return as a GatewayTimeout error
    return createErrorResponse(ChatErrorType.InternalServerError, {
      endpoint: openai.baseURL,
      error: JSON.stringify(error),
    });
  }
};
