import { LocalizeOrgPipe } from './LocalizeOrgPipe';
import { TranslationService } from './TranslationService';
import { AppContext } from '../context/AppContext';

function pipe(lang: string): LocalizeOrgPipe {
  const appContext = {
    team: {
      persons: {
        aa: { names: { en: 'Anton Arhipov', '*': 'Anton Arhipov' } },
        kl: { names: { ru: 'Кирилл Линник', '*': 'Kirill Linnik' } }
      }
    }
  } as unknown as AppContext;
  return new LocalizeOrgPipe(appContext, { lang } as TranslationService);
}

describe('LocalizeOrgPipe', () => {
  it('resolves a single org code to a localized name', () => {
    expect(pipe('en').transform(['aa'])).toBe('Anton Arhipov');
  });

  it('joins multiple org codes with commas', () => {
    expect(pipe('en').transform(['aa', 'kl'])).toBe('Anton Arhipov, Kirill Linnik');
  });

  it('falls back to the default name when the language is missing', () => {
    expect(pipe('et').transform(['kl'])).toBe('Kirill Linnik');
  });

  it('returns the raw code when the person is unknown', () => {
    expect(pipe('en').transform(['unknown'])).toBe('unknown');
  });

  it('returns an empty string for no codes', () => {
    expect(pipe('en').transform([])).toBe('');
  });
});
