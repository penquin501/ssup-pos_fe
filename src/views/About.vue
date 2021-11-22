<template>
  <div class="container-fuild">
    <v-card height="600" width="256" class="mx-auto">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6"  style="text-align: center">
              <img src="img/auth/ssup-logo.svg" width="200" height="50" />
            </v-list-item-title>
            <!-- <v-list-item-subtitle>
              subtext
            </v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item v-for="item in items" :key="item.title" link style="margin-top: 20px; margin-bottom: 20px;">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <router-link :to="item.link">{{ item.title }}</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-card>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-monitor mdi-48px', link: '/dashboard' },
          { title: 'Sale', icon: 'mdi-cart-plus mdi-48px', link: '/sale' },
          { title: 'Stock', icon: 'mdi-bank mdi-48px', link: '/stock' },
          { title: 'Member Register', icon: 'mdi-account-card-details mdi-48px', link: '/member' },
          { title: 'Off Promotion', icon: 'mdi-wallet-giftcard mdi-48px', link: '/offpromotion' },
          { title: 'Report', icon: 'mdi-chart-areaspline mdi-48px', link: '/report' },
          { title: 'Tools', icon: 'mdi-settings mdi-48px', link: '/tools' },
          { title: 'Audit', icon: 'mdi-briefcase-check mdi-48px', link: '/audit' },
        ],
        right: null,
      }
    },
    mounted: function() {
      if (this.$store.state.is_login == false) {
        this.$router.push({ name: "Home" });
      }
    },
  }
</script>