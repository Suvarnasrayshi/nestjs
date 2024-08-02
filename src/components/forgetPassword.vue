<template>
     <div>
       <h1>Forgot Password</h1>
       <form @submit.prevent="forgotPassword">
         <label for="email">Email:</label>
         <input type="email" v-model="email" required />
         <br />
         <label for="password">New Password:</label>
         <input type="password" v-model="password" required />
         <br />
         <button type="submit">Reset Password</button>
       </form>
     </div>
   </template>
  
   <script setup>
   import { ref } from 'vue';
  
   const email = ref('');
   const password = ref('');
  
   const forgotPassword = async () => {
     try {
      const response = await fetch('http://localhost:3000/user/forgetPass', {
         method: 'PATCH',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email: email.value, password: password.value }),
       });
  
       if (!response.ok) {
         throw new Error('Password reset failed');
       }
  
       alert('Password reset successful');

     } catch (error) {
       console.error('Error:', error);
       alert('Password reset failed');
     }
   };
   </script>