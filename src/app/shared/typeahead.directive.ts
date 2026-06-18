import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewContainerRef,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TypeaheadMatch } from './typeahead-match';

@Component({
  selector: 'dc-typeahead-list',
  imports: [CommonModule],
  template: `
    <div class="dropdown-menu show" style="position: static; display: block; width: 100%;">
      <button
        type="button"
        class="dropdown-item"
        *ngFor="let item of items"
        (mousedown)="$event.preventDefault(); pick.emit(item)"
      >
        <ng-container *ngIf="itemTemplate; else plain">
          <ng-container *ngTemplateOutlet="itemTemplate; context: { item: item }"></ng-container>
        </ng-container>
        <ng-template #plain>{{ display(item) }}</ng-template>
      </button>
    </div>
  `
})
export class DcTypeaheadListComponent {
  @Input() items: Record<string, unknown>[] = [];
  @Input() optionField = '';
  @Input() itemTemplate: TemplateRef<unknown> | null = null;
  @Output() pick = new EventEmitter<Record<string, unknown>>();

  display(item: Record<string, unknown>): string {
    return this.optionField ? String(item[this.optionField] ?? '') : String(item);
  }
}

@Directive({
  selector: '[typeahead]'
})
export class DcTypeaheadDirective implements OnDestroy {
  @Input() typeahead: Record<string, unknown>[] = [];
  @Input() typeaheadOptionField = '';
  @Input() typeaheadOptionsLimit = 20;
  @Input() typeaheadMinLength = 1;
  @Input() typeaheadItemTemplate: TemplateRef<unknown> | null = null;
  @Output() typeaheadOnSelect = new EventEmitter<TypeaheadMatch>();

  private readonly overlay = inject(Overlay);
  private readonly host = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;

  @HostListener('input')
  @HostListener('focus')
  open(): void {
    const value = this.host.nativeElement.value ?? '';
    if (value.length < this.typeaheadMinLength) {
      this.close();
      return;
    }
    const matches = this.filter(value);
    if (matches.length === 0) {
      this.close();
      return;
    }
    this.render(matches);
  }

  @HostListener('blur')
  close(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  ngOnDestroy(): void {
    this.close();
  }

  private filter(value: string): Record<string, unknown>[] {
    const needle = value.toLowerCase();
    return (this.typeahead || [])
      .filter((item) => String(item[this.typeaheadOptionField] ?? '').toLowerCase().includes(needle))
      .slice(0, this.typeaheadOptionsLimit);
  }

  private render(matches: Record<string, unknown>[]): void {
    if (!this.overlayRef) {
      const positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo(this.host)
        .withPositions([{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }]);
      this.overlayRef = this.overlay.create({
        positionStrategy,
        width: this.host.nativeElement.offsetWidth
      });
    } else {
      this.overlayRef.detach();
    }
    const ref = this.overlayRef.attach(new DcTypeaheadListPortal(this.viewContainerRef));
    ref.instance.items = matches;
    ref.instance.optionField = this.typeaheadOptionField;
    ref.instance.itemTemplate = this.typeaheadItemTemplate;
    ref.instance.pick.subscribe((item: Record<string, unknown>) => {
      this.typeaheadOnSelect.emit({ item: item as TypeaheadMatch['item'] });
      this.close();
    });
  }
}

class DcTypeaheadListPortal extends ComponentPortal<DcTypeaheadListComponent> {
  constructor(viewContainerRef: ViewContainerRef) {
    super(DcTypeaheadListComponent, viewContainerRef);
  }
}
