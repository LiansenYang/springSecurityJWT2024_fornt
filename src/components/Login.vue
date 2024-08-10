<template>
  <div class="login">
    <h2>登录</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">用户名:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">登录</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await this.$http.post('/api/auth/login?username='+this.username+'&password='+this.password, { // 使用全局配置的 Axios 实例
        });
        // 处理成功登录，例如保存 JWT 或跳转到其他页面
        localStorage.setItem('authToken', response.data.token);
        this.$router.push('/'); // 跳转到一个受保护的页面
      } catch (error) {
        this.errorMessage = '登录失败，请检查用户名和密码';
      }
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

h2 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

div {
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
  display: block;
}

input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

button {
  padding: 0.5rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.error {
  color: red;
  text-align: center;
}
</style>
