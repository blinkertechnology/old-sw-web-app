<script>
export default {
    methods: {
        showLoading() {
            this.$root.$emit('show-loading');
        },
        hideLoading() {
            this.$root.$emit('hide-loading');
        }
    }
}
</script>