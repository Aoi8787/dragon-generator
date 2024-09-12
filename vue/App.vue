<template>
  <div class="app">
    <h1>画像生成アプリ</h1>

    <!-- テキスト入力 -->
    <input v-model="text" placeholder="画像に追加するテキストを入力" />

    <!-- ボタンでCanvasに描画 -->
    <button @click="drawCanvas">画像を生成</button>

    <!-- Canvas表示 -->
    <h3>生成された画像</h3>
    <canvas ref="canvas" class="img-canvas" width="680" height="480"></canvas>

    <!-- Canvasの内容を画像として表示 -->
    <h3>生成された画像プレビュー</h3>
    <img :src="imageSrc" alt="Canvas Image Result" v-if="imageSrc">

    <!-- ダウンロードリンク -->
    <a :href="imageSrc" download="generated-image.jpg" v-if="imageSrc" class="download-link">画像をダウンロード</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '', // ユーザーが入力するテキスト
      imageSrc: '', // 生成された画像データのURL
      templateImageSrc: require('@/assets/images/ロボカス.png') // テンプレート画像のパス
    };
  },
  methods: {
    drawCanvas() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');

      // テンプレート画像を読み込み
      const templateImage = new Image();
      templateImage.src = this.templateImageSrc;

      // 画像がロードされたらCanvasに描画
      templateImage.onload = () => {
        // Canvasをクリア
        context.clearRect(0, 0, canvas.width, canvas.height);

        // テンプレート画像をCanvasに描画
        context.drawImage(templateImage, 0, 0, canvas.width, canvas.height);

        // テキストのスタイル設定
        context.font = '40px Arial'; // フォント設定
        context.fillStyle = 'white'; // テキストの色
        context.textAlign = 'center'; // テキストを中央揃え

        // テキストをCanvasに描画
        context.fillText(this.text, canvas.width / 2, canvas.height / 2);

        // 生成したCanvasの内容を画像として保存
        this.imageSrc = canvas.toDataURL('image/jpeg');
      };

      // エラーハンドリング
      templateImage.onerror = () => {
        console.error("画像の読み込みに失敗しました。パスを確認してください。");
      };
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

.download-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.download-link:hover {
  background-color: #45a049;
}
</style>
