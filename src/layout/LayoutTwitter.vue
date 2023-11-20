<script lang="ts" setup>
import { Icon } from "@iconify/vue"
import { useUserStore } from "@/store/user.store";
import { RouterLink, useRouter } from "vue-router";
import { onMounted } from "vue"

const userStore = useUserStore();
const router = useRouter()
onMounted(() => {
  if (!userStore.$state.isLoggedIn) router.push({ name: 'register' })
})
</script>

<template>
  <div class="layout-container">
    <aside class="sidebar">
      <div class="item-list">
        <router-link :to="{ name: 'home' }" class="item home">
          <Icon class="icon" icon="simple-icons:x" />
        </router-link>
        <router-link :to="{ name: 'home' }" class="item">
          <Icon class="icon" icon="material-symbols:home" />
          <p class="text">Inicio</p>
        </router-link>
        <router-link :to="{ name: 'explore' }" class="item">
          <Icon class="icon" icon="tabler:search" />
          <p class="text">Explorar</p>
        </router-link>
        <router-link :to="{ name: 'notifications' }" class="item">
          <Icon class="icon" icon="ph:bell" />
          <p class="text">Notificaciones</p>
        </router-link>
        <router-link :to="{ name: 'messages' }" class="item">
          <Icon class="icon" icon="teenyicons:envelope-outline" />
          <p class="text">Mensajes</p>
        </router-link>
        <div class="item">
          <Icon class="icon" icon="mingcute:document-line" />
          <p class="text">Listas</p>
        </div>
        <div class="item">
          <Icon class="icon" icon="simple-icons:x" />
          <p class="text">Premium</p>
        </div>
        <router-link :to="{ name: 'profile', params: { id: userStore.getUsername } }" class="item"
          v-if="userStore.getLogged">
          <Icon class="icon" icon="mynaui:user" />
          <p class="text">Perfil</p>
        </router-link>
        <li class="item">
          <Icon class="icon" icon="tabler:dots-circle-horizontal" />
          <p class="text">Más opciones</p>
        </li>
        <li class="item item-post">
          <p class="text">Postear</p>
        </li>
      </div>
      <div class="user" @click="() => userStore.logout()" v-if="userStore.getLogged">
        <img :src="userStore.getProfilePicture" alt="" class="user-pfp">
        <div class="user-info">
          <span class="display-name">{{ userStore.getDisplayname }}</span>
          <span class="user-name">@{{ userStore.getUsername }}</span>
        </div>
        <Icon icon="mi:options-horizontal" class="icon" />
      </div>
    </aside>
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.layout-container {
  color: #e7e9ea;
  display: grid;
  grid-template-columns: 315px auto;
  height: 100vh;

  .sidebar {
    display: flex;
    flex-direction: column;
    padding: 15px;
    border-right: 1px solid #454545;
    padding-left: 50px;

    .item-list {
      font-size: 2.2rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      list-style: none;

      .item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        column-gap: 15px;
        padding: 8px 20px 8px 10px;
        border-radius: 64px;
        text-decoration: none;
        color: #e7e9ea;
        cursor: pointer;
        transition: background-color ease-in 0.2s;

        &:hover {
          background-color: #313131;
        }

        .icon {
          font-size: 2.8rem;
        }
      }

      .home {
        margin-bottom: 10px;
        font-size: 2.5rem;
        padding: 10px;
      }

      .item-post {
        margin-top: 10px;
        align-self: stretch;
        background-color: #1d9bf0;

        .text {
          font-weight: bold;
          margin: auto;
        }

        &:hover {
          background-color: #1b8bd6;
        }
      }
    }

    .user {
      display: flex;
      align-items: center;
      align-self: stretch;
      column-gap: 10px;
      margin-top: auto;
      padding: 10px 10px 0 10px;
      font-size: 1.5rem;
      padding: 10px;
      border-radius: 32px;
      cursor: pointer;

      .user-pfp {
        height: 40px;
        border-radius: 50%;
      }

      .user-info {
        display: flex;
        flex-direction: column;

        .display-name {
          font-weight: bold;
        }
      }

      .icon {
        margin-left: auto;
        font-size: 2rem;
      }

      &:hover {
        background-color: #313131;
      }
    }
  }



}
</style>