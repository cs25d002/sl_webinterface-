import { BrowserRouter } from 'react-router-dom';
import { PageLayout } from './layouts/PageLayout';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <AppRoutes />
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
