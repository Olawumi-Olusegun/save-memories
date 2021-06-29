import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMemories, likeAndDislikeMemory, deleteMemory } from './../../actions/memoryActions';
const Home = () => {
      let {userprofile} =  localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : "";

const dispatch = useDispatch();
const {memories} = useSelector((state) => state.memoryReducer);
const [homeState, setHomeState] = useState({ reload: false});
const { reload } = homeState;

const handleLikeAndDislike = (id, creator) => {
      dispatch(likeAndDislikeMemory(id, creator));
      setHomeState((prevState) => ({ ...prevState, reload:!reload}))
}
const handleDelete = (id) => {
      dispatch(deleteMemory(id));
      setHomeState((prevState) => ({ ...prevState, reload:!reload}))
}

useEffect(() => {
      dispatch(fetchAllMemories());
},[homeState,dispatch]);

      return (
      <div className="memory__card">
            {
                  memories && memories?.map((memory, index) => {
                        const { title, message, _id, likeCount, creator  } = memory;
                        return (
                              <article className="memory_card__article" key={index}>
                              <figure className="memory-card__image">
                              <img src="./imgs/people.jpg" alt="image1" />
                              </figure>
                              <div className="memory-card__content">
                              <h1 className="memory-card__title"> { title } </h1>
                              <p className="memory-card__text">
                              { message }
                              </p>
                              <div className="likes-and-dislikes">
                              <button className="memory-card__link" disabled={!_id} onClick={() => handleLikeAndDislike(_id, userprofile?._id )  }>Likes/unlike  { likeCount?.length && (likeCount?.length > 1 ? likeCount?.length + " likes" : likeCount?.length + " like") } </button>
                              {
                                    creator === userprofile?._id && <button className="memory-card__link" onClick={() => handleDelete(_id)}>Delete </button>
                              }
                              
                              </div>
                              </div>
                        </article> 
                        )
                  })
            }
      
      
      {/* <article className="memory_card__article">
            <figure className="memory-card__image">
            <img src="./imgs/people.jpg" alt="image2" />
            </figure>
            <div className="memory-card__content">
            <h1 className="memory-card__title"> Dolapo's Wedding </h1>
            <p className="memory-card__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente dicta sit est commodi quis suscipit nisi placeat praesentium consequuntur necessitatibus!
            </p>
            <div className="likes-and-dislikes">
            <button href="index.html" className="memory-card__link">Likes </button>
            <button href="index.html" className="memory-card__link">Delete </button>
            </div>
            </div>
      </article>
      <article className="memory_card__article">
            <figure className="memory-card__image">
            <img src="./imgs/people.jpg" alt="image3" />
            </figure>
            <div className="memory-card__content">
            <h1 className="memory-card__title"> Dolapo's Wedding </h1>
            <p className="memory-card__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente dicta sit est commodi quis suscipit nisi placeat praesentium consequuntur necessitatibus!
            </p>
            <div className="likes-and-dislikes">
                  <button href="index.html" className="memory-card__link">Likes </button>
                  <button href="index.html" className="memory-card__link">Delete </button>

                  
            </div>
            </div>
      </article> */}
      </div>
      )
}

export default Home
