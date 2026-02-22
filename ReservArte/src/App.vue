<script setup lang="ts">
import BannerPrincipal from './components/c_bannerPrincipal.vue'
import CTexlabel from './components/c_textlabel.vue'
import NavButtom from './components/c_bottomNavBar.vue'
import C_contentAreaPrimaryButton from './components/Buttons/c_contentAreaPrimaryButton.vue'
import C_contentAreaSecondaryButton from './components/Buttons/c_contentAreaSecondaryButton.vue'
import C_navAreaPrimaryButton from './components/Buttons/c_navAreaPrimaryButton.vue'
import C_navAreaSecondaryButton from './components/Buttons/c_navAreaSecondaryButton.vue'
import CPageTittle from './components/c_pageTittle.vue'
import CSectionTittle from './components/c_sectionTittle.vue'
import CContactMap from './components/c_contactMap.vue'
import CListItem from './components/c_listItem.vue'

function onPrimaryClick() {
  alert('Acción del botón primario ejecutada.')
}

function onListItemEdit() {
  alert('Editar ítem')
}
function onListItemDelete() {
  alert('Eliminar ítem')
}
function onListItemCheck() {
  alert('Confirmar ítem')
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

    <section class="app__demo" aria-labelledby="demo-page-title-titulo">
      <h2 id="demo-page-title-titulo" class="app__title">
        Demo Page Title (Título pantalla)
      </h2>
      <p class="app__demo-desc">
        Un único componente con 6 tamaños controlados por la prop <code>size</code>: XXL, XL, LG, MD, SM, XS.
      </p>
      <div class="app__variants">
        <div class="app__variant">
          <span class="app__variant-name">XXL</span>
          <CPageTittle text="Título pantalla" size="XXL" />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">XL</span>
          <CPageTittle text="Título pantalla" size="XL" />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">LG</span>
          <CPageTittle text="Título pantalla" size="LG" />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">MD (por defecto)</span>
          <CPageTittle text="Título pantalla" size="MD" />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">SM</span>
          <CPageTittle text="Título pantalla" size="SM" />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">XS</span>
          <CPageTittle text="Título pantalla" size="XS" />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">Sin size (usa MD)</span>
          <CPageTittle text="Título pantalla" />
        </div>
      </div>
    </section>

    <section class="app__demo" aria-labelledby="demo-section-title-titulo">
      <h2 id="demo-section-title-titulo" class="app__title">
        Demo Section Title (Título de sección)
      </h2>
      <p class="app__demo-desc">
        Un único componente con 4 tamaños controlados por la prop <code>size</code>: LG, MD, SM, XS.
      </p>
      <div class="app__variants">
        <div class="app__variant">
          <span class="app__variant-name">LG</span>
          <CSectionTittle text="Título de sección" size="LG" />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">MD (por defecto)</span>
          <CSectionTittle text="Título de sección" size="MD" />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">SM</span>
          <CSectionTittle text="Título de sección" size="SM" />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">XS</span>
          <CSectionTittle text="Título de sección" size="XS" />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">Sin size (usa MD)</span>
          <CSectionTittle text="Título de sección" />
        </div>
      </div>
    </section>

    <section class="app__demo" aria-labelledby="demo-contact-map-titulo">
      <h2 id="demo-contact-map-titulo" class="app__title">
        Demo Contact Map (Mapa de contacto)
      </h2>
      <p class="app__demo-desc">
        Mapa de Google Maps con 6 tamaños controlados por la prop <code>size</code>: XXL, XL, LG, MD, SM, XS.
      </p>
      <div class="app__variants">
        <div class="app__variant">
          <span class="app__variant-name">XXL (iframe 800×600)</span>
          <CContactMap size="XXL" />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">XL (iframe 800×600)</span>
          <CContactMap size="XL" />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">LG (iframe 600×450)</span>
          <CContactMap size="LG" />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">MD (por defecto, iframe 600×450)</span>
          <CContactMap size="MD" />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">SM (iframe 400×300)</span>
          <CContactMap size="SM" />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">XS (iframe 400×300)</span>
          <CContactMap size="XS" />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">Sin size (usa MD)</span>
          <CContactMap />
        </div>
      </div>
    </section>

    <section class="app__demo" aria-labelledby="demo-list-item-titulo">
      <h2 id="demo-list-item-titulo" class="app__title">
        Demo List Item (Ítem de lista)
      </h2>
      <p class="app__demo-desc">
        Ítem de lista con título y acciones (editar, eliminar, confirmar). 4 tamaños: LG, MD, SM, XS. Iconos por defecto desde <code>src/assets/</code> (edit.svg, delete.svg, check.svg).
      </p>
      <div class="app__variants">
        <div class="app__variant">
          <span class="app__variant-name">LG</span>
          <CListItem
            title="Marcos Aguilar Fernández"
            size="LG"
            @edit="onListItemEdit"
            @delete="onListItemDelete"
            @check="onListItemCheck"
          />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">MD</span>
          <CListItem
            title="Marcos Aguilar Fernández"
            size="MD"
            @edit="onListItemEdit"
            @delete="onListItemDelete"
            @check="onListItemCheck"
          />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">SM</span>
          <CListItem
            title="Marcos Aguilar Fernández"
            size="SM"
            @edit="onListItemEdit"
            @delete="onListItemDelete"
            @check="onListItemCheck"
          />
        </div>
        <div class="app__variant">
          <span class="app__variant-name">XS</span>
          <CListItem
            title="Marcos Aguilar Fernández"
            size="XS"
            @edit="onListItemEdit"
            @delete="onListItemDelete"
            @check="onListItemCheck"
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

    <section class="app__demo" aria-labelledby="demo-boton-nav-titulo">
      <h2 id="demo-boton-nav-titulo" class="app__title">
        Demo Botón navegación (Nav Area Primary)
      </h2>
      <p class="app__demo-desc">
        Igual que el botón primario de content area, con opción de <strong>icono</strong> y <strong>posición</strong> (antes o después del texto; por defecto antes).
      </p>
      <div class="app__button-demo">
        <div class="app__button-item">
          <C_navAreaPrimaryButton text="Inicio" @click="onPrimaryClick" />
          <span class="app__button-label">Sin icono</span>
        </div>
        <div class="app__button-item">
          <C_navAreaPrimaryButton text="Inicio" icon-position="before" @click="onPrimaryClick">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </template>
          </C_navAreaPrimaryButton>
          <span class="app__button-label">Icono antes (por defecto)</span>
        </div>
        <div class="app__button-item">
          <C_navAreaPrimaryButton text="Siguiente" icon-position="after" @click="onPrimaryClick">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </template>
          </C_navAreaPrimaryButton>
          <span class="app__button-label">Icono después</span>
        </div>
        <div class="app__button-item">
          <C_navAreaPrimaryButton text="Inicio" icon-position="before" :disabled="true">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </template>
          </C_navAreaPrimaryButton>
          <span class="app__button-label">Disabled con icono</span>
        </div>
      </div>

      <h3 class="app__subtitle">Tamaños (size) con icono</h3>
      <div class="app__button-demo app__button-demo--sizes">
        <div class="app__button-item">
          <C_navAreaPrimaryButton text="Nav" size="XS" icon-position="before" @click="onPrimaryClick">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            </template>
          </C_navAreaPrimaryButton>
          <span class="app__button-label">XS</span>
        </div>
        <div class="app__button-item">
          <C_navAreaPrimaryButton text="Nav" size="SM" icon-position="before" @click="onPrimaryClick">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            </template>
          </C_navAreaPrimaryButton>
          <span class="app__button-label">SM</span>
        </div>
        <div class="app__button-item">
          <C_navAreaPrimaryButton text="Inicio" size="MD" icon-position="before" @click="onPrimaryClick">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            </template>
          </C_navAreaPrimaryButton>
          <span class="app__button-label">MD</span>
        </div>
        <div class="app__button-item">
          <C_navAreaPrimaryButton text="Inicio" size="LG" icon-position="before" @click="onPrimaryClick">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            </template>
          </C_navAreaPrimaryButton>
          <span class="app__button-label">LG</span>
        </div>
        <div class="app__button-item">
          <C_navAreaPrimaryButton text="Inicio" size="XL" icon-position="after" @click="onPrimaryClick">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </template>
          </C_navAreaPrimaryButton>
          <span class="app__button-label">XL (icono después)</span>
        </div>
        <div class="app__button-item">
          <C_navAreaPrimaryButton text="Inicio" size="XXL" icon-position="before" @click="onPrimaryClick">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            </template>
          </C_navAreaPrimaryButton>
          <span class="app__button-label">XXL</span>
        </div>
      </div>
    </section>

    <section class="app__demo" aria-labelledby="demo-boton-nav-sec-titulo">
      <h2 id="demo-boton-nav-sec-titulo" class="app__title">
        Demo Botón navegación secundario (Nav Area Secondary)
      </h2>
      <p class="app__demo-desc">
        Misma estructura que el botón de navegación primario, con colores del secundario (fondo blanco, borde y texto rosa; icono por defecto <strong>después</strong> del texto).
      </p>
      <div class="app__button-demo">
        <div class="app__button-item">
          <C_navAreaSecondaryButton text="Volver" @click="onPrimaryClick" />
          <span class="app__button-label">Sin icono</span>
        </div>
        <div class="app__button-item">
          <C_navAreaSecondaryButton text="Volver" icon-position="after" @click="onPrimaryClick">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </template>
          </C_navAreaSecondaryButton>
          <span class="app__button-label">Icono después (por defecto)</span>
        </div>
        <div class="app__button-item">
          <C_navAreaSecondaryButton text="Volver" icon-position="before" @click="onPrimaryClick">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </template>
          </C_navAreaSecondaryButton>
          <span class="app__button-label">Icono antes</span>
        </div>
        <div class="app__button-item">
          <C_navAreaSecondaryButton text="Volver" icon-position="after" :disabled="true">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </template>
          </C_navAreaSecondaryButton>
          <span class="app__button-label">Disabled con icono</span>
        </div>
      </div>

      <h3 class="app__subtitle">Tamaños (size) con icono</h3>
      <div class="app__button-demo app__button-demo--sizes">
        <div class="app__button-item">
          <C_navAreaSecondaryButton text="Volver" size="XS" icon-position="after" @click="onPrimaryClick">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </template>
          </C_navAreaSecondaryButton>
          <span class="app__button-label">XS</span>
        </div>
        <div class="app__button-item">
          <C_navAreaSecondaryButton text="Volver" size="SM" icon-position="after" @click="onPrimaryClick">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </template>
          </C_navAreaSecondaryButton>
          <span class="app__button-label">SM</span>
        </div>
        <div class="app__button-item">
          <C_navAreaSecondaryButton text="Volver" size="MD" icon-position="after" @click="onPrimaryClick">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </template>
          </C_navAreaSecondaryButton>
          <span class="app__button-label">MD</span>
        </div>
        <div class="app__button-item">
          <C_navAreaSecondaryButton text="Volver" size="LG" icon-position="after" @click="onPrimaryClick">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </template>
          </C_navAreaSecondaryButton>
          <span class="app__button-label">LG</span>
        </div>
        <div class="app__button-item">
          <C_navAreaSecondaryButton text="Volver" size="XL" icon-position="before" @click="onPrimaryClick">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            </template>
          </C_navAreaSecondaryButton>
          <span class="app__button-label">XL (icono antes)</span>
        </div>
        <div class="app__button-item">
          <C_navAreaSecondaryButton text="Volver" size="XXL" icon-position="after" @click="onPrimaryClick">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </template>
          </C_navAreaSecondaryButton>
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
