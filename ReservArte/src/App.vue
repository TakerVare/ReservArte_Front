<script setup lang="ts">
import CTexlabel from './components/c_textlabel.vue'
</script>

<template>
  <div class="app">
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
  </div>
</template>

<style scoped>
.app {
  padding: 2rem;
  max-width: 640px;
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
