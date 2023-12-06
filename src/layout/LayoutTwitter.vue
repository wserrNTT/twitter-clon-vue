<script lang="ts" setup>
// Vue
import { onMounted, ref } from 'vue';
// Pinia
import { useLoginStore } from '@/store/login.store';
import { useUserStore } from '@/store/user.store';
import { useHashtagStore } from '@/store/hashtag.store';

// Router
import { RouterLink, useRouter, useRoute } from 'vue-router';
// Icons
import { Icon } from '@iconify/vue';

// img
import defaultProfilePicture from '@/assets/img/default_profile.png';

const loginStore = useLoginStore();
const userStore = useUserStore();
const hashtagStore = useHashtagStore();

const router = useRouter();
const route = useRoute();
const showMenu = ref(false);
onMounted(() => {
  if (!loginStore.$state.isLoggedIn) router.push({ name: 'register' });
  userStore.fetchUsers();
  hashtagStore.fetchHashtags();
});
</script>

<template>
  <div class="layout-container">
    <aside class="main-sidebar">
      <div class="item-list">
        <router-link :to="{ name: 'home' }" class="item home">
          <Icon class="icon" icon="simple-icons:x" />
        </router-link>
        <router-link :to="{ name: 'home' }" class="item">
          <Icon
            class="icon"
            :icon="
              route.name === 'home'
                ? 'material-symbols:home'
                : 'material-symbols:home-outline'
            "
          />
          <p class="text" :class="{ bold: route.name === 'home' }">Inicio</p>
        </router-link>
        <router-link :to="{ name: 'explore' }" class="item">
          <Icon
            class="icon"
            :icon="
              route.name === 'explore' ? 'iconamoon:search-bold' : 'iconamoon:search'
            "
          />
          <p class="text" :class="{ bold: route.name === 'explore' }">Explorar</p>
        </router-link>
        <router-link :to="{ name: 'notifications' }" class="item">
          <Icon
            class="icon"
            :icon="route.name === 'notifications' ? 'ph:bell-fill' : 'ph:bell-light'"
          />
          <p class="text" :class="{ bold: route.name === 'notifications' }">
            Notificaciones
          </p>
        </router-link>
        <router-link :to="{ name: 'messages' }" class="item">
          <Icon
            class="icon"
            :icon="
              route.name === 'messages'
                ? 'teenyicons:envelope-solid'
                : 'teenyicons:envelope-outline'
            "
          />
          <p class="text" :class="{ bold: route.name === 'messages' }">Mensajes</p>
        </router-link>
        <router-link
          :to="{ name: 'lists', params: { id: loginStore.data._id } }"
          class="item"
          v-if="loginStore.isLoggedIn"
        >
          <Icon
            class="icon"
            :icon="
              route.name === 'lists'
                ? 'fluent:document-one-page-24-filled'
                : 'fluent:document-one-page-24-regular'
            "
          />
          <p class="text" :class="{ bold: route.name === 'lists' }">Listas</p>
        </router-link>
        <div class="item">
          <Icon class="icon" icon="simple-icons:x" />
          <p class="text">Premium</p>
        </div>
        <router-link
          :to="{ name: 'profile', params: { id: loginStore.data.userName } }"
          class="item"
          v-if="loginStore.isLoggedIn"
        >
          <Icon
            class="icon"
            :icon="route.name === 'profile' ? 'heroicons:user-solid' : 'heroicons:user'"
          />
          <p class="text" :class="{ bold: route.name === 'profile' }">Perfil</p>
        </router-link>
        <div class="item">
          <Icon class="icon" icon="tabler:dots-circle-horizontal" />
          <p class="text">Más opciones</p>
        </div>
        <div class="item item-post">
          <Icon icon="mingcute:quill-pen-line" class="icon" />
          <p class="text">Postear</p>
        </div>
      </div>
      <div
        class="user"
        :class="{ hover: !showMenu }"
        v-if="loginStore.isLoggedIn"
        @click="showMenu = true"
      >
        <img
          :src="loginStore.data?.profilePicture || defaultProfilePicture"
          :alt="`${loginStore.data.displayName}'s profile picure'`"
          class="user-pfp"
        />
        <div class="user-info">
          <span class="display-name">{{ loginStore.data.displayName }}</span>
          <span class="user-name">@{{ loginStore.data.userName }}</span>
        </div>
        <Icon icon="mi:options-horizontal" class="icon" />
        <div class="submenu" v-if="showMenu">
          <div class="items">
            <p class="item">Agregar una cuenta existente</p>
            <p class="item" @click="router.push({ name: 'logout' })">
              Cerrar la sesión de @{{ loginStore.data.userName }}
            </p>
          </div>
        </div>
      </div>
    </aside>
    <slot />
    <aside class="right-sidebar" v-if="route.name !== 'messages'">
      <div class="search-container">
        <div class="search">
          <Icon class="icon" icon="iconamoon:search" />
          <input class="input-search" type="text" placeholder="Buscar" />
        </div>
      </div>
      <div class="sidebar-items">
        <div class="premium" v-if="['home'].includes(route.name as string)">
          <p class="title">Suscríbete a Premium</p>
          <p class="body">
            Suscríbete para desbloquear nuevas funciones y, si eres elegible, recibir un
            pago de cuota de ingresos por anuncios.
          </p>
          <button type="button" class="subscribe-button">Suscribirse</button>
        </div>
        <div
          class="trends"
          v-if="['home', 'notifications', 'lists', 'profile'].includes(route.name as string)"
        >
          <p class="title">Tendencias para ti</p>
          <div class="trend" v-for="hashtag in hashtagStore.getRandomHashtags">
            <div class="info">
              <p class="header">Tendencia</p>
              <p class="name">{{ hashtag.name }}</p>
              <p class="volume" v-if="hashtag.tweet_volume?.length">
                {{ hashtag.tweet_volume.length }} posts
              </p>
            </div>
            <div class="options">
              <Icon icon="mi:options-horizontal" class="icon" />
            </div>
          </div>
        </div>
        <div
          class="follow"
          v-if="['home', 'explore', 'notifications', 'lists', 'profile'].includes(route.name as string)"
        >
          <p class="title">
            {{ route.name === 'profile' ? 'Tal vez te guste' : 'A quién seguir' }}
          </p>
          <div class="user" v-for="user in userStore.getRandomUsers">
            <img
              class="profile-picture"
              :src="user.profilePicture"
              :alt="user.displayName"
            />
            <div class="info">
              <p class="display-name">{{ user.displayName }}</p>
              <p class="user-name">@{{ user.userName }}</p>
            </div>
            <button class="follow-button">Seguir</button>
          </div>
        </div>
        <div class="footer">
          <a class="link" href="https://twitter.com/tos">Condiciones de Servicio</a>
          <a class="link" href="https://twitter.com/privacy">Política de Privacidad</a>
          <a class="link" href="https://support.twitter.com/articles/20170514"
            >Política de cookies</a
          >
          <a class="link" href="https://help.twitter.com/resources/accessibility"
            >Accesibilidad</a
          >
          <a
            class="link"
            href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo"
            >Información de anuncios</a
          >
          <span class="link">Más opciones...</span>
          <span class="link">© 2023 X Corp.</span>
        </div>
      </div>
    </aside>
    <div class="background" v-if="showMenu" @click="() => (showMenu = false)"></div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/mixins';
