import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/'

import { AuthorizationPage } from './pages/login'
import { RegistrationPage } from './pages/auth'

import { HomePage } from './pages/home'
import { ProfilePage } from './pages/profile'
import { QuestionListPage } from './pages/admin'
import { TestPage } from './pages/test'
import { TestFormPage } from './pages/testForm'
import { NotFoundPage } from './pages/404'



export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/login' element={<AuthorizationPage />} />
          <Route path='/auth' element={<RegistrationPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/admin' element={<QuestionListPage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/testForm' element={<TestFormPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
