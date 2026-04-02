const Camera = {
    stream: null,

    init: async function (videoElement) {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: "user"
                },
                audio: false
            });
            videoElement.srcObject = this.stream;
            return true;
        } catch (err) {
            console.error("Camera access error:", err);
            alert("Could not access camera. Please allow camera permissions.");
            return false;
        }
    },

    capture: function (videoElement) {
        if (!this.stream) return null;

        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        const ctx = canvas.getContext('2d');
        // Flip horizontally for mirror effect
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoElement, 0, 0);

        return canvas.toDataURL('image/jpeg', 0.8);
    },

    stop: function () {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
    }
};
