import "./App.css"
import { useState, useEffect } from "react"

function App() {
  const [file, setFile] = useState(null)
  const [email, setEmail] = useState('')
  const [error, setError] = useState([])
  const [fileVal, setFileVal] = useState('');
  const [extentionError, setExtentionError] = useState(null)

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleFileChange = (e) => {
    try {  
      setFileVal(e.target.value)
      setFile(e.target.files[0])
      const ext = e.target.files[0].name.lastIndexOf('.')
      console.log(e.target.files[0].name.substring(ext) === '.pdf')
      if(
        e.target.files[0].name.substring(ext) == '.pdf' ||
        e.target.files[0].name.substring(ext) == '.txt' ||
        e.target.files[0].name.substring(ext) == '.xslt' ||
        e.target.files[0].name.substring(ext) == '.xsl' ||
        e.target.files[0].name.substring(ext) == '.csv' ||
        e.target.files[0].name.substring(ext) == '.xlsx' ||
        e.target.files[0].name.substring(ext) == '.xlsm' ||
        e.target.files[0].name.substring(ext) == '.xlsb' ||
        e.target.files[0].name.substring(ext) == '.xltx'
      ) {
        setError([])
      } else {
        setError(['file extention not supported..'])
      }
    } catch(err) {
      alert("oops... please check the file you selected...")
    }
  }
  console.log(error)

  // function to upload
  const uploadFile = async () => {
    setError([]);
    if(file == null) {
      setError(['please select a file'])
      return
    }
    if(email.trim().length === 0) {
      setError(['email is empty'])
      return
    }
    if(!validateEmail(email)) {
      setError(['invalid email..'])
      return
    }
    if(error.length === 0) {  
      const formData = new FormData()
      formData.append("file", file)
      try {
        const res = await fetch(`http://localhost:5000/upload?email=${email}`, {
          method: "POST",
          body: formData
        });
        alert("File Uploaded...")
        setEmail('')
        setFile(null)
        setFileVal('')
        const image_resp = await res.json();
      } catch (err) {
        alert("oops... culdn't upload file... check your network..")
        console.log("error  ::: ", err)
      }
    }
  };

  return (
    <div className="App bg-secondary">
      <div className="p-3 border border-primary bg-light rounded">
        <h3 className="title">Upload File (.pdf, .csv, excel files)</h3>
        <div>
          <label htmlFor="email">Email : </label>
          <input 
            id="email" 
            className="form-control"
            onChange={(e) => {
              setEmail(e.target.value)
            }} 
            value={email} 
            type="email" 
           />
        </div>
        <div>
          <label htmlFor="file-upload">File : </label>
          <input
            onChange={handleFileChange}
            id="file-upload"
            className="file form-control"
            type="file"
            accept=".pdf, .csv, .txt, .xsl, .xslt, .xlsx, .xlsm, .xlsb, .xltx"
            value={fileVal}
          />
        </div>
        <div>
          <button className="w-100 btn btn-primary my-3" onClick={uploadFile}>Upload</button>
        </div>
        {
        error.length > 0 
        ?
          error.map(item => {
            return(
              <div className="alert alert-danger" key={item} role="alert">
                {item}
              </div>
            )
          })
        : null
      }
      </div>
    </div>
  );
}

export default App;
