import { useEffect, useState } from "react"

export const Entry = ({ entries, currentUser, entry}) => {

const [editButton, setEdit] = useState(false)


    return <section key={entry.id} className="entry">
                            <div className="entry_div">{entry.entryType} 
                            {
                            currentUser.admin ?                            <><button
                            className="entry_button">Edit</button><button>Delete</button> </>
                            : ""
                            }
                            </div> 
                            <div className="entry_div">{entry.dateTime}</div>
                            <div className="entry_div">{entry.description}</div>
                        
                        </section>
}