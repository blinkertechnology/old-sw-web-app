<template>
    <kaiui-content>
        <kaiui-header title="Sorted Wallet" />
            <div id="camera-wapper">
                <span id="message"></span>
                <video id="viewfinder" autoplay></video>
            </div>
            <SoftKey :softkeys.sync="softkeys" />
    </kaiui-content>
</template>

<script>
import _ from 'lodash';
import QrcodeDecoder from 'qrcode-decoder';
var qr = new QrcodeDecoder();
import SoftKey from "../SoftKey";

export default {
    components: {
      SoftKey
    },
    data() {
        return {
            softkeys: {
                left: "Back",
                center: "",
                right: ""
            },
            loading:true,
            cameraOptions:"",
            qrcodeData:"",
            curruntwalletId: ""
        }
    },
    methods : {
        phoneButtonSoftleftClicked (){
            this.deInit();
            this.$router.push({ name: "maketransaction", query: { walletId: this.curruntwalletId }});
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
            var width = document.body.clientWidth;
            var height = document.body.clientHeight;

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
                this.$toastr.s("The QR code is scanned successfully.")
                this.deInit();
                this.$router.push({ name: "maketransaction", query: { qrData: code.data, walletId: this.curruntwalletId }});
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
            this.stopPreview();
            if (this._cameraObj) {
                this._cameraObj.release().then(() => {
                this._cameraObj = null;
                }, function() {
                    console('fail to release camera');
                });
            }
        },
        onKeyDown(event) {
          switch (event.key) {
            case "SoftLeft":
              return this.sendBack()
            default:
              break;
          }
        },
        sendBack() {
            this.$router.push({ name: "maketransaction", query: { walletId: this.curruntwalletId }});
        }
    },
    mounted(){
        this.curruntwalletId = this.$route.query.walletId;
        this.createCameraElement();
        document.addEventListener('keydown', this.onKeyDown);
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.onKeyDown);
    }
}
</script>

<style scoped>
#camera-wapper{
    height: 100%;
    width: 100%;
    font-size: 10px;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

#viewfinder {
    position: absolute;
}
</style>