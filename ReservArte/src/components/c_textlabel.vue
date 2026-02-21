<template>
  <div
    class="c_texlabel"
    :class="variantClass"
    role="text"
  >
    <p class="c_texlabel__text">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type TextLabelVariant =
  | 'titulo-principal'
  | 'subtitulo'
  | 'titulo-seccion'
  | 'subseccion'
  | 'parrafo'
  | 'small'
  | 'empty-state'

const props = withDefaults(
  defineProps<{
    text: string
    variant?: TextLabelVariant
  }>(),
  {
    variant: 'parrafo',
  }
)

const variantClass = computed(() => `c_texlabel--${props.variant}`)
</script>

<script lang="ts">
export default {
  name: 'CTexlabel',
}
</script>

<style lang="scss" scoped>
.c_texlabel {
  width: fit-content;
  max-width: none;
  box-sizing: border-box;
  overflow: hidden;

  &__text {
    margin: 0;
    text-align: left;
    color: #1e1e1e;
    font-style: normal;
    font-family: 'Georgia', sans-serif;
    line-height: normal;
    letter-spacing: 0;
    text-transform: none;
    text-decoration: none;
  }

  // H1 - Título principal (48px)
  &--titulo-principal .c_texlabel__text {
    font-size: 48px;
    font-weight: 400;
  }

  // H2 - Subtítulo (36px)
  &--subtitulo .c_texlabel__text {
    font-size: 36px;
    font-weight: 400;
  }

  // H3 - Título de sección (24px)
  &--titulo-seccion .c_texlabel__text {
    font-size: 24px;
    font-weight: 400;
  }

  // H4 - Subsección (18px)
  &--subseccion .c_texlabel__text {
    font-size: 18px;
    font-weight: 700;
  }

  // Texto de párrafo regular (16px)
  &--parrafo .c_texlabel__text {
    font-size: 16px;
    font-weight: 400;
  }

  // Texto pequeño y notas (14px)
  &--small .c_texlabel__text {
    font-size: 14px;
    font-weight: 400;
  }

  // Mensaje estado vacío (64px, centrado)
  &--empty-state {
    width: 100%;
    max-width: 485px;
  }

  &--empty-state .c_texlabel__text {
    font-size: 64px;
    font-weight: 400;
    letter-spacing: 1px;
    text-align: center;
  }
}
</style>


<!-- 

EJEMPLOS DE USO

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

-->