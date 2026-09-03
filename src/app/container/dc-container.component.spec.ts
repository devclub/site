import { DcContainerComponent } from './dc-container.component';
import { AppContext } from '../context/AppContext';
import { TranslationService } from '../translations/TranslationService';

describe('DcContainerComponent', () => {
  it('moves keyboard focus to the main content without changing the hash route', () => {
    const main = document.createElement('main');
    main.id = 'main';
    main.tabIndex = -1;
    document.body.appendChild(main);

    const component = new DcContainerComponent(
      { path: () => '/' } as never,
      { navigate: vi.fn(), isActive: vi.fn() } as never,
      {} as never,
      { lang: 'en' } as TranslationService,
      {
        config: {
          devclubText: 'DEVCLUB.EU',
          baseColor: '#000000',
          lightColor: '#ffffff',
          resources: { main: {} }
        },
        team: { team: [] }
      } as unknown as AppContext
    );
    const event = new MouseEvent('click', { cancelable: true });

    component.skipToMain(event);

    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(main);
    main.remove();
  });
});
