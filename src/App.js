import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Main/main';
import CampaignInfo from './Campaign/CampaignInfo/campaign-info';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/donate' element={<CampaignInfo/>}>
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
