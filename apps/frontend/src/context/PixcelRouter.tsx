import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const HomePage = lazy(() => import('src/pages/HomePage'))
const AboutPage = lazy(() => import('src/pages/AboutPage'))
const ProjectPage = lazy(() => import('src/pages/ProjectPage'))
const SettingsPage = lazy(() => import('src/pages/SettingsPage'))
const NewProjectPage = lazy(() => import('src/pages/NewProjectPage'))

export const PixcelRouter = () => (
  <Routes>
    <Route
      path="/"
      element={
        <Suspense fallback={<></>}>
          <HomePage />
        </Suspense>
      }
    />
    <Route
      path="/home"
      element={
        <Suspense fallback={<></>}>
          <HomePage />
        </Suspense>
      }
    />
    <Route
      path="/about"
      element={
        <Suspense fallback={<></>}>
          <AboutPage />
        </Suspense>
      }
    />
    <Route
      path="/settings/*"
      element={
        <Suspense fallback={<></>}>
          <SettingsPage />
        </Suspense>
      }
    />
    <Route
      path="/project/:slug"
      element={
        <Suspense fallback={<></>}>
          <ProjectPage />
        </Suspense>
      }
    />
    <Route
      path="/projects/new"
      element={
        <Suspense fallback={<></>}>
          <NewProjectPage />
        </Suspense>
      }
    />
  </Routes>
)
