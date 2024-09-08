import React, { Fragment } from "react";
import { Check, Copy } from "lucide-react";
import { Message } from "ai";
import { Button } from "../../button";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";
import {
  ChatHandler,
  DocumentFileData,
  EventData,
  ImageData,
  MessageAnnotation,
  MessageAnnotationType,
  SuggestedQuestionsData,
  ToolData,
  getAnnotationData,
  getSourceAnnotationData,
} from "../index";
import ChatAvatar from "./chat-avatar";
import { ChatEvents } from "./chat-events";
import { ChatFiles } from "./chat-files";
import { ChatImage } from "./chat-image";
import { ChatSources } from "./chat-sources";
import { SuggestedQuestions } from "./chat-suggestedQuestions";
import ChatTools from "./chat-tools";
import Markdown from "./markdown";

type ContentDisplayConfig = {
  order: number;
  component: JSX.Element | null;
};

function ChatMessageContent({
  message,
  isLoading,
  append,
}: {
  message: Message;
  isLoading: boolean;
  append: Pick<ChatHandler, "append">["append"];
}) {
  const annotations = message.annotations as MessageAnnotation[] | undefined;
  if (!annotations?.length) return <Markdown content={message.content} />;

  const imageData = getAnnotationData<ImageData>(
    annotations,
    MessageAnnotationType.IMAGE,
  );
  const contentFileData = getAnnotationData<DocumentFileData>(
    annotations,
    MessageAnnotationType.DOCUMENT_FILE,
  );
  const eventData = getAnnotationData<EventData>(
    annotations,
    MessageAnnotationType.EVENTS,
  );

  const sourceData = getSourceAnnotationData(annotations);

  const toolData = getAnnotationData<ToolData>(
    annotations,
    MessageAnnotationType.TOOLS,
  );
  const suggestedQuestionsData = getAnnotationData<SuggestedQuestionsData>(
    annotations,
    MessageAnnotationType.SUGGESTED_QUESTIONS,
  );

  const contents: ContentDisplayConfig[] = [
    {
      order: 1,
      component: imageData[0] ? <ChatImage data={imageData[0]} /> : null,
    },
    {
      order: -3,
      component:
        eventData.length > 0 ? (
          <ChatEvents isLoading={isLoading} data={eventData} />
        ) : null,
    },
    {
      order: 2,
      component: contentFileData[0] ? (
        <ChatFiles data={contentFileData[0]} />
      ) : null,
    },
    {
      order: -1,
      component: toolData[0] ? <ChatTools data={toolData[0]} /> : null,
    },
    {
      order: 0,
      component: <Markdown content={message.content} sources={sourceData[0]} />,
    },
    {
      order: 3,
      component: sourceData[0] ? <ChatSources data={sourceData[0]} /> : null,
    },
    {
      order: 4,
      component: suggestedQuestionsData[0] ? (
        <SuggestedQuestions
          questions={suggestedQuestionsData[0]}
          append={append}
        />
      ) : null,
    },
  ];

  return (
    <div className="flex-1 gap-4 flex flex-col">
      {contents
        .sort((a, b) => a.order - b.order)
        .map((content, index) => (
          <Fragment key={index}>{content.component}</Fragment>
        ))}
    </div>
  );
}

export default function ChatMessage({
  chatMessage,
  isLoading,
  append,
}: {
  chatMessage: Message;
  isLoading: boolean;
  append: Pick<ChatHandler, "append">["append"];
}) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
  
  return (
    <div className={`flex items-start gap-4 p-4 mb-2 rounded-xl shadow-lg transition-all duration-300 ease-in-out 
                    ${chatMessage.role === 'user' 
                      ? 'bg-gradient-to-tr via-shamrock-100 from-shamrock-50 to-shamrock-100 dark:from-shamrock-700 dark:to-shamrock-800' 
                      : 'bg-gradient-to-br from-white to-shamrock-50 dark:from-shamrock-900 dark:to-shamrock-800'}`}>
      <div className="flex-shrink-0">
        <ChatAvatar role={chatMessage.role} />
      </div>
      <div className="flex-grow">
        <div className="group flex flex-col justify-between ">
          <ChatMessageContent
            message={chatMessage}
            isLoading={isLoading}
            append={append}
          />
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-shamrock-500 dark:text-shamrock-300">
              {new Date().toLocaleTimeString()}
            </span>
            <Button
              onClick={() => copyToClipboard(chatMessage.content)}
              size="sm"
              variant="ghost"
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-shamrock-600 hover:text-shamrock-500 dark:text-shamrock-300 dark:hover:text-shamrock-200 hover:bg-shamrock-100 dark:hover:bg-shamrock-700"
            >
              {isCopied ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {isCopied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}