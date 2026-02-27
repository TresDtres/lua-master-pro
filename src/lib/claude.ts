// Claude API Integration for Chat
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || '',
});

interface ChatContext {
  moduleId?: string;
  topic?: string;
  codeContext?: string;
}

export async function generateClaudeResponse(
  userMessage: string,
  context: ChatContext = {},
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<string> {
  try {
    // Build system prompt based on context
    let systemPrompt = `You are a specialized AI tutor for Lua and Unreal Engine 5 programming. 
You help students learn Lua scripting, Roblox development, and UE5 integration.
Keep responses concise, clear, and educational. Provide code examples when relevant.
Always respond in Spanish unless asked otherwise.`;

    if (context.moduleId) {
      systemPrompt += `\nCurrent module: ${context.moduleId}. Keep context relevant to this module.`;
    }

    if (context.codeContext) {
      systemPrompt += `\nCode context: ${context.codeContext}`;
    }

    // Build messages array
    const messages: Array<{ role: "user" | "assistant"; content: string }> = [
      ...conversationHistory.map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      {
        role: "user",
        content: userMessage,
      },
    ];

    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    // Extract text from response
    const textContent = response.content.find(block => block.type === "text");
    if (textContent && textContent.type === "text") {
      return textContent.text;
    }

    return "Lo siento, no pude procesar tu pregunta. Por favor, intenta de nuevo.";
  } catch (error) {
    console.error("Claude API Error:", error);
    throw new Error("Error generating response from Claude API");
  }
}

// Specialized function for code review
export async function reviewCode(
  code: string,
  language: "lua" | "cpp" = "lua"
): Promise<string> {
  try {
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: `You are a Lua and C++ code reviewer for game development students. 
      Analyze the provided code and give constructive feedback on:
      1. Correctness
      2. Performance
      3. Best practices
      4. Potential bugs
      Respond in Spanish and keep it concise.`,
      messages: [
        {
          role: "user",
          content: `Review this ${language} code:\n\n${code}`,
        },
      ],
    });

    const textContent = response.content.find(block => block.type === "text");
    if (textContent && textContent.type === "text") {
      return textContent.text;
    }

    return "No se pudo procesar la revisión del código.";
  } catch (error) {
    console.error("Code Review Error:", error);
    throw new Error("Error reviewing code");
  }
}

export default client;
