import React, { useState } from 'react'
import '../App.css'

const Todo = () => {
    const [inputData,setInputData]=useState('');
    const [items,setItems]=useState([]);
    const [toggleSubmit,setToggleSubmit]=useState(true);
    const [isEditItem,setIsEditItem]=useState(null);
    const [completedTasks,setCompletedTasks]=useState([]);

    const addItem=()=>{
        if(!inputData){
            alert('Please Enter anything');
        }
        else if(inputData && !toggleSubmit){
            setItems(
                items.map((elem)=>{
                    if(elem.id===isEditItem){
                        return {...elem,name:inputData};
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setIsEditItem(null);
            setInputData('');
        }
        else{
            const allInputData={id: new Date().getTime().toString(), name:inputData};
            setItems([...items,allInputData]);
            setInputData('');
        }
    } 

    const deleteItem=(index)=>{
        setItems((oldItem)=>{
            return oldItem.filter((elem)=>{
                return index!==elem.id;
            });
        });
    };
    const deleteCItem=(index)=>{
        setCompletedTasks((oldItem)=>{
            return oldItem.filter((elem)=>{
                return index!==elem.id;
            });
        });
    };
    const removeAll=()=>{
        items.map((elem)=>{
            return completed(elem.id);
        })
        setItems([]);
    }
    const deleteAll=()=>{
        setCompletedTasks([]);
    }
    const editItem=(id)=>{
        let newEditItem= items.find((elem)=>{
            return elem.id===id;
        });
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }
    const completed=(id)=>{
          const completedTask = items.find((task) => task.id === id);
          setCompletedTasks([...completedTasks, completedTask]);
          deleteItem(id);
    };

   
  return (
    <>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src={require('../images/photo.jpg')}  alt='photu' style={{height:"90px",width:"90px"}}/>
                    <figcaption>Add Your List Here 👇</figcaption>
                </figure>
                <div className='addItems'>
                    <input type='text' placeholder='✍️ Add Items...'
                        value={inputData}
                        onChange={(e)=>{
                            setInputData(e.target.value)
                        }}
                    />
                    {
                        toggleSubmit?<i className="fa fa-plus add-btn" title='add item' onClick={addItem}></i>:<i className="fa fa-edit add-btn" aria-hidden="true" title='update item' onClick={addItem}></i>
                    }
                </div>
            </div>
            <div className='child-div'>
            <h2>PENDING</h2>
                <div className='showItems'>
                    {
                        items.map((elem)=>{
                            return (
                                <div className='eachItem' key={elem.id}>
                                    <h2>{elem.name}</h2>
                                    <div className='todo-btn'>
                                        <i className="fa fa-edit" aria-hidden="true" title='edit item' onClick={()=>editItem(elem.id)}></i>
                                        <i className="fa fa-trash" aria-hidden="true" title='delete item' onClick={()=>deleteItem(elem.id)}></i>
                                        <i className="fa fa-check" aria-hidden="true" title='completed' onClick={()=>completed(elem.id)}></i>
                                    </div>
                        
                                </div>
                            )
                        })
                    }     
                    
                </div>

                <div className='showItem'>
                    <button className='btn1 effect04'  onClick={removeAll}><span>CHECK LIST</span></button>
                </div>
            </div>
            <div className='child-div'>
                <h2>COMPLETED</h2>
                <div className='showItems'>
                    {
                        completedTasks.map((elem)=>{
                            return (
                                <div className='eachItem' key={elem.id}>
                                    <h2>{elem.name}</h2>
                                    <div className='todo-btn'>
                                        <i className="fa fa-trash" aria-hidden="true" title='delete item' onClick={()=>deleteCItem(elem.id)}></i>
                                    </div>
                        
                                </div>
                            )
                        })
                    }     
                    
                </div>
                <div className='showItem'>
                    <button className='btn effect04'  onClick={deleteAll}><span>DELETE ALL</span></button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo