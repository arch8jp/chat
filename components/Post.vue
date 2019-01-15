<template>
  <div>
    <v-list-tile>
      <v-list-tile-avatar>
        <v-icon :style="{ color: `hsl(${post.color}, 80%, 60%)` }" large>account_circle</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ post.message }}</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-list-tile-action-text>
          <time
            :datetime="new Date(post.created_at).toISOString()"
          >{{ fromNowLocalTime(post.created_at) }}</time>
        </v-list-tile-action-text>
      </v-list-tile-action>
    </v-list-tile>
    <v-divider/>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: { post: { type: Object, required: true } },
  methods: {
    fromNowLocalTime(timestamp) {
      const datetime = moment(timestamp);
      datetime.locale("ja");
      return datetime.fromNow();
    }
  }
};
</script>
