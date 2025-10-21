import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const empty = {
    id: '',
    status: '',
    projectDescription: '',
  }

function App() {
  const [storage, setStorage] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false)
  const [postForm, setPostForm] = useState(empty);
  const [one, setOne] = useState()


  const getAll = () => {
    fetch('http://localhost:5000/invoices').then(response => {
      return response.json()
    }).then(data => {
        if(data) setStorage(data)
      })
  }



  // const getOne = () => {
  //   fetch('http://localhost:5000/invoices/3')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data.value)
  //       // setStorage(data)
  //     })
  // }
  const postData = async () => {
    setShowPostForm(true);
    if(postForm.id || postForm.status || postForm.projectDescription){
      fetch('http://localhost:5000/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          // id: postForm.id,
          // status: postForm.status,
          // projectDescription: postForm.projectDescription
          status: 'paid',
          items: [
            {
              id: 1,
              name: 'name',
              quantity: 1,
              price: 2,
              total: 3
            },
            {
              id: 2,
              name: 'name2',
              quantity: 11,
              price: 22,
              total: 33
            }
          ]
        })
      }).then(response => {
          // console.log(response.json())
          if(response.ok) return response.text()
          else throw new Error('error')
        })
        .then(data => {
          console.log(data)
          setStorage([...storage, postForm])
          setShowPostForm(false)
          setPostForm(empty)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='buttons'>
          <button type='button' onClick={postData}>POST</button>
          <button type='button' onClick={getAll}>GET ALL</button>
          {/* <button type='button' onClick={getOne}>GET ONE</button> */}
        </div>
        {
          showPostForm && 
            <div className='postForm'>
              <input type='text' placeholder='id'      value={postForm.id}                 onChange={(e) => setPostForm({...postForm, id: e.currentTarget.value})} />
              <input type='text' placeholder='status'  value={postForm.status}             onChange={(e) => setPostForm({...postForm, status: e.currentTarget.value})} />
              <input type='text' placeholder='project' value={postForm.projectDescription} onChange={(e) => setPostForm({...postForm, projectDescription: e.currentTarget.value})} />
            </div>
        }
        {
          storage.length 
          ? storage.map(invoice => 
            <div key={invoice.id}>
              <span>id: {invoice.id}</span>
              <span> status: {invoice.status}</span>
              <span> project desc: {invoice.projectDescription}</span>
            </div>
            )
          : <p>empty Storage</p>
        }
      </header>
    </div>
  );
}

export default App;




