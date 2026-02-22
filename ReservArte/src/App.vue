<script setup lang="ts">
import BannerPrincipal from './components/c_bannerPrincipal.vue'
import CTexlabel from './components/c_textlabel.vue'
import NavButtom from './components/c_bottomNavBar.vue'
import C_contentAreaPrimaryButton from './components/Buttons/c_contentAreaPrimaryButton.vue'
import C_contentAreaSecondaryButton from './components/Buttons/c_contentAreaSecondaryButton.vue'

function onPrimaryClick() {
  alert('Acción del botón primario ejecutada.')
}
</script>

<template>
  <div class="app">
    <BannerPrincipal></BannerPrincipal>
    
    <section class="app__demo" aria-labelledby="demo-titulo">
      <h2 id="demo-titulo" class="app__title">
        Demo Text-Label — Variantes
      </h2>

      <div class="app__variants">
        <div class="app__variant">
          <span class="app__variant-name">Título principal</span>
          <CTexlabel
            text="Bienvenido a ReservArte"
            variant="titulo-principal"
          />
        </div>

        <div class="app__variant">
          <span class="app__variant-name">Subtítulo</span>
          <CTexlabel
            text="Reserva tu cita de forma sencilla"
            variant="subtitulo"
          />
        </div>

        <div class="app__variant">
          <span class="app__variant-name">Título de sección</span>
          <CTexlabel
            text="Próximas citas"
            variant="titulo-seccion"
          />
        </div>

        <div class="app__variant">
          <span class="app__variant-name">Subsección</span>
          <CTexlabel
            text="Detalles de la reserva"
            variant="subseccion"
          />
        </div>

        <div class="app__variant">
          <span class="app__variant-name">Párrafo</span>
          <CTexlabel
            text="Selecciona el día y la hora que mejor te convengan para tu cita."
            variant="parrafo"
          />
        </div>

        <div class="app__variant">
          <span class="app__variant-name">Texto pequeño / notas</span>
          <CTexlabel
            text="Los campos marcados con * son obligatorios."
            variant="small"
          />
        </div>

        <div class="app__variant app__variant--full">
          <span class="app__variant-name">Estado vacío</span>
          <CTexlabel
            text="No hay citas asignadas"
            variant="empty-state"
          />
        </div>
      </div>
    </section>

    <section class="app__demo" aria-labelledby="demo-boton-titulo">
      <h2 id="demo-boton-titulo" class="app__title">
        Demo Botón primario (Content Area)
      </h2>
      <p class="app__demo-desc">
        Un solo botón con tres estados: <strong>Enabled</strong> (por defecto), <strong>Hold</strong> (al pasar el ratón o mantener pulsado) y <strong>Disabled</strong> (cuando se pasa <code>disabled</code>).
      </p>
      <div class="app__button-demo">
        <div class="app__button-item">
          <C_contentAreaPrimaryButton
            text="Reservar Cita"
            @click="onPrimaryClick"
          />
          <span class="app__button-label">Habilitado (pasa el ratón para ver Hold)</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaPrimaryButton
            text="Reservar Cita"
            :disabled="true"
          />
          <span class="app__button-label">Disabled</span>
        </div>
      </div>

      <h3 class="app__subtitle">Tamaños (size)</h3>
      <div class="app__button-demo app__button-demo--sizes">
        <div class="app__button-item">
          <C_contentAreaPrimaryButton text="Reservar Cita" size="XS" @click="onPrimaryClick" />
          <span class="app__button-label">XS</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaPrimaryButton text="Reservar Cita" size="SM" @click="onPrimaryClick" />
          <span class="app__button-label">SM</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaPrimaryButton text="Reservar Cita" size="MD" @click="onPrimaryClick" />
          <span class="app__button-label">MD</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaPrimaryButton text="Reservar Cita" size="LG" @click="onPrimaryClick" />
          <span class="app__button-label">LG</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaPrimaryButton text="Reservar Cita" size="XL" @click="onPrimaryClick" />
          <span class="app__button-label">XL</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaPrimaryButton text="Reservar Cita" size="XXL" @click="onPrimaryClick" />
          <span class="app__button-label">XXL</span>
        </div>
      </div>

      <h3 class="app__subtitle">Tamaños (size) — Disabled</h3>
      <div class="app__button-demo app__button-demo--sizes">
        <div class="app__button-item">
          <C_contentAreaPrimaryButton text="Reservar Cita" size="XS" :disabled="true" />
          <span class="app__button-label">XS</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaPrimaryButton text="Reservar Cita" size="SM" :disabled="true" />
          <span class="app__button-label">SM</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaPrimaryButton text="Reservar Cita" size="MD" :disabled="true" />
          <span class="app__button-label">MD</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaPrimaryButton text="Reservar Cita" size="LG" :disabled="true" />
          <span class="app__button-label">LG</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaPrimaryButton text="Reservar Cita" size="XL" :disabled="true" />
          <span class="app__button-label">XL</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaPrimaryButton text="Reservar Cita" size="XXL" :disabled="true" />
          <span class="app__button-label">XXL</span>
        </div>
      </div>
    </section>

    <section class="app__demo" aria-labelledby="demo-boton-secundario-titulo">
      <h2 id="demo-boton-secundario-titulo" class="app__title">
        Demo Botón secundario (Content Area)
      </h2>
      <p class="app__demo-desc">
        Misma estructura que el primario, con estilo outline: borde y texto en color, fondo transparente; al hover, fondo y texto blanco.
      </p>
      <div class="app__button-demo">
        <div class="app__button-item">
          <C_contentAreaSecondaryButton
            text="Reservar Cita"
            @click="onPrimaryClick"
          />
          <span class="app__button-label">Habilitado (pasa el ratón para ver Hold)</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaSecondaryButton
            text="Reservar Cita"
            :disabled="true"
          />
          <span class="app__button-label">Disabled</span>
        </div>
      </div>

      <h3 class="app__subtitle">Tamaños (size)</h3>
      <div class="app__button-demo app__button-demo--sizes">
        <div class="app__button-item">
          <C_contentAreaSecondaryButton text="Reservar Cita" size="XS" @click="onPrimaryClick" />
          <span class="app__button-label">XS</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaSecondaryButton text="Reservar Cita" size="SM" @click="onPrimaryClick" />
          <span class="app__button-label">SM</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaSecondaryButton text="Reservar Cita" size="MD" @click="onPrimaryClick" />
          <span class="app__button-label">MD</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaSecondaryButton text="Reservar Cita" size="LG" @click="onPrimaryClick" />
          <span class="app__button-label">LG</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaSecondaryButton text="Reservar Cita" size="XL" @click="onPrimaryClick" />
          <span class="app__button-label">XL</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaSecondaryButton text="Reservar Cita" size="XXL" @click="onPrimaryClick" />
          <span class="app__button-label">XXL</span>
        </div>
      </div>

      <h3 class="app__subtitle">Tamaños (size) — Disabled</h3>
      <div class="app__button-demo app__button-demo--sizes">
        <div class="app__button-item">
          <C_contentAreaSecondaryButton text="Reservar Cita" size="XS" :disabled="true" />
          <span class="app__button-label">XS</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaSecondaryButton text="Reservar Cita" size="SM" :disabled="true" />
          <span class="app__button-label">SM</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaSecondaryButton text="Reservar Cita" size="MD" :disabled="true" />
          <span class="app__button-label">MD</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaSecondaryButton text="Reservar Cita" size="LG" :disabled="true" />
          <span class="app__button-label">LG</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaSecondaryButton text="Reservar Cita" size="XL" :disabled="true" />
          <span class="app__button-label">XL</span>
        </div>
        <div class="app__button-item">
          <C_contentAreaSecondaryButton text="Reservar Cita" size="XXL" :disabled="true" />
          <span class="app__button-label">XXL</span>
        </div>
      </div>
    </section>
  </div>

  <NavButtom>
  </NavButtom>
</template>

<style scoped>
.app {
  /*padding: 2rem;*/
  /*max-width: 640px;*/
  margin: 0 auto;
}

.app__title {
  font-size: 1rem;
  font-weight: 600;
  color: #666;
  margin: 0 0 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.app__demo {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.app__demo-desc {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: #444;
  line-height: 1.5;
}

.app__demo-desc code {
  padding: 0.15em 0.4em;
  background: #eee;
  border-radius: 4px;
  font-size: 0.9em;
}

.app__button-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
}

.app__button-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.app__button-label {
  font-size: 0.75rem;
  color: #888;
  font-family: system-ui, sans-serif;
}

.app__subtitle {
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
  margin: 0 0 1rem;
}

.app__button-demo--sizes {
  align-items: flex-end;
}

.app__variants {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.app__variant {
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 6px;
}

.app__variant-name {
  display: block;
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 0.5rem;
  font-family: system-ui, sans-serif;
}

.app__variant--full :deep(.c_texlabel) {
  margin: 0 auto;
}
</style>
