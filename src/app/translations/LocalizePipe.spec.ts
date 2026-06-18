import { LocalizePipe } from './LocalizePipe';
import { TranslationService } from './TranslationService';

function pipeWithLang(lang: string): LocalizePipe {
  return new LocalizePipe({ lang } as TranslationService);
}

describe('LocalizePipe', () => {
  it('returns the value for the active language', () => {
    expect(pipeWithLang('en').transform({ en: 'Hello', '*': 'Hi' })).toBe('Hello');
  });

  it('falls back to the default (*) entry when the language is missing', () => {
    expect(pipeWithLang('en').transform({ '*': 'Hi' })).toBe('Hi');
  });

  it('falls back to another language prefixed with its code', () => {
    expect(pipeWithLang('en').transform({ ru: 'Привет' })).toBe('[ru] Привет');
  });

  it('returns the default value for empty input', () => {
    expect(pipeWithLang('en').transform(null)).toBe('');
    expect(pipeWithLang('en').transform(undefined, 'fallback')).toBe('fallback');
  });
});
