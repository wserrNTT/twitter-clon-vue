<script lang="ts" setup>
import { ITweet } from '@/common/types';
import { Icon } from "@iconify/vue"

defineProps<{ tweet: ITweet }>()

// returns amount of hours since Date
const toHours = (date: Date) => {
  const currentTime = new Date().valueOf()
  const seconds = (currentTime - date.valueOf()) / 1000
  console.log(seconds);
  // format in case of seconds
  if (seconds <= 60) return `${Math.floor(seconds)}s`
  // format in case of minutes
  if (seconds <= 3600) return `${Math.floor(seconds / 60)}m`
  // format in case of minutes
  if (seconds <= 86400) return `${Math.floor(seconds / 1440)}h`
  return date.toLocaleString('default', { day: '2-digit', month: 'short' }).replace("-", " ")
}
</script>

<template>
  <div class="tweet">
    <div class="profile-container">
      <img :src="tweet.author.profilePicture" :alt="`profile picture of ${tweet.author.displayname}`">
    </div>
    <div class="data">
      <div class="user-data">
        <p class="display-name">
          {{ tweet.author.displayname }}
        </p>
        <p class="user-name">
          @{{ tweet.author.username }}
        </p>·
        <p class="timestamp">
          {{ toHours(tweet.timestamp) }}
        </p>
        <div class="options">
          <Icon icon="mi:options-horizontal" class="icon" />
        </div>
      </div>
      <div class="tweet-body">
        {{ tweet.body }}
        <img class="picture" :src="tweet.picture" alt="" v-if="tweet.picture">
      </div>
      <div class="interactions">
        <div class="interaction comments">
          <Icon class="icon" icon="majesticons:comment-2-line" />
          {{ tweet.comments }}
        </div>
        <div class="interaction reposts">
          <Icon class="icon" icon="bx:repost" />
          {{ tweet.reposts }}
        </div>
        <div class="interaction likes">
          <Icon class="icon" icon="mdi:heart-outline" />
          {{ tweet.likes }}
        </div>
        <div class="interaction views">
          <Icon class="icon" icon="ion:stats-chart" />
          {{ tweet.views }}
        </div>
        <div class=" save">
          <Icon class="icon" icon="akar-icons:ribbon" />
        </div>
        <div class=" share">
          <Icon class="icon" icon="fluent:share-ios-24-filled" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$blueTwitter: #1b8bd6;
$greenTwitter: #1bd688;
$redTwitter: #d61b88;

$darkBlueTwitter: #1685cf;

$lightGrey: #71767b;
$grey: #313131;
$darkGrey: #16181c;
$white: #e7e9ea;

.tweet {
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

  .data {
    .user-data {
      display: flex;
      gap: 5px;
      font-size: 1.4rem;
      color: $lightGrey;

      .display-name {
        font-weight: bold;
        color: $white;
      }

      .options {
        margin-left: auto;
        font-size: 1.8rem;
      }
    }

    .tweet-body {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 1.6rem;

      .picture {
        width: 100%;
        height: auto;
        border-radius: 16px;
        border: solid 1px $grey;
      }
    }

    .interactions {
      display: flex;
      padding-top: 5px;
      font-size: 1.4rem;
      color: $lightGrey;

      .interaction {
        display: flex;
        align-items: center;
        flex: auto;
        cursor: pointer;
        transition: color 0.3s;

        .icon {
          padding: 10px;
          border-radius: 50%;
          box-sizing: content-box;
          transition: background-color 0.3s;
        }
      }

      .comments {
        .icon {
          font-size: 1.8rem;
        }

        &:hover {
          color: $blueTwitter;

          .icon {
            background-color: darken($blueTwitter, 40%);
          }
        }
      }

      .reposts {
        .icon {
          font-size: 2rem;
        }

        &:hover {
          color: $greenTwitter;

          .icon {
            background-color: darken($greenTwitter, 40%);
          }
        }
      }

      .likes {
        .icon {
          font-size: 2rem;
        }

        &:hover {
          color: $redTwitter;

          .icon {
            background-color: darken($redTwitter, 40%);
          }
        }
      }

      .views {

        &:hover {
          color: $blueTwitter;

          .icon {
            background-color: darken($blueTwitter, 40%);
          }
        }
      }

      .save,
      .share {
        display: flex;
        align-items: center;
        cursor: pointer;


        .icon {
          padding: 10px;
          border-radius: 50%;
          box-sizing: content-box;
          transition: background-color 0.3s;
          font-size: 1.8rem;

          &:hover {
            background-color: darken($blueTwitter, 40%);
            color: $blueTwitter;
          }
        }
      }
    }
  }
}
</style>