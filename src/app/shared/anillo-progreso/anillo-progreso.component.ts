import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-anillo-progreso',
  template: `
    <div class="anillo-item">
      <div class="circulo" [style.--pct]="pct()" [style.--color]="color()">
        <span>{{ pct() }}%</span>
      </div>
      <div class="texto">
        <strong>{{ valor() }}</strong>
        <small>{{ etiqueta() }}</small>
      </div>
    </div>
  `,
  styles: [`
    .anillo-item { display: flex; align-items: center; gap: 8px; }
    .circulo {
      --pct: 0;
      --color: var(--sc-orange);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: conic-gradient(var(--color) calc(var(--pct) * 1%), var(--sc-surface-2) 0);
      display: grid;
      place-items: center;
      position: relative;
      flex-shrink: 0;
    }
    .circulo::before {
      content: '';
      position: absolute;
      inset: 4px;
      border-radius: 50%;
      background: var(--sc-bg);
    }
    .circulo span { position: relative; font-size: 11px; font-weight: 700; color: var(--color); }
    .texto strong { display: block; font-size: 13px; color: var(--sc-text); line-height: 1.2; }
    .texto small { display: block; font-size: 11px; color: var(--sc-text-muted); }
  `],
})
export class AnilloProgresoComponent {
  porcentaje = input.required<number>();
  valor = input.required<string>();
  etiqueta = input.required<string>();
  color = input<string>('var(--sc-orange)');

  pct = computed(() => Math.min(100, Math.max(0, Math.round(this.porcentaje()))));
}
