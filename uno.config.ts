import { defineConfig } from 'unocss';
import {
  presetUno,
  transformerVariantGroup,
  presetAttributify,
  transformerDirectives,
} from 'unocss';
import presetIcons from '@unocss/preset-icons';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block',
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
});
