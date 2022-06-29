<template>
    <kaiui-content>
        <video id="viewfinder" autoplay></video>
        <span id="message"></span>
        <kaiui-button 
            title="Camera view"
            v-bind:softkeys="softkeysPhone"
            v-on:softLeft="phoneButtonSoftleftClicked"
        />
    </kaiui-content>
</template>

<script>
import _ from 'lodash';
import QrcodeDecoder from 'qrcode-decoder';
var qr = new QrcodeDecoder();

export default {
    data() {
        return {
            softkeysPhone: { left: "BACK"},
            loading:true,
            cameraOptions:"",
            qrcodeData:""
        }
    },
    methods : {
        phoneButtonSoftleftClicked (){
            this.deInit();
            this.$router.push({ name: "wallet", params: { id:this.$route.query.walletId}});
        },
        async createCameraElement() {
            this._cameras = null;
            this._cameraObj = null;
            this.viewfinder = document.getElementById('viewfinder');
            this.message = document.getElementById('message');

            if (!navigator.mozCameras) {
                this.message.innerHTML = 'mozCameras does not exist';
                return;
            }
            this.setSource();
        },
        setSource (){
            const WHICH_CAMERA = 0;
            this.viewfinder.mozSrcObject = null;
            this._cameras = navigator.mozCameras.getListOfCameras();
            navigator.mozCameras.getCamera(this._cameras[WHICH_CAMERA])
                .then(
                this.gotCamera.bind(this),
                this.gotCameraError.bind(this)
                );
        },
        async gotCamera (params) {
            let camera = this._cameraObj = params.camera;
            let config = {
                pictureSize: this.getProperPictureSize(camera.capabilities.pictureSizes)
            };
            camera.setConfiguration(config);

            let transform = '';
            var style = this.viewfinder.style;
            let angle = camera.sensorAngle;
            transform += 'rotate(' + angle + 'deg)';

            style.MozTransform = transform;
            var width = '400';
            var height = '350';
            if (angle % 180 === 0) {
                style.top = 0;
                style.left = 0;
                style.width = width + 'px';
                style.height = height + 'px';
            } else {
                style.top = ((height / 2) - (width / 2)) + 'px';
                style.left = -((height / 2) - (width / 2)) + 'px';
                style.width = height + 'px';
                style.height = width + 'px';
            }

            this.viewfinder.mozSrcObject = camera;
            this.viewfinder.play();

            const code = await this.scanQRCode();
            if(code.data){
                this.qrcodeData = code.data;
                this.$toastr.s("Data Found:"+code.data)
                this.deInit();
                this.$router.push({ name: "wallet", params: { id:this.$route.query.walletId}, query: { qrData: code.data }});
            }
            this.cameraOptions = camera;
        },
        async scanQRCode() {
            try {
                return await qr.decodeFromVideo(this.viewfinder);
            } catch (error) {
                return error;
            }
        },
        gotCameraError() {
            // some log or do some thing
        },
        getProperPictureSize (sizes) {
            let delta, ratio, gradual = 1, index = 0;
            let screenRatio = document.body.clientWidth/ document.body.clientHeight;

            // get a picture size that's the largest and mostly eaqual to screen ratio
            for (let i = 0, len = sizes.length; i < len; i++) {
                ratio = sizes[i].height / sizes[i].width;
                if (ratio > 1) {
                    ratio = 1 / ratio;
                }
                delta = Math.abs(screenRatio - ratio);
                if (delta < gradual || (delta === gradual &&
                    sizes[index].height * sizes[index].width < sizes[i].height * sizes[i].width)) {
                    gradual = delta;
                    index = i;
                }
            }
            return sizes[index];
        },
        startPreview: function() {
            this.viewfinder.play();
            this.setSource();
        },
        visibilityChange: function() {
            console.log('test');
            if (document.mozHidden) {
                this.stopPreview();
            } else {
                this.startPreview();
            }
            
            if (this._cameraObj) {
                this._cameraObj.release().then(function() {
                    self._cameraObj = null;
                }, function() {
                    console('fail to release camera');
                });
            }
        },
        stopPreview () {
            this.viewfinder.pause();
            this.viewfinder.mozSrcObject = null;
        },
        deInit () {
            console.log('camera page');
            this.stopPreview();
            if (this._cameraObj) {
                this._cameraObj.release().then(() => {
                this._cameraObj = null;
                }, function() {
                    console('fail to release camera');
                });
            }
        }
    },
    mounted(){
        this.createCameraElement();
    }
}
</script>