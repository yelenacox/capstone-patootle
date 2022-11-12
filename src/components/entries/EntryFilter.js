import { useEffect, useState } from "react"

export const EntryFilter = ({ setTypeChoice }) => {

    return <>
                <select
                    className="entry_type"
                    id="type-select"
                    onChange={
                        (evt) => {
                            setTypeChoice(evt.target.value)
                        }}
                >
                    <option value="0">Filter Entries</option>
                    <option value="Nap">Nap</option>
                    <option value="Diaper">Diaper</option>
                    <option value="Solid Food">Solid Food</option>
                    <option value="Liquids">Liquids</option>
                </select>        
    </>
}