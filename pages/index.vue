<template>
  <div>
    <h1>チャット</h1>
    <v-form @submit.prevent="onSubmit">
      <v-layout row wrap>
        <v-flex xs6 md4>
          <v-text-field v-model="message" required/>
        </v-flex>
        <v-flex xs6 md4>
          <v-btn class="primary" type="submit">送信</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
    <v-list two-line>
      <post v-for="(post, i) in posts" :key="i" :post="post"/>
    </v-list>
  </div>
</template>

<script>
import Post from "~/components/Post.vue";
export default {
  components: { Post },
  data() {
    return { message: "", posts: [] };
  },
  methods: {
    onSubmit() {
      this.$socket.emit("message", this.message);
      this.message = "";
    }
  },
  sockets: {
    post(post) {
      this.posts.unshift(post);
    }
  }
};
</script>
