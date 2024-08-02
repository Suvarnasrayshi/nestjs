<template>
  <div>
    <h2>Create Task</h2>
    <form @submit.prevent="submitTask">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="title" id="title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea v-model="description" id="description" required></textarea>
      </div>
      <div>
        <label for="dueDate">Due Date:</label>
        <input type="date" v-model="dueDate" id="dueDate" required />
      </div>
      <div>
        <select name="status" v-model="status">
          <option value="to-do">To-do</option>
          <option value="progress">progress</option>
          <option value="complete">complete</option>
        </select>
      </div>
      <div>
        <input type="file" name="media" id="media">
      </div>
      <button type="submit">Create Task</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';


    const title = ref('');
    const description = ref('');
    const dueDate = ref('');
    const status=ref('');
    const media=ref('')
    const errorMessage = ref('');

    const submitTask = async () => {
      try {
        const response = await fetch('http://localhost:3000/task', {
          method: 'POST',
          // credentials:'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title.value,
            description: description.value,
            dueDate: dueDate.value,
            status:status.value,
            media:media.value
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create task');
        }

        alert('Task created successfully!');
      } catch (error) {
        errorMessage.value = error.message;
      }
    };


</script>

<style>
div {
  margin: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #358c6c;
}

p {
  color: red;
}
</style>
