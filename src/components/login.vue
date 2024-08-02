<template>
     <div>
       <h1>Login</h1>
       <form @submit.prevent="login">
         <label for="email">Email:</label>
         <input type="email" v-model="email" required />
         <br />
         <label for="password">Password:</label>
         <input type="password" v-model="password" required />
         <br />
         <button type="submit">Login</button>
       </form>
       <a href="/forgetPassword">Forget Password</a>
     </div>
   </template>
  
   <script setup>
   import { ref } from 'vue';
  
   const email = ref('');
   const password = ref('');
  
   const login = async () => {
     try {
      const response = await fetch('http://localhost:3000/auth/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email: email.value, password: password.value }),
       });
  
       if (!response.ok) {
         throw new Error('Login failed');
       }
  
       const data = await response.json();
      console.log("data",data)

       document.cookie = `access_token=${data.access_token}; path=/;`;
  
       alert('Login successful');

     } catch (error) {
       console.error('Error:', error);
       alert('Login failed');
     }
   };
   </script>