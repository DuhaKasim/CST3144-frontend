<template>
  <div class="page-wrap">
    <h1>Lessons</h1>
    <LessonsList :lessons="lessons" />
  </div>
</template>

<script>
import LessonsList from '../components/LessonsList.vue';

export default {
  name: "LessonsPageView",
  components: { LessonsList },

  data() {
    return {
      lessons: [],
    };
  },

  async created() {
    await this.fetchLessons();
  },

  methods: {
    async fetchLessons() {
      try {
        const response = await fetch('https://cst3144-backend-3vp3.onrender.com/api/lessons');
        const lessons = await response.json();

        if (Array.isArray(lessons)) {
          this.lessons = lessons
            .filter(lesson => lesson !== null)
            .map(lesson => ({ ...lesson }));
        }

      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

