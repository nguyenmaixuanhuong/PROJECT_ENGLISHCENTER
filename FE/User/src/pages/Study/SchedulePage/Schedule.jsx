import { useEffect, useState } from "react";
import { getRooms, listSchedules, getListTeacher } from "../../../services/schedule.api";
import { useSelector } from "react-redux";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import './Schedule.style.scss'
import { ViewState } from '@devexpress/dx-react-scheduler';
import { useAuthCheckLogin } from "../../../Context/auth";
import {
  Scheduler,
  WeekView,
  Appointments,
  AllDayPanel,
  AppointmentTooltip,
  Toolbar,
  DateNavigator,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
function Schedule() {
  useAuthCheckLogin();
  const user = useSelector((state) => state.user?.user)
  const role = useSelector((state) => state.user?.role)
  const classes = useSelector((state) => state.classes?.class)
  const [schedules, setSchedules] = React.useState([]);
  const [listClass, setListClass] = React.useState([]);
  const [listRoom, setListRoom] = React.useState([]);
  const [teacher, setTeacher] = React.useState([]);
  const [resources, setResources] = useState([]);
  const [currentDate, setCurrentDate] = useState('2018-06-27');

  async function loadRooms() {
    try {
      const data = await getRooms();

      const room_source = data.map((room) => {
        return { id: room._id, text: room.name };
      });
      setListRoom(room_source);
    } catch (error) {
      console.error('Error loading Rooms:', error);
    }
  }

  async function loadClasses() {
    try {
      const classes_source = classes
        .filter(classes => classes.isFinish !== true) // Lọc ra các lớp học có isFinish không bằng false
        .map(classes => ({ id: classes._id, text: classes.className }));
      setListClass(classes_source);
    } catch (error) {
      console.error('Error loading classess:', error);
    }
  }
  async function loadTeachers() {
    try {
      const data = await getListTeacher();
      const teachers = data.map((teacher) => {
        return { id: teacher._id, text: teacher.fullName };
      });
      setTeacher(teachers)
    } catch (error) {
      console.error('Error loading Teachers:', error);
    }
  }
  const currentDateChange = (date) => {
    setCurrentDate(date);
  };
  useEffect(() => {
    async function fetchSchedule() {
      const schedules = await listSchedules(user._id, role);
      setSchedules(schedules);
    }
    fetchSchedule();
    loadTeachers()
    loadClasses()
    loadRooms()
  }, [user._id, role])

  useEffect(() => {
    setResources([
      {
        fieldName: 'class',
        title: 'Lớp Học',
        instances: listClass,
      },
      {
        fieldName: 'room',
        title: 'Room',
        instances: listRoom,
      },
      {
        fieldName: 'teacher',
        title: 'Giáo Viên',
        instances: teacher,
      },
    ]);
  }, [listClass, listRoom, teacher]);
  return (
    <div className="schedule-container">
      <Paper>
        <Scheduler
          data={schedules}
          height={600}
        >
          <ViewState
            ccurrentDate={currentDate}
            onCurrentDateChange={currentDateChange}
          />
          <WeekView
            startDayHour={9}
            endDayHour={19}
          />
          <Appointments />
          <AppointmentTooltip />
          <Toolbar />
          <DateNavigator />
          <Resources data={resources} mainResourceName="class" />
        </Scheduler>
      </Paper>
    </div>

  );
}

export default Schedule;