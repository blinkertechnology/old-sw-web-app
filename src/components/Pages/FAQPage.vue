<template>
    <div>
        <kaiui-separator :title="$t('faq.title')" />

        <kaiui-text v-for="l, i in introduction.split('\n')" :text="l" :key="i" />

        <div v-for="block, index in blocks" :key="`block-${index}`">
            <kaiui-text :text="`${index + 1}. ${block.title}`" class="block-title" />

            <div v-for="q, index in block.body" :key="`faq-${index}`">
                <kaiui-text :text="q[0]" class="title" />

                <kaiui-text v-for="l, i in q[1].split('\n')" :text="l" :key="i" />
            </div>
        </div>
    </div>
</template>

<script>
import i18n from '@/lang/setup';

export default {
    data: () => ({
        introduction: i18n.t('faq.introduction'),
        blocks: i18n.t('faq.blocks')
    }),
}
</script>

<style scoped>
.block-title {
    font-size: 20px;
    font-weight: 700;
}
.title {
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 0 !important;
}
</style>