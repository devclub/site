import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { PreloadAllModules, provideRouter, withHashLocation, withPreloading } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { DataHttpService } from './services/DataHttpService';
import { AppContext } from './context/AppContext';
import { ArchiveContext } from './context/ArchiveContext';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation(), withPreloading(PreloadAllModules)),
    provideHttpClient(),
    provideAnimations(),
    provideAppInitializer(() => {
      const dataHttpService = inject(DataHttpService);
      const appContext = inject(AppContext);
      const archiveContext = inject(ArchiveContext);
      return dataHttpService.getInitial().then((result) => {
        appContext.config = result[0];
        appContext.advertising = result[1];
        appContext.team = result[2];
        archiveContext.meetings.push(...result[3]);
      });
    })
  ]
};
