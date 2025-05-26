<template>
  <q-page class="login-page">
    <!-- Navbar -->
    <div class="login-navbar">
      <div class="navbar-left">
        <div class="app-title">Brackr</div>
        <div class="subtitle">Track your bus in real time</div>
      </div>
      <q-btn
        label="Sign Up"
        class="create-account-btn"
        unelevated
        @click="router.push('/create-account')"
        v-ripple="true"
      />
    </div>
    <div class="login-container">
      <div class="logo-area">
        <div class="circle-bus">
          <q-icon name="directions_bus" size="40px" color="white" />
        </div>
        <div class="welcome-title">Welcome Back!</div>
        <div class="welcome-subtitle">Sign in to track your bus</div>
      </div>
      <q-form @submit="onSubmit" class="q-gutter-md" ref="formRef">
        <q-input
          v-model="email"
          label="Email"
          type="email"
          filled
          :error="!!emailError"
          :error-message="emailError"
          color="primary"
          bg-color="white"
          dense
          class="custom-input"
          autofocus
        >
          <template #prepend>
            <q-icon name="mail" color="primary" size="16px" />
          </template>
        </q-input>
        <q-input
          v-model="password"
          label="Password"
          type="password"
          filled
          :error="!!passwordError"
          :error-message="passwordError"
          color="primary"
          bg-color="white"
          dense
          class="custom-input"
        >
          <template #prepend>
            <q-icon name="lock" color="primary" size="16px" />
          </template>
        </q-input>
        <div class="actions-row">
          <q-btn
            label="Login"
            class="gradient-btn"
            unelevated
            type="submit"
            :loading="loading"
          />
          <q-btn
            flat
            label="Forgot Password?"
            class="forgot-btn"
            @click="() => $q.notify({ type: 'info', message: 'Password reset coming soon!' })"
          />
        </div>
        <q-banner v-if="formError" class="bg-negative text-white q-mt-md">
          {{ formError }}
        </q-banner>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const emailError = ref('');
const passwordError = ref('');
const formError = ref('');
const formRef = ref();

function validateEmail(val: string) {
  if (!val) return 'Email is required';
  // Simple email regex
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Invalid email address';
  return '';
}

function validatePassword(val: string) {
  if (!val) return 'Password is required';
  if (val.length < 6) return 'Password must be at least 6 characters';
  return '';
}

async function onSubmit() {
  emailError.value = validateEmail(email.value);
  passwordError.value = validatePassword(password.value);
  formError.value = '';

  if (emailError.value || passwordError.value) {
    return;
  }

  loading.value = true;
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    // Replace with actual API call, e.g.:
    // await $api.post('/login', { email: email.value, password: password.value });

    // Simulate login success
    $q.notify({ type: 'positive', message: 'Login successful!' });
    // Redirect to home
    // window.location.href = '/';
  } catch (err) {
    formError.value = 'Login failed. Please check your credentials.';
    console.error('Login error:', err);
  } finally {
    loading.value = false;
  }
}

// async function goToCreateAccount() {
//   await router.push('/create-account');
// }
</script>

<style scoped lang="scss">
.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5fafd;
  position: relative;
}

.login-navbar {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100vw;
  max-width: 100vw;
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
  background: #f5fafd;
  z-index: 10;
}

.navbar-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.app-title {
  font-size: 1.7rem;
  font-weight: 700;
  color: #1976d2;
  letter-spacing: 2px;
  margin-bottom: 0.1rem;
}

.subtitle {
  color: #26a69a;
  font-size: 0.9rem;
  opacity: 0.85;
  margin-bottom: 0;
}

.create-account-btn {
  background: linear-gradient(90deg, #1976d2 0%, #26a69a 100%);
  color: #fff !important;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 1.2rem;
  box-shadow: 0 2px 8px 0 rgba(38, 166, 154, 0.12);
  transition: box-shadow 0.2s;
}
.create-account-btn:hover, .create-account-btn:focus {
  box-shadow: 0 4px 16px 0 rgba(38, 166, 154, 0.18);
  filter: brightness(1.05);
}

.login-container {
  margin-top: 30px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 28px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.13);
  padding: 2.5rem 2rem 2rem 2rem;
  width: 100%;
  max-width: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.7s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: translateY(0);}
}

.logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.circle-bus {
  background: linear-gradient(135deg, #1976d2 60%, #26a69a 100%);
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  box-shadow: 0 4px 16px 0 rgba(38, 166, 154, 0.13);
}

.welcome-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 0.2rem;
  letter-spacing: 1px;
}

.welcome-subtitle {
  color: #26a69a;
  font-size: 1rem;
  opacity: 0.85;
  margin-bottom: 0.5rem;
}

.actions-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.forgot-btn {
  color: #1976d2 !important;
  font-size: 0.95rem;
  align-self: flex-end;
  text-transform: none;
  padding: 0;
  min-width: unset;
}

.custom-input :deep(.q-field__control) {
  border-radius: 12px;
  border: 1.5px solid #e3e8f0;
  background: #f8fafc;
  box-shadow: 0 2px 8px 0 rgba(38, 166, 154, 0.04);
  transition: border-color 0.2s;
}
.custom-input :deep(.q-field__control:focus-within) {
  border-color: #26a69a;
}

.gradient-btn {
  background: linear-gradient(90deg, #1976d2 0%, #26a69a 100%);
  color: #fff !important;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px 0 rgba(38, 166, 154, 0.12);
  transition: box-shadow 0.2s;
  width: 100%;
}
.gradient-btn:hover, .gradient-btn:focus {
  box-shadow: 0 4px 16px 0 rgba(38, 166, 154, 0.18);
  filter: brightness(1.05);
}
</style>
