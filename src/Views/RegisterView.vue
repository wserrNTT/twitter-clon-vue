<script lang="ts" setup>
import logo from "/favicon.jpg"
</script>

<template>
  <div class="register-container">
    <div class="x-container">
      <img class="logo" :src="logo" alt="x-logo">
    </div>
    <div class="info-container">
      <h2>Lo que está pasando ahora</h2>
      <div class="buttons-container">
        <h3>únete Hoy</h3>
        <button class="empty-button">Registrate con Google</button>
        <button class="empty-button">Registrate con Apple</button>
        <div class="separator">
          <span class="line"></span>
          <span>o</span>
          <span class="line"></span>
        </div>
        <button class="full-button">Crear Cuenta</button>
        <p class="terms">
          Al registrarte, aceptas los<span class="highlighted">Términos de servicio
          </span>y la <span class="highlighted">Política de privacidad</span>, incluída la política de <span
            class="highlighted">Uso de
            Cookies</span>.
        </p>
        <h4 class="login-question">¿Ya tienes una cuenta?</h4>
        <button class="login-button">Iniciar sesión</button>
      </div>
    </div>
    <footer>
      <a href="">información</a>
      <a href="">Descargar la app de X</a>
      <a href="">Centro de Ayuda</a>
      <a href="">Condiciones de Servicio</a>
      <a href="">Política de Privacidad</a>
      <a href="">Política de Cookies</a>
      <a href="">Accesibilidad</a>
      <a href="">Información de anuncios</a>
      <a href="">Blog</a>
      <a href="">Estado</a>
      <a href="">Empleos</a>
      <a href="">Recursos para Marcas</a>
      <a href="">Publicidad</a>
      <a href="">Marketing</a>
      <a href="">X para empresas</a>
      <a href="">Desarrolladores</a>
      <a href="">Guía</a>
      <a href="">Configuración</a>
      <span>© 2023 X Corp</span>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.register-container {
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: auto 80px;
  height: 100%;

  .x-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
      width: 500px;
      height: auto;
    }
  }

  .info-container {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    justify-content: center;
    align-items: flex-start;
    padding-right: 30%;
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

      .full-button {
        background-color: #1d9bf0;
        color: white;
      }

      .terms {
        color: #71767b;

        .highlighted {
          color: #1d9bf0
        }
      }
    }
  }

  .login-question {
    margin-top: 10px;
  }

  .login-button {
    border: none;
    border-radius: 32px;
    padding: 10px 15px;
    font-size: 1.4rem;
    font-weight: bold;
    align-self: stretch;
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
</style> 
