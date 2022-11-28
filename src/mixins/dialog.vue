<script>
export default {
    methods: {
        showDialog(title, message) {
            this.$root.$emit('show-dialog', {
                title,
                message,
            });
        },
        hideDialog() {
            this.$root.$emit('hide-dialog');
        }
    }
}
</script>