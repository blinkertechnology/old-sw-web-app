<template>
    <kaiui-content>
        <div class="offline-container">
            <div class="title">{{ $t('offline.title') }}</div>
            <div class="text">{{ $t('offline.text') }}</div>
            <kaiui-button 
                :title="$t('offline.refresh')" 
                v-on:softCenter="refresh" 
                :softkeys="{
                    center: $t('offline.refresh')
                }"
            />
        </div>
    </kaiui-content>
</template>

<script>
export default {
    mounted() {

    },
    methods: {
        refresh() {
            this.showLoading();

            setTimeout(() => {
                this.hideLoading();

                const isOnline = navigator.onLine;
                if(isOnline) {
                    this.$router.push({
                        name: 'dashboard'
                    })
                }
            }, 1000);
        }
    }
}
</script>

<style scoped>
.offline-container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 100%;
    height: 100%;

    padding-top: 25px;
    padding-left: 15px;
    padding-right: 15px;
}
.title {
    font-weight: 700;
    font-size: 18px;

    margin-bottom: 15px;
}
.text {
    font-size: 14px;

    margin-bottom: 15px;
}
</style>