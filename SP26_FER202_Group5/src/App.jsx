import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
//import BookListPage from './pages/BookListPage';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" index element={<HomePage/>}/>
          {/* <Route path="/books" element={<BookListPage/>}/> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
