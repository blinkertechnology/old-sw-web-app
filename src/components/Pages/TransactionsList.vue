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
      
      <div v-else>
        <list-item 
          v-for="item in transactions"
          :softkeys="softkeysListItem"
          v-on:softLeft="goBack"
          v-on:softCenter="$event => viewDetails(item)"
          :key="item['hash']"
          :primaryText="`${new Date(item['timeStamp'] * 1000).toLocaleString()}`"
          :secondaryText="`To: ${item['to']}`"
          :tertiaryText="item['txreceipt_status'] === '1' ? 'Success' : 'Failed'"
        />
      </div>
    </div>

    <kaiui-dialog
      title="Transaction details"
      v-model="showTransactionInfoDialog"
      :softkeys="softkeys"
      v-on:softLeft="closeTransactionInfoDialog"
    >
      <div v-if="selectedTransaction">
        <div class="transaction-value" v-bind:nav-selectable="true" >
          <div class="transaction-value--t">Status</div>
          <div class="transaction-value--v">{{ selectedTransaction['txreceipt_status'] === '1' ? 'Success' : 'Failed' }}</div>
        </div>

        <div class="transaction-value" v-bind:nav-selectable="true" >
          <div class="transaction-value--t">Hash</div>
          <div class="transaction-value--v">{{ selectedTransaction['hash'] }}</div>
        </div>

        <div class="transaction-value" v-bind:nav-selectable="true">
          <div class="transaction-value--t">Value</div>
          <div class="transaction-value--v">{{ selectedTransaction['value'] }}</div>
        </div>

        <div class="transaction-value" v-bind:nav-selectable="true">
          <div class="transaction-value--t">Gas</div>
          <div class="transaction-value--v">{{ selectedTransaction['gas'] }}</div>
        </div>

        <div class="transaction-value" v-bind:nav-selectable="true">
          <div class="transaction-value--t">From</div>
          <div class="transaction-value--v">{{ selectedTransaction['from'] }}</div>
        </div>

        <div class="transaction-value" v-bind:nav-selectable="true">
          <div class="transaction-value--t">To</div>
          <div class="transaction-value--v">{{ selectedTransaction['to'] }}</div>
        </div>
      </div>
    </kaiui-dialog>

    <SoftKey 
      v-if="!selectedTransaction"
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
      showTransactionInfoDialog: false,
      selectedTransaction: null,

      items: null,
      loading: true,
      softkeysButton: {
        left: i18n.t('back'),
        center: i18n.t('select')
      },
      softkeysListItem: {
        left: i18n.t('back'),
        center: i18n.t('view')
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
    },
    viewDetails(item) {
      this.selectedTransaction = item;
      this.showTransactionInfoDialog = true;
    },
    closeTransactionInfoDialog() {
      this.showTransactionInfoDialog = false;
      this.selectedTransaction = null;
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

.transaction-value {
  padding: 10px;
}
.transaction-value--t {
  font-weight: 700;
}
.transaction-value--v {
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
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
