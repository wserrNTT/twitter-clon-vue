<script lang="ts" setup>
import { ref, reactive } from 'vue';

// Components
import { Icon } from '@iconify/vue';
import Loader from './Loader.vue';

// Pinia
import { useLoginStore } from '@/store/login.store';

// Axios methods
import { getLoginUser, getUserByUsername } from '@/utils/axios';

const loginStore = useLoginStore();
const userData = reactive({
  username: '',
  password: ''
});
const isLoading = ref(false);
const page = ref(1);
const showPassword = ref(false);

const checkUser = async () => {
  isLoading.value = true;
  if (userData.username.length === 0) {
    isLoading.value = false;
    return loginStore.setError('Lo sentimos, no pudimos encontrar tu cuenta');
  }
  try {
    await getUserByUsername(userData.username);
    loginStore.setError('');
    page.value = 2;
    isLoading.value = false;
  } catch (error) {
    loginStore.setError('Lo sentimos, no pudimos encontrar tu cuenta');
    isLoading.value = false;
  }
};

const handleLogin = async () => {
  isLoading.value = true;
  if (userData.password.length === 0) {
    isLoading.value = false;
    return loginStore.setError('Ingresa una contraseña');
  }
  try {
    const { data } = await getLoginUser(userData.username, userData.password);
    isLoading.value = false;
    loginStore.login(data.user);
  } catch (error) {
    isLoading.value = false;
    return loginStore.setError('Contraseña incorrecta');
  }
};
</script>

<template>
  <div class="login-background">
    <div class="login-container">
      <div class="close-button" @click="$emit('close')">
        <Icon icon="tabler:x" />
      </div>
      <div v-if="loginStore.error.length > 0" class="error-container">
        <p class="text">{{ loginStore.error }}</p>
      </div>
      <form
        v-if="page === 1 && !isLoading"
        class="username-form"
        @submit.prevent="checkUser"
      >
        <div class="logo">
          <Icon icon="simple-icons:x" />
        </div>
        <p class="title">Inicia sesión en X</p>
        <button type="button" class="empty-button">
          <Icon class="icon" icon="devicon:google" />
          Iniciar sesión con Google
        </button>
        <button type="button" class="empty-button">
          <Icon class="icon" icon="bi:apple" />
          Iniciar sesión con Apple
        </button>
        <div class="separator">
          <span class="line"></span>
          <span>o</span>
          <span class="line"></span>
        </div>
        <div class="field">
          <input class="input" type="text" placeholder=" " v-model="userData.username" />
          <span class="label">Nombre de usuario</span>
        </div>
        <button type="submit">Siguiente</button>
        <button type="button" class="forgot-button">¿Olvidaste tu contraseña?</button>
        <p class="register-message">
          ¿No tienes una cuenta?
          <span class="highlighted" @click="$emit('close')">Regístrate</span>
        </p>
      </form>
      <form
        v-if="page === 2 && !isLoading"
        class="login-form"
        @submit.prevent="handleLogin"
      >
        <div class="logo">
          <Icon icon="simple-icons:x" />
        </div>
        <p class="title">Introduce tu contraseña</p>
        <div class="field disabled-field">
          <input
            class="input"
            type="text"
            placeholder=" "
            :value="userData.username"
            disabled
          />
          <span class="label">Nombre de usuario</span>
        </div>
        <div class="field">
          <input
            class="input"
            :type="showPassword ? 'text' : 'password'"
            placeholder=" "
            v-model="userData.password"
          />
          <span class="label">Contraseña</span>
          <span class="reveal-button" @click="showPassword = !showPassword">
            <Icon icon="showPassword ? 'akar-icons:eye-slashed' : 'akar-icons:eye' " />
          </span>
        </div>
        <button
          type="submit"
          class="login-button"
          :class="userData.password.length === 0 && 'button-disabled'"
          :disabled="userData.password.length === 0"
        >
          Iniciar sesión
        </button>
        <p class="register-message">
          ¿No tienes una cuenta?
          <span class="highlighted" @click="$emit('close')"> Regístrate </span>
        </p>
      </form>
      <div v-if="isLoading" class="loader-container">
        <Loader />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$lightGrey: #71767b;
