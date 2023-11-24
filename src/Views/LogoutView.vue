<script lang="ts" setup>
import { useLoginStore } from "@/store/login.store";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue"

const loginStore = useLoginStore()
const router = useRouter()
</script>

<template>
  <div class="logout-container">
    <div class="logout">
      <div class="logo">
        <Icon icon="simple-icons:x" />
      </div>
      <p class="title">¿Deseas cerrar sesión en X?</p>
      <p class="body">Puedes volver a iniciar sesión en cualquier momento. Si solo quieres cambiar de cuenta, puedes
        hacerlo agregando una cuenta existente. </p>
      <button class="close-button" type="button" @click="loginStore.logout">Cerrar sesión</button>
      <button class="cancel-button" type="button" @click="router.push({ name: 'home' })">Cancelar</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logout-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5b708366;
  height: 100%;

  .logout {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    position: relative;
    border-radius: 16px;
    padding: 32px;
    width: 320px;
    background-color: #000000;
    color: #ffffff;

    .logo {
      font-size: 3.5rem;
      align-self: center;
    }

    .title {
      font-size: 2.2rem;
      font-weight: bold;
    }

    .body {
      margin-bottom: 15px;
      font-size: 1.5rem;
      line-height: 2rem;
      color: #71767b;
    }

    button {
      border: none;
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

    .close-button:hover {
      background-color: #dfdfdf;
      transform: background-color ease-in 0.3s;
    }

    .cancel-button {
      margin-top: 10px;
      border: solid 1px #ffffff;
      background-color: #000000;
      color: white;

      &:hover {
        background-color: #2f3336;
        transform: background-color ease-in 0.3s;
      }
    }
  }
}
</style>