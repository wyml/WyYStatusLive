<template>
  <div class="home">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card :elevation="hover ? 16 : 2" :loading="loading">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="headline">状态总览</v-list-item-title>
                  <v-list-item-subtitle>Overview</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-card-text>
                <v-row justify="center" align="center">
                  <v-col cols="4" class="green--text headline text-center">
                    <v-icon large color="green">mdi-brightness-1</v-icon>
                    <span class="ml-5">状态正常：{{ monitors.ok }}</span>
                  </v-col>
                  <v-col cols="4" class="red--text headline text-center">
                    <v-icon large color="red">mdi-brightness-1</v-icon>
                    <span class="ml-5">发生故障：{{ monitors.error }}</span>
                  </v-col>
                  <v-col cols="4" class="headline text-center">
                    <v-icon large color="black">mdi-brightness-1</v-icon>
                    <span class="ml-5">暂停监控：{{ monitors.stop }}</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <div class="headline">最近一次故障：</div>
                    <div
                      class="body-1"
                    >It was recorded (for the monitor 十载北林BLOG) on 2020-02-11 18:22:38 and the downtime lasted for 0 hrs, 0 mins.</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card :elevation="hover ? 16 : 2" :loading="loading">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="headline">监控面板</v-list-item-title>
                  <v-list-item-subtitle>DataCenter</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-data-table
                disable-pagination
                hide-default-footer
                calculate-widths
                :headers="headers"
                :items="monitors.list"
                style="font-size:20px;"
                :loading="loading"
              >
                <template v-slot:item.status="{item}">
                  <v-icon :color="item.status==2?'green':'red'">mdi-brightness-1</v-icon>
                </template>
                <template v-slot:item.rate="{item}">
                  <strong :class="item.status==2?'green--text':'red--text'">{{ item.rate }}%</strong>
                </template>
                <template v-slot:item.name="{item}">
                  <strong>{{ item.name }}</strong>
                </template>
                <template v-slot:item.rate_count="{item}">
                  <v-row no-gutters>
                    <v-col v-for="k of 7" :key="k" class="mr-1">
                      <v-progress-linear
                        height="25"
                        :value="!item.rate_count[k-1]?0:item.rate_count[k-1]"
                        :color="getColor(!item.rate_count[k-1]?0:item.rate_count[k-1])"
                      >
                        <span
                          class="white--text"
                        >{{ !item.rate_count[k-1]?0:item.rate_count[k-1] }}%</span>
                      </v-progress-linear>
                    </v-col>
                  </v-row>
                </template>
              </v-data-table>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card :elevation="hover ? 16 : 2" :loading="loading">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="headline">快速统计</v-list-item-title>
                  <v-list-item-subtitle>Quick Stats</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-card-text>
                <v-row align="center">
                  <v-col cols="6" class="body-1">
                    <v-icon>mdi-autorenew</v-icon>
                    下次刷新时间：{{ refresh }}
                  </v-col>
                </v-row>
              </v-card-text>
              <v-list>
                <v-list-item-group>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="green">mdi-brightness-1</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="green--text">
                        正常
                        <small>{{ monitors.ok }}</small>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="red">mdi-brightness-1</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="red--text">
                        故障
                        <small>{{ monitors.error }}</small>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="black">mdi-brightness-1</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        停止
                        <small>{{ monitors.stop }}</small>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  created() {
    this.getStatusData();
    this.refresh = process.env.VUE_APP_REFRESH_TIME;
    this.timer();
  },
  data: () => {
    return {
      headers: [
        {
          text: "状态",
          width: "3%",
          value: "status",
          align: "center",
          sortable: false
        },
        { text: "可用率", width: "5%", value: "rate", align: "center" },
        { text: "名称", width: "16%", value: "name", align: "left" },
        {
          text: "可用率信息(近7天)",
          value: "rate_count",
          align: "left",
          sortable: false
        }
      ],
      refresh: 60,
      loading: false,
      monitors: {
        list: [],
        ok: 0,
        error: 0,
        stop: 0
      }
    };
  },
  methods: {
    getColor(val) {
      if (val > 90) {
        return "green";
      } else if (val > 60) {
        return "deep-orange";
      } else {
        return "red";
      }
    },
    getStatusData() {
      this.loading = true;
      this.axios
        .post("", {
          logs: 1,
          log_types: "1-99",
          custom_uptime_ratios: "1-2-3-4-5-6-7-30"
        })
        .then(res => {
          let data = res.data;
          if (data.stat == "ok") {
            data.monitors.forEach(val => {
              this.monitors.list.push(this.dataFormat(val));
            });
          }
          this.loading = false;
        });
    },
    timer() {
      return window.setInterval(() => {
        if (this.refresh > 0) {
          this.refresh -= 1;
        } else {
          this.monitors = {
            list: [],
            ok: 0,
            error: 0,
            stop: 0
          };
          this.getStatusData();
          this.refresh = process.env.VUE_APP_REFRESH_TIME;
        }
      }, 1000);
    },
    dataFormat(data) {
      let array = data.custom_uptime_ratio.split("-");

      let res = {
        id: data.id,
        status: data.status,
        name: data.friendly_name,
        url: data.url,
        type: data.type,
        custom_uptiom_ratio: data.custom_uptime_ratio,
        rate: array[6],
        rate_count: array
      };

      if (data.status == 2) {
        this.monitors.ok += 1;
      } else if (data.status == 1) {
        this.monitors.error += 1;
      } else {
        this.monitors.stop += 1;
      }

      return res;
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
