import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState([])

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const ext = e.target.files[0].name.lastIndexOf('.');
    console.log(e.target.files[0].name.substring(ext) === '.pdf')
    if(
      e.target.files[0].name.substring(ext) == '.pdf' ||
      e.target.files[0].name.substring(ext) == '.txt' ||
      e.target.files[0].name.substring(ext) == '.xslt' ||
      e.target.files[0].name.substring(ext) == '.xsl' ||
      e.target.files[0].name.substring(ext) == '.csv'
    ) {
      setError([])
    } else {
      setError([...error,'file extention not supported..'])
    }
  }
  console.log(error)
  const uploadFile = async () => {
    setError([]);
    if(file == null) {
      setError([...error,'no file error'])
      return;
    }
    if(email.trim().length === 0) {
      setError([...error,'email is empty']);
      return;
    }
    if(error.length === 0) {  
      alert('send')
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch(`http://localhost:5000/upload?email=${email}`, {
          method: "POST",
          body: formData
        });
        setEmail('')
        setFile(null)
        const image_resp = await res.json();
      } catch (err) {
        console.log("error  ::: ", err);
      }
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h3 className="title">Upload File (.pdf, .csv, excel files)</h3>
        <div>
          <label htmlFor="email">Email : </label>
          <input 
            id="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            type="email" 
           />
        </div>
        <div>
          <label htmlFor="file-upload">File : </label>
          <input
            onChange={handleFileChange}
            id="file-upload"
            className="file"
            type="file"
            accept=".pdf, .csv, .txt, .xsl, .xslt"
          />
        </div>
        <div>
          <button className="w-100" onClick={uploadFile}>Upload</button>
        </div>
        {
        error.length > 0 
        ?
          error.map(item => {
            return(
              <small className="error" key={item}>{item}</small>
            )
          })
        : null
      }
      </div>
    </div>
  );
}

export default App;
