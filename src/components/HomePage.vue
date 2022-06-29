<template>
  <kaiui-content>
    <kaiui-header title="Sorted Wallet - Home" />
        <kaiui-button
          v-on:softCenter="phoneButtonSoftCenterClickedLogin"
          title="Login"
        />        
        <kaiui-button
          v-on:softCenter="phoneButtonSoftCenterClickedRegister"
          title="Register"
        />
    </kaiui-content>
</template>

<script>

export default {
    data: () => ({

    }),
    methods: {
        phoneButtonSoftCenterClickedLogin()  {  
            this.$router.push({ name: "login" });
        },
        phoneButtonSoftCenterClickedRegister() {
            this.$router.push({ name: "register" });
        }
    },
    created(){
        var userId = localStorage.getItem('user_id');
        if(userId !== null){
            this.$router.push({ name: "dashboard" });
        }
    }
};
</script>
