import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { createMemory } from '../../actions/memoryActions'
import './CreateMemory.css';
const CreateMemory = () => {
      const history = useHistory();
      const dispatch = useDispatch();
      const [formData, setFormData] = useState({
            title: "", 
            message: "",
            tags: "", 
            selectedFile: ""
      });
      let { title, message, tags, selectedFile } = formData;

      // const readFile = async () => {
      //       let file = await selectedFile.files[0];
      //       let reader = new fileReader();
      //       reader.readAsDataURL(file);
      //       reader.onload = function(){
      //             console.log(reader.result)
      //             selectedFile = reader.result;
      //       }
      //       reader.onerror = function() {
      //             console.log(reader.error)
      //       }
      // }

      const userProfile = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : "";
      
      useEffect(() => {
            if(!userProfile) return <Redirect to="/creatememory" />
      }, [history, userProfile])
      const creator = userProfile?.userprofile?._id;
      const handleChange = (e) => {
            e.preventDefault();
            const { name, value } = e.target;
            setFormData(prevState => ({ ...prevState, [name]:value }));
      }
      const handleSubmit = (e) => {
            e.preventDefault();
            // readFile();
            dispatch(createMemory({creator, title, message, tags, selectedFile}))
            setFormData((prevState) => ({ ...prevState, title:"", message:"", tags:"", selectedFile:"" }))
            history.push('/');
      }
      return (
            <div className="create__memory">
                  <h2>Create New Memory</h2>
                  <form onSubmit={handleSubmit}>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" value={title} onChange={handleChange} placeholder="Title" required />
                        <label htmlFor="tags">Tags:</label>
                        <input type="text" id="tags" name="tags" value={tags} onChange={handleChange} placeholder="Tags" required />
                        <label htmlFor="selectedFile">Upload Image:</label>
                        <input type="file" id="selectedFile" value={selectedFile} onChange={handleChange} name="selectedFile"  required />
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" placeholder="Message" rows="10" value={ message } onChange={handleChange} required>  </textarea>
                        <div className="form__group btn">
                              <button type="submit"> Create Memory </button>
                        </div>
                  </form>
            </div>
      )
}

export default CreateMemory;
