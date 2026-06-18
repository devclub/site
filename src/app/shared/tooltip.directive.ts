import {
  Component,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

type Placement = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'dc-tooltip-bubble',
  imports: [CommonModule],
  template: `
    <div class="dc-tooltip" role="tooltip">
      <div class="dc-tooltip-inner">
        @if (template) {
          <ng-container *ngTemplateOutlet="template"></ng-container>
        } @else {
          {{ text }}
        }
      </div>
    </div>
  `,
  styles: [
    `
      .dc-tooltip {
        pointer-events: none;
      }
      .dc-tooltip-inner {
        max-width: 600px;
        padding: 0.25rem 0.5rem;
        color: #fff;
        text-align: left;
        background-color: #000;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        margin: 0.3rem;
      }
    `
  ]
})
export class DcTooltipBubbleComponent {
  @Input() text: string | null = null;
  @Input() template: TemplateRef<unknown> | null = null;
}

@Directive({
  selector: '[tooltip]'
})
export class DcTooltipDirective implements OnDestroy {
  @Input('tooltip') content: string | TemplateRef<unknown> | null | undefined = null;
  @Input() placement: Placement = 'top';
  @Input() isDisabled = false;

  private readonly overlay = inject(Overlay);
  private readonly host = inject(ElementRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;

  @HostListener('mouseenter')
  @HostListener('focusin')
  show(): void {
    if (this.isDisabled || !this.content || this.overlayRef) {
      return;
    }
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.host)
      .withPositions(this.positions());
    this.overlayRef = this.overlay.create({ positionStrategy });
    const ref = this.overlayRef.attach(new ComponentPortal(DcTooltipBubbleComponent, this.viewContainerRef));
    if (this.content instanceof TemplateRef) {
      ref.instance.template = this.content;
    } else {
      ref.instance.text = this.content;
    }
  }

  @HostListener('mouseleave')
  @HostListener('focusout')
  hide(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  ngOnDestroy(): void {
    this.hide();
  }

  private positions(): ConnectedPosition[] {
    switch (this.placement) {
      case 'bottom':
        return [{ originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' }];
      case 'left':
        return [{ originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' }];
      case 'right':
        return [{ originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' }];
      case 'top':
      default:
        return [{ originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' }];
    }
  }
}
