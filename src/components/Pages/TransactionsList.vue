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
          :primaryText="`${item['date']}`"
          :secondaryText="`Amount: ${item['amount']}`"
          :tertiaryText="item['status']"
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
          <div class="transaction-value--t">Date</div>
          <div class="transaction-value--v">{{ selectedTransaction['date'] }}</div>
        </div>

        <div class="transaction-value" v-bind:nav-selectable="true">
          <div class="transaction-value--t">Amount</div>
          <div class="transaction-value--v">{{ selectedTransaction['amount'] }}</div>
        </div>

        <div class="transaction-value" v-bind:nav-selectable="true">
          <div class="transaction-value--t">Gas</div>
          <div class="transaction-value--v">{{ selectedTransaction['gas'] }}</div>
        </div>

        <div class="transaction-value" v-bind:nav-selectable="true">
          <div class="transaction-value--t">From</div>
          <div class="transaction-value--v">{{ selectedTransaction['fromAddress'] }}</div>
        </div>

        <div class="transaction-value" v-bind:nav-selectable="true">
          <div class="transaction-value--t">To</div>
          <div class="transaction-value--v">{{ selectedTransaction['toAddress'] }}</div>
        </div>
      </div>
    </kaiui-dialog>
  </kaiui-content>
</template>

<script>
import i18n from '@/lang/setup';

export default {
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
    async getTransactions() {
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
      console.log(item);

      this.selectedTransaction = item;
      this.showTransactionInfoDialog = true;
    },
    closeTransactionInfoDialog() {
      this.showTransactionInfoDialog = false;
      this.selectedTransaction = null;
    }
  },
  async mounted () {
    const { requestSaveContact } = this.$route.query;

    this.getTransactions();

    // If requestSaveContact was set in the query params,
    // show a popup to ask the user if they want to save this address as a new contact
    if(requestSaveContact) {
      this.showDialog(i18n.t('pages.contacts.create'), i18n.t('pages.contacts.saveRequest'), {
        left: i18n.t('cancel'),
        right: i18n.t('agree')
      }, () => this.gasFee = null, () => {
        this.$router.push({
          name: 'newcontact',
          query: {
            address: requestSaveContact
          }
        })
      });
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
