import { AbstractBot } from "./abstract-bot";
import { AnswerParams, EduPayload } from "./types";
import { streamToLineIterator } from "./utils";

const REQUEST_URL = "http://localhost:7861/test";
// const REQUEST_URL = "http://localhost:7861/hack"; // 用于输出 hack 结果，只在录制演示视频的时候使用

export class EduBot extends AbstractBot {
  constructor() {
    super();
  }

  protected override async *doAnswer(
    { conversation, signal }: AnswerParams,
  ): AsyncIterable<string> {
    const userMessage = conversation.at(-1);
    if (!userMessage) {
      throw new Error("User message not found");
    }

    let has_user = false;

    let history: string[][] = [];
    let single_history: string[] = ['', ''];
    conversation.slice(0, -1).forEach(({role, content}) => {
      if (!has_user && role === "user") {
        single_history[0] = content;
        has_user = true;
      } else if (has_user && role === "assistant"){
        single_history[1] = content;
        history.push(JSON.parse(JSON.stringify(single_history)));
        has_user = false;
      } else {
        single_history = ['', ''];
        has_user = false;
      }
    })
    
    // console.log(history);

    const payload: EduPayload = {
      knowledge_base_id: "data",
      question: userMessage.content,
      history,
      type: 'edu'
    };

    const response = await fetch(REQUEST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal,
    });

    if (!response.ok) {
      throw new Error(`${response.statusText}: ${await response.text()}`);
    }

    const lines = streamToLineIterator(response.body!);

    for await (const line of lines) {
      yield line + "\n";
    }
  }
}
