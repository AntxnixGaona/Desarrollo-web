// Pruebas QA para la página "Hola Mundo".
// Sin dependencias externas: usa el runner integrado de Node (node:test)
// y un DOM mínimo propio para ejecutar script.js de forma real.
//
// Ejecutar con:  node --test tests/
//
// Nota: la comprobación de estilos (media queries, :focus), atributos ARIA
// y ausencia de recursos remotos es estática (lectura de archivos).
// La lógica del botón SÍ se ejecuta en un DOM simulado.

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const RAIZ = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(RAIZ, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(RAIZ, 'script.js'), 'utf8');

// --- DOM mínimo propio ---
function crearDocumentoSimulado() {
  const crearEl = (id) => ({
    id,
    textContent: '',
    listeners: {},
    addEventListener(tipo, fn) {
      this.listeners[tipo] = fn;
    },
    click() {
      if (typeof this.listeners.click === 'function') {
        this.listeners.click.call(this);
      }
    },
  });

  const documento = {
    _els: {
      'boton-saludar': crearEl('boton-saludar'),
      mensaje: crearEl('mensaje'),
    },
    getElementById(id) {
      return this._els[id] || null;
    },
    addEventListener(tipo, fn) {
      if (tipo === 'DOMContentLoaded') fn();
    },
  };

  documento._els.mensaje.textContent = 'Aún no me has saludado.';
  return documento;
}

// Ejecuta el script real en el contexto simulado y devuelve los elementos.
function ejecutarScript() {
  const documento = crearDocumentoSimulado();
  vm.runInNewContext(js, { document: documento, console });
  return documento._els;
}

// ---------- Requisito 1: título ----------
test('el documento contiene el título "Hola Mundo"', () => {
  assert.match(html, /<title>\s*Hola Mundo\s*<\/title>/i);
  assert.match(html, /<h1[^>]*>\s*Hola Mundo\s*<\/h1>/i);
});

// ---------- Requisito 2: bienvenida ----------
test('existe un párrafo de bienvenida con texto', () => {
  const m = html.match(/class="bienvenida"[^>]*>\s*([^<]+)/i);
  assert.ok(m, 'no se encontró el párrafo .bienvenida');
  assert.ok(m[1].trim().length > 0, 'la bienvenida está vacía');
});

// ---------- Requisito 3: botón que cambia el mensaje ----------
test('el mensaje inicial es "Aún no me has saludado."', () => {
  const els = ejecutarScript();
  assert.strictEqual(els.mensaje.textContent, 'Aún no me has saludado.');
});

test('al pulsar el botón el mensaje cambia (lógica ejecutada)', () => {
  const els = ejecutarScript();
  const antes = els.mensaje.textContent;
  els['boton-saludar'].click();
  assert.notStrictEqual(els.mensaje.textContent, antes);
  assert.ok(els.mensaje.textContent.length > 0);
});

test('pulsaciones sucesivas ciclan varios mensajes', () => {
  const els = ejecutarScript();
  const vistos = new Set();
  for (let i = 0; i < 4; i++) {
    els['boton-saludar'].click();
    vistos.add(els.mensaje.textContent);
  }
  assert.ok(vistos.size >= 2, 'los mensajes no cambian entre pulsaciones');
});

test('el botón es type="button" y tiene el texto "Saludar"', () => {
  assert.match(html, /<button[^>]*type="button"[^>]*>\s*Saludar\s*<\/button>/i);
});

// ---------- Requisito 4 (estático): responsive ----------
test('incluye meta viewport responsive', () => {
  assert.match(html, /name="viewport"/i);
  assert.match(html, /width=device-width/i);
});

test('declara una media query para móvil', () => {
  assert.match(css, /@media[^{]*\(max-width:[^)]*\)/i);
});

// ---------- Requisito 5 (estático): accesibilidad ----------
test('el mensaje usa role="status" y aria-live="polite"', () => {
  const p = html.match(/<p[^>]*id="mensaje"[^>]*>/i);
  assert.ok(p, 'no se encontró el elemento #mensaje');
  assert.match(p[0], /role="status"/i);
  assert.match(p[0], /aria-live="polite"/i);
});

test('el botón tiene estilos de foco visibles (:focus / :focus-visible)', () => {
  assert.match(css, /:focus(-visible)?\b/i);
});

// ---------- Requisito 6: sin dependencias externas ----------
test('el script no usa alert(), confirm() ni prompt()', () => {
  assert.doesNotMatch(js, /\balert\s*\(/);
  assert.doesNotMatch(js, /\bconfirm\s*\(/);
  assert.doesNotMatch(js, /\bprompt\s*\(/);
});

test('no se cargan recursos remotos (http/https o //)', () => {
  assert.doesNotMatch(html, /(src|href)\s*=\s*["']https?:\/\//i);
  assert.doesNotMatch(html, /(src|href)\s*=\s*["']\/\//i);
});

// ---------- Regresión de estilos añadidos ----------
test('body usa 100svh con fallback 100vh', () => {
  assert.match(css, /min-height:\s*100vh/i);
  assert.match(css, /min-height:\s*100svh/i);
});

test('respeta prefers-reduced-motion desactivando transiciones', () => {
  const bloque = css.match(
    /@media[^{]*prefers-reduced-motion:\s*reduce[^{]*\{([\s\S]*?)\}\s*\}/i
  );
  assert.ok(bloque, 'no se encontró el bloque prefers-reduced-motion');
  assert.match(bloque[1], /transition:\s*none/i);
});