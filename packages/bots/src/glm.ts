import { AbstractBot } from "./abstract-bot";
import { AnswerParams, EduPayload } from "./types";
import { streamToLineIterator } from "./utils";

const BASE_EDU_END_POINT = process.env.EDU_ENDPOINT ?? "localhost:7861";
const USE_HACK = process.env.USE_HACK ?? "false";

const REQUEST_URL = JSON.parse(USE_HACK) ? `http://${BASE_EDU_END_POINT}/hack`: `http://${BASE_EDU_END_POINT}/test`;

export class GlmBot extends AbstractBot {
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
      type: 'glm'
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
      yield line;
    }
  }
}