$grey: #313131;

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #5b708366;
  overflow: hidden;

  .login-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    border-radius: 16px;
    padding: calc(4.5rem + 40px) 10px 50px;
    background-color: #000000;
    color: #ffffff;
    min-height: 850px;
    min-width: 850px;
    height: min-content;

    .close-button {
      top: 10px;
      left: 10px;
      position: absolute;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3rem;
      border-radius: 50%;

      &:hover {
        background-color: $grey;
      }
    }
    .error-container {
      position: absolute;
      padding: 10px;
      left: 0;
      right: 0;
      margin: 0 50px;
      background-color: #1d9bf0;
      border-radius: 4px;
      text-align: center;
      font-size: 2.4rem;
      bottom: 0;
    }
    .username-form {
      display: flex;
      flex: auto;
      flex-direction: column;
      align-self: stretch;
      row-gap: 25px;
      margin: 0 180px;

      .logo {
        position: absolute;
        top: 20px;
        align-self: center;
        font-size: 4.5rem;
      }

      .title {
        font-size: 4.5rem;
        font-weight: bold;
      }

      button {
        border: none;
        min-width: 300px;
        border-radius: 32px;
        padding: 16px;
        font-size: 2.2rem;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 5px;
        cursor: pointer;
      }
      .light-font {
        font-weight: lighter;
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
        font-size: 2.5rem;
        line-height: 2rem;

        .line {
          flex: auto;
          margin: 0 5px;
          border-bottom: solid 1px $grey;
          transform: translateY(-40%);
        }
      }

      .field {
        position: relative;

        .label {
          position: absolute;
          width: max-content;
          pointer-events: none;
          top: 2.2rem;
          left: 10px;
          font-size: 2.2rem;
          color: $lightGrey;
          transition: 0.1s ease all;
        }

        .input {
          background-color: transparent;
          border: solid 1px $grey;
          border-radius: 4px;
          width: 100%;
          padding: 25px 10px 5px;
          font-size: 2.5rem;
          height: 8rem;
          color: #ffffff;
          outline: none;

          &:focus {
            box-shadow: 0 0 0 1px #1d9bf0;

            ~ .label {
              top: 0.4rem;
              left: 10px;
              font-size: 2rem;
              color: #1d9bf0;
            }
          }

          &:not(:placeholder-shown) + .label {
            top: 0.4rem;
            left: 10px;
            font-size: 2rem;
          }
        }
      }

      .register-message {
        margin-top: auto;
        font-size: 2rem;
        color: $lightGrey;

        .highlighted {
          color: #1d9bf0;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .login-form {
      display: flex;
      flex: auto;
      flex-direction: column;
      align-self: stretch;
      row-gap: 20px;
      margin: 0 90px;
      .logo {
        position: absolute;
        top: 20px;
        align-self: center;
        font-size: 4.5rem;
      }

      .title {
        font-size: 4.5rem;
        font-weight: bold;
      }

      .login-button {
        margin-top: auto;
        border: none;
        min-width: 300px;
        border-radius: 32px;
        padding: 20px;
        font-size: 2.5rem;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 5px;
        cursor: pointer;
      }
      .button-disabled {
        background-color: #787a7a;
        cursor: auto;
      }
      .field {
        position: relative;

        .label {
          position: absolute;
          width: max-content;
          pointer-events: none;
          top: 2.2rem;
          left: 10px;
          font-size: 2.2rem;
          color: $lightGrey;
          transition: 0.1s ease all;
        }
        .reveal-button {
          position: absolute;
          width: max-content;
          top: 2.5rem;
          right: 10px;
          font-size: 3rem;
          color: white;
          cursor: pointer;
          z-index: 2;
        }
        .input {
          background-color: transparent;
          border: solid 1px $grey;
          border-radius: 4px;
          width: 100%;
          padding: 25px 10px 5px;
          font-size: 2.5rem;
          height: 8rem;
          color: #ffffff;
          outline: none;

          &:focus {
            box-shadow: 0 0 0 1px #1d9bf0;

            ~ .label {
              top: 0.4rem;
              left: 10px;
              font-size: 2rem;
              color: #1d9bf0;
            }
          }

          &:not(:placeholder-shown) + .label {
            top: 0.4rem;
            left: 10px;
            font-size: 2rem;
          }
        }
      }
      .disabled-field {
        .label {
          color: $grey;
        }
        .input {
          background-color: #101214;
          border-color: #101214;
          color: $grey;
        }
      }
      .register-message {
        font-size: 2rem;
        color: $lightGrey;

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
@media screen and (max-width: 1700px) {
  .login-background .login-container {
    min-height: 560px;
    min-width: 560px;

    .close-button {
      width: 35px;
      height: 35px;
      font-size: 2rem;
    }
    .error-container {
      font-size: 1.5rem;
    }
    .username-form {
      margin: 0 118px;
      .logo {
        font-size: 3rem;
      }
      .title {
        font-size: 3.2rem;
      }
      button {
        padding: 15px;
        font-size: 1.5rem;
      }
      .separator {
        font-size: 1.5rem;
        line-height: auto;

        .line {
          transform: translateY(-45%);
        }
      }
      .field {
        position: relative;

        .label {
          top: 1.2rem;
          font-size: 1.6rem;
        }

        .input {
          font-size: 1.6rem;
          height: 5rem;
          &:focus ~ .label {
            font-size: 1.4rem;
          }

          &:not(:placeholder-shown) + .label {
            font-size: 1.4rem;
          }
        }
      }
      .register-message {
        font-size: 1.5rem;
      }
    }
    .login-form {
      margin: 0 80px;
      .logo {
        font-size: 3rem;
      }
      .title {
        font-size: 3.2rem;
      }
      .login-button {
        padding: 15px;
        font-size: 1.5rem;
      }
      .separator {
        font-size: 1.5rem;
        line-height: auto;

        .line {
          transform: translateY(-45%);
        }
      }
      .field {
        position: relative;

        .label {
          top: 1.2rem;
          font-size: 1.6rem;
        }
        .reveal-button {
          top: 1.4rem;
          font-size: 2rem;
        }
        .input {
          font-size: 1.6rem;
          height: 5rem;
          &:focus ~ .label {
            font-size: 1.4rem;
          }

          &:not(:placeholder-shown) + .label {
            font-size: 1.4rem;
          }
        }
      }
      .register-message {
        font-size: 1.5rem;
      }
    }
  }
}
@media screen and (max-width: 700px) {
  .login-background .login-container {
    border-radius: 0px;
    width: 100%;
    height: 100%;
    min-width: auto;
    .username-form {
      margin: 0 180px;
    }
  }
}
</style>
