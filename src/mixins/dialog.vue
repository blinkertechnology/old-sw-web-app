<script>
export default {
    methods: {
        showDialog(title, message, softkeys, onSoftLeft, onSoftRight) {
            this.$root.$emit('show-dialog', {
                title,
                message,
                softkeys,
                onSoftLeft,
                onSoftRight
            });
        },
        hideDialog() {
            this.$root.$emit('hide-dialog');
        }
    }
}
</script>