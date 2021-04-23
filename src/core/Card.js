import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone,faEnvelope,faGlobe,faPen,faTrash } from '@fortawesome/free-solid-svg-icons'


const Card =({data,onDelete,handleShowQuickView}) => {
    return(
        <div className="col">
              <div className="card h-100">
                <img src={`https://avatars.dicebear.com/v2/avataaars/{${data?.username}}.svg?options[mood][]=happy`} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h5 className="text-start">{data?.name}</h5>
                  <div className="col align-self-start"> 
                        <p className="text-start">
                        <FontAwesomeIcon icon={faEnvelope} style={{marginRight:'1rem'}} />
                            {data?.email}
                        </p>
                        <p className="text-start">
                        <FontAwesomeIcon icon={faPhone} style={{marginRight:'1rem'}} />
                            {data?.phone}
                        </p>

                        <p className="text-start">
                        <FontAwesomeIcon icon={faGlobe} style={{marginRight:'1rem'}} />
                        http://{data?.website}
                        </p>
                 </div>
                </div>
                <div className="card-footer" style={{display:'flex',justifyContent:'space-around'}} >
                    <small className="text-muted" onClick={() => handleShowQuickView(data?.id)}>   
                        <FontAwesomeIcon icon={faPen} style={{marginRight:'1rem',marginLeft:'1rem'}} />
                    </small>
                    <small className="text-muted" style={{marginRight:'1rem',marginLeft:'1rem'}} onClick={() => onDelete(data?.id)}>
                      <FontAwesomeIcon icon={faTrash} style={{marginRight:'1rem',marginLeft:'1rem'}} />
                    </small>
                </div>
              </div>
            </div>  
    )
}

export default Card;