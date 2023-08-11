import moment from 'moment';
import React from 'react'

const App = () => {
  const [date, setDate] = React.useState(moment().valueOf())
  return (
    <div>
      <div>{date}</div>
     </div>
   )
 }

 export default App
