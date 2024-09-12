<template>
  <div class="app">
    <h1>Vue Cropper 画像編集アプリ</h1>

    <!-- 画像アップロード部分 -->
    <input type="file" @change="onFileChange" />

    <!-- 画像を切り取るためのVueCropper -->
    <vue-cropper
      ref="cropper"
      :guides="true"
      :view-mode="2"
      drag-mode="crop"
      :auto-crop-area="0.8"
      :background="true"
      :rotatable="true"
      :src="cropperOptions.img"
      alt="Source Image"
      :img-style="{ 'width': '600px', 'height': '400px' }">
    </vue-cropper>

    <!-- ボタンでCanvasに描画 -->
    <button @click="drawCanvas">Canvasに描画</button>

    <!-- Canvas表示 -->
    <h3>編集した画像</h3>
    <canvas id="canvas" class="img-canvas" width="680" height="480" ref="canvas"></canvas>
    
    <!-- Canvasの内容を画像として表示 -->
    <h3>生成された画像</h3>
    <img :src="imageSrc" alt="Canvas Image Result" v-if="imageSrc">

    <!-- ダウンロードリンク -->
    <a :href="imageSrc" download="cropped-image.jpg" v-if="imageSrc">画像をダウンロード</a>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'vue-cropperjs/dist/vue-cropper.css';

export default {
  components: {
    VueCropper
  },
  data() {
    return {
      cropperOptions: {
        img: null // ここにアップロードされた画像が入る
      },
      imageSrc: '' // 生成された画像データのURL
    };
  },
  methods: {
    // 画像アップロード処理
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.cropperOptions.img = e.target.result; // Cropperに画像をセット
        };
        reader.readAsDataURL(file); // 画像の読み込み
      }
    },
    // Canvasに描画して画像を生成
    drawCanvas() {
      if (this.$refs.cropper && this.$refs.cropper.getCroppedCanvas) {
        // Cropperから切り取った画像のCanvasデータを取得
        const croppedDataURL = this.$refs.cropper.getCroppedCanvas().toDataURL('image/jpeg');
        
        // Canvasに描画
        const canvas = this.$refs.canvas;
        const context = canvas.getContext('2d');
        
        // 一旦Canvasをクリア
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // 新しいImageオブジェクトを生成して、取得した画像データを描画
        const img = new Image();
        img.src = croppedDataURL;
        img.onload = () => {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // 生成したCanvasの内容をJPEGとして保存
          this.imageSrc = canvas.toDataURL('image/jpeg');
        };
      }
    }
  }
};
</script>

<style>
.app {
  text-align: center;
  margin-top: 20px;
}

.img-canvas {
  border: 1px solid black;
  margin-top: 20px;
}
</style>
