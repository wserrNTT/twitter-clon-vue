<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useLoginStore } from '@/store/login.store';
import { useTweetStore } from '@/store/tweet.store';

import { postTweet } from '@/utils/axios';

import { Icon } from '@iconify/vue';
import Loader from '@/components/Loader.vue';
import Tweet from '@/components/Tweet.vue';

const currentTab = ref('forYou');

let newPost = reactive({
  body: '',
  loading: false,
  error: ''
});

const loginStore = useLoginStore();
const tweetStore = useTweetStore();

const handlePost = async () => {
  newPost.loading = true;
  try {
    await postTweet({
      author: loginStore.data._id,
      body: newPost.body,
      timeStamp: new Date().toString()
    });
    newPost = { body: '', loading: false, error: '' };
    tweetStore.fetchTweets();
  } catch (error) {
    newPost = {
      body: '',
      loading: false,
      error: 'Lo sentimos, no ha sido posible publicar'
    };
  }
};

onMounted(() => {
  tweetStore.fetchTweets();
});
</script>

<template>
  <div class="home-container">
    <div class="tabs">
      <div
        class="tab"
        :class="{ 'tab-active': currentTab === 'forYou' }"
        @click="currentTab = 'forYou'"
      >
        <p class="text">Para ti</p>
      </div>
      <div
        class="tab"
        :class="{ 'tab-active': currentTab === 'following' }"
        @click="currentTab = 'following'"
      >
        <p class="text">Siguiendo</p>
      </div>
      <div class="settings">
        <Icon class="icon" icon="mi:settings" />
      </div>
    </div>
    <div class="post-container">
      <div class="profile-container">
        <img
          :src="loginStore.data.profilePicture"
          :alt="`profile picture of ${loginStore.data.displayName}`"
        />
      </div>
      <form class="input-container" @submit.prevent="handlePost">
        <div v-if="newPost.loading" class="loader-container">
          <Loader />
        </div>
        <input
          v-if="!newPost.loading"
          v-model="newPost.body"
          class="new-tweet"
          type="text"
          placeholder="¡¿Qué está pasando?!"
        />
        <div v-if="!newPost.loading" class="options">
          <button
            type="submit"
            class="post-button"
            :class="{ disabled: newPost.body.length === 0 }"
          >
            Postear
          </button>
        </div>
      </form>
    </div>
    <div class="tweets-container">
      <Tweet v-for="tweet in tweetStore.tweets" :tweet="tweet" :key="tweet._id" />
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
    top: 0;
    display: flex;
    height: 52px;
    border-bottom: solid 1px $grey;
    overflow: hidden;

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
          content: '';
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

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background-color: rgba(black, 0.8);
      -webkit-backdrop-filter: blur(12px);
      backdrop-filter: blur(12px);
      z-index: 0;
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
      .loader-container {
        display: flex;
        justify-content: center;
      }

      .new-tweet {
        padding-top: 5px;
        background-color: transparent;
        border: none;
        font-size: 2rem;
        outline: none;
        color: $white;
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
          &.disabled {
            background-color: #0f4e78;
            color: #808080;
            pointer-events: none;
          }
        }
      }
    }
  }
  .tweets-container {
    display: flex;
    flex-direction: column-reverse;

    .loader-container {
      display: flex;
      justify-content: center;
      margin: 10px;
    }
  }
}
</style>
