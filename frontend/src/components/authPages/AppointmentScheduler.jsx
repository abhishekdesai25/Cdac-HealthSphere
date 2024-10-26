import axios from "axios";
import React, { useState } from "react"

const AppointmentScheduler = ({doctorid}) =>{

    const baseUrl = 'http://localhost:7070/health/doctor'
    const token = localStorage.getItem('token');
    const [ time, setTime] = useState({
        starttime: '',
        endtime: ''
    })

    const handleAddSlot = async () => {
        if(time.starttime && time.endtime && time.starttime < time.endtime){
            console.log("time: ", time);
            await axios.patch(`${baseUrl}/time/${doctorid}`,time,{
                headers: {Authorization: `Bearer ${token}`},
            });
            setTime({
                starttime: '',
                endtime: ''
            })
        }
        else{
            alert('Invalid time range or end time is earlier than start time.')
        }
    }

    return(
        <div className="slot-scheduler-container">
            <h2>Set Availability Slots</h2>

            <div className="time-picker-container">
                <div className="time-picker">
                    <label>Start Time:</label>
                    <input 
                        type="time"
                        value={time.starttime}
                        onChange={(e) => setTime(prevtime => ({
                            ...prevtime,
                            starttime: e.target.value
                        }))}
                        required
                    />
                </div>

                <div className="time-picker">
                    <label>End Time:</label>
                    <input 
                        type="time"
                        value={time.endtime}
                        onChange={(e) => setTime(prevtime => ({
                            ...prevtime,
                            endtime: e.target.value
                        }))}
                        required
                    />
                </div>
            </div>

        <button className="add-slot-button" onClick={handleAddSlot}>Add Slot</button>
        </div>
    )
}

export default AppointmentScheduler