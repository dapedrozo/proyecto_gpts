import { Route, Routes } from "react-router-dom"

function RoutesNotFound({children}) {
  return (
    <Routes>
        {children}
        <Route path='*' element={<>Not found</>} />
    </Routes>
  )
}

export default RoutesNotFound