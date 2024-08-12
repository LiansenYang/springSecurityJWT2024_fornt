<template>
  <div>
    <h2>上传图片</h2>
    <input type="file" multiple @change="handleFileUpload" />
    <div class="preview">
      <div v-for="(image, index) in images" :key="index" class="image-container">
        <img :src="image.url" alt="Uploaded Image" />
        <button @click="removeImage(index)">×</button>
      </div>
    </div>
    <button @click="submitImages">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [], // 保存图片的 URL 和 File 对象
    };
  },
  methods: {
    handleFileUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images.push({
            file: file,
            url: e.target.result, // 预览图片
          });
        };
        reader.readAsDataURL(file);
      }
    },
    removeImage(index) {
      this.images.splice(index, 1); // 移除图片
    },
    async submitImages() {
      const formData = new FormData();
      this.images.forEach((image, index) => {
        formData.append(`files`, image.file);
      });
      try {
        const response = await this.$http.post('/api/file/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Uploaded Image URLs:', response.data);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    },
  },
};
</script>

<style scoped>
.preview {
  display: flex;
  flex-wrap: wrap;
}
.image-container {
  position: relative;
  margin-right: 10px;
}
.image-container img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.image-container button {
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
