import Vue from 'vue'
import Router from 'vue-router'

import AddStoryList from './views/AddStoryList'
import ViewPlan from './views/ViewPlan'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/add-story-list'
    },
    {
      path: '/add-story-list',
      name: 'AddStoryList',
      component: AddStoryList
    },
    {
      path: '/view-plan-as-scrum-master/:id',
      name: 'ViewPlanAsScrumMaster',
      component: ViewPlan
    },
    {
      path: '/view-plan-as-developer/:id',
      name: 'ViewPlanAsDeveloper',
      component: ViewPlan
    },
  ]
})
