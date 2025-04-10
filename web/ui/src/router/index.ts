import Home from '@/view/home/index.vue';
import ProjectCreate from '@/view/project/create.vue';
import ProjectDashboard from '@/view/project/dashboard.vue';
import ProjectPlugins from '@/view/project/plugins.vue';
import ProjectConfig from '@/view/project/config.vue';
import ProjectTasks from '@/view/project/tasks.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/project/create',
      name: 'project-create',
      component: ProjectCreate
    },
    {
      path: '/project/:id/dashboard',
      name: 'project-dashboard',
      component: ProjectDashboard
    },
    {
      path: '/project/:id/plugins',
      name: 'project-plugins',
      component: ProjectPlugins
    },
    {
      path: '/project/:id/dependencies',
      name: 'project-dependencies',
      component: () => import('@/view/project/dependencies.vue')
    },
    {
      path: '/project/:id/config',
      name: 'project-config',
      component: ProjectConfig
    },
    {
      path: '/project/:id/tasks',
      name: 'project-tasks',
      component: ProjectTasks
    },
    {
      path: '/project/:id/tasks/:taskId',
      name: 'task-detail',
      component: () => import('@/view/project/task-detail.vue')
    }
  ]
})

export default router 