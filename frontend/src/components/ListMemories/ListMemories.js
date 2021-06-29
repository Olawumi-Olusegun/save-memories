import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMemories, deleteMemory } from './../../actions/memoryActions'

const ListMemories = () => {
      const {memories} = useSelector(state => state.memoryReducer);
      const dispatch = useDispatch();

      useEffect(() => {
            dispatch(fetchAllMemories());
      }, [dispatch]);

      const handleDelete = (e, id) => {
            e.preventDefault();
            dispatch(deleteMemory(id))
      }
      return (
            <div>
                  <table>
                        <tr>
                              <th> <td> S/N </td> <td>Title</td> <td>Actions</td> </th>
                        </tr>
                  <tbody>
                        {
                              memories && memories.map((memory, index) => {
                                    const { title, _id } = memory;
                                    return (
                                          <tr key={index}> <td>{ index + 1 } </td> <td>{ title }</td> <td> <button>Edit</button> <button onClick={(e) => handleDelete(e, _id)}>Delete</button> </td> </tr> 
                                    )
                              })
                        }
                        
                  </tbody>
                  </table>
            </div>
      )
}

export default ListMemories;
