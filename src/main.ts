import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';
import { ApplicationRef, enableProdMode } from '@angular/core';
import { environment } from './environments/environment.dev-eu';
import { AppModule } from './app/app.module';

let PROVIDERS: any[] = [];
/**
 * Angular debug tools in the dev console
 * https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
 */
let _decorateModuleRef = <T>(value: T): T => {
  return value;
};
if (environment.production) {
  enableProdMode();
  _decorateModuleRef = (modRef: any) => {
    disableDebugTools();
    return modRef;
  };
  PROVIDERS = [...PROVIDERS];
} else {
  _decorateModuleRef = (modRef: any) => {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];
    enableDebugTools(cmpRef);
    return modRef;
  };
  PROVIDERS = [...PROVIDERS];
}

export const decorateModuleRef = _decorateModuleRef;
export const ENV_PROVIDERS = [...PROVIDERS];

platformBrowserDynamic().bootstrapModule(AppModule);
