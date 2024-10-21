import React, { useState } from 'react';
import AllRoutes from './routes/AllRoutes';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return <AllRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
};

export default App;
