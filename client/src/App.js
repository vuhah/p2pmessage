import { useRoutes, Routes, Route } from "react-router-dom";
import EntryPage from "./pages/entrypage";
import HomeMessage from "./pages/home";

function App() {

  const routes = useRoutes([
    {
      path:"/",
      element: <EntryPage />
    },{
      path:"/homemessage/:id",
      element: <HomeMessage   />
    },{    
      path:"/homemessage/",
      element: <HomeMessage />
    },
  ])
  
  return routes
  // return (
  //   <Routes>
  //     <Route exact path="/" element={EntryPage}></Route>
  //     <Route exac path="/homemessage" element={HomeMessage}></Route>
  //   </Routes>
  // )
}

export default App;
