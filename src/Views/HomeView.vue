<script lang="ts" setup>
import { ref } from "vue"
import { Icon } from "@iconify/vue"
import { useLoginStore } from "@/store/login.store";

const currentTab = ref("forYou")
const loginStore = useLoginStore()
</script>

<template>
  <div class="home-container">
    <div class="tabs">
      <div class="tab" :class="{ 'tab-active': currentTab === 'forYou' }" @click="currentTab = 'forYou'">
        <p class="text">Para ti</p>
      </div>
      <div class="tab" :class="{ 'tab-active': currentTab === 'following' }" @click="currentTab = 'following'">
        <p class="text">Siguiendo</p>
      </div>
      <div class="settings">
        <Icon class="icon" icon="mi:settings" />
      </div>
    </div>
    <div class="post-container">
      <div class="profile-container">
        <img :src="loginStore.getProfilePicture" :alt="`profile picture of ${loginStore.getDisplayname}`">
      </div>
      <div class="input-container">
        <input class="new-tweet" type="text" placeholder="¡¿Qué está pasando?!">
        <div class="options">
          <button type="button" class="post-button">
            Postear
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$blueTwitter: #1b8bd6;
$darkBlueTwitter: #1685cf;

$lightGrey: #71767b;
$grey: #313131;
$darkGrey: #16181c;
$white: #e7e9ea;

.home-container {

  .tabs {
    position: sticky;
    display: flex;
    height: 52px;
    border-bottom: solid 1px $grey;

    .tab {
      flex: auto;
      display: flex;
      align-items: stretch;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.3s;

      .text {
        position: relative;
        padding: 0 5px;
        display: flex;
        align-items: center;
        font-size: 1.6rem;
        font-weight: bold;
      }

      &-active {

        .text::after {
          content: "";
          position: absolute;
          height: 4px;
          width: 100%;
          bottom: 0;
          left: 0;
          border-radius: 4px;
          background-color: $blueTwitter;

        }
      }

      &:hover {
        background-color: $grey;
      }
    }

    .settings {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      width: 60px;

      .icon {
        padding: 7.5px;
        box-sizing: content-box;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
          background-color: $grey;
        }
      }
    }
  }

  .post-container {
    display: flex;
    border-bottom: solid 1px $grey;
    padding: 15px;

    .profile-container {
      padding-right: 10px;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;

      }
    }

    .input-container {
      flex: auto;
      display: flex;
      flex-direction: column;

      gap: 10px;

      .new-tweet {
        background-color: transparent;
        border: none;
        font-size: 2rem;
        outline: none;
        color: $lightGrey;
      }

      .options {
        display: flex;

        .post-button {
          margin-left: auto;
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
    }
  }

}
</style>