@import '@/assets/mixins';
$blueTwitter: #1b8bd6;
$darkBlueTwitter: #1685cf;

$lightGrey: #71767b;
$grey: #313131;
$darkGrey: #16181c;
$white: #e7e9ea;

.layout-container {
  color: $white;
  display: grid;
  grid-template-columns: 315px 550px 440px;
  justify-content: center;
  height: 100vh;
  overflow-y: scroll;

  .main-sidebar {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    padding: 15px;
    border-right: 1px solid $grey;
    padding-left: 50px;
    max-height: 100vh;
    z-index: 2;

    .item-list {
      font-size: 2.2rem;
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      align-items: flex-start;
      list-style: none;

      .item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        column-gap: 15px;
        padding: 8px 20px 8px 14px;
        border-radius: 64px;
        text-decoration: none;
        color: $white;
        cursor: pointer;
        transition: background-color ease-in 0.2s;

        &:hover {
          background-color: $grey;
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
        background-color: $blueTwitter;

        .icon {
          display: none;
        }

        .text {
          font-weight: bold;
          margin: auto;
        }

        &:hover {
          background-color: $darkBlueTwitter;
        }
      }

      .bold {
        font-weight: bold;
      }
    }

    .user {
      position: relative;
      display: flex;
      align-items: center;
      align-self: stretch;
      column-gap: 10px;
      margin-top: auto;
      padding: 8px 10px;
      font-size: 1.5rem;
      border-radius: 32px;
      transition: background-color 0.2s;
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

      &:hover.hover {
        background-color: $grey;
      }

      .submenu {
        position: absolute;
        bottom: calc(100% + 12px);
        left: -25px;
        display: flex;
        border-radius: 16px;
        padding: 12px 0;
        width: calc(100% + 50px);
        background-color: #000000;
        box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 15px,
          rgba(255, 255, 255, 0.15) 0px 0px 3px 1px;
        z-index: 2;

        &::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: calc(50% - 5px);
          width: 10px;
          height: 10px;
          background-color: #000000;
          box-shadow: rgba(255, 255, 255, 0.15) 2px 2px 2px 1px;
          transform: rotate(45deg);
        }

        .items {
          flex-direction: column;
          font-size: 1.5rem;
          font-weight: bold;
          width: 100%;

          .item {
            padding: 10px 20px;
            transition: background-color 0.2s;

            &:hover {
              background-color: $grey;
            }
          }
        }
      }
    }
  }

  .right-sidebar {
    position: sticky;
    top: 0px;
    border-left: 1px solid $grey;
    height: 100vh;
    overflow-y: scroll;
    @include hideScrollbar;

    .search-container {
      position: sticky;
      top: 0px;
      width: 100%;
      height: 52px;
      padding: 5px 55px 5px 25px;
      background-color: black;

      .search {
        position: relative;
        color: $lightGrey;
        font-size: 2rem;

        .icon {
          position: absolute;
          top: calc(0% + 0.9rem);
          left: 20px;
        }

        .input-search {
          width: 100%;
          padding: 12px 50px;
          border-radius: 32px;
          background-color: #202327;
          color: $lightGrey;
          font-size: 1.6rem;
          line-height: 1.6rem;
          border: none;
        }
      }
    }

    .sidebar-items {
      padding: 5px 55px 10px 25px;
      display: flex;
      flex-direction: column;
      font-size: 2rem;
      row-gap: 15px;

      .premium {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px 20px;
        row-gap: 8px;
        border-radius: 16px;
        background-color: $darkGrey;
        color: $white;
        font-weight: bold;

        .title {
          font-size: 2rem;
        }

        .body {
          font-size: 1.5rem;
        }

        .subscribe-button {
          background-color: $blueTwitter;
          padding: 10px 20px;
          font-size: 1.5rem;
          color: $white;
          font-weight: bold;
          border: none;
          border-radius: 32px;
          cursor: pointer;

          &:hover {
            background-color: $darkBlueTwitter;
            transform: background-color ease-in 0.3s;
          }
        }
      }

      .trends {
        display: flex;
        flex-direction: column;
        border-radius: 16px;
        background-color: $darkGrey;

        .title {
          font-weight: bold;
          padding: 10px 20px 5px;
          color: $white;
        }

        .trend {
          display: flex;
          padding: 15px 20px;
          color: $lightGrey;
          transition: background-color ease-in 0.2s;
          cursor: pointer;

          .info {
            display: flex;
            flex-direction: column;
            row-gap: 2px;
            font-size: 1.3rem;

            .name {
              font-size: 1.5rem;
              font-weight: bold;
              color: $white;
            }
          }

          .options {
            margin-left: auto;
          }

          &:hover {
            background-color: #202327;
          }

          &:last-child {
            border-radius: 0 0 16px 16px;
          }
        }
      }

      .follow {
        display: flex;
        flex-direction: column;
        border-radius: 16px;
        background-color: $darkGrey;

        .title {
          font-weight: bold;
          padding: 10px 20px 5px;
          color: $white;
        }

        .user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          font-size: 1.3rem;
          color: $lightGrey;
          transition: background-color ease-in 0.2s;
          cursor: pointer;

          .profile-picture {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
          }

          .info {
            .display-name {
              font-size: 1.5rem;
              font-weight: bold;
              color: $white;
            }
          }

          .follow-button {
            margin-left: auto;
            background-color: $white;
            color: $grey;
            padding: 5px 10px;
            font-size: 1.5rem;
            border: none;
            border-radius: 32px;
          }

          &:hover {
            background-color: $grey;
          }

          &:last-child {
            border-radius: 0 0 16px 16px;
          }
        }
      }

      .footer {
        color: $lightGrey;
        display: flex;
        flex-wrap: wrap;
        column-gap: 20px;
        padding: 20px;
        font-size: 1.4rem;

        .link {
          text-decoration: none;

          color: inherit;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}

@media screen and (max-width: 1200px) {
  .layout-container {
    grid-template-columns: 90px 450px min-content;

    .main-sidebar {
      padding: 10px 5px;

      .item-list {
        align-items: center;
        row-gap: 0px;

        .item {
          padding: 10px;

          .text {
            display: none;
          }
        }

        .item-post {
          align-self: center;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 3rem;

          .icon {
            display: block;
          }
        }
      }

      .user {
        align-self: center;

        .user-info {
          display: none;
        }

        .icon {
          display: none;
        }
        .submenu {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 0;
          padding: 12px 0;
          width: 280px;

          &::after {
            content: '';
            bottom: -5px;
            left: 30px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .layout-container {
    grid-template-columns: 90px auto;
    justify-content: stretch;

    .right-sidebar {
      display: none;
    }
  }
}
</style>
