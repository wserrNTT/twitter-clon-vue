<script lang="ts" setup>
import { useRouter } from "vue-router";
import { watch } from "vue";
import { useUserStore } from "@/store/user.store";
import { Icon } from "@iconify/vue"

const router = useRouter();
const userStore = useUserStore();

watch(() => userStore.isLoggedIn, (currentState) => {
  if (currentState) router.push({ name: 'home' })
})
</script>

<template>
  <div class="register-container">
    <div class="x-container">
      <Icon class="icon" icon="simple-icons:x" color="#e7e9ea" />
    </div>
    <div class="info-container">
      <h2>Lo que está pasando ahora</h2>
      <div class="buttons-container">
        <h3>Únete Hoy</h3>
        <button type="button" class="empty-button">
          <icon icon="devicon:google" width="1.6rem" />
          Registrate con Google
        </button>
        <button type="button" class="empty-button">
          <Icon icon="bi:apple" width="1.6rem" />
          Registrate con Apple
        </button>
        <div class="separator">
          <span class="line"></span>
          <span>o</span>
          <span class="line"></span>
        </div>
        <button type="button" class="full-button">Crear Cuenta</button>
        <p class="terms">
          Al registrarte, aceptas los <a href="https://twitter.com/tos" class="highlighted">Términos de servicio
          </a>y la <a href="https://twitter.com/privacy" class="highlighted">Política de privacidad</a>, incluída la
          política de <a href="https://help.twitter.com/rules-and-policies/twitter-cookies" class="highlighted">Uso de
            Cookies</a>.
        </p>
        <h4 class="login-question">¿Ya tienes una cuenta?</h4>
        <button type="button" class="login-button" @click="() => userStore.toggleLogin()">Iniciar sesión</button>
      </div>
    </div>
    <footer>
      <a href="https://about.twitter.com/">información</a>
      <a href="https://help.twitter.com/using-x/download-the-x-app">Descargar la app de X</a>
      <a href="https://help.twitter.com/">Centro de Ayuda</a>
      <a href="https://twitter.com/tos">Condiciones de Servicio</a>
      <a href="https://twitter.com/privacy">Política de Privacidad</a>
      <a href="https://support.twitter.com/articles/20170514">Política de Cookies</a>
      <a href="https://help.twitter.com/resources/accessibility">Accesibilidad</a>
      <a
        href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo">Información
        de anuncios</a>
      <a href="https://blog.twitter.com/">Blog</a>
      <a href="https://status.twitterstat.us/">Estado</a>
      <a href="https://careers.twitter.com/">Empleos</a>
      <a href="https://about.twitter.com/press/brand-assets">Recursos para Marcas</a>
      <a href="https://ads.twitter.com/?ref=gl-tw-tw-twitter-advertise">Publicidad</a>
      <a href="https://marketing.twitter.com/">Marketing</a>
      <a
        href="https://business.twitter.com/?ref=web-twc-ao-gbl-twitterforbusiness&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=twitterforbusiness">X
        para empresas</a>
      <a href="https://developer.twitter.com/">Desarrolladores</a>
      <a href="https://twitter.com/i/directory/profiles">Guía</a>
      <a href="https://twitter.com/settings">Configuración</a>
      <span>© 2023 X Corp</span>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.register-container {
  display: grid;
  grid-template-columns: auto 760px;
  grid-template-rows: auto 80px;
  height: 100%;

  .x-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 140px;

    .icon {
      width: clamp(130px, 80%, 350px);
      height: auto;
    }
  }

  .info-container {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    justify-content: center;
    align-items: flex-start;
    padding: 0 30% 0 50px;
    color: #e7e9ea;

    h2 {
      font-size: 5rem;
    }

    h3 {
      font-size: 3rem;
    }

    h4 {
      font-size: 1.5rem;
    }

    .buttons-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: clamp(260px, 50%, 450px);

      button {
        border: none;
        border-radius: 32px;
        padding: 10px 15px;
        font-size: 1.4rem;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 5px;
        cursor: pointer;
      }

      .separator {
        display: flex;
        font-size: 1.2rem;

        .line {
          flex: auto;
          margin: 0 5px;
          border-bottom: solid 1px #2f3336;
          transform: translateY(-45%);
        }
      }

      .empty-button:hover {
        background-color: #dfdfdf;
        transform: background-color ease-in 0.3s;
      }

      .full-button {
        background-color: #1d9bf0;
        color: white;

        &:hover {
          background-color: #158ddd;
          transform: background-color ease-in 0.3s;
        }
      }

      .terms {
        color: #71767b;

        .highlighted {
          color: #1d9bf0;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .login-question {
        margin-top: 10px;
      }

      .login-button {
        border: solid 1px #71767b;
        border-radius: 32px;
        padding: 10px 15px;
        font-size: 1.4rem;
        font-weight: bold;
        align-self: stretch;
        background-color: transparent;
        color: #1d9bf0;

        &:hover {
          background-color: #041c2c;
          transform: background-color ease-in 0.3s;
        }
      }
    }
  }



  footer {
    margin-top: auto;
    grid-column: 1 / span 2;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 5px;
    column-gap: 20px;
    padding: 10px 40px;
    font-size: 1.2rem;
    color: #71767b;

    a {
      text-decoration: none;

      color: inherit;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .register-container {
    grid-template-columns: 1fr;
    grid-template-rows: 40px auto 100px;
    row-gap: 20px;
    padding: 20px;

    .x-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;

      grid-row: 1 / 2;
      margin: auto;

      .icon {
        width: 40px;
        height: auto;
      }
    }

    .info-container {
      grid-row: 2 / 3;
      padding: 0;
      width: 100%;
      margin: auto;
    }

    footer {
      padding: 20px 0;
    }
  }
}


@media screen and (max-width: 520px) {
  .register-container {
    padding: 40px;

    .x-container {
      width: 100%;
    }

    .info-container {
      width: auto;
      margin: auto;

      h2 {
        font-size: 4rem;
        width: 80%;
      }

      h3 {
        font-size: 2rem;
      }
    }

    footer {
      padding: 10px 0;
    }
  }
}
</style> 
