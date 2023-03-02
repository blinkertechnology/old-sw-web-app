<template>
  <kaiui-content>
    <kaiui-header :title="$t('title')" />
    <kaiui-separator :title="$t('pages.transactions.title')" />
    <div v-if="loading" class="loader">
      <img src="/assets/loader.gif" />
    </div>
    <div v-else>
      <div v-if="transactions.length < 1" class="no-transactions">
        <div class="no-transactions__title">{{ $t('pages.transactions.noTransactions') }}</div>

        <kaiui-button
          :title="$t('pages.transactions.makeTransaction')"
          :softkeys="softkeysButton"
          v-on:softCenter="toMakeTransaction"
          v-on:softLeft="goBack"
        />
      </div>
      <div
        v-else
        v-for="item in transactions"
        :key="item['hash']"
        class="customclass row lead border mb-3"
        nav-selectable="true"
      >
        <div class="col-sm-5 col-md-6">Secret Type: <b>Ethereum</b></div>
        <div class="col-sm-5 col-md-6">
          Status:
          <b>{{ item["txreceipt_status"] === "1" ? "Success" : "Fail" }}</b>
        </div>
        <div class="col-sm-5 col-md-6">
          Amount: <b>{{ item["value"] / 1000000000000000000 }}</b>
        </div>
        <div class="col-sm-5 col-md-6">Transaction From:</div>
        <div class="address">
          <b>{{ item["from"] }}</b>
        </div>
        <div class="col-sm-5 col-md-6">Transaction To:</div>
        <div class="address">
          <b>{{ item["to"] }}</b>
        </div>
        <div class="col-sm-5 col-md-6">Transaction At:</div>
        <div class="address">
          <b>{{ new Date(item["timeStamp"] * 1000).toLocaleString() }}</b>
        </div>
      </div>
    </div>
    <SoftKey 
      :softkeys.sync="softkeys" 
      v-on:softLeft="goBack"
    />
  </kaiui-content>
</template>

<script>
import SoftKey from "../SoftKey";
import i18n from '@/lang/setup';

export default {
  components: {
    SoftKey
  },
  data() {
    return {
      items: null,
      loading: true,
      softkeysButton: {
        left: i18n.t('back'),
        center: i18n.t('select')
      },
      softkeys: {
        left: i18n.t('back'),
      },

      wallet: null,
      transactions: [],
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        name: "dashboard",
      });
    },
    toMakeTransaction() {
      this.$router.push({
        name: "maketransaction",
        param: { 
          id: this.$route.params.id
        }
      });
    }
  },
  async mounted () {
    try {
      const response = await this.$http.get(
        `wallet/${this.$route.params.id}/transactions`,
        {
          params: {
            ...(this.$route.params.token ? { token: this.$route.params.token } : {})
          }
        }
      );
      const { wallet, transactions } = response.data;

      this.wallet = wallet;
      this.transactions = Array.isArray(transactions) ? transactions : [];
    } catch(err) {
      console.log(err);
      this.showDialog(i18n.t('genericErrorTitle'), err.generic);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.mb-3 {
  padding-left: 14px;
  margin: 15px;
  border-bottom: 1px solid grey;
}
.loader {
  text-align: center;
}
.address {
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}
.customclass {
  text-align: center;
}

.no-transactions {
  padding: 20px;
}
.no-transactions__title {
  font-size: 18px;
  font-weight: 700;

  text-align: center;
}
</style>
