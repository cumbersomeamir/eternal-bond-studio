
import { GoogleGenAI } from "@google/genai";
import { WeddingDetails, StylePreset, InvitationPageType } from "../types";

const API_KEY = process.env.API_KEY;

export class GeminiService {
  private ai: any;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY! });
  }

  async generateInvitationPage(
    type: InvitationPageType,
    details: WeddingDetails,
    style: StylePreset,
    highQuality: boolean = false
  ): Promise<string> {
    const modelName = highQuality ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
    
    const pagePromptMap: Record<InvitationPageType, string> = {
      [InvitationPageType.COVER]: `A wedding invitation cover for ${details.partner1} and ${details.partner2}. The layout should feature their names prominently in beautiful script.`,
      [InvitationPageType.DETAILS]: `The main text page of a wedding invitation. It should include the text "Save the Date" or "The Wedding of", the date ${details.date}, the time ${details.time}, and the venue ${details.venue}. Space for text is framed by the style elements.`,
      [InvitationPageType.LOCATION]: `An elegant location/map page for a wedding invitation. It shows a stylized, artistic illustration of ${details.venue} in ${details.city}. No messy text, just aesthetic venue representation.`,
      [InvitationPageType.RSVP]: `A matching RSVP card for the wedding of ${details.partner1} and ${details.partner2}. It includes a designated space for guests to write their names and a deadline of ${details.rsvpDeadline}.`
    };

    const finalPrompt = `${pagePromptMap[type]} ${style.promptSuffix}. Ensure consistent lighting, colors, and paper texture across all design elements. High resolution, professional design.`;

    const config: any = {
      imageConfig: {
        aspectRatio: "3:4"
      }
    };

    if (highQuality) {
      config.imageConfig.imageSize = "1K";
    }

    try {
      const response = await this.ai.models.generateContent({
        model: modelName,
        contents: {
          parts: [{ text: finalPrompt }]
        },
        config
      });

      let base64String = "";
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          base64String = part.inlineData.data;
          break;
        }
      }

      if (!base64String) throw new Error("No image data returned from Gemini");

      return `data:image/png;base64,${base64String}`;
    } catch (error) {
      console.error(`Error generating ${type}:`, error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
