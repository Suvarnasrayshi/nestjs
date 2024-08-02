<template>
     <div>
       <h1>Register</h1>
       <form @submit.prevent="register">
         <label for="name">Name:</label>
         <input type="text" v-model="name" required />
         <br />
         <label for="email">Email:</label>
         <input type="email" v-model="email" required />
         <br />
         <label for="password">Password:</label>
         <input type="password" v-model="password" required />
         <br />
         <button type="submit">Register</button>
         <a href="/login">Login</a>
       </form>
     </div>
   </template>
  
   <script setup>
   import { ref } from 'vue';
  
   const name = ref('');
   const email = ref('');
   const password = ref('');
  
   const register = async () => {
     try {
      const response = await fetch('http://localhost:3000/user', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ name: name.value, email: email.value, password: password.value }),
       });
  
       if (!response.ok) {
         throw new Error('Registration failed');
       }
  
       alert('Registration successful');
     } catch (error) {
       console.error('Error:', error);
       alert('Registration failed');
     }
   };
   </script>