<script>
export default {
    methods: {
        showLoading(title = "") {
            this.$root.$emit('show-loading');
        },
        hideLoading() {
            this.$root.$emit('hide-loading');
        }
    }
}
</script>