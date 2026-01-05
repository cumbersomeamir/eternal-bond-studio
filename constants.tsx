
import { StylePreset } from './types';

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'elegant-gold',
    name: 'Eternal Elegance',
    description: 'Timeless luxury with gold foil accents on cream textured paper.',
    promptSuffix: 'Elegant luxury wedding invitation style, gold foil floral borders, ivory textured paper background, classic serif typography, cream and gold color palette, extremely high detail, soft studio lighting.',
    previewUrl: 'https://picsum.photos/seed/elegant/600/800'
  },
  {
    id: 'bohemian-wildflower',
    name: 'Wildflower Whisper',
    description: 'Soft watercolor illustrations with an organic, earthy feel.',
    promptSuffix: 'Bohemian wedding invitation style, delicate watercolor wildflowers and eucalyptus, handwritten calligraphy script, organic paper texture, dusty rose and sage green palette, dreamy and romantic atmosphere.',
    previewUrl: 'https://picsum.photos/seed/boho/600/800'
  },
  {
    id: 'modern-minimal',
    name: 'Modern Grace',
    description: 'Clean lines, bold typography, and sophisticated simplicity.',
    promptSuffix: 'Modern minimalist wedding invitation style, clean architectural lines, bold sans-serif typography, monochrome palette with subtle sage accents, premium heavy matte paper, contemporary and chic.',
    previewUrl: 'https://picsum.photos/seed/minimal/600/800'
  },
  {
    id: 'vintage-noir',
    name: 'Vintage Glamour',
    description: 'Art Deco inspired patterns with a dramatic, high-end look.',
    promptSuffix: 'Art Deco wedding invitation style, Great Gatsby aesthetic, black and metallic gold geometric patterns, symmetrical ornate borders, vintage luxury 1920s feel, dramatic high contrast.',
    previewUrl: 'https://picsum.photos/seed/vintage/600/800'
  }
];

export const DEFAULT_WEDDING_DETAILS = {
  partner1: 'Alexander',
  partner2: 'Isabella',
  date: 'June 24, 2025',
  time: '4:00 PM',
  venue: 'The Grand Conservatory',
  city: 'Charleston, SC',
  rsvpDeadline: 'May 10, 2025',
  additionalNotes: 'Formal Attire Suggested'
};
