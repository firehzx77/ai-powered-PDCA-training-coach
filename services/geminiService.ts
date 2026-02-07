
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PDCAMode, PDCAStep } from "../types";

export class AICoachService {
  private ai: GoogleGenAI;
  private modelName = 'gemini-3-flash-preview';

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async *getSuggestionStream(mode: PDCAMode, step: keyof PDCAStep, currentData: PDCAStep, prompt: string) {
    const context = `
      User is using the ${mode === 'A' ? 'Goal Setting to Execution' : 'Problem Analysis to Root Cause'} PDCA model.
      Current Step: ${step.toUpperCase()}
      Form Data: ${JSON.stringify(currentData)}
      Instruction: ${prompt}
      Provide constructive, professional business coaching advice. Keep it concise but insightful.
    `;

    try {
      const response = await this.ai.models.generateContentStream({
        model: this.modelName,
        contents: context,
      });

      for await (const chunk of response) {
        const text = chunk.text;
        if (text) {
          yield text;
        }
      }
    } catch (error) {
      console.error("AI Streaming Error:", error);
      yield "抱歉，流式输出出现错误，请检查网络或稍后再试。";
    }
  }

  async auditPDCA(mode: PDCAMode, data: PDCAStep) {
    const prompt = `
      You are a senior Management Consultant. Audit this PDCA cycle:
      Mode: ${mode === 'A' ? 'Goal Setting' : 'Problem Solving'}
      Plan (P): ${JSON.stringify(data.p)}
      Do (D): ${JSON.stringify(data.d)}
      Check (C): ${JSON.stringify(data.c)}
      Act (A): ${JSON.stringify(data.a)}
      
      Evaluation criteria:
      1. Alignment: Is D consistent with P?
      2. Measurement: Are goals (P) measurable (KRs/DoD)?
      3. Logic: Does the Root Cause in P lead to the Solution in D?
      4. Adjustment: Is the Action in A a logical conclusion from the Check in C?
      
      Provide a friendly "Teacher Review" (not scoring, but helpful observations).
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: this.modelName,
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      return "无法生成教师点评，请检查网络。";
    }
  }
}
