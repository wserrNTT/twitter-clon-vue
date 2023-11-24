<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useLoginStore } from "@/store/login.store";

const loginStore = useLoginStore();
const handleLogin = () => {
  loginStore.login({
    username: 'user123',
    displayname: 'user',
    profilePicture: 'https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg',
    following: 625,
    followers: 23
  })
}
</script>

<template>
  <div class="login-background">
    <div class="login-container">
      <div class="close-button" @click="$emit('close')">
        <Icon icon="tabler:x" />
      </div>
      <div class="login-form">
        <div class="logo">
          <Icon icon="simple-icons:x" />
        </div>
        <p class="title">
          Inicia sesión en X
        </p>
        <button type="button" class="empty-button">
          <Icon icon="devicon:google" width="1.6rem" />
          Inicia sesión con Google
        </button>
        <button type="button" class="empty-button">
          <Icon icon="bi:apple" width="1.6rem" />
          Inicia sesión con Apple
        </button>
        <div class="separator">
          <span class="line"></span>
          <span>o</span>
          <span class="line"></span>
        </div>
        <div class="field">
          <input class="input" type="text" placeholder=" ">
          <span class="label">Correo o nombre de usuario</span>
        </div>
        <button type="button" @click="handleLogin">Siguiente</button>
        <button type="button" class="forgot-button">¿Olvidaste tu contraseña?</button>
        <p class="register">¿No tienes una cuenta? <span class="highlighted" @click="$emit('close')">Regístrate</span></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-background {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 30px;
  background-color: #5b708366;

  .login-container {
    position: relative;
    border-radius: 16px;
    padding: 10px 10px 50px;
    background-color: #000000;
    color: #ffffff;

    .close-button {
      position: absolute;
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      border-radius: 50%;

      &:hover {
        background-color: #2f3336;
      }
    }

    .login-form {
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      margin: 0 118px;
      height: 100%;

      .logo {
        align-self: center;
        font-size: 3rem;
      }

      .title {
        font-size: 3.2rem;
        font-weight: bold;
      }

      button {
        border: none;
        min-width: 300px;
        border-radius: 32px;
        padding: 12px;
        font-size: 1.4rem;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 5px;
        cursor: pointer;
      }

      .empty-button:hover {
        background-color: #dfdfdf;
        transform: background-color ease-in 0.3s;
      }

      .forgot-button {
        background-color: transparent;
        color: #ffffff;
        border: solid 1px #ffffff;
      }

      .separator {
        display: flex;
        font-size: 1.5rem;

        .line {
          flex: auto;
          margin: 0 5px;
          border-bottom: solid 1px #2f3336;
          transform: translateY(-45%);
        }
      }

      .field {
        position: relative;

        .label {
          position: absolute;
          width: max-content;
          pointer-events: none;
          top: 1.2rem;
          left: 10px;
          font-size: 1.6rem;
          color: #71767b;
          transition: 0.3s ease all;
        }

        .input {
          background-color: transparent;
          border: solid 1px #2f3336;
          border-radius: 4px;
          width: 100%;
          padding: 25px 10px 5px;
          font-size: 1.6rem;
          color: #ffffff;
          outline: none;

          &:focus {
            box-shadow: 0 0 0 1px #1d9bf0;

            ~.label {
              top: 0.4rem;
              left: 10px;
              font-size: 1.4rem;
              color: #1d9bf0;
            }
          }

          &:not(:placeholder-shown)+.label {
            top: 0.4rem;
            left: 10px;
            font-size: 1.4rem;
          }
        }
      }

      .register {
        margin-top: auto;
        font-size: 1.5rem;
        color: #71767b;

        .highlighted {
          color: #1d9bf0;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>